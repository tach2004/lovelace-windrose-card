### 2.8.0

**Neue Funktionen:**
- Zusätzliche Einstellungen für den Pfeil der aktuellen Windrichtung, um seine Darstellung anzupassen. Behebt #230.

**Fehlerbehebungen:**
- Fehler bei Statistikdaten korrigiert, wenn die ersten Messwerte 0 sind. Behebt #228.

### 2.7.0

**Korrektur der Statistiktyp-Konfiguration:**
- Die Statistiktypen `min` und `max` werden für Windrichtungssensoren nicht unterstützt. Die entsprechenden Optionen wurden entfernt; hier wird stets `mean` verwendet.
- Weitere Informationen im README-Abschnitt zur Datenspeicherung in Home Assistant.

### v2.6.0

**Neue Funktion:**
- Unterstützung der Home-Assistant-Statistiktypen `min` und `max` für Windgeschwindigkeiten. Zuvor wurde nur der Mittelwert verwendet.

Vielen Dank an sanchobear. Behebt #223.

### v2.4.4

**Fehlerbehebung:**
- Build-Ziel `ES2017` zu esbuild hinzugefügt, um ältere Browser zu unterstützen. Behebt #222.

Vielen Dank an tikhdm für den Pull Request.

### v2.4.3

**Fehlerbehebung:**
- Im vorherigen Build eingeführte Fehler bei der Datums-/Uhrzeitformatierung und der Option `log_measurement_counts` korrigiert. Behebt #219.

### v2.4.2

**Fehlerbehebung:**
- Sprach- und Datums-/Uhrzeiteinstellungen von Home Assistant werden berücksichtigt. Behebt #215 und #217.

### v2.4.1

**Fehlerbehebung:**
- Beim Wechsel des für die Windrose verwendeten Geschwindigkeitssensors werden jetzt auch dessen individuell konfigurierte Bereichsfarben übernommen.

### v2.4.0

**Neue Funktion:**
- Der Mittelkreis, der normalerweise den Windstille-Anteil anzeigt, kann nun auch andere Werte darstellen. Behebt #78.

**Fehlerbehebungen:**
- Übermäßig viele Protokollmeldungen in bestimmten Situationen behoben. Vielen Dank an 2bitoperations.
- Automatische Erkennung der Eingabeeinheit bei der Verwendung in Eckinformationen. Behebt #203.

**Sonstiges:**
- Build-System von Rollup auf esbuild umgestellt.
- Mehrere Abhängigkeiten aktualisiert.

### v2.3.0

**Neue Funktion:**
- Passt eine Prozentangabe nicht in ein Balkensegment, wird ein Punkt angezeigt. Beim Berühren oder Überfahren mit dem Mauszeiger erscheint der Prozentwert in einem Popup. Behebt #193.

### v2.2.0

**Neue Funktionen:**
- Zeitraumcodes unterstützen jetzt Minuten und Sekunden, beispielsweise `-10s` (zehn Sekunden zurück) und `-10mi` (zehn Minuten zurück). Behebt #194.
- Option `rose_opacity` für eine durchscheinende Windrose hinzugefügt, damit Hintergrundbilder sichtbar bleiben. Behebt #198.

**Fehlerbehebung:**
- Bei relativen Zeiträumen wird der Zeitraum bei automatischen Aktualisierungen der Karte neu berechnet. Behebt #199.

### v2.1.0

**Fehlerbehebungen:**
- `data_period` und eine aktive `period_selector`-Schaltfläche dürfen nicht gleichzeitig konfiguriert sein. Zuvor wurde `data_period` in diesem Fall ignoriert.
- Die automatisch erzeugte Standardkonfiguration verwendete noch `hours_to_show`. Sie wurde korrigiert und erweitert.
- Beispieltexte bereinigt. Behebt #192.

**Neue Funktionen:**
- Option `clip_background_image` in `rose_config`, die Teile des Hintergrundbilds außerhalb des äußeren Kreises abschneidet. Behebt #184.
- Option `new_row` für Schaltflächen, um eine neue Zeile zu beginnen. Behebt #178.

### v2.0.0

