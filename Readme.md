# Project description

This app provides a mechanism to learn latin vocabularies.
It has a table that can be searched for vocabularies by a given string, lesson or prefix. When searching for a prefix, the filter needs to be prefixed with a '#'.
The vocabularies are taken from the book ["Felix Neu Textband 2. Auflage, 8. Druck 2019"](https://www.ccbuchner.de/reihe/felix-neu-132).

# Development
## Useful commands
Useful Commands:
- ionic serve
  - run the app in a browser with live reload
- ionic cap run android -l --external
  - live reload on a android smart phone
- ionic cap build android
  - build the app for android (open android studio to build it)

## TODOs

- [ ] Filterfunktion in der Tabelle optimieren? (Braucht auf dem Handy schon etwas länger, Möglichkeiten: Filter- und Sortierfunktion vorher bestimmen und dann hineingeben; Vokabeln als Lowercase abspeichern für schnelleres filtern)
- [ ] Vokabeln editieren Tab
  - mit Vokabeln hinzufügen
  - und Vokabeln löschen
- [ ] Historie der letzten Vokabeln abspeichern und in einem Tab anzeigbar machen (Aktion + Datum)
  - eine Lektion neu zum Lernen hinzugefügt
  - eine Vokabel wurde bewertet
- [ ] in den Play Store bringen?
- [ ] Vokabeln müssen einen Index bekommen, damit bei neuen Vokabeln oder löschen, die Vokabelindizes sich nicht ändern
  - Es wäre dazu eventuell hilfreich, die Vokabeln per Lektion und Index ansprechen zu können?
  - Also z.B. mit 2x Arrays? vokabel[lektion][idx] = {deutsch: ..., latein: ...}

# License

[MIT](https://github.com/Calendur/Latiny/blob/main/LICENSE)