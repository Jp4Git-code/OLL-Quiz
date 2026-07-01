import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award } from "lucide-react";

const QUESTIONS = [

  // ══════════════════════════════════════════════
  // VERFASSUNGSRECHT (GG) – 18 Fragen
  // ══════════════════════════════════════════════
  { cat:"GG", topic:"FDGO", q:"Wie definiert das BVerfG die FDGO?", options:["Gesamtheit aller deutschen Gesetze","Rechtsstaatliche Herrschaftsordnung auf Basis der Selbstbestimmung des Volkes, der Freiheit und Gleichheit","Der Zusammenschluss aller demokratischen Parteien","Die Bundeswehr und ihre Aufgaben"], correct:1, expl:"Das BVerfG definiert die FDGO als eine Ordnung, die unter Ausschluss jeglicher Gewalt- und Willkürherrschaft eine rechtsstaatliche Herrschaftsordnung auf Grundlage der Selbstbestimmung des Volkes nach dem Willen der Mehrheit und der Freiheit und Gleichheit darstellt." },
  { cat:"GG", topic:"FDGO", q:"Aus welchen drei Kernelementen besteht die FDGO?", options:["Bundestag, Bundesrat, Bundespräsident","Menschenwürde, Demokratieprinzip, Rechtsstaatsprinzip","Freiheit, Gleichheit, Brüderlichkeit","Exekutive, Legislative, Judikative"], correct:1, expl:"Die FDGO besteht aus Menschenwürde (Art. 1 GG) als höchstem Verfassungswert, dem Demokratieprinzip und dem Rechtsstaatsprinzip." },
  { cat:"GG", topic:"FDGO", q:"Wozu verpflichtet § 8 SG den Soldaten in Bezug auf die FDGO?", options:["Nur zur Kenntnis der FDGO","Die FDGO anzuerkennen und sich durch sein gesamtes Verhalten aktiv für ihren Erhalt einzusetzen","Nur zur Unterlassung verfassungswidriger Handlungen","Zur Mitgliedschaft in einer demokratischen Partei"], correct:1, expl:"§ 8 SG verpflichtet zu zweierlei: die FDGO anzuerkennen UND sich durch das gesamte Verhalten aktiv für ihren Erhalt einzusetzen – äußere Manifestation ist entscheidend." },
  { cat:"GG", topic:"Staatsstrukturprinzipien", q:"Welche fünf Staatsstrukturprinzipien enthält Art. 20 GG?", options:["Bundestag, Bundesrat, Bundespräsident, Bundesregierung, BVerfG","Republik, Demokratie, Bundesstaat, Sozialstaat, Rechtsstaat","Freiheit, Gleichheit, Solidarität, Würde, Frieden","Legislative, Exekutive, Judikative, Verwaltung, Militär"], correct:1, expl:"Art. 20 GG enthält die fünf Staatsstrukturprinzipien: Republik, Demokratie, Bundesstaat (Föderalismus), Sozialstaat und Rechtsstaat." },
  { cat:"GG", topic:"Ewigkeitsgarantie", q:"Was versteht man unter der 'Ewigkeitsgarantie' des Art. 79 Abs. 3 GG?", options:["Das GG gilt ewig und kann nie geändert werden","Die Prinzipien des Art. 1 GG (Menschenwürde) und Art. 20 GG (Staatsstruktur) dürfen nie geändert werden","Der Bundestag wird auf Ewigkeit gewählt","Grundrechte gelten unbegrenzt für alle Menschen weltweit"], correct:1, expl:"Art. 79 Abs. 3 GG (Ewigkeitsgarantie): Die in Art. 1 (Menschenwürde) und Art. 20 GG niedergelegten Grundsätze dürfen durch keine Verfassungsänderung angetastet werden." },
  { cat:"GG", topic:"Menschenwürde", q:"Ist die Menschenwürde (Art. 1 Abs. 1 GG) einschränkbar?", options:["Ja, durch einfaches Gesetz","Ja, durch kollidierendes Verfassungsrecht","Nein – sie ist absolut und unter keinen Umständen einschränkbar","Nur in Kriegszeiten einschränkbar"], correct:2, expl:"Die Menschenwürde ist ABSOLUT geschützt – weder durch Gesetz noch durch kollidierendes Verfassungsrecht einschränkbar. Eingriffe sind stets verfassungswidrig." },
  { cat:"GG", topic:"Menschenwürde", q:"Welche der folgenden Handlungen verletzt die Menschenwürde eines Soldaten?", options:["Befehl, morgens um 05:45 Uhr aufzustehen","Befehl, eine gereinigte Waffe erneut zu reinigen","Befehl an einen Rekruten, im Rahmen einer Übung Regenwürmer zu essen","Befehl, in der Unterkunft kein politisches Werbematerial zu verteilen"], correct:2, expl:"Der Befehl, Regenwürmer zu essen, ist eine erniedrigende, bloßstellende Behandlung, die die Menschenwürde verletzt. Der Befehl ist rechtswidrig (§ 10 Abs. 4 SG) und unverbindlich (§ 11 Abs. 1 SG)." },
  { cat:"GG", topic:"Staatsbürger in Uniform", q:"Was bedeutet 'Staatsbürger in Uniform' nach § 6 SG?", options:["Soldaten haben keine Grundrechte","Soldaten haben dieselben staatsbürgerlichen Rechte wie jeder Bürger, mit möglichen dienstbedingten Einschränkungen","Soldaten haben mehr Rechte als Zivilisten","Soldaten müssen beim Diensteintritt ihre Grundrechte abgeben"], correct:1, expl:"§ 6 SG: Soldaten sind Staatsbürger in Uniform mit denselben Grundrechten. Aus den Erfordernissen des Dienstes können sich aber verhältnismäßige Einschränkungen ergeben (§ 6 Satz 2 SG)." },
  { cat:"GG", topic:"Grundrechte", q:"Welche Grundrechte sind ausschließlich durch kollidierendes Verfassungsrecht (NICHT durch einfaches Gesetz) einschränkbar?", options:["Art. 2 GG (Handlungsfreiheit) und Art. 14 GG (Eigentum)","Art. 4 GG (Religionsfreiheit), Art. 5 Abs. 3 GG (Kunst/Wissenschaft), Art. 9 GG (Vereinigung)","Alle Grundrechte durch einfaches Gesetz","Kein Grundrecht durch einfaches Gesetz"], correct:1, expl:"Schrankenlose Grundrechte (nur durch kollidierendes Verfassungsrecht einschränkbar): Art. 4, Art. 5 Abs. 3, Art. 6 Abs. 1, Art. 9 und Art. 19 Abs. 4 GG." },
  { cat:"GG", topic:"Prüfungsschema", q:"In welcher Reihenfolge wird ein Grundrechtseingriff geprüft?", options:["Eingriff → Schranken → Ergebnis","Welches Grundrecht? → Eingriff? → Verfassungsgemäße Einschränkung (gesetzl. Grundlage, Voraussetzungen, Verhältnismäßigkeit) → Ergebnis","Verhältnismäßigkeit → Tatbestand → Ergebnis","Zweck → Mittel → Ergebnis"], correct:1, expl:"Schema: 1. Welches Grundrecht? 2. Liegt ein Eingriff vor? 3. Verfassungsgemäße Einschränkung? (a. gesetzl. Grundlage, b. Voraussetzungen, c. Verhältnismäßigkeit: Geeignetheit/Erforderlichkeit/Angemessenheit) 4. Gesamtergebnis." },
  { cat:"GG", topic:"Verhältnismäßigkeit", q:"Was sind die drei Stufen der Verhältnismäßigkeitsprüfung?", options:["Wahrheit – Gerechtigkeit – Frieden","Geeignetheit – Erforderlichkeit – Angemessenheit","Tatbestand – Rechtswidrigkeit – Schuld","Befehl – Gehorsam – Kontrolle"], correct:1, expl:"Die Verhältnismäßigkeit wird in drei Stufen geprüft: 1. Geeignetheit (Mittel erreicht Ziel), 2. Erforderlichkeit (kein milderes Mittel), 3. Angemessenheit (Zweck-Mittel-Verhältnis)." },
  { cat:"GG", topic:"Wehrverfassung", q:"Wer trägt die Befehls- und Kommandogewalt über die Bundeswehr im Frieden?", options:["Bundespräsident","Bundesminister der Verteidigung","Generalinspekteur der Bundeswehr","Bundeskanzler"], correct:1, expl:"Im Frieden liegt die Befehls- und Kommandogewalt beim Bundesminister der Verteidigung (Art. 65a GG). Im Verteidigungsfall geht sie auf den Bundeskanzler über." },
  { cat:"GG", topic:"Wehrverfassung", q:"Was bedeutet 'Parlamentsarmee' konkret?", options:["Der Bundestag kommandiert Einzelsoldaten direkt","Bewaffnete Auslandseinsätze bedürfen grundsätzlich der Zustimmung des Bundestages","Das Parlament bezahlt die Soldaten direkt","Der Bundestag kann den Verteidigungsminister täglich absetzen"], correct:1, expl:"Die Bundeswehr ist eine 'Parlamentsarmee': Bewaffnete Auslandseinsätze bedürfen grundsätzlich der konstitutiven Zustimmung des Bundestages (Parlamentsbeteiligungsgesetz)." },
  { cat:"GG", topic:"Wehrverfassung", q:"Was ist die Aufgabe des Wehrbeauftragten des Bundestages?", options:["Befehle an die Bundeswehr zu erteilen","Schutz der Grundrechte der Soldaten und Hilfsorgan des Bundestages bei der parlamentarischen Kontrolle","Den Bundeshaushalt für die Bundeswehr aufzustellen","Die Bundeswehr im Ausland zu vertreten"], correct:1, expl:"Art. 45b GG: Der Wehrbeauftragte ist Hilfsorgan des Bundestages und dient dem Schutz der Grundrechte der Soldaten sowie der parlamentarischen Kontrolle der Streitkräfte." },
  { cat:"GG", topic:"Demokratieprinzip", q:"Was kennzeichnet die repräsentative Demokratie im GG?", options:["Alle Entscheidungen werden durch Volksabstimmung getroffen","Das Volk wählt Volksvertreter, die wesentliche Entscheidungen treffen","Einzelne Politiker entscheiden ohne Parlament","Der Bundespräsident entscheidet allein"], correct:1, expl:"Das GG sieht die repräsentative Demokratie vor: Das Volk beschränkt seine Willensbildung auf die Wahl von Volksvertretern (Bundestag), die alle wesentlichen Entscheidungen treffen. Volksentscheide sind nur in Art. 29 Abs. 2 GG vorgesehen." },
  { cat:"GG", topic:"Rechtsstaatsprinzip", q:"Welcher Grundsatz besagt, dass staatliches Handeln einer gesetzlichen Grundlage bedarf?", options:["Gewaltenteilungsprinzip","Vorbehalt des Gesetzes","Schuldprinzip","Verhältnismäßigkeitsprinzip"], correct:1, expl:"Der Grundsatz vom Vorbehalt des Gesetzes ist Teil des Rechtsstaatsprinzips: Staatliche Eingriffe bedürfen einer gesetzlichen Grundlage – gilt besonders für Grundrechtseingriffe." },
  { cat:"GG", topic:"Einsatz Bundeswehr", q:"Für welche Einsatzart ist Art. 87a Abs. 1 GG (Landesverteidigung) die Grundlage?", options:["Auslandseinsätze im System kollektiver Sicherheit","Die klassische Verteidigung des Bundesgebietes","Katastrophenschutz im Inland","Amtshilfe für andere Bundesbehörden"], correct:1, expl:"Art. 87a Abs. 1 GG erlaubt den Einsatz der Streitkräfte zur Verteidigung – das ist der ursprüngliche verfassungsrechtliche Auftrag der Bundeswehr." },
  { cat:"GG", topic:"Einsatz Bundeswehr", q:"Auf welcher Grundlage darf die Bundeswehr in internationalen Friedensmissionen (z.B. NATO, UN) eingesetzt werden?", options:["Art. 87a Abs. 1 GG","Art. 24 Abs. 2 GG – System gegenseitiger kollektiver Sicherheit","Art. 35 Abs. 2 GG – Katastrophenschutz","Art. 20 GG – Staatsstrukturprinzipien"], correct:1, expl:"Art. 24 Abs. 2 GG ermächtigt Deutschland, sich in ein System gegenseitiger kollektiver Sicherheit einzuordnen – die Verfassungsgrundlage für NATO-Einsätze, UN-Missionen etc." },

  // ══════════════════════════════════════════════
  // SOLDATENGESETZ (SG) – 20 Fragen
  // ══════════════════════════════════════════════
  { cat:"SG", topic:"Dienstvergehen", q:"Was ist beim Prüfungsschema des Dienstvergehens nach § 23 Abs. 1 SG zuerst zu prüfen?", options:["Welche Disziplinarmaßnahme angemessen ist","Welche konkrete soldatische Pflicht betroffen ist","Ob eine Beschwerde zulässig wäre","Ob ein Strafverfahren eröffnet wurde"], correct:1, expl:"Zuerst immer die konkrete Pflicht mit Norm benennen. Dann: Pflichtverletzung? Verschulden? Ergebnis: Dienstvergehen." },
  { cat:"SG", topic:"§ 7 SG", q:"Welche drei Kernpflichten gehören zur Pflicht zum treuen Dienen nach § 7 SG?", options:["Wahrheit, Verschwiegenheit, Gehorsam","Dienstleistung, Loyalität, Vermögenswahrung","Kameradschaft, Fürsorge, Beschwerde","Befehl, Gehorsam, Vollstreckung"], correct:1, expl:"§ 7 SG umfasst Dienstleistungspflicht, Loyalitätspflicht (keine Straftaten mit Dienstbezug) und Vermögenswahrungspflicht." },
  { cat:"SG", topic:"§ 7 SG", q:"Ein Soldat erscheint alkoholisiert zum Dienst. Welche Pflichtverletzung liegt vor?", options:["Keine – er ist anwesend","Schlechtleistung nach § 7 SG","Nur politische Treuepflicht betroffen","Nur WBO-Beschwerderecht betroffen"], correct:1, expl:"Anwesenheit allein genügt nicht. Wer den Dienst nicht ordnungsgemäß leisten kann, verletzt die Dienstleistungspflicht durch Schlechtleistung." },
  { cat:"SG", topic:"§ 7 SG", q:"Ein Geschäftszimmersoldat verkauft an seinem Urlaubstag Adressen von Kameraden. Dienstbezug?", options:["Kein Dienstbezug, da Urlaubstag","Dienstbezug möglich – Gelegenheit entstand durch die Dienststellung","Nur § 15 SG betroffen","Nie ein Dienstvergehen im Urlaub"], correct:1, expl:"Auch private Handlungen können Dienstbezug haben, wenn die Gelegenheit zur Tat durch die Dienststellung entstanden ist." },
  { cat:"SG", topic:"§ 8 SG", q:"Was ist bei § 8 SG (politische Treuepflicht) das zentrale Prüfungskriterium?", options:["Die innere Gesinnung","Die äußere Manifestation – nach außen erkennbares Verhalten","Parteimitgliedschaft","Nur Äußerungen im Dienst"], correct:1, expl:"Nicht Gedanken, sondern nach außen erkennbares Verhalten ist entscheidend (äußere Manifestation)." },
  { cat:"SG", topic:"§ 8 SG", q:"Bloße Anwesenheit bei einer politischen Veranstaltung mit FDGO-feindlichen Zielen – automatischer Verstoß gegen § 8 SG?", options:["Ja, immer","Nein, es kommt auf die äußere Unterstützung an","Ja, bei Mannschaften immer","Nein, § 8 SG gilt grundsätzlich nicht"], correct:1, expl:"Es ist stets zu prüfen, ob eine Unterstützung der FDGO-feindlichen Bestrebung nach außen sichtbar wird." },
  { cat:"SG", topic:"§ 10 SG", q:"Welche Kurzformel beschreibt die Dienstaufsichtspflicht nach § 10 Abs. 2 SG?", options:["Schweigen – Dulden – Wegsehen","Wahrnehmen – Bewerten – Reagieren","Beantragen – Melden – Beschweren","Verhängen – Vollstrecken – Löschen"], correct:1, expl:"Die Dienstaufsicht verlangt Wahrnehmen, Bewerten und angemessenes Reagieren. Wegsehen ist selbst eine Pflichtverletzung!" },
  { cat:"SG", topic:"§ 10 SG", q:"Welche Pflicht regelt § 10 Abs. 3 SG?", options:["Vorbildfunktion","Dienstaufsicht","Fürsorgepflicht – Schutz von Gesundheit, Würde und Rechten der Untergebenen","Politische Zurückhaltung"], correct:2, expl:"§ 10 Abs. 3 SG regelt die Fürsorgepflicht: Vorgesetzte müssen Gesundheit, Würde und Rechte ihrer Untergebenen schützen." },
  { cat:"SG", topic:"§ 10 SG", q:"Welche Pflicht regelt § 10 Abs. 6 SG?", options:["Fürsorgepflicht","Verschwiegenheitspflicht","Pflicht zur Durchsetzung rechtmäßiger Befehle","Wahrheitspflicht"], correct:2, expl:"§ 10 Abs. 6 SG verpflichtet Vorgesetzte, rechtmäßige Befehle durchzusetzen." },
  { cat:"SG", topic:"§ 12 SG", q:"Welche Schutzgüter sind bei § 12 SG (Kameradschaft) zu benennen?", options:["Geld, Urlaub, Dienstgrad","Würde, Ehre, Rechte","Form, Frist, Beschwer","Befehl, Gehorsam, Zweck"], correct:1, expl:"§ 12 SG schützt Würde (Erniedrigung), Ehre (Beleidigung) und Rechte (z.B. Körperverletzung, Freiheitsberaubung) – immer konkret benennen!" },
  { cat:"SG", topic:"§ 12 SG", q:"Begründet § 12 SG eine Pflicht zu privaten Gefälligkeiten (z.B. Mitnahme im Auto)?", options:["Ja, immer","Nein – § 12 SG begründet keine Pflicht zu privater Hilfeleistung","Nur für Offiziere","Nur wenn zumutbar"], correct:1, expl:"§ 12 SG schützt Würde, Ehre und Rechte, begründet aber keine allgemeine Pflicht zu privaten Gefälligkeiten." },
  { cat:"SG", topic:"§ 13 SG", q:"Wann gilt die Wahrheitspflicht nach § 13 Abs. 1 SG?", options:["Immer – auch privat","Nur in dienstlichen Angelegenheiten (Vernehmung, Meldung, Antrag)","Nur vor Gericht","Nur gegenüber dem DiszVorg"], correct:1, expl:"§ 13 SG gilt ausschließlich für dienstliche Angelegenheiten. Bei rein privaten Angelegenheiten greift § 13 SG nicht direkt." },
  { cat:"SG", topic:"§ 13 SG", q:"Ein Soldat entscheidet sich trotz Schweigerecht auszusagen. Was gilt?", options:["Er darf frei lügen","Die Wahrheitspflicht nach § 13 SG greift","Die Aussage ist immer unverwertbar","§ 13 SG gilt nie im Disziplinarverfahren"], correct:1, expl:"Aussageverweigerungsrecht ODER Wahrheitspflicht – beides zugleich geht nicht. Wer sich zur Aussage entscheidet, muss die Wahrheit sagen." },
  { cat:"SG", topic:"§ 15 SG", q:"Ist politische Betätigung für Soldaten grundsätzlich erlaubt oder verboten?", options:["Grundsätzlich verboten","Grundsätzlich erlaubt (Staatsbürger in Uniform) – verboten nur in Uniform, im Dienst oder unter Ausnutzung der Dienststellung","Nur für Offiziere erlaubt","Nur außerhalb der Kaserne erlaubt"], correct:1, expl:"§ 15 SG: Politische Betätigung ist grundsätzlich erlaubt – verboten nach § 15 Abs. 2 SG ist sie in Uniform, im Dienst oder unter Ausnutzung der Dienststellung." },
  { cat:"SG", topic:"§ 17 SG", q:"Worauf stellt die Wohlverhaltenspflicht nach § 17 Abs. 1 SG ab?", options:["Achtung und Vertrauen, die der Dienst erfordert","Urlaubsdauer","Beschwerdeinstanz","Richtervorbehalt"], correct:0, expl:"Maßstab des § 17 SG ist die Beeinträchtigung von Achtung und Vertrauen, die der Dienst erfordert – gilt inner- und außerdienstlich." },
  { cat:"SG", topic:"§ 17 SG", q:"Eine einfache private Geschwindigkeitsüberschreitung am Wochenende – automatisch Dienstvergehen?", options:["Ja, immer automatisch","Im Regelfall NEIN – Einzelfallprüfung erforderlich","Ja, aber nur bei Offizieren","Nein, Verkehrsverstöße sind grundsätzlich irrelevant"], correct:1, expl:"Nicht jedes außerdienstliche Fehlverhalten ist automatisch ein Dienstvergehen. Eine einfache OWi ohne besonderen Öffentlichkeitsbezug beeinträchtigt Achtung und Vertrauen i.d.R. nicht." },
  { cat:"SG", topic:"Einheit DV", q:"Mehrere Pflichtverletzungen aus einem Sachverhalt werden geahndet als...", options:["mehrere getrennte Dienstvergehen","ein einheitliches Dienstvergehen (§ 18 Abs. 2 WDO)","eine Beschwerde","je nach Anzahl der Paragraphen einzeln"], correct:1, expl:"Grundsatz der Einheit des Dienstvergehens (§ 18 Abs. 2 WDO): Auch wenn mehrere §§ verletzt werden, liegt immer nur EIN Dienstvergehen vor." },
  { cat:"SG", topic:"§ 6 SG", q:"Was regelt § 6 SG für das Verhältnis Soldat–Grundrechte?", options:["Soldaten verlieren alle Grundrechte","Soldaten sind Staatsbürger in Uniform; Einschränkungen nur soweit dienstlich erforderlich und verhältnismäßig","Soldaten haben Sonderrechte gegenüber Zivilisten","§ 6 SG gilt nur im Auslandseinsatz"], correct:1, expl:"§ 6 SG ist Grundnorm: Soldaten behalten alle staatsbürgerlichen Rechte; Einschränkungen sind nur aus dienstlicher Notwendigkeit und verhältnismäßig zulässig." },
  { cat:"SG", topic:"§ 10 SG", q:"§ 10 Abs. 1 SG (Vorbildfunktion) – was ist prüfungsrechtlich zu beachten?", options:["Er ist eine eigenständige Pflichtverletzung","Er begründet keine eigenständige Pflichtverletzung, sondern ist eine Maßnahmebemessungsregel","Er ersetzt § 7 SG","Er gilt nur für Berufssoldaten"], correct:1, expl:"§ 10 Abs. 1 SG ist keine eigenständige soldatische Pflicht, sondern eine Bemessungsregel: Vorgesetzte können aufgrund ihrer Vorgesetztenstellung im Rahmen der Ahndung stärker gemaßregelt werden." },
  { cat:"SG", topic:"§ 17 SG", q:"Ein Leutnant bezeichnet seinen Kompaniechef in der Dienstpause vor Gruppenführern als 'Volltrottel'. Welche Normen sind betroffen?", options:["Keine – Dienstpause ist privat","§§ 12, 17 SG – Kameradschaft und Wohlverhalten, als Offizier gilt erhöhter Maßstab","Nur § 15 SG","Nur § 8 SG"], correct:1, expl:"§ 17 SG (Wohlverhalten) und § 12 SG (Kameradschaft/Ehre) sind verletzt. Als Offizier gilt erhöhter Maßstab nach § 10 Abs. 1 SG (Maßnahmebemessung)." },

  // ══════════════════════════════════════════════
  // VorgV – 8 Fragen
  // ══════════════════════════════════════════════
  { cat:"VorgV", topic:"Grundregel", q:"Was ist vor jeder Befehlsprüfung zuerst zu klären?", options:["Ob eine Nachtfrist lief","Ob ein Vorgesetztenverhältnis nach VorgV besteht","Ob eine Beschwerde eingelegt wurde","Ob ein Strafantrag vorliegt"], correct:1, expl:"Ohne Vorgesetztenverhältnis nach VorgV gibt es keinen militärischen Befehl und keine Gehorsamspflicht nach § 11 SG." },
  { cat:"VorgV", topic:"Reihenfolge", q:"In welcher Reihenfolge sind die Normen der VorgV zu prüfen?", options:["§ 4, § 1, § 2, § 3, § 5, § 6","§ 1, § 2, § 3, § 4, § 5, § 6","§ 6, § 5, § 4, § 3, § 2, § 1","§ 2, § 1, § 4, § 3, § 6, § 5"], correct:1, expl:"Die VorgV-Normen sind in der Reihenfolge §§ 1–6 zu prüfen – § 1 (Einheitsvorgesetzter) hat Vorrang vor späteren Varianten." },
  { cat:"VorgV", topic:"§ 1 VorgV", q:"§ 1 VorgV regelt den...", options:["Fachvorgesetzten","Einheitsvorgesetzten – unmittelbarer Vorgesetzter in derselben Einheit","Dienstgradvorgesetzten","Beschwerdebescheid"], correct:1, expl:"§ 1 VorgV: Einheitsvorgesetzter – der häufigste Fall in der Praxis." },
  { cat:"VorgV", topic:"§ 2 VorgV", q:"Ein Fachvorgesetzter darf Befehle erteilen...", options:["immer und überall","nur innerhalb seines Fachbereichs","nur an Offiziere","nur schriftlich"], correct:1, expl:"§ 2 VorgV: Die Befehlsbefugnis des Fachvorgesetzten ist auf seinen Fachbereich beschränkt." },
  { cat:"VorgV", topic:"§ 2 VorgV", q:"Ein Schießausbilder (Fachvorgesetzter nach § 2 VorgV) befiehlt einem Untergebenen, seine Stube zu reinigen. Was ist das Problem?", options:["Er überschreitet seinen Fachbereich","Er hat keine Nachtfrist beachtet","Er hätte die WBO anwenden müssen","Kein Problem – Vorgesetzte dürfen alles befehlen"], correct:0, expl:"Der Fachvorgesetzte nach § 2 VorgV hat nur Befehlsbefugnis im Rahmen seines Fachbereichs – Stubendienst gehört nicht dazu." },
  { cat:"VorgV", topic:"§ 4 VorgV", q:"Genügt ein höherer Dienstgrad allein, um Vorgesetzter zu sein?", options:["Ja, höherer Dienstgrad genügt immer","Nein – Dienstgrad allein genügt nicht; Voraussetzungen des § 4 VorgV müssen vorliegen","Dienstgrad ist völlig bedeutungslos","Nur Generale sind Vorgesetzte"], correct:1, expl:"§ 4 VorgV: Höherer Dienstgrad allein begründet keine Vorgesetztenstellung – die konkreten Voraussetzungen des § 4 VorgV müssen geprüft werden." },
  { cat:"VorgV", topic:"Zivile Vorgesetzte", q:"Können zivile Vorgesetzte der Bundeswehr militärische Befehle erteilen?", options:["Ja, wie jeder Vorgesetzte","Nein – sie erteilen dienstliche Anordnungen, keine Befehle i.S.d. §§ 10, 11 SG","Ja, wenn vom BMVg ermächtigt","Nur im Verteidigungsfall"], correct:1, expl:"Zivile Vorgesetzte begründen kein militärisches Vorgesetztenverhältnis. Sie erteilen Weisungen/Anordnungen; die Folgepflicht ergibt sich für Soldaten aus § 7 SG, nicht aus § 11 SG." },
  { cat:"VorgV", topic:"Ausländische Soldaten", q:"Haben ausländische Soldaten gegenüber deutschen Soldaten eine militärische Vorgesetztenstellung i.S.d. VorgV?", options:["Ja, immer","Nein – sie können keine Befehle i.S.d. §§ 10, 11 SG erteilen","Nur bei NATO-Einsätzen","Nur wenn sie einen höheren Dienstgrad haben"], correct:1, expl:"Ausländische Soldaten haben nicht die Rechtsstellung militärischer Vorgesetzter i.S.d. SG/VorgV. Die Folgepflicht ergibt sich ggf. aus § 7 SG." },

  // ══════════════════════════════════════════════
  // BEFEHLSRECHT – 15 Fragen
  // ══════════════════════════════════════════════
  { cat:"Befehlsrecht", topic:"Befehlsbegriff", q:"Was sind die wesentlichen Merkmale eines militärischen Befehls?", options:["Schriftform und Dienstsiegel","Anordnung zu bestimmtem Verhalten, von Vorgesetztem an Untergebenen, mit Gehorsamsanspruch","Begründungspflicht und Rechtsbehelfsbelehrung","Nur mündliche Ansage"], correct:1, expl:"Ein Befehl ist eine Anweisung zu bestimmtem Verhalten, von einem Vorgesetzten an einen Untergebenen, mit Anspruch auf Gehorsam. Form (mündlich, schriftlich, Zeichen) ist unerheblich." },
  { cat:"Befehlsrecht", topic:"Rechtmäßigkeit", q:"Nach welcher Norm richtet sich die Rechtmäßigkeit eines Befehls?", options:["§ 7 SG","§ 10 Abs. 4 SG – dienstlicher Zweck, Gesetze, Dienstvorschriften, Völkerrecht","§ 11 Abs. 1 SG","§ 23 SG"], correct:1, expl:"§ 10 Abs. 4 SG: Der Befehl ist rechtmäßig, wenn er den dienstlichen Zweck verfolgt und Gesetze, Dienstvorschriften sowie Regeln des Völkerrechts beachtet." },
  { cat:"Befehlsrecht", topic:"Rechtmäßigkeit", q:"Wann fehlt einem Befehl der dienstliche Zweck?", options:["Nur bei Privatangelegenheiten des Vorgesetzten","Bei Privatangelegenheiten, Sinnlosigkeiten, objektiv Unmöglichem und Dienstwidrigkeiten","Wenn er mündlich erteilt wird","Wenn er nachts erteilt wird"], correct:1, expl:"Dienstlicher Zweck fehlt bei: Privatangelegenheiten des Vorgesetzten (z.B. Rasenmähen auf Privatgrundstück), Sinnlosigkeiten, objektiv Unmöglichem, Dienstwidrigkeiten." },
  { cat:"Befehlsrecht", topic:"Rechtmäßigkeit", q:"Ein Vorgesetzter befiehlt seinem Untergebenen, privat für ihn einzukaufen. Ist der Befehl rechtmäßig?", options:["Ja, wenn der Untergebene zustimmt","Nein – es fehlt der dienstliche Zweck","Ja, wenn es dienstlich erforderlich ist","Nur wenn es um Lebensmittel geht"], correct:1, expl:"Privatangelegenheiten des Vorgesetzten fehlt der dienstliche Zweck – der Befehl ist rechtswidrig nach § 10 Abs. 4 SG." },
  { cat:"Befehlsrecht", topic:"Verbindlichkeit", q:"Was ist der zentrale Unterschied zwischen Rechtmäßigkeit und Verbindlichkeit eines Befehls?", options:["Es gibt keinen Unterschied","Rechtmäßigkeit betrifft den BEFEHLSGEBER (§ 10 Abs. 4 SG), Verbindlichkeit betrifft den EMPFÄNGER (§ 11 SG) – nicht jeder rechtswidrige Befehl ist unverbindlich!","Verbindlichkeit betrifft nur schriftliche Befehle","Rechtmäßigkeit gilt nur im Auslandseinsatz"], correct:1, expl:"Kernunterschied: Rechtmäßigkeit (§ 10 Abs. 4 SG) ist Pflicht des Befehlsgebers. Verbindlichkeit (§ 11 SG) regelt die Pflicht des Empfängers. Nicht jeder rechtswidrige Befehl ist unverbindlich!" },
  { cat:"Befehlsrecht", topic:"Verbindlichkeit", q:"Welche Unverbindlichkeitsgründe führen dazu, dass ein Befehl NICHT befolgt werden MUSS?", options:["Immer wenn der Befehl rechtswidrig ist","Fehlender dienstlicher Zweck, Verletzung der Menschenwürde, Unzumutbarkeit","Nur wenn der Befehl schriftlich ist","Nur bei Befehlen in der Nacht"], correct:1, expl:"§ 11 Abs. 1 SG: Muss nicht befolgt werden bei fehlendem dienstlichem Zweck, Menschenwürdeverletzung oder Unzumutbarkeit." },
  { cat:"Befehlsrecht", topic:"Verbindlichkeit", q:"Wann darf ein Befehl NICHT befolgt werden (strengste Kategorie)?", options:["Bei jedem unangenehmen Befehl","Wenn Befolgung eine Straftat darstellt oder ein schwerer HVR-Verstoß vorliegt","Wenn der Befehlsgeber keinen höheren Dienstgrad hat","Wenn der Befehl nachts erteilt wird"], correct:1, expl:"§ 11 Abs. 2 SG: Darf NICHT befolgt werden, wenn die Befolgung eine Straftat darstellt oder einen schweren Verstoß gegen das Humanitäre Völkerrecht zur Folge hätte." },
  { cat:"Befehlsrecht", topic:"Verbindlichkeit", q:"Ein Befehl ist eindeutig rechtswidrig, verletzt aber weder Menschenwürde noch stellt seine Ausführung eine Straftat dar. Ist er verbindlich?", options:["Nein, jeder rechtswidrige Befehl ist automatisch unverbindlich","Ja – Rechtswidrigkeit allein macht einen Befehl nicht unverbindlich","Nur Offiziere müssen ihn nicht befolgen","Das hängt vom Dienstgrad ab"], correct:1, expl:"Kernregel: Nicht jeder rechtswidrige Befehl ist unverbindlich. Unverbindlichkeit setzt einen der abschließenden Gründe des § 11 SG voraus." },
  { cat:"Befehlsrecht", topic:"Verbindlichkeit", q:"Was versteht man unter 'Unzumutbarkeit' als Unverbindlichkeitsgrund?", options:["Jeder unangenehme Befehl ist unzumutbar","Besonders schwerer Verhältnismäßigkeitsverstoß – Eingriff in Grundrechte steht in keinem Verhältnis zum dienstlichen Zweck","Befehle die körperliche Anstrengung erfordern","Befehle die nachts erteilt werden"], correct:1, expl:"Unzumutbarkeit: Besonders schwerer Eingriff in Grundrechte (z.B. Gesundheitsschutz), der in keinem Verhältnis zum dienstlichen Zweck steht. Nicht jeder rechtswidrige oder belastende Befehl ist unzumutbar." },
  { cat:"Befehlsrecht", topic:"Präventivbefehl", q:"Was ist ein 'Präventivbefehl' und wann ist er rechtmäßig?", options:["Ein geheimer Befehl – immer rechtmäßig","Befehl zur Verhinderung künftiger Pflichtverletzungen – rechtmäßig wenn verhältnismäßig und auf Dienstpflichten gestützt","Ein Befehl vor dem Gottesdienst","Befehle an Zivilpersonen"], correct:1, expl:"Präventivbefehle sollen künftige Pflichtverletzungen verhindern. Rechtmäßig wenn: konkrete Gefahr, auf Dienstpflichten gestützt, verhältnismäßig. Beispiel: Verbot, betrunken die Kaserne mit dem PKW zu verlassen." },
  { cat:"Befehlsrecht", topic:"Präventivbefehl", q:"Nach einer nächtlichen Durchschlageübung befiehlt der Kpchef, nicht mit dem Auto nach Hause zu fahren. Rechtmäßig?", options:["Nein, Eingriff in die Freiheit","Ja – verhältnismäßiger Präventivbefehl zur Verhinderung von Übermüdungsunfällen","Nur wenn schriftlich","Nur für Mannschaften"], correct:1, expl:"Rechtmäßiger Präventivbefehl: Es besteht die konkrete Gefahr, aufgrund Übermüdung Straftaten (Gefährdung des Straßenverkehrs) zu begehen. Der Befehl ist verhältnismäßig." },
  { cat:"Befehlsrecht", topic:"Dienstvorschriften", q:"Darf ein Befehl gegen eine Dienstvorschrift verstoßen?", options:["Ja, wenn der Befehlsgeber höheren Dienstgrad hat","Nein – Beachtung der Dienstvorschriften ist Teil der Rechtmäßigkeitsvoraussetzungen (§ 10 Abs. 4 SG)","Nur im Einsatz","Nur bei Sicherheitsvorschriften"], correct:1, expl:"§ 10 Abs. 4 SG: Rechtmäßige Befehle müssen auch Dienstvorschriften beachten. Ein Verstoß dagegen macht den Befehl rechtswidrig." },
  { cat:"Befehlsrecht", topic:"Zweckmäßigkeit", q:"Was ist der Unterschied zwischen einem rechtswidrigen und einem bloß unzweckmäßigen Befehl?", options:["Es gibt keinen Unterschied","Ein unzweckmäßiger Befehl muss nicht zwangsläufig rechtswidrig sein, kann aber durch Beschwerde oder Dienstaufsicht aufgehoben werden","Unzweckmäßige Befehle sind immer unverbindlich","Nur rechtswidrige Befehle können bekämpft werden"], correct:1, expl:"Ein unzweckmäßiger Befehl verletzt nicht zwingend § 10 Abs. 4 SG. Er kann aber im Beschwerdewege (§ 13 Abs. 1 Satz 2 WBO) oder durch Dienstaufsicht aufgehoben werden." },
  { cat:"Befehlsrecht", topic:"Befehlsrecht", q:"Was ist eine 'Gegenvorstellung' und wann ist sie geboten?", options:["Sofortige Verweigerung jedes Befehls","Das Recht/die Pflicht des Untergebenen, Bedenken gegen einen Befehl VOR seiner Ausführung zu äußern","Die förmliche Erhebung einer WBO-Beschwerde","Ein besonderer Befehlstyp für Offiziere"], correct:1, expl:"Die Gegenvorstellung gibt dem Untergebenen das Recht, Bedenken vor der Ausführung zu äußern. Es ist kein Ungehorsam – der Befehl muss danach ggf. dennoch ausgeführt werden." },
  { cat:"Befehlsrecht", topic:"Prüfungsreihenfolge", q:"In welcher Reihenfolge ist ein Sachverhalt mit militärischem Befehl zu prüfen?", options:["Befehl → Notwehr → Strafbarkeit","VorgV (Vorgesetztenverhältnis) → Befehlsbegriff → Rechtmäßigkeit → Verbindlichkeit → Konsequenzen","Beschwerde → Frist → Ergebnis","Nur VorgV prüfen, Rest ergibt sich"], correct:1, expl:"Prüfungsreihenfolge: 1. VorgV – liegt ein Vorgesetztenverhältnis vor? 2. Befehlsbegriff – liegt ein Befehl vor? 3. Rechtmäßigkeit (§ 10 Abs. 4 SG). 4. Verbindlichkeit (§ 11 SG). 5. Konsequenzen (WStG/SG)." },

  // ══════════════════════════════════════════════
  // STRAFRECHT / WStG – 18 Fragen
  // ══════════════════════════════════════════════
  { cat:"Strafrecht", topic:"Deliktsaufbau", q:"Welche vier Stufen hat der strafrechtliche Prüfungsaufbau?", options:["Verdacht – Ermittlung – Verurteilung – Vollstreckung","Objektiver Tatbestand – Subjektiver Tatbestand – Rechtswidrigkeit – Schuld","Anklage – Verhandlung – Urteil – Vollzug","Tatbestand – Beweis – Strafe – Vollstreckung"], correct:1, expl:"Der strafrechtliche Deliktsaufbau: I. Objektiver Tatbestand, II. Subjektiver Tatbestand (Vorsatz/Fahrlässigkeit), III. Rechtswidrigkeit (Rechtfertigungsgründe?), IV. Schuld." },
  { cat:"Strafrecht", topic:"Vorsatz/Fahrlässigkeit", q:"Was unterscheidet Vorsatz von Fahrlässigkeit?", options:["Es gibt keinen relevanten Unterschied","Vorsatz = Wissen und Wollen der Tatbestandsverwirklichung; Fahrlässigkeit = Außerachtlassen der gebotenen Sorgfalt","Fahrlässigkeit ist immer schwerer als Vorsatz","Vorsatz erfordert Absicht, Fahrlässigkeit nie"], correct:1, expl:"Vorsatz: Der Täter weiß und will die Tatbestandsverwirklichung (auch bedingter Vorsatz). Fahrlässigkeit: Missachten der gebotenen Sorgfalt ohne Wollen des Erfolgs." },
  { cat:"Strafrecht", topic:"Notwehr", q:"Welche zwei Blöcke hat die Notwehrprüfung (§ 32 StGB)?", options:["Absicht und Ausführung","Notwehrlage und Notwehrhandlung","Tatbestand und Rechtfertigung","Angriff und Gegenwehr"], correct:1, expl:"Notwehr (§ 32 StGB): 1. NOTWEHRLAGE: gegenwärtiger, rechtswidriger Angriff. 2. NOTWEHRHANDLUNG: erforderliche Verteidigung gegen den Angreifer + Verteidigungswille." },
  { cat:"Strafrecht", topic:"Notwehr", q:"Was gehört zur Notwehrlage?", options:["Gegenwärtiger rechtswidriger Angriff durch einen Menschen","Beschwerdefrist","Dienstgradgruppe","Nachtfrist"], correct:0, expl:"Notwehrlage: Der Angriff muss gegenwärtig (noch nicht beendet) und rechtswidrig sein. Er muss von einem Menschen ausgehen." },
  { cat:"Strafrecht", topic:"Notwehr", q:"Darf sich ein Soldat nach § 32 StGB auch gegen seinen Vorgesetzten mit Notwehr verteidigen?", options:["Nein, Gehorsam geht vor","Ja – Notwehr gilt universell auch gegenüber Vorgesetzten bei rechtswidrigem Angriff","Nur wenn der Angriff lebensgefährlich ist","Nur außerhalb des Dienstes"], correct:1, expl:"Das Notwehrrecht gilt universell. Ein rechtswidriger Angriff des Vorgesetzten entfällt nicht durch seine Vorgesetztenstellung." },
  { cat:"Strafrecht", topic:"Notstand", q:"Was unterscheidet Notstand (§ 34 StGB) von Notwehr (§ 32 StGB)?", options:["Es gibt keinen Unterschied","Notwehr: Abwehr eines menschlichen Angriffs; Notstand: Gefahrensituation ohne notwendigen Menschenangriff, Güterabwägung erforderlich","Notstand gilt nur für Zivilisten","Notwehr erfordert immer Polizei"], correct:1, expl:"Notwehr (§ 32 StGB): gegen menschlichen Angreifer, gegen diesen gerichtet. Notstand (§ 34 StGB): Gefahrensituation, Eingriffe auch gegen Unbeteiligte möglich, aber Güterabwägung zwingend." },
  { cat:"Strafrecht", topic:"Körperverletzung", q:"Was ist 'körperliche Misshandlung' im Sinne des § 223 Abs. 1 StGB?", options:["Jede Berührung einer anderen Person","Übles, unangemessenes Behandeln, das körperliches Wohlbefinden oder Unversehrtheit mehr als unerheblich beeinträchtigt","Nur sichtbare Verletzungen","Nur Faustschläge"], correct:1, expl:"§ 223 Abs. 1 StGB: Körperliche Misshandlung ist übles, unangemessenes Behandeln, das körperliches Wohlbefinden oder Unversehrtheit mehr als nur geringfügig beeinträchtigt. Auch Tritte, Ohrfeigen etc. fallen darunter." },
  { cat:"Strafrecht", topic:"WStG §15", q:"Was schützt § 15 WStG (eigenmächtige Abwesenheit)?", options:["Das Ansehen der Bundeswehr","Die zahlenmäßige Stärke und Einsatzbereitschaft der Streitkräfte","Nur die Disziplin einer Einheit","Das Eigentum der Bundeswehr"], correct:1, expl:"§ 15 WStG schützt die zahlenmäßige Stärke und damit die Einsatzbereitschaft der Streitkräfte." },
  { cat:"Strafrecht", topic:"WStG §15/16", q:"Was ist der entscheidende Unterschied zwischen eigenmächtiger Abwesenheit (§ 15 WStG) und Fahnenflucht (§ 16 WStG)?", options:["Die Dauer der Abwesenheit","Die Fahnenfluchtabsicht – der Wille, sich der Bundeswehr dauerhaft zu entziehen","Der Dienstgrad des Täters","Ob der Täter im Inland oder Ausland ist"], correct:1, expl:"§ 16 WStG erfordert Fahnenfluchtabsicht. Bei § 15 WStG fehlt diese Absicht. Die Dauer allein ist KEIN Unterscheidungsmerkmal." },
  { cat:"Strafrecht", topic:"WStG §16", q:"Wann ist eine Fahnenflucht nach § 16 WStG vollendet?", options:["Nach 3 Tagen Abwesenheit","Wenn der Soldat ins Ausland flieht","Wenn die Fahnenfluchtabsicht gebildet ist und die Abwesenheit beginnt","Erst nach einem Monat"], correct:2, expl:"§ 16 WStG ist vollendet, wenn die Fahnenfluchtabsicht gebildet ist und der Soldat zu entweichen beginnt – nicht erst nach einer bestimmten Dauer." },
  { cat:"Strafrecht", topic:"WStG §19", q:"Was setzt der Tatbestand 'Ungehorsam' nach § 19 WStG voraus?", options:["Jede Nicht-Befolgung eines Wunsches","Vorsätzliches Nichtbefolgung eines VERBINDLICHEN militärischen Befehls","Fahrlässiges Vergessen eines Befehls","Laute Kritik an einem Befehl"], correct:1, expl:"§ 19 WStG: Ungehorsam = vorsätzliche Nichtbefolgung eines verbindlichen Befehls. Zentralvoraussetzung: VERBINDLICHKEIT des Befehls (§ 11 SG)." },
  { cat:"Strafrecht", topic:"WStG §19", q:"Ein Soldat befolgt einen unverbindlichen Befehl nicht. Strafbarkeit nach § 19 WStG?", options:["Ja, immer","Nein – bei fehlendem Verbindlichkeit fehlt eine Tatbestandsvoraussetzung","Nur bei Vorsatz","Nur wenn Offizier"], correct:1, expl:"§ 22 Abs. 1 WStG: Ein unverbindlicher Befehl schließt die Strafbarkeit nach § 19 WStG aus. Verbindlichkeit ist Tatbestandsmerkmal." },
  { cat:"Strafrecht", topic:"WStG §30", q:"§ 30 WStG (Misshandlung Untergebener) – was ist der Kern?", options:["Körperverletzung unter Zivilisten","Körperliche Misshandlung Untergebener durch Vorgesetzte – Sonderdelikt gegenüber § 223 StGB","Nur Beleidigungen","Sachbeschädigung im Dienst"], correct:1, expl:"§ 30 WStG ist ein Sonderdelikt: Es setzt die Vorgesetzten-Untergebenen-Beziehung voraus und schützt neben körperlicher Integrität auch Würde und Vertrauen in die Führung." },
  { cat:"Strafrecht", topic:"WStG §31", q:"§ 31 WStG (Entwürdigende Behandlung) – typisches Beispiel?", options:["Körperverletzung mit Waffe","Herabsetzung durch erniedrigende Behandlung durch Vorgesetzte – z.B. beleidigende Bezeichnungen vor der Truppe","Nur Sachbeschädigung","Fahrerflucht"], correct:1, expl:"§ 31 WStG schützt die Würde des Untergebenen. Klassisches Beispiel: Beleidigung 'Du dummes Arschloch' vor der Truppe – erfüllt gleichzeitig § 185 StGB und § 31 Abs. 1 WStG." },
  { cat:"Strafrecht", topic:"SG/StGB/WStG", q:"Kann eine Handlung gleichzeitig ein Dienstvergehen und eine Straftat sein?", options:["Nein, nur eines von beiden","Ja – beides kann parallel laufen; Disziplinar- und Strafverfahren schließen sich nicht aus","Nur bei Offizieren","Nur im Auslandseinsatz"], correct:1, expl:"Eine Handlung kann gleichzeitig ein Dienstvergehen (SG) und eine Straftat (StGB/WStG) sein. Disziplinar- und Strafverfahren laufen parallel und schließen sich nicht aus." },
  { cat:"Strafrecht", topic:"WStG Geltungsbereich", q:"Für wen gilt das WStG?", options:["Nur für Berufssoldaten","Nur für Offiziere","Für alle Soldaten der Bundeswehr und gleichgestellte Personen","Nur für Soldaten im Auslandseinsatz"], correct:2, expl:"Das WStG gilt für alle Soldaten der Bundeswehr (BS, SaZ, FWDL) und ihnen gleichgestellte Personen – es ergänzt das allgemeine Strafrecht um militärspezifische Tatbestände." },
  { cat:"Strafrecht", topic:"Tätlicher Angriff", q:"Tätlicher Angriff auf Vorgesetzte (§ 24 WStG) setzt voraus...", options:["Körperliche Einwirkung auf die Person","Bloße Beleidigung","Einen Beschwerdebescheid","Eine Nachtfrist"], correct:0, expl:"§ 24 WStG (Tätlicher Angriff): Erfordert körperliche Einwirkung auf die Person. Verbale Auseinandersetzungen allein genügen nicht." },
  { cat:"Strafrecht", topic:"Bindungswirkung", q:"Haben rechtskräftige Strafbefehle Bindungswirkung für das Disziplinarverfahren (§ 34 Abs. 1 WDO)?", options:["Ja, wie Urteile","Nein – Bindungswirkung gilt nur für rechtskräftige URTEILE, nicht für Strafbefehle","Nur bei Geldstrafen","Nur im Auslandseinsatz"], correct:1, expl:"§ 34 Abs. 1 WDO: Bindungswirkung gilt nur für rechtskräftige URTEILE. Strafbefehle sind ausdrücklich ausgenommen – hier muss disziplinar selbst ermittelt werden." },

  // ══════════════════════════════════════════════
  // WDO – 30 Fragen
  // ══════════════════════════════════════════════
  { cat:"WDO", topic:"Grundsätze", q:"Was besagt das Legalitätsprinzip im Disziplinarrecht (§ 32 Abs. 1 WDO)?", options:["Ermittlungen stehen völlig im Ermessen","Das 'Ob' der Ermittlung ist KEINE Ermessensentscheidung – bei Anfangsverdacht MUSS ermittelt werden","Nur das TDG ermittelt","Ermittlungen nur bei Straftaten"], correct:1, expl:"§ 32 Abs. 1 WDO: Das Legalitätsprinzip zwingt den DiszVorg bei Anfangsverdacht zu ermitteln – kein Ermessen!" },
  { cat:"WDO", topic:"Grundsätze", q:"Was beschreibt das Opportunitätsprinzip (§§ 15 Abs. 2, 35 Abs. 1 WDO)?", options:["Ermittlungspflicht ohne Ausnahme","Das 'Ob' und 'Wie' der Ahndung liegt im Ermessen des DiszVorg","Richtervorbehalt für alle Maßnahmen","Beschwerdefrist ist optional"], correct:1, expl:"Opportunitätsprinzip: Während ermittelt werden muss (Legalität), steht die Ahndungsentscheidung im Ermessen des DiszVorg." },
  { cat:"WDO", topic:"Grundsätze", q:"Was besagt die Einheit des Dienstvergehens (§ 18 Abs. 2 WDO)?", options:["Pro Dienstposten nur ein Verfahren","Mehrere Pflichtverletzungen = nur EIN Dienstvergehen","Alle Strafen werden summiert","Disziplinar- und Strafverfahren laufen zusammen"], correct:1, expl:"§ 18 Abs. 2 WDO: Einheit des Dienstvergehens – selbst wenn mehrere §§ verletzt werden, gibt es immer nur ein Dienstvergehen, das einheitlich geahndet wird." },
  { cat:"WDO", topic:"Grundsätze", q:"Wie lange dauert die Verjährungsfrist für einfache Disziplinarmaßnahmen (§ 17 Abs. 2 WDO)?", options:["3 Monate","6 Monate ab Tatbegehung","12 Monate","24 Monate"], correct:1, expl:"§ 17 Abs. 2 WDO: Verjährung nach 6 Monaten ab Tatbegehung bzw. Beendigung des Dienstvergehens. Kenntnisnahme durch DiszVorg ist irrelevant!" },
  { cat:"WDO", topic:"Ablauf", q:"Welche Reihenfolge gilt im einfachen Disziplinarverfahren?", options:["Maßnahme – Ermittlungen – VP – Schlussgehör","Verdacht – Zuständigkeit – Ermittlungen – VP-Anhörung – Schlussgehör – Nachtfrist – Verhängung – Vollstreckung","Beschwerde – Vollstreckung – Ermittlungen","Schlussgehör – Verdacht – Zuständigkeit – Verhängung"], correct:1, expl:"Die WDO-Reihenfolge ist Pflichtlernstoff: Verdacht → Zuständigkeit → Ermittlungen → VP-Anhörung → Schlussgehör → Nachtfrist → Verhängung → Vollstreckung." },
  { cat:"WDO", topic:"Zuständigkeit", q:"Wer ist nach § 29 WDO grundsätzlich zuständig?", options:["Der ranghöchste Soldat der Einheit","Der nächste Disziplinarvorgesetzte des verdächtigen Soldaten","Der Kompaniefeldwebel","Die Vertrauensperson"], correct:1, expl:"§ 29 WDO: Grundsätzlich ist der NÄCHSTE Disziplinarvorgesetzte des verdächtigen Soldaten zuständig." },
  { cat:"WDO", topic:"Zuständigkeit", q:"Wofür steht die KUK-Regel?", options:["Kommando, Urlaub, Kontrolle","Krankheit, Urlaub, Kommandierung – Vertretungsfälle mit automatischem Zuständigkeitsübergang","Kaserne, Unterkunft, Kompanie","Keine Untersuchung, keine Kontrolle"], correct:1, expl:"KUK = Krankheit, Urlaub, Kommandierung: In diesen Fällen geht die Zuständigkeit automatisch auf den Stellvertreter über. Dienstreise ist kein KUK-Fall!" },
  { cat:"WDO", topic:"Zuständigkeit", q:"Wann wechselt die Zuständigkeit nach § 30 Abs. 1 WDO automatisch (von Amts wegen)?", options:["Immer wenn der DiszVorg das möchte","Wenn DiszVorg selbst beteiligt ist, Täter gleichen/höheren Dienstgrad hat, VP der Täter ist, oder DiszVorg nicht erreichbar und sofortiges Einschreiten nötig","Nur nach Antrag des Beschuldigten","Nur bei Straftaten"], correct:1, expl:"§ 30 Abs. 1 WDO: Automatischer Wechsel von Amts wegen bei vier abschließenden Fallgruppen. Meldung nach § 30 Abs. 3 ist deklaratorisch." },
  { cat:"WDO", topic:"Zuständigkeit", q:"Wann wechselt die Zuständigkeit nach § 30 Abs. 2 WDO erst nach Meldung?", options:["Bei allen Zuständigkeitswechseln","Wenn DiszVorg Befugnis für nicht ausreichend hält, persönlich verletzt ist oder sich für befangen hält","Nur auf Antrag des Beschuldigten","Nur bei Disziplinarbußen"], correct:1, expl:"§ 30 Abs. 2 WDO: Wechsel erst nach Meldung (konstitutiv) wenn DiszVorg Befugnis für unzureichend hält, persönlich verletzt ist oder befangen." },
  { cat:"WDO", topic:"Zuständigkeit", q:"Welche Disziplinarmaßnahmen darf ein Kompaniechef (1. Stufe) gegen einen Offizier maximal verhängen?", options:["Alle einfachen Disziplinarmaßnahmen","Nur den einfachen Verweis","Arrest bis 21 Tage","Beförderungsverbot"], correct:1, expl:"§ 28 WDO, 1. Stufe gegen Offiziere: Nur einfacher Verweis. Gegen Unteroffiziere/Mannschaften darf die 1. Stufe alle einfachen Maßnahmen inkl. Arrest bis 7 Tage verhängen." },
  { cat:"WDO", topic:"Ermittlungen", q:"Was darf an einen Offizier delegiert werden?", options:["Die Ahndungsentscheidung","Die gesamte Sachverhaltsaufklärung (nicht die Ahndungsentscheidung!)","Die VP-Anhörung","Die Verhängung der Maßnahme"], correct:1, expl:"§ 32 Abs. 2 WDO: Delegierbar ist die Sachverhaltsaufklärung an einen Offizier. Die Ahndungsentscheidung (ob und wie geahndet wird) bleibt beim DiszVorg." },
  { cat:"WDO", topic:"Ermittlungen", q:"Was muss nach § 32 Abs. 3 WDO ermittelt werden?", options:["Nur belastende Umstände","Nur entlastende Umstände","Belastende UND entlastende Umstände","Nur das Vorbringen der VP"], correct:2, expl:"§ 32 Abs. 3 WDO: Umfassende Ermittlung – belastende UND entlastende Umstände sowie alle für Art und Höhe der Maßnahme bedeutsamen Umstände." },
  { cat:"WDO", topic:"Ermittlungen", q:"Welche Kriterien sind nach § 38 WDO für die Maßnahmebemessung relevant?", options:["Nur Schwere der Tat","Eigenart/Schwere des DV, Auswirkungen, Schuldmaß, Persönlichkeit, bisherige Führung, Beweggründe","Nur Vorstrafen","Nur der Dienstgrad"], correct:1, expl:"§ 38 WDO: Maßnahmebemessung berücksichtigt: Eigenart/Schwere des DV, Auswirkungen (Dienstbetrieb, Öffentlichkeit), Maß der Schuld, Persönlichkeit, bisherige Führung, Beweggründe." },
  { cat:"WDO", topic:"Vernehmung", q:"Worüber muss ein beschuldigter Soldat bei der Vernehmung belehrt werden?", options:["Nur über die Wahrheitspflicht","Tatvorwurf, Aussageverweigerungsrecht und Wahrheitspflicht (§ 32 Abs. 4 WDO)","Nur über sein Recht auf Anwalt","Belehrung ist optional"], correct:1, expl:"§ 32 Abs. 4 WDO: Eröffnung Tatvorwurf (Satz 2), Aussageverweigerungsrecht (Satz 3), Wahrheitspflicht bei Aussage (Satz 4) – alle drei Punkte sind Pflicht." },
  { cat:"WDO", topic:"Vernehmung", q:"Dürfen zivile externe Zeugen zwangsweise vernommen werden?", options:["Ja, wie Soldaten auch","Nein – nur auf freiwilliger Basis","Ja, mit TDG-Anordnung","Nein, dürfen nie befragt werden"], correct:1, expl:"Zivile externe Zeugen können im Disziplinarverfahren nur auf freiwilliger Basis vernommen werden – keine Zwangsmittel möglich." },
  { cat:"WDO", topic:"Durchsuchung", q:"Wer ordnet eine Durchsuchung nach § 20 WDO grundsätzlich an?", options:["Der DiszVorg selbst","Das Truppendienstgericht (TDG); Ausnahme: Gefahr im Verzug","Der Kompaniefeldwebel","Die Vertrauensperson"], correct:1, expl:"§ 20 WDO: Vorherige Anordnung durch das TDG ist erforderlich. Ausnahme: Gefahr im Verzug (§ 20 Abs. 2 WDO)." },
  { cat:"WDO", topic:"Durchsuchung", q:"Was ist der Unterschied zwischen Durchsuchung und Spindkontrolle?", options:["Kein Unterschied","Spindkontrolle zur Ordnung/Sauberkeit ist keine Durchsuchung und braucht keine TDG-Anordnung","Spindkontrolle ist nie zulässig","Beide brauchen TDG-Anordnung"], correct:1, expl:"Spindkontrolle zur Überprüfung von Ordnung und Sauberkeit ist klar von der gezielten Durchsuchung nach Beweismitteln abzugrenzen." },
  { cat:"WDO", topic:"VP-Anhörung", q:"VP-Anhörung und Schlussgehör – wie sind sie zu unterscheiden?", options:["Beides ist dasselbe","VP-Anhörung: zur Person/Sachverhalt/Maßnahme VOR dem Schlussgehör. Schlussgehör: letztes Wort des Beschuldigten nach der VP-Anhörung","VP-Anhörung ist optional, Schlussgehör Pflicht","Schlussgehör findet immer zuerst statt"], correct:1, expl:"Zwei getrennte Verfahrensschritte: VP-Anhörung (§ 28 SBG) kommt VOR dem Schlussgehör. Verwechslung ist die häufigste Prüfungsfalle!" },
  { cat:"WDO", topic:"VP-Anhörung", q:"Worüber wird die Vertrauensperson bei der Anhörung informiert?", options:["Nur über die Person des Beschuldigten","Zur Person, zum Sachverhalt und zum beabsichtigten Disziplinarmaß (§ 28 SBG)","Nur über das Strafmaß","Gar nichts – nur Formsache"], correct:1, expl:"§ 28 SBG: VP-Anhörung zur Person des Beschuldigten, zum Sachverhalt und zum beabsichtigten Disziplinarmaß." },
  { cat:"WDO", topic:"Schlussgehör", q:"Welche Form ist beim Schlussgehör zwingend vorgeschrieben?", options:["Mündlich genügt immer","Schriftform zwingend (§ 32 Abs. 5 Satz 2 WDO)","Form ist beliebig","Nur per Email"], correct:1, expl:"§ 32 Abs. 5 Satz 2 WDO: Schriftform beim Schlussgehör ist zwingend – Formfehler macht das Verfahren angreifbar." },
  { cat:"WDO", topic:"Schlussgehör", q:"Was ist das Schlussgehör rechtlich?", options:["Eine zweite Vernehmung","Das 'letzte Wort' des Beschuldigten vor der Entscheidung (Art. 103 Abs. 1 GG)","Die Bekanntgabe der Maßnahme","Die Anhörung der VP"], correct:1, expl:"Das Schlussgehör gibt dem Beschuldigten das 'letzte Wort' vor der Entscheidung (Art. 103 Abs. 1 GG – rechtliches Gehör). Spätester Zeitpunkt für umfassende Akteneinsicht." },
  { cat:"WDO", topic:"Nachtfrist", q:"Wann darf nach dem Schlussgehör frühestens verhängt werden?", options:["Sofort am selben Tag","Erst nach Ablauf einer Nacht (22:00–06:00 Uhr)","Erst nach 48 Stunden","Erst nach 1 Woche"], correct:1, expl:"§ 37 Abs. 1 WDO: Zwischen Schlussgehör und Verhängung muss eine Nacht (22:00–06:00 Uhr) liegen." },
  { cat:"WDO", topic:"Verhängung", q:"Was ist die 'dienstliche Bekanntgabe' bei der Verhängung?", options:["Aushang am schwarzen Brett","Vorlesen des Tenors + Aushändigen der D-Verfügung gegen Empfangsbekenntnis","SMS an den Betroffenen","Gilt automatisch nach 24 Stunden"], correct:1, expl:"Verhängung = dienstliche Bekanntgabe = Vorlesen des Tenors und Aushändigen der Disziplinarverfügung gegen Empfangsbekenntnis. Verhängung ≠ Vollstreckung!" },
  { cat:"WDO", topic:"Verhängung", q:"Kann ein DiszVorg eine selbst verhängte Maßnahme nachträglich aufheben?", options:["Ja, jederzeit","Nein – § 37 Abs. 5 WDO. Aufhebung nur durch Beschwerde oder Dienstaufsicht","Ja, innerhalb 24 Stunden","Nur mit Zustimmung des Beschuldigten"], correct:1, expl:"§ 37 Abs. 5 WDO: Der DiszVorg kann eine von ihm verhängte Maßnahme grundsätzlich NICHT mehr aufheben oder ändern. Aufhebung nur durch Beschwerde (§ 42 WDO) oder Dienstaufsicht." },
  { cat:"WDO", topic:"Vollstreckung", q:"Welche Maßnahme ist bereits mit der Verhängung vollstreckt?", options:["Strenger Verweis","Einfacher Verweis (§ 52 Abs. 1 WDO)","Disziplinarbuße","Arrest"], correct:1, expl:"§ 52 Abs. 1 WDO: Der einfache Verweis ist ein Sonderfall – 'mit dem Verhängen vollstreckt'. Keine gesonderte Vollstreckung." },
  { cat:"WDO", topic:"Vollstreckung", q:"Wann beginnt die Vollstreckung frühestens nach der Verhängung?", options:["Noch am selben Tag","Am nächsten Tag, idR nach 13:00 Uhr (§ 49 Abs. 1 WDO)","Erst nach Ablauf der Beschwerdefrist","Erst nach 1 Woche"], correct:1, expl:"§ 49 Abs. 1 WDO: Frühestens am Tag nach der Verhängung, wenn der Soldat 'ausreichend Zeit hatte' – in der Praxis meist nach 13:00 Uhr." },
  { cat:"WDO", topic:"Fristen", q:"Wie lange dauert die Beschwerdefrist bei Disziplinarmaßnahmen und wann beginnt sie frühestens?", options:["1 Woche – sofort nach Verhängung","1 Monat (§ 42 WDO i.V.m. § 6 WBO) – frühestens nach 1 Nacht (22–06 Uhr) nach Verhängung","6 Monate – sofort","Keine Frist"], correct:1, expl:"Beschwerdefrist: 1 Monat. Frühestens nach der Nachtfrist (22–06 Uhr) nach Verhängung. Verjährung der Vollstreckung: 6 Monate nach Unanfechtbarkeit (§ 59 WDO)." },
  { cat:"WDO", topic:"Fristen", q:"Wann verjährt die Vollstreckung einer Disziplinarmaßnahme?", options:["6 Monate nach Verhängung","6 Monate nach Unanfechtbarkeit (§ 59 WDO)","1 Monat nach Verhängung","Vollstreckung verjährt nie"], correct:1, expl:"§ 59 WDO: Die Vollstreckungsverjährung tritt 6 Monate nach Eintritt der Unanfechtbarkeit ein – nicht ab Verhängung!" },
  { cat:"WDO", topic:"Muss/Soll/Kann", q:"Was bedeutet Muss-Abgabe an die Staatsanwaltschaft?", options:["Kein Ermessen – Abgabe immer zwingend","Regelfall mit Ausnahmemöglichkeit","Freies Ermessen","Abgabe nur auf Antrag"], correct:0, expl:"MUSS-Abgabe (A-2160/6 Abschn. 1.9.8): Kein Ermessen – bestimmte Straftaten sind ohne Ausnahme stets an die Staatsanwaltschaft abzugeben." },
  { cat:"WDO", topic:"Muss/Soll/Kann", q:"Was bedeutet Soll-Abgabe an die Staatsanwaltschaft?", options:["Zwingend ohne jede Ausnahme","Regelfall – Ausnahme nur im Einvernehmen mit dem Rechtsberater möglich","Freies Ermessen","Abgabe verboten"], correct:1, expl:"SOLL-Abgabe (A-2160/6 Abschn. 1.9.9): Grundsätzlich abzugeben – Ausnahme ist nur im Einvernehmen mit dem Rechtsberater möglich." },
  { cat:"WDO", topic:"EZM", q:"Was sind Erzieherische Maßnahmen (EZM) und brauchen sie ein Dienstvergehen?", options:["Disziplinarmaßnahmen – immer Dienstvergehen nötig","Keine Disziplinarmaßnahmen, kein Sanktionscharakter, kein Dienstvergehen nötig","Gerichtliche Maßnahmen","Immer Arrest"], correct:1, expl:"EZM (ZDV A-2160/6) haben keinen Sanktionscharakter und setzen kein Dienstvergehen voraus – sie sind von Disziplinarmaßnahmen grundsätzlich zu unterscheiden." },

  // ══════════════════════════════════════════════
  // WBO – 21 Fragen
  // ══════════════════════════════════════════════
  { cat:"WBO", topic:"Grundregel", q:"Was ist bei jeder WBO-Prüfung allererster Schritt?", options:["Frist berechnen","Beschwerdeart bestimmen","Begründetheit prüfen","Beschwerdebescheid formulieren"], correct:1, expl:"Grundregel: Immer ZUERST die Beschwerdeart bestimmen. Eine falsche Einordnung macht die gesamte weitere Prüfung falsch." },
  { cat:"WBO", topic:"Beschwerdearten", q:"Gegen was richtet sich eine Disziplinarbeschwerde?", options:["Handlungen eines Kameraden","Eine bereits verhängte Disziplinarmaßnahme (§ 42 WDO i.V.m. § 6 WBO)","Verwaltungsentscheidungen","Handlungen eines Vorgesetzten"], correct:1, expl:"Disziplinarbeschwerde (§ 42 WDO i.V.m. § 6 WBO): Richtet sich ausschließlich gegen verhängte Disziplinarmaßnahmen." },
  { cat:"WBO", topic:"Beschwerdearten", q:"Gegen was richtet sich eine Kameradenbeschwerde?", options:["Eine verhängte Disziplinarmaßnahme","Handlungen eines gleichrangigen Kameraden (nicht Vorgesetzter)","Verwaltungsentscheidungen","Handlungen der Bundesregierung"], correct:1, expl:"Kameradenbeschwerde (§§ 1, 6 WBO): Gegen Handlungen eines gleichrangigen Kameraden – nicht eines Vorgesetzten." },
  { cat:"WBO", topic:"Beschwerdearten", q:"Was ist der wesentliche Unterschied zwischen Vorgesetzten- und Kameradenbeschwerde?", options:["Es gibt keinen Unterschied","Bei Vorgesetztenbeschwerde ist weiterer Rechtsweg zum TDG möglich, bei Kameradenbeschwerde NICHT","Kameradenbeschwerde hat keine Frist","Vorgesetztenbeschwerde ist immer unzulässig"], correct:1, expl:"Kernunterschied: Vorgesetztenbeschwerde öffnet den Weg zum Truppendienstgericht. Kameradenbeschwerde: kein weiterer Rechtsweg zum TDG." },
  { cat:"WBO", topic:"Zuständigkeit", q:"Wer entscheidet bei einer Kameradenbeschwerde?", options:["Der ranghöhere der beiden Beteiligten","Der nächste gemeinsame Disziplinarvorgesetzte beider Beteiligter (§ 9 WBO)","Das Truppendienstgericht direkt","Der Wehrbeauftragte"], correct:1, expl:"§ 9 WBO: Zuständig für die Entscheidung über eine Kameradenbeschwerde ist der nächste gemeinsame DiszVorg beider Beteiligter." },
  { cat:"WBO", topic:"Zuständigkeit", q:"Wer entscheidet über eine Disziplinarbeschwerde gegen eine Maßnahme des Kompaniechefs?", options:["Der Kompaniechef selbst, endgültig","Der nächsthöhere DiszVorg des verhängenden DiszVorg (§ 42 Abs. 1 WDO)","Der Verteidigungsminister","Die Vertrauensperson"], correct:1, expl:"§ 42 Abs. 1 WDO: Zuständig ist der nächsthöhere DiszVorg des verhängenden DiszVorg. Die Beschwerde kann aber bei ihm oder dem verhängenden DiszVorg eingelegt werden." },
  { cat:"WBO", topic:"Zulässigkeit", q:"Welches Schema gehört zur Zulässigkeit einer Beschwerde?", options:["Sachverhalt – Zulässigkeit – Begründetheit – Entscheidung","Statthaftigkeit – Form – Frist – Beschwer","Tatbestand – Rechtswidrigkeit – Schuld","VP – Schlussgehör – Nachtfrist"], correct:1, expl:"Zulässigkeitsschema: 1. Statthaftigkeit, 2. Form, 3. Frist, 4. Beschwer – in dieser Reihenfolge zu prüfen." },
  { cat:"WBO", topic:"Zulässigkeit", q:"Was bedeutet 'Statthaftigkeit' im Zulässigkeitsschema?", options:["Ob die Frist eingehalten ist","Ob die gewählte Beschwerdeart die richtige ist","Ob der Beschwerdeführer Offizier ist","Ob das Formblatt korrekt ausgefüllt ist"], correct:1, expl:"Statthaftigkeit: Ist die gewählte Beschwerdeart (Disziplinarbeschwerde, Vorgesetztenbeschwerde, Kameradenbeschwerde, Verwaltungsbeschwerde) die richtige für den konkreten Sachverhalt?" },
  { cat:"WBO", topic:"Zulässigkeit", q:"In welcher Form muss eine Beschwerde erhoben werden?", options:["Mündlich genügt immer","Schriftlich oder zur Niederschrift (§ 9 Abs. 1 WBO)","Per E-Mail","Formlos"], correct:1, expl:"§ 9 Abs. 1 WBO: Beschwerde muss schriftlich oder zur Niederschrift eingelegt werden. Digitale Formen sind problematisch." },
  { cat:"WBO", topic:"Beschwer", q:"Was bedeutet 'Beschwer' im Beschwerderecht?", options:["Allgemeines Interesse an der Sache","Verletzung eigener Rechte des Beschwerdeführers","Dienstgrad des Beschwerdeführers","Formale Einreichung der Beschwerde"], correct:1, expl:"Beschwer = Verletzung EIGENER Rechte. Allgemeines Interesse genügt nicht – persönliche Betroffenheit in eigenen Rechten ist erforderlich." },
  { cat:"WBO", topic:"Beschwer", q:"Sind Gruppenbeschwerden mehrerer Soldaten gemeinsam zulässig?", options:["Ja, immer","Nein – grundsätzlich unzulässig (§ 1 Abs. 4 WBO)","Nur ab 5 Personen","Nur bei Offizieren"], correct:1, expl:"§ 1 Abs. 4 WBO: Gruppenbeschwerden sind grundsätzlich unzulässig. Jeder Soldat muss seine Beschwerde individuell einlegen." },
  { cat:"WBO", topic:"Fristen", q:"Wie lang ist die allgemeine Beschwerdefrist nach § 6 Abs. 1 WBO?", options:["2 Wochen","1 Monat ab Kenntnis der Maßnahme/Handlung","3 Monate","6 Monate"], correct:1, expl:"§ 6 Abs. 1 WBO: Die Beschwerde muss innerhalb eines Monats ab Kenntnis der Maßnahme oder Handlung eingelegt werden." },
  { cat:"WBO", topic:"Fristen", q:"Wann kann eine Disziplinarbeschwerde frühestens eingelegt werden?", options:["Sofort nach der Tat","Erst nach Ablauf einer Nacht (22–06 Uhr) nach Verhängung (§ 42 Abs. 3 WDO)","Erst nach Ablauf der gesamten Beschwerdefrist","Frühestens nach 1 Woche"], correct:1, expl:"§ 42 Abs. 3 WDO: Wie bei der Verhängung selbst gilt auch für die Disziplinarbeschwerde eine Nachtfrist." },
  { cat:"WBO", topic:"Fristen", q:"Das Fristende einer Beschwerde fällt auf einen Sonntag. Was gilt?", options:["Frist endet trotzdem am Sonntag","Das Fristende verschiebt sich auf den nächsten Werktag","Beschwerde automatisch unzulässig","Frist verlängert sich um eine Woche"], correct:1, expl:"Fällt das Fristende auf Samstag, Sonntag oder Feiertag, verschiebt sich das Ende auf den nächsten Werktag (analog § 43 StPO)." },
  { cat:"WBO", topic:"Fristen", q:"Wie lange hat die zuständige Stelle für die Entscheidung über eine Beschwerde?", options:["1 Woche","1 Monat (§ 11 Abs. 1 WBO)","3 Monate","Keine Frist"], correct:1, expl:"§ 11 Abs. 1 WBO: Grundsätzlich 1 Monat Entscheidungsfrist. Bei Überschreitung muss dies dem Beschwerdeführer mit Begründung mitgeteilt werden." },
  { cat:"WBO", topic:"Beschwerdebescheid", q:"Wie ist ein Beschwerdebescheid aufgebaut?", options:["Sachverhalt – Zulässigkeit – Begründetheit – Entscheidung","Verdacht – VP – Nachtfrist – Maßnahme","Tatbestand – Schuld – Strafe","Nur Ergebnis"], correct:0, expl:"Aufbau Beschwerdebescheid: 1. Sachverhalt, 2. Zulässigkeit (Statthaftigkeit/Form/Frist/Beschwer), 3. Begründetheit, 4. Entscheidung." },
  { cat:"WBO", topic:"Beschwerdebescheid", q:"Welche Entscheidungsmöglichkeiten gibt es im Beschwerdebescheid?", options:["Nur Stattgabe oder Ablehnung","Stattgabe, Zurückweisung als unbegründet, Verwerfung als unzulässig, Teilentscheidungen","Nur Verwerfung als unzulässig","Immer Disziplinarmaßnahme als Ergebnis"], correct:1, expl:"Entscheidungsoptionen: Stattgabe (begründet + zulässig), Zurückweisung (unbegründet), Verwerfung (unzulässig), teilweise Stattgabe/Zurückweisung." },
  { cat:"WBO", topic:"Beschwerdebescheid", q:"Wann ist eine Beschwerde 'begründet'?", options:["Wenn sie formal korrekt eingereicht wurde","Wenn die gerügte Maßnahme rechtswidrig war UND eigene Rechte des Beschwerdeführers verletzt wurden","Wenn der Beschwerdeführer Offizier ist","Automatisch wenn die Frist eingehalten wurde"], correct:1, expl:"Begründetheit: Angegriffene Maßnahme war rechtswidrig UND der Beschwerdeführer wurde dadurch in eigenen Rechten verletzt." },
  { cat:"WBO", topic:"Fallbeispiel", q:"OG A tritt OG U (gleichrangige Kameradin) absichtlich auf den Fuß. U reicht 2 Tage später schriftlich eine Beschwerde bei Maj F. (gemeinsamem DiszVorg) ein. Welche Beschwerdeart liegt vor?", options:["Disziplinarbeschwerde","Vorgesetztenbeschwerde","Kameradenbeschwerde","Verwaltungsbeschwerde"], correct:2, expl:"Kameradenbeschwerde: OG A ist kein Vorgesetzter der OG U, sondern gleichrangiger Kamerad. Die Beschwerde richtet sich gegen eine Handlung des Kameraden." },
  { cat:"WBO", topic:"Fallbeispiel", q:"Maj F. verhängt am Mittwoch 22.06. eine Disziplinarbuße gegen OG A. Wann kann OG A frühestens Beschwerde einlegen?", options:["Noch am Mittwoch Abend","Donnerstag, 23.06. ab 06:00 Uhr (nach der Nacht)","Erst Freitag, 24.06.","Erst nach 1 Woche"], correct:1, expl:"§ 42 Abs. 3 WDO: Frühestens nach Ablauf einer Nacht (22–06 Uhr) nach der Verhängung. Verhängung Mittwoch → frühestens Donnerstag ab 06:00 Uhr." },
  { cat:"WBO", topic:"Fallbeispiel", q:"Wann endet die Beschwerdefrist wenn die Disziplinarbuße am Mittwoch, 22.06. verhängt wurde?", options:["Mittwoch, 22.07., 24:00 Uhr","Samstag, 22.07., 24:00 Uhr – oder nächster Werktag wenn Wochenende/Feiertag","Sofort nach Verhängung","Niemals – Disziplinarbußen sind nicht anfechtbar"], correct:0, expl:"§ 42 WDO i.V.m. § 6 WBO: 1 Monat ab Verhängung (22.06.) = Mittwoch, 22.07., 24:00 Uhr. Unanfechtbar ab Donnerstag, 23.07., 0:00 Uhr." },
];

