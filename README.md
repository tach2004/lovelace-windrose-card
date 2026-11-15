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

| Name                      |                  Typ                   | Standard | Pflicht | Beschreibung                                                                                                                                                                                                            |
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

| Name                                |               Typ               |      Standard       | Pflicht | Beschreibung                                                                                                                                         |
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


| Name      |               Typ               |       Standard       | Pflicht | Beschreibung                                                                                                                |
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

| Name                                      |                      Typ                      | Standard | Pflicht | Beschreibung                                                                                                                                                                                         |
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

| Name            |               Typ               | Standard | Pflicht | Beschreibung                                                                      |
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

| Name                       |              Typ               | Standard | Pflicht | Beschreibung                                                           |
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

| Name         |                      Typ                      | Standard | Pflicht | Beschreibung                                                                    |
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

| Name                       |                      Typ                      | Standard | Pflicht | Beschreibung                                                                      |
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
      button_text: Abspielen
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

| Name                       |              Typ               | Standard | Pflicht | Beschreibung                                                                    |
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
      button_text: Windgeschwindigkeit
    - type: windrose_speed_selector
      windspeed_entity_index: 1
      button_text: Böen
```

### Objekt button_colors

Auf Ebene von `buttons_config` lassen sich Standardfarben für alle Schaltflächen festlegen.
Einzelne Schaltflächen können über ihre eigene Konfiguration abweichende Farben verwenden.

| Name                |              Typ               | Standard | Pflicht | Beschreibung                                   |
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

In älteren Versionen unterstützten `hours_to_show`, `from_hours_ago` und `to_hours_ago` nur Stunden. Mit den neuen Zeitraumausdrücken lassen sich unterschiedliche Zeiteinheiten kombinieren.

Die Zeitraumausdrücke werden bei folgenden Optionen verwendet:

Allgemeine Zeitraumdefinitionen:
- `period_back`
- `from_period_ago` / `to_period_ago`
Schaltflächen:
- Typ `period_shift`:
  - Option `shift_period`
- Typ `period_shift_play`:
  - Optionen `step_period` und `window_period`

| Optionen | Beispiel | Beschreibung |
|-------------|:-------:|------------------------------------|
| -ns / +ns   |  -10s   | Zehn Sekunden zurück. |
| -nmi / +nmi |  -10mi  | Zehn Minuten zurück. |
| -nh / +nh   |  -10h   | Zehn Stunden zurück. |
| -nd / +nd   |  -10d   | Zehn Tage zurück. |
| -nw / +nw   |   -5w   | Fünf Wochen zurück. |
| -nm / +nm   |   -2m   | Zwei Monate zurück. |
| -nq / +nq   |   -1q   | Ein Quartal zurück. |
| -ny / +ny   |   -1y   | Ein Jahr zurück. |
| Combination | -5w+2d  | Fünf Wochen zurück und anschließend zwei Tage vorwärts. |


### Datenspeicherung in Home Assistant

Für `period_back` gibt es derzeit keine feste Obergrenze. Ist der Zeitraum größer als die in Home Assistant gespeicherte Historie, zeigt die Karte dafür keine gesonderte Meldung an.
Home Assistant speichert Entitätszustände standardmäßig zehn Tage lang. Dieser Wert lässt sich in der Recorder-Konfiguration ändern: [purge_keep_days](https://www.home-assistant.io/integrations/recorder/#purge_keep_days).

Informationen über die abgerufenen Entitätszustände, ihre Anzahl und Zeitstempel lassen sich in der Browserkonsole (F12) ausgeben.
Setze dazu `log_measurement_counts` auf `true`.

```
matching_strategy:
  name: speed-first
  log_measurement_counts: true
