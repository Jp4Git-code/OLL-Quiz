import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award, CheckSquare } from "lucide-react";

const PASSWORD = "OSLw2026";
const APP_TITLE = "Wehrrecht Übung (Original-Fragen)";

const QUESTIONS = [
  {
    "cat": "Verfassungsrecht",
    "mode": "single",
    "topic": "Bild FDGO 1",
    "q": "Welches ist kein Staatsstrukturprinzip?",
    "options": [
      "Demokratieprinzip",
      "Republikprinzip",
      "Bundesstaatsprinzip",
      "Gleichheitsprinzip",
      "Rechtsstaatsprinzip"
    ],
    "correct": 3,
    "expl": "Das Gleichheitsprinzip ist ein Grundrecht bzw. Verfassungsprinzip, aber kein klassisches Staatsstrukturprinzip aus Art. 20 GG.",
    "sourceId": "fdgo-1",
    "order": 1
  },
  {
    "cat": "Verfassungsrecht",
    "mode": "single",
    "topic": "Bild FDGO 2",
    "q": "Welcher Artikel des Grundgesetzes legitimiert den Einsatz der Bundeswehr?",
    "options": [
      "Art. 20 GG",
      "Art. 4 GG",
      "Art. 87a GG"
    ],
    "correct": 2,
    "expl": "Art. 87a GG betrifft Aufstellung und Einsatz der Streitkräfte.",
    "sourceId": "fdgo-2",
    "order": 2
  },
  {
    "cat": "Verfassungsrecht",
    "mode": "multi",
    "topic": "Bild FDGO 3",
    "q": "Welche Inhalte des Grundgesetzes (Staatsstrukturprinzipien) umfasst die FDGO nach dem Bundesverfassungsgericht?",
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
      1,
      2,
      3,
      4
    ],
    "expl": "Nach der Vorlage sind Rechtsstaat, Republik, Demokratie, Bundesstaat und Sozialstaat zu markieren; Menschenwürde nicht.",
    "sourceId": "fdgo-3",
    "order": 3
  },
  {
    "cat": "Verfassungsrecht",
    "mode": "single",
    "topic": "Bild FDGO 4",
    "q": "Bringen Sie die Schritte zur Prüfung eines Grundrechtseingriffs in die richtige Reihenfolge.",
    "options": [
      "1. Welches Grundrecht war betroffen? → 2. Liegt ein Eingriff vor? → 3. Verfassungsgemäße Einschränkung? → 4. Gesamtergebnis",
      "1. Eingriff → 2. Grundrecht → 3. Gesamtergebnis → 4. Verhältnismäßigkeit",
      "1. Gesetzliche Grundlage → 2. Geeignetheit → 3. Grundrecht → 4. Ergebnis",
      "1. Gesamtergebnis → 2. Grundrecht → 3. Eingriff → 4. Angemessenheit"
    ],
    "correct": 0,
    "expl": "Vollständiges Schema: Grundrecht, Eingriff, verfassungsgemäße Einschränkung mit gesetzlicher Grundlage/kollidierendem Verfassungsrecht, Voraussetzungen, Verhältnismäßigkeit (Geeignetheit, Erforderlichkeit, Angemessenheit, Ergebnis), Gesamtergebnis.",
    "sourceId": "fdgo-4",
    "order": 4
  },
  {
    "cat": "Befehlsrecht",
    "mode": "multi",
    "topic": "Bild Flieger Siebert",
    "q": "Flieger Siebert ist mehrfach durch unordentlichen Spind aufgefallen. Sein Gruppenführer, Stabsunteroffizier Pietsch, befiehlt ihm, sich ab sofort als „Flieger Schweinchen“ zu melden. Welche Aussagen sind richtig?",
    "options": [
      "Der Befehl ist aufgrund eines Verstoßes gegen ein Gesetz rechtswidrig.",
      "Der Befehl ist rechtmäßig, da kein Rechtswidrigkeitsgrund vorliegt.",
      "Der Befehl ist unverbindlich, da er die Menschenwürde des Fliegers Siebert verletzt.",
      "Der Befehl ist verbindlich, da kein Unverbindlichkeitsgrund vorliegt.",
      "Der Befehl ist unverbindlich, da er unzumutbar ist.",
      "Der Befehl muss nicht befolgt werden.",
      "Der Befehl darf nicht befolgt werden.",
      "Der Befehl muss befolgt werden."
    ],
    "correct": [
      0,
      2,
      4,
      5
    ],
    "expl": "Nach Vorlage: rechtswidrig, unverbindlich wegen Menschenwürde, unverbindlich wegen Unzumutbarkeit, muss nicht befolgt werden.",
    "sourceId": "befehl-1",
    "order": 5
  },
  {
    "cat": "Befehlsrecht",
    "mode": "multi",
    "topic": "Bild Befehlsrecht",
    "q": "Welche der nachfolgend aufgeführten Aussagen zum Befehlsrecht trifft/treffen zu?",
    "options": [
      "Ein Befehl, der rechtswidrig und verbindlich ist, braucht nicht befolgt zu werden.",
      "Verstößt ein Befehl gegen Gesetze, darf er nicht ausgeführt werden.",
      "Ein rechtmäßiger Befehl ist auch immer verbindlich.",
      "Unverbindliche Befehle sind rechtswidrig und müssen nicht oder dürfen nicht befolgt werden.",
      "Befehle, die nicht ausgeführt werden müssen, sind rechtswidrig und unverbindlich."
    ],
    "correct": [
      2,
      3,
      4
    ],
    "expl": "Maßgeblich ist die bestmögliche Lösung: Die Aussagen 3, 4 und 5 sind richtig.",
    "sourceId": "befehl-2",
    "order": 6
  },
  {
    "cat": "VorgV",
    "mode": "multi",
    "topic": "Bild OLt Fuchs / Nr. 16",
    "q": "OLt Fuchs ist Zugführer 1. Zug, 2. Kompanie und in Zweitfunktion Jugendoffizier des Bataillons. Fw Peters ist Gruppenführer 1. Gruppe, 1. Zug, 2. Kompanie. Im Kasernenbereich trifft Fw Peters seinen stellvertretenden Gruppenführer Uffz Lietke ohne Kopfbedeckung und befiehlt ihm, die Kopfbedeckung aufzusetzen. Welche Vorgesetztenverhältnisse bestehen zwischen OLt Fuchs und Fw Peters?",
    "options": [
      "§ 4 Abs. 3 VorgV",
      "§ 2 VorgV",
      "§ 4 Abs. 1 S. 1 Nr. 1 VorgV",
      "§ 1 VorgV",
      "§ 6 VorgV",
      "§ 4 Abs. 2 i.V.m. § 4 Abs. 1 S. 1 Nr. 1 VorgV"
    ],
    "correct": [
      0,
      2
    ],
    "expl": "Nach Markierung: § 4 Abs. 3 VorgV und § 4 Abs. 1 S. 1 Nr. 1 VorgV.",
    "sourceId": "vorgv-1",
    "order": 7
  },
  {
    "cat": "VorgV",
    "mode": "multi",
    "topic": "Bild OLt Fuchs / Nr. 17",
    "q": "Die Kompaniechefin Hptm Boll gibt allen Angehörigen der Einheit beim morgendlichen Antreten den Befehl zur Teilnahme am ökumenischen Standortgottesdienst während des Dienstes. Nach welchen Vorschriften ist ein Vorgesetztenverhältnis gegeben?",
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
    "expl": "Nach Markierung: § 1 VorgV, § 4 Abs. 3 VorgV und § 4 Abs. 1 S. 1 Nr. 1 VorgV.",
    "sourceId": "vorgv-2",
    "order": 8
  },
  {
    "cat": "Fallreihe",
    "mode": "multi",
    "topic": "Bild Schober/Heil Dienstvergehen",
    "q": "Lage:\nFw Schober, Zugführer des 2. Zuges, feiert mit Gruppenführern in einer Kneipe. Flieger Heil kommt dazu. Schober hält Heil für unsportlich, bezeichnet ihn vor anwesenden Soldaten als „Niete“ und „Schande für die Bundeswehr“ und äußert, solche Soldaten sollten keinen Zugang zur Bundeswehr haben. Heil trinkt anschließend Alkohol und will mit dem Pkw zur Kaserne fahren. Schober erkennt die Trunkenheit, lässt ihn aber gewähren. In der Kaserne verursacht Heil einen Unfall mit Sachschaden; Verletzte gibt es nicht.\n\nHat Fw Schober ein oder mehrere Dienstvergehen begangen? Kreuzen Sie alle richtigen Aussagen an.",
    "options": [
      "Verstoß gegen § 7 Abs. 1 Hs. SG durch Bezeichnung „Niete“ / Kernpflichtverletzung",
      "Kein Verstoß gegen § 7 Abs. 1 Hs. SG, da keine Kernpflichtverletzung vorliegt",
      "Verstoß gegen § 10 Abs. 1 SG (Vorbildpflicht)",
      "Verstoß gegen § 10 Abs. 2 SG, indem er Heil nicht von der Trunkenheitsfahrt abgehalten hat",
      "Kein Verstoß gegen § 10 Abs. 2 SG, da er nicht im Dienst gewesen ist",
      "Verstoß gegen § 10 Abs. 3 SG durch Ehrverletzung („Niete“)",
      "Verstoß gegen § 10 Abs. 3 SG, weil er Heil nicht von der Trunkenheitsfahrt abgehalten hat",
      "Kein Verstoß gegen § 10 Abs. 3 SG, da Schober außer Dienst nicht vorgesetzt war",
      "Verstoß gegen § 10 Abs. 6 SG durch die Äußerung vor Untergebenen",
      "Kein Verstoß gegen § 10 Abs. 6 SG, da private Feier",
      "Verstoß gegen § 12 S. 2 SG (Kameradschaftspflicht)",
      "Verstoß gegen § 17 Abs. 2 S. 3, 2. Alt. SG",
      "Verstoß gegen § 17 Abs. 2 S. 3, 1. Alt. SG",
      "Er handelte vorsätzlich",
      "Er handelte fahrlässig",
      "Er handelte rechtswidrig",
      "Er handelte nicht schuldhaft",
      "Er hat mehrere Dienstpflichtverletzungen begangen",
      "Er hat mehrere Dienstvergehen nach § 23 Abs. 1 SG begangen",
      "Er hat kein Dienstvergehen begangen"
    ],
    "correct": [
      0,
      3,
      5,
      6,
      8,
      10,
      11,
      13,
      15,
      17
    ],
    "expl": "Nach der markierten Lösung sind zehn Aussagen richtig: u.a. § 7 SG, § 10 Abs. 2, Abs. 3, Abs. 6 SG, § 12 S. 2 SG, § 17 Abs. 2 S. 3 2. Alt. SG sowie Vorsatz, Rechtswidrigkeit und mehrere Dienstpflichtverletzungen. Nicht richtig: mehrere Dienstvergehen.",
    "sourceId": "schober-1",
    "order": 9
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild Flieger Heil Strafbarkeit",
    "q": "Hat sich Flieger Heil durch sein Verhalten strafbar gemacht?",
    "options": [
      "§ 303 Abs. 1 StGB",
      "§ 315b StGB",
      "§ 316 StGB",
      "§ 323a StGB",
      "§ 20 Abs. 1 Nr. 1 WStG",
      "§ 25 Abs. 1 WStG"
    ],
    "correct": 2,
    "expl": "Nach der bestmöglichen Lösung ist nur § 316 StGB zu markieren.",
    "sourceId": "heil-straf-1",
    "order": 10
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild Flieger Heil Ausgangsbeschränkung",
    "q": "Gegen Flieger Heil wird am 25.07. eine siebentägige Ausgangsbeschränkung verhängt. Wann darf diese frühestens vollstreckt werden?",
    "options": [
      "26.07., 13:00 Uhr",
      "27.07., 00:00 Uhr",
      "26.07., 00:00 Uhr",
      "28.07., 13:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nach Vorlage: frühestens 27.07., 00:00 Uhr. Normbezug: § 47 Abs. 1, § 52 Abs. 2 WDO.",
    "sourceId": "heil-wdo-1",
    "order": 11
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild Flieger Heil Beschwerde",
    "q": "Flieger Heil möchte sich gegen die Ausgangsbeschränkung beschweren. Wann ist der frühestmögliche und der späteste Zeitpunkt für den Eingang der Beschwerde?",
    "options": [
      "frühestens 25.07., 06:00 Uhr; spätestens 25.08., 24:00 Uhr",
      "frühestens 26.07., 00:00 Uhr; spätestens 25.08., 24:00 Uhr",
      "frühestens 27.07., 00:00 Uhr; spätestens 27.08., 24:00 Uhr",
      "frühestens 25.07., 06:00 Uhr; spätestens 26.07., 24:00 Uhr"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: Einlegung frühestens 25.07., 06:00 Uhr und spätestens 25.08., 24:00 Uhr (§ 6 Abs. 1 oder 1 WBO laut Vorlage).",
    "sourceId": "heil-wdo-2",
    "order": 12
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild Flieger Heil Rücknahme",
    "q": "Nachdem Flieger Heil fristgerecht Beschwerde eingelegt hat, zieht er sie am 20.08. vor Entscheidung zurück. Bis wann muss die Ausgangsbeschränkung spätestens vollstreckt sein?",
    "options": [
      "24.08., 00:00 Uhr",
      "25.02., 24:00 Uhr",
      "20.08., 24:00 Uhr",
      "25.08., 24:00 Uhr"
    ],
    "correct": 1,
    "expl": "Nach bestmöglicher Lösung: bis 25.02., 24:00 Uhr muss mit der Vollstreckung begonnen werden (§ 57 WDO).",
    "sourceId": "heil-wdo-3",
    "order": 13
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild Flieger Heil Beschwerdeart",
    "q": "Um welche Beschwerdeart handelt es sich bei der Beschwerde des Fliegers Heil, und wer entscheidet?",
    "options": [
      "Truppendienstliche Beschwerde; Truppendienstgericht (§ 2 Nr. 4 WDO)",
      "Disziplinarbeschwerde; Truppendienstgericht (§ 2 Nr. 5 WDO)",
      "Truppendienstliche Beschwerde; nächster Disziplinarvorgesetzter des verhängenden Kompaniechefs/Bataillonskommandeur (§ 9 Abs. 1 WBO)",
      "Disziplinarbeschwerde; nächster Disziplinarvorgesetzter des verhängenden Kompaniechefs/Bataillonskommandeur (§ 2 Nr. 3 WDO)"
    ],
    "correct": 3,
    "expl": "Nach Markierung: Disziplinarbeschwerde, Entscheidung durch den nächsten Disziplinarvorgesetzten des verhängenden Kompaniechefs, also Bataillonskommandeur (§ 2 Nr. 3 WDO).",
    "sourceId": "heil-wdo-4",
    "order": 14
  },
  {
    "cat": "Wehrstrafrecht",
    "mode": "single",
    "topic": "Bild StUffz pöbelt",
    "q": "StUffz S. pöbelt betrunken nach Dienst in einer Kantine eine zivile Bedienung an: „Du Schlampe, Dich lege ich auch noch flach.“ Welche Aussagen sind richtig?",
    "options": [
      "S begeht eine Straftat nach § 31 WStG, weil er die Bedienung entwürdigend behandelt.",
      "S begeht eine Straftat nach § 31 WStG und ein Dienstvergehen nach § 23 Abs. 1 SG, weil er aber gegen § 17 Abs. 2 S. 1 SG verstieß.",
      "S begeht eine Wehrstraftat, aber kein Dienstvergehen.",
      "S begeht eine Wehrstraftat nach § 31 WStG und kein Dienstvergehen nach § 23 Abs. 1 SG, weil er schuldunfähig gemäß § 20 StGB ist.",
      "S begeht eine Wehrstraftat und ein Dienstvergehen."
    ],
    "correct": 2,
    "expl": "Nach grüner Markierung ist „Wehrstraftat, aber kein Dienstvergehen“ anzukreuzen. Die Vorlage ist hier maßgeblich.",
    "sourceId": "straftat-1",
    "order": 15
  },
  {
    "cat": "Wehrstrafrecht",
    "mode": "multi",
    "topic": "Bild Grundsätze",
    "q": "Welche Aussagen hinsichtlich allgemeiner strafrechtlicher und disziplinarrechtlicher Grundsätze sind richtig?",
    "options": [
      "Strafverfahren und Disziplinarverfahren verfolgen unterschiedliche Zwecke.",
      "Der Disziplinarvorgesetzte geht vor, indem er bestraft.",
      "Der Disziplinarvorgesetzte ahndet Dienstpflichtverletzungen.",
      "Das Disziplinarverfahren dient der Erziehung.",
      "Die Freiheitsstrafe verfolgt denselben Zweck wie der Disziplinararrest.",
      "Die fahrlässige Verwirklichung eines Straftatbestandes ist immer strafbar.",
      "Ein Dienstvergehen ist der rechtswidrige und schuldhafte Verstoß gegen soldatische Pflichten und das Strafgesetzbuch.",
      "Der Versuch eines Vergehens ist immer strafbar, auch wenn das Gesetz dies nicht ausdrücklich anordnet."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "expl": "Nach Markierung: unterschiedliche Zwecke, Ahndung von Dienstpflichtverletzungen, Erziehungszweck des Disziplinarverfahrens.",
    "sourceId": "grundsaetze-1",
    "order": 16
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Bild Uffz Meier",
    "q": "Uffz Meier ist bereits einmal grundlos 20 Minuten zu spät zum Dienst erschienen. Am Donnerstag erscheint er gegen Mittag wegen einer Möbellieferung. Die Staffelchefin verhängt eine Disziplinarbuße von 200 €, deren Vollstreckung sie zur Bewährung aussetzt. Welche Aussage ist richtig?",
    "options": [
      "Die einfache Disziplinarmaßnahme kann hier mit einer schriftlichen Ausarbeitung zum Thema „Dienstleistungsgebot“ verbunden werden.",
      "Die Erteilung einer einfachen Disziplinarmaßnahme neben einer erzieherischen Maßnahme darf grundsätzlich niemals erfolgen.",
      "Die Staffelchefin kann zusätzlich noch Wachdienst erteilen.",
      "Die Staffelchefin kann zusätzlich eine schriftliche Ausarbeitung für 2 Stunden nach Dienstende aussprechen."
    ],
    "correct": 0,
    "expl": "Nach bestmöglicher Lösung ist nur die Verbindung mit einer schriftlichen Ausarbeitung richtig.",
    "sourceId": "meier-1",
    "order": 17
  },
  {
    "cat": "Befehlsrecht",
    "mode": "multi",
    "topic": "Bild Erzieherische Maßnahmen",
    "q": "Welche Aussagen zu erzieherischen Maßnahmen sind richtig?",
    "options": [
      "Ein Gruppenführer darf einen unwilligen Soldaten seiner Gruppe zurechtweisen.",
      "Ein Zugführer darf einem besonders motivierten Soldaten vorzeitig Dienstschluss erteilen.",
      "Ein Staffelchef darf nur besondere erzieherische Maßnahmen verhängen und keine anderen.",
      "Ein KpChef darf, wenn er eine Disziplinarmaßnahme für geboten hält, als mildere Maßnahme eine Erzieherische Maßnahme wegen eines Dienstvergehens verhängen.",
      "Eine Erzieherische Maßnahme muss spätestens nach 6 Monaten verhängt worden sein.",
      "Es ist keine zulässige Erzieherische Maßnahme, einen unwilligen Soldaten zur Erziehung Backsteine mit Namen herumtragen zu lassen.",
      "Gegen eine Erzieherische Maßnahme ist eine truppendienstliche Beschwerde statthaft."
    ],
    "correct": [
      0,
      4,
      5,
      6
    ],
    "expl": "Nach bestmöglicher Lösung sind Zurechtweisung, 6-Monats-Grenze, Unzulässigkeit der Backstein-Maßnahme und truppendienstliche Beschwerde richtig.",
    "sourceId": "ezm-1",
    "order": 18
  },
  {
    "cat": "Fall Müller",
    "mode": "multi",
    "topic": "Bild Müller Dienstvergehen",
    "q": "Lage:\nOGefr OA Müller ist Angehöriger der OSLw. Wegen schlechter Vornoten ist er kurz vor der Abschlussprüfung nicht besonders motiviert. Am 17.03. fehlt er zu Dienstbeginn um 07:00 Uhr. Am 20.03. wird er gegen 03:00 Uhr mit seinem Pkw kontrolliert und erklärt, mit One-Way-Ticket nach Sydney ausreisen zu wollen; auf den Soldatenberuf habe er keine Lust mehr. Noch in derselben Nacht wird er von einer Feldjägerstreife übernommen. Den Befehl des Feldjägerstreifenführers OFw Schulze, mitzukommen, befolgt er trotz Wiederholung nicht. Er beschimpft OFw Schulze als „Folterknecht“, widersetzt sich durch einen Griff in den Kragen und tritt gegen dessen Schienbein.\n\nHat OGefr OA Müller durch sein Verhalten ein Dienstvergehen begangen? Kreuzen Sie alle richtigen Aussagen an.",
    "options": [
      "Verstoß gegen § 7 Abs. 1 Hs. SG durch Fernbleiben vom Dienst",
      "Verstoß gegen § 11 Abs. 1 SG (Gehorsamspflicht) durch Nichtbefolgen des Dienstplans",
      "Kein Verstoß gegen § 11 Abs. 1 SG, da der Dienstplan nur Aushang ist",
      "Verstoß gegen § 12 S. 2 SG (Kameradschaft) durch Bezeichnung „Folterknecht“",
      "Verstoß gegen § 7 Abs. 1 Hs. SG durch Bezeichnung „Folterknecht“",
      "Verstoß gegen § 12 S. 2 SG durch Tritt gegen OFw Schulze",
      "Verstoß gegen § 13 Abs. 1 SG durch „Folterknecht“",
      "Verstoß gegen § 17 Abs. 1 SG wegen Achtung der dienstlichen Stellung des Vorgesetzten",
      "Kein § 17 Abs. 1 SG außerhalb umschlossener Anlagen",
      "Verstoß gegen § 17 Abs. 2 S. 3, 2. Alt. SG",
      "OFw Schulze ist als Feldjäger kein Kamerad; § 12 SG scheidet aus",
      "Er handelte rechtswidrig",
      "Er ist nach § 35 StGB entschuldigt",
      "Er hat gegen mehrere soldatische Pflichten verstoßen"
    ],
    "correct": [
      0,
      1,
      3,
      4,
      5,
      7,
      9,
      11,
      13
    ],
    "expl": "Nach Musterlösung sind neun Aussagen richtig. § 13 SG und § 35 StGB sind nicht richtig.",
    "sourceId": "mueller-sg-1",
    "order": 19
  },
  {
    "cat": "Fall Müller",
    "mode": "multi",
    "topic": "Bild Müller Belehrung",
    "q": "Lage:\nOGefr OA Müller ist Angehöriger der OSLw. Wegen schlechter Vornoten ist er kurz vor der Abschlussprüfung nicht besonders motiviert. Am 17.03. fehlt er zu Dienstbeginn um 07:00 Uhr. Am 20.03. wird er gegen 03:00 Uhr mit seinem Pkw kontrolliert und erklärt, mit One-Way-Ticket nach Sydney ausreisen zu wollen; auf den Soldatenberuf habe er keine Lust mehr. Noch in derselben Nacht wird er von einer Feldjägerstreife übernommen. Den Befehl des Feldjägerstreifenführers OFw Schulze, mitzukommen, befolgt er trotz Wiederholung nicht. Er beschimpft OFw Schulze als „Folterknecht“, widersetzt sich durch einen Griff in den Kragen und tritt gegen dessen Schienbein.\n\nMit welchem Inhalt muss OGefr OA Müller vor seiner Vernehmung belehrt werden?",
    "options": [
      "Müller muss aussagen, wenn er weder sich noch nahe Angehörige belastet.",
      "Müller unterliegt im Fall seiner Aussage nicht der Wahrheitspflicht.",
      "Müller muss aussagen, außer er würde sich selbst belasten.",
      "Es steht ihm frei, sich zur Sache zu äußern oder nicht auszusagen.",
      "Er muss in dienstlichen Angelegenheiten die Wahrheit sagen, wenn er aussagt.",
      "Er muss nicht aussagen, wenn er sich oder nahe Angehörige belasten würde; ansonsten besteht Aussagepflicht."
    ],
    "correct": [
      3,
      4
    ],
    "expl": "Nach Markierung: Aussagefreiheit zur Sache und Wahrheitspflicht bei Aussage.",
    "sourceId": "mueller-belehrung-1",
    "order": 20
  },
  {
    "cat": "Fall Müller",
    "mode": "multi",
    "topic": "Bild Müller WStG",
    "q": "Lage:\nOGefr OA Müller ist Angehöriger der OSLw. Wegen schlechter Vornoten ist er kurz vor der Abschlussprüfung nicht besonders motiviert. Am 17.03. fehlt er zu Dienstbeginn um 07:00 Uhr. Am 20.03. wird er gegen 03:00 Uhr mit seinem Pkw kontrolliert und erklärt, mit One-Way-Ticket nach Sydney ausreisen zu wollen; auf den Soldatenberuf habe er keine Lust mehr. Noch in derselben Nacht wird er von einer Feldjägerstreife übernommen. Den Befehl des Feldjägerstreifenführers OFw Schulze, mitzukommen, befolgt er trotz Wiederholung nicht. Er beschimpft OFw Schulze als „Folterknecht“, widersetzt sich durch einen Griff in den Kragen und tritt gegen dessen Schienbein.\n\nHat sich OGefr OA Müller gemäß WStG strafbar gemacht?",
    "options": [
      "§ 15 Abs. 1 WStG",
      "§ 16 Abs. 1 WStG",
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
    "expl": "Nach Markierung: § 16 Abs. 1 WStG, § 20 Abs. 1 Nr. 1 und Nr. 2 WStG sowie § 25 Abs. 1 WStG.",
    "sourceId": "mueller-wstg-1",
    "order": 21
  },
  {
    "cat": "Fall Müller",
    "mode": "single",
    "topic": "Bild Müller Zuständigkeit",
    "q": "Lage:\nOGefr OA Müller ist Angehöriger der OSLw. Wegen schlechter Vornoten ist er kurz vor der Abschlussprüfung nicht besonders motiviert. Am 17.03. fehlt er zu Dienstbeginn um 07:00 Uhr. Am 20.03. wird er gegen 03:00 Uhr mit seinem Pkw kontrolliert und erklärt, mit One-Way-Ticket nach Sydney ausreisen zu wollen; auf den Soldatenberuf habe er keine Lust mehr. Noch in derselben Nacht wird er von einer Feldjägerstreife übernommen. Den Befehl des Feldjägerstreifenführers OFw Schulze, mitzukommen, befolgt er trotz Wiederholung nicht. Er beschimpft OFw Schulze als „Folterknecht“, widersetzt sich durch einen Griff in den Kragen und tritt gegen dessen Schienbein.\n\nAus welcher Vorschrift ergibt sich die Zuständigkeit des Inspektionschefs für die Ausübung der Disziplinarbefugnis gegenüber OGefr OA Müller?",
    "options": [
      "§ 27 Abs. 2 WDO",
      "§ 29 Abs. 1 WDO",
      "§ 29 Abs. 1 oder 1 WDO",
      "§ 32 Abs. 1 WDO"
    ],
    "correct": 1,
    "expl": "Nach bestmöglicher Lösung: § 29 Abs. 1 WDO.",
    "sourceId": "mueller-zustaendigkeit-1",
    "order": 22
  },
  {
    "cat": "Fall Müller",
    "mode": "single",
    "topic": "Bild Müller Rechtsbehelf",
    "q": "Lage:\nOGefr OA Müller ist Angehöriger der OSLw. Wegen schlechter Vornoten ist er kurz vor der Abschlussprüfung nicht besonders motiviert. Am 17.03. fehlt er zu Dienstbeginn um 07:00 Uhr. Am 20.03. wird er gegen 03:00 Uhr mit seinem Pkw kontrolliert und erklärt, mit One-Way-Ticket nach Sydney ausreisen zu wollen; auf den Soldatenberuf habe er keine Lust mehr. Noch in derselben Nacht wird er von einer Feldjägerstreife übernommen. Den Befehl des Feldjägerstreifenführers OFw Schulze, mitzukommen, befolgt er trotz Wiederholung nicht. Er beschimpft OFw Schulze als „Folterknecht“, widersetzt sich durch einen Griff in den Kragen und tritt gegen dessen Schienbein.\n\nDer Inspektionschef verhängt gegen OGefr OA Müller eine 7-tägige Ausgangsbeschränkung. Die Beschwerde wird zurückgewiesen. Welchen Rechtsbehelf kann er nun einlegen und wer ist zuständig?",
    "options": [
      "Weitere Beschwerde beim Truppendienstgericht (§ 42 Nr. 4 WDO)",
      "Weitere Beschwerde beim Lehrgruppenkommandeur (§ 16 Abs. 1 WBO)",
      "Antrag auf Entscheidung beim Truppendienstgericht (§ 17 Abs. 1 WBO)",
      "Weitere Untätigkeitsbeschwerde beim Schulkommandeur (§ 16 Abs. 2 WBO)"
    ],
    "correct": 0,
    "expl": "Nach der Vorlage ist die weitere Beschwerde beim Truppendienstgericht (§ 42 Nr. 4 WDO) richtig.",
    "sourceId": "mueller-rechtsbehelf-1",
    "order": 23
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild Ermittlungen Schober",
    "q": "Sie sind KpChef und haben persönlich ein gutes Verhältnis zu Fw Schober. Sie fragen sich, ob Sie verpflichtet sind, disziplinare Ermittlungen aufzunehmen.",
    "options": [
      "Sie sind verpflichtet, disziplinar zu ermitteln, gemäß § 32 Abs. 1 WDO.",
      "Sie dürfen wegen des guten Verhältnisses von Ermittlungen absehen.",
      "Nur der Rechtsberater entscheidet, ob Ermittlungen aufzunehmen sind.",
      "Ermittlungen sind nur bei Strafverfahren verpflichtend."
    ],
    "correct": 0,
    "expl": "Nach Vorlage: Verpflichtung zur Ermittlung nach § 32 Abs. 1 WDO.",
    "sourceId": "schober-ermittlung-1",
    "order": 24
  },
  {
    "cat": "Fallreihe",
    "mode": "single",
    "topic": "Bild Ermittlungen Schober",
    "q": "Ihre Ermittlungen gegen Fw Schober sind abgeschlossen. Bis wann müssten Sie spätestens eine Disziplinarmaßnahme verhängen?",
    "options": [
      "18.01., 24:00 Uhr",
      "19.01., 24:00 Uhr",
      "18.03., 24:00 Uhr",
      "19.03., 00:00 Uhr"
    ],
    "correct": 0,
    "expl": "Nach bestmöglicher Lösung: 18.01., 24:00 Uhr gemäß § 17 Abs. 2 WDO.",
    "sourceId": "schober-6monate-1",
    "order": 25
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 a",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Wann darf frühestens eine einfache Disziplinarmaßnahme verhängt werden?",
    "options": [
      "01.06., 06:00 Uhr",
      "am Tag des Dienstvergehens",
      "nach Ablauf eines Monats",
      "erst nach Unanfechtbarkeit"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 01.06., 06:00 Uhr.",
    "sourceId": "zeit-1-a",
    "order": 26
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 b",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Wann kann die Maßnahme frühestens vollstreckt werden?",
    "options": [
      "02.06., 13:00 Uhr",
      "sofort nach Verhängung",
      "erst nach einem Monat",
      "erst nach Ablauf der Verjährung"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 02.06., 13:00 Uhr.",
    "sourceId": "zeit-1-b",
    "order": 27
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 c",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Wann kann spätestens eine einfache Disziplinarmaßnahme verhängt werden?",
    "options": [
      "03.11., 24:00 Uhr",
      "04.11., 00:00 Uhr",
      "am Tag des Schlussgehörs",
      "ein Jahr nach Tat"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 03.11., 24:00 Uhr (§ 17 Abs. 2 WDO).",
    "sourceId": "zeit-1-c",
    "order": 28
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 d",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Wann tritt das Verhängungsverbot ein?",
    "options": [
      "04.11., 00:00 Uhr",
      "03.11., 24:00 Uhr",
      "sofort nach Schlussgehör",
      "nach Unanfechtbarkeit"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 04.11., 00:00 Uhr.",
    "sourceId": "zeit-1-d",
    "order": 29
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 e",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Wann kann frühestens Beschwerde eingelegt werden?",
    "options": [
      "02.06., 06:00 Uhr",
      "am Tag der Tat",
      "erst nach Vollstreckung",
      "nach einem Monat"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 02.06., 06:00 Uhr.",
    "sourceId": "zeit-1-e",
    "order": 30
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 f",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Bis wann ist die Beschwerdeeinlegung noch möglich?",
    "options": [
      "01.07., 24:00 Uhr",
      "02.07., 00:00 Uhr",
      "einen Monat nach Schlussgehör",
      "bis zum Verhängungsverbot"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 01.07., 24:00 Uhr.",
    "sourceId": "zeit-1-f",
    "order": 31
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 g",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    "options": [
      "02.07., 00:00 Uhr",
      "01.07., 24:00 Uhr",
      "sofort bei Verhängung",
      "erst nach Vollstreckung"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 02.07., 00:00 Uhr.",
    "sourceId": "zeit-1-g",
    "order": 32
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 h",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Welche Beschwerdeart ist statthaft?",
    "options": [
      "Disziplinarbeschwerde § 42 WDO",
      "Truppendienstliche Beschwerde § 1 WBO",
      "Antrag auf gerichtliche Entscheidung § 17 WBO",
      "Untätigkeitsbeschwerde § 16 WBO"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: Disziplinarbeschwerde § 42 WDO.",
    "sourceId": "zeit-1-h",
    "order": 33
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 i",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Bis wann muss spätestens vollstreckt werden?",
    "options": [
      "01.01., 24:00 Uhr",
      "02.01., 00:00 Uhr",
      "drei Monate nach Tat",
      "sechs Monate nach Schlussgehör"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 01.01., 24:00 Uhr (§ 57 Abs. 1 WDO).",
    "sourceId": "zeit-1-i",
    "order": 34
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 1 j",
    "q": "Lage:\nFall 1: Die Soldatin begeht am 04.05. ein Dienstvergehen. Ermittlungen beginnen am 10.05. und werden am 31.05. mit Schlussgehör abgeschlossen.\n\nFall 1: Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    "options": [
      "02.01., 00:00 Uhr",
      "01.01., 24:00 Uhr",
      "sofort nach Unanfechtbarkeit",
      "nach Ablauf der Beschwerdefrist"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 02.01., 00:00 Uhr.",
    "sourceId": "zeit-1-j",
    "order": 35
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 a",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Wann darf frühestens eine einfache Disziplinarmaßnahme verhängt werden?",
    "options": [
      "18.08., 06:00 Uhr",
      "am Tag des Dienstvergehens",
      "nach Ablauf eines Monats",
      "erst nach Unanfechtbarkeit"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 18.08., 06:00 Uhr.",
    "sourceId": "zeit-2-a",
    "order": 36
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 b",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Wann kann die Maßnahme frühestens vollstreckt werden?",
    "options": [
      "19.08., 13:00 Uhr",
      "sofort nach Verhängung",
      "erst nach einem Monat",
      "erst nach Ablauf der Verjährung"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 19.08., 13:00 Uhr.",
    "sourceId": "zeit-2-b",
    "order": 37
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 c",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Wann kann spätestens eine einfache Disziplinarmaßnahme verhängt werden?",
    "options": [
      "11.02. Folgejahr, 24:00 Uhr",
      "12.02. Folgejahr, 00:00 Uhr",
      "am Tag des Schlussgehörs",
      "ein Jahr nach Tat"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 11.02. Folgejahr, 24:00 Uhr (§ 17 Abs. 2 WDO).",
    "sourceId": "zeit-2-c",
    "order": 38
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 d",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Wann tritt das Verhängungsverbot ein?",
    "options": [
      "12.02. Folgejahr, 00:00 Uhr",
      "11.02. Folgejahr, 24:00 Uhr",
      "sofort nach Schlussgehör",
      "nach Unanfechtbarkeit"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 12.02. Folgejahr, 00:00 Uhr.",
    "sourceId": "zeit-2-d",
    "order": 39
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 e",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Wann kann frühestens Beschwerde eingelegt werden?",
    "options": [
      "19.08., 06:00 Uhr",
      "am Tag der Tat",
      "erst nach Vollstreckung",
      "nach einem Monat"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 19.08., 06:00 Uhr.",
    "sourceId": "zeit-2-e",
    "order": 40
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 f",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Bis wann ist die Beschwerdeeinlegung noch möglich?",
    "options": [
      "18.09., 24:00 Uhr",
      "19.09., 00:00 Uhr",
      "einen Monat nach Schlussgehör",
      "bis zum Verhängungsverbot"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 18.09., 24:00 Uhr.",
    "sourceId": "zeit-2-f",
    "order": 41
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 g",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    "options": [
      "19.09., 00:00 Uhr",
      "18.09., 24:00 Uhr",
      "sofort bei Verhängung",
      "erst nach Vollstreckung"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 19.09., 00:00 Uhr.",
    "sourceId": "zeit-2-g",
    "order": 42
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 h",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Welche Beschwerdeart ist statthaft?",
    "options": [
      "Disziplinarbeschwerde § 42 WDO",
      "Truppendienstliche Beschwerde § 1 WBO",
      "Antrag auf gerichtliche Entscheidung § 17 WBO",
      "Untätigkeitsbeschwerde § 16 WBO"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: Disziplinarbeschwerde § 42 WDO.",
    "sourceId": "zeit-2-h",
    "order": 43
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 i",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Bis wann muss spätestens vollstreckt werden?",
    "options": [
      "18.03. Folgejahr, 24:00 Uhr",
      "19.03. Folgejahr, 00:00 Uhr",
      "drei Monate nach Tat",
      "sechs Monate nach Schlussgehör"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 18.03. Folgejahr, 24:00 Uhr (§ 57 Abs. 1 WDO).",
    "sourceId": "zeit-2-i",
    "order": 44
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 2 j",
    "q": "Lage:\nFall 2: Der Soldat begeht am 12.08. ein Dienstvergehen. Ermittlungen werden sofort aufgenommen und am 17.08. mit Schlussgehör abgeschlossen.\n\nFall 2: Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    "options": [
      "19.03. Folgejahr, 00:00 Uhr",
      "18.03. Folgejahr, 24:00 Uhr",
      "sofort nach Unanfechtbarkeit",
      "nach Ablauf der Beschwerdefrist"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 19.03. Folgejahr, 00:00 Uhr.",
    "sourceId": "zeit-2-j",
    "order": 45
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 a",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Wann darf frühestens eine einfache Disziplinarmaßnahme verhängt werden?",
    "options": [
      "30.11., 06:00 Uhr",
      "am Tag des Dienstvergehens",
      "nach Ablauf eines Monats",
      "erst nach Unanfechtbarkeit"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 30.11., 06:00 Uhr.",
    "sourceId": "zeit-3-a",
    "order": 46
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 b",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Wann kann die Maßnahme frühestens vollstreckt werden?",
    "options": [
      "01.12., 13:00 Uhr",
      "sofort nach Verhängung",
      "erst nach einem Monat",
      "erst nach Ablauf der Verjährung"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 01.12., 13:00 Uhr.",
    "sourceId": "zeit-3-b",
    "order": 47
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 c",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Wann kann spätestens eine einfache Disziplinarmaßnahme verhängt werden?",
    "options": [
      "01.05. Folgejahr, 24:00 Uhr",
      "02.05. Folgejahr, 00:00 Uhr",
      "am Tag des Schlussgehörs",
      "ein Jahr nach Tat"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 01.05. Folgejahr, 24:00 Uhr (§ 17 Abs. 2 WDO).",
    "sourceId": "zeit-3-c",
    "order": 48
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 d",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Wann tritt das Verhängungsverbot ein?",
    "options": [
      "02.05. Folgejahr, 00:00 Uhr",
      "01.05. Folgejahr, 24:00 Uhr",
      "sofort nach Schlussgehör",
      "nach Unanfechtbarkeit"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 02.05. Folgejahr, 00:00 Uhr.",
    "sourceId": "zeit-3-d",
    "order": 49
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 e",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Wann kann frühestens Beschwerde eingelegt werden?",
    "options": [
      "01.12., 06:00 Uhr",
      "am Tag der Tat",
      "erst nach Vollstreckung",
      "nach einem Monat"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 01.12., 06:00 Uhr.",
    "sourceId": "zeit-3-e",
    "order": 50
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 f",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Bis wann ist die Beschwerdeeinlegung noch möglich?",
    "options": [
      "30.12., 24:00 Uhr",
      "31.12., 00:00 Uhr",
      "einen Monat nach Schlussgehör",
      "bis zum Verhängungsverbot"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 30.12., 24:00 Uhr.",
    "sourceId": "zeit-3-f",
    "order": 51
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 g",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    "options": [
      "31.12., 00:00 Uhr",
      "30.12., 24:00 Uhr",
      "sofort bei Verhängung",
      "erst nach Vollstreckung"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 31.12., 00:00 Uhr.",
    "sourceId": "zeit-3-g",
    "order": 52
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 h",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Welche Beschwerdeart ist statthaft?",
    "options": [
      "Disziplinarbeschwerde § 42 WDO",
      "Truppendienstliche Beschwerde § 1 WBO",
      "Antrag auf gerichtliche Entscheidung § 17 WBO",
      "Untätigkeitsbeschwerde § 16 WBO"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: Disziplinarbeschwerde § 42 WDO.",
    "sourceId": "zeit-3-h",
    "order": 53
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 i",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Bis wann muss spätestens vollstreckt werden?",
    "options": [
      "30.06. Folgejahr, 24:00 Uhr",
      "01.07. Folgejahr, 00:00 Uhr",
      "drei Monate nach Tat",
      "sechs Monate nach Schlussgehör"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 30.06. Folgejahr, 24:00 Uhr (§ 57 Abs. 1 WDO).",
    "sourceId": "zeit-3-i",
    "order": 54
  },
  {
    "cat": "Zeitablauf",
    "mode": "single",
    "topic": "Fall 3 j",
    "q": "Lage:\nFall 3: Der Soldat begeht am 02.11. ein Dienstvergehen. Ermittlungen werden aufgenommen und am 29.11. mit Schlussgehör abgeschlossen.\n\nFall 3: Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    "options": [
      "01.07. Folgejahr, 00:00 Uhr",
      "30.06. Folgejahr, 24:00 Uhr",
      "sofort nach Unanfechtbarkeit",
      "nach Ablauf der Beschwerdefrist"
    ],
    "correct": 0,
    "expl": "Nach Vorlage: 01.07. Folgejahr, 00:00 Uhr.",
    "sourceId": "zeit-3-j",
    "order": 55
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Sofortmaßnahmen",
    "q": "Welche Aussagen zu Sofortmaßnahmen im einfachen Disziplinarverfahren treffen zu?",
    "options": [
      "Sofortmaßnahmen dienen der schnellen Sicherung der militärischen Ordnung und der Sachverhaltsaufklärung.",
      "Sie ersetzen die spätere disziplinare Ermittlung vollständig.",
      "Sie müssen verhältnismäßig sein und dürfen nicht als vorweggenommene Disziplinarmaßnahme eingesetzt werden.",
      "Sie können insbesondere sinnvoll sein, wenn Beweise gesichert oder weitere Störungen verhindert werden müssen.",
      "Sie dürfen ohne dienstlichen Anlass beliebig angeordnet werden."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "expl": "Die Eingrenzung betont Sofortmaßnahmen als prüfungsrelevanten Punkt. Wichtig ist: sichern, ordnen, aufklären – aber nicht bestrafen und immer verhältnismäßig bleiben.",
    "sourceId": "eingrenzung-sofort-1",
    "order": 56
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "single",
    "topic": "§ 33 Abs. 3 WDO",
    "q": "Was ist der Kern von § 33 Abs. 3 WDO im einfachen Disziplinarverfahren?",
    "options": [
      "Der Disziplinarvorgesetzte muss jede Pflichtverletzung sofort an die Staatsanwaltschaft abgeben.",
      "Bei Verdacht einer Straftat ist zu prüfen, ob wegen Art der Tat, Schwere des Unrechts oder Schwere der Schuld die Abgabe an die Strafverfolgungsbehörde geboten ist.",
      "§ 33 Abs. 3 WDO betrifft nur die Beteiligung der Vertrauensperson.",
      "§ 33 Abs. 3 WDO regelt ausschließlich die Nachtfrist."
    ],
    "correct": 1,
    "expl": "Nach der Eingrenzung soll § 33 Abs. 3 WDO besonders angeschaut werden. Entscheidend ist die Prüfung, ob die Sache an die Strafverfolgungsbehörde abzugeben ist.",
    "sourceId": "eingrenzung-33-1",
    "order": 57
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "single",
    "topic": "§ 22 Abs. 2 WDO",
    "q": "Was regelt § 22 Abs. 2 WDO im Kern?",
    "options": [
      "Die Pflicht zur Beschleunigung von Disziplinarsachen.",
      "Die zulässigen Kombinationen einfacher Disziplinarmaßnahmen.",
      "Die Beschuldigtenvernehmung.",
      "Die sofortige Vollstreckbarkeit des Disziplinararrests."
    ],
    "correct": 1,
    "expl": "§ 22 Abs. 2 WDO ist nach der Eingrenzung ausdrücklich wichtig. Die Norm betrifft, welche Disziplinarmaßnahmen miteinander kombiniert werden dürfen und welche Kombinationen unzulässig sind.",
    "sourceId": "eingrenzung-22-1",
    "order": 58
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Zulässigkeit / Begründetheit",
    "q": "Welche Aussagen zur Prüfung einer Beschwerde sind richtig?",
    "options": [
      "Zunächst ist zu prüfen, ob die Beschwerde zulässig ist.",
      "Eine zulässige Beschwerde ist automatisch begründet.",
      "Eine Beschwerde kann zulässig, aber unbegründet sein.",
      "Ist die Beschwerde unzulässig, kommt es grundsätzlich nicht mehr auf die Begründetheit an.",
      "Die Begründetheit wird immer vor der Zulässigkeit geprüft."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "expl": "Die Eingrenzung nennt ausdrücklich Zulässigkeit und Begründetheit. Beides ist sauber zu trennen: Zulässigkeit zuerst, danach Begründetheit.",
    "sourceId": "eingrenzung-beschwerde-1",
    "order": 59
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "single",
    "topic": "Beschwerdeentscheidung",
    "q": "Eine Beschwerde ist zulässig, aber unbegründet. Wie ist sie zu behandeln?",
    "options": [
      "Sie ist als unzulässig zu verwerfen.",
      "Ihr ist abzuhelfen.",
      "Sie ist als unbegründet zurückzuweisen.",
      "Sie wird automatisch zur weiteren Beschwerde."
    ],
    "correct": 2,
    "expl": "Zulässig bedeutet nur, dass die Beschwerde inhaltlich geprüft wird. Ist sie in der Sache nicht berechtigt, wird sie als unbegründet zurückgewiesen.",
    "sourceId": "eingrenzung-beschwerde-2",
    "order": 60
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Delegation § 32 Abs. 2 WDO",
    "q": "Welche Aussagen zur Delegation der Sachverhaltsaufklärung nach § 32 Abs. 2 WDO sind richtig?",
    "options": [
      "Der Disziplinarvorgesetzte kann die Aufklärung des Sachverhalts einem Offizier übertragen.",
      "Mit der Übertragung wird auch die disziplinare Ahndung vollständig übertragen.",
      "Beschuldigtenvernehmung kann einem Offizier übertragen werden.",
      "VP-Gespräch und Schlussgehör muss der Disziplinarvorgesetzte grundsätzlich selbst durchführen, sofern kein Ausnahmefall vorliegt.",
      "Ein Unteroffizier kann immer ohne Einschränkung mit allen Vernehmungen beauftragt werden."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "expl": "§ 32 Abs. 2 WDO erlaubt die Beauftragung mit der Sachverhaltsaufklärung. Die Ahndungsentscheidung verbleibt beim Disziplinarvorgesetzten; Schlussgehör und VP-Gespräch sind grundsätzlich nicht beliebig delegierbar.",
    "sourceId": "eingrenzung-delegation-1",
    "order": 61
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "single",
    "topic": "Beschleunigungsgrundsatz",
    "q": "Welche Aussage beschreibt den Beschleunigungsgrundsatz richtig?",
    "options": [
      "Disziplinarsachen dürfen bis zum Abschluss anderer dienstlicher Vorhaben zurückgestellt werden.",
      "Disziplinarsachen sind beschleunigt zu behandeln.",
      "Die Beschleunigung gilt nur bei Disziplinararrest.",
      "Der Beschleunigungsgrundsatz gilt nur im gerichtlichen Disziplinarverfahren."
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 1 WDO: Disziplinarsachen sind beschleunigt zu behandeln. Das war in der Eingrenzung ausdrücklich relevant.",
    "sourceId": "eingrenzung-beschleunigung-1",
    "order": 62
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Vertrauensperson",
    "q": "Welche Aussagen zur Beteiligung der Vertrauensperson im einfachen Disziplinarverfahren sind richtig?",
    "options": [
      "Die VP ist zu beteiligen, wenn der beschuldigte Soldat dies nicht ausdrücklich ablehnt.",
      "Die Beteiligung erfolgt nach Abschluss der Ermittlungen und vor dem Schlussgehör.",
      "Die VP wird zur Person des Soldaten, zum Sachverhalt und zum Disziplinarmaß gehört.",
      "Die VP wird erst nach Verhängung der Disziplinarmaßnahme beteiligt.",
      "Ändert sich die beabsichtigte Maßnahme wesentlich, kann eine erneute Beteiligung erforderlich sein."
    ],
    "correct": [
      0,
      1,
      2,
      4
    ],
    "expl": "Nach § 4 WDO i.V.m. § 28 SBG ist die Beteiligung der VP vor dem Schlussgehör wichtig. Bei wesentlichen Änderungen muss sie erneut geprüft werden.",
    "sourceId": "eingrenzung-vp-1",
    "order": 63
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "single",
    "topic": "Schlussgehör",
    "q": "Welche Aussage zum Schlussgehör ist richtig?",
    "options": [
      "Das Schlussgehör ersetzt die Beschuldigtenvernehmung.",
      "Das Schlussgehör ist vor der Verhängung der Disziplinarmaßnahme zu gewähren.",
      "Das Schlussgehör findet erst nach Rechtskraft der Maßnahme statt.",
      "Nach dem Schlussgehör darf sofort ohne Nachtfrist verhängt werden."
    ],
    "correct": 1,
    "expl": "§ 32 Abs. 5 WDO: Der beschuldigte Soldat erhält vor der Entscheidung abschließend Gelegenheit zur Äußerung. Danach ist die Nachtfrist des § 37 Abs. 1 WDO zu beachten.",
    "sourceId": "eingrenzung-schluss-1",
    "order": 64
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Akteneinsicht",
    "q": "Welche Aussagen zur Akteneinsicht des beschuldigten Soldaten sind richtig?",
    "options": [
      "Der beschuldigte Soldat hat grundsätzlich ein Akteneinsichtsrecht.",
      "Akteneinsicht kann vorübergehend verwehrt werden, wenn der Ermittlungszweck gefährdet wäre.",
      "Spätestens zum Schlussgehör besteht umfassende Akteneinsicht.",
      "Akteneinsicht ist im einfachen Disziplinarverfahren immer ausgeschlossen.",
      "Akteneinsicht darf nur einem Rechtsanwalt gewährt werden."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Nach § 3 Abs. 1 WDO besteht grundsätzlich Akteneinsicht. Bei Gefährdung des Ermittlungszwecks kann sie vorübergehend beschränkt werden; spätestens zum Schlussgehör ist sie umfassend zu gewähren.",
    "sourceId": "eingrenzung-akteneinsicht-1",
    "order": 65
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Aussage- und Auskunftsverweigerung",
    "q": "Welche Aussagen zu Aussage- und Auskunftsverweigerungsrechten sind richtig?",
    "options": [
      "Ein Zeuge kann ein Zeugnisverweigerungsrecht haben, wenn ein entsprechender Angehörigenbezug vorliegt.",
      "Ein Zeuge kann die Auskunft verweigern, wenn er sich durch die Aussage selbst der Gefahr straf-, ordnungswidrigkeits- oder disziplinarrechtlicher Verfolgung aussetzen würde.",
      "Ein Zeuge darf immer ohne Grund schweigen.",
      "Ein Beschuldigter muss sich selbst belasten.",
      "Der Beschuldigte ist über seine Rechte zu belehren."
    ],
    "correct": [
      0,
      1,
      4
    ],
    "expl": "Wichtig ist die Trennung: Zeugnisverweigerung etwa bei Angehörigen; Auskunftsverweigerung bei Selbstbelastungsgefahr. Beschuldigte müssen belehrt werden und müssen sich nicht selbst belasten.",
    "sourceId": "eingrenzung-aussage-1",
    "order": 66
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Beweismittel",
    "q": "Welche Beweismittel können im einfachen Disziplinarverfahren zur Sachverhaltsaufklärung herangezogen werden?",
    "options": [
      "Zeugen",
      "Augenschein",
      "Sachverständige",
      "Urkunden und Schriftstücke",
      "Aussagen des Beschuldigten",
      "Nur Geständnisse des Beschuldigten"
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4
    ],
    "expl": "Nach der Major-Lage und den WDO-Grundsätzen stehen Zeugen, Augenschein, Sachverständige, Urkunden/Schriftstücke und Aussagen des Beschuldigten als Beweismittel in Betracht.",
    "sourceId": "eingrenzung-beweis-1",
    "order": 67
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "single",
    "topic": "Durchsuchung / Beschlagnahme",
    "q": "Wer ordnet eine Durchsuchung und Beschlagnahme nach § 20 Abs. 1 WDO grundsätzlich an?",
    "options": [
      "Der nächsthöhere Disziplinarvorgesetzte ohne weitere Voraussetzungen.",
      "Der Richter des zuständigen, notfalls nächst erreichbaren Truppendienstgerichts.",
      "Die Vertrauensperson.",
      "Der beschuldigte Soldat selbst."
    ],
    "correct": 1,
    "expl": "Nach § 20 Abs. 1 WDO bedarf die Durchsuchung/Beschlagnahme grundsätzlich richterlicher Anordnung. Bei Gefahr im Verzug gibt es eine Ausnahme.",
    "sourceId": "eingrenzung-durchsuchung-1",
    "order": 68
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "single",
    "topic": "Gefahr im Verzug",
    "q": "Was gilt bei Gefahr im Verzug im Zusammenhang mit Durchsuchung und Beschlagnahme?",
    "options": [
      "Der Disziplinarvorgesetzte darf ausnahmsweise ohne richterliche Anordnung handeln, muss die richterliche Genehmigung aber unverzüglich beantragen.",
      "Durchsuchung und Beschlagnahme sind dann vollständig verboten.",
      "Die Vertrauensperson entscheidet alleine.",
      "Eine Genehmigung ist niemals nachzuholen."
    ],
    "correct": 0,
    "expl": "§ 20 Abs. 2 WDO: Bei Gefahr im Verzug kann der Disziplinarvorgesetzte ausnahmsweise handeln; die richterliche Genehmigung ist unverzüglich zu beantragen.",
    "sourceId": "eingrenzung-gefahr-1",
    "order": 69
  },
  {
    "cat": "Eingrenzung 2025",
    "mode": "multi",
    "topic": "Wehrstraftaten und SG",
    "q": "Welche Aussagen zur Verbindung von Wehrstraftaten und soldatischen Pflichten sind prüfungsrelevant?",
    "options": [
      "Wehrstraftaten im Dienst können zugleich Pflichtverletzungen nach dem SG sein.",
      "Bei Straftaten im Dienst ist insbesondere an § 7 SG als Kernpflicht zu denken.",
      "Eine Wehrstraftat schließt ein Dienstvergehen stets aus.",
      "Strafverfahren und Disziplinarverfahren verfolgen unterschiedliche Zwecke.",
      "Mehrere Beteiligte müssen getrennt geprüft werden."
    ],
    "correct": [
      0,
      1,
      3,
      4
    ],
    "expl": "Die Eingrenzung betont: soldatische Pflichten und Wehrstraftaten sicher beherrschen, Beteiligte auseinanderhalten und SG/WStG zusammen prüfen.",
    "sourceId": "eingrenzung-wstg-sg-1",
    "order": 70
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 1 – Ermittlungspflicht",
    "q": "Ausgangslage:\nMajor F ist Inspektionschef der 10. Inspektion der OSLw. Als er mit Oberst C, dem Lehrgruppenkommandeur III./OSLw, den Lichthof betritt, beobachten beide, wie OG (OA) A seiner Kameradin OG (OA) U plötzlich absichtlich schmerzhaft auf den Fuß tritt. Beide Offizieranwärter sind Angehörige der 10. Inspektion.\n\nMüssen Major F und Oberst C disziplinar tätig werden oder können sie über das Geschehen hinwegsehen?",
    "options": [
      "Sie können wegen geringer Bedeutung darüber hinwegsehen.",
      "Ja, es besteht eine Ermittlungspflicht nach § 32 Abs. 1 S. 1 WDO.",
      "Nur Oberst C muss tätig werden.",
      "Nur wenn OG (OA) U Beschwerde einlegt."
    ],
    "correct": 1,
    "expl": "§ 32 Abs. 1 S. 1 WDO: Bei Verdacht eines Dienstvergehens besteht Ermittlungspflicht (Legalitätsprinzip).",
    "sourceId": "major-1",
    "order": 71
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 2 – Zuständigkeit",
    "q": "Ausgangslage:\nMajor F ist Inspektionschef der 10. Inspektion der OSLw. Als er mit Oberst C, dem Lehrgruppenkommandeur III./OSLw, den Lichthof betritt, beobachten beide, wie OG (OA) A seiner Kameradin OG (OA) U plötzlich absichtlich schmerzhaft auf den Fuß tritt. Beide Offizieranwärter sind Angehörige der 10. Inspektion.\n\nWer ist für die disziplinare Bearbeitung zuständig?",
    "options": [
      "Oberst C, weil er ranghöher ist.",
      "Major F als nächster Disziplinarvorgesetzter nach § 29 Abs. 1 S. 1, 2 i.V.m. § 28 Abs. 1 S. 2 Nr. 1 WDO.",
      "Die Vertrauensperson.",
      "Die Staatsanwaltschaft ist immer zuerst zuständig."
    ],
    "correct": 1,
    "expl": "Zuständig ist der nächste Disziplinarvorgesetzte. Hier ist das Major F als Inspektionschef.",
    "sourceId": "major-2",
    "order": 72
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 3 – Vertrauensperson als Beschuldigter",
    "q": "Ändert sich die Zuständigkeit, wenn OG (OA) A die Vertrauensperson ist? Welche Aussagen treffen zu?",
    "options": [
      "Die Zuständigkeit ändert sich kraft Gesetzes.",
      "Zuständig wird der nächsthöhere Disziplinarvorgesetzte.",
      "Major F muss nach § 30 Abs. 3 WDO Meldung an Oberst C machen.",
      "Major F bleibt immer zuständig.",
      "Die VP entscheidet selbst über das Verfahren."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Ist der beschuldigte Soldat VP, ändert sich die Zuständigkeit; Major F muss an Oberst C melden.",
    "sourceId": "major-3",
    "order": 73
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 4 – Befangenheit",
    "q": "Was gilt, wenn die geschädigte Soldatin die Tochter des Major F wäre?",
    "options": [
      "Die Zuständigkeit ändert sich automatisch kraft Gesetzes.",
      "Major F kann sich wegen Befangenheit für befangen erklären.",
      "Der beschuldigte Soldat hat einen Anspruch auf Ablehnung des Major F wegen Befangenheit.",
      "Erklärt sich Major F für befangen, muss er Meldung an Oberst C machen.",
      "Durch die Meldung wird Oberst C für den Fall zuständig."
    ],
    "correct": [
      1,
      3,
      4
    ],
    "expl": "Die Zuständigkeit ändert sich nicht automatisch. Major F kann sich aber für befangen erklären und muss dann Meldung an Oberst C machen.",
    "sourceId": "major-4",
    "order": 74
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 5 – Delegation",
    "q": "Major F ist zeitlich stark eingebunden. Kann er die Angelegenheit einschließlich der Ahndung an Hauptmann S übertragen?",
    "options": [
      "Er kann die Sachverhaltsaufklärung einem Offizier übertragen (§ 32 Abs. 2 S. 1 WDO).",
      "Er kann auch die disziplinare Ahndung vollständig übertragen.",
      "Gespräch mit der VP und Schlussgehör muss Major F grundsätzlich selbst durchführen.",
      "Ausnahmen kommen bei Verhinderung aus dringenden dienstlichen Gründen, unverhältnismäßigem Aufwand oder erheblicher Verzögerung in Betracht.",
      "Die Ahndungsentscheidung trifft die beauftragte Person."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "expl": "Übertragbar ist die Sachverhaltsaufklärung, nicht die gesamte Ahndung. VP-Gespräch und Schlussgehör bleiben grundsätzlich beim Disziplinarvorgesetzten.",
    "sourceId": "major-5",
    "order": 75
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 6 – Beschleunigung",
    "q": "Darf Major F mit den Ermittlungen bis nach dem Übergabeappell in zwei Wochen warten?",
    "options": [
      "Ja, dienstliche Belastung rechtfertigt immer ein Abwarten.",
      "Nein, § 17 Abs. 1 WDO gebietet eine beschleunigte Behandlung von Disziplinarsachen.",
      "Ja, solange noch keine Beschwerde vorliegt.",
      "Nur die Staatsanwaltschaft entscheidet über den Beginn."
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 1 WDO: Disziplinarsachen sind beschleunigt zu behandeln.",
    "sourceId": "major-6",
    "order": 76
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 7 – Inspektionsfeldwebel",
    "q": "Welche Aussagen zur Einbeziehung des Inspektionsfeldwebels treffen im Major-Fall zu?",
    "options": [
      "Nach § 32 Abs. 2 S. 2 WDO kann er unter engen Voraussetzungen in die Sachverhaltsaufklärung einbezogen werden.",
      "Er kann Zeugen vernehmen, soweit es sich um Mannschaften oder Unteroffiziere ohne Portepee und einen Fall von geringer Bedeutung handelt.",
      "Er kann die Beschuldigtenvernehmung durchführen.",
      "Ob ein Fall geringer Bedeutung vorliegt, hängt u.a. von Art, Auswirkungen, Dienstgrad und Dienststellung ab.",
      "Bei einer möglichen Körperverletzung ist besonders sorgfältig zu prüfen, ob noch geringe Bedeutung angenommen werden kann."
    ],
    "correct": [
      0,
      1,
      3,
      4
    ],
    "expl": "Der Inspektionsfeldwebel kann nicht ohne Einschränkungen eingesetzt werden und nicht die Beschuldigtenvernehmung durchführen.",
    "sourceId": "major-7",
    "order": 77
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 8 – § 33 Abs. 3 WDO",
    "q": "Welche Bedeutung hat § 33 Abs. 3 WDO im Major-Fall bei der zunächst bekannten Körperverletzung?",
    "options": [
      "Der Fall muss immer sofort an die Staatsanwaltschaft abgegeben werden.",
      "Es ist zu prüfen, ob die Abgabe wegen Art der Tat, Schwere des Unrechts oder Schwere der Schuld geboten ist; im Skript wird dies bei einfacher Körperverletzung hier verneint.",
      "§ 33 Abs. 3 WDO betrifft nur Akteneinsicht.",
      "§ 33 Abs. 3 WDO ist nur im gerichtlichen Disziplinarverfahren relevant."
    ],
    "correct": 1,
    "expl": "Das Skript betont: Trotz § 223 StGB ist die Abgabe nicht automatisch geboten; maßgeblich sind Art der Tat, Schwere des Unrechts und Schwere der Schuld.",
    "sourceId": "major-8",
    "order": 78
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 9 – Sicherung der Flagge",
    "q": "OG (OA) U berichtet, A habe eine Hakenkreuzflagge im Privatfach versteckt. Wie kann Hauptmann S die Flagge sichern?",
    "options": [
      "Die Flagge ist ein Augenscheinsobjekt und kann Beweismittel sein.",
      "Es kommt eine Durchsuchung nach § 20 Abs. 1 WDO in Betracht.",
      "Wird die Flagge gefunden, kann sie beschlagnahmt werden.",
      "Die Flagge darf ohne jede Rechtsgrundlage einfach mitgenommen werden.",
      "Durchsuchung und Beschlagnahme sind im einfachen Disziplinarverfahren nie möglich."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Die Flagge ist ein Augenscheinsobjekt. Zur Sicherung kommen Durchsuchung und Beschlagnahme nach § 20 WDO in Betracht.",
    "sourceId": "major-9",
    "order": 79
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 10 – Richtervorbehalt",
    "q": "Kann Major F alleine über Durchsuchung und Beschlagnahme entscheiden?",
    "options": [
      "Ja, immer.",
      "Nein, grundsätzlich nur auf Anordnung des Richters des zuständigen, notfalls nächst erreichbaren Truppendienstgerichts (§ 20 Abs. 1 WDO).",
      "Ja, wenn die VP zustimmt.",
      "Nein, Durchsuchung ist immer verboten."
    ],
    "correct": 1,
    "expl": "§ 20 Abs. 1 WDO enthält den Richtervorbehalt.",
    "sourceId": "major-10",
    "order": 80
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 11 – Gefahr im Verzug",
    "q": "Ändert sich etwas, wenn OG (OA) A zufällig von den Ermittlungen erfahren hat?",
    "options": [
      "Nein, dann darf niemals durchsucht werden.",
      "Ja, bei Gefahr im Verzug darf der Disziplinarvorgesetzte ausnahmsweise ohne richterliche Anordnung handeln, muss aber unverzüglich richterliche Genehmigung beantragen.",
      "Ja, dann entscheidet die VP.",
      "Ja, aber die Genehmigung muss nie nachgeholt werden."
    ],
    "correct": 1,
    "expl": "Gefahr im Verzug liegt nahe, wenn andernfalls Beweismittel verloren gehen könnten, weil A von den Ermittlungen weiß. § 20 Abs. 2 WDO beachten.",
    "sourceId": "major-11",
    "order": 81
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 12 – Beweismittel",
    "q": "Welche Beweismittel stehen Major F im Major-Fall konkret und allgemein zur Verfügung?",
    "options": [
      "Zeugen, z.B. OG (OA) U, OG (OA) E, Major F und Oberst C",
      "Augenschein, insbesondere die beschlagnahmte Hakenkreuzflagge",
      "Sachverständige",
      "Urkunden und andere Schriftstücke",
      "Aussagen des Beschuldigten nach § 32 Abs. 4, 5 WDO",
      "Nur die Aussage des Beschuldigten"
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4
    ],
    "expl": "Das Skript nennt Zeugen, Augenschein, Sachverständige, Urkunden/Schriftstücke und Aussagen des Beschuldigten.",
    "sourceId": "major-12",
    "order": 82
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 13 – OG (OA) E als Zeuge",
    "q": "OG (OA) E will zunächst nichts sagen, weil er es sich mit A nicht verderben will. Welche Aussagen treffen nach dem Skript zu?",
    "options": [
      "Ein Zeugnisverweigerungsrecht nach § 52 StPO setzt grundsätzlich ein Angehörigenverhältnis voraus.",
      "Ein bloßes Kameradschaftsverhältnis begründet kein Zeugnisverweigerungsrecht.",
      "Ein Auskunftsverweigerungsrecht nach § 55 StPO kommt bei Selbstbelastungsgefahr in Betracht.",
      "Wegen möglicher eigener Meldepflichtverletzung kann E hier ein Auskunftsverweigerungsrecht zustehen.",
      "E ist in jedem Fall vollständig zur Aussage verpflichtet."
    ],
    "correct": [
      0,
      1,
      2,
      3
    ],
    "expl": "E ist nicht Angehöriger, daher kein Zeugnisverweigerungsrecht; wegen möglicher Selbstbelastung durch unterlassene Meldung kann aber ein Auskunftsverweigerungsrecht bestehen.",
    "sourceId": "major-13",
    "order": 83
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 14 – Beschuldigtenvernehmung",
    "q": "A wird durch Zeugen und Flagge belastet. Muss der beschuldigte Soldat trotzdem vernommen werden?",
    "options": [
      "Nein, Beweise reichen aus.",
      "Ja, nach § 32 Abs. 4 WDO ist der beschuldigte Soldat zu vernehmen; außerdem ist Schlussgehör nach § 32 Abs. 5 WDO zu gewähren.",
      "Nur wenn er selbst darum bittet.",
      "Nur nach Entscheidung der VP."
    ],
    "correct": 1,
    "expl": "Beschuldigtenvernehmung und Schlussgehör sind Verfahrensschritte, die auch bei starker Beweislage erforderlich sind.",
    "sourceId": "major-14",
    "order": 84
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 15 – Akteneinsicht",
    "q": "A verlangt Akteneinsicht und Ablichtungen. Welche Aussagen treffen zu?",
    "options": [
      "A hat als beschuldigter Soldat grundsätzlich ein Akteneinsichtsrecht (§ 3 Abs. 1 S. 1 WDO).",
      "Bei Gefährdung des Ermittlungszwecks kann Akteneinsicht vorübergehend verwehrt werden.",
      "Spätestens zum Schlussgehör hat A umfassendes Akteneinsichtsrecht.",
      "Akteneinsicht ist wegen Gewaltbereitschaft immer dauerhaft ausgeschlossen.",
      "Nur sein Rechtsanwalt darf die Akte sehen."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Das Akteneinsichtsrecht besteht grundsätzlich, kann aber bei Gefährdung des Ermittlungszwecks vorübergehend beschränkt werden.",
    "sourceId": "major-15",
    "order": 85
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 16 – Rechtsanwalt",
    "q": "Muss Major F den Rechtsanwalt des A als bevollmächtigten Vertreter am einfachen Disziplinarverfahren beteiligen?",
    "options": [
      "Ja, der Rechtsanwalt muss zwingend beteiligt werden.",
      "Nein, die WDO sieht im einfachen Disziplinarverfahren keine Beteiligung des Rechtsanwalts als bevollmächtigten Vertreter vor.",
      "Nur wenn die VP zustimmt.",
      "Nur nach Anordnung der Staatsanwaltschaft."
    ],
    "correct": 1,
    "expl": "Nach dem Skript hat der Soldat im einfachen Disziplinarverfahren keinen Anspruch darauf, sich durch den Rechtsanwalt vertreten zu lassen.",
    "sourceId": "major-16",
    "order": 86
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 17 – Beteiligung der VP",
    "q": "A gesteht. Major F will nun das Schlussgehör durchführen und hält die VP-Beteiligung nicht für erforderlich. Welche Aussagen treffen zu?",
    "options": [
      "Wenn A dies nicht ausdrücklich ablehnt, ist die VP zwingend zu beteiligen.",
      "Die Beteiligung erfolgt nach Abschluss der Ermittlungen und vor dem Schlussgehör.",
      "Die VP wird zur Person des Soldaten, zum Sachverhalt und zum Disziplinarmaß gehört.",
      "Ein Geständnis macht die Beteiligung der VP entbehrlich.",
      "Die VP wird erst nach Verhängung beteiligt."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "§ 4 WDO i.V.m. § 28 Abs. 1 SBG: VP-Beteiligung nach Ermittlungsabschluss und vor Schlussgehör, sofern nicht ausdrücklich abgelehnt.",
    "sourceId": "major-17",
    "order": 87
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 18 – Pflichtverletzungen A",
    "q": "Welche Pflichtverletzungen des OG (OA) A nennt das Skript?",
    "options": [
      "Durch die Hakenkreuzflagge: Verstoß gegen § 8 SG.",
      "Durch die Flagge: keine Strafbarkeit nach § 86a StGB, weil sie nicht öffentlich wahrnehmbar war.",
      "Durch die Flagge: kein § 7 SG als Kernpflichtverletzung in Form einer Straftat im Dienst.",
      "Durch die Drohung und den Tritt: § 223 StGB und § 240 Abs. 1, 3 StGB kommen in Betracht.",
      "Durch Drohung und Tritt: Verletzung von § 7 SG, § 12 S. 2 SG und § 17 Abs. 2 S. 1, 2. Alt. SG.",
      "Durch die Zentralrichtlinie automatisch § 11 SG für alle Soldaten der Bundeswehr."
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4
    ],
    "expl": "Das Skript differenziert: Flagge nicht öffentlich → kein § 86a StGB, aber § 8 SG und § 17 Abs. 2 S. 1 2. Alt. SG. Drohung/Tritt → Straftaten und weitere SG-Pflichten.",
    "sourceId": "major-18",
    "order": 88
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 19 – Erneute VP-Anhörung",
    "q": "Major F hat die VP zu einer Disziplinarbuße von 2000 Euro angehört. Welche Aussagen zur erneuten Anhörung sind richtig?",
    "options": [
      "Bei Reduzierung auf 1500 Euro Disziplinarbuße ist keine erneute VP-Anhörung erforderlich.",
      "Bei Umstellung auf 7 Tage Disziplinararrest ist eine erneute VP-Anhörung erforderlich.",
      "Jede geringfügige Abmilderung erfordert zwingend eine erneute Anhörung.",
      "Die Änderung der Art der Disziplinarmaßnahme ist eine wesentliche Änderung.",
      "Die VP muss nie erneut angehört werden."
    ],
    "correct": [
      0,
      1,
      3
    ],
    "expl": "Abmilderung innerhalb derselben Maßnahme ist keine wesentliche Änderung. Wechsel auf Disziplinararrest ist eine wesentliche Verschärfung und erfordert erneute Anhörung.",
    "sourceId": "major-19",
    "order": 89
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 20 – Disziplinarbefugnis",
    "q": "Major F hält 21 Tage Disziplinararrest für erforderlich. Kann er diese Maßnahme selbst verhängen?",
    "options": [
      "Ja, als Inspektionschef immer.",
      "Nein, seine Disziplinarbefugnis reicht nicht aus; zuständig ist der nächsthöhere Disziplinarvorgesetzte.",
      "Ja, wenn A geständig ist.",
      "Ja, wenn die VP zustimmt."
    ],
    "correct": 1,
    "expl": "Als Inspektionschef mit Disziplinarbefugnis Stufe 1 kann Major F gegen Mannschaften nur bis zu sieben Tage Arrest verhängen.",
    "sourceId": "major-20",
    "order": 90
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 21 – Meldung an Oberst C",
    "q": "Was muss Major F tun, damit Oberst C den Fall übernehmen kann?",
    "options": [
      "Nichts; Oberst C wird automatisch zuständig.",
      "Major F muss melden, dass er seine Disziplinarbefugnis nicht für ausreichend hält (§ 30 Abs. 3, Abs. 2 Nr. 1 WDO).",
      "Die VP muss Oberst C beauftragen.",
      "A muss Beschwerde einlegen."
    ],
    "correct": 1,
    "expl": "Durch die Meldung wird der nächsthöhere Disziplinarvorgesetzte zuständig.",
    "sourceId": "major-21",
    "order": 91
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "Major-Fall 22 – Nächsthöherer DVG und VP",
    "q": "Oberst C übernimmt. Was muss er hinsichtlich der VP beachten?",
    "options": [
      "Er muss die VP erneut anhören, wenn das beabsichtigte Disziplinarmaß nach Art verändert oder erhöht wird.",
      "Die vorherige Anhörung durch Major F genügt immer.",
      "Eine Änderung von Disziplinarbuße zu Disziplinararrest ist wesentlich.",
      "Die VP muss nach der Verhängung angehört werden.",
      "Die erneute VP-Anhörung ist im Skript erforderlich."
    ],
    "correct": [
      0,
      2,
      4
    ],
    "expl": "Bei wesentlicher Änderung des beabsichtigten Disziplinarmaßes ist die VP erneut zu beteiligen.",
    "sourceId": "major-22",
    "order": 92
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 23 – Nachtfrist",
    "q": "Oberst C hat VP angehört und Schlussgehör durchgeführt. Darf er noch am selben Tag 21 Tage Disziplinararrest verhängen?",
    "options": [
      "Ja, wenn die VP zugestimmt hat.",
      "Nein, nach § 37 Abs. 1 WDO darf erst nach Ablauf einer Nacht nach dem Schlussgehör verhängt werden.",
      "Ja, wenn A gestanden hat.",
      "Ja, wenn § 33 Abs. 3 WDO geprüft wurde."
    ],
    "correct": 1,
    "expl": "Nach dem Schlussgehör ist die Nachtfrist zu beachten.",
    "sourceId": "major-23",
    "order": 93
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 24 – Richterliche Zustimmung Arrest",
    "q": "Was muss Oberst C vor Verhängung des Disziplinararrests zwingend beachten?",
    "options": [
      "Er muss die richterliche Zustimmung des zuständigen, notfalls nächst erreichbaren Truppendienstgerichts einholen (§ 40 Abs. 1 WDO).",
      "Er benötigt nur die Zustimmung der VP.",
      "Er muss immer zuerst die Staatsanwaltschaft fragen.",
      "Er braucht keine weitere Zustimmung."
    ],
    "correct": 0,
    "expl": "Disziplinararrest darf erst nach richterlicher Zustimmung verhängt werden.",
    "sourceId": "major-24",
    "order": 94
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 25 – Kombination Disziplinararrest / Disziplinarbuße",
    "q": "Kann Oberst C zusätzlich zum Disziplinararrest noch 500 Euro Disziplinarbuße verhängen?",
    "options": [
      "Ja, jede Kombination ist zulässig.",
      "Nein, diese Kombination ist nicht in § 22 Abs. 2 S. 1 WDO vorgesehen und daher nach § 22 Abs. 2 S. 2 WDO unzulässig.",
      "Ja, wenn der Soldat geständig ist.",
      "Ja, wenn die VP zustimmt."
    ],
    "correct": 1,
    "expl": "§ 22 Abs. 2 WDO regelt die zulässigen Kombinationen. Andere Kombinationen sind nicht zulässig.",
    "sourceId": "major-25",
    "order": 95
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 26 – Früheste Vollstreckung",
    "q": "Der Disziplinararrest soll am 10.07. verhängt werden. Wann kann frühestens mit der Vollstreckung begonnen werden?",
    "options": [
      "10.07., sofort",
      "11.07. nach der Mittagspause, 13:00 Uhr",
      "12.07., 00:00 Uhr",
      "Erst nach Ablauf von sechs Monaten"
    ],
    "correct": 1,
    "expl": "Nach Skript: 11.07. nach der Mittagspause (13:00 Uhr), § 47 Abs. 1 WDO.",
    "sourceId": "major-26",
    "order": 96
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "Major-Fall 27 – Sofortige Vollstreckbarkeit",
    "q": "Gibt es beim Disziplinararrest eine Möglichkeit, das Verfahren zu beschleunigen?",
    "options": [
      "Nein, niemals.",
      "Ja, der Richter kann zugleich die sofortige Vollstreckbarkeit anordnen, wenn dies zur Aufrechterhaltung der militärischen Ordnung geboten ist (§ 40 Abs. 1 S. 4 WDO).",
      "Ja, die VP kann die sofortige Vollstreckbarkeit anordnen.",
      "Ja, der Beschuldigte kann dies beantragen und damit erzwingen."
    ],
    "correct": 1,
    "expl": "§ 40 Abs. 1 S. 4 WDO ermöglicht die sofortige Vollstreckbarkeit bei Disziplinararrest unter den dort genannten Voraussetzungen.",
    "sourceId": "major-27",
    "order": 97
  }
];;

const CAT_STYLES = {
  Zeitablauf:      { bg:"#1F3864", light:"#E8EDF5", accent:"#2E5F8A", icon:Shield,   label:"Zeitablauf Disziplinarverfahren (3 Fälle)" },
  Verfassungsrecht:{ bg:"#1A3A5C", light:"#E6EEF5", accent:"#1A6B9A", icon:Shield,   label:"Verfassungsrecht" },
  Wehrstrafrecht:  { bg:"#2C3E50", light:"#EAF0F5", accent:"#2E4053", icon:Scale,    label:"Wehrstrafrecht" },
  Fallreihe:       { bg:"#7A4419", light:"#FBF1E6", accent:"#B5651D", icon:BookOpen, label:"Fallreihe Fw Schober / Flieger Heil" },
  "Fall Müller":   { bg:"#1E5631", light:"#E9F5EC", accent:"#2D7A45", icon:BookOpen, label:"Fall OGefr Müller" },
  VorgV:           { bg:"#4B2E83", light:"#F1ECFA", accent:"#6A4BBC", icon:Scale,    label:"Vorgesetztenverordnung" },
  Befehlsrecht:    { bg:"#5C2E2E", light:"#FAEEEE", accent:"#A94A4A", icon:Shield,   label:"Befehlsrecht / EZM" },
  "Eingrenzung 2025": { bg:"#6B4F1D", light:"#FFF4D8", accent:"#B8841F", icon:Award, label:"Eingrenzung Prüfung 2025" },
  "Major-Fall": { bg:"#2E2A5C", light:"#EEEEFA", accent:"#5550A8", icon:CheckSquare, label:"Major-Fall" },
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
  const [errorKeys, setErrorKeys] = useState(null);
  const [errorCounts, setErrorCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("uebungErrors") || "{}"); } catch { return {}; }
  });
  const qKey = (q) => q.q.slice(0, 80);
  const errCount = Object.keys(errorCounts).length;
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const filteredQ = useMemo(
    () => errorKeys ? QUESTIONS.filter(q => errorKeys.includes(qKey(q)))
                    : QUESTIONS.filter(q => activeCats.includes(q.cat)),
    [activeCats, errorKeys]
  );

  function startQuiz(flag) {
    const errorsOnly = flag === true;
    const keys = errorsOnly ? Object.keys(errorCounts).filter(k => errorCounts[k] > 0) : null;
    const pool = keys ? QUESTIONS.filter(q => keys.includes(qKey(q)))
                      : QUESTIONS.filter(q => activeCats.includes(q.cat));
    if (pool.length === 0) return;
    setErrorKeys(keys);
    // Originalreihenfolge beibehalten: exakt wie in den sortierten Unterlagen.
    const ord = pool.map((_, i) => i);
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
    const key = qKey(q);
    setErrorCounts(prev => {
      const nextC = { ...prev };
      if (isCorrect) {
        if (nextC[key]) { nextC[key] -= 1; if (nextC[key] <= 0) delete nextC[key]; }
      } else {
        nextC[key] = (nextC[key] || 0) + 1;
      }
      try { localStorage.setItem("uebungErrors", JSON.stringify(nextC)); } catch (e) {}
      return nextC;
    });
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
          {errCount > 0 && !errorKeys && (
            <button onClick={() => startQuiz(true)} style={{ width:"100%", marginTop:10, padding:"13px", borderRadius:11, border:"2px solid #B03A3A", background:"rgba(176,58,58,0.15)", color:"#F5B7B1", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <RotateCcw size={15} /> Fehler wiederholen ({errCount} {errCount === 1 ? "Frage" : "Fragen"})
            </button>
          )}
          {errCount > 0 && !errorKeys && (
            <button onClick={() => { if (window.confirm("Fehlerliste wirklich löschen?")) { setErrorCounts({}); try { localStorage.removeItem("uebungErrors"); } catch (e) {} } }} style={{ width:"100%", marginTop:8, padding:"10px", borderRadius:10, border:"1px solid rgba(255,255,255,0.2)", background:"transparent", color:"#8FA3BC", fontSize:12.5, fontWeight:600, cursor:"pointer" }}>
              Fehlerliste zurücksetzen
            </button>
          )}
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
          <button onClick={() => { setErrorKeys(null); setStage("start"); }} style={{ width:"100%", padding:"13px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
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
