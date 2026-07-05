import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award, CheckSquare } from "lucide-react";

const PASSWORD = "OSLw2026";
const APP_TITLE = "Wehrrecht Übung (Original-Fragen)";

const QUESTIONS = [

  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. a)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Frühester Verhängungszeitpunkt?",
    "options": [
      "31.05., 22:00 Uhr",
      "01.06., 06:00 Uhr",
      "01.06., 13:00 Uhr",
      "02.06., 06:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 37 Abs. 1 WDO (Nachtfrist): Nach dem Schlussgehör (31.05.) muss eine Nacht (22–06 Uhr) vergehen → 01.06., 06:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. b)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Früheste Vollstreckung? (Ausnahmefälle außer Betracht)",
    "options": [
      "01.06., 13:00 Uhr",
      "02.06., 13:00 Uhr",
      "02.06., 06:00 Uhr",
      "03.06., 13:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 47 Abs. 1 WDO: Frühestens am Folgetag der Verhängung (01.06.), 13:00 Uhr → 02.06., 13:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. c)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Spätester Verhängungszeitpunkt?",
    "options": [
      "03.11., 24:00 Uhr",
      "04.11., 24:00 Uhr",
      "04.08., 24:00 Uhr",
      "31.12., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 2 WDO: 6 Monate ab Tatbegehung – Fristende am ZAHLENGLEICHEN Tag sechs Monate später, 24:00 Uhr (fotoverifizierte Systematik). Das Verhängungsverbot beginnt am Folgetag, 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. d)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Wann tritt das Verhängungsverbot ein?",
    "options": [
      "04.11., 24:00 Uhr",
      "05.11., 00:00 Uhr",
      "03.11., 24:00 Uhr",
      "04.05. Folgejahr"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 2 WDO: 6 Monate ab Tatbegehung – Fristende am ZAHLENGLEICHEN Tag sechs Monate später, 24:00 Uhr (fotoverifizierte Systematik). Das Verhängungsverbot beginnt am Folgetag, 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. e)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Früheste Beschwerde gegen die am 01.06. verhängte Maßnahme?",
    "options": [
      "01.06., sofort",
      "02.06., 06:00 Uhr",
      "02.06., 00:00 Uhr",
      "03.06., 06:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: frühestens nach der Nacht (22–06 Uhr) nach Verhängung → 02.06., 06:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. f)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Späteste Beschwerdeeinlegung? (Sa/So/Feiertage außer Betracht)",
    "options": [
      "15.06., 24:00 Uhr",
      "01.07., 24:00 Uhr",
      "02.07., 24:00 Uhr",
      "01.12., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "1 Monat ab Verhängung (01.06.) → 01.07., 24:00 Uhr (§ 42 WDO i.V.m. § 6 Abs. 1 WBO)."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. g)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Wann ist die Maßnahme unanfechtbar?",
    "options": [
      "01.07., 24:00 Uhr",
      "02.07., 00:00 Uhr",
      "02.07., 06:00 Uhr",
      "08.07., 00:00 Uhr"
    ],
    "correct": 1,
    "expl": "Mit Ablauf der Beschwerdefrist (01.07., 24:00 Uhr) → unanfechtbar ab 02.07., 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 h)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Welche Beschwerdeart ist gegen eine Disziplinarbuße statthaft?",
    "options": [
      "Truppendienstliche Beschwerde (§ 1 WBO)",
      "Disziplinarbeschwerde (§ 42 WDO)",
      "Verwaltungsbeschwerde (§ 23 WBO)",
      "Weitere Beschwerde (§ 16 WBO)"
    ],
    "correct": 1,
    "expl": "Gegen verhängte einfache Disziplinarmaßnahmen: Disziplinarbeschwerde nach § 42 WDO."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. i)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Späteste Vollstreckung?",
    "options": [
      "02.01. Folgejahr, 24:00 Uhr",
      "01.01. Folgejahr, 24:00 Uhr",
      "02.10., 24:00 Uhr",
      "01.07., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 57 Abs. 1 WDO: 6 Monate ab Unanfechtbarkeit (02.07.) → spätestens 01.01., 24:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 – DV am 04.05., Schlussgehör am 31.05. j)",
    "q": "Fall 1 – DV am 04.05., Schlussgehör am 31.05.: Ab wann ist die Vollstreckung unzulässig?",
    "options": [
      "01.01., 24:00 Uhr",
      "02.01. Folgejahr, 00:00 Uhr",
      "03.01., 00:00 Uhr",
      "01.02., 00:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nach Ablauf der Vollstreckungsfrist → unzulässig ab 02.01., 00:00 Uhr (§ 57 Abs. 1 WDO)."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. a)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Frühester Verhängungszeitpunkt?",
    "options": [
      "17.08., 22:00 Uhr",
      "18.08., 06:00 Uhr",
      "18.08., 13:00 Uhr",
      "19.08., 06:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nachtfrist (§ 37 Abs. 1 WDO) nach Schlussgehör 17.08. → 18.08., 06:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. b)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Früheste Vollstreckung?",
    "options": [
      "18.08., 13:00 Uhr",
      "19.08., 13:00 Uhr",
      "19.08., 06:00 Uhr",
      "20.08., 13:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 47 Abs. 1 WDO: Folgetag der Verhängung (18.08.), 13:00 Uhr → 19.08., 13:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. c)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Spätester Verhängungszeitpunkt?",
    "options": [
      "11.02. Folgejahr, 24:00 Uhr",
      "12.02. Folgejahr, 24:00 Uhr",
      "12.11., 24:00 Uhr",
      "12.08. Folgejahr"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 2 WDO: 6 Monate ab Tatbegehung – Fristende am ZAHLENGLEICHEN Tag sechs Monate später, 24:00 Uhr (fotoverifizierte Systematik). Das Verhängungsverbot beginnt am Folgetag, 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. d)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Verhängungsverbot ab?",
    "options": [
      "12.02. Folgejahr, 24:00 Uhr",
      "13.02. Folgejahr, 00:00 Uhr",
      "11.02. Folgejahr, 24:00 Uhr",
      "01.03., 00:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 2 WDO: 6 Monate ab Tatbegehung – Fristende am ZAHLENGLEICHEN Tag sechs Monate später, 24:00 Uhr (fotoverifizierte Systematik). Das Verhängungsverbot beginnt am Folgetag, 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. e)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Früheste Beschwerde?",
    "options": [
      "18.08., sofort",
      "19.08., 06:00 Uhr",
      "19.08., 00:00 Uhr",
      "20.08., 06:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nach der Nacht nach Verhängung (18.08.) → 19.08., 06:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. f)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Späteste Beschwerdeeinlegung?",
    "options": [
      "17.09., 24:00 Uhr",
      "18.09., 24:00 Uhr",
      "19.09., 24:00 Uhr",
      "18.10., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "1 Monat ab Verhängung (18.08.) → 18.09., 24:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. g)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Unanfechtbarkeit?",
    "options": [
      "18.09., 24:00 Uhr",
      "19.09., 00:00 Uhr",
      "19.09., 06:00 Uhr",
      "25.09., 00:00 Uhr"
    ],
    "correct": 1,
    "expl": "Mit Ablauf der Beschwerdefrist → unanfechtbar ab 19.09., 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 h)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Beschwerdeart gegen Disziplinararrest?",
    "options": [
      "Truppendienstliche Beschwerde (§ 1 WBO)",
      "Disziplinarbeschwerde (§ 42 WDO)",
      "Verwaltungsbeschwerde (§ 23 WBO)",
      "Antrag nach § 17 WBO"
    ],
    "correct": 1,
    "expl": "Auch gegen den Disziplinararrest ist die Disziplinarbeschwerde (§ 42 WDO) statthaft."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. i)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Späteste Vollstreckung?",
    "options": [
      "19.03., 24:00 Uhr",
      "18.03. Folgejahr, 24:00 Uhr",
      "19.09., 24:00 Uhr",
      "18.02., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 57 Abs. 1 WDO: 6 Monate ab Unanfechtbarkeit (19.09.) → 18.03., 24:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 – DV am 12.08., Schlussgehör am 17.08. j)",
    "q": "Fall 2 – DV am 12.08., Schlussgehör am 17.08.: Vollstreckungsverbot ab?",
    "options": [
      "18.03., 24:00 Uhr",
      "19.03. Folgejahr, 00:00 Uhr",
      "20.03., 00:00 Uhr",
      "01.04., 00:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nach Fristablauf → Vollstreckung ab 19.03., 00:00 Uhr unzulässig."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. a)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Frühester Verhängungszeitpunkt?",
    "options": [
      "29.11., 22:00 Uhr",
      "30.11., 06:00 Uhr",
      "30.11., 13:00 Uhr",
      "01.12., 06:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nachtfrist (§ 37 Abs. 1 WDO) → 30.11., 06:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. b)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Früheste Vollstreckung?",
    "options": [
      "30.11., 13:00 Uhr",
      "01.12., 13:00 Uhr",
      "01.12., 06:00 Uhr",
      "02.12., 13:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 47 Abs. 1 WDO: Folgetag, 13:00 Uhr → 01.12., 13:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. c)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Spätester Verhängungszeitpunkt (6 Monate)?",
    "options": [
      "01.05. Folgejahr, 24:00 Uhr",
      "02.05. Folgejahr, 24:00 Uhr",
      "02.02., 24:00 Uhr",
      "02.11. Folgejahr"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 2 WDO: 6 Monate ab Tatbegehung – Fristende am ZAHLENGLEICHEN Tag sechs Monate später, 24:00 Uhr (fotoverifizierte Systematik). Das Verhängungsverbot beginnt am Folgetag, 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. d)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Verhängungsverbot ab?",
    "options": [
      "02.05. Folgejahr, 24:00 Uhr",
      "03.05. Folgejahr, 00:00 Uhr",
      "01.05. Folgejahr, 24:00 Uhr",
      "01.06., 00:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 2 WDO: 6 Monate ab Tatbegehung – Fristende am ZAHLENGLEICHEN Tag sechs Monate später, 24:00 Uhr (fotoverifizierte Systematik). Das Verhängungsverbot beginnt am Folgetag, 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. e)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Früheste Beschwerde?",
    "options": [
      "30.11., sofort",
      "01.12., 06:00 Uhr",
      "01.12., 00:00 Uhr",
      "02.12., 06:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nach der Nacht nach Verhängung (30.11.) → 01.12., 06:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. f)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Späteste Beschwerdeeinlegung?",
    "options": [
      "29.12., 24:00 Uhr",
      "30.12., 24:00 Uhr",
      "31.12., 24:00 Uhr",
      "30.01., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "1 Monat ab Verhängung (30.11.) → 30.12., 24:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. g)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Unanfechtbarkeit?",
    "options": [
      "30.12., 24:00 Uhr",
      "31.12., 00:00 Uhr",
      "01.01., 00:00 Uhr",
      "31.12., 06:00 Uhr"
    ],
    "correct": 1,
    "expl": "Mit Fristablauf → 31.12., 00:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 h)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Beschwerdeart gegen strengen Verweis?",
    "options": [
      "Truppendienstliche Beschwerde (§ 1 WBO)",
      "Disziplinarbeschwerde (§ 42 WDO)",
      "Verwaltungsbeschwerde (§ 23 WBO)",
      "Eingabe an den Wehrbeauftragten"
    ],
    "correct": 1,
    "expl": "Der strenge Verweis ist eine einfache Disziplinarmaßnahme → Disziplinarbeschwerde (§ 42 WDO)."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. i)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Späteste Vollstreckung?",
    "options": [
      "01.07., 24:00 Uhr",
      "30.06. Folgejahr, 24:00 Uhr",
      "31.03., 24:00 Uhr",
      "31.12., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 57 Abs. 1 WDO: 6 Monate ab Unanfechtbarkeit (31.12.) → 30.06., 24:00 Uhr."
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 – DV am 02.11., Schlussgehör am 29.11. j)",
    "q": "Fall 3 – DV am 02.11., Schlussgehör am 29.11.: Vollstreckungsverbot ab?",
    "options": [
      "30.06., 24:00 Uhr",
      "01.07. Folgejahr, 00:00 Uhr",
      "02.07., 00:00 Uhr",
      "01.08., 00:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nach Fristablauf → 01.07., 00:00 Uhr."
  },
  {
    "cat": "Verfassungsrecht",
    "mode": "single",
    "topic": "Bild 3",
    "q": "Welches ist KEIN Staatsstrukturprinzip?",
    "options": [
      "Demokratieprinzip",
      "Republikprinzip",
      "Bundesstaatsprinzip",
      "Gleichheitsprinzip",
      "Rechtsstaatsprinzip"
    ],
    "correct": 3,
    "expl": "Staatsstrukturprinzipien (Art. 20 GG): Republik, Demokratie, Bundesstaat, Sozialstaat, Rechtsstaat. Das Gleichheitsprinzip ist ein Grundrecht (Art. 3 GG)."
  },
  {
    "cat": "Verfassungsrecht",
    "mode": "single",
    "topic": "Bild 4/23",
    "q": "Welcher Artikel des Grundgesetzes legitimiert den Einsatz der Bundeswehr?",
    "options": [
      "Art. 20 GG",
      "Art. 4 GG",
      "Art. 87a GG",
      "Art. 103 GG"
    ],
    "correct": 2,
    "expl": "Art. 87a GG: Der Bund stellt Streitkräfte zur Verteidigung auf."
  },
  {
    "cat": "Verfassungsrecht",
    "mode": "multi",
    "topic": "Bild 5 – FDGO",
    "q": "Welche Inhalte des Grundgesetzes umfasst die FDGO nach dem Bundesverfassungsgericht? (Mehrfachauswahl)",
    "options": [
      "Rechtsstaatsprinzip",
      "Republikprinzip",
      "Demokratieprinzip",
      "Bundesstaatsprinzip",
      "Sozialstaatsprinzip",
      "Menschenwürde"
    ],
    "correct": [
      0,
      2,
      5
    ],
    "expl": "Laut Skript (Kap. Verfassungsrecht): Die FDGO umfasst die Menschenwürde (Ausgangspunkt, höchster Verfassungswert), das Demokratieprinzip und das Rechtsstaatsprinzip. Bundesstaats-, Republik- und Sozialstaatsprinzip gehören NICHT dazu. (Die Foto-Transkription mit 'Bundesstaatsprinzip' war ein Lesefehler.)"
  },
  {
    "cat": "Verfassungsrecht",
    "mode": "single",
    "topic": "Bild 22",
    "q": "In welcher Reihenfolge wird ein Grundrechtseingriff geprüft?",
    "options": [
      "Eingriff → Grundrecht → Einschränkung → Ergebnis",
      "Welches Grundrecht? → Eingriff? → Verfassungsgemäße Einschränkung (Grundlage, Voraussetzungen, Verhältnismäßigkeit) → Gesamtergebnis",
      "Verhältnismäßigkeit → Grundrecht → Eingriff → Ergebnis",
      "Gesamtergebnis zuerst"
    ],
    "correct": 1,
    "expl": "Schema: 1. Grundrecht? 2. Eingriff? 3. Verfassungsgemäße Einschränkung (gesetzl. Grundlage – § 6 S. 2 SG oder kollidierendes Verfassungsrecht; Voraussetzungen; Verhältnismäßigkeit: Geeignetheit/Erforderlichkeit/Angemessenheit) 4. Gesamtergebnis."
  },
  {
    "cat": "Wehrstrafrecht",
    "mode": "multi",
    "topic": "Bild 7 – Flieger Heil",
    "q": "Hat sich Flieger Heil (Trunkenheitsfahrt mit Sachbeschädigung) strafbar gemacht? (Mehrfachauswahl)",
    "options": [
      "§ 303 Abs. 1 StGB",
      "§ 315b StGB",
      "§ 316 StGB",
      "§ 323a StGB",
      "§ 20 Abs. 1 Nr. 1 WStG",
      "§ 25 Abs. 1 WStG"
    ],
    "correct": [
      0,
      2
    ],
    "expl": "§ 316 StGB (Trunkenheit im Verkehr) + § 303 Abs. 1 StGB (Sachbeschädigung). § 315b erfordert verkehrsfremden Eingriff, § 323a Schuldunfähigkeit; Wehrstraftaten nicht einschlägig."
  },
  {
    "cat": "Wehrstrafrecht",
    "mode": "single",
    "topic": "Bild 8 – StUffz S.",
    "q": "StUffz S. pöbelt betrunken (1,8 ‰) nach Dienst in einer Kantine in der Kaserne die ZIVILE Bedienung erniedrigend an. Welche Aussage ist richtig?",
    "options": [
      "S. begeht eine Straftat nach § 31 WStG (entwürdigende Behandlung)",
      "S. begeht eine Straftat nach § 31 WStG UND ein Dienstvergehen",
      "S. begeht keine Wehrstraftat, aber ein Dienstvergehen",
      "S. ist schuldunfähig (§ 20 StGB) – weder Straftat noch DV",
      "S. begeht keine Wehrstraftat und kein Dienstvergehen"
    ],
    "correct": 2,
    "expl": "§ 31 WStG scheidet aus: Die zivile Bedienung ist kein UNTERGEBENER – das Sonderdelikt setzt ein Vorgesetzten-Untergebenen-Verhältnis voraus. Aber: Dienstvergehen (§ 23 Abs. 1 SG i.V.m. § 17 Abs. 2 SG). 1,8 ‰ begründet keine Schuldunfähigkeit."
  },
  {
    "cat": "Wehrstrafrecht",
    "mode": "multi",
    "topic": "Bild 8 – Grundsätze",
    "q": "Welche Aussagen zu straf-/disziplinarrechtlichen Grundsätzen sind richtig? (Mehrfachauswahl)",
    "options": [
      "Straf- und Disziplinarverfahren verfolgen unterschiedliche Zwecke",
      "Der DiszVorg bestraft Soldaten",
      "Der DiszVorg ahndet Dienstpflichtverletzungen",
      "Das Disziplinarverfahren dient der Erziehung",
      "Freiheitsstrafe und Disziplinararrest verfolgen denselben Zweck",
      "Fahrlässigkeit ist immer strafbar",
      "Ein DV ist der Verstoß gegen soldatische Pflichten UND das StGB",
      "Der Versuch eines Vergehens ist immer strafbar"
    ],
    "correct": [
      0,
      2,
      3
    ],
    "expl": "Richtig: unterschiedliche Zwecke, Ahndung von Dienstpflichtverletzungen, Erziehungszweck. Falsch: Der DiszVorg 'bestraft' nicht; Fahrlässigkeit nur strafbar bei ausdrücklicher Anordnung (§ 15 StGB); Versuch eines Vergehens nur bei gesetzlicher Anordnung (§ 23 Abs. 1 StGB)."
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild 9 – Ermittlungspflicht",
    "q": "Sie sind KpChef und haben ein gutes persönliches Verhältnis zu Fw Schober; Sie können sich sein gemeldetes Fehlverhalten nicht vorstellen. Was gilt?",
    "options": [
      "Ermittlungen stehen in Ihrem Ermessen",
      "Sie sind zur Aufnahme von Ermittlungen verpflichtet (§ 32 Abs. 1 WDO)",
      "Keine Ermittlungen ohne schriftliche Anzeige",
      "Sie geben das Verfahren sofort ab"
    ],
    "correct": 1,
    "expl": "Legalitätsprinzip (§ 32 Abs. 1 WDO): Bei Anfangsverdacht MUSS ermittelt werden – persönliche Einschätzungen sind unbeachtlich."
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild 9 – Frist",
    "q": "Das Dienstvergehen des Fw Schober geschah am 19.07. Bis wann muss eine Disziplinarmaßnahme spätestens verhängt sein?",
    "options": [
      "19.10., 24:00 Uhr",
      "19.01. Folgejahr, 24:00 Uhr",
      "18.01. Folgejahr, 24:00 Uhr",
      "19.07. Folgejahr"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 2 WDO: 6-Monats-Frist ab Tatbegehung (19.07.) → laut Lösung: spätestens 19.01., 24:00 Uhr."
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild 10 – Ausgangsbeschränkung",
    "q": "Gegen Flieger Heil wird am 25.07. eine 7-tägige Ausgangsbeschränkung verhängt. Wann kann sie frühestens vollstreckt werden?",
    "options": [
      "26.07., 13:00 Uhr",
      "27.07., 00:00 Uhr",
      "26.07., 00:00 Uhr",
      "28.07., 13:00 Uhr"
    ],
    "correct": 1,
    "expl": "§ 47 Abs. 1, § 52 Abs. 2 WDO: Bei der Ausgangsbeschränkung beginnt die Vollstreckung am ZWEITEN Tag nach der Verhängung um 00:00 Uhr → 27.07., 00:00 Uhr (Besonderheit!)."
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild 11 – Beschwerdefristen",
    "q": "Flieger Heil will sich gegen die am 25.07. verhängte Ausgangsbeschränkung beschweren. Frühester und spätester Zeitpunkt?",
    "options": [
      "25.07. sofort bis 25.08., 24:00 Uhr",
      "26.07., 06:00 Uhr bis 25.08., 24:00 Uhr",
      "26.07., 00:00 Uhr bis 24.08., 24:00 Uhr",
      "27.07., 06:00 Uhr bis 27.08., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "Frühestens nach der Nacht nach Verhängung: 26.07., 06:00 Uhr. Spätestens 1 Monat nach Verhängung: 25.08., 24:00 Uhr (§ 6 Abs. 1 WBO)."
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild 11 – Rücknahme der Beschwerde",
    "q": "Flieger Heil legt fristgerecht Beschwerde ein, zieht sie aber am 20.08. – noch vor der Entscheidung – zurück. Bis wann muss die gegen ihn verhängte Ausgangsbeschränkung spätestens vollstreckt sein?",
    "options": [
      "24.08., 00:00 Uhr (§ 47 WDO)",
      "20.02., 24:00 Uhr (§ 57 WDO)",
      "25.02., 24:00 Uhr (§ 57 WDO)",
      "25.08., 24:00 Uhr (§ 57 WDO)"
    ],
    "correct": 2,
    "expl": "Musterlösung: 25.02., 24:00 Uhr, § 57 WDO. Die Rücknahme ändert die Berechnung nicht: Maßgeblich bleibt der Ablauf der Beschwerdefrist (25.08., 24:00 Uhr) → Unanfechtbarkeit 26.08., 00:00 Uhr → + 6 Monate Vollstreckungsfrist = 25.02., 24:00 Uhr. (§ 47 WDO regelt nur den BEGINN der Vollstreckung, nicht die Frist.)"
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild 12 – Beschwerdeart/Zuständigkeit",
    "q": "Um welche Beschwerdeart handelt es sich bei Flieger Heils Beschwerde und wer entscheidet?",
    "options": [
      "Truppendienstliche Beschwerde – Truppendienstgericht",
      "Disziplinarbeschwerde – Truppendienstgericht",
      "Truppendienstliche Beschwerde – Bataillonskommandeur",
      "Disziplinarbeschwerde – nächster DiszVorg des verhängenden KpChefs (Bataillonskommandeur)"
    ],
    "correct": 3,
    "expl": "Disziplinarbeschwerde (§ 42 WDO); über sie entscheidet der nächste Disziplinarvorgesetzte des Verhängenden – hier der Bataillonskommandeur."
  },
  {
    "cat": "Fallreihe",
    "mode": "multi",
    "topic": "Bild 21 – Fw Schober (Gesamtfall)",
    "q": "Fw Schober (ZgFhr) nennt Flieger Heil auf einer Feier vor dessen Kameraden 'Niete' und hält ihn später nicht von der erkennbaren Trunkenheitsfahrt ab. Hat er ein oder mehrere Dienstvergehen begangen? Kreuzen Sie alle richtigen Aussagen an.",
    "options": [
      "Verstoß gegen § 7, 1. Hs. SG (treues Dienen) durch die Bezeichnung 'Niete'",
      "Verstoß gegen § 10 Abs. 2 SG (Dienstaufsicht) – Nichtabhalten von der Trunkenheitsfahrt",
      "Verstoß gegen § 10 Abs. 3 SG (Fürsorge) durch die Ehrverletzung ('Niete')",
      "Verstoß gegen § 10 Abs. 3 SG (Fürsorge) durch Nichtabhalten von der Trunkenheitsfahrt",
      "Verstoß gegen § 10 Abs. 6 SG (Zurückhaltung) – Äußerung vor Untergebenen",
      "Verstoß gegen § 12 S. 2 SG (Kameradschaft/Ehre)",
      "Verstoß gegen § 17 Abs. 2 S. 3, 1. Alt. SG (außerdienstliches Wohlverhalten)",
      "Verstoß gegen § 17 Abs. 2 S. 3, 2. Alt. SG (außerdienstliches Wohlverhalten)",
      "Er handelte vorsätzlich (Wissen und Wollen)",
      "Er handelte rechtswidrig (keine Rechtfertigungsgründe)",
      "Er hat mehrere Dienstpflichtverletzungen begangen",
      "Verstoß gegen § 10 Abs. 1 SG (Vorbildpflicht)",
      "Er handelte fahrlässig",
      "Er handelte nicht schuldhaft (§ 20 StGB)",
      "Er hat mehrere Dienstvergehen begangen"
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "expl": "Laut korrigierter Musterlösung sind ALLE elf Aussagen richtig – inkl. § 10 Abs. 2 SG (Dienstaufsicht). Wichtig: mehrere PFLICHTVERLETZUNGEN, aber EIN Dienstvergehen (Einheit des Dienstvergehens) – deshalb ist 'mehrere Dienstvergehen' falsch. Die Feier war außerdienstlich → § 17 Abs. 2 S. 3 SG (beide Alternativen)."
  },
  {
    "cat": "Fall Müller",
    "mode": "multi",
    "topic": "Bild 13 – Belehrung",
    "q": "OGefr (OA) Müller wird als Beschuldigter vernommen. Mit welchem Inhalt muss er belehrt werden? (Mehrfachauswahl)",
    "options": [
      "Er muss aussagen, wenn er weder sich noch nahe Angehörige belastet",
      "Er unterliegt bei einer Aussage nicht der Wahrheitspflicht",
      "Er muss aussagen, außer er würde sich selbst belasten",
      "Es steht ihm frei, sich zur Sache zu äußern oder nicht auszusagen",
      "Er muss in dienstlichen Angelegenheiten die Wahrheit sagen, wenn er aussagt",
      "Er muss nicht aussagen, wenn er sich oder nahe Angehörige belasten würde – sonst Aussagepflicht"
    ],
    "correct": [
      3,
      4
    ],
    "expl": "Als BESCHULDIGTER gilt grundsätzliche Aussagefreiheit – er kann sich äußern oder schweigen (keine Aussagepflicht, auch nicht 'außer bei Selbstbelastung'). WENN er aussagt: Wahrheitspflicht (§ 13 Abs. 1 SG, § 32 Abs. 4 WDO)."
  },
  {
    "cat": "Fall Müller",
    "mode": "multi",
    "topic": "Bild 13 – WStG",
    "q": "OGefr Müller (One-Way-Ticket nach Sydney, erklärte Absicht, dauerhaft nicht mehr Soldat zu sein; Befehle der Feldjäger verweigert und Feldjäger getreten): Wonach hat er sich strafbar gemacht? (Mehrfachauswahl)",
    "options": [
      "§ 15 Abs. 1 WStG",
      "§ 16 Abs. 1 WStG (Fahnenflucht)",
      "§ 19 Abs. 1 WStG",
      "§ 20 Abs. 1 Nr. 1 WStG",
      "§ 20 Abs. 1 Nr. 2 WStG",
      "§ 25 Abs. 1 WStG",
      "§ 18 Abs. 1 WStG"
    ],
    "correct": [
      1,
      3,
      4,
      5
    ],
    "expl": "§ 16 Abs. 1 WStG (Fahnenflucht – dauerhafte Entziehungsabsicht verdrängt § 15), § 20 Abs. 1 Nr. 1 und Nr. 2 WStG (Gehorsamsverweigerung durch Auflehnung und trotz Wiederholung) sowie § 25 Abs. 1 WStG (tätlicher Angriff – Tritt gegen den Feldjäger)."
  },
  {
    "cat": "Fall Müller",
    "mode": "single",
    "topic": "Bild 19 – Zuständigkeit",
    "q": "Woraus ergibt sich die Disziplinarbefugnis des Inspektionschefs gegenüber OGefr Müller?",
    "options": [
      "§ 27 WDO",
      "§ 29 Abs. 1 WDO",
      "§ 42 WDO",
      "§ 17 WBO"
    ],
    "correct": 1,
    "expl": "§ 29 Abs. 1 WDO: Der nächste Disziplinarvorgesetzte ist zuständig – hier der Inspektionschef."
  },
  {
    "cat": "Fall Müller",
    "mode": "single",
    "topic": "Bild 19 – Rechtsbehelf",
    "q": "Nach erfolgloser Disziplinarbeschwerde gegen die 7-tägige Ausgangsbeschränkung: Welcher Rechtsbehelf bleibt Müller?",
    "options": [
      "Weitere Beschwerde beim Truppenkommandeur (§ 16 Abs. 1 WBO)",
      "Antrag auf Entscheidung des Truppendienstgerichts (§ 17 Abs. 1 WBO)",
      "Weitere truppendienstliche Beschwerde beim Schulkommandeur (§ 16 Abs. 2 WBO)",
      "Kein weiterer Rechtsbehelf"
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 1 WBO: Antrag auf gerichtliche Entscheidung beim Truppendienstgericht."
  },
  {
    "cat": "Fall Müller",
    "mode": "multi",
    "topic": "Bild 20 – Gesamtfall",
    "q": "OGefr Müller erscheint am 17.03. entgegen dem Dienstplan nicht zum Dienst, nennt OFw Schulze (Feldjäger) 'Folterknecht' und tritt ihn gegen das Schienbein. Hat er ein Dienstvergehen begangen? Kreuzen Sie alle richtigen Aussagen an.",
    "options": [
      "Verstoß gegen § 7, 1. Hs. SG durch Fernbleiben vom Dienst",
      "Verstoß gegen § 11 Abs. 1 SG (Gehorsam) – Dienstplan nicht befolgt",
      "Verstoß gegen § 12 S. 2 SG durch die Bezeichnung 'Folterknecht'",
      "Verstoß gegen § 7, 1. Hs. SG durch die Bezeichnung 'Folterknecht'",
      "Verstoß gegen § 12 S. 2 SG durch den Tritt gegen OFw Schulze",
      "Verstoß gegen § 17 Abs. 1 SG (Achtung der dienstlichen Stellung des Vorgesetzten)",
      "Verstoß gegen § 17 Abs. 2 S. 3, 2. Alt. SG (außerdienstliches Wohlverhalten)",
      "Er handelt rechtswidrig (keine Rechtfertigungsgründe)",
      "Er hat gegen mehrere soldatische Pflichten verstoßen",
      "Der Dienstplan ist kein verbindlicher Befehl (nur Aushang)",
      "Verstoß gegen § 13 Abs. 1 SG durch die Äußerung 'Folterknecht'",
      "OFw Schulze ist als Feldjäger kein Kamerad – § 12 SG scheidet aus",
      "§ 17 Abs. 1 SG gilt nicht außerhalb umschlossener Anlagen",
      "Er ist nach § 35 StGB entschuldigt"
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "expl": "Laut Musterlösung: Neun Aussagen richtig. Der per Dienstplan bekanntgegebene Dienst ist ein verbindlicher Befehl (§ 11 Abs. 1 SG!). 'Folterknecht' verletzt § 12 S. 2 und § 7 SG; der Tritt zusätzlich § 12 S. 2 und § 17 Abs. 1 SG (Achtung des Vorgesetzten – gilt auch außerhalb der Kaserne). § 13 SG passt nicht (Werturteil, keine Tatsachenbehauptung)."
  },
  {
    "cat": "VorgV",
    "mode": "multi",
    "topic": "Bild 14 – Fall 1",
    "q": "OLt Fuchs (ZgFhr I. Zug, 2. Kp, zugleich Jugendoffizier des Btl) und Fw Peters (gleiche Kompanie), beide im Dienst in der Kaserne. Kreuzen Sie alle bestehenden Vorgesetztenverhältnisse an.",
    "options": [
      "§ 1 VorgV",
      "§ 2 VorgV",
      "§ 4 Abs. 1 S. 1 Nr. 1 VorgV",
      "§ 4 Abs. 3 VorgV",
      "§ 6 VorgV",
      "§ 4 Abs. 2 i.V.m. § 4 Abs. 1 S. 1 Nr. 1 VorgV"
    ],
    "correct": [
      0,
      2,
      3
    ],
    "expl": "Laut korrigierter Lösung (scharfes Foto): § 1 VorgV (unmittelbarer Vorgesetzter), § 4 Abs. 1 S. 1 Nr. 1 VorgV (Offizier ggü. Uffz, beide im Dienst) und § 4 Abs. 3 VorgV (umschlossene militärische Anlage)."
  },
  {
    "cat": "VorgV",
    "mode": "multi",
    "topic": "Bild 14 – Fall 2",
    "q": "KpChefin Hptm Boll ordnet beim Antreten die Teilnahme aller Mannschaften und Unteroffiziere ihrer Einheit am Standortgottesdienst an. Nach welchen Vorschriften besteht ein Vorgesetztenverhältnis zu einem Unteroffizier ihrer Einheit?",
    "options": [
      "§ 3 VorgV",
      "§ 1 VorgV",
      "§ 4 Abs. 3 VorgV",
      "§ 5 VorgV",
      "§ 4 Abs. 2 i.V.m. § 4 Abs. 1 S. 1 Nr. 1 VorgV",
      "§ 4 Abs. 1 S. 1 Nr. 1 VorgV"
    ],
    "correct": [
      1,
      2,
      5
    ],
    "expl": "Identisches Muster wie Fall 1: § 1 VorgV (KpChefin = unmittelbare Vorgesetzte ihrer Einheit), § 4 Abs. 1 S. 1 Nr. 1 VorgV und § 4 Abs. 3 VorgV (innerhalb der Kaserne)."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "multi",
    "topic": "Bild 15 – Flieger Siebert",
    "q": "StUffz Pietsch befiehlt Flieger Siebert (unordentlicher Spind), mit dem Schild 'Flieger Schweinchen' zu stehen. Welche Aussagen treffen zu? (Mehrfachauswahl)",
    "options": [
      "Der Befehl ist wegen Gesetzesverstoßes rechtswidrig",
      "Der Befehl ist rechtmäßig",
      "Der Befehl ist unverbindlich (Menschenwürde verletzt)",
      "Der Befehl ist verbindlich",
      "Der Befehl ist unverbindlich, da unzumutbar",
      "Der Befehl muss nicht befolgt werden",
      "Der Befehl darf nicht befolgt werden",
      "Der Befehl muss befolgt werden"
    ],
    "correct": [
      0,
      2,
      6
    ],
    "expl": "Die entwürdigende Bloßstellung verletzt die Menschenwürde (Art. 1 GG): rechtswidrig, unverbindlich und er DARF nicht befolgt werden (§ 11 Abs. 2 SG – Ausführung wäre Beteiligung an entwürdigender Behandlung). 'Muss nicht' greift zu kurz – laut Lösung ist nur 'darf nicht' anzukreuzen."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "multi",
    "topic": "Bild 17 – EZM",
    "q": "Welche Aussagen zu erzieherischen Maßnahmen treffen zu? (Mehrfachauswahl)",
    "options": [
      "Ein Gruppenführer darf einen unwilligen Soldaten seiner Gruppe zurechtweisen",
      "Ein Zugführer darf einem motivierten Soldaten vorzeitig Dienstschluss erteilen",
      "Ein Staffelchef darf nur besondere EZM verhängen",
      "Ein KpChef darf statt einer gebotenen Disziplinarmaßnahme die mildere EZM wählen",
      "Eine EZM muss spätestens nach 6 Monaten verhängt sein",
      "Backsteine mit Namen herumtragen zu lassen ist KEINE zulässige EZM",
      "Gegen eine EZM ist die truppendienstliche Beschwerde statthaft"
    ],
    "correct": [
      0,
      1,
      3,
      4,
      5
    ],
    "expl": "Richtig: Zurechtweisung, Belobigung (vorzeitiger Dienstschluss), Wahl der milderen EZM, 6-Monats-Frist, und entwürdigende 'Erziehung' (Backsteine) ist unzulässig. Laut Lösungsschlüssel NICHT angekreuzt: die truppendienstliche Beschwerde gegen EZM."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "multi",
    "topic": "Bild 18 – Allgemein",
    "q": "Welche Aussagen zum Befehlsrecht treffen zu? (Mehrfachauswahl)",
    "options": [
      "Ein rechtswidriger und verbindlicher Befehl braucht nicht befolgt zu werden",
      "Verstößt ein Befehl gegen Gesetze, darf er nicht ausgeführt werden",
      "Ein rechtmäßiger Befehl ist auch immer verbindlich",
      "Unverbindliche Befehle sind rechtswidrig und müssen nicht oder dürfen nicht befolgt werden",
      "Befehle, die nicht ausgeführt werden müssen, sind rechtswidrig und unverbindlich"
    ],
    "correct": [
      2,
      3
    ],
    "expl": "Merksätze: Jeder rechtmäßige Befehl ist verbindlich; jeder unverbindliche Befehl ist zugleich rechtswidrig. Aber: Ein rechtswidriger, verbindlicher Befehl MUSS befolgt werden; nicht jeder Gesetzesverstoß führt zum Ausführungsverbot (nur Straftaten, § 11 Abs. 2 SG)."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Bild 16 – Kombination",
    "q": "Uffz Meier erscheint erneut deutlich zu spät. Die Staffelchefin will eine einfache Disziplinarmaßnahme verhängen. Was gilt für die Kombination mit EZM?",
    "options": [
      "EZM und Disziplinarmaßnahme dürfen niemals kombiniert werden",
      "Zusätzlicher Wachdienst als Wiederholungsdienst ist zulässig",
      "Die Maßnahme kann mit der EZM zu einer Gesamtmaßnahme verbunden werden",
      "Zusätzlich kann eine schriftliche Ausarbeitung (2 Std. nach Dienstende) als EZM ausgesprochen werden"
    ],
    "correct": 3,
    "expl": "Eine EZM mit Ausbildungscharakter (schriftliche Ausarbeitung) kann NEBEN der Disziplinarmaßnahme ausgesprochen werden. Wachdienst als Sanktion ist unzulässig; ein 'Verbinden' zu einer Maßnahme gibt es nicht."
  }

];

const CAT_STYLES = {
  Zeitablauf:      { bg:"#1F3864", light:"#E8EDF5", accent:"#2E5F8A", icon:Shield,   label:"Zeitablauf Disziplinarverfahren (3 Fälle)" },
  Verfassungsrecht:{ bg:"#1A3A5C", light:"#E6EEF5", accent:"#1A6B9A", icon:Shield,   label:"Verfassungsrecht" },
  Wehrstrafrecht:  { bg:"#2C3E50", light:"#EAF0F5", accent:"#2E4053", icon:Scale,    label:"Wehrstrafrecht" },
  Fallreihe:       { bg:"#7A4419", light:"#FBF1E6", accent:"#B5651D", icon:BookOpen, label:"Fallreihe Fw Schober / Flieger Heil" },
  "Fall Müller":   { bg:"#1E5631", light:"#E9F5EC", accent:"#2D7A45", icon:BookOpen, label:"Fall OGefr Müller" },
  VorgV:           { bg:"#4B2E83", light:"#F1ECFA", accent:"#6A4BBC", icon:Scale,    label:"Vorgesetztenverordnung" },
  Befehlsrecht:    { bg:"#5C2E2E", light:"#FAEEEE", accent:"#A94A4A", icon:Shield,   label:"Befehlsrecht / EZM" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const [stage, setStage] = useState("start");
  const [activeCats, setActiveCats] = useState(Object.keys(CAT_STYLES));
  const [order, setOrder] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const filteredQ = useMemo(() => QUESTIONS.filter(q => activeCats.includes(q.cat)), [activeCats]);

  function startQuiz() {
    const ord = shuffle(filteredQ.map((_, i) => i));
    setOrder(ord); setIdx(0); setSelected([]); setRevealed(false); setAnswers({});
    setStage("quiz");
  }

  function toggleCat(cat) {
    setActiveCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  function toggleOption(i, mode) {
    if (revealed) return;
    if (mode === "single") {
      setSelected([i]);
    } else {
      setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    }
  }

  function confirmAnswer() {
    if (selected.length === 0) return;
    const q = filteredQ[order[idx]];
    const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
    const isCorrect = JSON.stringify([...selected].sort((a,b)=>a-b)) === JSON.stringify([...correctArr].sort((a,b)=>a-b));
    setAnswers(prev => ({ ...prev, [idx]: { selected: [...selected], correct: isCorrect } }));
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= order.length) { setStage("result"); return; }
    setIdx(idx + 1); setSelected([]); setRevealed(false);
  }

  function prev() {
    if (idx === 0) return;
    const ni = idx - 1; setIdx(ni);
    const a = answers[ni];
    setSelected(a ? a.selected : []);
    setRevealed(!!a);
  }

  const score = Object.values(answers).filter(a => a.correct).length;
  const totalAnswered = Object.keys(answers).length;

  if (!unlocked) {
    const tryUnlock = () => { if (pw === PASSWORD) { setUnlocked(true); } else { setPwError(true); } };
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:380, width:"100%", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", marginBottom:18 }}><Shield size={26} color="#fff" /></div>
          <h1 style={{ fontSize:22, fontWeight:800, marginBottom:6 }}>{APP_TITLE}</h1>
          <p style={{ color:"#A8BAD0", fontSize:13, marginBottom:20 }}>Zugriff nur mit Passwort</p>
          <input type="password" value={pw} autoFocus
            onChange={e => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={e => { if (e.key === "Enter") tryUnlock(); }}
            placeholder="Passwort"
            style={{ width:"100%", padding:"13px 15px", borderRadius:10, border:`2px solid ${pwError ? "#C0392B" : "rgba(255,255,255,0.2)"}`, background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:15, outline:"none", marginBottom:10, boxSizing:"border-box" }} />
          {pwError && <div style={{ color:"#E74C3C", fontSize:12.5, marginBottom:10 }}>Falsches Passwort</div>}
          <button onClick={tryUnlock} style={{ width:"100%", padding:"13px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:14.5, fontWeight:700, cursor:"pointer" }}>Entsperren</button>
        </div>
      </div>
    );
  }

  // ── START ──
  if (stage === "start") {
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:620, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", marginBottom:18, boxShadow:"0 8px 24px rgba(46,95,138,0.4)" }}><Award size={28} color="#fff" /></div>
            <div style={{ fontSize:11, letterSpacing:3, color:"#7FA8D9", fontWeight:600, marginBottom:6 }}>BUNDESWEHR OFFIZIERSLEHRGANG · LUFTWAFFE</div>
            <h1 style={{ fontSize:28, fontWeight:800, margin:0 }}>Wehrrecht Übung (Original-Fragen)</h1>
            <p style={{ color:"#A8BAD0", fontSize:13.5, marginTop:8 }}>{QUESTIONS.length} Fragen · 7 Themen · Single & Multi-Select · Auf Basis aller Unterlagen</p>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:20, marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:12 }}>THEMENBEREICHE WÄHLEN</div>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {Object.entries(CAT_STYLES).map(([cat, style]) => {
                const Icon = style.icon; const active = activeCats.includes(cat);
                const count = QUESTIONS.filter(q => q.cat === cat).length;
                return (
                  <button key={cat} onClick={() => toggleCat(cat)} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 13px", borderRadius:10, border:`2px solid ${active ? style.accent : "rgba(255,255,255,0.08)"}`, background:active ? `${style.accent}22` : "rgba(255,255,255,0.02)", cursor:"pointer", color:"#fff", textAlign:"left" }}>
                    <div style={{ width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background:active ? style.accent : "rgba(255,255,255,0.08)", flexShrink:0 }}><Icon size={14} color="#fff" /></div>
                    <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:13.5 }}>{style.label}</div><div style={{ fontSize:11.5, color:"#8FA3BC" }}>{count} Fragen</div></div>
                    <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${active ? style.accent : "rgba(255,255,255,0.25)"}`, background:active ? style.accent : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {active && <Check size={11} color="#fff" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={startQuiz} disabled={filteredQ.length === 0} style={{ width:"100%", padding:"14px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 6px 18px rgba(46,95,138,0.4)" }}>
            Quiz starten ({filteredQ.length} Fragen) <ChevronRight size={17} />
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (stage === "result") {
    const pct = Math.round((score / order.length) * 100);
    const byTopic = {};
    order.forEach((qi, i) => {
      const q = filteredQ[qi];
      if (!byTopic[q.cat]) byTopic[q.cat] = { correct:0, total:0 };
      byTopic[q.cat].total++;
      if (answers[i]?.correct) byTopic[q.cat].correct++;
    });
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:520, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ width:90, height:90, borderRadius:"50%", margin:"0 auto 14px", display:"flex", alignItems:"center", justifyContent:"center", background:`conic-gradient(#2E5F8A ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"#0F1B2D", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:20, fontWeight:800 }}>{pct}%</div>
              </div>
            </div>
            <h2 style={{ fontSize:20, fontWeight:800, margin:"0 0 5px" }}>{score} von {order.length} richtig</h2>
            <p style={{ color:"#A8BAD0", fontSize:13 }}>{pct >= 80 ? "Sehr gut – du bist gut vorbereitet!" : pct >= 60 ? "Solide – noch gezielt wiederholen!" : "Nochmal die Kompaktunterlagen!"}</p>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:16, marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:12 }}>ERGEBNIS NACH THEMA</div>
            {Object.entries(byTopic).map(([cat, stats]) => {
              const style = CAT_STYLES[cat]; const p = Math.round(stats.correct / stats.total * 100);
              return (<div key={cat} style={{ marginBottom:10 }}><div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:4 }}><span style={{ fontWeight:600 }}>{style.label}</span><span style={{ color:"#A8BAD0" }}>{stats.correct}/{stats.total}</span></div><div style={{ height:6, borderRadius:3, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}><div style={{ height:"100%", width:`${p}%`, background:style.accent, borderRadius:3 }} /></div></div>);
            })}
          </div>
          <button onClick={() => setStage("start")} style={{ width:"100%", padding:"13px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <RotateCcw size={14} /> Neues Quiz starten
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  const q = filteredQ[order[idx]];
  const style = CAT_STYLES[q.cat];
  const Icon = style.icon;
  const isMulti = q.mode === "multi";
  const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];

  return (
    <div style={{ minHeight:"100vh", background:"#F5F3EE", fontFamily:"Inter,system-ui,sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 12px 30px" }}>
      <div style={{ maxWidth:680, width:"100%" }}>
        <div style={{ marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#666", marginBottom:4, fontWeight:600 }}>
            <span>Frage {idx + 1} von {order.length}</span>
            <span>{score}/{totalAnswered} richtig</span>
          </div>
          <div style={{ height:4, borderRadius:2, background:"#E2DFD6", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${idx/order.length*100}%`, background:style.accent, borderRadius:2, transition:"width 0.3s" }} />
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:20, background:style.light }}>
            <Icon size={11} color={style.accent} />
            <span style={{ fontSize:11, fontWeight:700, color:style.accent }}>{style.label} · {q.topic}</span>
          </div>
          {isMulti && (
            <div style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 8px", borderRadius:20, background:"#FFF3CD", border:"1px solid #FFC107" }}>
              <CheckSquare size={10} color="#856404" />
              <span style={{ fontSize:10, fontWeight:700, color:"#856404" }}>MEHRFACHAUSWAHL</span>
            </div>
          )}
        </div>

        <h2 style={{ fontSize:17, fontWeight:700, color:"#1A1A1A", lineHeight:1.5, marginBottom:14, whiteSpace:"pre-wrap" }}>{q.q}</h2>

        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:14 }}>
          {q.options.map((opt, i) => {
            const isSel = selected.includes(i);
            const isCorrectOpt = correctArr.includes(i);
            let bg="#fff", border="#E2DFD6", color="#1A1A1A", marker="";

            if (revealed) {
              if (isCorrectOpt && isSel)   { bg="#E9F7EF"; border="#1E6B1E"; color="#14401A"; marker="✓"; }
              else if (isCorrectOpt)        { bg="#FFF9E6"; border="#F0A500"; color="#7A5100"; marker="→"; }
              else if (isSel)               { bg="#FADBD8"; border="#C0392B"; color="#7B241C"; marker="✗"; }
              else                          { bg="#FAFAFA"; color="#999"; }
            } else if (isSel) {
              bg = style.light; border = style.accent;
            }

            return (
              <button key={i} onClick={() => toggleOption(i, q.mode)} style={{ display:"flex", alignItems:"flex-start", gap:9, textAlign:"left", padding:"10px 13px", borderRadius:10, border:`2px solid ${border}`, background:bg, color, fontSize:13.5, fontWeight:500, width:"100%", cursor:revealed?"default":"pointer", transition:"all 0.1s" }}>
                <span style={{
                  width:20, height:20,
                  borderRadius: isMulti ? "4px" : "50%",
                  border:`2px solid ${isSel && !revealed ? style.accent : revealed ? "transparent" : "#CCC"}`,
                  background: isSel && !revealed ? style.accent : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:10, fontWeight:800,
                  color: revealed ? (isCorrectOpt ? (isSel ? "#1E6B1E" : "#F0A500") : (isSel ? "#C0392B" : "#999")) : (isSel ? "#fff" : "#888"),
                  flexShrink:0, marginTop:1
                }}>
                  {revealed ? marker : (isMulti ? (isSel ? "✓" : "") : String.fromCharCode(65+i))}
                </span>
                <span style={{ flex:1, lineHeight:1.45 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{ background:answers[idx]?.correct?"#E9F7EF":"#FFF8E1", border:`1px solid ${answers[idx]?.correct?"rgba(30,107,30,0.2)":"rgba(240,180,41,0.2)"}`, borderRadius:10, padding:"12px 14px", marginBottom:14, fontSize:13, lineHeight:1.6, color:"#333" }}>
            <div style={{ fontWeight:700, marginBottom:4, color:answers[idx]?.correct?"#1E6B1E":"#8A6D1A" }}>
              {answers[idx]?.correct ? "✓ Richtig!" : "✗ Nicht ganz – korrekte Antwort(en) oben markiert (→)"}
            </div>
            {q.expl}
          </div>
        )}

        <div style={{ display:"flex", gap:8 }}>
          <button onClick={prev} disabled={idx===0} style={{ padding:"11px 14px", borderRadius:9, border:"2px solid #E2DFD6", background:"#fff", color:idx===0?"#CCC":"#333", fontWeight:600, fontSize:13, cursor:idx===0?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:4 }}>
            <ChevronLeft size={14}/> Zurück
          </button>
          {!revealed ? (
            <button onClick={confirmAnswer} disabled={selected.length===0} style={{ flex:1, padding:"11px", borderRadius:9, border:"none", background:selected.length===0?"#E2DFD6":style.accent, color:"#fff", fontWeight:700, fontSize:14, cursor:selected.length===0?"not-allowed":"pointer" }}>
              {isMulti ? `Antwort prüfen (${selected.length} gewählt)` : "Antwort prüfen"}
            </button>
          ) : (
            <button onClick={next} style={{ flex:1, padding:"11px", borderRadius:9, border:"none", background:style.accent, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
              {idx+1>=order.length?"Ergebnis":"Nächste Frage"} <ChevronRight size={14}/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
