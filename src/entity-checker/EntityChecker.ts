import {CardConfigWrapper} from "../config/CardConfigWrapper";
import {CornerInfo} from "../config/CornerInfo";
import {HomeAssistant} from "../util/HomeAssistant";
import {WindSpeedConvertFunctionFactory} from "../converter/WindSpeedConvertFunctionFactory";
import {Log} from "../util/Log";
import {TextBlock} from "../config/TextBlock";
import {TemplateParser} from "../textblocks/TemplateParser";
import {CenterCircleConfig} from "../config/CenterCircleConfig";

export class EntityChecker {

    public checkEntities(cardConfig: CardConfigWrapper, hass: HomeAssistant) {

        const windDirectionEntity = cardConfig.windDirectionEntity;
        this.checkEntity(windDirectionEntity.entity, windDirectionEntity.attribute, windDirectionEntity.useStatistics, hass);

        for (const entity of cardConfig.windspeedEntities) {
            this.checkEntity(entity.entity, entity.attribute, entity.useStatistics, hass);
            if (entity.speedUnit === 'auto') {
                entity.speedUnit = this.determineAutoSppedUnit(entity.entity, hass);
            }
        }

        if (cardConfig.compassConfig && cardConfig.compassConfig.autoRotate && cardConfig.compassConfig.entity) {
            this.checkEntity(cardConfig.compassConfig.entity, cardConfig.compassConfig.attribute, false, hass);
        }

        this.checkCornerInfo(cardConfig.cornersInfo.topLeftInfo, hass);
        this.checkCornerInfo(cardConfig.cornersInfo.topRightInfo, hass);
        this.checkCornerInfo(cardConfig.cornersInfo.bottomLeftInfo, hass);
        this.checkCornerInfo(cardConfig.cornersInfo.bottomRightInfo, hass);

        this.checkTextBlock(cardConfig?.textBlocks?.top, hass);
        this.checkTextBlock(cardConfig?.textBlocks?.bottom, hass);

        this.checkCenterCircleTemplate(cardConfig?.roseConfig?.centerCircleConfig, hass);
    }

    private checkCornerInfo(cornerInfo: CornerInfo, hass: HomeAssistant) {
        if (cornerInfo.show && cornerInfo.entity) {
            this.checkEntity(cornerInfo.entity, cornerInfo.attribute, false, hass);
            if (cornerInfo.precision === undefined) {
                cornerInfo.precision = hass.entities[cornerInfo.entity]?.display_precision;
            }
            if (cornerInfo.outputUnit && cornerInfo.inputUnit === undefined) {
                cornerInfo.inputUnit = this.determineAutoSppedUnit(cornerInfo.entity, hass);
            }
        }
    }

    private determineAutoSppedUnit(entity: string, hass: HomeAssistant): string {
        let speedUnit = hass.states[entity].attributes.unit_of_measurement as string;
        if (speedUnit === undefined) {
            speedUnit = hass.states[entity].attributes.wind_speed_unit;
        }
        speedUnit = speedUnit?.toLowerCase();
        if (new WindSpeedConvertFunctionFactory().speedUnitRecognized(speedUnit)) {
            Log.info(`Windgeschwindigkeitseinheit ${speedUnit} für Entität ${entity} erkannt.`);
            return speedUnit;
        }
        throw new Error(`Die Geschwindigkeitseinheit von ${entity} (${speedUnit}) konnte nicht automatisch ermittelt werden. Bitte speed_unit angeben.`)
    }

    private checkTextBlock(textBlock: TextBlock | undefined, hass: HomeAssistant) {
        if (!textBlock) {
            return;
        }
        const entities = TemplateParser.findEntityPlaceholders(textBlock.text);
        for (const entity of entities) {
            this.checkEntity(entity.entity!, entity.attribute, false, hass);
        }
    }

    private checkCenterCircleTemplate(centerCircleConfig: CenterCircleConfig, hass: HomeAssistant) {
        if (!centerCircleConfig) {
            return;
        }
        const entities = TemplateParser.findEntityPlaceholders(centerCircleConfig.text);
        for (const entity of entities) {
            this.checkEntity(entity.entity!, entity.attribute, false, hass);
        }
    }

    private checkEntity(entity: string, attribute: string | undefined, statsSupport: boolean, hass: HomeAssistant) {
        if (hass.states[entity] === undefined) {
            throw new Error(`Entität ${entity} nicht gefunden.`);
        }
        if (statsSupport) {
            const stateClass = hass.states[entity].attributes['state_class'];
            if (stateClass !== 'measurement' && stateClass !== 'measurement_angle') {
                throw new Error(`Entität ${entity} unterstützt keine Langzeitstatistiken. state_class muss measurement oder measurement_angle sein.`);
            }
        }
        if (attribute) {
            if (hass.states[entity].attributes[attribute] == undefined) {
                throw new Error(`Attribut ${attribute} wurde in Entität ${entity} nicht gefunden.`);
            }
        }
    }
}
