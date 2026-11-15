/** Original English source strings remain unchanged; apply these translations only in the presentation layer. */
export const germanErrorReplacements: ReadonlyArray<readonly [string, string]> = [
    [
        "WindRoseCard: Invalid refresh_interval, should be a number in seconds.",
        "WindRoseCard: Ungültiges refresh_interval; erwartet wird eine Zahl in Sekunden."
    ],
    [
        "WindRoseCard: No windspeed_entities configured, minimal 1 needed.",
        "WindRoseCard: Keine windspeed_entities konfiguriert; mindestens eine Entität ist erforderlich."
    ],
    [
        "Invalid windspeed bar location ",
        "Ungültige Position der Windgeschwindigkeitsbalken: "
    ],
    [
        ". Valid options: bottom, right",
        ". Gültige Werte: bottom, right"
    ],
    [
        "max_width option not supported anymore, since using vector graphics.",
        "Die Option max_width wird nicht mehr unterstützt, da Vektorgrafiken verwendet werden."
    ],
    [
        "hours_to_show option on root level is replaced with period_back in data_period object.",
        "Die Option hours_to_show auf oberster Ebene wurde durch data_period.period_back ersetzt."
    ],
    [
        "windspeed_bar_full option on root level is moved to windspeed_entities object.",
        "Die Option windspeed_bar_full wurde von der obersten Ebene nach windspeed_entities verschoben."
    ],
    [
        "output_speed_unit option on root level is moved to windspeed_entities object.",
        "Die Option output_speed_unit wurde von der obersten Ebene nach windspeed_entities verschoben."
    ],
    [
        "output_speed_unit_label option on root level is moved to windspeed_entities object.",
        "Die Option output_speed_unit_label wurde von der obersten Ebene nach windspeed_entities verschoben."
    ],
    [
        "speed_range_beaufort option on root level is moved to windspeed_entities object.",
        "Die Option speed_range_beaufort wurde von der obersten Ebene nach windspeed_entities verschoben."
    ],
    [
        "speed_range_step option on root level is moved to windspeed_entities object.",
        "Die Option speed_range_step wurde von der obersten Ebene nach windspeed_entities verschoben."
    ],
    [
        "speed_range_max option on root level is moved to windspeed_entities object.",
        "Die Option speed_range_max wurde von der obersten Ebene nach windspeed_entities verschoben."
    ],
    [
        "speed_ranges option on root level is moved to windspeed_entities object.",
        "Die Option speed_ranges wurde von der obersten Ebene nach windspeed_entities verschoben."
    ],
    [
        "cardinal_direction_letters option on root level is moved to direction_labels object.",
        "Die Option cardinal_direction_letters wurde von der obersten Ebene nach direction_labels verschoben."
    ],
    [
        "wind_direction_count option on root level is moved to rose_config object.",
        "Die Option wind_direction_count wurde von der obersten Ebene nach rose_config verschoben."
    ],
    [
        "background_image option on root level is moved to rose_config object.",
        "Die Option background_image wurde von der obersten Ebene nach rose_config verschoben."
    ],
    [
        "circle_legend_text_size option on root level is moved to rose_config object.",
        "Die Option circle_legend_text_size wurde von der obersten Ebene nach rose_config verschoben."
    ],
    [
        "windrose_draw_north_offset option on root level is moved to rose_config object.",
        "Die Option windrose_draw_north_offset wurde von der obersten Ebene nach rose_config verschoben."
    ],
    [
        "center_calm_percentage option is deprecated and replaced by rose_config.center_circle and rose_config.first_segment_in_leaves.",
        "Die Option center_calm_percentage ist veraltet und wurde durch rose_config.center_circle und rose_config.first_segment_in_leaves ersetzt."
    ],
    [
        "cirlce_count option on root level is moved to rose_config object.",
        "Die Option cirlce_count wurde von der obersten Ebene nach rose_config verschoben."
    ],
    [
        "outer_circle_percentage option on root level is moved to rose_config object.",
        "Die Option outer_circle_percentage wurde von der obersten Ebene nach rose_config verschoben."
    ],
    [
        "when using rose_config.center_circle or first_segment_in_leaves properties, center_calm_percentage should be removed.",
        "Bei Verwendung von rose_config.center_circle oder first_segment_in_leaves muss center_calm_percentage entfernt werden."
    ],
    [
        "Incorrect corner_info value: ",
        "Ungültiger Wert für corner_info: "
    ],
    [
        "WindRoseCard: Invalid unit, allowed units: ",
        "WindRoseCard: Ungültige Einheit; zulässige Einheiten: "
    ],
    [
        "WindRoseCard: Invalid unit combination, input unit degrees should always have output unit letters.",
        "WindRoseCard: Ungültige Einheitenkombination: Für input_unit degrees muss output_unit letters verwendet werden."
    ],
    [
        "WindRoseCard: Invalid unit combination, input unit letters should always have output unit degrees.",
        "WindRoseCard: Ungültige Einheitenkombination: Für input_unit letters muss output_unit degrees verwendet werden."
    ],
    [
        "WindRoseCard: Invalid unit combination, output unit letters should always have input unit degrees.",
        "WindRoseCard: Ungültige Einheitenkombination: Für output_unit letters muss input_unit degrees verwendet werden."
    ],
    [
        "WindRoseCard: Invalid unit combination, output unit degrees should always have input unit letters.",
        "WindRoseCard: Ungültige Einheitenkombination: Für output_unit degrees muss input_unit letters verwendet werden."
    ],
    [
        "WindRoseCard: Invalid direction letters option should contain 4 or 5 letters.",
        "WindRoseCard: Ungültige Option direction_letters; erwartet werden vier oder fünf Buchstaben."
    ],
    [
        "Invalid windspeed unit configured: ",
        "Ungültige Einheit für die Windgeschwindigkeit: "
    ],
    [
        ". Valid options: mps, bft, fps, kph, mph, knots, auto",
        ". Gültige Werte: mps, bft, fps, kph, mph, knots, auto"
    ],
    [
        "Invalid output windspeed unit configured: ",
        "Ungültige Ausgabeeinheit für die Windgeschwindigkeit: "
    ],
    [
        ". Valid options: mps, fps, kph, mph, knots",
        ". Gültige Werte: mps, fps, kph, mph, knots"
    ],
    [
        "WindRoseCard: Invalid speed_range_step, should be a positive number.",
        "WindRoseCard: speed_range_step muss eine positive Zahl sein."
    ],
    [
        "WindRoseCard: Invalid speed_range_max, should be a positive number.",
        "WindRoseCard: speed_range_max muss eine positive Zahl sein."
    ],
    [
        "WindRoseCard: speed_range_step, speed_range_max, speed_ranges or dynamic_speed_ranges should not be set when using speed_range_beaufort. ",
        "WindRoseCard: Bei speed_range_beaufort dürfen speed_range_step, speed_range_max, speed_ranges und dynamic_speed_ranges nicht gesetzt sein. "
    ],
    [
        "Beaufort uses fixed speed ranges.",
        "Beaufort verwendet festgelegte Geschwindigkeitsbereiche."
    ],
    [
        "WindRoseCard: speed_range_step and speed_range_max should both be set, step: ${speedRangeStep}, max: ${speedRangeMax}",
        "WindRoseCard: speed_range_step und speed_range_max müssen beide angegeben werden; Schritt: ${speedRangeStep}, Maximum: ${speedRangeMax}"
    ],
    [
        "WindRoseCard: speed_range_step/max, speed_ranges and dynamic_speed_ranges should not be configured next to each other.",
        "WindRoseCard: speed_range_step/max, speed_ranges und dynamic_speed_ranges dürfen nicht gleichzeitig konfiguriert sein."
    ],
    [
        "First dynamic speed config average_above should be 0.",
        "Beim ersten dynamischen Geschwindigkeitsbereich muss average_above den Wert 0 haben."
    ],
    [
        "Dynamic speed ranges average_above should be a number higher then 0.",
        "Bei dynamischen Geschwindigkeitsbereichen muss average_above eine Zahl größer als 0 sein."
    ],
    [
        "Dynamic speed ranges step should be a number higher then 0.",
        "Bei dynamischen Geschwindigkeitsbereichen muss step eine Zahl größer als 0 sein."
    ],
    [
        "Dynamic speed ranges max should be a number higher then 0.",
        "Bei dynamischen Geschwindigkeitsbereichen muss max eine Zahl größer als 0 sein."
    ],
    [
        "Statistics not supported for attribute values.",
        "Statistiken werden für Attributwerte nicht unterstützt."
    ],
    [
        "Current speed arrow location can only be left or right when speedbars are displayed vertical.",
        "Bei vertikalen Geschwindigkeitsbalken darf der Pfeil nur links oder rechts angeordnet sein."
    ],
    [
        "Current speed arrow location can only be above or below when speedbars are displayed horizontall",
        "Bei horizontalen Geschwindigkeitsbalken darf der Pfeil nur oberhalb oder unterhalb angeordnet sein."
    ],
    [
        "WindRoseCard: render-scale should be absolute, windspeed_relative or percentage_relative",
        "WindRoseCard: Die Skalierung muss absolute, windspeed_relative oder percentage_relative sein."
    ],
    [
        "render_relative_scale option is renamed to bar_render_scale with options: absolute, windspeed_relative and percentage_relative",
        "Die Option render_relative_scale heißt jetzt bar_render_scale; gültige Werte: absolute, windspeed_relative, percentage_relative."
    ],
    [
        "No data period config option available.",
        "Keine gültige Einstellung für den Datenzeitraum vorhanden."
    ],
    [
        "Using time range for data query",
        "Verwende Zeitraum für die Datenabfrage"
    ],
    [
        "No data period config options set.",
        "Es wurden keine Optionen für den Datenzeitraum angegeben."
    ],
    [
        "Multiple period types set, use one type: preset-period, period_back, from_hours_of_day, time window, or date options.",
        "Mehrere Zeitraummethoden konfiguriert. Verwende nur eine: preset_period, period_back, from_hour_of_day, relatives Zeitfenster oder Datumsangaben."
    ],
    [
        "Data_period and active period_selector button configured. Data_period can be removed from config.",
        "data_period und eine aktive period_selector-Schaltfläche sind gleichzeitig konfiguriert. Entferne data_period."
    ],
    [
        "Data_period or an active period_selector button should be configured.",
        "Es muss data_period oder eine aktive period_selector-Schaltfläche konfiguriert sein."
    ],
    [
        "Invalid rom_hour_of_day, should be a number between 0 and 23, hour of the day.",
        "Ungültiger Wert für from_hour_of_day; erwartet wird eine Stunde zwischen 0 und 23."
    ],
    [
        "WindRoseCard: from_period_ago requires to_period_ago to be set.",
        "WindRoseCard: from_period_ago erfordert auch to_period_ago."
    ],
    [
        "WindRoseCard: to_period_ago requires from_period_ago to be set.",
        "WindRoseCard: to_period_ago erfordert auch from_period_ago."
    ],
    [
        "WindRoseCard: from_period_ago should result in a date in the past.",
        "WindRoseCard: from_period_ago muss einen Zeitpunkt in der Vergangenheit ergeben."
    ],
    [
        "WindRoseCard: to_period_ago should result in a date in the past or now.",
        "WindRoseCard: to_period_ago muss einen Zeitpunkt in der Vergangenheit oder Gegenwart ergeben."
    ],
    [
        "WindRoseCard: from_period_ago must be before to_period_ago.",
        "WindRoseCard: from_period_ago muss vor to_period_ago liegen."
    ],
    [
        "WindRoseCard: from_date requires to_date to be set.",
        "WindRoseCard: from_date erfordert auch to_date."
    ],
    [
        "WindRoseCard: to_date requires from_date to be set.",
        "WindRoseCard: to_date erfordert auch from_date."
    ],
    [
        "WindRoseCard: from_date not in correct ISO format: ",
        "WindRoseCard: from_date hat kein gültiges ISO-Datumsformat: "
    ],
    [
        "WindRoseCard: to_date not in correct ISO format: ",
        "WindRoseCard: to_date hat kein gültiges ISO-Datumsformat: "
    ],
    [
        "period_selector option is replace to buttons_config on root level, see readme.md for details.",
        "Die Option period_selector wurde durch buttons_config auf oberster Ebene ersetzt. Siehe README.md."
    ],
    [
        "time_interval option is moved to matching-strategy object on root level.",
        "Die Option time_interval wurde in das Objekt matching_strategy auf oberster Ebene verschoben."
    ],
    [
        "log_measurement_counts option is moved to matching-strategy object on root level.",
        "Die Option log_measurement_counts wurde in das Objekt matching_strategy auf oberster Ebene verschoben."
    ],
    [
        "hours_to_show option is changed to period_back option, see readme \"Period code explained\".",
        "Die Option hours_to_show wurde durch period_back ersetzt. Siehe den Abschnitt zu Zeitraumausdrücken in der README."
    ],
    [
        "from_hours_ago option is changed to from_period_ago option, see readme \"Period code explained\".",
        "Die Option from_hours_ago wurde durch from_period_ago ersetzt. Siehe den Abschnitt zu Zeitraumausdrücken in der README."
    ],
    [
        "to_hours_ago option is changed to to_period_ago option, see readme \"Period code explained\".",
        "Die Option to_hours_ago wurde durch to_period_ago ersetzt. Siehe den Abschnitt zu Zeitraumausdrücken in der README."
    ],
    [
        "matching_strategy is changed to an object, the string value is moved to property name.",
        "matching_strategy ist jetzt ein Objekt; der bisherige Zeichenfolgenwert gehört in die Eigenschaft name."
    ],
    [
        "Invalid matching stategy ",
        "Ungültige Zuordnungsstrategie: "
    ],
    [
        ". Valid options: direction-first, speed-first, time-frame and full-time",
        ". Gültige Werte: direction-first, speed-first, time-frame und full-time"
    ],
    [
        "Cnofiguration ${name} is not a number: ",
        "Konfigurationswert ${name} ist keine Zahl: "
    ],
    [
        "statistics_period ${period} is invalid, should be one of 5minute, hour, day, week, month, year",
        "Ungültiger Wert für statistics_period (${period}); erlaubt sind 5minute, hour, day, week, month, year."
    ],
    [
        "statistics_period ${statsType} is invalid, should be one of min, mean or max",
        "Ungültiger Statistiktyp (${statsType}); erlaubt sind min, mean oder max."
    ],
    [
        "Cardinal direction letters option should contain 4 letters, empty string or 4 comma seperated words.",
        "Die Option cardinal_direction_letters muss vier Buchstaben, eine leere Zeichenfolge oder vier durch Kommas getrennte Wörter enthalten."
    ],
    [
        "Cardinal direction letters option should contain 4 letters.",
        "Die Option cardinal_direction_letters muss vier Buchstaben enthalten."
    ]
];