```

#### Zustandsdaten
Bei Zustandsdaten liefert ein `period_back` von mehr als 240 Stunden (zehn Tagen, tatsächlich geringfügig mehr) normalerweise keine zusätzlichen Messungen.

#### Statistikdaten
Bei Statistikdaten verwendet die Karte standardmäßig 5-Minuten-Intervalle. Diese Kurzzeitstatistik wird in Home Assistant standardmäßig zehn Tage lang gespeichert.
Mit `statistics_period` lässt sich ein anderes Intervall festlegen.
Für ein brauchbares Ergebnis sollten sich die Messintervalle von Richtungs- und Geschwindigkeitssensor nicht zu stark unterscheiden.
Eine monatliche Richtungsstatistik zusammen mit einer 5-Minuten-Geschwindigkeitsstatistik ergibt beispielsweise kaum ein sinnvolles Diagramm.

`statistics_type` wird nur für Windgeschwindigkeitssensoren unterstützt. Weitere Informationen: [Home-Assistant-Statistik](https://www.home-assistant.io/integrations/statistics/).

Informationen zu zirkulären Statistiken: [Zirkulärer Mittelwert](https://en.wikipedia.org/wiki/Circular_mean).

Weitere Informationen zu Statistikdaten: [Home Assistant Data Science Portal](https://data.home-assistant.io/docs/statistics/).

### Objekt wind_direction_entity

Seit Version 1.8.2 wird die Einheit der Windrichtung automatisch erkannt.
Bei numerischen Zuständen nimmt die Karte Gradwerte an. Besteht der Zustand aus Buchstaben, wird die Windrichtung anhand der Buchstabenkombination ermittelt.

| Name                   |  Typ   | Standard | Pflicht | Beschreibung                                                                                                                                                                                                                               |
|------------------------|:-------:|:-------:|:--------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entity                 | string  |         |    x     | Windrichtungsentität. |
| attribute              | string  |         |    -     | Bei Angabe eines Attributs wird dessen Wert statt des Entitätszustands verwendet. |
| use_statistics         | boolean |  false  |    -     | Verwendet Home-Assistant-Statistikdaten in 5-Minuten-Schritten, sofern für die Entität verfügbar. Kann den Datenabruf beschleunigen. |
| statistics_period      | string  | 5minute |    -     | Statistikintervall: `5minute`, `hour`, `day`, `week`, `month` oder `year`. Siehe [Datenspeicherung](#datenspeicherung-in-home-assistant). |
| direction_compensation | number  |    0    |    -     | Korrigiert die gemessene Windrichtung um einen Winkel in Grad. |
| direction_letters      | string  |  NESWX  |    -     | Nur für Sensorzustände aus Buchstaben. Hier lassen sich sprachabhängige Richtungsbuchstaben angeben. Siehe [Kompassrichtungen](https://en.wikipedia.org/wiki/Points_of_the_compass). |


### Objekt windspeed_entities

[Hier](#beispiele-mit-eigenen-geschwindigkeitsbereichen) findest du Beispiele für die Konfiguration eigener Geschwindigkeitsbereiche.

| Name                         |                  Typ                  |           Standard            | Pflicht | Beschreibung                                                                                                                                                                                          |
|------------------------------|:--------------------------------------:|:----------------------------:|:--------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entity                       |                 string                 |                              |    x     | Entität für die Windgeschwindigkeit. |
| attribute                    |                 string                 |                              |    -     | Bei Angabe eines Attributs wird dessen Wert statt des Zustands angezeigt. |
| name                         |                 string                 |                              |    -     | Beschriftung neben dem Geschwindigkeitsbalken. |
| use_statistics               |                boolean                 |            false             |    -     | Verwendet Home-Assistant-Statistikdaten in 5-Minuten-Schritten, sofern verfügbar. Kann den Abruf beschleunigen. |
| statistics_period            |                 string                 |           5minute            |    -     | Statistikintervall: `5minute`, `hour`, `day`, `week`, `month` oder `year`. |
| statistics_type              |                 string                 |             mean             |    -     | Statistiktyp: `min`, `max` oder `mean`. |
| use_for_windrose             |                boolean                 |      first entity true       |    -     | Ist diese Option `true`, werden die Messwerte dieser Entität für die Windrose verwendet. Eine Änderung ist über `windrose_speed_selector` möglich. |
| speed_unit                   |   [string](#unterstützte-windgeschwindigkeitseinheiten)    |             auto             |    -     | Eingabeeinheit der Windgeschwindigkeit. Siehe die Tabelle der unterstützten Einheiten. Ist `speed_range_beaufort` nicht angegeben oder `true`, werden Beaufort-Bereiche dargestellt. |
| windspeed_bar_full           |                boolean                 |             true             |    -     | Bei `true` werden alle Geschwindigkeitsbereiche gezeichnet, bei `false` nur Bereiche mit Messwerten. |
| output_speed_unit            |                 string                 |             mps              |    -     | Ausgabeeinheit der Karte, siehe die unterstützten Windgeschwindigkeitseinheiten. |
| output_speed_unit_label      |                 string                 |                              |    -     | Überschreibt den angezeigten Namen der Ausgabeeinheit. |
| speed_range_beaufort         |                boolean                 |             true             |    -     | Verwendet Beaufort-Bereiche. Deren Grenzen hängen von der Ausgabeeinheit ab. Für andere Bereiche `false` setzen. |
| speed_range_step             |                 number                 | depends on output speed unit |    -     | Schrittweite der Geschwindigkeitsbereiche. Nicht bei der Ausgabeeinheit `bft` möglich. |
| speed_range_max              |                 number                 | depends on output speed unit |    -     | Maximaler Bereichswert. Beispiel: Schrittweite 5 und Maximum 20 erzeugen 0–5, 5–10, 10–15, 15–20 und 20–unendlich. |
| speed_ranges                 |     [object](#objekt-speed_ranges)     | depends on output speed unit |    -     | Individuelle Geschwindigkeitsbereiche und Farben definieren. |
| dynamic_speed_ranges         | [object](#objekt-dynamic_speed_ranges) |                              |    -     | Dynamische Schrittweite und Obergrenze abhängig von der mittleren Windgeschwindigkeit. |
| current_speed_arrow          |                boolean                 |            false             |    -     | Animiert einen Pfeil auf dem Balken, der die aktuelle Windgeschwindigkeit zeigt. |
| current_speed_arrow_size     |                 number                 |              40              |    -     | Größe des Pfeils für die aktuelle Geschwindigkeit. |
| current_speed_arrow_location |                 string                 |        above or left         |    -     | Position des Pfeils: `above`, `below`, `left` oder `right`; abhängig von der Balkenausrichtung. |
| bar_render_scale             |    [string](#skalierungsoptionen)     |      windspeed_relative      |    -     | Skalierung der Balkensegmente: `absolute`, `windspeed_relative` oder `percentage_relative`. |
| bar_label_text_size          |                 number                 |              40              |    -     | Schriftgröße für den Balkennamen und die Einheit. |
| bar_speed_text_size          |                 number                 |              40              |    -     | Schriftgröße der Geschwindigkeitswerte. |
| bar_percentage_text_size     |                 number                 |              40              |    -     | Schriftgröße der Prozentangaben. |
| speed_compensation_factor    |                 number                 |              1               |    -     | Korrekturfaktor für die Windgeschwindigkeit nach der Umrechnung in die Ausgabeeinheit. |
| speed_compensation_absolute  |                 number                 |              0               |    -     | Additive Korrektur nach der Einheitenumrechnung. Wird zusätzlich ein Faktor verwendet, erfolgt die additive Korrektur zuerst. |


### Skalierungsoptionen:

| Name | Beschreibung | Standard | Default |
|---------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------:|
| absolute            | Die Segmente werden gleichmäßig verteilt. | <img alt="Pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windbar-example-absolute.png?raw=true" width="412"/>            |    | 
| windspeed_relative  | Renders the segments relative to the speedrange size.     | <img alt="Vorschau" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windbar-example-windspeed-relative.png?raw=true" width="412"/>  | Die Segmentbreite richtet sich nach der Größe des jeweiligen Geschwindigkeitsbereichs. | 
| percentage_relative | Die Segmentbreite richtet sich nach dem gemessenen Prozentanteil. | <img alt="Pevriew" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/windbar-example-percentage-relative.png?raw=true" width="412"/> |    | 


### Unterstützte Windgeschwindigkeitseinheiten:

Die Standardeinstellung ist `auto`. Ist keine Geschwindigkeitseinheit angegeben, übernimmt die Karte `unit_of_measurement` aus Home Assistant.
Bei der Verwendung von Entitätsattributen lässt sich die Einheit möglicherweise nicht automatisch bestimmen. Gib in diesem Fall `speed_unit` ausdrücklich an.

Falls dein Sensor eine Einheit verwendet, die in der folgenden Tabelle fehlt, erstelle bitte ein GitHub-Issue.

| Name | Beschreibung | Eingabe | Ausgabe | Erkannte HA-Einheiten |
|----------|:------------------:|:-----:|:------:|-------------------------------------|
| auto     | Automatisch. |   x   |        |                                     |
| Beaufort |      Beaufort      |   x   |        | Beaufort. |
| mps      | metres per second  |   x   |   x    | Meter pro Sekunde. |
| kph      | kilometer per hour |   x   |   x    | Kilometer pro Stunde. |
| mph      |   miles per hour   |   x   |   x    | Meilen pro Stunde. |
| fps      |  feet per second   |   x   |   x    | Fuß pro Sekunde. |
| knot     |       knots        |   x   |   x    | Knoten. |


### Objekt speed_ranges

| Name | Typ | Standard | Pflicht | Beschreibung |
|------------|:------:|:-------:|:--------:|------------------------------|
| from_value | number |         |    x     | Untere Geschwindigkeitsgrenze des Bereichs. |
| color      | string |         |    x     | CSS-Farbwert. |

<details>
<summary>It can be convenient to generate speed_ranges using Python. Credits to @reidprichard</summary>

Gib den Namen einer Farbskala von [dieser Seite](https://matplotlib.org/stable/gallery/color/colormap_reference.html) ein.
Lege zusätzlich die obere und untere Grenze sowie die Schrittweite der Bereiche fest.

```yaml
windspeed_entities:
  - entity: sensor.wind_speed
    name: Geschwindigkeit
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

