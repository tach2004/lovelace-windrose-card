import { GlobalConfig } from "./GlobalConfig";
import { CardConfig } from "../card/CardConfig";
import { CardColors } from "./CardColors";
import { Log } from "../util/Log";
import { WindSpeedEntity } from "./WindSpeedEntity";
import { WindDirectionEntity } from "./WindDirectionEntity";
import { CompassConfig } from "./CompassConfig";
import { CurrentDirectionConfig } from "./CurrentDirectionConfig";
import { CornersInfo } from "./CornersInfo";
import { ConfigCheckUtils } from "./ConfigCheckUtils";
import { CardConfigActions } from "../card/CardConfigActions";
import { DirectionLabels } from "./DirectionLabels";
import { TextBlocks } from "./TextBlocks";
import { ButtonsConfig } from "./buttons/ButtonsConfig";
import { MatchingStrategy } from "./MatchingStrategy";
import { Period } from "./buttons/Period";
import { RoseConfig } from "./RoseConfig";


export class CardConfigWrapper {

    title: string;
    dataPeriod: Period | undefined;
    activePeriod: Period;
    buttonsConfig: ButtonsConfig | undefined;
    refreshInterval: number;
    windDirectionEntity: WindDirectionEntity;
    windspeedEntities: WindSpeedEntity[];
    windspeedBarLocation: string;
    hideWindspeedBar: boolean;
    roseConfig: RoseConfig;
    directionLabels: DirectionLabels;
    currentDirection: CurrentDirectionConfig;
    matchingStrategy: MatchingStrategy;
    cardColor: CardColors;
    compassConfig: CompassConfig;
    cornersInfo: CornersInfo;
    textBlocks: TextBlocks;
    actions: CardConfigActions | undefined;
    cardWidth: number;
    disableAnimations: boolean;
    logLevel: string;

    filterEntitiesQueryParameter: string;

    static exampleConfig(): Record<string, unknown>  {
        return {
            title: 'Windrichtung',
            data_period: {
                period_back: GlobalConfig.defaultPeriodBack
            },
            rose_config: {
                windrose_draw_north_offset: 0,
                center_calm_percentage: GlobalConfig.defaultCenterCalmPercentage,
            },
            refresh_interval: GlobalConfig.defaultRefreshInterval,
            windspeed_bar_location: 'right',
            wind_direction_entity: {
                entity: 'sensor.',
                use_statistics: false,
                direction_compensation: 0
            },
            windspeed_entities: [
                {
                    entity: 'sensor.',
                    name: 'Windgeschwindigkeit',
                    speed_unit: GlobalConfig.defaultInputSpeedUnit,
                    use_statistics: false,
                    windspeed_bar_full: GlobalConfig.defaultWindspeedBarFull,
                    output_speed_unit: GlobalConfig.defaultOutputSpeedUnit,
                    speed_range_beaufort: GlobalConfig.defaultSpeedRangeBeaufort,
                    current_speed_arrow: true
                }
            ],
            buttons_config: {
                location: 'bottom',
                buttons: [
                    {
                        type: 'period_selector',
                        button_text: 'Heute',
                        preset_period: 'today'
                    },
                    {
                        type: 'period_selector',
                        button_text: 'Letzte 7 Tage',
                        preset_period: 'last_7_days'
                    },
                    {
                        type: 'period_selector',
                        button_text: 'Letzte 30 Tage',
                        preset_period: 'last_30_days',
                        use_analytics: true,
                        analytics_period: 'hour'
                    }
                ]
            },
            direction_labels: {
                cardinal_direction_letters: 'NOSW'
            },
            current_direction: {
                show_arrow: true
            },
            matching_strategy: {
                name: GlobalConfig.defaultMatchingStategy
            },
            corner_info: {
                top_left: {
                    label: "Windrichtung",
                    unit: " °",
                    entity: 'sensor.',
                 },
                top_right: {
                    label: "Windgeschwindigkeit",
                    unit: " bft",
                    entity: 'sensor.',
                },
            },
            text_blocks: {
                top: {
                    text: `      <table>
          <tr>
              <td>Zeitraum:</td><td>\${start-date}, \${start-time} - \${end-date}, \${end-time}</td>
          </tr>
      </table>`
                },
            }
        };
    }

    constructor(private readonly cardConfig: CardConfig) {
        this.title = this.cardConfig.title;
        this.checkDeprecations(cardConfig)
        this.windspeedBarLocation = this.checkWindspeedBarLocation();
        this.dataPeriod = Period.fromConfig(cardConfig.data_period);
        this.buttonsConfig = ButtonsConfig.fromConfig(cardConfig.buttons_config, this.windspeedBarLocation);
        this.activePeriod = Period.determineActivePeriod(this.dataPeriod, this.buttonsConfig);
        this.refreshInterval = this.checkRefreshInterval();
        this.windDirectionEntity = WindDirectionEntity.fromConfig(cardConfig.wind_direction_entity);
        this.windspeedEntities = this.checkWindspeedEntities();
        this.roseConfig = RoseConfig.fromConfig(cardConfig.rose_config);
        this.currentDirection = CurrentDirectionConfig.fromConfig(cardConfig.current_direction, this.roseConfig);
        this.disableAnimations = ConfigCheckUtils.checkBooleanDefaultFalse(cardConfig.disable_animations);
        this.hideWindspeedBar = ConfigCheckUtils.checkBooleanDefaultFalse(cardConfig.hide_windspeed_bar);
        this.directionLabels = DirectionLabels.fromConfig(cardConfig.direction_labels);
        this.matchingStrategy = MatchingStrategy.fromConfig(cardConfig.matching_strategy);
        this.filterEntitiesQueryParameter = this.createEntitiesQueryParameter();
        this.cardWidth = !cardConfig.card_width ? 4 : cardConfig.card_width;
        this.cardColor = CardColors.fromConfig(cardConfig.colors);
        this.compassConfig = CompassConfig.fromConfig(cardConfig.compass_direction);
        this.cornersInfo = CornersInfo.create(cardConfig.corner_info);
        this.textBlocks = TextBlocks.fromConfig(cardConfig.text_blocks);
        this.logLevel = Log.checkLogLevel(this.cardConfig.log_level);
        this.actions = cardConfig.actions;
        Log.info('Config check OK');
    }

