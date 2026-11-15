import { CardConfig } from "../card/CardConfig";
import { cardinalDirectionLetters, localize } from "./localize";

/**
 * Only auto-localize fields introduced by the card picker. Never mutate the
 * stored YAML config, and leave user-defined text untouched.
 */
export function localizeDefaultConfig(config: CardConfig, language?: string): CardConfig {
    if (!config.localize_defaults) {
        return config;
    }

    const defaultText = (value: string | undefined, key: Parameters<typeof localize>[1]): string | undefined => {
        if (value === localize("en", key) || value === localize("de", key)) {
            return localize(language, key);
        }
        return value;
    };
    const buttons = config.buttons_config?.buttons?.map(button => {
        let key: "today" | "last7Days" | "last30Days" | undefined;
        if (button.type === "period_selector") {
            if (button.preset_period === "today") key = "today";
            if (button.preset_period === "last_7_days") key = "last7Days";
            if (button.preset_period === "last_30_days") key = "last30Days";
        }
        return key ? { ...button, button_text: defaultText(button.button_text, key) } : button;
    });
    const topText = config.text_blocks?.top?.text;
    const localizedText = topText?.replace(/<td>(Period:|Zeitraum:)<\/td>/g, `<td>${localize(language, "period")}</td>`);

    return {
        ...config,
        title: defaultText(config.title, "cardTitle") ?? config.title,
        windspeed_entities: config.windspeed_entities?.map((sensor, index) =>
            index === 0 ? { ...sensor, name: defaultText(sensor.name, "windSpeed") ?? sensor.name } : sensor
        ),
        buttons_config: config.buttons_config && { ...config.buttons_config, buttons },
        direction_labels: config.direction_labels && {
            ...config.direction_labels,
            cardinal_direction_letters:
                config.direction_labels.cardinal_direction_letters === "NESW" ||
                config.direction_labels.cardinal_direction_letters === "NOSW"
                    ? cardinalDirectionLetters(language)
                    : config.direction_labels.cardinal_direction_letters,
        },
        corner_info: config.corner_info && {
            ...config.corner_info,
            top_left: config.corner_info.top_left && {
                ...config.corner_info.top_left,
                label: defaultText(config.corner_info.top_left.label, "windDirection") ??
                    config.corner_info.top_left.label,
            },
            top_right: config.corner_info.top_right && {
                ...config.corner_info.top_right,
                label: defaultText(config.corner_info.top_right.label, "windSpeed") ??
                    config.corner_info.top_right.label,
            },
        },
        text_blocks: config.text_blocks && {
            ...config.text_blocks,
            top: config.text_blocks.top && {
                ...config.text_blocks.top,
                text: localizedText ?? config.text_blocks.top.text,
            },
        },
    };
}