Bei dynamischen Geschwindigkeitsbereichen muss `speed_range_beaufort` auf `false` gesetzt werden.

| Name | Typ | Standard | Pflicht | Beschreibung |
|---------------|:-------:|:-------:|:--------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| average_above | number  |         |    x     | Mittlere Windgeschwindigkeit mindestens auf diesem Wert. Eine Variante mit 0 ist erforderlich. Die Werte müssen in der Ausgabeeinheit angegeben werden (standardmäßig m/s). |
| step          | number  |         |    x     | Schrittweite, wenn der Mittelwert über dem konfigurierten Schwellenwert liegt. |
| max           | number  |         |    x     | Obergrenze für die Berechnung der Bereichsanzahl. |

```yaml
windspeed_entities:
  - entity: sensor.wind_speed
    name: Geschwindigkeit
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

| Name                                         |  Typ   | Standard | Pflicht | Beschreibung                                                                                                                                                                          |
|----------------------------------------------|:-------:|:-------:|:--------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cardinal_direction_letters                   | number  |  NOSW   |          | Legt die sichtbaren Richtungsbeschriftungen fest. Erlaubt sind vier Buchstaben. Diese Option dient nicht zur Auswertung der Sensorzustände; dafür wird `direction_letters` verwendet. |
| show_cardinal_directions                     | boolean |  true   |          | Zeigt die Haupthimmelsrichtungen an. |
| show_intercardinal_directions                | boolean |  false  |          | Zeigt die Zwischenhimmelsrichtungen an. |
| show_secondary_intercardinal_directions      | boolean |  false  |          | Zeigt die Nebenhimmelsrichtungen an. |
| cardinal_directions_text_size                | number  |   50    |          | Schriftgröße der Haupthimmelsrichtungen. |
| intercardinal_directions_text_size           | number  |   40    |          | Schriftgröße der Zwischenhimmelsrichtungen. |
| secondary_intercardinal_directions_text_size | number  |   30    |          | Schriftgröße der Nebenhimmelsrichtungen. |
| custom_labels                                | object  |         |          | Eigene Beschriftungen überschreiben die automatisch aus `cardinal_direction_letters` erzeugten Texte. |

Aus den vier Buchstaben von `cardinal_direction_letters` erzeugt die Karte die Richtungsbeschriftungen.
Für eigene Beschriftungen verwende `custom_labels`, wie im folgenden Beispiel gezeigt.

Es müssen nicht alle Felder von `custom_labels` angegeben werden.
Gib einfach die Beschriftungen an, die du überschreiben möchtest.

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

Zeigt die aktuelle Windrichtung an. Der Pfeil zeigt wahlweise in die eingestellte Richtung.
Wenn der Sensorzustand keine gültige Richtung enthält, erscheint in der Mitte ein roter Punkt.
Einige Sensoren melden beispielsweise `CALM` oder `VRB`, wenn keine eindeutige Windrichtung vorliegt.

| Name                       |  Typ   | Standard | Pflicht | Beschreibung                                                                                                                                     |
|----------------------------|:-------:|:-------:|:--------:|-------------------------------------------------------------------------------------------------------------------------------------------------|
| show_arrow                 | boolean |  false  |    x     | Aktiviert die Anzeige des Pfeils. |
| arrow_direction            | string  |   in    |          | Pfeilrichtung: `in` nach innen zur Mitte, `out` nach außen. |
| arrow_locatoin             | string  |  from   |          | Pfeilposition: `from` am Ursprung der Windrichtung, `to` am Ziel (wohin der Wind weht). |
| arrow_size                 | number  |   50    |          | Größe des Pfeils. |
| center_circle_size         | number  |   30    |          | Größe des Mittelkreises, wenn `center_calm_percentage` nicht verwendet wird. Dann erscheint ein roter Kreis um die Prozentangabe. |
| hide_direction_below_speed | number  |         |          | Wenn die aktuelle Windgeschwindigkeit kleiner oder gleich diesem Wert ist, wird der Pfeil ausgeblendet und stattdessen ein roter Punkt oder Kreis angezeigt. |                                                                                                                                      |


### Objekt compass_direction

Diese Konfiguration wird nur benötigt, wenn sich die Windrose entsprechend einer Kompassentität drehen soll.
Dies ist beispielsweise auf einem Boot nützlich.
Alternativ kannst du über einen Home-Assistant-Zahlenhelfer eine manuelle Drehung vorgeben.

| Name        |  Typ   | Standard | Pflicht | Beschreibung                                                   |
|-------------|:-------:|:-------:|:--------:|---------------------------------------------------------------|
| auto_rotate | boolean |         |    x     | Aktiviert die automatische Drehung (`false` zum Deaktivieren). |
| entity      | string  |         |    x     | Kompass- oder Richtungsentität mit Gradwerten. |
| attribute   | string  |         |          | Bei Angabe eines Attributs wird dessen Wert statt des Entitätszustands verwendet. |
| as_heading  | boolean |  false  |          | Verwendet den Kompasswinkel als Kursrichtung statt als Nordrichtung. |


### Objekt corner_info

Konfiguration der Informationen in den Ecken rund um die Windrose.

| Name         |  Typ  | Standard | Pflicht | Beschreibung                          |
|--------------|:------:|:-------:|:--------:|--------------------------------------|
| top_left     | object |         |          | Konfiguration für die Ecke oben links. |
| top_right    | object |         |          | Konfiguration für die Ecke oben rechts. |
| bottom_left  | object |         |          | Konfiguration für die Ecke unten links. |
| bottom_right | object |         |          | Konfiguration für die Ecke unten rechts. |

### Objekt top_left, top_right, bottom_left und bottom_right

| Name              |  Typ  |       Standard        | Pflicht | Beschreibung                                                                                                                   |
|-------------------|:------:|:--------------------:|:--------:|-------------------------------------------------------------------------------------------------------------------------------|
| label             | string |                      |          | Beschriftung. |
| unit              | string |                      |          | Einheit, die ohne automatisch eingefügtes Leerzeichen hinter dem Zustand angezeigt wird. Ein benötigtes Leerzeichen muss im Wert enthalten sein. |
| color             | string | --primary-text-color |          | Textfarbe. |
| label_text_size   | number |          50          |          | Schriftgröße der Beschriftung. |
| value_text_size   | number |          80          |          | Schriftgröße des Entitätszustands. |
| entity            | string |                      |    x     | Zeigt den Zustand der angegebenen Entität an. |
| attribute         | string |                      |          | Bei Angabe eines Attributs wird dessen Wert statt des Entitätszustands verwendet. |
| input_unit        | string |                      |          | Eingabeeinheit; wird nicht automatisch erkannt. Siehe [Einheitenumrechnung](#einheitenumrechnung-in-den-eckinformationen). |
| output_unit       | string |                      |          | Ausgabeeinheit. |
| precision         | string |                      |          | Überschreibt die Genauigkeit des Entitätszustands, beispielsweise zum Runden nach einer Einheitenumrechnung. |
| direction_letters | string |         NESW         |          | Richtungsbuchstaben für die Umrechnung. Bei vier Buchstaben werden die zusätzlichen X-Richtungen nicht verwendet. |

### Einheitenumrechnung in den Eckinformationen

Unterstützte Einheiten für Windgeschwindigkeitssensoren:

| Konfiguration | Beschreibung |
|--------|--------------------|
| bft    | Beaufort. |
| mps    | Meter pro Sekunde. |
| kph    | Kilometer pro Stunde. |
| mph    | Meilen pro Stunde. |
| fps    | Fuß pro Sekunde. |
| knots  | Knoten. |

Unterstützte Einheiten für Windrichtungssensoren:

| Konfiguration | Beschreibung |
|---------|---------------------------------------------|
| degrees | Windrichtung in Grad, als Zahl von 0 bis 359. |
| letters | Himmelsrichtungsbuchstaben. |


Die Einheiten `degrees` und `letters` lassen sich nur miteinander kombinieren.
Die Karte prüft nicht den Typ des verwendeten Sensors. Wird beispielsweise ein Lichtschalter von Grad in Buchstaben umgerechnet, entstehen Fehlermeldungen in der Browserkonsole.

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
    label: Windrichtung
    unit: °
    color: red
    entity: sensor.gorredijk_wind_direction_azimuth
    input_unit: degrees
    output_unit: letters
    direction_letters: NOZWX
  bottom_left:
    label: Kompass
    unit: °
    entity: input_number.compass
```