**Wichtige Änderungen mit Auswirkungen auf bestehende Konfigurationen:**
- `hours_to_show` durch `period_back` ersetzt. Neben Stunden sind jetzt weitere Zeiteinheiten möglich. Siehe README-Abschnitt zu Zeitraumcodes.
- `from_hours_ago` und `to_hours_ago` durch `from_period_ago` und `to_period_ago` ersetzt, ebenfalls mit weiteren Zeiteinheiten.
- Die Zeitraumkonfiguration wurde geändert: `period_selector` ist durch `buttons_config` auf oberster Ebene ersetzt. Das Objekt `data_period` enthält nur noch Zeitraumoptionen und kann zusätzlich Statistikoptionen festlegen.
- `matching_strategy` ist nun ein Objekt mit folgenden Feldern:
  - `name`: Name der Zuordnungsstrategie (zuvor der direkte Zeichenfolgenwert).
  - `time_interval`: bisher Bestandteil von `data_period`, nur für die Strategie `time-frame`.
  - `log_measurement_counts`: bisher Bestandteil von `data_period`.
- Veraltete Optionen auf oberster Ebene entfernt:
  - `hours_to_show`
  - `windspeed_bar_full`
  - `output_speed_unit`
  - `output_speed_unit_label`
  - `speed_range_beaufort`
  - `speed_range_step`
  - `speed_range_max`
  - `speed_ranges`
  - `cardinal_direction_letters`
- Folgende Optionen von der obersten Ebene nach `rose_config` verschoben:
  - `wind_direction_count`
  - `background_image`
  - `circle_legend_text_size`
  - `windrose_draw_north_offset`
  - `center_calm_percentage`
  - `cirlce_count`
  - `outer_circle_percentage`
- `render_relative_scale` in `windspeed_entities` wurde durch `bar_render_scale` mit den Werten `absolute`, `windspeed_relative` und `percentage_relative` ersetzt. `percentage_relative` ist neu.
- Bei der Grad-zu-Buchstaben-Umrechnung in den Eckinformationen werden standardmäßig nur die vier Buchstaben `NESW` verwendet, ohne `X`.

**Neue Funktionen:**
- Erweiterte Zeitraumcodes mit kombinierbaren Einheiten, z. B. `-200h` (200 Stunden), `-2w` (zwei Wochen), `-2m+1w` (zwei Monate zurück und eine Woche vor).
- Schaltfläche zum Wechseln des für die Windrose verwendeten Geschwindigkeitssensors. Behebt #172.
- Schaltflächen zum zeitlichen Vor- und Zurückverschieben des Zeitraums.
- Schaltfläche zum Abspielen einer Windrosenanimation über einen Zeitraum.
- Neue Balkenskalierung `percentage_relative`. Behebt #167.
- Einstellbare Prozentwerte der Windrosenkreise, standardmäßig automatisch.
- `use_for_windrose` in `windspeed_entities` zum Festlegen des für die Windrose verwendeten Sensors, der per Schaltfläche gewechselt werden kann.
- Neue Option `data_period.preset_period` mit den möglichen Werten:
  - `today`
  - `yesterday`
  - `last_7_days`
  - `last_30_days`
  - `this_week`
  - `last_week`
  - `this_month`
  - `last_month`
  - `last_6_months`
  - `this_year`
  - `last_year`
- Zeitraum- und Statistikoptionen können auch in Schaltflächen verwendet werden. Per Klick lässt sich die Datenbasis wechseln. Behebt #174.
- Neue Vorlagenplatzhalter für Beginn und Ende des aktiven Zeitraums: `start-date`, `start-time`, `end-date`, `end-time`.
- Bisherige Platzhalter `period-hours` und `period-minutes` heißen nun `match-period-hours` und `match-period-minutes`.
- Neue Platzhalter `period-hours` und `period-minutes` für die gesamte Zeitfensterdauer (nicht nur die Dauer zwischen erster und letzter zugeordneter Messung).
- Fehlt ein Vorlagenwert, wird dessen Platzhalter aus der Ausgabe entfernt.
- Verbesserte Fehlermeldungen, wenn keine Messwerte gefunden werden.
- Einstellbare Rahmenfarbe von Schaltflächen. Behebt #176.
- Erweiterte automatisch erzeugte Standardkonfiguration.
- Für entfernte, verschobene und umbenannte Konfigurationsoptionen werden hilfreiche Fehlermeldungen zur Umstellung ausgegeben.