    windBarCount(): number {
        if (this.hideWindspeedBar) {
            return 0;
        }
        return this.windspeedEntities.length;
    }

    private checkRefreshInterval(): number {
        if (this.cardConfig.refresh_interval && isNaN(this.cardConfig.refresh_interval)) {
            throw new Error('WindRoseCard: Ungültiges refresh_interval; erwartet wird eine Zahl in Sekunden.');
        } else if (this.cardConfig.refresh_interval) {
            return this.cardConfig.refresh_interval;
        }
        return GlobalConfig.defaultRefreshInterval;
    }

    private checkWindspeedEntities(): WindSpeedEntity[] {
        if (!this.cardConfig.windspeed_entities || this.cardConfig.windspeed_entities.length == 0) {
            throw new Error('WindRoseCard: Keine windspeed_entities konfiguriert; mindestens eine Entität ist erforderlich.');
        }
        const entities:WindSpeedEntity[] = [];
        for (const entityConfig of this.cardConfig.windspeed_entities) {
            entities.push(WindSpeedEntity.fromConfig(entityConfig, this.windspeedBarLocation))
        }
        if (entities.findIndex(entityConfig => entityConfig.useForWindRose) === -1) {
            entities[0].useForWindRose = true;
        }
        return entities;
    }

    private checkWindspeedBarLocation(): string {
        if (this.cardConfig.windspeed_bar_location) {
            if (this.cardConfig.windspeed_bar_location !== 'bottom' && this.cardConfig.windspeed_bar_location !== 'right') {
                throw new Error('Ungültige Position der Windgeschwindigkeitsbalken: ' + this.cardConfig.windspeed_bar_location +
                    '. Gültige Werte: bottom, right');
            }
            return this.cardConfig.windspeed_bar_location;
        }
        return GlobalConfig.defaultWindspeedBarLocation;
    }

    private createEntitiesQueryParameter() {
        return this.windDirectionEntity + ',' + this.windspeedEntities
            .map(config => config.entity)
            .join(',');
    }

    private checkDeprecations(cardConfig: CardConfig) {
        //Not supported
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'max_width')) {
            throw new Error('Die Option max_width wird nicht mehr unterstützt, da Vektorgrafiken verwendet werden.')
        }

        //To data_period
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'hours_to_show')) {
            throw new Error('Die Option hours_to_show auf oberster Ebene wurde durch data_period.period_back ersetzt.')
        }

        //To windspeed_entities
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'windspeed_bar_full')) {
            throw new Error('Die Option windspeed_bar_full wurde von der obersten Ebene nach windspeed_entities verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'output_speed_unit')) {
            throw new Error('Die Option output_speed_unit wurde von der obersten Ebene nach windspeed_entities verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'output_speed_unit_label')) {
            throw new Error('Die Option output_speed_unit_label wurde von der obersten Ebene nach windspeed_entities verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'speed_range_beaufort')) {
            throw new Error('Die Option speed_range_beaufort wurde von der obersten Ebene nach windspeed_entities verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'speed_range_step')) {
            throw new Error('Die Option speed_range_step wurde von der obersten Ebene nach windspeed_entities verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'speed_range_max')) {
            throw new Error('Die Option speed_range_max wurde von der obersten Ebene nach windspeed_entities verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'speed_ranges')) {
            throw new Error('Die Option speed_ranges wurde von der obersten Ebene nach windspeed_entities verschoben.')
        }

        //To direction_labels
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'cardinal_direction_letters')) {
            throw new Error('Die Option cardinal_direction_letters wurde von der obersten Ebene nach direction_labels verschoben.')
        }

        //To rose_config
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'wind_direction_count')) {
            throw new Error('Die Option wind_direction_count wurde von der obersten Ebene nach rose_config verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'background_image')) {
            throw new Error('Die Option background_image wurde von der obersten Ebene nach rose_config verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'circle_legend_text_size')) {
            throw new Error('Die Option circle_legend_text_size wurde von der obersten Ebene nach rose_config verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'windrose_draw_north_offset')) {
            throw new Error('Die Option windrose_draw_north_offset wurde von der obersten Ebene nach rose_config verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'center_calm_percentage')) {
            throw new Error('Die Option center_calm_percentage ist veraltet und wurde durch rose_config.center_circle und rose_config.first_segment_in_leaves ersetzt.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'cirlce_count')) {
            throw new Error('Die Option cirlce_count wurde von der obersten Ebene nach rose_config verschoben.')
        }
        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'outer_circle_percentage')) {
            throw new Error('Die Option outer_circle_percentage wurde von der obersten Ebene nach rose_config verschoben.')
        }

        if (ConfigCheckUtils.checkHasProperty(cardConfig, 'rose_config') &&
            ConfigCheckUtils.checkHasProperty(cardConfig.rose_config, 'center_calm_percentage') &&
            (ConfigCheckUtils.checkHasProperty(cardConfig.rose_config, 'center_circle') ||
            ConfigCheckUtils.checkHasProperty(cardConfig.rose_config, 'first_segment_in_leaves'))) {

            throw new Error("Bei Verwendung von rose_config.center_circle oder first_segment_in_leaves muss center_calm_percentage entfernt werden.");
        }
    }
}