### Objekt text_blocks

Konfiguriert Informationen oberhalb und unterhalb der Windrose.
Schaltflächen lassen sich oberhalb oder unterhalb des Textes platzieren.

Im Text können bestimmte Messwerte und berechnete Werte angezeigt werden.


| Name         |  Typ  | Standard | Pflicht | Beschreibung                               |
|--------------|:------:|:-------:|:--------:|-------------------------------------------|
| top          | object |         |          | Konfiguration des Textes oberhalb der Windrose. |
| bottom       | object |         |          | Konfiguration des Textes unterhalb der Windrose. |


### Objekt top und bottom

| Name              |  Typ  |       Standard        | Pflicht | Beschreibung                                             |
|-------------------|:------:|:--------------------:|:--------:|---------------------------------------------------------|
| text              | string |                      |          | Anzuzeigender Text. Die Verwendung von Platzhaltern wird im nächsten Abschnitt erklärt. |
| text_size         | string |                      |          | Textgröße in CSS-Pixeln. |
| text_color        | string | --primary-text-color |          | CSS-Farbwert des Textes. |

### Einzelne Werte anzeigen

Du kannst die Werte aus der folgenden Tabelle sowie beliebige Entitätszustände oder Attribute aus Home Assistant verwenden.
Die Namen werden in der folgenden Schreibweise eingesetzt:

