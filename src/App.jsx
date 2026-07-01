import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award, Landmark, Gavel } from "lucide-react";
import "./style.css";

// ─────────────────────────────────────────────────────────────────────────
// FRAGENPOOL – Offizierslehrgang Recht
// Grundlage: Kompaktunterlagen SG/WBO + WDO sowie bisherige Unterrichtsauswertung
// ─────────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  // ══════════════ SG ══════════════
  { cat:"SG", topic:"Dienstvergehen", q:"Was ist beim Prüfungsschema eines Dienstvergehens nach § 23 Abs. 1 SG zuerst zu prüfen?", options:["Welche Disziplinarmaßnahme angemessen ist","Welche konkrete soldatische Pflicht betroffen ist","Ob eine Beschwerde zulässig wäre","Ob ein Strafverfahren eröffnet wurde"], correct:1, expl:"Zuerst ist immer die konkrete Pflicht mit Norm zu benennen. Danach Pflichtverletzung, Verschulden und Ergebnis Dienstvergehen." },
  { cat:"SG", topic:"§ 7 SG", q:"Welche drei Kernpflichten gehören zur Pflicht zum treuen Dienen nach § 7 SG?", options:["Wahrheit, Verschwiegenheit, Gehorsam","Dienstleistung, Loyalität, Vermögenswahrung","Kameradschaft, Fürsorge, Beschwerde","Befehl, Gehorsam, Vollstreckung"], correct:1, expl:"§ 7 SG umfasst Dienstleistungspflicht, Loyalitätspflicht und Vermögenswahrungspflicht." },
  { cat:"SG", topic:"§ 7 SG", q:"Ein Soldat erscheint alkoholisiert zum Dienst. Welche Aussage trifft zu?", options:["Keine Pflichtverletzung, weil er anwesend ist","Mögliche Schlechtleistung nach § 7 SG","Nur politische Treuepflicht betroffen","Nur WBO-Beschwerderecht betroffen"], correct:1, expl:"Anwesenheit allein genügt nicht. Wer den Dienst nicht ordnungsgemäß leisten kann, verletzt die Dienstleistungspflicht durch Schlechtleistung." },
  { cat:"SG", topic:"§ 7 SG", q:"Ein Geschäftszimmersoldat verkauft privat Adressen von Kameraden, die er nur dienstlich erhalten hat. Welche Aussage passt?", options:["Rein privat, daher kein Dienstbezug","Dienstbezug wegen Zugriff durch Dienststellung möglich","Nur § 15 SG betroffen","Kein Dienstvergehen, wenn Urlaubstag"], correct:1, expl:"Auch eine private Handlung kann Dienstbezug haben, wenn die Gelegenheit durch die Dienststellung entstanden ist." },
  { cat:"SG", topic:"§ 8 SG", q:"Was ist bei § 8 SG besonders prüfungsrelevant?", options:["Die bloße innere Gesinnung genügt","Entscheidend ist die äußere Manifestation","Politische Betätigung ist immer verboten","§ 8 SG gilt nur im Auslandseinsatz"], correct:1, expl:"Nicht Gedanken, sondern nach außen erkennbares Verhalten ist entscheidend." },
  { cat:"SG", topic:"§ 8 SG", q:"Bloße Anwesenheit bei einer politischen Veranstaltung ist nach dem Unterricht...", options:["immer ein Verstoß gegen § 8 SG","automatisch Fahnenflucht","nicht automatisch ein Verstoß; äußere Unterstützung prüfen","nur bei Mannschaften erlaubt"], correct:2, expl:"Es ist zu prüfen, ob eine Unterstützung der FDGO-feindlichen Bestrebung nach außen sichtbar wird." },
  { cat:"SG", topic:"§ 10 SG", q:"Welche Kurzformel beschreibt die Dienstaufsichtspflicht nach § 10 Abs. 2 SG?", options:["Schweigen – Dulden – Wegsehen","Wahrnehmen – Bewerten – Reagieren","Beantragen – Melden – Beschweren","Verhängen – Vollstrecken – Löschen"], correct:1, expl:"Die Dienstaufsicht verlangt Wahrnehmen, Bewerten und angemessenes Reagieren." },
  { cat:"SG", topic:"§ 10 SG", q:"Ein Vorgesetzter sieht eine Pflichtverletzung und unternimmt nichts. Welche Pflicht kann er verletzen?", options:["§ 10 Abs. 2 SG Dienstaufsichtspflicht","§ 15 SG politische Betätigung","§ 13 SG Wahrheitspflicht","§ 1 WBO"], correct:0, expl:"Wegsehen kann selbst eine Pflichtverletzung des Vorgesetzten sein." },
  { cat:"SG", topic:"§ 10 SG", q:"Welche Pflicht regelt § 10 Abs. 3 SG?", options:["Vorbildfunktion","Dienstaufsicht","Fürsorgepflicht","Politische Zurückhaltung"], correct:2, expl:"§ 10 Abs. 3 SG betrifft die Fürsorgepflicht gegenüber Untergebenen." },
  { cat:"SG", topic:"§ 12 SG", q:"Welche Schutzgüter sind bei § 12 SG konkret zu benennen?", options:["Geld, Urlaub, Dienstgrad","Würde, Ehre, Rechte","Form, Frist, Beschwer","Befehl, Gehorsam, Zweck"], correct:1, expl:"Bei § 12 SG reicht nicht 'Kameradschaft verletzt'. Das verletzte Schutzgut ist zu benennen." },
  { cat:"SG", topic:"§ 12 SG", q:"Begründet § 12 SG eine Pflicht zu privaten Gefälligkeiten wie privater Mitnahme im Auto?", options:["Ja, immer","Nein, grundsätzlich nicht","Nur für Offiziere","Nur im Ausland"], correct:1, expl:"§ 12 SG schützt Würde, Ehre und Rechte, begründet aber keine allgemeine Pflicht zu privaten Gefälligkeiten." },
  { cat:"SG", topic:"§ 13 SG", q:"Wann gilt die Wahrheitspflicht nach § 13 SG?", options:["Nur vor Gericht","In dienstlichen Angelegenheiten","Nur gegenüber Feldjägern","Immer auch privat"], correct:1, expl:"§ 13 SG gilt bei dienstlichen Angelegenheiten, z.B. Vernehmung, Meldung oder Antrag." },
  { cat:"SG", topic:"§ 13 SG", q:"Ein beschuldigter Soldat darf schweigen, entscheidet sich aber auszusagen. Was gilt dann?", options:["Er darf lügen","Er muss wahrheitsgemäß aussagen","Die Aussage ist immer unverwertbar","§ 13 SG gilt nie"], correct:1, expl:"Aussageverweigerungsrecht oder Wahrheitspflicht: Wer aussagt, muss wahrheitsgemäß aussagen." },
  { cat:"SG", topic:"§ 15 SG", q:"Welche Aussage zur politischen Betätigung von Soldaten trifft zu?", options:["Grundsätzlich verboten","Grundsätzlich erlaubt, aber Grenzen im Dienst/in Uniform","Nur Offizieren erlaubt","Nur im Dienst erlaubt"], correct:1, expl:"Soldaten sind Staatsbürger in Uniform. Politische Betätigung ist grundsätzlich erlaubt, aber im Dienst, in Uniform oder unter Ausnutzung der Dienststellung problematisch." },
  { cat:"SG", topic:"§ 17 SG", q:"Worauf stellt die Wohlverhaltenspflicht nach § 17 SG besonders ab?", options:["Achtung und Vertrauen","Urlaubsdauer","Beschwerdeinstanz","Richtervorbehalt"], correct:0, expl:"Maßstab ist die Beeinträchtigung von Achtung und Vertrauen, die der Dienst erfordert." },
  { cat:"SG", topic:"§ 17 SG", q:"Eine einfache private Geschwindigkeitsüberschreitung am Wochenende ist...", options:["immer ein Dienstvergehen","im Regelfall nicht automatisch ein Dienstvergehen; Einzelfall prüfen","immer § 8 SG","immer Fahnenflucht"], correct:1, expl:"Nicht jedes außerdienstliche Fehlverhalten ist automatisch dienstrechtlich relevant." },
  { cat:"SG", topic:"Einheit DV", q:"Mehrere Pflichtverletzungen aus einem Sachverhalt werden disziplinarrechtlich behandelt als...", options:["mehrere getrennte Dienstvergehen","ein einheitliches Dienstvergehen","eine Beschwerde","ein Strafbefehl"], correct:1, expl:"Nach dem Grundsatz der Einheit des Dienstvergehens werden mehrere Pflichtverletzungen einheitlich geahndet." },

  // ══════════════ VorgV / Befehlsrecht ══════════════
  { cat:"VorgV", topic:"Grundregel", q:"Was ist vor der Befehlsprüfung regelmäßig zuerst zu klären?", options:["Ob eine Nachtfrist lief","Ob ein Vorgesetztenverhältnis nach VorgV besteht","Ob eine Beschwerde eingelegt wurde","Ob ein Strafantrag vorliegt"], correct:1, expl:"Ohne Vorgesetztenverhältnis kein militärischer Befehl und keine Gehorsamspflicht." },
  { cat:"VorgV", topic:"Vorrangreihenfolge", q:"Welche Vorrangreihenfolge gilt bei konkurrierenden Vorgesetztenverhältnissen nach der VorgV?", options:["§ 1, § 2, § 3, § 4, § 5, § 6","§ 5, § 3, § 1, § 2, § 4; § 6 als Sonderfall","§ 4, § 2, § 1, § 3, § 5, § 6","§ 6, § 5, § 4, § 3, § 2, § 1"], correct:1, expl:"Für die Prüfung konkurrierender Vorgesetztenverhältnisse gilt die Vorrangreihenfolge § 5 → § 3 → § 1 → § 2 → § 4. § 6 ist ein Sonderfall, weil er voraussetzt, dass kein anderes Vorgesetztenverhältnis greift." },
  { cat:"VorgV", topic:"§ 1 VorgV", q:"§ 1 VorgV betrifft vor allem...", options:["Fachvorgesetzte","Einheitsvorgesetzte","Beschwerdebescheide","Notwehr"], correct:1, expl:"§ 1 VorgV regelt den unmittelbaren Vorgesetzten bzw. Einheitsvorgesetzten." },
  { cat:"VorgV", topic:"§ 2 VorgV", q:"Ein Fachvorgesetzter darf Befehle erteilen...", options:["immer und überall","nur innerhalb seines Fachbereichs","nur an Offiziere","nur schriftlich"], correct:1, expl:"Die Befehlsbefugnis des Fachvorgesetzten ist fachlich begrenzt." },
  { cat:"VorgV", topic:"§ 2 VorgV", q:"Ein Soldat ist ausdrücklich als Fachvorgesetzter für die Schießausbildung eingesetzt und ordnet Stubenreinigung an. Was ist das Problem?", options:["Er überschreitet seinen Fachbereich","Er hat die Nachtfrist vergessen","Er hätte die WBO anwenden müssen","Kein Problem – Fachvorgesetzte dürfen alles befehlen"], correct:0, expl:"Ein Schießausbilder ist nicht automatisch Fachvorgesetzter. Wenn aber eine Fachvorgesetztenstellung nach § 2 VorgV tatsächlich besteht, ist die Befehlsbefugnis auf den Fachbereich begrenzt. Stubendienst gehört nicht zur Schießausbildung." },
  { cat:"VorgV", topic:"§ 4 VorgV", q:"Welche Aussage zum höheren Dienstgrad ist richtig?", options:["Höherer Dienstgrad genügt immer","Dienstgrad allein genügt nicht; Voraussetzungen der VorgV prüfen","Dienstgrad ist völlig bedeutungslos","Nur Generale sind Vorgesetzte"], correct:1, expl:"Der höhere Dienstgrad ist nur innerhalb der Voraussetzungen des § 4 VorgV relevant." },
  { cat:"Befehlsrecht", topic:"Befehlsbegriff", q:"Welche Merkmale gehören zum militärischen Befehl?", options:["Schriftform und Dienstsiegel","Anordnung, Vorgesetzter, Untergebener, Gehorsamsanspruch, dienstlicher Zweck","Beschwerde und Frist","Nur mündliche Ansage"], correct:1, expl:"Nicht jede Äußerung ist ein Befehl. Erforderlich sind u.a. Anordnung und Anspruch auf Gehorsam." },
  { cat:"Befehlsrecht", topic:"Rechtmäßigkeit", q:"Rechtmäßigkeit eines Befehls betrifft vor allem die Perspektive...", options:["des Befehlsgebers","des Beschwerdeführers","der Vertrauensperson","des Truppenarztes"], correct:0, expl:"Rechtmäßigkeit ist aus Sicht des Befehlsgebers zu prüfen." },
  { cat:"Befehlsrecht", topic:"Verbindlichkeit", q:"Verbindlichkeit eines Befehls betrifft vor allem die Perspektive...", options:["des Befehlsempfängers","des Richters","des Wehrbeauftragten","der VP"], correct:0, expl:"Verbindlichkeit beantwortet die Frage, ob der Empfänger gehorchen muss." },
  { cat:"Befehlsrecht", topic:"Merksatz", q:"Welche Aussage ist zentraler Merksatz des Befehlsrechts?", options:["Rechtswidrigkeit = Unverbindlichkeit","Rechtmäßigkeit und Verbindlichkeit sind getrennt zu prüfen","Jeder Befehl ist verbindlich","Nur schriftliche Befehle zählen"], correct:1, expl:"Nicht jeder rechtswidrige Befehl ist unverbindlich." },
  { cat:"Befehlsrecht", topic:"Unverbindlichkeit", q:"Welcher Befehl darf nicht befolgt werden?", options:["Jeder unbeliebte Befehl","Ein Straftatbefehl","Jeder lange Befehl","Jeder mündliche Befehl"], correct:1, expl:"Ein Befehl, dessen Befolgung eine Straftat wäre, ist unverbindlich und darf nicht befolgt werden." },
  { cat:"Befehlsrecht", topic:"Unverbindlichkeit", q:"Welche Unverbindlichkeitsgründe sind typisch?", options:["Straftat, Menschenwürdeverletzung, schwerer HVR-Verstoß","Urlaub, Alter, Dienstgrad","Formfehler, Schreibfehler, Uhrzeit","Beschwerde, Antrag, Petition"], correct:0, expl:"Diese Gründe wurden im Befehlsrecht besonders hervorgehoben." },
  { cat:"Befehlsrecht", topic:"Präventivbefehl", q:"Präventivbefehle dienen vor allem...", options:["der Gefahrenabwehr vor Schadenseintritt","der Bestrafung nach einem Urteil","der Beschwerdeentscheidung","der Urlaubsplanung"], correct:0, expl:"Präventivbefehle sollen verhindern, dass eine konkrete Gefahr sich verwirklicht." },

  // ══════════════ Strafrecht / WStG ══════════════
  { cat:"Strafrecht", topic:"Deliktsaufbau", q:"Welche Reihenfolge gehört zum strafrechtlichen Deliktsaufbau?", options:["Schuld – Tatbestand – Rechtswidrigkeit","Tatbestand – Rechtswidrigkeit – Schuld","Beschwerde – Frist – Beschwer","VP – Schlussgehör – Nachtfrist"], correct:1, expl:"Die Grundreihenfolge lautet Tatbestand, Rechtswidrigkeit, Schuld." },
  { cat:"Strafrecht", topic:"Notwehr", q:"Notwehr wird im Unterricht in welche zwei Blöcke aufgeteilt?", options:["Notwehrlage und Notwehrhandlung","Form und Frist","Verdacht und Zuständigkeit","Befehl und Beschwerde"], correct:0, expl:"Zuerst Notwehrlage, dann Notwehrhandlung prüfen." },
  { cat:"Strafrecht", topic:"Notwehr", q:"Was gehört zur Notwehrlage?", options:["Gegenwärtiger rechtswidriger Angriff","Beschwerdefrist","Dienstgradgruppe","Nachtfrist"], correct:0, expl:"Notwehrlage setzt einen gegenwärtigen rechtswidrigen Angriff voraus." },
  { cat:"Strafrecht", topic:"Notstand", q:"Was unterscheidet Notstand von Notwehr?", options:["Notstand betrifft Gefahrensituationen, Notwehr Angriffe durch Menschen","Notstand gilt nur Soldaten","Notwehr braucht immer schriftliche Form","Kein Unterschied"], correct:0, expl:"Notwehr richtet sich gegen einen menschlichen Angriff, Notstand betrifft eine Gefahrensituation." },
  { cat:"Strafrecht", topic:"WStG §15", q:"Eigenmächtige Abwesenheit bedeutet im Kern...", options:["unerlaubtes Fernbleiben ohne Fahnenfluchtabsicht","politische Betätigung","Vernehmung eines Zeugen","Einlegung einer Beschwerde"], correct:0, expl:"Eigenmächtige Abwesenheit betrifft unerlaubtes Fernbleiben bzw. Entfernen vom Dienst." },
  { cat:"Strafrecht", topic:"WStG §16", q:"Was ist das zentrale Merkmal der Fahnenflucht?", options:["Entziehungsabsicht","Dienstgrad","Beschwerdefrist","Uniformtrageverbot"], correct:0, expl:"Nicht allein die Dauer, sondern die Entziehungsabsicht ist entscheidend." },
  { cat:"Strafrecht", topic:"WStG §19", q:"Was ist vor der Prüfung von Ungehorsam besonders wichtig?", options:["War der Befehl verbindlich?","War die VP anwesend?","Gab es eine Gruppenbeschwerde?","Wurde Urlaub beantragt?"], correct:0, expl:"Ungehorsam setzt einen verbindlichen Befehl voraus." },
  { cat:"Strafrecht", topic:"WStG", q:"Ein unverbindlicher Befehl wird nicht befolgt. Welche Aussage trifft zu?", options:["Automatisch Ungehorsam","Kein Ungehorsam nach § 19 WStG wegen fehlender Verbindlichkeit","Immer Fahnenflucht","Immer § 8 SG"], correct:1, expl:"Bei unverbindlichem Befehl fehlt eine zentrale Voraussetzung des Ungehorsams." },
  { cat:"Strafrecht", topic:"WStG", q:"Tätlicher Angriff setzt regelmäßig voraus...", options:["körperliche Einwirkung","bloße Beleidigung","Beschwerdebescheid","Nachtfrist"], correct:0, expl:"Verbale Auseinandersetzung allein genügt nicht." },

  // ══════════════ WDO ══════════════
  { cat:"WDO", topic:"Grundsätze", q:"Was besagt das Legalitätsprinzip im Disziplinarrecht?", options:["Ermittlungen stehen völlig im Ermessen","Bei Anfangsverdacht muss ermittelt werden","Nur das TDG ermittelt","Ermittlungen nur bei Straftaten"], correct:1, expl:"Das Ob der disziplinaren Ermittlung ist keine Ermessensentscheidung." },
  { cat:"WDO", topic:"Grundsätze", q:"Was beschreibt das Opportunitätsprinzip?", options:["Ermittlungspflicht","Ermessen beim Ob und Wie der Ahndung","Richtervorbehalt","Beschwerdefrist"], correct:1, expl:"Während ermittelt werden muss, steht die Ahndung im Ermessen des Disziplinarvorgesetzten." },
  { cat:"WDO", topic:"Ablauf", q:"Welche Reihenfolge im einfachen Disziplinarverfahren ist richtig?", options:["Maßnahme – Ermittlungen – VP – Schlussgehör","Verdacht – Zuständigkeit – Ermittlungen – VP – Schlussgehör – Nachtfrist – Verhängung – Vollstreckung","Beschwerde – Vollstreckung – Ermittlungen","Schlussgehör – Verdacht – Zuständigkeit"], correct:1, expl:"Diese Reihenfolge ist Pflichtlernstoff." },
  { cat:"WDO", topic:"Zuständigkeit", q:"Wer ist nach § 29 WDO grundsätzlich zuständig?", options:["Der ranghöchste Soldat","Der nächste Disziplinarvorgesetzte","Der KpFw","Die VP"], correct:1, expl:"§ 29 WDO: zuständig ist grundsätzlich der nächste Disziplinarvorgesetzte." },
  { cat:"WDO", topic:"KUK", q:"Wofür steht die KUK-Regel?", options:["Kommando, Urlaub, Kontrolle","Krankheit, Urlaub, Kommandierung","Kaserne, Unterkunft, Kompanie","Keine Untersuchung, keine Kontrolle"], correct:1, expl:"KUK = Krankheit, Urlaub, Kommandierung. Dienstreise ist kein Vertretungsfall." },
  { cat:"WDO", topic:"§ 30 WDO", q:"Die Vertrauensperson ist selbst Täter. Was passiert mit der Zuständigkeit?", options:["Keine Auswirkung","Automatischer Zuständigkeitswechsel von Amts wegen","Verfahren wird eingestellt","Nur WBO anwendbar"], correct:1, expl:"Nach § 30 Abs. 1 WDO wechselt die Zuständigkeit von Amts wegen." },
  { cat:"WDO", topic:"Delegation", q:"Was darf im Disziplinarverfahren delegiert werden?", options:["Ahndungsentscheidung","Sachverhaltsaufklärung unter Voraussetzungen","Verhängung","Beschwerdeentscheidung"], correct:1, expl:"Delegierbar ist die Sachverhaltsaufklärung, nicht die Ahndungsentscheidung." },
  { cat:"WDO", topic:"Ermittlungen", q:"Was muss nach § 32 Abs. 3 WDO ermittelt werden?", options:["Nur belastende Umstände","Nur entlastende Umstände","Belastende und entlastende Umstände","Nur das Vorbringen der VP"], correct:2, expl:"Die Sachverhaltsaufklärung muss umfassend und objektiv erfolgen." },
  { cat:"WDO", topic:"Vernehmung", q:"Ein beschuldigter Soldat wird vernommen. Welche Belehrung ist zentral?", options:["Tatvorwurf, Aussageverweigerungsrecht, Wahrheitspflicht bei Aussage","Nur Urlaubsanspruch","Nur Beschwerdefrist","Keine Belehrung nötig"], correct:0, expl:"§ 32 Abs. 4 WDO enthält diese Belehrungspflichten." },
  { cat:"WDO", topic:"Zeugen", q:"Zivile externe Zeugen dürfen im Disziplinarverfahren...", options:["zwangsweise vernommen werden","nur freiwillig vernommen werden","nie angehört werden","nur durch die VP vernommen werden"], correct:1, expl:"Externe zivile Zeugen können nur freiwillig vernommen werden." },
  { cat:"WDO", topic:"Durchsuchung", q:"Eine Durchsuchung nach § 20 WDO benötigt grundsätzlich...", options:["TDG-Anordnung; Ausnahme Gefahr im Verzug","nur Zustimmung der VP","nie eine Anordnung","immer Strafantrag"], correct:0, expl:"Grundsätzlich ist eine truppendienstgerichtliche Anordnung erforderlich." },
  { cat:"WDO", topic:"Durchsuchung", q:"Spindkontrolle und Durchsuchung sind...", options:["immer dasselbe","zu unterscheiden","beide nie zulässig","nur im Ausland möglich"], correct:1, expl:"Spindkontrolle zur Ordnung/Sauberkeit ist nicht dasselbe wie gezielte Beweismittelsuche." },
  { cat:"WDO", topic:"VP", q:"VP-Anhörung und Schlussgehör sind...", options:["dasselbe","zwei getrennte Verfahrensschritte","nur freiwillig","erst nach Vollstreckung relevant"], correct:1, expl:"Diese beiden Schritte dürfen nicht verwechselt werden." },
  { cat:"WDO", topic:"Schlussgehör", q:"Welche Form ist beim Schlussgehör vorgeschrieben?", options:["Mündlich genügt immer","Schriftform zwingend","Nur SMS","Keine Form"], correct:1, expl:"§ 32 Abs. 5 Satz 2 WDO verlangt Schriftform." },
  { cat:"WDO", topic:"Nachtfrist", q:"Wann darf nach Schlussgehör frühestens verhängt werden?", options:["Sofort","Nach Ablauf einer Nacht 22–06 Uhr","Nach sechs Monaten","Erst nach Beschwerde"], correct:1, expl:"Nach dem Schlussgehör ist die Nachtfrist abzuwarten." },
  { cat:"WDO", topic:"Vollstreckung", q:"Welche Maßnahme ist mit der Verhängung vollstreckt?", options:["Verweis","Arrest","Disziplinarbuße","Ausgangsbeschränkung"], correct:0, expl:"Der einfache Verweis ist mit der Verhängung vollstreckt." },
  { cat:"WDO", topic:"Fristen", q:"Wann verjährt die Vollstreckung einer Disziplinarmaßnahme?", options:["6 Monate nach Unanfechtbarkeit","1 Monat nach Tat","Nie","Sofort nach Verhängung"], correct:0, expl:"§ 59 WDO: Vollstreckungsverjährung 6 Monate nach Unanfechtbarkeit." },
  { cat:"WDO", topic:"Muss/Soll/Kann", q:"Was bedeutet Muss-Abgabe?", options:["Kein Ermessen","Regelfall mit Ausnahme","Freies Ermessen","Keine Abgabe"], correct:0, expl:"Muss bedeutet zwingend, ohne Ermessen." },
  { cat:"WDO", topic:"Muss/Soll/Kann", q:"Was bedeutet Soll-Abgabe?", options:["Zwingend ohne Ausnahme","Regelfall mit Ausnahmemöglichkeit","Freies Belieben","Immer verboten"], correct:1, expl:"Soll bedeutet Regelfall; Abweichungen sind nur in atypischen Fällen möglich." },
  { cat:"WDO", topic:"EZM", q:"Erzieherische Maßnahmen sind...", options:["Disziplinarmaßnahmen","keine Disziplinarmaßnahmen und ohne Sanktionscharakter","gerichtliche Maßnahmen","immer Arrest"], correct:1, expl:"EZM setzen kein Dienstvergehen voraus und haben keinen Sanktionscharakter." },

  // ══════════════ WBO ══════════════
  { cat:"WBO", topic:"Grundregel", q:"Was ist bei WBO-Fällen zuerst zu bestimmen?", options:["Beschwerdeart","Strafrahmen","Dienstgrad","Vollstreckung"], correct:0, expl:"Falsche Beschwerdeart macht die weitere Prüfung regelmäßig falsch." },
  { cat:"WBO", topic:"Arten", q:"Eine Beschwerde gegen eine verhängte Disziplinarbuße ist...", options:["Kameradenbeschwerde","Disziplinarbeschwerde","Verwaltungsbeschwerde","Notwehr"], correct:1, expl:"Sie richtet sich gegen eine Disziplinarmaßnahme." },
  { cat:"WBO", topic:"Arten", q:"Eine Beschwerde gegen einen gleichrangigen Kameraden ist...", options:["Vorgesetztenbeschwerde","Kameradenbeschwerde","Disziplinarbeschwerde","Verwaltungsbeschwerde"], correct:1, expl:"Bei gleichrangigen Kameraden liegt Kameradenbeschwerde vor." },
  { cat:"WBO", topic:"Rechtsweg", q:"Wesentlicher Unterschied Vorgesetzten- und Kameradenbeschwerde?", options:["Nur Farbe des Bescheids","Weiterer Rechtsweg zum TDG bei Vorgesetztenbeschwerde möglich, bei Kameradenbeschwerde nicht","Kameradenbeschwerde hat keine Frist","Vorgesetztenbeschwerde ist immer unzulässig"], correct:1, expl:"Dieser Rechtswegunterschied ist ein Klassiker." },
  { cat:"WBO", topic:"Zulässigkeit", q:"Welches Schema gehört zur Zulässigkeit einer Beschwerde?", options:["Statthaftigkeit – Form – Frist – Beschwer","Tatbestand – Rechtswidrigkeit – Schuld","VP – Schlussgehör – Nachtfrist","VorgV – Befehl – Gehorsam"], correct:0, expl:"Das Zulässigkeitsschema lautet Statthaftigkeit, Form, Frist, Beschwer." },
  { cat:"WBO", topic:"Beschwer", q:"Was bedeutet Beschwer?", options:["Allgemeines Interesse","Verletzung eigener Rechte","Dienstgrad des Beschwerdeführers","Mündliche Unzufriedenheit"], correct:1, expl:"Beschwer setzt persönliche Betroffenheit in eigenen Rechten voraus." },
  { cat:"WBO", topic:"Gruppenbeschwerde", q:"Gruppenbeschwerden sind grundsätzlich...", options:["zulässig","unzulässig","immer beim TDG einzulegen","nur von Offizieren zulässig"], correct:1, expl:"Jeder Soldat muss grundsätzlich selbst Beschwerde einlegen." },
  { cat:"WBO", topic:"Frist", q:"Wie lang ist die allgemeine Beschwerdefrist nach § 6 Abs. 1 WBO?", options:["1 Woche","1 Monat","6 Monate","Keine Frist"], correct:1, expl:"Die Frist beträgt grundsätzlich einen Monat ab Kenntnis." },
  { cat:"WBO", topic:"Bescheid", q:"Wie ist ein Beschwerdebescheid aufzubauen?", options:["Sachverhalt – Zulässigkeit – Begründetheit – Entscheidung","Verdacht – VP – Nachtfrist","Tatbestand – Schuld – Strafe","Nur Ergebnis"], correct:0, expl:"Dieser Aufbau ist prüfungsrelevant." },
];

