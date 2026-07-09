# Zeitablauf im einfachen Disziplinarverfahren – Übungsfälle

React/Vite Quiz-App zur Prüfungsvorbereitung OSLw Wehrrecht.

## Passwort
`Fristen2026`

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Dann im Browser: http://localhost:5173

## Deployment (Vercel)

1. Repo auf GitHub pushen (ohne `node_modules` und ohne `package-lock.json`)
2. In Vercel: "New Project" → GitHub-Repo auswählen
3. Framework: **Vite** (wird automatisch erkannt)
4. Deploy

## Projektstruktur

```
fristen-app/
├── index.html
├── package.json        ← pinned versions, KEIN package-lock.json einchecken
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx        ← ReactDOM.createRoot
    └── App.jsx         ← Gesamte App (Fragen, Logik, UI)
```

## Inhalt

6 Übungsfälle × 10 Fragen (a–j) = 60 Fragen

| Fall | Tattag   | Schlussgehör | Besonderheit              |
|------|----------|--------------|---------------------------|
| 1    | 04.05.   | 31.05.       | Basisfall                 |
| 2    | 12.08.   | 17.08.       | kurze Ermittlungszeit     |
| 3    | 02.11.   | 29.11.       | Vertrauensperson angehört |
| 4    | 07.03.   | 18.03.       | Frühjahrsfall             |
| 5    | 25.12.   | 15.01.+1     | Jahreswechsel             |
| 6    | 19.06.   | 30.06.       | Monatsende SG             |

## Rechtliche Grundlagen (WDO 2025, ab 01.04.2025)

- § 17 Abs. 2 WDO – 6-Monats-Verhängungsfrist
- § 32 Abs. 5 WDO – Schlussgehör
- § 37 Abs. 1 WDO – früheste Verhängung (Tag nach SG, 06:00 Uhr)
- § 42 WDO – Disziplinarbeschwerde / Anwendung WBO
- § 47 WDO – Vollstreckbarkeit (Tag nach Verhängung, 13:00 Uhr)
- § 57 WDO – Vollstreckungsverjährung (6 Monate ab Unanfechtbarkeit)
- § 6 Abs. 1 WBO – Beschwerdefrist (1 Monat)