Wert aus der folgenden Tabelle: ```${match-count}```

Entitätszustand: ```${sensor.windspeed}```

Entitätsattribut: ```${sensor.windspeed.unit_of_measurement}```

HTML und CSS-Formatierungen sind im Text erlaubt. Im folgenden Beispiel wird eine HTML-Tabelle verwendet.
Damit Home Assistant die Konfiguration nicht umformatiert, verwende `|-`.

```yaml
text_blocks:
   top:
      text: |-
         <table>
             <tr>
                 <td>Richtungsmessungen:</td>
                 <td>${direction-count}</td>
                 <td>Minimale Geschwindigkeit:</td>
                 <td>${min-speed}</td>
             </tr>
             <tr>
                 <td>Geschwindigkeitsmessungen:</td>
                 <td>${speed-1-count}</td>
                 <td>Maximale Geschwindigkeit:</td>
                 <td>${max-speed}</td>
             </tr>
             <tr>
                 <td>Zugeordnete Messungen:</td>
                 <td>${match-count}</td>
                 <td>Durchschnittsgeschwindigkeit:</td>
                 <td>${average-speed}</td>
             </tr>
             <tr>
                 <td>Zeitraum (Stunden)</td>
                 <td>${period-hours}</td>
                 <td>Windstille:</td>
                 <td>${calm-percentage}%</td>
             </tr>
             <tr>
                 <td>Temperatur</td>
                 <td>${weather.home.temperature} °C</td>
                 <td>Windgeschwindigkeit</td>
                 <td>${sensor.home_wind_speed} Bft</td>
             </tr>
             <tr>
                 <td>Erster zugeordneter Messzeitpunkt</td><td colspan="2">${date-first-match}, ${time-first-match}</td>
             </tr>
             <tr>
                 <td>Letzter zugeordneter Messzeitpunkt</td><td colspan="2">${date-last-match}, ${time-last-match}</td>
             </tr>
         </table>
```

