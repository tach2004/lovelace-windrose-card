import {CardConfigMatchingStrategy} from "../card/CardConfigMatchingStrategy";
import {ConfigCheckUtils} from "./ConfigCheckUtils";
import {GlobalConfig} from "./GlobalConfig";

export class MatchingStrategy {

    constructor(
        public readonly name: string,
        public readonly timeInterval: number,
        public readonly logMeasurementCounts: boolean) {
    }

    static fromConfig(config: CardConfigMatchingStrategy) {
        if (typeof (config as unknown) === "string") {
            throw new Error('matching_strategy ist jetzt ein Objekt; der bisherige Zeichenfolgenwert gehört in die Eigenschaft name.')
        }
        const name = this.checkMatchingStrategy(config?.name);
        const logMeasurementCounts = ConfigCheckUtils.checkBooleanDefaultFalse(config?.log_measurement_counts);
        let timeInterval = ConfigCheckUtils.checkNummerOrDefault(config?.time_interval, 60);
        if (timeInterval === 0) {
            timeInterval = 60;
        }

        return new MatchingStrategy(name, timeInterval, logMeasurementCounts)
    }

    private static checkMatchingStrategy(name: string | undefined | null): string {
        if (name) {
            if (name !== 'direction-first' && name !== 'speed-first'
                && name !== 'time-frame' && name !== 'full-time') {
                throw new Error('Ungültige Zuordnungsstrategie: ' + name +
                    '. Gültige Werte: direction-first, speed-first, time-frame und full-time');
            }
            return name;
        }
        return GlobalConfig.defaultMatchingStategy;
    }

}