// ─────────────────────────────────────────────────────────────────────────
// FARBEN / KATEGORIE-STYLING
// ─────────────────────────────────────────────────────────────────────────
const CAT_STYLES = {
  WDO: { bg: "#1F3864", light: "#E8EDF5", accent: "#2E5F8A", icon: Shield, label: "Disziplinarrecht" },
  SG: { bg: "#7A4419", light: "#FBF1E6", accent: "#B5651D", icon: BookOpen, label: "Soldatengesetz" },
  WBO: { bg: "#1E5631", light: "#E9F5EC", accent: "#2D7A45", icon: Scale, label: "Beschwerderecht" },
  VorgV: { bg: "#4B2E83", light: "#F1ECFA", accent: "#6A4BBC", icon: Landmark, label: "Vorgesetztenverordnung" },
  Befehlsrecht: { bg: "#5C2E2E", light: "#FAEEEE", accent: "#A94A4A", icon: Shield, label: "Befehlsrecht" },
  Strafrecht: { bg: "#3A3A3A", light: "#EFEFEF", accent: "#666666", icon: Gavel, label: "Strafrecht / WStG" },
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
  const allCats = Object.keys(CAT_STYLES);
  const [stage, setStage] = useState("start");
  const [activeCats, setActiveCats] = useState(allCats);
  const [order, setOrder] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});

  const filteredQuestions = useMemo(() => QUESTIONS.filter(q => activeCats.includes(q.cat)), [activeCats]);

  function startQuiz() {
    const ord = shuffle(filteredQuestions.map((_, i) => i));
    setOrder(ord);
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    setAnswers({});
    setStage("quiz");
  }

  function toggleCat(cat) {
    setActiveCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  function selectOption(i) {
    if (!revealed) setSelected(i);
  }

  function confirmAnswer() {
    if (selected === null) return;
    const qRef = filteredQuestions[order[idx]];
    const isCorrect = selected === qRef.correct;
    setAnswers(prev => ({ ...prev, [idx]: { selected, correct: isCorrect } }));
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= order.length) setStage("result");
    else {
      setIdx(idx + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function prev() {
    if (idx === 0) return;
    const newIdx = idx - 1;
    setIdx(newIdx);
    const prevAns = answers[newIdx];
    setSelected(prevAns ? prevAns.selected : null);
    setRevealed(!!prevAns);
  }

  function restart() { setStage("start"); }

  const score = Object.values(answers).filter(a => a.correct).length;
  const totalAnswered = Object.keys(answers).length;

  if (stage === "start") {
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", backgroundImage:"radial-gradient(circle at 20% 20%, rgba(46,95,138,0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(31,56,100,0.3), transparent 50%)", fontFamily:"Inter, system-ui, sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:620, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", marginBottom:20, boxShadow:"0 8px 24px rgba(46,95,138,0.4)" }}><Award size={30} color="#fff" /></div>
            <div style={{ fontSize:13, letterSpacing:3, color:"#7FA8D9", fontWeight:600, marginBottom:8 }}>BUNDESWEHR OFFIZIERSLEHRGANG</div>
            <h1 style={{ fontSize:34, fontWeight:800, margin:0, letterSpacing:-0.5 }}>Prüfungs-Quiz Recht</h1>
            <p style={{ color:"#A8BAD0", fontSize:16, marginTop:10, lineHeight:1.5 }}>{QUESTIONS.length} Fragen zu SG, VorgV, Befehlsrecht, Strafrecht/WStG, WDO und WBO</p>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:24, marginBottom:24 }}>
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:16 }}>THEMENBEREICHE WÄHLEN</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {Object.entries(CAT_STYLES).map(([cat, style]) => {
                const Icon = style.icon;
                const active = activeCats.includes(cat);
                const count = QUESTIONS.filter(q => q.cat === cat).length;
                return (
                  <button key={cat} onClick={() => toggleCat(cat)} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:12, border: active ? `2px solid ${style.accent}` : "2px solid rgba(255,255,255,0.08)", background: active ? `${style.accent}22` : "rgba(255,255,255,0.02)", cursor:"pointer", transition:"all 0.15s", textAlign:"left", color:"#fff" }}>
                    <div style={{ width:38, height:38, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", background: active ? style.accent : "rgba(255,255,255,0.08)", flexShrink:0 }}><Icon size={18} color="#fff" /></div>
                    <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:15 }}>{style.label}</div><div style={{ fontSize:12.5, color:"#8FA3BC" }}>{cat} · {count} Fragen</div></div>
                    <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${active ? style.accent : "rgba(255,255,255,0.25)"}`, background: active ? style.accent : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{active && <Check size={14} color="#fff" strokeWidth={3} />}</div>
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={startQuiz} disabled={activeCats.length===0 || filteredQuestions.length===0} style={{ width:"100%", padding:"16px", borderRadius:12, border:"none", background: activeCats.length===0 ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:16, fontWeight:700, cursor: activeCats.length===0 ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 8px 20px rgba(46,95,138,0.4)" }}>Quiz starten ({filteredQuestions.length} Fragen) <ChevronRight size={20} /></button>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    const pct = Math.round((score / order.length) * 100);
    const byTopic = {};
    order.forEach((qi, i) => { const q = filteredQuestions[qi]; if (!byTopic[q.cat]) byTopic[q.cat] = { correct:0, total:0 }; byTopic[q.cat].total++; if (answers[i]?.correct) byTopic[q.cat].correct++; });
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter, system-ui, sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:560, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ width:110, height:110, borderRadius:"50%", margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center", background:`conic-gradient(#2E5F8A ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }}><div style={{ width:88, height:88, borderRadius:"50%", background:"#0F1B2D", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ fontSize:26, fontWeight:800 }}>{pct}%</div></div></div>
            <h2 style={{ fontSize:24, fontWeight:800, margin:"0 0 6px" }}>{score} von {order.length} richtig</h2>
            <p style={{ color:"#A8BAD0", fontSize:15 }}>{pct >= 80 ? "Sehr gut – du bist gut vorbereitet." : pct >= 60 ? "Solide Basis – gezielt wiederholen." : "Hier lohnt sich nochmal ein Blick in die Kompaktunterlagen."}</p>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:20, marginBottom:24 }}>
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:14 }}>ERGEBNIS NACH THEMA</div>
            {Object.entries(byTopic).map(([cat, stats]) => { const style = CAT_STYLES[cat]; const p = Math.round((stats.correct / stats.total) * 100); return (<div key={cat} style={{ marginBottom:14 }}><div style={{ display:"flex", justifyContent:"space-between", fontSize:13.5, marginBottom:6 }}><span style={{ fontWeight:600 }}>{style.label}</span><span style={{ color:"#A8BAD0" }}>{stats.correct}/{stats.total}</span></div><div style={{ height:8, borderRadius:4, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}><div style={{ height:"100%", width:`${p}%`, background:style.accent, borderRadius:4 }} /></div></div>); })}
          </div>
          <button onClick={restart} style={{ width:"100%", padding:"16px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 8px 20px rgba(46,95,138,0.4)" }}><RotateCcw size={18} /> Neues Quiz starten</button>
        </div>
      </div>
    );
  }

  const q = filteredQuestions[order[idx]];
  const style = CAT_STYLES[q.cat];
  const Icon = style.icon;
  const progress = ((idx) / order.length) * 100;

  return (
    <div style={{ minHeight:"100vh", background:"#F5F3EE", fontFamily:"Inter, system-ui, sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"20px 16px" }}>
      <div style={{ maxWidth:640, width:"100%" }}>
        <div style={{ marginBottom:18 }}><div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#666", marginBottom:6, fontWeight:600 }}><span>Frage {idx + 1} von {order.length}</span><span>{score}/{totalAnswered} richtig</span></div><div style={{ height:6, borderRadius:3, background:"#E2DFD6", overflow:"hidden" }}><div style={{ height:"100%", width:`${progress}%`, background:style.accent, borderRadius:3, transition:"width 0.3s" }} /></div></div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:20, background:style.light, marginBottom:16 }}><Icon size={15} color={style.accent} /><span style={{ fontSize:12.5, fontWeight:700, color:style.accent }}>{style.label} · {q.topic}</span></div>
        <h2 style={{ fontSize:21, fontWeight:700, color:"#1A1A1A", lineHeight:1.4, marginBottom:22 }}>{q.q}</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
          {q.options.map((opt, i) => { let bg="#fff", border="#E2DFD6", textColor="#1A1A1A"; let icon=null; if (revealed) { if (i===q.correct) { bg="#E9F7EF"; border="#1E6B1E"; textColor="#14401A"; icon=<Check size={18} color="#1E6B1E" strokeWidth={3}/>; } else if (i===selected && i!==q.correct) { bg="#FADBD8"; border="#C0392B"; textColor="#7B241C"; icon=<X size={18} color="#C0392B" strokeWidth={3}/>; } else { bg="#fafafa"; textColor="#999"; } } else if (i===selected) { bg=style.light; border=style.accent; }
            return (<button key={i} onClick={() => selectOption(i)} disabled={revealed} style={{ display:"flex", alignItems:"center", gap:12, textAlign:"left", padding:"14px 16px", borderRadius:12, border:`2px solid ${border}`, background:bg, color:textColor, fontSize:15, fontWeight:500, cursor:revealed ? "default" : "pointer", transition:"all 0.12s" }}><span style={{ width:26, height:26, borderRadius:"50%", flexShrink:0, border:`2px solid ${revealed ? "transparent" : (i===selected ? style.accent : "#CCC")}`, background:revealed ? "transparent" : (i===selected ? style.accent : "transparent"), display:"flex", alignItems:"center", justifyContent:"center", fontSize:12.5, fontWeight:700, color:i===selected && !revealed ? "#fff" : "#888" }}>{revealed ? icon : String.fromCharCode(65+i)}</span><span style={{ flex:1 }}>{opt}</span></button>);
          })}
        </div>
        {revealed && (<div style={{ background: answers[idx]?.correct ? "#E9F7EF" : "#FFF8E1", border:`1px solid ${answers[idx]?.correct ? "#1E6B1E33" : "#F0B42933"}`, borderRadius:12, padding:"16px 18px", marginBottom:22, fontSize:14, lineHeight:1.55, color:"#333" }}><div style={{ fontWeight:700, marginBottom:6, color: answers[idx]?.correct ? "#1E6B1E" : "#8A6D1A" }}>{answers[idx]?.correct ? "Richtig!" : "Nicht ganz."}</div>{q.expl}</div>)}
        <div style={{ display:"flex", gap:10 }}><button onClick={prev} disabled={idx===0} style={{ padding:"13px 18px", borderRadius:10, border:"2px solid #E2DFD6", background:"#fff", color:idx===0 ? "#CCC" : "#333", fontWeight:600, fontSize:14, cursor:idx===0 ? "not-allowed" : "pointer", display:"flex", alignItems:"center", gap:6 }}><ChevronLeft size={16}/> Zurück</button>{!revealed ? (<button onClick={confirmAnswer} disabled={selected===null} style={{ flex:1, padding:"13px 18px", borderRadius:10, border:"none", background:selected===null ? "#E2DFD6" : style.accent, color:"#fff", fontWeight:700, fontSize:15, cursor:selected===null ? "not-allowed" : "pointer" }}>Antwort prüfen</button>) : (<button onClick={next} style={{ flex:1, padding:"13px 18px", borderRadius:10, border:"none", background:style.accent, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{idx+1>=order.length ? "Ergebnis anzeigen" : "Nächste Frage"} <ChevronRight size={16}/></button>)}</div>
      </div>
    </div>
  );
}
