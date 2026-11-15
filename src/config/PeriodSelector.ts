import {Button} from "./Button";
import {CardConfigPeriodSelector} from "../card/CardConfigPeriodSelector";
import {ConfigCheckUtils} from "./ConfigCheckUtils";

export class PeriodSelector {

    constructor(
        public readonly location: string,
        public readonly buttons: Button[],
        public readonly activeColor: string,
        public readonly activeBgColor: string,
        public readonly color: string,
        public readonly bgColor: string
    ) {
    }

    static fromConfig(periodSelector: CardConfigPeriodSelector | undefined): PeriodSelector | undefined {
        if (periodSelector === undefined) {
            return undefined;
        }
        const position = this.checkLocation(periodSelector.location);
        const buttons = this.checkButtons(periodSelector.buttons);
        const activeColor = ConfigCheckUtils.checkStringOrDefault(periodSelector.active_color, 'red');
        const acitveBgColor = ConfigCheckUtils.checkStringOrDefault(periodSelector.active_bg_color, 'inherit');
        const color = ConfigCheckUtils.checkStringOrDefault(periodSelector.color, 'inherit');
        const bgColor = ConfigCheckUtils.checkStringOrDefault(periodSelector.bg_color, 'inherit');
        return new PeriodSelector(position, buttons, activeColor, acitveBgColor, color, bgColor);
    }

    private static checkLocation(location: string | undefined) {
        if (location) {
            if (location !== 'top' && location !== 'bottom' && location !== 'top-below-text' && location !== 'bottom-above-text') {
                throw new Error('WindRoseCard: Die Position der Zeitraum-Auswahl muss top, top-below-text, bottom oder bottom-above-text sein, nicht ' + location);
            }
            return location;
        }
        return 'top';
    }

    private static checkButtons(buttons: Button[] | undefined): Button[] {
        if (!buttons || buttons.length === 0) {
            return [];
        }
        const checkedButtons: Button[] = [];
        buttons.forEach((button, index) => {
            if (ConfigCheckUtils.checkNumberOrUndefined('Period ' + index, button.hours) === undefined) {
                throw new Error('WindRoseCard: Für die Schaltfläche muss hours angegeben werden.');
            }
            if (button.hours < 1) {
                throw new Error('WindRoseCard: hours muss eine Zahl größer als 0 sein.');
            }
            if (ConfigCheckUtils.checkString(button.title) === undefined) {
                throw new Error('WindRoseCard: Der Schaltflächentext darf nicht leer sein.');
            }
            checkedButtons.push(new Button(button.hours, button.title, button.active));
        });
        if (checkedButtons.length < 2) {
            throw new Error('WindRoseCard: period_selector benötigt mindestens zwei auswählbare Schaltflächen.');
        }

        const activeButtons = checkedButtons.filter(button => button.active).length;
        if (activeButtons > 1) {
            throw new Error('WindRoseCard: In period_selector darf nur eine Schaltfläche aktiv sein.');
        } else if (activeButtons === 0) {
            checkedButtons[0].active = true;
        }
        return checkedButtons;
    }
}