### v1.26.1

**Fehlerbehebung:**
- Der Pfeil für die aktuelle Windrichtung funktionierte nicht, wenn der Pfeil für die aktuelle Windgeschwindigkeit deaktiviert war. Korrigiert. Vielen Dank an @rocket.

### v1.26.0

**Neue Funktionen:**
- Zeitfensteroption für einen Zeitraum von einem zurückliegenden Zeitpunkt bis zu einem zweiten zurückliegenden Zeitpunkt.
- Zusätzliche Statistikwerte für Textblöcke:
  - `median-speed`
  - `q1-speed`
  - `q3-speed`
  - `iqr-range`
  - `p90-speed`
  - `wind-description`

**Fehlerbehebung:**
- Rundung der Geschwindigkeitswerte in den Balken korrigiert.

Vielen Dank an David Marton für die Arbeit an diesen Funktionen!

### v1.25.1

**Fehlerbehebung:**
- Bei der Verwendung von Zeitraum-Schaltflächen wurden mehrere Hintergrundbildelemente in das HTML eingefügt.

### v1.25.0

**Neue Funktion:**
- Anzeige von Texten oberhalb und unterhalb der Windrose mit Entitätszuständen oder berechneten Werten der zugrunde liegenden Daten.

### v1.24.1

**Fehlerbehebung:**
- Mögliche Korrektur für ältere Home-Assistant-Versionen.

### v1.24.0

**Neue Funktion:**
- Option `auto` für die Textfarbe der Prozentangaben in der Windrose hinzugefügt; sie ist jetzt auch Standard. Die Textfarbe passt sich dem Hintergrund an, damit sie auf Windrosensegmenten besser lesbar ist.

### v1.23.5

**Fehlerbehebungen:**
- Der Mittelkreis für die aktuelle Windrichtung wird jetzt im Vordergrund gezeichnet.
- `hide_direction_below_speed` funktionierte teilweise nicht, weil die Richtung bei Änderungen der Geschwindigkeit nicht aktualisiert wurde.
- Effizienz beim Start der Karte verbessert.

### v1.23.4

**Fehlerbehebung:**
- Automatischer Wechsel der Textfarbe bei einem Wechsel zwischen hellem und dunklem Theme; zuvor war eine Aktualisierung erforderlich.

### v1.23.3

**Fehlerbehebungen:**
- Position des Pfeils für die aktuelle Windrichtung korrigiert.
- Konsolenfehler behoben, wenn keine Aktionen konfiguriert sind.

### v1.23.2

**Fehlerbehebung:**
- Touch-Aktionen bei den Geschwindigkeitsbalken korrigiert.

### v1.23.1

**Fehlerbehebung:**
- Abschneiden von Geschwindigkeitsbeschriftungen unter bestimmten Bedingungen bei vertikalen Balken behoben.

### v1.23.0

**Neue Funktionen:**
- Animierte Darstellung der Windrosensegmente und Geschwindigkeitsbalken (deaktivierbar).
- Korrektur der Windgeschwindigkeit durch Faktor oder additive Verschiebung. Behebt #138.
- Einstellbare Textgröße der Kreis-Prozentangaben.

**Fehlerbehebung:**
- Platzberechnung für die Geschwindigkeitsbeschriftung bei vertikalen Balken korrigiert.

### v1.22.0

**Neue Funktionen:**
- Unterstützung von Aktionen durch langes Drücken.
- Unterstützung der neuen `state_class` für Richtungssensoren. Seit Home Assistant 2025.4 steht `measurement_angle` zur Verfügung; damit sind Langzeitstatistiken für Windrichtungsdaten möglich.

### v1.21.1

**Fehlerbehebung:**
- Oberen Abstand der Beschriftungen in den Eckinformationen vergrößert.

