# Wehrrecht Prüfungsquiz – OSLw

Quiz-App zur Prüfungsvorbereitung Wehrrecht.  
Fragenkatalog: ausschließlich `Pru_fungs_Frage_manuell_ausgewertet.docx`.

## Passwort
`OSLw2026`

## Deployment auf Vercel via GitHub

1. Diesen Ordner als neues GitHub-Repository anlegen (z.B. `wehrrecht-quiz`)
2. Alle Dateien pushen – **ohne** `node_modules` und **ohne** `package-lock.json`
3. In Vercel: „Add New Project" → GitHub-Repo auswählen
4. Build-Einstellungen werden automatisch erkannt (Vite/React)
5. Deploy klicken – fertig

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Dateistruktur

```
wehrrecht-quiz/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx        ← Gesamte App-Logik + UI
    └── questions.js   ← Alle Fragen (nur aus Word-Datei)
```

## Funktionen

- Passwortschutz (`OSLw2026`)
- 28 Fragen in Dokumentreihenfolge (kein Shuffle)
- Mehrfachauswahl-Fragen (MC) mit farbiger Auswertung
- Freitextfragen mit Feldvergleich
- Fehlerliste mit „Fehler wiederholen"-Modus
- Fehlerliste im localStorage persistent
- Fortschrittsbalken & Ergebnisauswertung