// ─────────────────────────────────────────────────────────────────────────
// KATEGORIE-STYLING
// ─────────────────────────────────────────────────────────────────────────
const CAT_STYLES = {
  GG:           { bg:"#1A3A5C", light:"#E6EEF5", accent:"#1A6B9A", icon:Shield, label:"Verfassungsrecht" },
  SG:           { bg:"#7A4419", light:"#FBF1E6", accent:"#B5651D", icon:BookOpen, label:"Soldatengesetz" },
  VorgV:        { bg:"#4B2E83", light:"#F1ECFA", accent:"#6A4BBC", icon:Scale, label:"Vorgesetztenverordnung" },
  Befehlsrecht: { bg:"#5C2E2E", light:"#FAEEEE", accent:"#A94A4A", icon:Shield, label:"Befehlsrecht" },
  Strafrecht:   { bg:"#3A3A3A", light:"#EFEFEF", accent:"#555555", icon:Scale, label:"Strafrecht / WStG" },
  WDO:          { bg:"#1F3864", light:"#E8EDF5", accent:"#2E5F8A", icon:Shield, label:"Disziplinarrecht" },
  WBO:          { bg:"#1E5631", light:"#E9F5EC", accent:"#2D7A45", icon:BookOpen, label:"Beschwerderecht" },
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
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});

  const filteredQuestions = useMemo(
    () => QUESTIONS.filter(q => activeCats.includes(q.cat)),
    [activeCats]
  );

  function startQuiz() {
    const ord = shuffle(filteredQuestions.map((_, i) => i));
    setOrder(ord); setIdx(0); setSelected(null); setRevealed(false); setAnswers({});
    setStage("quiz");
  }

  function toggleCat(cat) {
    setActiveCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  function selectOption(i) { if (!revealed) setSelected(i); }

  function confirmAnswer() {
    if (selected === null) return;
    const qRef = filteredQuestions[order[idx]];
    setAnswers(prev => ({ ...prev, [idx]: { selected, correct: selected === qRef.correct } }));
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= order.length) setStage("result");
    else { setIdx(idx + 1); setSelected(null); setRevealed(false); }
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

  // ── START ──
  if (stage === "start") {
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", backgroundImage:"radial-gradient(circle at 20% 20%, rgba(46,95,138,0.25), transparent 50%)", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:620, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", marginBottom:20, boxShadow:"0 8px 24px rgba(46,95,138,0.4)" }}><Award size={30} color="#fff" /></div>
            <div style={{ fontSize:12, letterSpacing:3, color:"#7FA8D9", fontWeight:600, marginBottom:8 }}>BUNDESWEHR OFFIZIERSLEHRGANG</div>
            <h1 style={{ fontSize:32, fontWeight:800, margin:0 }}>Prüfungs-Quiz Recht</h1>
            <p style={{ color:"#A8BAD0", fontSize:15, marginTop:8, lineHeight:1.5 }}>{QUESTIONS.length} Fragen · 7 Themenbereiche · Duplikatfrei</p>
          </div>

          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:24, marginBottom:20 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:14 }}>THEMENBEREICHE WÄHLEN</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {Object.entries(CAT_STYLES).map(([cat, style]) => {
                const Icon = style.icon;
                const active = activeCats.includes(cat);
                const count = QUESTIONS.filter(q => q.cat === cat).length;
                return (
                  <button key={cat} onClick={() => toggleCat(cat)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:12, border:`2px solid ${active ? style.accent : "rgba(255,255,255,0.08)"}`, background:active ? `${style.accent}22` : "rgba(255,255,255,0.02)", cursor:"pointer", color:"#fff", textAlign:"left" }}>
                    <div style={{ width:36, height:36, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", background:active ? style.accent : "rgba(255,255,255,0.08)", flexShrink:0 }}><Icon size={16} color="#fff" /></div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{style.label}</div>
                      <div style={{ fontSize:12, color:"#8FA3BC" }}>{count} Fragen</div>
                    </div>
                    <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${active ? style.accent : "rgba(255,255,255,0.25)"}`, background:active ? style.accent : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {active && <Check size={13} color="#fff" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={startQuiz} disabled={filteredQuestions.length === 0} style={{ width:"100%", padding:"15px", borderRadius:12, border:"none", background:filteredQuestions.length === 0 ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 8px 20px rgba(46,95,138,0.4)" }}>
            Quiz starten ({filteredQuestions.length} Fragen) <ChevronRight size={18} />
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
      const q = filteredQuestions[qi];
      if (!byTopic[q.cat]) byTopic[q.cat] = { correct:0, total:0 };
      byTopic[q.cat].total++;
      if (answers[i]?.correct) byTopic[q.cat].correct++;
    });
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:540, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ width:100, height:100, borderRadius:"50%", margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center", background:`conic-gradient(#2E5F8A ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }}>
              <div style={{ width:80, height:80, borderRadius:"50%", background:"#0F1B2D", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:24, fontWeight:800 }}>{pct}%</div>
              </div>
            </div>
            <h2 style={{ fontSize:22, fontWeight:800, margin:"0 0 6px" }}>{score} von {order.length} richtig</h2>
            <p style={{ color:"#A8BAD0", fontSize:14 }}>{pct >= 80 ? "Sehr gut – du bist gut vorbereitet!" : pct >= 60 ? "Solide Basis – gezielt wiederholen!" : "Nochmal die Kompaktunterlagen anschauen."}</p>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:18, marginBottom:20 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:12 }}>ERGEBNIS NACH THEMA</div>
            {Object.entries(byTopic).map(([cat, stats]) => {
              const style = CAT_STYLES[cat]; const p = Math.round((stats.correct / stats.total) * 100);
              return (<div key={cat} style={{ marginBottom:12 }}><div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:5 }}><span style={{ fontWeight:600 }}>{style.label}</span><span style={{ color:"#A8BAD0" }}>{stats.correct}/{stats.total}</span></div><div style={{ height:7, borderRadius:4, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}><div style={{ height:"100%", width:`${p}%`, background:style.accent, borderRadius:4 }} /></div></div>);
            })}
          </div>
          <button onClick={restart} style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <RotateCcw size={16} /> Neues Quiz starten
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  const q = filteredQuestions[order[idx]];
  const style = CAT_STYLES[q.cat];
  const Icon = style.icon;
  const progress = (idx / order.length) * 100;

  return (
    <div style={{ minHeight:"100vh", background:"#F5F3EE", fontFamily:"Inter,system-ui,sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"20px 16px" }}>
      <div style={{ maxWidth:640, width:"100%" }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#666", marginBottom:5, fontWeight:600 }}>
            <span>Frage {idx + 1} von {order.length}</span>
            <span>{score}/{totalAnswered} richtig</span>
          </div>
          <div style={{ height:5, borderRadius:3, background:"#E2DFD6", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:style.accent, borderRadius:3, transition:"width 0.3s" }} />
          </div>
        </div>

        <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 12px", borderRadius:20, background:style.light, marginBottom:14 }}>
          <Icon size={13} color={style.accent} />
          <span style={{ fontSize:12, fontWeight:700, color:style.accent }}>{style.label} · {q.topic}</span>
        </div>

        <h2 style={{ fontSize:19, fontWeight:700, color:"#1A1A1A", lineHeight:1.4, marginBottom:18 }}>{q.q}</h2>

        <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:18 }}>
          {q.options.map((opt, i) => {
            let bg="#fff", border="#E2DFD6", textColor="#1A1A1A", icon=null;
            if (revealed) {
              if (i === q.correct) { bg="#E9F7EF"; border="#1E6B1E"; textColor="#14401A"; icon=<Check size={16} color="#1E6B1E" strokeWidth={3}/>; }
              else if (i === selected) { bg="#FADBD8"; border="#C0392B"; textColor="#7B241C"; icon=<X size={16} color="#C0392B" strokeWidth={3}/>; }
              else { bg="#fafafa"; textColor="#999"; }
            } else if (i === selected) { bg=style.light; border=style.accent; }
            return (
              <button key={i} onClick={() => selectOption(i)} disabled={revealed} style={{ display:"flex", alignItems:"center", gap:11, textAlign:"left", padding:"12px 14px", borderRadius:11, border:`2px solid ${border}`, background:bg, color:textColor, fontSize:14, fontWeight:500, cursor:revealed?"default":"pointer", transition:"all 0.12s" }}>
                <span style={{ width:24, height:24, borderRadius:"50%", flexShrink:0, border:`2px solid ${revealed?"transparent":(i===selected?style.accent:"#CCC")}`, background:revealed?"transparent":(i===selected?style.accent:"transparent"), display:"flex", alignItems:"center", justifyContent:"center", fontSize:11.5, fontWeight:700, color:i===selected&&!revealed?"#fff":"#888" }}>
                  {revealed ? icon : String.fromCharCode(65+i)}
                </span>
                <span style={{ flex:1 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{ background:answers[idx]?.correct?"#E9F7EF":"#FFF8E1", border:`1px solid ${answers[idx]?.correct?"#1E6B1E33":"#F0B42933"}`, borderRadius:11, padding:"14px 16px", marginBottom:18, fontSize:13.5, lineHeight:1.55, color:"#333" }}>
            <div style={{ fontWeight:700, marginBottom:5, color:answers[idx]?.correct?"#1E6B1E":"#8A6D1A" }}>{answers[idx]?.correct?"Richtig!":"Nicht ganz."}</div>
            {q.expl}
          </div>
        )}

        <div style={{ display:"flex", gap:9 }}>
          <button onClick={prev} disabled={idx===0} style={{ padding:"12px 16px", borderRadius:9, border:"2px solid #E2DFD6", background:"#fff", color:idx===0?"#CCC":"#333", fontWeight:600, fontSize:13, cursor:idx===0?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:5 }}>
            <ChevronLeft size={15}/> Zurück
          </button>
          {!revealed ? (
            <button onClick={confirmAnswer} disabled={selected===null} style={{ flex:1, padding:"12px", borderRadius:9, border:"none", background:selected===null?"#E2DFD6":style.accent, color:"#fff", fontWeight:700, fontSize:14, cursor:selected===null?"not-allowed":"pointer" }}>
              Antwort prüfen
            </button>
          ) : (
            <button onClick={next} style={{ flex:1, padding:"12px", borderRadius:9, border:"none", background:style.accent, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
              {idx+1>=order.length?"Ergebnis anzeigen":"Nächste Frage"} <ChevronRight size={15}/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