### v1.21.0

**Neue Funktionen:**
- Konfigurierbare Textgrößen in den Geschwindigkeitsbalken. Behebt #132.
- Der Pfeil für die aktuelle Geschwindigkeit kann nun auf der jeweils anderen Seite des Balkens angezeigt werden. Behebt #139.

**Fehlerbehebungen:**
- Berechnung der Abmessungen überarbeitet. Behebt #143.
- Bei mehr als 16 Windrosensegmenten wird der Abstand zwischen den Segmenten verkleinert.
- Werden von Home Assistant keine Verlaufsdaten geliefert, erscheint eine verständliche Fehlermeldung in der Konsole.

Beispielkonfiguration mit neuen Optionen:

```yaml
windspeed_entities:
  - entity: sensor.wind_speed
    name: Geschwindigkeit
    speed_unit: auto
    output_speed_unit: kph
    windspeed_bar_full: false
    speed_range_beaufort: false
    current_speed_arrow: true
    current_speed_arrow_size: 50
    current_speed_arrow_location: below
    use_statistics: false
    bar_label_text_size: 40
    bar_speed_text_size: 40
    bar_percentage_text_size: 40
```

Vielen Dank für alle Fehlermeldungen und Funktionswünsche.

### v1.20.1

**Fehlerbehebung:**
- Bei einer Kompassrichtung als Kursrichtung wird nun auch die aktuelle Windrichtung entsprechend korrigiert.

### v1.20.0

**Neue Funktion:**
- Bei automatischer Kompassdrehung kann der Winkel auch als Kursrichtung statt als Nordrichtung interpretiert werden. Vielen Dank an @alnavasa.

```yaml
compass_direction:
  auto_rotate: true
  as_heading: true
  entity: input_number.compass
```

**Fehlerbehebungen:**
- Einheitenalias `mi/h` für die automatische Erkennung ergänzt.
- Die Einheitenerkennung unterscheidet jetzt nicht mehr zwischen Groß- und Kleinschreibung.

### v1.19.1

**Fehlerbehebung:**
- Für den zweiten Geschwindigkeitsbalken wurde der falsche Einheitenumrechner verwendet.

Damit wurde endlich eine bereits 2023 angefragte Funktion umgesetzt. Dafür waren umfangreiche Codeänderungen erforderlich.

### v1.19.0

**Neue Funktion:**
- Pfeil für die aktuelle Windgeschwindigkeit auf den Legendenbalken. Setzt #49 um.

**Fehlerbehebungen:**
- `render_relative_scale` funktionierte nicht, wenn bei `windspeed_bar_full: false` nur verwendete Bereiche angezeigt wurden.
- Code zum Zeichnen der Balken überarbeitet.

### v1.18.1

**Fehlerbehebung:**
- Fehler bei der Umwandlung bestimmter Winkel in Himmelsrichtungsbuchstaben in den Eckinformationen korrigiert. Vielen Dank an deanfourie1. Behebt #137.

### v1.18.0

**Neue Funktionen:**
- Hintergrund- und Textfarbe inaktiver Zeitraum-Schaltflächen einstellbar.
- Einstellbare Kartenbreite für das Abschnittslayout. Experimentell; Rückmeldungen sind willkommen, da das interne Verhalten des Abschnittslayouts noch nicht vollständig geklärt ist.

### v1.17.0

**Neue Funktion:**
- Wenn die Windgeschwindigkeit unter einem konfigurierten Wert liegt, wird der Richtungspfeil ausgeblendet und ein Mittelkreis oder Punkt angezeigt.

### v1.16.2

**Fehlerbehebung:**
- Die veraltete Option `hours_to_show` auf oberster Ebene funktioniert wieder.

### v1.16.1

**Fehlerbehebung:**
- Layout der Zeitraum-Schaltflächen korrigiert, wenn nicht alle Schaltflächen in eine Zeile passen.

### v1.16.0

Eine lange gewünschte Funktion wurde umgesetzt. Bitte melde Fehler und weitere Wünsche auf GitHub.

**Neue Funktion:**
- Schaltflächen zur Auswahl des Zeitraums. Behebt #41.