Verfügbare Platzhalter:

| Name | Beschreibung |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| start-time<br/>start-date                                                                     | Beginn des aktiven Zeitraums (Datum und Uhrzeit), einschließlich Verschiebungen über `period_shift`. |
| end-time<br/>end-date                                                                         | Ende des aktiven Zeitraums (Datum und Uhrzeit), einschließlich Verschiebungen über `period_shift`. |
| date-first-direction<br/>time-first-direction<br/>date-last-direction<br/>time-last-direction | Datum und Uhrzeit der ersten und letzten Richtungsmessung. |
| direction-count                                                                               | Anzahl der Richtungs-Messwerte für die Windrose. |
| date-first-speed-x</br>time-first-speed-x<br/>date-last-speed-x<br/>time-last-speed-x         | Datum und Uhrzeit der ersten und letzten Geschwindigkeitsmessung. `x` ist der Index des Sensors, beginnend bei 0. | 
| speed-x-count                                                                                 | Anzahl der Geschwindigkeitsmessungen für Sensor `x`; der erste Sensor hat den Index 0. |
| date-first-match<br/>time-first-match<br/>date-last-matc<br/>time-last-match                  | Datum und Uhrzeit der ersten und letzten Zuordnung von Richtungs- und Geschwindigkeitsmessungen. Sie sollten ungefähr dem ausgewählten Zeitraum entsprechen. |
| match-count                                                                                   | Anzahl der zugeordneten Richtungs- und Geschwindigkeitsmessungen, die der Windrosenberechnung zugrunde liegen. |
| period-minutes                                                                                | Dauer des ausgewählten Zeitraums in Minuten. |                                                                                                                |
| period-hours                                                                                  | Dauer des ausgewählten Zeitraums in Stunden. | 
| match-period-minutes                                                                          | Dauer zwischen der ersten und letzten zugeordneten Messung in Minuten; sollte etwa dem gewählten Zeitraum entsprechen. |                                                                                                                |
| match-period-hours                                                                            | Dauer zwischen der ersten und letzten zugeordneten Messung in Stunden. | 
| min-speed<br/>max-speed<br/>average-speed                                                     | Statistik der Windgeschwindigkeit anhand des ersten Geschwindigkeitssensors, der standardmäßig auch die Windrose bestimmt. | 
| calm-percentage                                                                               | Anteil der zugeordneten Messungen im ersten Geschwindigkeitsbereich; dies entspricht üblicherweise der Windstille. |
| median-speed                                                                                  | Median der Windgeschwindigkeit (50. Perzentil). |
| q1-speed                                                                                      | Unteres Quartil der Windgeschwindigkeit (25. Perzentil). |
| q3-speed                                                                                      | Oberes Quartil der Windgeschwindigkeit (75. Perzentil). |
| iqr-range                                                                                     | Interquartilsbereich (25. bis 75. Perzentil) ohne Ausreißer. |
| p90-speed                                                                                     | 90. Perzentil als Hinweis auf Böen; oberste zehn Prozent bleiben unberücksichtigt. |
| wind-description                                                                              | Wetterähnliche Beschreibung des Windes anhand des Interquartilsbereichs. |

### YAML-Beispiel für text_blocks

