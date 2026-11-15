import { HomeAssistant } from "../util/HomeAssistant";
import { germanErrorReplacements } from "./errorTranslations";

/**
 * The original application uses English as its source language.
 * Only presentation strings are translated; configuration keys,
 * units, entity states and template variable names remain untouched.
 */
export function getLanguage(hass?: HomeAssistant): string {
    return hass?.locale?.language || hass?.language || "en";
}

export function isGerman(language?: string): boolean {
    return (language || "en").toLowerCase().split(/[-_]/)[0] === "de";
}

type DefaultKey =
    | "cardTitle"
    | "windDirection"
    | "windSpeed"
    | "today"
    | "last7Days"
    | "last30Days"
    | "period"
    | "gustsTo";

const englishDefaults: Record<DefaultKey, string> = {
    cardTitle: "Wind direction",
    windDirection: "Wind direction",
    windSpeed: "Wind speed",
    today: "Today",
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    period: "Period:",
    gustsTo: "gusts to",
};

const germanDefaults: Record<DefaultKey, string> = {
    cardTitle: "Windrichtung",
    windDirection: "Windrichtung",
    windSpeed: "Windgeschwindigkeit",
    today: "Heute",
    last7Days: "Letzte 7 Tage",
    last30Days: "Letzte 30 Tage",
    period: "Zeitraum:",
    gustsTo: "Böen bis",
};

export function localize(language: string | undefined, key: DefaultKey): string {
    return (isGerman(language) ? germanDefaults : englishDefaults)[key];
}

export function cardinalDirectionLetters(language?: string): string {
    return isGerman(language) ? "NOSW" : "NESW";
}

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Keeps runtime values (entity IDs, numbers and configuration keys) intact. */
export function localizeError(error: unknown, language?: string): string {
    if (error === undefined || error === null) {
        return "";
    }
    let message = error instanceof Error ? error.message : String(error);
    if (!isGerman(language)) {
        return message;
    }

    // Translate longer phrases first to avoid replacing parts of a larger message.
    const replacements = [...germanErrorReplacements].sort((a, b) => b[0].length - a[0].length);
    const variable = /\$\{[^}]+\}/g;

    for (const [english, german] of replacements) {
        if (!english.includes("${")) {
            message = message.split(english).join(german);
            continue;
        }
        const parts = english.split(variable);
        const translatedParts = german.split(variable);
        let expression = "";
        for (let i = 0; i < parts.length; i++) {
            expression += escapeRegex(parts[i]);
            if (i < parts.length - 1) {
                expression += i === parts.length - 2 && parts[i + 1] === "" ? "(.+)" : "(.+?)";
            }
        }
        const pattern = new RegExp(expression, "g");
        message = message.replace(pattern, (...args: unknown[]) => {
            const values = args.slice(1, parts.length) as string[];
            let translated = translatedParts[0];
            for (let i = 0; i < values.length; i++) {
                translated += values[i] + (translatedParts[i + 1] || "");
            }
            return translated;
        });
    }
    return message;
}
