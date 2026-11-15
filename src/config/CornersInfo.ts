import {CornerInfo} from "./CornerInfo";
import {CardConfigCorners} from "../card/CardConfigCorners";
import {CardConfigCornerInfo} from "../card/CardConfigCornerInfo";
import {ConfigCheckUtils} from "./ConfigCheckUtils";

export class CornersInfo {

    private static readonly allowedUnits = ['bft', 'mps', 'kph', 'mph', 'fps', 'knots', 'letters', 'degrees']

    constructor(
        readonly topLeftInfo: CornerInfo,
        readonly topRightInfo: CornerInfo,
        readonly bottomLeftInfo: CornerInfo,
        readonly bottomRightInfo: CornerInfo) {
    }

    public isCornerInfoSet() {
        return this.topLeftInfo?.show || this.topRightInfo?.show || this.bottomLeftInfo?.show || this.bottomRightInfo?.show;
    }

    public static create(config: CardConfigCorners): CornersInfo {
        if (config === undefined || config === null) {
            return this.createAllDisabled();
        }
        this.checkForIncorrectValues(config);
        return new CornersInfo(
            this.checkCornerInfo(config.top_left),
            this.checkCornerInfo(config.top_right),
            this.checkCornerInfo(config.bottom_left),
            this.checkCornerInfo(config.bottom_right)
        );
    }

    private static createAllDisabled(): CornersInfo {
        const cornerInfo = new CornerInfo();
        return new CornersInfo(
            cornerInfo,
            cornerInfo,
            cornerInfo,
            cornerInfo
        );
    }

    private static checkForIncorrectValues(config: CardConfigCorners) {
        const props = Object.entries(config);
        const found = props.findIndex(prop => prop[0] != 'top_left' && prop[0] != 'top_right'
            && prop[0] != 'bottom_left' && prop[0] != 'bottom_right');
        if (found >= 0) {
            throw new Error('Ungültiger Wert für corner_info: ' + props[found][0] +
                " Allowed: top_left, top_right, bottom_left, bottom_right");
        }
    }

    private static checkCornerInfo(cornerInfoConfig: CardConfigCornerInfo | undefined): CornerInfo {
        const defaultColor = 'var(--primary-text-color)';
        const info = new CornerInfo();
        if (cornerInfoConfig === undefined || cornerInfoConfig === null) {
            return info;
        }
        info.entity = cornerInfoConfig.entity;
        info.attribute = cornerInfoConfig.attribute;
        info.color = cornerInfoConfig.color === undefined ? defaultColor : cornerInfoConfig.color;
        info.labelTextSize = ConfigCheckUtils.checkNummerOrDefault(cornerInfoConfig.label_text_size, 50);
        info.valueTextSize = ConfigCheckUtils.checkNummerOrDefault(cornerInfoConfig.value_text_size, 80);
        info.label = cornerInfoConfig?.label;
        info.inputUnit = this.checkUnit(cornerInfoConfig.input_unit);
        info.outputUnit = this.checkUnit(cornerInfoConfig.output_unit);
        this.checkUnitCombinations(info.inputUnit, info.outputUnit);
        info.unit = cornerInfoConfig.unit;
        info.precision = ConfigCheckUtils.checkNumberOrUndefined('precision', cornerInfoConfig.precision);
        info.directionLetters = this.checkDirectionLetters(cornerInfoConfig.direction_letters);
        if (info.entity || info.label) {
            info.show = true;
        }
        return info;
    }

    private static checkUnit(unit: string | undefined) {
        if (unit) {
            if (this.allowedUnits.some((u: string) => u === unit)) {
                return unit;
            }
            throw new Error('WindRoseCard: Ungültige Einheit; zulässige Einheiten: ' + this.allowedUnits);
        }
        return undefined;
    }

    private static checkUnitCombinations(inputUnit: string | undefined, outputUnit: string | undefined) {
        if (inputUnit === undefined && outputUnit === undefined) {
            return;
        }
        if (inputUnit === 'degrees' && outputUnit !== 'letters') {
            throw new Error('WindRoseCard: Ungültige Einheitenkombination: Für input_unit degrees muss output_unit letters verwendet werden.');
        }
        if (inputUnit === 'letters' && outputUnit !== 'degrees') {
            throw new Error('WindRoseCard: Ungültige Einheitenkombination: Für input_unit letters muss output_unit degrees verwendet werden.');
        }
        if (inputUnit !== 'degrees' && outputUnit === 'letters') {
            throw new Error('WindRoseCard: Ungültige Einheitenkombination: Für output_unit letters muss input_unit degrees verwendet werden.');
        }
        if (inputUnit !== 'letters' && outputUnit === 'degrees') {
            throw new Error('WindRoseCard: Ungültige Einheitenkombination: Für output_unit degrees muss input_unit letters verwendet werden.');
        }
    }

    private static checkDirectionLetters(directionLetters: string | undefined): string | undefined {
        if (directionLetters) {
            if (directionLetters.length === 4 || directionLetters.length === 5) {
                return directionLetters;
            }
            throw new Error('WindRoseCard: Ungültige Option direction_letters; erwartet werden vier oder fünf Buchstaben.');
        }
        return undefined;
    }

}