<img alt="Vorschau des Textblocks" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/text-block-example.png?raw=true" width="412"/>


```yaml
text_blocks:
  top:
    text: |-
       <table>
           <tr>
               <td>Richtungsmessungen:</td>
               <td>${direction-count}</td>
               <td>Minimale Geschwindigkeit:</td>
               <td>${min-speed}</td>
           </tr>
           <tr>
               <td>Geschwindigkeitsmessungen:</td>
               <td>${speed-1-count}</td>
               <td>Maximale Geschwindigkeit:</td>
               <td>${max-speed}</td>
           </tr>
           <tr>
               <td>Zugeordnete Messungen:</td>
               <td>${match-count}</td>
               <td>Durchschnittsgeschwindigkeit:</td>
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

Die in Home Assistant dokumentierten Aktionen für Tippen, langes Drücken und Doppeltippen werden unterstützt. Siehe:
[Dokumentation der Home-Assistant-Aktionen](https://www.home-assistant.io/dashboards/actions/)

Das folgende YAML-Beispiel zeigt die Verwendung.
Beachte, dass Aktionen nur für die ersten beiden Geschwindigkeitsbalken konfiguriert werden können.

| Name | Typ | Standard | Pflicht | Beschreibung |
|--------------|:------:|:-------:|:--------:|--------------------------------------|
| top_left     | object |         |          | Konfiguration der Ecke oben links. |
| top_right    | object |         |          | Konfiguration der Ecke oben rechts. |
| bottom_left  | object |         |          | Konfiguration der Ecke unten links. |
| bottom_right | object |         |          | Konfiguration der Ecke unten rechts. |
| windrose     | object |         |          | Aktionen für die Windrose. |
| speed_bar_1  | object |         |          | Aktionen für den ersten Geschwindigkeitsbalken. |
| speed_bar_2  | object |         |          | Aktionen für den zweiten Geschwindigkeitsbalken. |


Beispiele:
- **top_right**: Licht umschalten.
- **windrose**: Zu einer anderen Seite in Home Assistant navigieren.
- **bottom_left**: Eine URL in einem neuen Browser-Tab öffnen.
- **weitere Bereiche**: Einen Dialog mit zusätzlichen Informationen zur Entität anzeigen.

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

| Name | Typ | Standard | Pflicht | Beschreibung |
|------------------------|:-------:|:-------:|:--------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                   | string  |         |    -     | Zuordnung zwischen Richtungs- und Geschwindigkeitsmessungen. Weitere Informationen stehen unten. |
| time_interval          | number  |   60    |    -     | Zeitintervall in Sekunden; nur für die Zuordnungsstrategie `time-frame`. |
| log_measurement_counts | boolean |  false  |    -     | Bei `true` werden Messwertzahlen und Zuordnungen in die Browserkonsole geschrieben, um die Datenbasis des Diagramms zu prüfen. |

Die Wahl der Zuordnungsstrategie kann das Diagramm beeinflussen, insbesondere wenn die Sensoren unterschiedlich häufig neue Zustände melden.

#### Windrichtung zuerst

Konfigurationswert: `direction-first`

Jede gemessene Windrichtung im ausgewählten Zeitraum geht in das Diagramm ein. Dazu wird jeweils der letzte zum Messzeitpunkt bekannte Geschwindigkeitswert gesucht.
Nicht alle Geschwindigkeitswerte müssen dabei verwendet werden.

#### Windgeschwindigkeit zuerst

Konfigurationswert: `speed-first`

Jeder Geschwindigkeitsmesswert im ausgewählten Zeitraum geht in das Diagramm ein. Dazu wird jeweils der letzte zum Messzeitpunkt bekannte Richtungswert gesucht.
Nicht alle Richtungswerte müssen dabei verwendet werden.

Als führenden Sensor wählst du am besten denjenigen, der häufiger Messwerte liefert.

#### Zeitraster

Konfigurationswert: `time-frame`

Zusätzliche Option: `time_interval`

Das Zeitraster ist maßgeblich. Für jeden Zeitpunkt in der Vergangenheit (standardmäßig alle 60 Sekunden) werden Richtung und Geschwindigkeit bestimmt.
Bei Datenquellen, die nur auf Änderungen reagieren, kann dies zu einem besseren Diagramm führen.

Bei den ersten beiden Strategien beziehen sich die Prozentwerte auf die Anzahl der Messungen und nicht auf die gemessene Zeitdauer.

### Gesamte Zeitdauer

Konfigurationswert: `full-time`

Für jede Geschwindigkeitsmessung wird die zum jeweiligen Zeitpunkt gültige Windrichtung bestimmt.
Dies geschieht ebenso für jede Richtungsmessung.
Anschließend wird ermittelt, wie viele Sekunden jede Kombination aus Richtung und Geschwindigkeit aktiv war.
Aus diesen Zeitanteilen werden die Prozentwerte der Windrose berechnet.

Diese Strategie liefert voraussichtlich ein besonders aussagekräftiges Diagramm, kann aber auf manchen Geräten mehr Rechenleistung benötigen.

#### Beispielausgabe der Konsole bei aktiviertem log_measurement_counts
```
Measurements:
Directions: 1213 - 20/01/2025, 18:18:01 - 30/01/2025, 18:11:37
Speed:      964 - 20/01/2025, 18:18:01 - 30/01/2025, 18:01:37
Matches:    1213 - min: 0 - max: 67.3 - average: 24.972333 - strategy: direction-first
```


### Objekt colors
Für einige Farben wird die Theme-Variable `--primary-text-color` verwendet. Dadurch passt sich die Karte an einen Wechsel zwischen hellem und dunklem Home-Assistant-Design an.
CSS-Farbwerte sind erlaubt.

| Name | Typ | Standard | Pflicht | Beschreibung |
|-----------------------------------------------|:------:|:--------------------:|:--------:|:------------------------------------------------------------------------------------------------|
| rose_lines                                    | string |  rgb(160, 160, 160)  |          | Farbe der Kreise, Umrandungen und Kreuzlinien. |
| rose_direction_letters (DEPRECATED)           | string | --primary-text-color |          | Veraltet: Farbe der Richtungsbeschriftungen. |
| rose_cardinal_direction_labels                | string | --primary-text-color |          | Farbe der Haupthimmelsrichtungen. |
| rose_intercardinal_direction_labels           | string | --primary-text-color |          | Farbe der Zwischenhimmelsrichtungen. |
| rose_secondary_intercardinal_direction_labels | string | --primary-text-color |          | Farbe der Nebenhimmelsrichtungen. |
| rose_center_percentage                        | string |         auto         |          | Textfarbe im Mittelkreis. `auto` wählt Schwarz oder Weiß abhängig vom Hintergrund. |
| rose_center_background                        | string |         auto         |          | Hintergrund des Mittelkreises. Bei `auto` entspricht er dem ersten Balkensegment. |
| rose_percentages                              | string |         auto         |          | Farbe der Prozentbeschriftung. `auto` verwendet die CSS-Mischmethode `mix-blend-mode` des Browsers. |
| rose_current_direction_arrow                  | string |         red          |          | Farbe des Pfeils für die aktuelle Windrichtung. |
| bar_border                                    | string |  rgb(160, 160, 160)  |          | Farbe der Balkenumrandung. |
| bar_unit_name                                 | string | --primary-text-color |          | Textfarbe des Einheitennamens. |
| bar_name                                      | string | --primary-text-color |          | Textfarbe des Sensornamens. |
| bar_unit_values                               | string | --primary-text-color |          | Farbe der Einheitenwerte am Balken. |
| bar_percentages                               | string |         auto         |          | Farbe der Prozentangaben. `auto` wählt abhängig vom Hintergrund Schwarz oder Weiß. |
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

Verwendet `speed_range_step` und `speed_range_max`.

<img alt="Vorschau" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/speedbar_step_5_max_25.png?raw=true" width="415"/>

```yaml
type: custom:windrose-card
title: Windrichtung
data_period:
  period_back: -24h