### v1.15.2

**Fehlerbehebung:**
- Überlauf am oberen Kartenrand behoben, der nur ohne Kartentitel sichtbar war. Behebt #131.

### v1.15.1

**Fehlerbehebungen:**
- Prüfung auf widersprüchliche Geschwindigkeitsbereich-Konfigurationen.
- Bei durchschnittlicher Windgeschwindigkeit 0 wurde der erste dynamische Geschwindigkeitsbereich nicht ausgewählt.
- Fehler in der README korrigiert.
- Bei `log_measurement_counts` wird jetzt auch die durchschnittliche Windgeschwindigkeit protokolliert.

### v1.15.0

**Neue Funktionen:**
- Statistikintervall ist konfigurierbar. Die Karte kann nun auch Langzeitstatistiken verwenden.
- Die Windgeschwindigkeitseinheit von Wetterentitäten lässt sich automatisch aus dem Attribut `wind_speed_unit` ermitteln. Behebt #129.
- Falls die Einheit nicht automatisch erkannt wird, zeigt die Karte eine Fehlermeldung an. Behebt #129.
- Messwert- und Zuordnungsstatistiken können in der Browserkonsole (F12) angezeigt werden. Dazu `log_measurement_counts` in `data_period` auf `true` setzen. In einer späteren Version sollten diese Daten auch direkt in der Karte darstellbar sein.

### v1.14.2

**Fehlerbehebung:**
- Falscher Optionsname in einer Fehlermeldung korrigiert. Vielen Dank an @fishter.

### v1.14.1

**Fehlerbehebung:**
- Darstellung der Windrosenkreise ohne Windstille-Anteil im Mittelkreis korrigiert.

### v1.14.0

**Neue Funktionen:**
- Unterstützung von Attributen für Kompass, Eckinformationen, Windrichtungs- und Windgeschwindigkeitsentitäten.
- Verständlichere Konfigurationsfehlermeldungen direkt auf der Karte; zuvor wurden einige Fehler nur in der Browserkonsole angezeigt.
- README um einen Abschnitt zur Datenspeicherung ergänzt.

### v1.13.0

**Neue Funktionen:**
- Zwischen- und Nebenhimmelsrichtungen können eingeblendet werden.
- Beschriftungen werden aus vier Richtungsbuchstaben oder individuell für alle 16 Richtungen erzeugt.
- Farbe und Größe der Beschriftungen für Haupt-, Zwischen- und Nebenhimmelsrichtungen getrennt einstellbar.

**Fehlerbehebungen:**
- Bibliotheken und Abhängigkeiten aktualisiert und bereinigt. Dies könnte den bei manchen Nutzern auftretenden Fehler `Failed to execute 'define' on 'CustomElementRegistry'` beheben.

### v1.12.8

**Fehlerbehebung:**
- Der Richtungspfeil wird nur bei einer Zustandsänderung des Sensors animiert, nicht bei jedem Neuzeichnen oder beim ersten Anzeigen.

### v1.12.7

**Fehlerbehebung:**
- Grenzwert für 1 Beaufort in km/h auf 0 bis 1 km/h korrigiert.

### v1.12.6

**Fehlerbehebungen:**
- Fehlermeldung zur Konfiguration von `cardinal_direction_letters` verbessert. Behebt #114.
- Beschriftung von Beaufort 12 in der Geschwindigkeitsleiste zentriert. Behebt #116.

### v1.12.5

**Fehlerbehebung:**
- Rückfall auf die veraltete Option `speed_range_max` auf oberster Ebene.

### v1.12.4

**Fehlerbehebung:**
- Hintergrundbild wird hinter statt vor den anderen Elementen angezeigt.

### v1.12.3

**Fehlerbehebung:**
- Fehlenden Hand-Mauszeiger in einem Aktionsbereich ergänzt.

### v1.12.2

**Fehlerbehebungen:**
- Hand-Mauszeiger beim Überfahren der Aktionsbereiche ergänzt.
- README korrigiert: `center_calm_percentage` ist keine Einstellung der Geschwindigkeits-Einheitenkonfiguration.

