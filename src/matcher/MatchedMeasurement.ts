import {Measurement} from "../measurement-provider/Measurement";

export class MatchedMeasurement {

    constructor(
        public time: number,
        public direction: number | string,
        public speed: number,
        public seconds: number = 1) {
    }

    private static isMissing(value: string): boolean {
        // Ignore missing sensor values rather than interpreting an empty speed as 0.
        return value == null || String(value).trim() === '' ||
            String(value).toLowerCase() === 'unknown' || String(value).toLowerCase() === 'unavailable';
    }

    static fromDirectionMeasurement(measurement: Measurement): MatchedMeasurement {
        const direction = this.isMissing(measurement.value) ? -1 : measurement.value;
        return new MatchedMeasurement(measurement.startTime, direction, -1);
    }

    static fromSpeedMeasurement(measurement: Measurement): MatchedMeasurement {
        const speed = Number(measurement.value);
        return new MatchedMeasurement(
            measurement.startTime, -1,
            this.isMissing(measurement.value) || !Number.isFinite(speed) ? -1 : speed
        );
    }

}