wind_direction_entity:
  entity: sensor.wind_direction
windspeed_entities:
  - entity: sensor.wind_speed
    name: Durchschnitt
    windspeed_bar_full: true
    speed_range_beaufort: false
    output_speed_unit: mps
    speed_range_step: 5
    speed_range_max: 25
```

### Individuelle Geschwindigkeitsbereiche

Verwendet `speed_ranges` mit individuell festgelegten Grenzen und Farben.

Achte darauf, einen Geschwindigkeitsbereich ab 0 zu definieren. Andernfalls erscheint eine Fehlermeldung.

```Speed is not in a speedrange: 0.6 unit: mps```

<img alt="Vorschau" src="https://raw.githubusercontent.com/aukedejong/ha-windrose-card/main/example/speedbar_speed_ranges_custom.png?raw=true" width="412"/>

```yaml
type: custom:windrose-card
title: Windrichtung
data_period:
  period_back: -24h
wind_direction_entity:
  entity: sensor.wind_direction
windspeed_entities:
  - entity: sensor.wind_speed
    name: Durchschnitt
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
Stelle sicher, dass unter `frontend:` in deiner `configuration.yaml` die Option `javascript_version: latest` gesetzt ist.

Prüfe, ob du die neueste Version von `windrose-card.js` verwendest.

Falls nach einem Update Probleme auftreten, leere den Cache deines Browsers.

Wenn die Karte in älteren Browsern nicht angezeigt wird, versuche in `ui-lovelace.yaml` beim Ressourceneintrag `type: module` durch `type: js` zu ersetzen.

## Lizenz
Dieses Projekt steht unter der MIT-Lizenz.
