# Lovelace-Windrosen-Karte

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/aukedejonga)

Eine benutzerdefinierte Home-Assistant-Lovelace-Karte, die Windgeschwindigkeit und Windrichtung in einem Windrosendiagramm darstellt.

Die Karte wurde für Winddaten entwickelt, kann aber auch andere richtungsabhängige Daten darstellen, etwa Sonnenwind oder Blitze.
Wenn eine Funktion für weitere Anwendungsfälle fehlt, kannst du dafür ein Issue auf GitHub erstellen.

Konfigurationsbeispiele mit Screenshots findest du unter [Beispiele](EXAMPLES.md).

<img alt="Peview bars right" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windrose-example-bottom.png?raw=true" width="482"/>
<img alt="Peview bars right" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windrose-play-demo-animated.gif?raw=true" width="482"/>

## Installation

### HACS (empfohlen)

Diese Karte ist über [HACS](https://hacs.xyz/) (Home Assistant Community Store) verfügbar.
<small>*HACS is a third party community store and is not included in Home Assistant out of the box.*</small>

### Manuelle Installation

1. Lade `windrose-card.js` aus dem [neuesten Release](https://github.com/aukedejong/ha-windrose-card/releases/latest) herunter und kopiere die Datei nach `config/www`.

2. Füge die Ressource wie unten beschrieben hinzu.


### Installation über die Kommandozeile

1. Wechsle in dein Verzeichnis `config/www`.

2. Lade `windrose-card.js` herunter:

  ```
  $ wget https://github.com/aukedejong/lovelace-windrose-card/releases/latest/download/windrose-card.js
  ```

3. Füge die Ressource wie unten beschrieben hinzu.

### Ressource hinzufügen

Wenn du Lovelace über YAML konfigurierst, füge in deiner `configuration.yaml` einen Verweis auf `windrose-card.js` hinzu:

  ```yaml
  resources:
    - url: /local/lovelace-windrose-card/windrose-card.js?v=0.0.1
      type: module
  ```

Wenn du den grafischen Editor bevorzugst, kannst du die Ressource über das Menü hinzufügen:

1. Öffne eine beliebige Lovelace-Ansicht.
2. Wähle im Drei-Punkte-Menü **Dashboard bearbeiten**.
3. Öffne anschließend das neue Drei-Punkte-Menü. Wähle **Ressourcen verwalten** und nicht den Rohkonfigurationseditor.
   Ressourcen müssen über den Menüeintrag **Ressourcen verwalten** hinzugefügt werden; der Rohkonfigurationseditor weist beim Speichern darauf hin.
   Wähle **Ressourcen verwalten**.
4. Klicke auf **Ressource hinzufügen**.
5. Trage als URL `/hacsfiles/lovelace-windrose-card/windrose-card.js` ein.
6. Aktiviere die Option **JavaScript-Modul**.
7. Klicke auf **Erstellen**.

### Konfigurationsbeispiele:

- Siehe [Beispiele](./EXAMPLES.md).


### Kartenoptionen

| Name                      |                  Type                   | Default | Required | Description                                                                                                                                                                                                            |
|---------------------------|:---------------------------------------:|:-------:|:--------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type                      |                 string                  |         |    x     | `custom:windrose-card`.                                                                                                                                                                                                |
| title                     |                 string                  |         |    -     | Titel der Karte. |
| rose_config               |      [object](#objekt-rose_config)      |         |    -     | Einstellungen des Windrosendiagramms. Alle Angaben sind optional. |
| wind_direction_entity     | [object](#objekt-wind_direction_entity) |         |    x     | Einstellungen für die Windrichtungsentität. |
| windspeed_entities        |  [object](#objekt-windspeed_entities)   |         |    x     | Eine oder mehrere Windgeschwindigkeitsentitäten. Für die Windrose wird standardmäßig die erste verwendet. |
| refresh_interval          |                 number                  |   300   |    -     | Aktualisierungsintervall in Sekunden. |
| data_period               |      [object](#objekt-data_period)      |         |    -     | Legt den abzufragenden Zeitraum fest. Bei aktiver `period_selector`-Schaltfläche ist dieses Objekt nicht nötig. |
| buttons_config            |    [object](#objekt-buttons_config)     |         |    -     | Konfiguration der Schaltflächen. |
| windspeed_bar_location    |                 string                  | bottom  |    -     | Position des Balkendiagramms: `bottom` oder `right`. |
| card_width (EXPERIMENTAL) |                 number                  |    4    |    -     | Breite der Karte im Abschnittslayout. Standard: 4; maximal etwa 16 (volle Breite). |
| hide_windspeed_bar        |                 boolean                 |  false  |    -     | Blendet sämtliche Windgeschwindigkeitsbalken aus. |
| direction_labels          |   [object](#objekt-direction_labels)    |         |    -     | Konfiguration der Himmelsrichtungsbeschriftungen. Die bisherige Option `cardinal_direction_letters` wurde hierher verschoben und erweitert. |
| compass_direction         |   [object](#objekt-compass_direction)   |         |    -     | Ein Kompasssensor kann die Windrose passend zur Ausrichtung drehen, beispielsweise auf einem Boot. |
| current_direction         |   [object](#objekt-current_direction)   |         |    -     | Zeigt die zuletzt gemeldete Windrichtung mit einem roten Pfeil auf der Windrose an. |
| corner_info               |      [object](#objekt-corner_info)      |         |    -     | Zeigt Entitätszustände in den Ecken rund um die Windrose an. |
| text_blocks               |      [object](#objekt-text_blocks)      |         |    -     | Ermöglicht Text oberhalb und unterhalb der Windrose, auch mit berechneten Messwerten. |
| actions                   |        [object](#objekt-actions)        |         |    -     | Konfiguriert Home-Assistant-Aktionen, beispielsweise Mehr-Informationen-Dialoge. |
| matching_strategy         |   [object](#objekt-matching_strategy)   |         |    -     | Legt fest, wie Richtungs- und Geschwindigkeitsmessungen einander zugeordnet werden. |
| colors                    |        [object](#objekt-colors)         |         |    -     | Farben der verschiedenen Elemente der Windrose und des Balkendiagramms. |
| disable_animations        |                 boolean                 |  false  |    -     | Deaktiviert die Animation der Windrosensegmente und Geschwindigkeitsbalken. Die Pfeile für aktuelle Richtung und Geschwindigkeit bleiben animiert. |
| log_level                 |                 string                  |  WARN   |    -     | Protokollstufe in der Browserkonsole: `NONE`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`. |


## Objekt rose_config

Einstellungen für die Darstellung des Windrosendiagramms.

| Name                                |               Type               |      Default       | Required | Description                                                                                                                                         |
|-------------------------------------|:--------------------------------:|:------------------:|:-------:|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| wind_direction_count                |              string              |         16         |    -    | Anzahl der darstellbaren Windrichtungen, mindestens 4 und höchstens 32. |
| background_image                    |              string              |                    |    -    | Zeigt ein quadratisches Hintergrundbild genau hinter dem äußeren Kreis der Windrose. |
| rose_opacity                        |              number              |         1          |    -    | Deckkraft von Segmenten und Mittelkreis (0 bis 1), damit beispielsweise ein Hintergrundbild sichtbar bleibt. |
| clip_background_image               |             boolean              |       false        |    -    | Beschneidet das Hintergrundbild auf den äußeren Windrosenkreis. |
| circle_legend_text_size             |              number              |         30         |    -    | Textgröße der Prozentangaben im Windrosendiagramm. |
| windrose_draw_north_offset          |              number              |         0          |    -    | Winkel in Grad, bei dem Norden eingezeichnet wird; damit lässt sich die Windrose an einer gewünschten Nordausrichtung orientieren. |
| center_calm_percentage (DEPRECATED) |             boolean              |        true        |    -    | Veraltet: Zeigt den Anteil der Windstille in der Mitte. Ersetzt durch `center_circle` und `first_segment_in_leaves`. |
| first_segment_in_leaves             |             boolean              |       false        |    -    | Wenn der Mittelkreis den Windstille-Anteil zeigt, ist er das erste Segment; dieser Anteil soll dann nicht zusätzlich in den äußeren Segmenten erscheinen. |
| center_circle                       | [object](#objekt-center_circle)] | defaults of object |    -    | Einstellungen zu Größe und Inhalt des Mittelkreises. |
| cirlce_count                        |              number              |        auto        |    -    | Anzahl der konzentrischen Prozentkreise in der Windrose. |
| outer_circle_percentage             |              number              |        auto        |    -    | Prozentwert des äußersten und größten Kreises. |


### Objekt center_circle

Die bisherige Option `center_calm_percentage` wurde durch das Objekt `center_circle` und die Eigenschaft `first_segment_in_leaves` ersetzt.

Da `center_calm_percentage` standardmäßig `true` war, ergibt die neue Standardkonfiguration dieselbe Darstellung.
Wird `center_circle` nicht angegeben, werden die Standardwerte verwendet. Bestehende Karten ohne besondere Einstellungen ändern ihr Aussehen deshalb nicht.


| Name      |               Type               |       Default       | Required | Description                                                                                                                |
|-----------|:--------------------------------:|:-------------------:|:--------:|----------------------------------------------------------------------------------------------------------------------------|
| enabled   |              string              |        true         |    -     | Ob der Mittelkreis angezeigt wird. |
| size      |              string              |         60          |    -     | Größe des Mittelkreises. |
| text      |              string              | ${calm-percentage}% |    -     | Text im Mittelkreis. Verfügbare Platzhalter stehen im Abschnitt [Einzelne Werte anzeigen](#einzelne-werte-anzeigen). HTML ist hier nicht erlaubt. |
| text_size |              string              |         40          |    -     | Textgröße. |

```yaml
rose_config:
  center_circle:
    enabled: true
    size: 60
    text: ${calm-percentage}%
    text_size: 40
```

### Objekt data_period

Es darf jeweils nur eine der Optionen zur Zeitraumauswahl verwendet werden.
Die Statistikoptionen in diesem Objekt überschreiben die entsprechenden Einstellungen einzelner Entitäten.

| Name                                      |                      Type                      | Default | Required | Description                                                                                                                                                                                         |
|-------------------------------------------|:----------------------------------------------:|:-------:|:--------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| use_statistics                            |                    boolean                     |  false  |    -     | Verwendet Home-Assistant-Statistikdaten in 5-Minuten-Schritten, sofern verfügbar. Dies kann den Abruf beschleunigen und überschreibt die Einstellung einzelner Sensoren. |
| statistics_period                         |                     string                     | 5minute |    -     | Statistikintervall: `5minute`, `hour`, `day`, `week`, `month` oder `year`. Siehe [Datenspeicherung](#datenspeicherung-in-home-assistant). |
| statistics_type                           |                     string                     |  mean   |    -     | Statistiktyp: `min`, `max` oder `mean`. Gilt nur für Windgeschwindigkeit; bei Windrichtung wird immer `mean` verwendet. |
| preset_period                             |                     string                     |         |    -     | Vordefinierte Zeiträume, siehe Liste unter der Tabelle. |
| period_back (replaced hours_to_show)      | string [(period code)](#zeitraumcodes-erklärt) |         |    -     | Zeitraum von einem angegebenen Zeitpunkt in der Vergangenheit bis jetzt. Siehe [Zeitraumcodes erklärt](#zeitraumcodes-erklärt). |
| from_hour_of_day                          |                     number                     |         |    -     | Messwerte ab der angegebenen Tagesstunde bis jetzt. 0 bedeutet Mitternacht. Liegt die Stunde noch in der Zukunft, wird die vorherige Tagesstunde verwendet. |
| from_period_ago (replaced from_hours_ago) | string [(period code)](#zeitraumcodes-erklärt) |         |    -     | Start des Zeitraums als relativer Zeitpunkt vor dem Ende `to_period_ago`. |
| to_period_ago (replace to_hours_ago)      | string [(period code)](#zeitraumcodes-erklärt) |         |    -     | Ende des Zeitraums als relativer Zeitpunkt nach `from_period_ago`. |
| from_date                                 |            string, ISO format date             |         |    -     | Startzeitpunkt als Datum und Uhrzeit im ISO-Format, zusammen mit `to_date`. |
| to_date                                   |            string, ISO format date             |         |    -     | Endzeitpunkt als Datum und Uhrzeit im ISO-Format, zusammen mit `from_date`. |

#### Verfügbare Werte für preset_period

- today
- yesterday
- last_7_days
- last_30_days
- this_week
- last_week
- this_month
- last_month
- last_6_months
- this_year
- last_year

### Objekt buttons_config

Zeigt Schaltflächen mit unterschiedlichen Funktionen an.

| Name            |               Type               | Default | Required | Description                                                                      |
|-----------------|:--------------------------------:|:-------:|:--------:|----------------------------------------------------------------------------------|
| location        |              string              |   top   |    -     | Position der Schaltflächen: `top`, `bottom`, `top-below-text`, `bottom-above-text`. |
| buttons         |     [object](#objekt-button)     |         |    -     | Liste der Schaltflächen. |
| default_colors  | [object](#objekt-button_colors)] |   red   |    -     | Standardfarbe für den Text der aktiven Schaltfläche. |

#### Objekt button

Die Karte unterstützt derzeit vier Schaltflächentypen.
Weitere Informationen und Konfigurationsmöglichkeiten findest du in den folgenden Abschnitten.

#### Schaltflächentyp period_selector
Mit diesem Typ wählst du einen anderen Datenzeitraum aus. Es gelten dieselben Optionen wie für `data_period`.
Ist eine Schaltfläche dieses Typs aktiv, brauchst du das Objekt `data_period` nicht.

| Name                       |              Type               | Default | Required | Description                                                           |
|----------------------------|:-------------------------------:|:-------:|:--------:|-----------------------------------------------------------------------|
| type                       |             string              |         |    x     | Fester Wert: `period_selector`. |
| button_text                |             string              |         |    x     | Text der Schaltfläche. |
| new_row                    |             boolean             |  false  |    -     | Beginnt für diese und alle folgenden Schaltflächen eine neue Zeile. |
| colors                     | [object](#objekt-button_colors) |         |    -     | Individuelle Schaltflächenfarben; überschreiben die Standardfarben aus `buttons_config`. |
| active                     |             boolean             |  false  |    -     | Ob die Schaltfläche anfänglich aktiv ist und damit den Startzeitraum bestimmt. |
| The data period properties |                                 |         |    -     | Zeitraumoptionen wie im [Objekt data_period](#objekt-data_period). |

```yaml
buttons_config:
  buttons:
    - type: period_selector
      button_text: 100h
      period_back: -100h
```

#### Schaltflächentyp period_shift
Verschiebt den Datenzeitraum um den angegebenen Wert. Dies funktioniert mit allen Zeitraumtypen. Bei `period_back` bleibt beispielsweise die Dauer des Zeitfensters erhalten.
Durch erneutes Klicken auf die Schaltfläche `period_selector` wird der Zeitraum zurückgesetzt.
Der Zeitraum kann nicht in die Zukunft verschoben werden.
Beim Wechsel werden keine Übergangsanimationen verwendet.

| Name         |                      Type                      | Default | Required | Description                                                                    |
|--------------|:----------------------------------------------:|:-------:|:--------:|--------------------------------------------------------------------------------|
| type         |                     string                     |         |    x     | Fester Wert: `period_shift`. |
| button_text  |                     string                     |         |    x     | Text der Schaltfläche. |
| colors       |        [object](#objekt-button_colors)         |         |    -     | Individuelle Schaltflächenfarben; überschreiben die Standardfarben aus `buttons_config`. |
| shift_period | string [(period code)](#zeitraumcodes-erklärt) |         |    -     | Verschiebt das Zeitfenster vor- oder rückwärts. |

```yaml
buttons_config:
  buttons:
    - type: period_shift
      button_text: "-1h"
      shift_period: -1h
    - type: period_shift
      button_text: "+1h"
      shift_period: +1h
```

#### Schaltflächentyp period_shift_play (EXPERIMENTELL)
Spielt die Veränderungen der Windrose innerhalb eines Zeitraums als Animation ab.
Der unter den Datenzeitraumoptionen eingestellte Zeitraum bestimmt den gesamten Animationsbereich.
`window_period` legt fest, wie groß das jeweils dargestellte Zeitfenster ist.
`step_period` verschiebt dieses Zeitfenster schrittweise, bis das Ende des eingestellten Zeitraums erreicht ist.
Für den Wechsel zwischen den Zeitfenstern werden keine zusätzlichen Übergangsanimationen verwendet.

| Name                       |                      Type                      | Default | Required | Description                                                                      |
|----------------------------|:----------------------------------------------:|:-------:|:--------:|----------------------------------------------------------------------------------|
| type                       |                     string                     |         |    x     | Fester Wert: `period_shift_play`. |
| button_text                |                     string                     |         |    x     | Text der Schaltfläche. |
| colors                     |        [object](#objekt-button_colors)         |         |    -     | Individuelle Schaltflächenfarben; überschreiben die Standardfarben aus `buttons_config`. |
| The data period properties |                                                |         |    x     | Zeitraumoptionen wie im [Objekt data_period](#objekt-data_period); sie bestimmen den gesamten Animationszeitraum. |
| step_period                | string [(period code)](#zeitraumcodes-erklärt) |         |    x     | Zeitlicher Abstand zwischen zwei Animationsbildern. |
| window_period              | string [(period code)](#zeitraumcodes-erklärt) |         |    x     | Dauer des Zeitfensters, für das die Windrose jeweils berechnet wird. |
| delay                      |                     number                     |         |    x     | Verzögerung zwischen Bildern in Sekunden, ohne Berechnungszeit. |


```yaml
buttons_config:
  buttons:
    - type: period_shift_play
      preset_period: last_6_months
      button_text: Play
      step_hours: 12
      period_hours: 240
      delay: 50
      use_statistics: true
      statistics_period: hour
 ```

#### Schaltflächentyp windrose_speed_selector
Die Windrose verwendet Messwerte für Windrichtung und Windgeschwindigkeit. Früher wurde dafür immer der erste konfigurierte Geschwindigkeitssensor verwendet.
Mit dieser Schaltfläche lässt sich der verwendete Windgeschwindigkeitssensor auswählen.

Die Eigenschaft `use_for_windrose` unter `windspeed_entities` bestimmt den anfangs verwendeten Sensor.
Beim Sensorwechsel werden keine Übergangsanimationen verwendet.

| Name                       |              Type               | Default | Required | Description                                                                    |
|----------------------------|:-------------------------------:|:-------:|:--------:|--------------------------------------------------------------------------------|
| type                       |             string              |         |    x     | Fester Wert: `windrose_speed_selector`. |
| button_text                |             string              |         |    x     | Text der Schaltfläche. |
| colors                     | [object](#objekt-button_colors) |         |    -     | Individuelle Schaltflächenfarben; überschreiben die Standardfarben aus `buttons_config`. |
| active                     |             boolean             |  false  |    -     | Ob die Schaltfläche anfänglich aktiv ist und den Geschwindigkeitssensor auswählt. |
| windspeed_entity_index     |             number              |         |    x     | Index der Geschwindigkeitsentität für die Windrose; der erste Sensor hat den Index 0. |

```yaml
buttons_config:
  buttons:
    - type: windrose_speed_selector
      windspeed_entity_index: 0
      active: true
      button_text: Windspeed
    - type: windrose_speed_selector
      windspeed_entity_index: 1
      button_text: Gust
```

### Objekt button_colors

Auf Ebene von `buttons_config` lassen sich Standardfarben für alle Schaltflächen festlegen.
Einzelne Schaltflächen können über ihre eigene Konfiguration abweichende Farben verwenden.

| Name                |              Type               | Default | Required | Description                                   |
|---------------------|:-------------------------------:|:-------:|:--------:|-----------------------------------------------|
| active_color        |             string              |   red   |    -     | Textfarbe der aktiven Schaltfläche. |
| active_bg_color     |             string              | inherit |    -     | Hintergrundfarbe der aktiven Schaltfläche. |
| active_border_color |             string              | inherit |    -     | Rahmenfarbe der aktiven Schaltfläche. |
| color               |             string              | inherit |    -     | Textfarbe inaktiver Schaltflächen. |
| bg_color            |             string              | inherit |    -     | Hintergrundfarbe inaktiver Schaltflächen. |
| border_color        |             string              | inherit |    -     | Rahmenfarbe inaktiver Schaltflächen. |

```yaml
buttons_config:
  location: bottom
  default_colors:
    active_color: black
    active_bg_color: yellow
    active_border_color: red
    color: red
    bg_color: inherit
    border_color: gray
  buttons:
    - type: period_shift
      button_text: "-1h"
      hours: -1
      colors:
        color: blue
```

### Zeitraumcodes erklärt

Old versions, hours_to_show, from_hours_ago and to_hours_ago only supported hours. Now al sorts of periods can be used in combination with each-other.

This code is used by the following property's:

General period definition for
- period_back
- from_period_argo / to_period_ago
Buttons:
- Type: period_shift:
- Config: shift_period
- Type: period_shift_play
- Config: step_period, window_period

| Options     | Example | Description                        |
|-------------|:-------:|------------------------------------|
| -ns / +ns   |  -10s   | 10 seconds before now              |
| -nmi / +nmi |  -10mi  | 10 minutes before now              |
| -nh / +nh   |  -10h   | 10 hours before now                |
| -nd / +nd   |  -10d   | 10 days before now                 |
| -nw / +nw   |   -5w   | 5 week before now                  |
| -nm / +nm   |   -2m   | 2 month before now                 |
| -nq / +nq   |   -1q   | 1 year quater before now           |
| -ny / +ny   |   -1y   | 1 year before now                  |
| Combination | -5w+2d  | 5 weeks before then 2 days forward |


### Datenspeicherung in Home Assistant

The period_back option does not have a limit yet. When set higher then is available in Home Assistant, the card will not show a message.
Home Assistant has a default entity state retention of 10 days. This can be changed in the recorder configuration. See [https://www.home-assistant.io/integrations/recorder/#purge_keep_days](https://www.home-assistant.io/integrations/recorder/#purge_keep_days).

Information about the retrieved entity states, counts, dates can be writen to the browser console (F12).
Set config  log_measurement_counts to true.

```
matching_strategy:
  name: speed-first
  log_measurement_counts: true
```

#### Zustandsdaten
When using entity state data, using an period_back of more then 240 hours (10 days, in reality it's a little bit more) will not give the card more measurements.

#### Statistikdaten
When using statistics data, the card uses 5 minute period by default. This is short-term statistics and will not contain more then 10 days (default) history.
You can change the default period with the statistics_period config.
Keep in mind that the measurement interval for the direction and speed sensor should not differ very much for the best results.
So, using monthly for the direction sensor and a 5minute period for the speed sensor will not give a graph with useful information I think.

The statistics_type options is only supported by the wind speed sensor. More info [https://www.home-assistant.io/integrations/statistics/](https://www.home-assistant.io/integrations/statistics/).

Info about circular statistics: [https://en.wikipedia.org/wiki/Circular_mean](https://en.wikipedia.org/wiki/Circular_mean).

More info about Home Assistant statistics data: [https://data.home-assistant.io/docs/statistics/](https://data.home-assistant.io/docs/statistics/).

### Objekt wind_direction_entity

As of version 1.8.2 the direction unit is determined automatic.
When the state is numeric, a degree value is assumed. When the state is letters, the direction is determined with the letter combination.

| Name                   |  Type   | Default | Required | Description                                                                                                                                                                                                                               |
|------------------------|:-------:|:-------:|:--------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entity                 | string  |         |    x     | Wind direction entity                                                                                                                                                                                                                     |
| attribute              | string  |         |    -     | If used, not the state but the attributes value is displayed.                                                                                                                                                                             |
| use_statistics         | boolean |  false  |    -     | Use Home Assistant 5 minute statistics data, works only if available for this entity. Can make fetching data faster.                                                                                                                      |
| statistics_period      | string  | 5minute |    -     | Statistics period, possible options: 5minute, hour, day, week, month and year. More info about [data retention](#datenspeicherung-in-home-assistant)                                                                                           |
| direction_compensation | number  |    0    |    -     | Compensate the measured direction in degrees.                                                                                                                                                                                             |
| direction_letters      | string  |  NESWX  |    -     | Only used when the state consists of letters. Some weather integrations use language specific letters. With this property you can change the default letters used. See https://en.wikipedia.org/wiki/Points_of_the_compass for more info. |


### Objekt windspeed_entities

See [here](#beispiele-mit-eigenen-geschwindigkeitsbereichen) for some example speed ragne configurations.

| Name                         |                  Type                  |           Default            | Required | Description                                                                                                                                                                                          |
|------------------------------|:--------------------------------------:|:----------------------------:|:--------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entity                       |                 string                 |                              |    x     | Wind speed entity.                                                                                                                                                                                   |
| attribute                    |                 string                 |                              |    -     | If used, not the state but the attributtes value is deplayed.                                                                                                                                        |
| name                         |                 string                 |                              |    -     | Label, displayed with the windspeed bar.                                                                                                                                                             |
| use_statistics               |                boolean                 |            false             |    -     | Use Home Assistant 5 minute statistics data, works only if available for this entity. Can make fetching data faster.                                                                                 |
| statistics_period            |                 string                 |           5minute            |    -     | Statistics period, possible options: 5minute, hour, day, week, month and year. More info about [data retention](#datenspeicherung-in-home-assistant)                                                      |
| statistics_type              |                 string                 |             mean             |    -     | Statistics type, possible options: min, max and mean                                                                                                                                                 |
| use_for_windrose             |                boolean                 |      first entity true       |    -     | If true, this entity's data is used for the windrose graph. Can be changed with button type windrose_speed_selector                                                                                  |
| speed_unit                   |   [string](#unterstützte-windgeschwindigkeitseinheiten)    |             auto             |    -     | Windspeed unit of measurement, see Windspeed unit options bellow. When the speed_range_beaufort property is not set or set to true, the bars will show Beaufort ranges.                              |
| windspeed_bar_full           |                boolean                 |             true             |    -     | When true, renders all wind ranges, when false, doesn't render the speed range without measurements.                                                                                                 |
| output_speed_unit            |                 string                 |             mps              |    -     | Windspeed unit used on card, see Windspeed unit options bellow.                                                                                                                                      |
| output_speed_unit_label      |                 string                 |                              |    -     | Overwrite the output speed units name, only for display.                                                                                                                                             |
| speed_range_beaufort         |                boolean                 |             true             |    -     | Uses the Beaufort speed ranges. The exact Beaufort ranges depend on the output windspeed unit. Default is true, when you want to show other speed unit on the bar graph, set this property to false. |
| speed_range_step             |                 number                 | depends on output speed unit |    -     | Sets the speed range step to use. Not possible for output speed unit bft (Beaufort) .                                                                                                                |
| speed_range_max              |                 number                 | depends on output speed unit |    -     | Sets the speed range max to use. Not possible for output speed unit bft (Beaufort). For example: step 5, max 20 creates ranges: 0-5, 5-10, 10-15, 15-20, 20-infinity                                 |
| speed_ranges                 |     [object](#objekt-speed_ranges)     | depends on output speed unit |    -     | Define custom speedranges and colours.                                                                                                                                                               |
| dynamic_speed_ranges         | [object](#objekt-dynamic_speed_ranges) |                              |    -     | Speed range step and max config, depending on the average wind speed                                                                                                                                 |
| current_speed_arrow          |                boolean                 |            false             |    -     | Animates an arrow on the windspeed bar indicating the current wind speed.                                                                                                                            |
| current_speed_arrow_size     |                 number                 |              40              |    -     | Current speed arrow size                                                                                                                                                                             |
| current_speed_arrow_location |                 string                 |        above or left         |    -     | Current speed arrow location, options: above, below, left and right. Options are valid depending on speed bar location.                                                                              |
| bar_render_scale             |    [string](#skalierungsoptionen)     |      windspeed_relative      |    -     | Segment scales in the windbar, options: absolute, windspeed_relative and percentage_relative.                                                                                                        |
| bar_label_text_size          |                 number                 |              40              |    -     | Bar name en unit text size.                                                                                                                                                                          |
| bar_speed_text_size          |                 number                 |              40              |    -     | Bar speed text size.                                                                                                                                                                                 |
| bar_percentage_text_size     |                 number                 |              40              |    -     | Bar percentage text size.                                                                                                                                                                            |
| speed_compensation_factor    |                 number                 |              1               |    -     | Compensation factor of the windspeed after conversion to the output speed unit.                                                                                                                      |
| speed_compensation_absolute  |                 number                 |              0               |    -     | Increases or decreases the windspeed after conversion to the output speed unit. WHen using both factor and this, this one is first calculated.                                                       |


### Skalierungsoptionen:

| Name                | Description                                               |                                                                                                                                                                    | Default |
|---------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------:|
| absolute            | Evenly distributes the segments.                          | <img alt="Pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windbar-example-absolute.png?raw=true" width="412"/>            |    | 
| windspeed_relative  | Renders the segments relative to the speedrange size.     | <img alt="Pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windbar-example-windspeed-relative.png?raw=true" width="412"/>  | x  | 
| percentage_relative | Renders the segments relative to the percentage measured. | <img alt="Pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windbar-example-percentage-relative.png?raw=true" width="412"/> |    | 


### Unterstützte Windgeschwindigkeitseinheiten:

Default is auto. When no windspeed unit is configured, the unit_of_measurement from Home Assisstant is used.
When using entity attributes, the speed unit will probably not be auto determined. Then you need to add the speed_unit property.

When your windspeed entity uses an unit of measurement not mentioned in the table below, please open an issue in GitHub.

| Name     |    Description     | Input | Output | Recognized HA units of measurements |
|----------|:------------------:|:-----:|:------:|-------------------------------------|
| auto     |     automatic      |   x   |        |                                     |
| Beaufort |      Beaufort      |   x   |        | Beaufort                            |
| mps      | metres per second  |   x   |   x    | mps, m/s                            |
| kph      | kilometer per hour |   x   |   x    | kph, km/h                           |
| mph      |   miles per hour   |   x   |   x    | mps, m/h                            |
| fps      |  feet per second   |   x   |   x    | fps, f/s                            |
| knot     |       knots        |   x   |   x    | knots, kts, knts, kn, knot          |


### Objekt speed_ranges

| Name       |  Type  | Default | Required | Description                  |
|------------|:------:|:-------:|:--------:|------------------------------|
| from_value | number |         |    x     | Start speed of a speed range |
| color      | string |         |    x     | Color CSS value              |

<details>
<summary>It can be convenient to generate speed_ranges using Python. Credits to @reidprichard</summary>

Just enter in the name of any colormap from [this page](https://matplotlib.org/stable/gallery/color/colormap_reference.html),
along with your desired upper and lower bounds and the increment from one range to the next.

```yaml
windspeed_entities:
  - entity: sensor.wind_speed
    name: Speed
    speed_range_beaufort: false
    speed_ranges:
      - from_value: 0
        color: rgb(0,255,0)
      - from_value: 5
        color: blue
      - from_value: 10
        color: hsl(200, 100%, 60%)
      - from_value: 20
        color: orange
      - from_value: 40
        color: red
```

```python3
from matplotlib import colormaps
MIN_SPEED = 0
MAX_SPEED = 50
SPEED_INCREMENT = 10
COLORMAP_NAME = "YlGnBu" # See https://matplotlib.org/stable/gallery/color/colormap_reference.html
cmap = colormaps[COLORMAP_NAME]
count = (MAX_SPEED-MIN_SPEED)//SPEED_INCREMENT+1
print("speed_ranges:")
for i in range(count):
    f = i/(count-1)
    color_rgba = cmap(f)
    color_scaled = f"rgb({','.join([str(int(n*255)) for n in color_rgba[:3]])})"
    speed = MIN_SPEED + (MAX_SPEED - MIN_SPEED)*f
    print(f'  - from_value: {speed:.1f}\n    color: {color_scaled}')
```
</details>

### Objekt dynamic_speed_ranges

When using dynamic speed range, speed_range_beaufort should be false.

| Name          |  Type   | Default | Required | Description                                                                                                                                                                      |
|---------------|:-------:|:-------:|:--------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| average_above | number  |         |    x     | Average wind speed above or equal this value. Option with 0 is required. Speed defined here should be in the output speed unit. If none is defined, it's meter per second (mps). |
| step          | number  |         |    x     | Range steps to be used if average speed is above configurated value.                                                                                                             |
| max           | number  |         |    x     | Max speed, used to calculate how many steps are used.                                                                                                                            |

```yaml
windspeed_entities:
  - entity: sensor.wind_speed
    name: Speed
    speed_range_beaufort: false
    dynamic_speed_ranges:
      - average_above: 0
        step: 2
        max: 10
      - average_above: 10
        step: 4
        max: 20
      - average_above: 15
        step: 8
        max: 30
```

### Objekt direction_labels

| Name                                         |  Type   | Default | Required | Description                                                                                                                                                                          |
|----------------------------------------------|:-------:|:-------:|:--------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cardinal_direction_letters                   | number  |  NESW   |          | The property is used to configure what is displayed on the windrose. Only 4 letters allowed. It is not used to parse sensor states. The direction_letters property is used for that. |
| show_cardinal_directions                     | boolean |  true   |          | If true, renders the cardinal direction labels.                                                                                                                                      |
| show_intercardinal_directions                | boolean |  false  |          | If true, renders the intercardinal directions labels.                                                                                                                                |
| show_secondary_intercardinal_directions      | boolean |  false  |          | If true, renders the secondary intercardinal direction labels.                                                                                                                       |
| cardinal_directions_text_size                | number  |   50    |          | Cardinal direction label text size.                                                                                                                                                  |
| intercardinal_directions_text_size           | number  |   40    |          | Intercardinal direction label text size.                                                                                                                                             |
| secondary_intercardinal_directions_text_size | number  |   30    |          | Secondary intercardinal direction label text size.                                                                                                                                   |
| custom_labels                                | object  |         |          | Custom labels, to override auto generated labels base on the cardinal_direction_letters property. More info below.                                                                   |

The 4 letters of cardinal_direction_letters property are used to construct all direction labels.
To use custom labels, add the custom_labels property. See example below.

It's not mandatory to define all custom_labels options.
Just define the ones you want to overwrite with a custom text.

```yaml
direction_labels:
   cardinal_direction_letters: ABCD
   show_cardinal_directions: true
   show_intercardinal_directions: true
   show_secondary_intercardinal_directions: true
   cardinal_directions_text_size: 60
   intercardinal_directions_text_size: 45
   secondary_intercardinal_directions_text_size: 30
   custom_labels:
      n: A
      e: B
      s: C
      w: D
      ne: E
      se: F
      sw: G
      nw: H
      nne: I
      ene: J
      ese: K
      sse: L
      ssw: M
      wsw: N
      wnw: O
      nnw: P
```

### Objekt current_direction

Shows the current wind direction. The arrow is pointing too where to wind is flowing too.
When the sensor state is not a direction a red center dot is displayed.
Some sensors can have a value like CALM or VRB, indicating there is no direction measured.

| Name                       |  Type   | Default | Required | Description                                                                                                                                     |
|----------------------------|:-------:|:-------:|:--------:|-------------------------------------------------------------------------------------------------------------------------------------------------|
| show_arrow                 | boolean |  false  |    x     | Start speed of a speed range                                                                                                                    |
| arrow_direction            | string  |   in    |          | Direction of the arrow: in = pointing inward (toward the center). out = pointing outward (away from the center)                                 |
| arrow_locatoin             | string  |  from   |          | Location of the arrow: from = wind origin (where the wind comes from), to = wind destination (where the wind blows towards)                     |
| arrow_size                 | number  |   50    |          | Size of the arrow                                                                                                                               |
| center_circle_size         | number  |   30    |          | Size of the center circle, only when not using center_calm_percentage. Then a red circle is displayed around the center percentage.             |
| hide_direction_below_speed | number  |         |          | When current windspeed (output speed unit is used) is equal or below this value, the arrow is hidden and the center red dot or circle is shown. |                                                                                                                                      |


### Objekt compass_direction

This configuration is only needed if you want the windrose to rotate on a compass entity.
Useful on for example a boat.
You can also make a helper number entity to rotate the windrose on manual input.

| Name        |  Type   | Default | Required | Description                                                   |
|-------------|:-------:|:-------:|:--------:|---------------------------------------------------------------|
| auto_rotate | boolean |         |    x     | Use auto rotation, false to turn off.                         |
| entity      | string  |         |    x     | Compass or other direction entity, needs degrees as unit.     |
| attribute   | string  |         |          | If used, not the state but the attributtes value is deplayed. |
| as_heading  | boolean |  false  |          | Use compass degrees as heading instead of north direction.    |


### Objekt corner_info

Configuration for displaying information in the corners around the windrose.

| Name         |  Type  | Default | Required | Description                          |
|--------------|:------:|:-------:|:--------:|--------------------------------------|
| top_left     | object |         |          | Configration for top left corner     |
| top_right    | object |         |          | Configration for top right corner    |
| bottom_left  | object |         |          | Configration for bottom left corner  |
| bottom_right | object |         |          | Configration for bottom right corner |

### Objekt top_left, top_right, bottom_left und bottom_right

| Name              |  Type  |       Default        | Required | Description                                                                                                                   |
|-------------------|:------:|:--------------------:|:--------:|-------------------------------------------------------------------------------------------------------------------------------|
| label             | string |                      |          | Label                                                                                                                         |
| unit              | string |                      |          | Unit, displayed after the state, without a space. If you need space, add it to the config.                                    |
| color             | string | --primary-text-color |          | Color of the text.                                                                                                            |
| label_text_size   | number |          50          |          | The text size of the label.                                                                                                   |
| value_text_size   | number |          80          |          | The text size of the entity's state.                                                                                          |
| entity            | string |                      |    x     | State of the entity will be displayed                                                                                         |
| attribute         | string |                      |          | If used, not the state but the attributes value is deplayed.                                                                  |
| input_unit        | string |                      |          | Input unit, not automatically determined. See for options [Unit conversion](#einheitenumrechnung-in-den-eckinformationen)                     |
| output_unit       | string |                      |          | Output unit                                                                                                                   |
| precision         | string |                      |          | Overwrites (if available) the precision of the entity. For rounding the value, for example after converting to an other unit. |
| direction_letters | string |         NESW         |          | The cardinal direction letters used for winddirection conversion. When using 4 letters, the x directions will not be used.    |

### Einheitenumrechnung in den Eckinformationen

Supported unit types for windspeed sensors:

| Config | Description        |
|--------|--------------------|
| bft    | Beaufort           |
| mps    | Meter per second   |
| kph    | Kilometer per hour |
| mph    | Miles per hour     |
| fps    | Feet per second    |
| knots  | Knots              |

Supported unit types for wind directions sensors:

| Config  | Description                                 |
|---------|---------------------------------------------|
| degrees | Direction in degreees, number from 0 to 359 |
| letters | Cardinal direction letters                  |


The units degrees and letters can only be used in combination with each other.
The card does not check the sensor type you are using. So, converting a light switch from degreees to letters will result in errors in the browsers console.

### YAML-Beispiel für corner_info
```yaml
corner_info:
  top_left:
    label: Current gust speed
    unit: ' m/s'
    entity: sensor.gorredijk_wind_gust
    label_text_size: 40
    value_text_size: 30
    input_unit: kph
    output_unit: mps
    precision: 2
  top_right:
    label: Wind direction
    unit: °
    color: red
    entity: sensor.gorredijk_wind_direction_azimuth
    input_unit: degrees
    output_unit: letters
    direction_letters: NOZWX
  bottom_left:
    label: Compass
    unit: °
    entity: input_number.compass
```

### Objekt text_blocks

Configuration for displaying information above and below the windrose.
The buttons can be configured above or below the text.

Specific values can be displayed in the text.


| Name         |  Type  | Default | Required | Description                               |
|--------------|:------:|:-------:|:--------:|-------------------------------------------|
| top          | object |         |          | Configration for text above the windrose. |
| bottom       | object |         |          | Configration for text below the windrose. |


### Objekt top und bottom

| Name              |  Type  |       Default        | Required | Description                                             |
|-------------------|:------:|:--------------------:|:--------:|---------------------------------------------------------|
| text              | string |                      |          | Text to show, more info below on how to display values. |
| text_size         | string |                      |          | Text size in css pixels                                 |
| text_color        | string | --primary-text-color |          | Text color, css value                                   |

### Einzelne Werte anzeigen

You can use the values in the table below and any Home Assistant entity state or attribute.
The name should be wrapped like this:

Values table below: ```${match-count}```

For entity state: ```${sensor.windspeed}```

For entity attribute: ```${sensor.windspeed.unit_of_measurement}```

Html and styling is supported in the text. A HTML table is used in the example below.
To prevent HA from reformating your config, use |-

```yaml
text_blocks:
   top:
      text: |-
         <table>
             <tr>
                 <td>Direction measure’s:</td>
                 <td>${direction-count}</td>
                 <td>Minimal speed:</td>
                 <td>${min-speed}</td>
             </tr>
             <tr>
                 <td>Speed measure’s.:</td>
                 <td>${speed-1-count}</td>
                 <td>Maximum speed:</td>
                 <td>${max-speed}</td>
             </tr>
             <tr>
                 <td>Match count:</td>
                 <td>${match-count}</td>
                 <td>Average speed:</td>
                 <td>${average-speed}</td>
             </tr>
             <tr>
                 <td>Period hours</td>
                 <td>${period-hours}</td>
                 <td>Calm percentage:</td>
                 <td>${calm-percentage}%</td>
             </tr>
             <tr>
                 <td>Temperature</td>
                 <td>${weather.home.temperature} °C</td>
                 <td>Wind speed</td>
                 <td>${sensor.home_wind_speed} Bft</td>
             </tr>
             <tr>
                 <td>First match time</td><td colspan="2">${date-first-match}, ${time-first-match}</td>
             </tr>
             <tr>
                 <td>Last match time</td><td colspan="2">${date-last-match}, ${time-last-match}</td>
             </tr>
         </table>
```

Available values:

| Name                                                                                          | Description                                                                                                                                         |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| start-time<br/>start-date                                                                     | Start date and time 0f the active period, taking into account changes with the time_shift button.                                                   |
| end-time<br/>end-date                                                                         | End date and time 0f the active period, taking into account changes with the time_shift button.                                                     |
| date-first-direction<br/>time-first-direction<br/>date-last-direction<br/>time-last-direction | Date and time of the first and last direction measurements.                                                                                         |
| direction-count                                                                               | Amount of measurement used by the windrose.                                                                                                         |
| date-first-speed-x</br>time-first-speed-x<br/>date-last-speed-x<br/>time-last-speed-x         | Date and time of the first and last speed measurements. The x should be the index of the windspeed sensor. Index meaning 0 for the first.           | 
| speed-x-count                                                                                 | Amount of measurements used by the windrose. The x should be the index of the windspeed sensor. Index meaning 0 for the first.                      |
| date-first-match<br/>time-first-match<br/>date-last-matc<br/>time-last-match                  | Date and time of the first and last matched direction and speed measurements.<br/>These times should be close to the configured or selected period. |
| match-count                                                                                   | Amount of matches between direction and speed measurements. These values are used in the calculations for the windrose.                             |
| period-minutes                                                                                | Amount of minutes in the selected period.                                                                                                           |                                                                                                                |
| period-hours                                                                                  | Amount of hours in the selected period.                                                                                                             | 
| match-period-minutes                                                                          | Amount of minutes between the first and last matched measurements. This should be close to the configured or selected period.                       |                                                                                                                |
| match-period-hours                                                                            | Amount of hours between the first and last matched measuremetns.                                                                                    | 
| min-speed<br/>max-speed<br/>average-speed                                                     | Wind speed statistics. The first wind speed sensor is used. The first is also used for the windrose.                                                | 
| calm-percentage                                                                               | Percentage of matched measurements in the first speed range. Usually this is the speed range with calm windspeeds.                                  |
| median-speed                                                                                  | Median windspeed (50th percentile)                                                                                                                  |
| q1-speed                                                                                      | Interquartile range (25th percentile)                                                                                                               |
| q3-speed                                                                                      | Interquartile range (75th percentile)                                                                                                               |
| iqr-range                                                                                     | Interquartile range (25th to 75th percentile) - excludes outliers                                                                                   |
| p90-speed                                                                                     | 90th percentile for gusts (excludes the highest 10% outliers)                                                                                       |
| wind-description                                                                              | Weather-style description using IQR                                                                                                                 |

### YAML-Beispiel für text_blocks

<img alt="Text block pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/text-block-example.png?raw=true" width="412"/>


```yaml
text_blocks:
  top:
    text: |-
       <table>
           <tr>
               <td>Direction measure’s:</td>
               <td>${direction-count}</td>
               <td>Minimal speed:</td>
               <td>${min-speed}</td>
           </tr>
           <tr>
               <td>Speed measure’s.:</td>
               <td>${speed-1-count}</td>
               <td>Maximum speed:</td>
               <td>${max-speed}</td>
           </tr>
           <tr>
               <td>Match count:</td>
               <td>${match-count}</td>
               <td>Average speed:</td>
               <td>${average-speed}</td>
           </tr>
           <tr>
               <td colspan="2">First direction time</td><td>${date-first-direction}, ${time-first-direction}</td>
           </tr>
           <tr>
               <td colspan="2">First speed time</td><td>${date-first-speed-0}, ${time-first-speed-0}</td>
           </tr>
       </table>
```

### Objekt actions

The hold, tap and double-tap actions described in the Home Assistant documentation are supported. See link:
[Home Assistant action documentation](https://www.home-assistant.io/dashboards/actions/)

See example yaml below on how to use.
Btw, you can only configure actions for the first 2 speed bars.

| Name         |  Type  | Default | Required | Description                          |
|--------------|:------:|:-------:|:--------:|--------------------------------------|
| top_left     | object |         |          | Configration for top left corner     |
| top_right    | object |         |          | Configration for top right corner    |
| bottom_left  | object |         |          | Configration for bottom left corner  |
| bottom_right | object |         |          | Configration for bottom right corner |
| windrose     | object |         |          | Configration for the windrose        |
| speed_bar_1  | object |         |          | Configration for the first speedbar  |
| speed_bar_2  | object |         |          | Configration for the second speedbar |


Examples:
- **top_right**: toggle light
- **windrose**: navigate to an other page within Home Assitant.
- **buttom_left**: open an url in an other browser tab.
- **others**: show popup with more info about the entity.

### YAML-Beispiel für actions
```yaml
actions:
  top_left:
    tap_action:
      entity: weather.home
      action: more-info
    hold_action:
       entity: weather.holiday_home
       action: more-info
  top_right:
    double_tap_action:
      entity: switch.light
      action: toggle
  windrose:
    tap_action:
      action: navigate
      navigation_path: /lovelace/floorplan
  bottom_right:
    tap_action:
      entity: sensor.wind_direction
      action: more-info
  bottom_left:
    tap_action:
      action: url
      url_path: https://www.home-assistant.io
  speed_bar_1:
    tap_action:
      entity: sensor.wind_speed
      action: more-info
  speed_bar_2:
    tap_action:
      entity: sensor.wind_gust
      action: more-info
```


### Objekt matching_strategy

| Name                   |  Type   | Default | Required | Description                                                                                                                                                         |
|------------------------|:-------:|:-------:|:--------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                   | string  |         |    -     | How to match direction and speed measurements. Find a speed with each direction or a direction with each speed measurement. More info below.                        |
| time_interval          | number  |   60    |    -     | Time interval in seconds. Only used by the time-frame matching strategy. More info below.                                                                           |
| log_measurement_counts | boolean |  false  |    -     | When set to true, will log measurement and match counts to the browsers console. Can be useful to check the data where the graph is based on. Example output below. |

The matching strategies can result in a different graph, depending on your sensors. How many state updates they get.

#### Windrichtung zuerst

Config value: 'direction-first'

Every direction state during the configuration time frame is used for the graph. The algorithm searches for the last speed state at the time of the direction state measurment.
It's possible not all speed state are used in the graph.

#### Windgeschwindigkeit zuerst

Config value: 'speed-first'

Every speed state during the configuration time frame is used for the graph. The algorithm searches for the last direction state at the time of the direction state measurement.
It's possible not all direction states are used in the graph.

It's probably best to choose the sensor that reports the most updates as first.

#### Zeitraster

Config value: 'time-frame'

Extra config: 'time-interval'

Time is leading. For every moment back in time (default every 60 seocnds) the direction and speed states are determined.
For data sources that only update state changes, this should result in a better graph.

For the first two strategies, a percentage in the graph is a percentage of the measurement count not a percentage of time.

### Gesamte Zeitdauer

Config value: 'full-time'

For every speed measurement the wind direction at that timestamp is determined.
The same is done for every direction measurement.
Then for every measurement combination the amount of seconds that combination was active is determined.
With that data the wind rose percentages are calculated.

I think this strategy results in the best graph, but it possibly takes to much CPU power to calculate on some devices.

#### Beispielausgabe der Konsole bei aktiviertem log_measurement_counts
```
Measurements:
Directions: 1213 - 20/01/2025, 18:18:01 - 30/01/2025, 18:11:37
Speed:      964 - 20/01/2025, 18:18:01 - 30/01/2025, 18:01:37
Matches:    1213 - min: 0 - max: 67.3 - average: 24.972333 - strategy: direction-first
```


### Objekt colors
For some values the theme variable --primary-text-color is used. This is needed if HA switches theme and light/dark mode.
CSS color values are allowed.

| Name                                          |  Type  |       Default        | Required | Description                                                                                     |
|-----------------------------------------------|:------:|:--------------------:|:--------:|:------------------------------------------------------------------------------------------------|
| rose_lines                                    | string |  rgb(160, 160, 160)  |          | Circles, borders and the cross color                                                            |
| rose_direction_letters (DEPRECATED)           | string | --primary-text-color |          | Direction labels colors                                                                         |
| rose_cardinal_direction_labels                | string | --primary-text-color |          | Cardinal direction labels color                                                                 |
| rose_intercardinal_direction_labels           | string | --primary-text-color |          | Intercardinal direction labels color                                                            |
| rose_secondary_intercardinal_direction_labels | string | --primary-text-color |          | Secondary intercardinal direction labels color                                                  |
| rose_center_percentage                        | string |         auto         |          | Center circle text color. Auto means black or white depending on background color.              |
| rose_center_background                        | string |         auto         |          | Center circle background. Auto means the same as the background color of the first bar segment. |
| rose_percentages                              | string |         auto         |          | Percentage legend color. Auto means using browsers css mix-blend-mode option.                   |
| rose_current_direction_arrow                  | string |         red          |          | Current direction arrow color                                                                   |
| bar_border                                    | string |  rgb(160, 160, 160)  |          | Bar border color                                                                                |
| bar_unit_name                                 | string | --primary-text-color |          | Unit name color                                                                                 |
| bar_name                                      | string | --primary-text-color |          | Entity name color                                                                               |
| bar_unit_values                               | string | --primary-text-color |          | Unit value color                                                                                |
| bar_percentages                               | string |         auto         |          | Percentage color. Auto means black or white depending on background color.                      |
_
### YAML-Beispiel für colors
```yaml
colors:
  rose_lines: 'rgb(0,255,0)'
  rose_cardinal_direction_labels: 'green'
  rose_intercardinal_direction_labels: 'purple'
  rose_secondary_intercardinal_direction_labels: 'yellow'
  rose_center_percentage: 'red'
  rose_percentages: 'blue'
  rose_current_direction_arrow: 'purple'
  bar_border: 'hsl(200, 100%, 60%)'
  bar_unit_name: 'purple'
  bar_name: 'yellow'
  bar_unit_values: 'blue'
  bar_percentages: 'orange'
```

## Beispiele mit eigenen Geschwindigkeitsbereichen

### Eigene Geschwindigkeitsbereiche mit fester Schrittweite:

Uses speed_range_step and speed_range_max.

<img alt="Pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/speedbar_step_5_max_25.png?raw=true" width="415"/>

```yaml
type: custom:windrose-card
title: Wind direction
data_period:
  period_back: -24h
wind_direction_entity:
  entity: sensor.wind_direction
windspeed_entities:
  - entity: sensor.wind_speed
    name: Average
    windspeed_bar_full: true
    speed_range_beaufort: false
    output_speed_unit: mps
    speed_range_step: 5
    speed_range_max: 25
```

### Individuelle Geschwindigkeitsbereiche

Uses speed_ranges configuration, custom ranges and colors.

Always make sure there is a speedrange starting from 0, otherwise you get this error:

```Speed is not in a speedrange: 0.6 unit: mps```

<img alt="Pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/speedbar_speed_ranges_custom.png?raw=true" width="412"/>

```yaml
type: custom:windrose-card
title: Wind direction
data_period:
  period_back: -24h
wind_direction_entity:
  entity: sensor.wind_direction
windspeed_entities:
  - entity: sensor.wind_speed
    name: Average
    windspeed_bar_full: true
    output_speed_unit: mps
    speed_range_beaufort: false
    speed_ranges:
      - from_value: 0
        color: rgb(0,255,0)
      - from_value: 5
        color: yellow
      - from_value: 10
        color: hsl(200, 100%, 60%)
      - from_value: 20
        color: orange
      - from_value: 40
        color: red
```

## Fehlermeldungen und Probleme
Make sure you have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

Make sure you have the latest versions of `windrose-card.js`.

If you have issues after updating the card, try clearing your browser cache.

If you have issues displaying the card in older browsers, try changing `type: module` to `type: js` at the card reference in `ui-lovelace.yaml`.

## Lizenz
This project is under the MIT license.
