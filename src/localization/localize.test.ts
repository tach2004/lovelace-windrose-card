import { describe, expect, test } from "@jest/globals";
import { CardConfig } from "../card/CardConfig";
import { cardinalDirectionLetters, getLanguage, isGerman, localize, localizeError } from "./localize";
import { localizeDefaultConfig } from "./defaultConfig";

describe("Home Assistant language support", () => {
    test("chooses the HA frontend locale, supporting regional German variants", () => {
        expect(getLanguage({ locale: { language: "de-DE" } } as any)).toBe("de-DE");
        expect(isGerman("de-CH")).toBe(true);
        expect(isGerman("de_AT")).toBe(true);
        expect(isGerman("en-US")).toBe(false);
        expect(isGerman("fr")).toBe(false);
    });

    test("keeps English as the fallback and translates German defaults", () => {
        expect(localize("en", "today")).toBe("Today");
        expect(localize("fr", "today")).toBe("Today");
        expect(localize("de-DE", "today")).toBe("Heute");
        expect(cardinalDirectionLetters("en")).toBe("NESW");
        expect(cardinalDirectionLetters("de-AT")).toBe("NOSW");
    });

    test("localizes diagnostics including an interpolated entity identifier", () => {
        expect(localizeError("Entity sensor.wind not found.", "de-DE"))
            .toBe("Entität sensor.wind nicht gefunden.");
        expect(localizeError("Entity sensor.wind not found.", "en"))
            .toBe("Entity sensor.wind not found.");
        expect(localizeError("Completely new upstream error", "de"))
            .toBe("Completely new upstream error");
    });

    test("localizes generated configuration without mutating stored YAML", () => {
        const config = {
            localize_defaults: true,
            title: "Wind direction",
            windspeed_entities: [{ name: "Wind speed" }],
            buttons_config: { buttons: [
                { type: "period_selector", preset_period: "today", button_text: "Today" },
                { type: "period_selector", preset_period: "last_7_days", button_text: "Last 7 days" },
            ] },
            direction_labels: { cardinal_direction_letters: "NESW" },
            corner_info: { top_left: { label: "Wind direction" }, top_right: { label: "Wind speed" } },
            text_blocks: { top: { text: "<td>Period:</td>" } },
        } as unknown as CardConfig;
        const result = localizeDefaultConfig(config, "de-DE");
        expect(result.title).toBe("Windrichtung");
        expect(result.buttons_config.buttons[0].button_text).toBe("Heute");
        expect(result.buttons_config.buttons[1].button_text).toBe("Letzte 7 Tage");
        expect(result.windspeed_entities[0].name).toBe("Windgeschwindigkeit");
        expect(result.direction_labels.cardinal_direction_letters).toBe("NOSW");
        expect(result.corner_info.top_left.label).toBe("Windrichtung");
        expect(result.text_blocks.top.text).toContain("Zeitraum:");
        expect(config.title).toBe("Wind direction");
        expect(config.buttons_config.buttons[0].button_text).toBe("Today");

        const backToEnglish = localizeDefaultConfig(result, "en");
        expect(backToEnglish.title).toBe("Wind direction");
        expect(backToEnglish.direction_labels.cardinal_direction_letters).toBe("NESW");
    });

    test("does not touch user-defined labels or existing unmarked cards", () => {
        const config = {
            localize_defaults: true, title: "My wind",
            buttons_config: { buttons: [{ type: "period_selector", preset_period: "today", button_text: "My day" }] },
        } as unknown as CardConfig;
        const result = localizeDefaultConfig(config, "de");
        expect(result.title).toBe("My wind");
        expect(result.buttons_config.buttons[0].button_text).toBe("My day");
        expect(localizeDefaultConfig({ ...config, localize_defaults: false }, "de"))
            .toEqual({ ...config, localize_defaults: false });
    });
});
