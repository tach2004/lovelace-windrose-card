import {PeriodPart} from "./PeriodPart";
import {isFuture} from "date-fns";

export class PeriodCodeHelper {

    //Possible options:
    // h hours
    // d days
    // w weeks
    // m months
    // q quarter
    // y years

    static readonly CHECK_REGEX = /^([+-]\d+(mi|[shdwmqy]))+$/;
    static readonly DECODE_REGEX = /([+-])(\d+)(mi|[shdwmqy])/g;

    static checkInPast(configName: string, periodCode: string | undefined): boolean {
        if (PeriodCodeHelper.check(configName, periodCode)) {
            if (isFuture(PeriodCodeHelper.move(periodCode!, new Date()))) {
                throw new Error(`WindRoseCard: ${configName} muss auf einen Zeitpunkt in der Vergangenheit verweisen.`);
            }
            return true;
        }
        return false
    }

    static check(configName: string, periodCode: string | undefined): boolean {
        if (periodCode) {
            PeriodCodeHelper.CHECK_REGEX.lastIndex = 0;
            if (!PeriodCodeHelper.CHECK_REGEX.test(periodCode)) {
                throw new Error(`WindRoseCard: Ungültiger Zeitraumausdruck für ${configName}; '-2w-5h' bedeutet zwei Wochen und fünf Stunden zurück.`);
            }
            return true;
        }
        return false;
    }

    static toHoursForTest(periodCode: string) {
        const parts = this.decodeToParts(periodCode);
        let hours = 0;
        parts.forEach((part) => {
            hours += part.toHours();
        });
        return hours;
    }

    static move(periodCode: string, date: Date) {
        const parts = this.decodeToParts(periodCode);
        let newDate: Date = date;
        parts.forEach((part) => {
            newDate = part.moveDate(newDate);
        })
        return newDate;
    }

    static decodeToParts(periodCode: string): PeriodPart[] {
        const result: PeriodPart[] = [];
        let match: RegExpExecArray | null;
        PeriodCodeHelper.DECODE_REGEX.lastIndex = 0;
        while (( match = PeriodCodeHelper.DECODE_REGEX.exec(periodCode)) !== null) {
            result.push(new PeriodPart(match[1], match[3], +match[2]));
        }
        return result;
    }
}
