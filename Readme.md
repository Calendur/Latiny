Commands:
  ionic cap run android -l --external
    // Live Reload auf Android Handy
  ionic serve
    // run the app in a browser with live reload
  ionic cap build android
    // build the app for android (open android studio to build it)
  
(/) VokabelnLernenPage: Ampel für die Farben rot/gelb/gruen (Sarah?)
(/) VokabelnLernenPage: Vokabeln zentriert darstellen, Übersetzung mit Knopf an der rechten Seite anzeigen (Sarah?)

(/) Tabelle für Handy anpassen (breite der Tabelle zu groß)
( ) Filterfunktion in der Tabelle optimieren? (Braucht auf dem Handy schon etwas länger, Möglichkeiten: Filter- und Sortierfunktion vorher bestimmen und dann hineingeben; Vokabeln als Lowercase abspeichern für schnelleres filtern)
( ) Vokabeln editieren Tab
  mit Vokabeln hinzufügen
  und Vokabeln löschen

Filtern:
nach Anfangsbuchstabe mit evtl "#" nur für Latein

(/) aktuelle Lektionen anzeigen, wenn man Vokabeln lernt (also noch vokabeln aus Lektionen 5 und 6)
(x) zu einer Vokabel den letzten Status anzeigen (ob gelb, rot oder neu)
( ) Historie der letzten Vokabeln abspeichern und in einem Tab anzeigbar machen (Aktion + Datum)
    - eine Lektion neu zum Lernen hinzugefügt
    - eine Vokabel wurde bewertet
(/) Anzahl Lektionen mit in den stores abbilden?
(/) Beim Lernen auch ein paar "grüne" untermischen
    Rot mit 90%
    Gelb mit 5%
    Grüne mit 5%
      Grüne = Vokabeln aus der ausgewählten oder vorherigen Lektion die nicht mehr in gelb/rot sind
( ) in den Play Store bringen?
(/) Ampel Mechanismus ändern
    - Vokabeln werden nur bewertet mit: gewusst / nicht gewusst
      Vokabeln müssen 2 mal gewusst werden, danach werden sie nicht mehr präesentiert
      Wenn sie danach nicht gewusst wurde, wird der Counter zurückgesetzt
    - abspeichern von ausgewählten Vokabeln in einer Liste
      learned: [
        {id: 1},            // Vokabel wurde hinzugefügt und noch nicht präsentiert
        {id: 50, known: 1}, // Vokabel wurde schon 1 mal als gewusst markiert
        {id: 50, known: 0}, // Vokabel wurde als nicht gewusst markiert
        {id: 5, known: 2}]  // wird eigentlich nicht mehr gespeichert, ab 2 mal gewusst wird eine Vokabel aus der Liste entfernt
( ) Vokabeln müssen einen Index bekommen, damit bei neuen Vokabeln oder löschen, die Vokabelindizes sich nicht ändern
    Es wäre dazu eventuell hilfreich, die Vokabeln per Lektion und Index ansprechen zu können?
    Also z.B. mit 2x Arrays? vokabel[lektion][idx] = {deutsch: ..., latein: ...}