### v1.12.1

**Fehlerbehebungen:**
- Mehrere Fehler und Entwurfsprobleme bei dynamischen Geschwindigkeitsbereichen korrigiert.

### v1.12.0

**Neue Funktionen:**
- Neue Zuordnungsstrategie `full-time`. Einzelheiten stehen in der README. Behebt #102.
- Schriftgröße für Beschriftungen und Werte der Eckinformationen einstellbar. Behebt #104.
- CSS-Klassen für Beschriftungen und Werte der Eckinformationen hinzugefügt; sie können mit `card-mod` gestaltet werden. Behebt #104.
- Einige Einstellungen von der globalen Ebene auf einzelne Geschwindigkeitsbalken verschoben. Behebt #60:
  - Individuelle Geschwindigkeitsbereiche.
  - Vollständige oder teilweise Darstellung der Bereiche.
  - Verwendung der Beaufort-Skala.
  - Ausgabeeinheit und deren Beschriftung.
- Aktionen durch Tippen auf Eckinformationen, Windrose und Geschwindigkeitsbalken. Behebt #56.
- Einheitenumrechnung in den Eckinformationen für Richtungs- und Geschwindigkeitssensoren. Behebt #100 und #103:
  - Richtungen: `degrees`, `letters`.
  - Geschwindigkeit: `bft`, `mps`, `kph`, `mph`, `fps`, `knots`.
- Dynamische Geschwindigkeitsbereiche abhängig vom mittleren Tempo. Behebt #93.

### v1.11.7

**Fehlerbehebung:**
- Die anfängliche Konfiguration der Himmelsrichtungsbuchstaben beim Hinzufügen der Karte funktioniert wieder. Behebt #101.

### v1.11.6

**Fehlerbehebungen:**
- Kleine Korrektur bei der Zuordnung von Messwerten.
- Berechnung der Abstände, wenn Geschwindigkeitsbalken ausgeblendet sind. Behebt #97.
- Position des Hintergrundbilds bei längeren Richtungsbeschriftungen korrigiert.

### v1.11.5

- Prüfung der Entitätskonfiguration zurückgesetzt: Es wird wieder geprüft, ob der Zustand im Zustandsarray vorhanden ist.

### v1.11.4

**Fehlerbehebung:**
- Textposition auf Safari/macOS/iOS korrigiert. Die SVG-Bibliothek hatte zusätzliche `tspan`-Elemente erzeugt, die Abstandsprobleme verursachten.

### v1.11.3

**Fehlerbehebungen:**
- Der Pfeil für die aktuelle Windrichtung nimmt bei der Animation nun den kürzesten Weg zur nächsten Richtung. Behebt #94.
- Fehleranfällige Snap-SVG-Bibliothek durch SVG.js ersetzt, um diese Änderung zu ermöglichen.
- Textausrichtung in den Geschwindigkeitsbalken überarbeitet.
- Eckinformationen berücksichtigen die konfigurierte Anzeigegenauigkeit. Behebt #92.

### v1.11.2

**Fehlerbehebung:**
- Konfigurationsprüfung von `data_period` korrigiert.

### v1.11.1

**Fehlerbehebung:**
- Zeiträume ohne Wind werden besser verarbeitet. Behebt #86.

### v1.11.0

**Neue Funktion:**
- An den Haupthimmelsrichtungen der Windrose können ganze Wörter statt einzelner Buchstaben angezeigt werden. Behebt #82.
- Die Darstellung ist bei gleichzeitiger automatischer Drehung und Eckinformationen noch nicht perfekt; einige Texte können sich überlappen.

**Fehlerbehebungen:**
- Die Strategie `time-frame` funktionierte nicht bei Richtungssensoren mit Buchstabenwerten. Behebt #64.
- Zur Interpretation der Sensorzustände wurde fälschlich `cardinal_direction_letters` statt `direction_letters` verwendet.

### v1.10.0

**Neue Funktionen:**
- Hintergrundbilder werden unterstützt. Behebt #54.
- Neue Zuordnungsstrategie `time_frame`. Behebt #64.
