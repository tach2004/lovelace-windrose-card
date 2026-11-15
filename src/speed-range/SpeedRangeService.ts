import {SpeedRange} from "./SpeedRange";
import {SpeedRangeFactory} from "./SpeedRangeFactory";
import {WindSpeedEntity} from "../config/WindSpeedEntity";
import {SpeedUnit} from "../converter/SpeedUnit";
import {DynamicSpeedRange} from "../config/DynamicSpeedRange";
import {Log} from "../util/Log";

export class SpeedRangeService {

    private readonly outputSpeedUnit: SpeedUnit
    private readonly windSpeedEntity: WindSpeedEntity;
    private readonly dynamicSpeedRangeConfig: DynamicSpeedRange[];
    private speedRanges: SpeedRange[];

    constructor(outputSpeedUnit: SpeedUnit, windSpeedEntity: WindSpeedEntity) {
        this.outputSpeedUnit = outputSpeedUnit;
        this.windSpeedEntity = windSpeedEntity;
        this.dynamicSpeedRangeConfig = windSpeedEntity.dynamicSpeedRanges;
        this.speedRanges = [];
        this.generateRanges();
    }

    generateRanges(averageSpeed?: number): void {
        Log.info(`Geschwindigkeitsbereiche erzeugen, Mittelwert: ${averageSpeed}, Konfiguration: `, this.dynamicSpeedRangeConfig);
        if (this.dynamicSpeedRangeConfig.length > 0) {
            if (averageSpeed) {
                for (let i = this.dynamicSpeedRangeConfig.length - 1; i >= 0; i--) {
                    const config = this.dynamicSpeedRangeConfig[i];
                    if (averageSpeed >= config.average_above) {
                        this.speedRanges = SpeedRangeFactory.generateStepMax(config.step, config.max);
                        break;
                    }
                }
            } else { //Before winddata is available
                const maxConfig = this.dynamicSpeedRangeConfig[this.dynamicSpeedRangeConfig.length - 1];
                this.speedRanges = SpeedRangeFactory.generateStepMax(maxConfig.step, maxConfig.max);
            }
            Log.info("Dynamische Geschwindigkeitsbereiche bestimmt: ", this.speedRanges);
        } else {
            if (this.speedRanges.length === 0) {
                this.speedRanges = SpeedRangeFactory.generateSpeedRanges(this.outputSpeedUnit, this.windSpeedEntity);
                Log.info("Geschwindigkeitsbereiche bestimmt: ", this.speedRanges);
            }
        }
    }

    getRangeCount(): number {
        return this.speedRanges.length;
    }

    getSpeedRanges(): SpeedRange[] {
        return this.speedRanges;
    }

    determineSpeedRangeIndex(speed: number): number {
        const speedRange = this.speedRanges.find((speedRange: SpeedRange) => speedRange.isRangeMatch(speed));
        if (speedRange) {
            return speedRange.range;
        }
        throw new Error("Geschwindigkeit liegt außerhalb aller Geschwindigkeitsbereiche: " + speed + " Einheit: " + this.outputSpeedUnit.name);
    }

}
