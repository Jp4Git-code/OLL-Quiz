import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award, CheckSquare } from "lucide-react";

const QUESTIONS = [
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Bei welchem Sachverhalt wäre § 13 SG vorrangig zu prüfen?",
    "options": [
      "Alkoholisiert zum Dienst erscheinen.",
      "Falsche Angaben in einer dienstlichen Vernehmung.",
      "Beleidigung eines Kameraden.",
      "Teilnahme an einer politischen Demonstration."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Feldwebel beobachtet während eines Übungsplatzaufenthaltes, dass zwei Untergebene einen dritten Soldaten wiederholt erniedrigen. Er hält dies für „typischen Stubenhumor„ und greift nicht ein. Der betroffene Soldat meldet den Vorfall später. Welche Aussagen treffen zu?\n\n1. Für die handelnden Soldaten kommt §12 SG in Betracht.\n2. Für den Feldwebel kommt §10 Abs.2 SG in Betracht.\n3. Je nach Intensität kann zusätzlich §17 SG einschlägig sein.\n4. Das Unterlassen des Feldwebels ist disziplinarrechtlich ohne Bedeutung.",
    "options": [
      "Nur 1 und 2",
      "Nur 1,2 und 3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Feldwebel erscheint alkoholisiert zum Dienst, beleidigt einen Untergebenen, macht später im Disziplinarverfahren bewusst falsche Angaben, veröffentlicht anschließend ein Video der Situation auf Instagram. Welche soldatischen Pflichten sind mindestens zu prüfen?\n\n1. §7 SG\n2. §12 SG\n3. §13 SG\n4. §17 SG",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Nur 1, 2 und 4",
      "Alle vier"
    ],
    "correct": 3,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Feldwebel erscheint alkoholisiert zum Dienst. Während einer Befragung macht er bewusst falsche Angaben über seinen Alkoholkonsum. Anschließend beleidigt er einen Untergebenen vor der gesamten Kompanie. Welche Pflichten sind mindestens zu prüfen?",
    "options": [
      "§ 7 SG",
      "§ 12 SG",
      "§ 13 SG",
      "§ 17 SG",
      "Alle genannten Normen."
    ],
    "correct": 4,
    "expl": "§ 7 SG: Dienstleistung nicht ordnungsgemäß erbracht. § 13 SG: Falschangaben. § 12 SG: Beleidigung eines Kameraden. § 17 SG: Achtung und Vertrauen in die Bundeswehr können beeinträchtigt sein."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Feldwebelerscheint alkoholisiert zum Dienst, beleidigt einen Kameraden, greift bei einer weiteren Pflichtverletzung eines Untergebenen bewusst nicht ein. Welche soldatischen Pflichten sind mindestens zu prüfen?\n\n1. § 7 SG\n2. § 10 SG\n3. § 12 SG\n4. § 17 SG",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 3",
      "Alle vier",
      "Nur 2 und 4"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Gruppenführer beobachtet eine Körperverletzung zwischen zwei Untergebenen. Er geht weiter, weil „die das schon unter sich klären„. Welche Aussagen treffen zu?\n\n1. Eine Verletzung der Dienstaufsichtspflicht kommt in Betracht.\n2. §12 SG betrifft ausschließlich die beteiligten Soldaten.\n3. Auch das Unterlassen des Vorgesetzten kann ein Dienstvergehen darstellen.\n4. Ein Einschreiten wäre grundsätzlich entbehrlich.",
    "options": [
      "Nur 1",
      "Nur 1 und 3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Gruppenführer beobachtet, wie ein Untergebener regelmäßig gegen Sicherheitsbestimmungen verstößt. Er schreitet bewusst nicht ein. Welche Norm ist für den Gruppenführer vorrangig einschlägig?",
    "options": [
      "§ 7 SG",
      "§ 10 Abs.2 SG",
      "§ 12 SG",
      "§ 13 SG"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Hauptfeldwebel erscheint alkoholisiert zum Dienst, beleidigt einen Untergebenen, ignoriert anschließend bewusst dessen Beschwerde, macht im Disziplinarverfahren falsche Angaben. Welche soldatischen Pflichten sind mindestens zu prüfen?",
    "options": [
      "§7 SG",
      "§10 SG",
      "§12 SG",
      "§13 SG",
      "§17 SG",
      "Alle genannten."
    ],
    "correct": 5,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Kamerad bittet privat um Mitnahme im privaten Auto. Der andere lehnt ab. Welche Aussage trifft zu?",
    "options": [
      "Immer Verstoß gegen § 12 SG.",
      "Keine automatische Pflicht zu privaten Gefälligkeiten.",
      "Nur Offiziere müssen helfen.",
      "§ 12 SG zwingt zu jeder privaten Hilfeleistung."
    ],
    "correct": 1,
    "expl": "Kameradschaftspflicht bedeutet nicht grenzenlose private Gefälligkeitspflicht."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Oberfeldwebel erscheint alkoholisiert zum Dienst, beleidigt zwei Untergebene, unterlässt trotz Kenntnis einer weiteren Pflichtverletzung das Einschreiten, macht später bewusst falsche Angaben gegenüber seinem Disziplinarvorgesetzten. Welche soldatischen Pflichten sind mindestens zu prüfen?\n\n1. §7 SG\n2. §10 SG\n3. §12 SG\n4. §13 SG\n5. §17 SG",
    "options": [
      "Nur 1–4",
      "Nur 2–5",
      "Nur 1, 2, 3 und 5",
      "Alle fünf"
    ],
    "correct": 3,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Oberfeldwebel erscheint alkoholisiert zum Dienst, beleidigt einen Untergebenen, greift trotz Kenntnis einer weiteren Pflichtverletzung nicht ein, macht anschließend im Disziplinarverfahren bewusst falsche Angaben, veröffentlicht später den Vorfall in sozialen Medien. Welche soldatischen Pflichten sind mindestens zu prüfen?",
    "options": [
      "§7 SG",
      "§10 SG",
      "§12 SG",
      "§13 SG",
      "§17 SG",
      "Alle genannten."
    ],
    "correct": 5,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Sachverhalt enthält Alkohol im Dienst, falsche Angaben in der Vernehmung und Beleidigung eines Kameraden. Welche Aussage ist richtig?",
    "options": [
      "Es darf nur eine Norm geprüft werden.",
      "Mehrere soldatische Pflichten können gleichzeitig verletzt sein.",
      "§ 7, § 13 und § 12 SG kommen in Betracht.",
      "Mehrere Pflichtverletzungen können später disziplinarrechtlich als ein Dienstvergehen behandelt werden."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "expl": "Mehrere Pflichtverletzungen sind möglich. Disziplinarrechtlich ist später die Einheit des Dienstvergehens zu beachten."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beleidigt einen Kameraden massiv vor der Gruppe. Welche Pflicht ist naheliegend betroffen?",
    "options": [
      "§ 12 SG wegen Ehre/Würde",
      "§ 8 SG immer automatisch",
      "§ 13 SG",
      "§ 17 SG kann zusätzlich betroffen sein"
    ],
    "correct": [
      0,
      3
    ],
    "expl": "Primär § 12 SG. § 17 SG kann je nach Außenwirkung zusätzlich geprüft werden."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beleidigt einen Kameraden während des Dienstes. Welche Normen können gleichzeitig einschlägig sein?",
    "options": [
      "Nur § 12 SG",
      "Nur § 17 SG",
      "§ 12 SG und § 17 SG",
      "Keine soldatische Pflicht"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beleidigt einen Kameraden, zerstört anschließend Bundeswehrmaterial, lügt danach im Disziplinarverfahren. Welche Pflichtenkombination ist mindestens zu prüfen?",
    "options": [
      "§12 SG",
      "§7 SG",
      "§13 SG",
      "alle genannten"
    ],
    "correct": 3,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beleidigt seinen Gruppenführer während einer Ausbildung. Welche Pflichten kommen vorrangig in Betracht?",
    "options": [
      "§12 SG",
      "§17 SG",
      "§7 SG",
      "Mehrere Pflichten können gleichzeitig verletzt sein."
    ],
    "correct": [
      0,
      1,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beobachtet, wie ein Kamerad Material entwendet. Aus Kameradschaft meldet er den Vorfall nicht. Welche Aussage trifft zu?",
    "options": [
      "Er erfüllt seine Kameradschaftspflicht.",
      "Kameradschaft verlangt niemals das Decken von Pflichtverletzungen.",
      "Es können eigene Pflichtverletzungen entstehen.",
      "Kameradschaft steht über der Rechtsordnung."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beobachtet, wie zwei Kameraden einen dritten Soldaten erniedrigen. Er greift nicht ein und meldet den Vorfall auch später nicht. Welche Aussage trifft zu?",
    "options": [
      "Kameradschaft verlangt, Kameraden grundsätzlich zu schützen, auch wenn sie Dienstvergehen begehen.",
      "Das Verhalten ist rechtlich unproblematisch.",
      "Kameradschaft bedeutet nicht, Pflichtverletzungen zu decken.",
      "Nur die unmittelbar Beteiligten handeln pflichtwidrig."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beschädigt bei einer Übung fahrlässig hochwertige Bundeswehrausrüstung. Welche Pflicht steht zunächst im Vordergrund?",
    "options": [
      "§8 SG",
      "§12 SG",
      "§7 SG",
      "§15 SG"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat beschädigt fahrlässig Bundeswehrmaterial. Welche Pflicht kann betroffen sein?",
    "options": [
      "Vermögenswahrungspflicht aus § 7 SG",
      "Politische Treuepflicht aus § 8 SG",
      "Wahrheitspflicht aus § 13 SG",
      "Wohlverhaltenspflicht aus § 17 SG, je nach Umständen"
    ],
    "correct": [
      0,
      3
    ],
    "expl": "Bei Bundeswehrvermögen liegt § 7 SG nahe. § 17 SG kann zusätzlich berührt sein, wenn Achtung und Vertrauen beeinträchtigt werden."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat besucht privat eine Veranstaltung einer extremistischen Gruppierung. Welche Aussage trifft am ehesten zu?",
    "options": [
      "Schon die bloße Anwesenheit ist immer ein Verstoß gegen § 8 SG.",
      "Es ist zu prüfen, ob seine Haltung nach außen erkennbar manifestiert wurde.",
      "§ 8 SG ist privat nie anwendbar.",
      "Nur eine Parteimitgliedschaft ist relevant."
    ],
    "correct": 1,
    "expl": "Bloße Anwesenheit reicht nicht automatisch. Entscheidend ist der konkrete Auftritt und die erkennbare Unterstützung."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat erhält den Auftrag, ein Fahrzeug einsatzbereit zu machen. Er erscheint pünktlich, führt die vorgeschriebene Kontrolle jedoch bewusst nicht vollständig durch. Während des Einsatzes fällt das Fahrzeug deshalb aus. Welche Pflichtverletzungen kommen in Betracht?",
    "options": [
      "§ 7 SG (Treues Dienen)",
      "§ 12 SG (Kameradschaft)",
      "§ 17 SG (Wohlverhalten)",
      "Keine Pflichtverletzung, da der Auftrag grundsätzlich ausgeführt wurde."
    ],
    "correct": [
      0,
      2
    ],
    "expl": "Treues Dienen verlangt ordnungsgemäße Auftragserfüllung. Das bloße Beginnen einer Aufgabe genügt nicht."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat erhält privat einen Bußgeldbescheid wegen einer geringfügigen Geschwindigkeitsüberschreitung ohne besonderen Bezug zur Bundeswehr. Welche Aussage ist am ehesten richtig?",
    "options": [
      "Immer Dienstvergehen.",
      "Im Regelfall kein automatischer Verstoß gegen § 17 SG.",
      "Immer § 8 SG.",
      "Nur Offiziere können § 17 SG verletzen."
    ],
    "correct": 1,
    "expl": "Außerdienstliches Verhalten ist einzelfallabhängig."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat erscheint alkoholisiert zum Dienst. Während der Befragung beleidigt er seinen Disziplinarvorgesetzten und erklärt anschließend wahrheitswidrig, er habe keinen Alkohol konsumiert. Welche Aussagen treffen zu?\n\n1. § 7 SG kann betroffen sein.\n2. § 13 SG ist hinsichtlich der Aussage zu prüfen.\n3. § 17 SG kann zusätzlich betroffen sein.\n4. Es liegt zwingend nur ein Verstoß gegen § 7 SG vor.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 3",
      "Nur 2 und 4",
      "Alle Aussagen"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat erscheint alkoholisiert zum Dienst. Während der anschließenden Sachverhaltsaufklärung beleidigt er seinen Disziplinarvorgesetzten und macht bewusst falsche Angaben. Welche Aussagen treffen zu?\n\n1. Es ist ausschließlich § 7 SG zu prüfen.\n2. § 13 SG kommt hinsichtlich der Falschangaben in Betracht.\n3. § 17 SG kann unabhängig von § 13 SG zu prüfen sein.\n4. Mehrere SG-Pflichten können gleichzeitig verletzt sein.",
    "options": [
      "Nur 2 und 3",
      "Nur 2, 3 und 4",
      "Nur 1 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat erscheint morgens zum Dienst, ist aber deutlich alkoholisiert und nicht dienstfähig. Welche Bewertung ist zutreffend?",
    "options": [
      "Keine Pflichtverletzung, weil er erschienen ist.",
      "Nichtleistung, weil er gar nicht erschienen ist.",
      "Schlechtleistung im Rahmen des § 7 SG.",
      "Möglich ist zusätzlich eine weitere Pflichtverletzung, je nach Sachverhalt."
    ],
    "correct": [
      2,
      3
    ],
    "expl": "Der Dozent hat betont: Entscheidend ist nicht nur Anwesenheit, sondern ordnungsgemäße Dienstfähigkeit."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat macht im Rahmen einer Unfallmeldung bewusst unvollständige Angaben. Welche Aussagen treffen zu?\n\n1. §13 SG kann verletzt sein.\n2. Halbwahrheiten können ebenfalls gegen die Wahrheitspflicht verstoßen.\n3. Das Verschweigen wesentlicher Tatsachen kann einer Falschangabe gleichstehen.\n4. Eine Pflichtverletzung scheidet aus, wenn einzelne Angaben richtig waren.",
    "options": [
      "Nur 1",
      "Nur 1 und 2",
      "Nur 1, 2 und 3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat macht im Rahmen einer dienstlichen Unfallaufnahme bewusst unvollständige Angaben. Welche Aussagen treffen zu?",
    "options": [
      "Halbwahrheiten können ebenfalls gegen §13 SG verstoßen.",
      "Nur vollständig erfundene Angaben sind pflichtwidrig.",
      "Die Wahrheitspflicht umfasst auch bewusstes Verschweigen wesentlicher Tatsachen.",
      "§13 SG ist nicht betroffen."
    ],
    "correct": [
      0,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat macht in einer dienstlichen Vernehmung bewusst falsche Angaben. Welche Aussage trifft zu?",
    "options": [
      "§ 13 SG kann verletzt sein.",
      "Wahrheitspflicht gilt hier nicht, weil er Soldat ist.",
      "Bei Aussage trotz Schweigerecht muss er wahrheitsgemäß aussagen.",
      "Lügen ist dienstlich erlaubt, solange kein Schaden entsteht."
    ],
    "correct": [
      0,
      2
    ],
    "expl": "Wer in dienstlicher Angelegenheit aussagt, muss wahrheitsgemäß aussagen."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat nimmt am Wochenende in Uniform an einer parteipolitischen Veranstaltung teil. Welche Norm ist naheliegend?",
    "options": [
      "§ 15 SG",
      "§ 13 SG",
      "§ 12 SG",
      "Keine, weil Wochenende ist."
    ],
    "correct": 0,
    "expl": "Das Problem ist nicht der Wochentag, sondern politische Betätigung in Uniform."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat postet öffentlich verfassungsfeindliche Symbole. Welche Aussagen treffen zu?\n\n1. § 8 SG ist zu prüfen.\n2. § 17 SG kann zusätzlich einschlägig sein.\n3. Ein strafrechtlicher Bezug ist ausgeschlossen.\n4. Disziplinar- und Strafverfahren können nebeneinander geführt werden.",
    "options": [
      "Nur 1",
      "Nur 1 und 2",
      "Nur 1, 2 und 4",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat schläft während einer Sicherheitsbelehrung ein. Welche Aussagen treffen zu?\n\n1. Allein die Anwesenheit genügt zur Erfüllung der Dienstleistungspflicht.\n2. Eine Schlechtleistung nach § 7 SG kommt in Betracht.\n3. Je nach Gefährdung kann zusätzlich § 17 SG zu prüfen sein.\n4. Ein Dienstvergehen scheidet grundsätzlich aus.",
    "options": [
      "Nur 2",
      "Nur 2 und 3",
      "Nur 1 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat trägt außerhalb des Dienstes Uniform und beteiligt sich an einer politischen Kundgebung. Welche Aussagen treffen zu?",
    "options": [
      "§15 Abs.2 SG ist zu prüfen.",
      "Ob zusätzlich §8 SG betroffen ist, hängt vom Inhalt der Kundgebung ab.",
      "Das Tragen der Uniform ist ohne Bedeutung.",
      "Die Teilnahme ist immer zulässig."
    ],
    "correct": [
      0,
      1
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat verbreitet in sozialen Medien öffentlich verfassungsfeindliche Inhalte. Welche Normen können betroffen sein?",
    "options": [
      "§ 8 SG",
      "§ 17 SG",
      "§ 7 SG",
      "Je nach Sachverhalt mehrere gleichzeitig."
    ],
    "correct": [
      0,
      1,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat verschweigt bei einer Unfallmeldung bewusst, dass er zuvor gegen eine Sicherheitsvorschrift verstoßen hat. Welche Pflichtverletzung liegt am nächsten?",
    "options": [
      "§ 13 SG",
      "§ 15 SG",
      "§ 8 SG",
      "Keine, weil Schweigen erlaubt ist."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat verweigert in einer dienstlichen Vernehmung vollständig die Aussage. Welche Aussage trifft zu?",
    "options": [
      "Er verletzt automatisch §13 SG.",
      "Schweigen und Lügen sind rechtlich gleichzustellen.",
      "Die Bewertung hängt davon ab, ob ihm ein Aussageverweigerungsrecht zusteht.",
      "Er muss immer aussagen."
    ],
    "correct": 2,
    "expl": "? Genau hier liegt eine typische Prüfungsfalle: Viele verwechseln Aussagepflicht und Wahrheitspflicht."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat veröffentlicht auf TikTok Videos aus einer militärischen Liegenschaft und macht sich dabei über Kameraden und Vorgesetzte lustig. Welche Normen sind mindestens zu prüfen?",
    "options": [
      "§12 SG",
      "§17 SG",
      "§7 SG",
      "Je nach Inhalt weitere Vorschriften."
    ],
    "correct": [
      0,
      1,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat veröffentlicht auf seinem privaten Profil Fotos aus einer militärischen Ausbildung und verspottet dabei mehrere Kameraden. Welche Pflichten sind mindestens zu prüfen?\n\n1. §12 SG\n2. §17 SG\n3. §7 SG\n4. Je nach Inhalt weitere strafrechtliche Vorschriften",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 4",
      "Nur 1, 2 und 4",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat veröffentlicht außerhalb des Dienstes mehrere Beiträge auf einer öffentlichen Plattform. Er tritt dabei in Uniform auf und wirbt ausdrücklich für eine politische Partei. Welche Aussage trifft zu?",
    "options": [
      "Ausschließlich §8 SG.",
      "Ausschließlich §15 SG.",
      "§15 SG ist regelmäßig einschlägig; §8 SG hängt vom Inhalt der Äußerungen ab.",
      "Keine Pflichtverletzung."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat veröffentlicht ein Video aus einer militärischen Unterkunft. Darin werden Kameraden lächerlich gemacht und interne Abläufe gezeigt. Welche Pflichtverletzungen kommen in Betracht?",
    "options": [
      "Nur § 12 SG",
      "§ 12 SG und § 17 SG",
      "§ 7 SG und § 13 SG",
      "Ausschließlich Datenschutzrecht"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat veröffentlicht in Uniform auf seinem privaten Social-Media-Kanal politische Wahlwerbung für eine Partei. Welche Aussagen treffen zu?",
    "options": [
      "§ 15 Abs. 2 SG kann verletzt sein.",
      "§ 8 SG ist automatisch verletzt.",
      "Ob § 8 SG verletzt ist, hängt vom Inhalt der politischen Aussage ab.",
      "Politische Betätigung ist Soldaten generell verboten."
    ],
    "correct": [
      0,
      2
    ],
    "expl": "Politische Betätigung ist grundsätzlich zulässig. In Uniform jedoch regelmäßig unzulässig (§ 15 Abs. 2 SG). § 8 SG ist nur betroffen, wenn die Äußerung gegen die FDGO gerichtet ist."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat veröffentlicht in Uniform politische Wahlwerbung. Welche Aussage ist zutreffend?",
    "options": [
      "Immer Verstoß gegen § 8 SG.",
      "Immer Verstoß gegen § 15 SG.",
      "§15 Abs.2 SG ist regelmäßig einschlägig; §8 SG hängt vom Inhalt der Äußerung ab.",
      "Keine Pflichtverletzung."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat wird als Beschuldigter nach §32 WDO ordnungsgemäß belehrt. Er entscheidet sich trotzdem auszusagen. Welche Aussage trifft zu?",
    "options": [
      "Er darf anschließend bewusst falsch aussagen.",
      "Mit Beginn seiner Aussage gilt die Wahrheitspflicht.",
      "Er hätte jederzeit schweigen dürfen.",
      "B und C sind richtig."
    ],
    "correct": 3,
    "expl": "Das ist genau so eine Prüfungsfalle, wie sie gerne gestellt wird."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat wird als Beschuldigter vernommen. Er wird ordnungsgemäß über sein Aussageverweigerungsrecht belehrt. Er entscheidet sich anschließend freiwillig zur Aussage. Welche Aussage trifft zu?",
    "options": [
      "Er darf bewusst unwahre Angaben machen.",
      "Er darf wesentliche Tatsachen verschweigen.",
      "Entscheidet er sich zur Aussage, muss diese wahrheitsgemäß sein.",
      "Die Belehrung hebt §13 SG auf."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat wird außerhalb des Dienstes wegen eines Ladendiebstahls rechtskräftig verurteilt. Welche Aussagen treffen zu?\n\n1. Ein Dienstvergehen liegt automatisch vor.\n2. § 17 SG ist im Hinblick auf Achtung und Vertrauen zu prüfen.\n3. Die disziplinare Bewertung erfolgt unabhängig von der strafrechtlichen Bewertung.\n4. Ein Disziplinarverfahren ist wegen der strafrechtlichen Verurteilung ausgeschlossen.",
    "options": [
      "Nur 2 und 3",
      "Nur 1 und 4",
      "Nur 2, 3 und 4",
      "Alle Aussagen"
    ],
    "correct": 0,
    "expl": "Strafverfahren und Disziplinarverfahren schließen sich nicht gegenseitig aus."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Soldat wird privat wegen einer Trunkenheitsfahrt rechtskräftig verurteilt. Welche Aussagen treffen zu?",
    "options": [
      "Automatisch Dienstvergehen.",
      "Es ist zu prüfen, ob Achtung und Vertrauen beeinträchtigt wurden.",
      "Neben § 17 SG können weitere SG-Pflichten betroffen sein.",
      "Das Disziplinarverfahren ist ausgeschlossen."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Vorgesetzter beobachtet eine klare Pflichtverletzung eines Untergebenen und unternimmt bewusst nichts. Welche Pflicht kann verletzt sein?",
    "options": [
      "§ 10 Abs. 2 SG – Dienstaufsichtspflicht",
      "§ 13 SG – Wahrheitspflicht",
      "§ 15 SG – politische Betätigung",
      "Keine Pflicht, da Wegsehen nie pflichtwidrig ist."
    ],
    "correct": 0,
    "expl": "Wegsehen kann selbst eine Pflichtverletzung sein, wenn ein Vorgesetzter dienstaufsichtlich reagieren muss."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Vorgesetzter erhält Kenntnis von einer möglichen Straftat eines Untergebenen und verzichtet bewusst auf jede Reaktion. Welche Aussagen treffen zu?\n\n1. Eine Verletzung der Dienstaufsichtspflicht ist zu prüfen.\n2. Disziplinarrechtliche Konsequenzen kommen auch für den Vorgesetzten in Betracht.\n3. Das Verhalten des Untergebenen bleibt hiervon unberührt.\n4. Der Vorgesetzte handelt stets rechtmäßig, solange keine Anzeige erfolgt.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Vorgesetzter hört, wie zwei Soldaten einen Kameraden massiv beleidigen. Er greift bewusst nicht ein. Welche Pflichten sind mindestens zu prüfen?",
    "options": [
      "§10 Abs.2 SG",
      "§12 SG",
      "§17 SG",
      "Nur §12 SG."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Vorgesetzter ignoriert über mehrere Wochen wiederholt Pflichtverletzungen eines Untergebenen. Welche Aussage trifft zu?",
    "options": [
      "Dienstaufsicht beginnt erst nach Einleitung eines Disziplinarverfahrens.",
      "Die Pflicht zur Dienstaufsicht besteht unabhängig von einem Disziplinarverfahren.",
      "Dienstaufsicht betrifft ausschließlich Offiziere.",
      "Wegsehen ist rechtlich bedeutungslos."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein Zugführer erfährt, dass ein Untergebener mehrfach Kameraden erniedrigt, Material beschädigt und im anschließenden Disziplinarverfahren bewusst falsche Angaben gemacht hat. Welche Aussage trifft zu?",
    "options": [
      "Es liegt ausschließlich ein Verstoß gegen § 12 SG vor.",
      "Es sind mehrere soldatische Pflichten zu prüfen; disziplinarrechtlich kann dennoch ein einheitliches Dienstvergehen vorliegen.",
      "Es müssen für jede Pflichtverletzung getrennte Disziplinarmaßnahmen verhängt werden.",
      "Wegen der Vielzahl der Pflichtverletzungen ist ausschließlich das Strafrecht anwendbar."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Ein Zugführer stellt fest, dass ein Untergebener regelmäßig verspätet zum Dienst erscheint. Trotz mehrfacher Kenntnis unternimmt er keinerlei Maßnahmen. Welche Aussagen treffen zu?",
    "options": [
      "Der Untergebene verletzt möglicherweise § 7 SG.",
      "Der Zugführer verletzt möglicherweise seine Dienstaufsichtspflicht.",
      "Ein Vorgesetzter darf zunächst grundsätzlich unbegrenzt abwarten.",
      "Je nach Sachverhalt kann auch ein Dienstvergehen des Vorgesetzten vorliegen."
    ],
    "correct": [
      0,
      1,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Ein beschuldigter Soldat wird nach §32 WDO belehrt. Er entscheidet sich freiwillig zur Aussage. Welche Aussagen treffen zu?\n\n1. Er hätte schweigen dürfen.\n2. Entscheidet er sich zur Aussage, muss diese wahrheitsgemäß sein.\n3. Er darf einzelne Tatsachen bewusst verschweigen.\n4. §13 SG kann einschlägig werden.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 4",
      "Nur 1, 2 und 4",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Sie führen eine Teileinheit. Während einer Übung beleidigt ein Feldwebel einen Mannschaftssoldaten mehrfach vor der gesamten Gruppe. Welche Aussagen treffen zu?",
    "options": [
      "Es ist ausschließlich §17 SG zu prüfen.",
      "§12 SG ist naheliegend.",
      "§17 SG kann zusätzlich betroffen sein.",
      "Das Verhalten des Feldwebels ist kameradschaftsrechtlich ohne Bedeutung."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Sie sind Kompaniechef. Ein Feldwebel erklärt Ihnen: „Das geht mich nichts an. Das war außerhalb der Dienstzeit.„ Ein Mannschaftssoldat wurde privat wegen einer schweren Gewalttat rechtskräftig verurteilt. Welche Aussage trifft zu?",
    "options": [
      "Außerdienstliches Verhalten ist niemals disziplinarrechtlich relevant.",
      "Es ist insbesondere zu prüfen, ob §17 SG betroffen ist.",
      "Eine rechtskräftige Verurteilung schließt disziplinare Maßnahmen aus.",
      "Nur der Strafrichter darf den Sachverhalt bewerten."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Sie sind Zugführer. Ein Unteroffizier meldet Ihnen, dass ein Mannschaftssoldat seit mehreren Tagen regelmäßig alkoholisiert zum Dienst erscheint. Sie entscheiden sich, zunächst nichts zu unternehmen, weil der Soldat seinen Dienst „irgendwie noch schafft„. Welche Aussagen treffen zu?",
    "options": [
      "Gegen den Soldaten ist mindestens § 7 SG zu prüfen.",
      "Für Sie kommt eine Verletzung der Dienstaufsichtspflicht in Betracht.",
      "Solange kein Schaden eingetreten ist, besteht kein Handlungsbedarf.",
      "Die Einleitung eines Disziplinarverfahrens ist Voraussetzung für die Dienstaufsicht."
    ],
    "correct": [
      0,
      1
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Wann gilt die Wahrheitspflicht nach § 13 SG?",
    "options": [
      "Nur in dienstlichen Angelegenheiten.",
      "Immer, auch bei rein privaten Gesprächen.",
      "Bei Meldungen, dienstlichen Anträgen und dienstlichen Vernehmungen.",
      "Nur vor Gericht."
    ],
    "correct": [
      0,
      2
    ],
    "expl": "§ 13 SG gilt dienstlich. Reine Privatangelegenheiten fallen nicht direkt darunter."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage beschreibt das Verhältnis von §12 SG und §17 SG zutreffend?",
    "options": [
      "Beide schließen sich gegenseitig aus.",
      "Wird §12 SG verletzt, darf §17 SG nicht geprüft werden.",
      "Beide können nebeneinander erfüllt sein.",
      "§17 SG verdrängt sämtliche anderen Pflichten."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage beschreibt das Verhältnis zwischen mehreren verletzten SG-Pflichten am besten?",
    "options": [
      "Es darf immer nur eine Pflicht verletzt sein.",
      "Mehrere SG-Pflichten können gleichzeitig verletzt werden.",
      "Werden drei Pflichten verletzt, entstehen automatisch drei Dienstvergehen.",
      "§17 SG verdrängt sämtliche übrigen Pflichten."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage beschreibt den Unterschied zwischen § 7 SG und § 17 SG am zutreffendsten?",
    "options": [
      "§ 7 betrifft ausschließlich Straftaten.",
      "§ 17 betrifft ausschließlich Außerdienstliches.",
      "§ 7 bewertet die Dienstausübung, § 17 das erforderliche Achtungs- und Vertrauensverhältnis.",
      "Beide Paragraphen regeln denselben Inhalt."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage beschreibt die Pflicht zum treuen Dienen am zutreffendsten?",
    "options": [
      "Sie verpflichtet ausschließlich zur Ausführung von Befehlen.",
      "Sie ist eine Auffangpflicht für sämtliche soldatischen Pflichten.",
      "Sie verpflichtet zur gewissenhaften Wahrnehmung aller dienstlichen Aufgaben.",
      "Sie gilt nur während eines Auslandseinsatzes."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage beschreibt die Wohlverhaltenspflicht am zutreffendsten?",
    "options": [
      "Sie schützt ausschließlich den Dienstbetrieb.",
      "Sie schützt das Vertrauen, das Bürger in die Bundeswehr haben müssen.",
      "Sie gilt nur innerhalb militärischer Liegenschaften.",
      "Sie betrifft ausschließlich Straftaten."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage beschreibt § 12 SG am besten?",
    "options": [
      "Kameradschaft verlangt bedingungslose Loyalität gegenüber Kameraden.",
      "Kameradschaft verpflichtet zum Schutz von Würde, Ehre und Rechten.",
      "Kameradschaft erlaubt das Verschweigen von Straftaten.",
      "Kameradschaft endet außerhalb des Dienstes."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage beschreibt § 17 SG am zutreffendsten?",
    "options": [
      "Er regelt ausschließlich Straftaten.",
      "Er schützt die Einsatzbereitschaft.",
      "Er schützt Achtung und Vertrauen, die der Dienst erfordert.",
      "Er gilt nur für Berufssoldaten."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage trifft zur Wahrheitspflicht zu?",
    "options": [
      "Schweigen und Lügen sind rechtlich gleichzustellen.",
      "Wer schweigen darf, darf anschließend auch bewusst falsch aussagen.",
      "Wer sich freiwillig zur Aussage entscheidet, unterliegt der Wahrheitspflicht.",
      "Die Wahrheitspflicht gilt ausschließlich vor Gericht."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage trifft zur politischen Betätigung von Soldaten zu?",
    "options": [
      "Politische Neutralität bedeutet politisches Schweigen.",
      "Soldaten bleiben Staatsbürger.",
      "Politische Werbung während des Dienstes ist regelmäßig unzulässig.",
      "Politische Betätigung außerhalb des Dienstes ist stets verboten."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage trifft zur politischen Betätigung zu?",
    "options": [
      "Soldaten dürfen keiner Partei angehören.",
      "Soldaten dürfen sich politisch betätigen, soweit dienstliche Grenzen eingehalten werden.",
      "Politische Äußerungen außerhalb des Dienstes sind generell verboten.",
      "Uniform darf bei politischen Veranstaltungen grundsätzlich getragen werden."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zu § 17 SG trifft zu?",
    "options": [
      "§ 17 SG gilt nur innerdienstlich.",
      "§ 17 SG kann inner- und außerdienstliches Verhalten erfassen.",
      "Entscheidend ist, ob Achtung und Vertrauen beeinträchtigt werden.",
      "Jedes private Fehlverhalten ist automatisch ein Dienstvergehen."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Private Vorgänge sind nicht automatisch relevant. Es braucht eine Beeinträchtigung von Achtung und Vertrauen."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zu § 8 SG ist richtig?",
    "options": [
      "Es kommt nur auf die innere Gesinnung an.",
      "Bloße Gedanken reichen für einen Verstoß aus.",
      "Entscheidend ist regelmäßig eine äußere Manifestation.",
      "§ 8 SG betrifft nur Offiziere."
    ],
    "correct": 2,
    "expl": "Der Unterricht betonte: Nicht Gedanken werden geprüft, sondern nach außen erkennbares Verhalten."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zum Begriff „Dienstvergehen„ trifft zu?",
    "options": [
      "Jede verletzte Pflicht bildet automatisch ein eigenes Dienstvergehen.",
      "Mehrere Pflichtverletzungen können disziplinarrechtlich ein einheitliches Dienstvergehen bilden.",
      "Dienstvergehen setzen stets eine Straftat voraus.",
      "Dienstvergehen gibt es nur innerhalb des Dienstes."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zur Dienstaufsichtspflicht ist richtig?",
    "options": [
      "Sie verlangt nur Beobachtung, aber kein Handeln.",
      "Sie betrifft nur Disziplinarvorgesetzte.",
      "Sie umfasst Wahrnehmen, Bewerten und erforderliches Reagieren.",
      "Sie gilt nur im Auslandseinsatz."
    ],
    "correct": 2,
    "expl": "Dienstaufsicht bedeutet nicht bloßes Zuschauen."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zur Kameradschaftspflicht (§ 12 SG) trifft nicht zu?",
    "options": [
      "Kameraden sind gegenseitig zu achten.",
      "Kameraden müssen sich gegenseitig unterstützen.",
      "Kameradschaft rechtfertigt das Verschweigen von Dienstvergehen.",
      "Kameradschaft schützt Würde und Rechte der Soldaten."
    ],
    "correct": 2,
    "expl": "."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zur Wahrheitspflicht (§ 13 SG) trifft zu?",
    "options": [
      "Ein Soldat darf im Dienst lügen, wenn dadurch niemand geschädigt wird.",
      "Die Wahrheitspflicht gilt nur vor Gericht.",
      "Wer dienstlich Angaben macht, muss vollständig und wahrheitsgemäß erklären.",
      "Halbwahrheiten können ebenfalls gegen § 13 SG verstoßen."
    ],
    "correct": [
      2,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zur Wohlverhaltenspflicht ist zutreffend?",
    "options": [
      "Sie schützt ausschließlich das Ansehen des einzelnen Soldaten.",
      "Sie schützt das Vertrauen in die Bundeswehr insgesamt.",
      "Sie gilt ausschließlich gegenüber Vorgesetzten.",
      "Sie ist nur bei Straftaten anwendbar."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussage zur politischen Betätigung nach § 15 SG ist richtig?",
    "options": [
      "Soldaten dürfen sich politisch grundsätzlich nie betätigen.",
      "Soldaten sind Staatsbürger in Uniform.",
      "Politische Betätigung kann im Dienst, in Uniform oder unter Ausnutzung der Dienststellung verboten sein.",
      "Politische Betätigung ist nur Offizieren erlaubt."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Politische Betätigung ist grundsätzlich zulässig, aber dienstlich begrenzt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen treffen auf die Wohlverhaltenspflicht zu?",
    "options": [
      "Sie schützt ausschließlich den Dienstbetrieb.",
      "Sie schützt das Vertrauen der Allgemeinheit in die Bundeswehr.",
      "Sie gilt ausschließlich im Dienst.",
      "Sie kann auch außerhalb des Dienstes verletzt werden."
    ],
    "correct": [
      1,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen treffen hinsichtlich § 15 SG zu?\n\n1. Soldaten bleiben Staatsbürger.\n2. Politische Betätigung ist grundsätzlich zulässig.\n3. Politische Betätigung in Uniform kann verboten sein.\n4. Politische Werbung im Dienst ist regelmäßig unzulässig.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Nur 1, 2 und 3",
      "Alle"
    ],
    "correct": 3,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen treffen zur Wahrheitspflicht zu?\n\n1. Sie gilt bei dienstlichen Meldungen.\n2. Sie gilt bei dienstlichen Vernehmungen.\n3. Sie gilt auch für bewusstes Verschweigen erheblicher Tatsachen.\n4. Sie gilt uneingeschränkt für jede private Unterhaltung.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zu § 17 SG sind richtig?",
    "options": [
      "Außerdienstliches Verhalten ist niemals relevant.",
      "Maßgeblich ist, ob Achtung und Vertrauen ernsthaft beeinträchtigt werden.",
      "Nicht jede private Straftat stellt automatisch ein Dienstvergehen dar.",
      "Die Einzelfallprüfung ist entscheidend."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zu §17 SG treffen zu?\n\n1. Er schützt das Vertrauen in die Bundeswehr.\n2. Er gilt nur während des Dienstes.\n3. Außerdienstliches Verhalten kann relevant sein.\n4. Die Bewertung erfolgt immer nach einer Einzelfallprüfung.",
    "options": [
      "Nur 1 und 3",
      "Nur 1,3 und 4",
      "Nur 2 und 3",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zum § 7 SG (Treues Dienen) treffen zu?\n\n1. Die Pflicht zum treuen Dienen umfasst nur die Befolgung von Befehlen.\n2. Auch Schlechtleistung kann eine Verletzung des § 7 SG darstellen.\n3. Die Pflicht zum treuen Dienen umfasst auch den sorgfältigen Umgang mit Bundeswehrvermögen.\n4. Eine Verletzung des § 7 SG setzt stets Vorsatz voraus.",
    "options": [
      "Nur 2 und 3",
      "Nur 1 und 4",
      "Nur 1, 2 und 3",
      "Alle Aussagen"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Dienstaufsicht (§ 10 Abs.2 SG) treffen zu?\n\n1. Sie verpflichtet zum Wahrnehmen.\n2. Sie verpflichtet zum Bewerten.\n3. Sie verpflichtet erforderlichenfalls zum Einschreiten.\n4. Sie endet automatisch mit Dienstschluss.",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Nur 1 und 3",
      "Alle"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Dienstaufsicht nach §10 Abs.2 SG treffen zu?",
    "options": [
      "Sie endet mit Dienstschluss.",
      "Sie umfasst Wahrnehmen, Bewerten und erforderliches Einschreiten.",
      "Sie besteht unabhängig davon, ob ein Disziplinarverfahren eingeleitet wird.",
      "Sie gilt ausschließlich gegenüber Mannschaften."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Dienstaufsicht treffen zu?\n\n1. Sie umfasst Prävention.\n2. Sie umfasst Kontrolle.\n3. Sie umfasst erforderlichenfalls Einschreiten.\n4. Sie endet automatisch außerhalb der Kaserne.",
    "options": [
      "Nur 1–3",
      "Nur 2 und 3",
      "Nur 1 und 4",
      "Alle"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Kameradschaftspflicht treffen zu?\n\n1. Sie schützt Würde.\n2. Sie schützt Ehre.\n3. Sie schützt Rechte.\n4. Sie verpflichtet zur Vertuschung von Pflichtverletzungen.",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Nur 1 und 3",
      "Alle"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Loyalitätspflicht im Rahmen des § 7 SG sind richtig?",
    "options": [
      "Jede private Straftat verletzt automatisch § 7 SG.",
      "Ein Dienstbezug ist regelmäßig erforderlich.",
      "Straftaten können § 7 SG berühren, wenn sie Bezug zu Dienst, Bundeswehr oder Rechtsordnung haben.",
      "§ 7 SG ist nur bei Straftaten gegen Kameraden relevant."
    ],
    "correct": [
      1,
      2
    ],
    "expl": "Nicht jede Straftat führt automatisch zu § 7 SG. Es kommt auf den konkreten Bezug an."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Pflicht aus § 12 SG treffen zu?\n\n1. Kameradschaft verlangt gegenseitige Achtung.\n2. Kameradschaft verpflichtet zum Schutz der Rechte anderer Soldaten.\n3. Kameradschaft rechtfertigt das Verschweigen eines Dienstvergehens.\n4. Die Kameradschaftspflicht endet mit Dienstschluss.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 4",
      "Nur 3 und 4",
      "Alle"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Pflicht zum treuen Dienen nach § 7 SG treffen zu?",
    "options": [
      "Sie umfasst nur die Pflicht, pünktlich zum Dienst zu erscheinen.",
      "Sie umfasst die ordnungsgemäße Dienstleistung.",
      "Sie kann auch bei Schlechtleistung verletzt sein.",
      "Sie betrifft auch die Loyalität gegenüber der Rechtsordnung.",
      "Sie ist nur im Einsatz relevant."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "expl": "§ 7 SG umfasst Dienstleistungspflicht, Loyalitätspflicht und Vermögenswahrungspflicht. Anwesenheit allein reicht nicht, wenn der Dienst nicht ordnungsgemäß geleistet werden kann."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Wahrheitspflicht sind richtig?",
    "options": [
      "Sie gilt nur gegenüber Disziplinarvorgesetzten.",
      "Sie gilt bei dienstlichen Meldungen.",
      "Sie gilt bei dienstlichen Anträgen.",
      "Sie gilt auch bei dienstlichen Vernehmungen.",
      "Sie gilt uneingeschränkt im Privatleben."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Wahrheitspflicht treffen zu?\n\n1. Sie gilt für dienstliche Meldungen.\n2. Sie gilt bei dienstlichen Vernehmungen.\n3. Sie gilt für dienstliche Anträge.\n4. Sie gilt uneingeschränkt auch im rein privaten Bereich.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Wahrheitspflicht treffen zu?\n\n1. Wer schweigen darf, darf anschließend auch bewusst falsch aussagen.\n2. Entscheidet sich der Beschuldigte freiwillig zur Aussage, gilt die Wahrheitspflicht.\n3. Die Wahrheitspflicht gilt unabhängig vom Ausgang des Verfahrens.\n4. §13 SG ist hierbei regelmäßig zu beachten.",
    "options": [
      "Nur 2 und 4",
      "Nur 2, 3 und 4",
      "Nur 1 und 3",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur Wohlverhaltenspflicht (§17 SG) treffen zu?\n\n1. Sie gilt nur während der Dienstzeit.\n2. Außerdienstliches Verhalten kann relevant sein.\n3. Maßstab ist die Achtung und das Vertrauen, die der Dienst erfordert.\n4. Jede Ordnungswidrigkeit ist automatisch ein Dienstvergehen.",
    "options": [
      "Nur 2 und 3",
      "Nur 1 und 2",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen zur politischen Treuepflicht (§ 8 SG) treffen zu?\n\n1. Maßgeblich ist die äußere Manifestation.\n2. Bloße innere Überzeugungen genügen regelmäßig nicht.\n3. Jede Parteimitgliedschaft verletzt § 8 SG.\n4. Verfassungsfeindliche Aktivitäten können § 8 SG verletzen.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 4",
      "Nur 3 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen über § 17 SG treffen zu?",
    "options": [
      "Maßstab ist ausschließlich das Ansehen des einzelnen Soldaten.",
      "Maßstab ist die Achtung und das Vertrauen, die der Dienst erfordert.",
      "Innerdienstliches Verhalten fällt unter § 17 SG.",
      "Außerdienstliches Verhalten kann ebenfalls unter § 17 SG fallen."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Aussagen über § 8 SG sind richtig?",
    "options": [
      "Die freiheitliche demokratische Grundordnung ist identisch mit dem gesamten Grundgesetz.",
      "Die Pflicht verlangt ein aktives Eintreten für die FDGO.",
      "Verfassungsfeindliche Handlungen können gegen § 8 SG verstoßen.",
      "Private Meinungen ohne Außenwirkung genügen regelmäßig nicht."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Elemente gehören nach dem Unterricht besonders zur FDGO?",
    "options": [
      "Menschenwürde",
      "Demokratieprinzip",
      "Rechtsstaatsprinzip",
      "Dienstgradordnung",
      "Gewaltenteilung"
    ],
    "correct": [
      0,
      1,
      2,
      4
    ],
    "expl": "Dienstgradordnung gehört nicht zur FDGO. Menschenwürde, Demokratie, Rechtsstaat und Gewaltenteilung wurden hervorgehoben."
  },
  {
    "cat": "SG",
    "mode": "single",
    "topic": "Soldatische Pflichten",
    "q": "Welche Kombination ist zutreffend? Ein Soldat beleidigt einen Kameraden, lügt anschließend im Disziplinarverfahren, erscheint alkoholisiert zum Dienst. Welche Paragraphen sind mindestens einschlägig?",
    "options": [
      "§7 SG",
      "§12 SG",
      "§13 SG",
      "§17 SG",
      "alle genannten"
    ],
    "correct": 4,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Normen gehören nach den Unterlagen zu den besonders prüfungsrelevanten SG-Pflichten?",
    "options": [
      "§ 7 SG",
      "§ 8 SG",
      "§ 10 SG",
      "§ 12 SG",
      "§ 13 SG",
      "§ 17 SG"
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "expl": "Diese Normen wurden als „muss sitzen„ eingeordnet."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Welche Schutzgüter umfasst die Kameradschaftspflicht nach § 12 SG?",
    "options": [
      "Würde",
      "Ehre",
      "Rechte",
      "Vermögen des Dienstherrn",
      "Politische Meinung des Vorgesetzten"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "§ 12 SG schützt Würde, Ehre und Rechte der Kameraden."
  },
  {
    "cat": "SG",
    "mode": "multi",
    "topic": "Soldatische Pflichten",
    "q": "Während einer Ausbildung filmt ein Soldat heimlich einen Kameraden und veröffentlicht das Video anschließend im Internet. Welche Aussagen treffen zu?",
    "options": [
      "§12 SG kann verletzt sein.",
      "§17 SG kommt in Betracht.",
      "Je nach Inhalt kommen zusätzlich Straftatbestände in Betracht.",
      "Es liegt ausschließlich ein Datenschutzverstoß vor."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Ein Hauptfeldwebel wird ausdrücklich mit der Leitung einer Ausbildung beauftragt. Worauf kann sich seine Befehlsbefugnis stützen?",
    "options": [
      "Ausschließlich auf seinen Dienstgrad.",
      "Auf die besondere Anordnung für diese Aufgabe.",
      "Nur auf § 1 VorgV.",
      "Auf keine Vorschrift."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Ein Leutnant begegnet einem Gefreiten außerhalb einer militärischen Liegenschaft. Zwischen beiden besteht keinerlei Unterstellungsverhältnis. Welche Aussage trifft zu?",
    "options": [
      "Der Leutnant ist allein wegen seines Dienstgrades immer Vorgesetzter.",
      "Ein höherer Dienstgrad allein begründet nicht automatisch ein Vorgesetztenverhältnis.",
      "Jeder Offizier ist jederzeit Vorgesetzter aller Soldaten.",
      "Der Gefreite muss jedem Offizier jederzeit gehorchen."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Ein Soldat erhält eine dienstliche Weisung von einem zivilen Beamten der Bundeswehr. Welche Aussage trifft zu?",
    "options": [
      "Es handelt sich um einen militärischen Befehl.",
      "Der Beamte ist militärischer Vorgesetzter.",
      "Es handelt sich um eine dienstliche Weisung; die Folgepflicht kann sich aus § 7 SG ergeben.",
      "Zivilbedienstete dürfen Soldaten niemals Anweisungen erteilen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Ein Soldat erhält einen Befehl von einem anderen Soldaten. Später stellt sich heraus, dass überhaupt kein Vorgesetztenverhältnis bestand. Welche Aussage trifft zu?",
    "options": [
      "Der Befehl bleibt dennoch militärischer Befehl.",
      "Es liegt regelmäßig kein militärischer Befehl im Sinne der §§ 10, 11 SG vor.",
      "Der Dienstgrad genügt immer.",
      "Die Rechtmäßigkeit heilt den Mangel."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Ein Soldat ist zum Schießausbilder bestellt. Während des Schießens ordnet er an: „Waffe entladen!„ Warum darf er diesen Befehl erteilen?",
    "options": [
      "Wegen seines Dienstgrades.",
      "Aufgrund seines besonderen Aufgabenbereichs während der Schießausbildung.",
      "Weil jeder Ausbilder automatisch Kompaniechef ist.",
      "Wegen § 4 VorgV."
    ],
    "correct": 1,
    "expl": "Wichtig: Nicht „Schießausbilder = Fachvorgesetzter„. Entscheidend ist der konkrete Rechtsgrund der Vorgesetztenstellung. Genau diese Unterscheidung wird gerne geprüft."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Sie prüfen einen militärischen Befehl. Welche Reihenfolge ist richtig?",
    "options": [
      "Verbindlichkeit → Vorgesetztenverhältnis → Rechtmäßigkeit",
      "Rechtmäßigkeit → Vorgesetztenverhältnis → Verbindlichkeit",
      "Vorgesetztenverhältnis → Rechtmäßigkeit → Verbindlichkeit",
      "Dienstvergehen → Strafbarkeit → Verbindlichkeit"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Sie sind Zugführer. Ein Oberfeldwebel ordnet auf dem Übungsplatz einem Gefreiten einer anderen Einheit an, sofort den Gefechtshelm aufzusetzen. Welche Prüfung erfolgt zuerst?",
    "options": [
      "Ob der Helm notwendig war.",
      "Ob der Gefreite den Befehl befolgt hat.",
      "Ob nach der VorgV überhaupt ein Vorgesetztenverhältnis bestand.",
      "Ob ein Dienstvergehen vorliegt."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Sie sollen prüfen, ob ein Soldat einem anderen Soldaten einen militärischen Befehl erteilen durfte. Welcher Prüfungsschritt erfolgt zuerst?",
    "options": [
      "Ist der Befehl rechtmäßig?",
      "Liegt überhaupt ein Vorgesetztenverhältnis nach der VorgV vor?",
      "Ist der Befehl verbindlich?",
      "Liegt ein Dienstvergehen vor?"
    ],
    "correct": 1,
    "expl": "Ohne Vorgesetztenverhältnis gibt es regelmäßig keinen militärischen Befehl."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Welche Aussage beschreibt den Fachvorgesetzten zutreffend?",
    "options": [
      "Er besitzt uneingeschränkte Befehlsbefugnis.",
      "Seine Befehlsbefugnis beschränkt sich auf seinen fachlichen Aufgabenbereich.",
      "Er ist automatisch Disziplinarvorgesetzter.",
      "Er ist immer Offizier."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "VorgV",
    "mode": "single",
    "topic": "Vorgesetztenverordnung",
    "q": "Welche Aussage beschreibt § 1 VorgV am besten?",
    "options": [
      "Er regelt den Fachvorgesetzten.",
      "Er regelt den unmittelbaren Vorgesetzten.",
      "Er regelt ausschließlich Offiziere.",
      "Er regelt den Dienstgradvorgesetzten."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Ausbilder befiehlt einem Rekruten: „Iss die Regenwürmer dort.„ Welche Aussage trifft zu?",
    "options": [
      "Der Befehl ist lediglich unverhältnismäßig.",
      "Der Befehl verletzt die Menschenwürde und ist unverbindlich.",
      "Der Soldat muss zunächst Beschwerde einlegen.",
      "Die Menschenwürde spielt im Befehlsrecht keine Rolle."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Befehl verstößt gegen eine Dienstvorschrift. Er verfolgt aber einen dienstlichen Zweck und verletzt weder die Menschenwürde noch würde seine Ausführung eine Straftat darstellen. Welche Aussage trifft zu?",
    "options": [
      "Jeder rechtswidrige Befehl ist unverbindlich.",
      "Der Befehl kann trotz seiner Rechtswidrigkeit verbindlich sein.",
      "Rechtswidrige Befehle dürfen niemals befolgt werden.",
      "Der Soldat entscheidet frei."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Befehl verstößt gegen eine Verwaltungsvorschrift. Er verfolgt jedoch einen dienstlichen Zweck. Die Ausführung wäre weder strafbar noch menschenwürdeverletzend. Welche Aussagen treffen zu?\n\n1. Der Befehl ist möglicherweise rechtswidrig.\n2. Er kann trotzdem verbindlich sein.\n3. Der Soldat darf ihn deshalb beliebig ignorieren.\n4. Eine Gegenvorstellung kommt in Betracht.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 4",
      "Nur 2 und 3",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Hauptfeldwebel befiehlt einem Soldaten: „Schlagen Sie diesen gefesselten Gefangenen.„ Welche Aussagen treffen zu?\n\n1. Der Befehl verstößt gegen Gesetze.\n2. Der Befehl ist unverbindlich.\n3. Der Soldat darf den Befehl nicht ausführen.\n4. Eine Berufung auf den Befehlsnotstand scheidet regelmäßig aus, wenn die Rechtswidrigkeit offensichtlich ist.",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 2"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Kompaniechef befiehlt einem Soldaten: „Fahren Sie nach Dienstschluss für mich privat einkaufen.„ Welche Aussage trifft zu?",
    "options": [
      "Der Befehl ist rechtmäßig.",
      "Der dienstliche Zweck fehlt.",
      "Privatinteressen des Vorgesetzten genügen als dienstlicher Zweck.",
      "Der Soldat muss den Befehl immer ausführen."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Kompaniechef ordnet an: „Niemand verlässt heute alkoholisiert mit dem privaten Pkw die Kaserne.„ Welche Aussage trifft zu?",
    "options": [
      "Der Befehl verfolgt keinen dienstlichen Zweck.",
      "Es handelt sich um einen grundsätzlich zulässigen Präventivbefehl.",
      "Präventivbefehle sind grundsätzlich verboten.",
      "Der Befehl betrifft ausschließlich Privatrecht."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Soldat erhält den Befehl, für seinen Kompaniechef privat den Garten zu mähen. Welche Aussagen treffen zu?\n\n1. Es fehlt wahrscheinlich am dienstlichen Zweck.\n2. Der Befehl dürfte rechtswidrig sein.\n3. Es spricht vieles dafür, dass der Befehl unverbindlich ist.\n4. Vor einer endgültigen Verweigerung kommt regelmäßig eine Gegenvorstellung in Betracht.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Alle",
      "Nur 2–4"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Soldat erhält einen militärischen Befehl. In welcher Reihenfolge prüfen Sie?",
    "options": [
      "Verbindlichkeit → Rechtmäßigkeit → Dienstvergehen",
      "Rechtmäßigkeit → Verbindlichkeit → Folgen der Nichtbefolgung",
      "Dienstvergehen → Rechtmäßigkeit → Verbindlichkeit",
      "Verhältnismäßigkeit → Rechtmäßigkeit → Vorgesetztenverhältnis"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Soldat hält einen Befehl für rechtswidrig. Wie verhält er sich zunächst richtig?",
    "options": [
      "Er verweigert sofort die Ausführung.",
      "Er führt den Befehl immer ohne Nachfrage aus.",
      "Er erhebt zunächst eine Gegenvorstellung und weist auf seine Bedenken hin.",
      "Er schreibt zunächst eine Beschwerde."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Ein Vorgesetzter befiehlt einem Soldaten: „Schlagen Sie den gefesselten Gefangenen.„ Welche Aussage trifft zu?",
    "options": [
      "Der Soldat muss gehorchen.",
      "Der Befehl darf nicht befolgt werden.",
      "Die Rechtmäßigkeit spielt keine Rolle.",
      "Erst nach einer Gegenvorstellung darf verweigert werden."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Sie erhalten als Untergebener einen militärischen Befehl. Welche Aussagen treffen zu?\n\n1. Zunächst ist zu prüfen, ob überhaupt ein militärisches Vorgesetztenverhältnis besteht.\n2. Anschließend ist die Rechtmäßigkeit des Befehls zu prüfen.\n3. Erst danach stellt sich die Frage der Verbindlichkeit.\n4. Jeder rechtswidrige Befehl ist automatisch unverbindlich.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 3",
      "Nur 2, 3 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Sie sind Zugführer. Ein Feldwebel befiehlt einem Soldaten, während der Mittagspause sein privates Auto zu waschen. Der Soldat erklärt: „Ich glaube, der Befehl ist rechtswidrig.„ Welche Bewertung trifft am ehesten zu?",
    "options": [
      "Der Befehl verfolgt einen dienstlichen Zweck und ist rechtmäßig.",
      "Der Soldat begeht automatisch Ungehorsam.",
      "Es spricht viel dafür, dass bereits der dienstliche Zweck fehlt; der Befehl ist daher rechtswidrig und regelmäßig unverbindlich.",
      "Über die Verbindlichkeit entscheidet ausschließlich das Truppendienstgericht."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Wann kann ein Befehl wegen Unzumutbarkeit unverbindlich sein?",
    "options": [
      "Immer wenn der Soldat ihn unangenehm findet.",
      "Bereits bei jeder körperlichen Belastung.",
      "Wenn der Eingriff in Grundrechte außer Verhältnis zum dienstlichen Zweck steht.",
      "Nur bei Offizieren."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Welche Aussage trifft zu?",
    "options": [
      "Rechtmäßigkeit und Verbindlichkeit sind identisch.",
      "Rechtmäßigkeit betrifft den Befehlsgeber, Verbindlichkeit die Pflicht des Empfängers.",
      "Verbindlichkeit wird ausschließlich durch den Dienstgrad bestimmt.",
      "Rechtswidrige Befehle sind stets unverbindlich."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Welche Aussagen sprechen gegen das Vorliegen eines dienstlichen Zwecks?\n\n1. Der Befehl dient ausschließlich privaten Interessen des Vorgesetzten.\n2. Der Befehl dient der Auftragserfüllung.\n3. Der Befehl dient ausschließlich der Schikane.\n4. Der Befehl dient der Gefahrenabwehr.",
    "options": [
      "Nur 1",
      "Nur 1 und 3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Welche Aussagen treffen zu?\n\n1. Ein Soldat darf keinen strafbaren Befehl ausführen.\n2. Ein strafbarer Befehl bleibt verbindlich.\n3. Die Befolgung eines strafbaren Befehls kann eigene Strafbarkeit begründen.\n4. Die Verantwortung trägt immer ausschließlich der Vorgesetzte.",
    "options": [
      "Nur 1",
      "Nur 1 und 3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Welche Aussagen treffen zu?\n\n1. Präventivbefehle dienen der Verhinderung künftiger Pflichtverletzungen.\n2. Sie benötigen einen dienstlichen Zweck.\n3. Sie müssen verhältnismäßig sein.\n4. Sie dürfen niemals außerdienstliches Verhalten betreffen.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Außerdienstliches Verhalten kann erfasst sein, wenn ein Bezug zu dienstlichen Pflichten besteht."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Welche Aussagen treffen zur Gegenvorstellung zu?\n\n1. Sie dient dazu, Bedenken gegen einen Befehl vorzubringen.\n2. Sie ersetzt keine Beschwerde.\n3. Sie bedeutet nicht automatisch, dass der Befehl nicht ausgeführt werden muss.\n4. Sie ist nur bei schriftlichen Befehlen zulässig.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Welche Voraussetzungen gehören zur Rechtmäßigkeit eines militärischen Befehls?\n\n1. Zuständigkeit des Befehlsgebers\n2. Dienstlicher Zweck\n3. Vereinbarkeit mit Gesetzen\n4. Beachtung des Völkerrechts",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 2"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Befehlsrecht",
    "mode": "single",
    "topic": "Befehlsrecht",
    "q": "Welche der folgenden Befehle wären regelmäßig wegen Verletzung der Menschenwürde unverbindlich?\n\n1. Regenwürmer essen.\n2. Öffentliche entwürdigende Bloßstellung ohne dienstlichen Zweck.\n3. Körperliche Misshandlung zur „Erziehung„.\n4. Antreten um 06:00 Uhr.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Der Beschuldigte entscheidet sich freiwillig zur Aussage. Während der Vernehmung lügt er bewusst. Welche Aussage trifft zu?",
    "options": [
      "Das ist zulässig.",
      "Das Schweigerecht umfasst auch das Recht zur Lüge.",
      "Mit der freiwilligen Aussage greift die Wahrheitspflicht.",
      "Falschangaben sind disziplinarrechtlich bedeutungslos."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Der Beschuldigte erklärt: „Ich sage überhaupt nichts.„ Welche Aussage trifft zu?",
    "options": [
      "Dies stellt bereits ein Dienstvergehen dar.",
      "Schweigen darf nicht negativ gewertet werden.",
      "Der Soldat verletzt automatisch §13 SG.",
      "Gegen ihn ist sofort Arrest zu verhängen."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Der Soldat legt seine Beschwerde erst ein, nachdem die Vollstreckung bereits begonnen hat. Welche Aussage trifft zu?",
    "options": [
      "Die Vollstreckung wird sofort unterbrochen.",
      "Die Vollstreckung läuft grundsätzlich weiter.",
      "Die Maßnahme wird automatisch aufgehoben.",
      "Die Beschwerde ist unzulässig."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Der Soldat wurde bereits rechtskräftig durch Urteil verurteilt. Welche Aussage trifft zu?",
    "options": [
      "Das Disziplinarverfahren endet automatisch.",
      "Die tatsächlichen Feststellungen des Urteils entfalten Bindungswirkung.",
      "Das Urteil darf nicht berücksichtigt werden.",
      "Es muss vollständig neu ermittelt werden."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Der Soldat wurde rechtskräftig durch Strafbefehl verurteilt. Welche Aussage trifft zu?",
    "options": [
      "Strafbefehle entfalten dieselbe Bindungswirkung wie Urteile.",
      "Strafbefehle entfalten ausdrücklich keine Bindungswirkung.",
      "Strafbefehle schließen Disziplinarmaßnahmen aus.",
      "Strafbefehle ersetzen sämtliche Ermittlungen."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Ein Disziplinarvorgesetzter erkennt, dass der Beschuldigte sein Schwager ist. Welche Aussage trifft zu?",
    "options": [
      "Die Zuständigkeit geht automatisch über.",
      "Erst nach der vorgeschriebenen Meldung wechselt die Zuständigkeit.",
      "Der Beschuldigte entscheidet.",
      "Die Vertrauensperson entscheidet."
    ],
    "correct": 1,
    "expl": "Typische OLL-Falle: § 30 Abs. 1 ≠ § 30 Abs. 2 WDO."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Ein Soldat legt seine Disziplinarbeschwerde ein, bevor mit der Vollstreckung begonnen wurde. Welche Aussage trifft zu?",
    "options": [
      "Die Vollstreckung läuft trotzdem.",
      "Die Beschwerde hat hemmende Wirkung.",
      "Die Maßnahme wird automatisch aufgehoben.",
      "Nur Arrestmaßnahmen werden gehemmt."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Ein Soldat wird als Zeuge vernommen. Er würde sich durch seine Aussage selbst strafrechtlich belasten. Welche Aussage trifft zu?",
    "options": [
      "Er muss trotzdem vollständig aussagen.",
      "Ihm steht ein Auskunftsverweigerungsrecht zu.",
      "Er darf beliebig lügen.",
      "Er wird automatisch Beschuldigter."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Ein ziviler Passant beobachtet den Vorfall. Welche Aussage trifft zu?",
    "options": [
      "Er kann wie jeder Soldat zum Erscheinen gezwungen werden.",
      "Seine Vernehmung erfolgt ausschließlich freiwillig.",
      "Er unterliegt der soldatischen Wahrheitspflicht.",
      "Er muss den militärischen Gruß leisten."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Nach Abschluss der Ermittlungen führen Sie das schriftliche Schlussgehör durch. Anschließend ergeben sich neue belastende Erkenntnisse. Wie ist weiter zu verfahren?",
    "options": [
      "Sofort Maßnahme verhängen.",
      "Nur neue Zeugen anhören.",
      "Schlussgehör und VP-Anhörung müssen erneut durchgeführt werden.",
      "Neue Erkenntnisse bleiben unberücksichtigt."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Nach Abschluss der Ermittlungen soll die Vertrauensperson beteiligt werden. Der Beschuldigte erklärt ausdrücklich: „Ich wünsche keine Beteiligung der Vertrauensperson.„ Wie ist zu verfahren?",
    "options": [
      "Die Anhörung muss trotzdem erfolgen.",
      "Die Vertrauensperson entscheidet selbst.",
      "Die Anhörung unterbleibt.",
      "Das Verfahren endet."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Nach ordnungsgemäßer Verhängung stellt der Disziplinarvorgesetzte fest, dass die Maßnahme zu streng erscheint. Wie ist die Rechtslage?",
    "options": [
      "Er kann sie jederzeit selbst ändern.",
      "Er kann sie jederzeit aufheben.",
      "Nach der Verhängung besteht grundsätzlich keine Änderungsbefugnis mehr.",
      "Die Vertrauensperson entscheidet."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie führen die Ermittlungen. Während der Beweisaufnahme ergeben sich sowohl belastende als auch entlastende Tatsachen. Außerdem existiert bereits ein rechtskräftiges Strafurteil. Welche Aussagen treffen zu?\n\n1. Entlastende Tatsachen müssen berücksichtigt werden.\n2. Das Strafurteil kann Bindungswirkung entfalten.\n3. Weitere Ermittlungen sind dennoch zulässig, soweit erforderlich.\n4. Eine Disziplinarmaßnahme ist ausgeschlossen.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie führen folgendes Verfahren durch: Ermittlungen abgeschlossen VP angehört Schlussgehör durchgeführt Nachtfrist eingehalten Disziplinarmaßnahme verhängt. Der Soldat legt am nächsten Morgen Beschwerde ein. Die Vollstreckung hat noch nicht begonnen. Welche Aussage trifft zu?",
    "options": [
      "Die Vollstreckung beginnt trotzdem.",
      "Die Beschwerde hemmt die Vollstreckung.",
      "Die Maßnahme ist automatisch aufgehoben.",
      "Das Verfahren beginnt erneut."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie haben am Montag um 15:00 Uhr das schriftliche Schlussgehör durchgeführt. Der Sachverhalt ist vollständig aufgeklärt. Wann darf die Disziplinarmaßnahme frühestens verhängt werden?",
    "options": [
      "Sofort nach dem Schlussgehör",
      "Montag 22:00 Uhr",
      "Dienstag nach Ablauf der Nachtfrist",
      "Erst nach Ablauf der Beschwerdefrist"
    ],
    "correct": 2,
    "expl": "Die Nachtfrist ist keine 24-Stunden-Frist."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie sind Disziplinarvorgesetzter. Ein Zugführer meldet Ihnen glaubhaft, dass ein Soldat während des Dienstes alkoholisiert gewesen sein soll. Wie müssen Sie nun rechtlich vorgehen?",
    "options": [
      "Sie entscheiden nach Ermessen, ob Sie überhaupt tätig werden.",
      "Da lediglich ein Verdacht besteht, dürfen keine Ermittlungen durchgeführt werden.",
      "Liegt ein Anfangsverdacht vor, müssen die erforderlichen Ermittlungen eingeleitet werden.",
      "Erst wenn ein Strafverfahren eingeleitet wird, darf disziplinarrechtlich ermittelt werden."
    ],
    "correct": 2,
    "expl": "Viele verwechseln Legalitäts- und Opportunitätsprinzip."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie sind Disziplinarvorgesetzter. Sie haben den Beschuldigten ordnungsgemäß vernommen, die Vertrauensperson angehört, das schriftliche Schlussgehör durchgeführt. Am nächsten Tag meldet sich ein neuer Zeuge mit erheblichen belastenden Angaben. Welche Aussage trifft zu?",
    "options": [
      "Die Disziplinarmaßnahme kann sofort verhängt werden.",
      "Die neuen Angaben bleiben unberücksichtigt.",
      "Die neuen Erkenntnisse müssen ermittelt werden; anschließend sind die erforderlichen Verfahrensschritte (insbesondere VP-Anhörung und Schlussgehör) erneut durchzuführen.",
      "Das Verfahren muss vollständig neu beginnen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie sind Disziplinarvorgesetzter. Vor der ersten Vernehmung beginnen Sie sofort mit der Befragung des Soldaten. Sie belehren ihn erst nach den ersten Antworten. Welche Aussage trifft zu?",
    "options": [
      "Das Vorgehen ist zulässig.",
      "Die Belehrung kann jederzeit nachgeholt werden.",
      "Vor der ersten inhaltlichen Befragung muss ordnungsgemäß belehrt werden.",
      "Eine Belehrung ist nur im Strafverfahren erforderlich."
    ],
    "correct": 2,
    "expl": "Die Belehrung muss vor der ersten Sachbefragung erfolgen."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie sind Kompaniechef. Der Beschuldigte ist Ihr Stellvertreter. Welche Aussage trifft zu?",
    "options": [
      "Sie bleiben zuständig.",
      "Die Zuständigkeit wechselt automatisch.",
      "Nur das Truppendienstgericht übernimmt.",
      "Der Bataillonskommandeur wird automatisch Ermittlungsführer."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Sie sind Kompaniechef. Nach ordnungsgemäßer Verhängung einer Disziplinarmaßnahme erklärt Ihnen Ihr Rechtsberater, dass eine mildere Maßnahme angemessener gewesen wäre. Der Soldat hat noch keine Beschwerde eingelegt. Wie verhalten Sie sich?",
    "options": [
      "Sie ändern die Disziplinarmaßnahme sofort.",
      "Sie heben sie auf und verhängen eine neue.",
      "Sie können die bereits verhängte Maßnahme grundsätzlich nicht mehr selbst ändern.",
      "Sie bitten die Vertrauensperson um eine neue Stellungnahme."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Aussage beschreibt das Verhältnis der beiden Prinzipien zutreffend?",
    "options": [
      "Sowohl Ermittlung als auch Ahndung stehen im freien Ermessen.",
      "Ermittlungen unterliegen dem Legalitätsprinzip, die Ahndungsentscheidung dem Opportunitätsprinzip.",
      "Beide unterliegen ausschließlich dem Legalitätsprinzip.",
      "Beide unterliegen ausschließlich dem Opportunitätsprinzip."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Aussage beschreibt die Verhängung einer Disziplinarmaßnahme zutreffend?",
    "options": [
      "Die Verfügung wird ausschließlich schriftlich übersandt.",
      "Die Verhängung erfolgt durch dienstliche Bekanntgabe.",
      "Eine mündliche Bekanntgabe genügt nie.",
      "Erst die Vollstreckung stellt die Verhängung dar."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Aussage zur Vollstreckungsverjährung trifft zu?",
    "options": [
      "Sie beginnt mit der Tat.",
      "Sie beginnt mit der Vernehmung.",
      "Sie beginnt mit Eintritt der Unanfechtbarkeit.",
      "Sie beginnt mit dem Schlussgehör."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Belehrung gehört zwingend zu einer Beschuldigtenvernehmung?\n\n1. Eröffnung des Tatvorwurfs\n2. Hinweis auf das Aussageverweigerungsrecht\n3. Hinweis auf die Wahrheitspflicht bei freiwilliger Aussage\n4. Hinweis auf die Möglichkeit eines Verteidigers",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 2"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Disziplinarmaßnahme gilt bereits mit der Verhängung als vollstreckt?",
    "options": [
      "Disziplinarbuße",
      "Ausgangsbeschränkung",
      "Verweis",
      "Arrest"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Informationen erhält die Vertrauensperson grundsätzlich?\n\n1. Angaben zur Person\n2. Sachverhalt\n3. Beabsichtigte Disziplinarmaßnahme\n4. Vollständige Ermittlungsakte",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 2"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Kriterien sind bei der Bemessung einer Disziplinarmaßnahme maßgeblich?\n\n1. Eigenart und Schwere des Dienstvergehens\n2. Auswirkungen\n3. Schuldmaß\n4. Beweggründe",
    "options": [
      "Nur 1–3",
      "Nur 1–4",
      "Alle",
      "Nur 2–5"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Welche Maßnahme darf delegiert werden?",
    "options": [
      "Die Entscheidung über die Disziplinarmaßnahme.",
      "Die Anhörung des Beschuldigten.",
      "Die Sachverhaltsaufklärung.",
      "Die Verhängung der Maßnahme."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Während der Ermittlungen ergibt sich ein entlastender Zeuge. Wie ist zu verfahren?",
    "options": [
      "Nur belastende Tatsachen sind zu dokumentieren.",
      "Entlastende Tatsachen sind unbeachtlich.",
      "Belastende und entlastende Umstände sind gleichermaßen zu ermitteln.",
      "Entlastende Tatsachen dürfen erst im Beschwerdeverfahren berücksichtigt werden."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WDO",
    "mode": "single",
    "topic": "Wehrdisziplinarordnung",
    "q": "Zur dienstlichen Bekanntgabe gehören insbesondere ... Vorlesen des Tenors. Aushändigung der Disziplinarverfügung. Empfangsbekenntnis. Sofortige Vollstreckung.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Alle",
      "Nur 2–4"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Das Ende der Beschwerdefrist fällt auf einen Sonntag. Welche Aussage trifft zu?",
    "options": [
      "Die Frist endet trotzdem am Sonntag.",
      "Die Frist endet am nächsten Werktag.",
      "Die Frist verlängert sich automatisch um eine Woche.",
      "Der Beschwerdeführer entscheidet selbst."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Ein Soldat beschwert sich über das Verhalten eines gleichrangigen Kameraden. Welche Aussage trifft zu?",
    "options": [
      "Es handelt sich um eine Vorgesetztenbeschwerde.",
      "Zuständig ist der Wehrbeauftragte.",
      "Es handelt sich um eine Kameradenbeschwerde.",
      "Das Truppendienstgericht entscheidet unmittelbar."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Ein Soldat beschwert sich über eine bereits verhängte Disziplinarbuße. Welche Beschwerdeart liegt vor?",
    "options": [
      "Kameradenbeschwerde",
      "Vorgesetztenbeschwerde",
      "Disziplinarbeschwerde",
      "Verwaltungsbeschwerde"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Ein Soldat legt gegen eine Disziplinarmaßnahme fristgerecht Beschwerde ein. Die Beschwerde ist statthaft und formgerecht. Bei der Prüfung stellt sich heraus, dass die Maßnahme rechtmäßig war. Wie lautet die Entscheidung?",
    "options": [
      "Verwerfung als unzulässig",
      "Stattgabe",
      "Zurückweisung als unbegründet",
      "Einstellung"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Ein Soldat legt gemeinsam mit vier Kameraden eine einzige Beschwerde gegen denselben Vorgesetzten ein. Welche Aussage trifft zu?",
    "options": [
      "Das Verfahren ist besonders effizient.",
      "Gruppenbeschwerden sind grundsätzlich zulässig.",
      "Gruppenbeschwerden sind grundsätzlich unzulässig.",
      "Die Anzahl der Soldaten spielt keine Rolle."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Ein Soldat legt schriftlich Beschwerde ein. Welcher Prüfungspunkt ist zwingend zuerst zu prüfen?",
    "options": [
      "Frist",
      "Beschwer",
      "Zuständigkeit",
      "Statthaftigkeit (Beschwerdeart)"
    ],
    "correct": 3,
    "expl": "Viele prüfen sofort die Monatsfrist. Das ist falsch."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Ein Soldat legt seine Beschwerde fünf Wochen nach Kenntnis der Maßnahme ein. Besondere Gründe liegen nicht vor. Welche Aussage trifft zu?",
    "options": [
      "Die Beschwerde ist fristgerecht.",
      "Die Monatsfrist ist grundsätzlich versäumt.",
      "Fristen gelten nur für Disziplinarbeschwerden.",
      "Die Frist beträgt sechs Monate."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Wann ist eine Beschwerde begründet?",
    "options": [
      "Sobald sie rechtzeitig eingelegt wurde.",
      "Sobald sie schriftlich eingereicht wurde.",
      "Wenn die angegriffene Maßnahme rechtswidrig war und den Beschwerdeführer in eigenen Rechten verletzt.",
      "Sobald der Soldat Offizier ist."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Welche Voraussetzungen gehören zur Zulässigkeit einer Beschwerde?\n\n1. Statthaftigkeit\n2. Form\n3. Frist\n4. Beschwer",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 4"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "WBO",
    "mode": "single",
    "topic": "Wehrbeschwerdeordnung",
    "q": "Wer entscheidet grundsätzlich über eine Kameradenbeschwerde?",
    "options": [
      "Der Wehrbeauftragte",
      "Das Truppendienstgericht",
      "Der nächste gemeinsame Disziplinarvorgesetzte",
      "Der Bataillonskommandeur"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Ein Soldat erhält einen unverbindlichen militärischen Befehl und führt ihn bewusst nicht aus. Welche Aussage trifft zu?",
    "options": [
      "Strafbarkeit wegen Ungehorsams (§ 19 WStG) liegt regelmäßig vor.",
      "Ein unverbindlicher Befehl erfüllt grundsätzlich nicht den Tatbestand des § 19 WStG.",
      "Der Soldat macht sich immer strafbar.",
      "Nur Offiziere dürfen unverbindliche Befehle verweigern."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Ein Soldat führt einen offensichtlich strafbaren Befehl aus. Welche Aussage trifft zu?",
    "options": [
      "Er bleibt stets straflos.",
      "Die Berufung auf den Befehl schützt immer.",
      "Auch der Untergebene kann strafrechtlich verantwortlich sein.",
      "Ausschließlich der Vorgesetzte haftet."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Ein Soldat verlässt ohne Erlaubnis die Kaserne und kehrt zwei Tage später freiwillig zurück. Bereits beim Verlassen stand für ihn fest, nie wieder zur Bundeswehr zurückzukehren. Welche Aussagen treffen zu?\n\n1. Die Dauer von zwei Tagen schließt Fahnenflucht aus.\n2. Entscheidend ist die Absicht des Soldaten.\n3. Es kommt § 16 WStG in Betracht.\n4. Allein die Dauer entscheidet zwischen § 15 und § 16 WStG.",
    "options": [
      "Nur 2 und 3",
      "Nur 1 und 4",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Ein Vorgesetzter beschimpft einen Untergebenen regelmäßig vor der gesamten Kompanie als „Du bist völlig wertlos.„ Welche Normen kommen mindestens in Betracht?\n\n1. §31 WStG\n2. §185 StGB\n3. §12 SG\n4. §17 SG",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 4",
      "Alle",
      "Nur 1–3"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Ein Vorgesetzter schlägt einen Untergebenen während einer Ausbildung. Welche Aussagen treffen zu?\n\n1. §223 StGB kann erfüllt sein.\n2. Zusätzlich kommt §30 WStG in Betracht.\n3. Die besondere Vorgesetztenstellung ist für §30 WStG wesentlich.\n4. Nur §223 StGB ist anwendbar.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Sie sind Disziplinarvorgesetzter. Ein Soldat verweigert einen unverbindlichen Befehl, beleidigt anschließend seinen Vorgesetzten, schlägt danach einen Kameraden. Welche Aussagen treffen zu?\n\n1. Eine Strafbarkeit wegen §19 WStG ist fraglich bzw. scheidet hinsichtlich des unverbindlichen Befehls regelmäßig aus.\n2. Weitere Straftatbestände können verwirklicht sein.\n3. Mehrere Dienstpflichten nach dem SG sind zu prüfen.\n4. Disziplinar- und Strafverfahren können parallel geführt werden.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Alle",
      "Nur 1–3"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Welche Aussage beschreibt den Unterschied zwischen § 15 und § 16 WStG am zutreffendsten?",
    "options": [
      "Die Dauer der Abwesenheit.",
      "Die Höhe des Schadens.",
      "Die Fahnenfluchtabsicht.",
      "Der Dienstgrad."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Welche Aussage beschreibt §31 WStG am besten?",
    "options": [
      "Schutz des Eigentums.",
      "Schutz vor entwürdigender Behandlung durch Vorgesetzte.",
      "Schutz militärischer Geheimnisse.",
      "Schutz vor Fahnenflucht."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Welche Aussagen treffen zum Verhältnis von Strafverfahren und Disziplinarverfahren zu?\n\n1. Beide können parallel geführt werden.\n2. Eine Straftat kann zugleich Dienstvergehen sein.\n3. Das Strafverfahren schließt das Disziplinarverfahren automatisch aus.\n4. Eine Abgabe an die Staatsanwaltschaft kann erforderlich sein.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 1, 2 und 4",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Strafrecht",
    "mode": "single",
    "topic": "WStG / Strafrecht",
    "q": "Welche Voraussetzungen müssen für § 19 WStG (Ungehorsam) vorliegen?\n\n1. Militärischer Befehl.\n2. Verbindlicher Befehl.\n3. Vorsätzliche Nichtbefolgung.\n4. Militärischer Vorgesetzter.",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 4"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Bei der Bemessung einer Disziplinarmaßnahme sind insbesondere zu berücksichtigen: Schwere des Dienstvergehens Schuldmaß Auswirkungen Beweggründe Persönlichkeit Bisherige Führung",
    "options": [
      "Nur 1–4",
      "Nur 2–6",
      "Alle",
      "Nur 1, 3 und 5"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Disziplinarvorgesetzter führt Ermittlungen, hört die Vertrauensperson an, verhängt sofort die Maßnahme, führt am nächsten Tag das Schlussgehör durch. Wo liegt der Fehler?",
    "options": [
      "Die VP wurde zu früh beteiligt.",
      "Das Schlussgehör hätte vor der Verhängung erfolgen müssen.",
      "Ermittlungen dürfen nicht durchgeführt werden.",
      "Die Nachtfrist wurde eingehalten."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Gruppenführer beobachtet mehrfach Verstöße gegen Sicherheitsvorschriften, schreitet jedoch nie ein. Welche Aussagen treffen zu?\n\n1. Es kommt eine Verletzung der Dienstaufsichtspflicht in Betracht.\n2. Das Verhalten kann disziplinarrechtlich relevant sein.\n3. Ein Schaden muss nicht zwingend eingetreten sein.\n4. Ohne Unfall liegt keine Pflichtverletzung vor.",
    "options": [
      "Nur 1 und 2",
      "Nur 2–4",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Hauptfeldwebel ordnet einem Soldaten einer anderen Einheit an: „Sofort antreten!„ Der Sachverhalt enthält keinerlei Angaben über ein bestehendes Vorgesetztenverhältnis. Welcher Prüfungsschritt ist zwingend zuerst vorzunehmen?",
    "options": [
      "Verhältnismäßigkeit.",
      "Dienstlicher Zweck.",
      "Besteht überhaupt ein Vorgesetztenverhältnis nach der VorgV?",
      "Liegt Ungehorsam vor?"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Kompaniechef erhält Hinweise darauf, dass ein Feldwebel: einen Untergebenen rechtswidrig geschlagen hat, ihn mehrfach beleidigte, anschließend falsche Angaben machte, während des Disziplinarverfahrens weitere Zeugen beeinflussen wollte. Welche Aussagen treffen zu?\n\n1. Es besteht Anlass zur Einleitung disziplinarer Ermittlungen.\n2. Strafrechtliche Ermittlungen können erforderlich sein.\n3. Belastende und entlastende Umstände sind gleichermaßen zu ermitteln.\n4. Eine Einflussnahme auf Zeugen kann bei der disziplinaren Würdigung berücksichtigt werden.\n5. Das Verfahren ist unabhängig von persönlichen Sympathien objektiv zu führen.",
    "options": [
      "Nur 1–3",
      "Nur 2–5",
      "Alle Aussagen",
      "Nur 1, 3 und 5"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Oberleutnant befiehlt einem Gefreiten, während der Mittagspause sein privates Motorrad zu reinigen. Welche Aussagen treffen zu?\n\n1. Der Oberleutnant ist wegen seines Dienstgrades automatisch jederzeit befugt, diesen Befehl zu erteilen.\n2. Vor der Rechtmäßigkeitsprüfung ist zunächst das Vorgesetztenverhältnis zu prüfen.\n3. Fehlt der dienstliche Zweck, spricht dies gegen die Rechtmäßigkeit des Befehls.\n4. Ein rechtswidriger Befehl kann im Einzelfall dennoch verbindlich sein.",
    "options": [
      "Nur 2 und 3",
      "Nur 2–4",
      "Nur 1, 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat entfernt sich eigenmächtig vom Standort. Bereits beim Verlassen steht für ihn fest, dauerhaft nicht zurückzukehren. Welche Aussage trifft zu?",
    "options": [
      "Entscheidend ist allein die Dauer der Abwesenheit.",
      "Es kommt insbesondere auf die Rückkehrabsicht bzw. den Rückkehrwillen an.",
      "Nach 24 Stunden liegt automatisch Fahnenflucht vor.",
      "Nach 48 Stunden liegt automatisch Fahnenflucht vor."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat erhält einen offensichtlich strafbaren Befehl. Welche Aussagen treffen zu?\n\n1. Er darf ihn nicht ausführen.\n2. Eine eigene Strafbarkeit ist möglich.\n3. Die Verantwortung trägt ausschließlich der Vorgesetzte.\n4. Die Verbindlichkeit entfällt.",
    "options": [
      "Nur 1 und 4",
      "Nur 1,2 und 4",
      "Nur 2 und 3",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat erhält einen offensichtlich unverbindlichen Befehl. Er verweigert dessen Ausführung. Welche Aussage trifft zu?",
    "options": [
      "§19 WStG ist regelmäßig nicht erfüllt.",
      "Jeder nicht ausgeführte Befehl erfüllt §19 WStG.",
      "Der Dienstgrad entscheidet.",
      "Ungehorsam liegt immer vor."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat erscheint alkoholisiert, beleidigt einen Kameraden, schlägt anschließend seinen Gruppenführer, verweigert später einen unverbindlichen Befehl, macht im Disziplinarverfahren bewusst falsche Angaben. Welche Aussagen treffen zu?\n\n1. Mehrere SG-Pflichten sind betroffen.\n2. Mehrere Straftatbestände kommen in Betracht.\n3. Die Verweigerung des unverbindlichen Befehls erfüllt regelmäßig nicht §19 WStG.\n4. Trotz mehrerer Pflichtverletzungen liegt disziplinarrechtlich regelmäßig nur ein einheitliches Dienstvergehen vor.",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 2"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat erscheint alkoholisiert, beleidigt einen Kameraden, schlägt einen Untergebenen, macht anschließend falsche Angaben, legt später Beschwerde gegen die Disziplinarmaßnahme ein. Welche Rechtsgebiete sind betroffen?\n\n1. SG\n2. WDO\n3. WBO\n4. Strafrecht\n5. WStG (je nach Sachverhalt)",
    "options": [
      "Nur 1–4",
      "Nur 2–5",
      "Alle",
      "Nur 1–3"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat erscheint alkoholisiert, beschädigt Bundeswehreigentum, beleidigt einen Kameraden, verschweigt den Vorfall. Welche Aussagen treffen zu?\n\n1. Es kommen mehrere Pflichtverletzungen nach dem SG in Betracht.\n2. Strafrechtliche Konsequenzen können hinzukommen.\n3. Disziplinar- und Strafverfahren schließen sich gegenseitig aus.\n4. Die Gesamtwürdigung aller Pflichtverletzungen ist für die Maßnahmebemessung bedeutsam.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 4",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat hält einen Befehl für rechtswidrig. Nach seiner Gegenvorstellung bestätigt der Vorgesetzte den Befehl ausdrücklich. Welche Aussage trifft zu?",
    "options": [
      "Der Soldat darf den Befehl immer verweigern.",
      "Nun ist der Befehl unabhängig vom Inhalt verbindlich.",
      "Entscheidend bleibt, ob gesetzliche Gründe gegen die Verbindlichkeit sprechen (z. B. Straftat oder Menschenwürde).",
      "Die Gegenvorstellung ersetzt die Beschwerde."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat legt Beschwerde gegen eine Disziplinarmaßnahme ein. Welcher Prüfungspunkt steht nicht an erster Stelle?",
    "options": [
      "Statthaftigkeit",
      "Beschwerdeart",
      "Frist",
      "Beschwer"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat schlägt einen Kameraden, beleidigt anschließend seinen Zugführer, macht später falsche Angaben im Disziplinarverfahren. Welche Rechtsgebiete sind mindestens betroffen?\n\n1. SG\n2. WDO\n3. Strafrecht\n4. WStG (je nach Sachverhalt)",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 3,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat verletzt die Kameradschaftspflicht, macht bewusst falsche dienstliche Angaben, veröffentlicht den Vorfall in sozialen Medien und schädigt dadurch das Ansehen der Bundeswehr. Welche Aussagen treffen zu?\n\n1. Mehrere Pflichten aus dem Soldatengesetz können betroffen sein.\n2. Die Pflichtverletzungen sind in ihrer Gesamtheit zu würdigen.\n3. Außerdienstliches Verhalten kann disziplinarrechtlich relevant sein.\n4. Jede Pflichtverletzung führt zwingend zu einer eigenen Disziplinarmaßnahme.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat verweigert einen Befehl, begründet dies mit dessen Rechtswidrigkeit, erhebt eine Gegenvorstellung, der Vorgesetzte bestätigt den Befehl, der Soldat erkennt anschließend, dass der Befehl eine offensichtliche Straftat zum Inhalt hätte. Welche Aussagen treffen zu?\n\n1. Die Bestätigung des Befehls macht ihn nicht automatisch verbindlich.\n2. Ein offensichtlich strafbarer Befehl darf nicht ausgeführt werden.\n3. Die Gegenvorstellung ändert nichts daran, dass die gesetzlichen Grenzen der Gehorsamspflicht gelten.\n4. Eine Strafbarkeit des Soldaten kann trotz Befehlsbefolgung in Betracht kommen.",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle Aussagen",
      "Nur 1 und 2"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat wird ordnungsgemäß belehrt. Er erklärt: „Ich mache keine Angaben.„ Welche Aussagen treffen zu?\n\n1. Das Schweigen darf grundsätzlich nicht negativ bewertet werden.\n2. Eine Wahrheitspflicht entsteht erst bei freiwilliger Aussage.\n3. Schweigen erfüllt für sich allein kein Dienstvergehen.\n4. Die Vernehmung endet automatisch.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Soldat wird wegen einer Körperverletzung rechtskräftig verurteilt. Welche Aussagen treffen zu?\n\n1. Ein Disziplinarverfahren kann trotzdem erforderlich sein.\n2. Das Strafurteil kann tatsächliche Bindungswirkung entfalten.\n3. Mit dem Strafurteil endet jedes Disziplinarverfahren automatisch.\n4. Die disziplinare Würdigung verfolgt andere Zwecke als die strafrechtliche Sanktion.",
    "options": [
      "Nur 1 und 2",
      "Nur 2–4",
      "Nur 1, 2 und 4",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Ein Zeuge macht zunächst belastende Angaben. Zwei Tage später widerruft er seine Aussage vollständig. Welche Aussagen treffen zu?\n\n1. Der Widerruf beendet das Verfahren automatisch.\n2. Beide Aussagen sind zu würdigen.\n3. Die Glaubwürdigkeit des Zeugen ist zu prüfen.\n4. Weitere Beweise können erforderlich sein.",
    "options": [
      "Nur 2 und 3",
      "Nur 2–4",
      "Nur 1 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Gegen einen Soldaten laufen gleichzeitig: Strafverfahren Disziplinarverfahren Welche Aussagen treffen zu?\n\n1. Beide Verfahren verfolgen unterschiedliche Zwecke.\n2. Das Strafverfahren schließt ein Disziplinarverfahren nicht automatisch aus.\n3. Tatsächliche Feststellungen eines rechtskräftigen Strafurteils können Bedeutung für das Disziplinarverfahren haben.\n4. Beide Verfahren dürfen niemals parallel laufen.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 4",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Nach Abschluss des Schlussgehörs wird die Disziplinarmaßnahme verhängt. Erst danach stellt sich heraus, dass der Beschuldigte bereits vor der ersten Vernehmung nicht ordnungsgemäß belehrt wurde. Welche Aussage trifft zu?",
    "options": [
      "Der Belehrungsfehler ist ohne Bedeutung.",
      "Es ist zu prüfen, welche Auswirkungen der Verfahrensfehler auf die Rechtmäßigkeit des Verfahrens hat.",
      "Die Disziplinarmaßnahme bleibt stets wirksam.",
      "Das Verfahren wird automatisch nichtig."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Nach Abschluss des Schlussgehörs wird ein weiterer Zeuge vernommen. Seine Aussage belastet den Beschuldigten erheblich. Die Disziplinarmaßnahme wird unmittelbar danach verhängt. Welche Aussage trifft zu?",
    "options": [
      "Das Verfahren ist fehlerfrei.",
      "Die neuen Erkenntnisse machen regelmäßig eine erneute Beteiligung des Beschuldigten erforderlich.",
      "Die Zeugenaussage darf nicht berücksichtigt werden.",
      "Das Verfahren ist automatisch nichtig."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Sie bearbeiten ein Disziplinarverfahren. Welche Reihenfolge entspricht grundsätzlich dem gesetzlichen Ablauf?",
    "options": [
      "Vernehmung → Schlussgehör → VP → Verhängung",
      "Ermittlungen → Vernehmung → VP → Schlussgehör → Nachtfrist → Verhängung",
      "VP → Ermittlungen → Verhängung",
      "Verhängung → Beschwerde → Ermittlungen"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Sie führen ein Disziplinarverfahren. Der einzige Belastungszeuge widerruft seine Aussage. Wie handeln Sie?",
    "options": [
      "Verfahren sofort einstellen.",
      "Widerruf ignorieren.",
      "Den Widerruf und seine Glaubhaftigkeit aufklären sowie die Beweislage insgesamt neu bewerten.",
      "Sofort Disziplinarmaßnahme verhängen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Sie sind Kompaniechef und bearbeiten folgenden Sachverhalt: Ein Feldwebel schlägt einen Untergebenen, beleidigt ihn anschließend, unterlässt später trotz Kenntnis einer weiteren Pflichtverletzung jedes Einschreiten, macht im Disziplinarverfahren bewusst falsche Angaben, verweigert schließlich einen offensichtlich unverbindlichen Befehl. Welche Aussagen treffen zu?\n\n1. Mehrere soldatische Pflichten sind betroffen.\n2. Mehrere Straftatbestände kommen in Betracht.\n3. Die Verweigerung des unverbindlichen Befehls begründet regelmäßig keinen Ungehorsam nach §19 WStG.\n4. Trotz mehrerer Pflichtverletzungen ist disziplinarrechtlich grundsätzlich von einem einheitlichen Dienstvergehen auszugehen.\n5. Strafverfahren und Disziplinarverfahren können parallel geführt werden.",
    "options": [
      "Nur 1–4",
      "Nur 2–5",
      "Alle Aussagen",
      "Nur 1–3"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Sie sind Kompaniechef. Ein Oberfeldwebel Ihrer Kompanie soll einen Untergebenen geschlagen haben. Der Geschädigte meldet den Vorfall unmittelbar. Sie kennen den Oberfeldwebel seit vielen Jahren privat. Wie gehen Sie rechtlich richtig vor?\n\n1. Zunächst prüfen, ob ein Anfangsverdacht vorliegt.\n2. Bei Anfangsverdacht müssen Ermittlungen eingeleitet werden.\n3. Wegen der persönlichen Beziehung kommt eine Befangenheit in Betracht.\n4. Bis zur Entscheidung über die Zuständigkeit dürfen keinerlei Maßnahmen erfolgen.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Sie sind Kompaniechef. Ein Zugführer meldet Ihnen glaubhaft, dass ein Soldat einen Kameraden geschlagen haben soll. Sie sind jedoch überzeugt, dass der Soldat „so etwas niemals machen würde„. Wie handeln Sie rechtmäßig?",
    "options": [
      "Keine Ermittlungen, da Sie den Soldaten kennen.",
      "Ermittlungen nur nach Rücksprache mit dem Bataillonskommandeur.",
      "Liegt ein Anfangsverdacht vor, müssen Ermittlungen geführt werden – unabhängig von Ihrer persönlichen Einschätzung.",
      "Zunächst wird ausschließlich die Vertrauensperson angehört."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Sie sind Kompaniechef. Nach Abschluss aller Ermittlungen wird das Schlussgehör durchgeführt. Eine Stunde später meldet sich ein neuer Zeuge. Wie verfahren Sie?",
    "options": [
      "Sofort Maßnahme verhängen.",
      "Aussage ignorieren.",
      "Nachermittlungen durchführen und anschließend VP-Anhörung sowie Schlussgehör erneut durchführen.",
      "Verfahren einstellen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Sie übernehmen als Kompaniechef ein bereits begonnenes Disziplinarverfahren. Bei der Aktenprüfung stellen Sie fest: Der Beschuldigte wurde nicht ordnungsgemäß belehrt. Die Vertrauensperson wurde nicht beteiligt, obwohl der Beschuldigte dies ausdrücklich gewünscht hatte. Das Schlussgehör wurde durchgeführt. Anschließend wurden neue belastende Beweise erhoben. Die Disziplinarmaßnahme wurde bereits verhängt. Welche Verfahrensmängel sind zu erkennen?\n\n1. Fehlerhafte oder unterlassene Belehrung.\n2. Unterlassene Beteiligung der Vertrauensperson.\n3. Nach neuen belastenden Erkenntnissen wären die erforderlichen Verfahrensschritte erneut durchzuführen gewesen.\n4. Es bestehen erhebliche Zweifel an der Verfahrensordnungsgemäßheit.",
    "options": [
      "Nur 1 und 2",
      "Nur 2–4",
      "Nur 1, 3 und 4",
      "Alle"
    ],
    "correct": 3,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussage beschreibt den Untersuchungsgrundsatz am zutreffendsten?",
    "options": [
      "Nur belastende Tatsachen werden ermittelt.",
      "Der Beschuldigte muss seine Unschuld beweisen.",
      "Belastende und entlastende Tatsachen sind mit gleicher Sorgfalt zu ermitteln.",
      "Geständnisse beenden jede weitere Sachverhaltsaufklärung."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Ein Befehl benötigt einen dienstlichen Zweck.",
      "Ein Befehl muss Gesetze beachten.",
      "Jeder rechtswidrige Befehl ist automatisch unverbindlich.",
      "Das Völkerrecht ist zu beachten."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Zunächst ist die Beschwerdeart festzustellen.",
      "Danach folgt die Zulässigkeitsprüfung.",
      "Die Frist wird erst nach der Begründetheit geprüft.",
      "Die Beschwer ist Zulässigkeitsvoraussetzung."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Ein rechtswidriger Befehl kann verbindlich sein.",
      "Ein unverbindlicher Befehl kann rechtswidrig sein.",
      "Rechtmäßigkeit und Verbindlichkeit sind identisch.",
      "Die Verbindlichkeit ist gesondert zu prüfen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Jede zulässige Beschwerde ist automatisch begründet.",
      "Zulässigkeit und Begründetheit sind getrennt zu prüfen.",
      "Eine unbegründete Beschwerde kann dennoch zulässig sein.",
      "Die Frist gehört zur Zulässigkeitsprüfung."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Ein Fachvorgesetzter darf nur in seinem Aufgabenbereich Befehle erteilen.",
      "Mehrere Vorgesetztenverhältnisse können gleichzeitig bestehen.",
      "Jeder Offizier ist jederzeit Vorgesetzter aller Soldaten.",
      "Die Rechtsgrundlage des Vorgesetztenverhältnisses ist stets zu prüfen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussagen treffen zu?\n\n1. Ein Geständnis beendet die Ermittlungen nicht automatisch.\n2. Auch nach einem Geständnis können weitere Beweise erforderlich sein.\n3. Entlastende Umstände sind weiterhin zu prüfen.\n4. Nach einem Geständnis entfällt das Schlussgehör.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussagen treffen zu?\n\n1. Jeder unverbindliche Befehl ist rechtswidrig.\n2. Nicht jeder rechtswidrige Befehl ist unverbindlich.\n3. Die Verbindlichkeit richtet sich nach §11 SG.\n4. Die Rechtmäßigkeit richtet sich nach §10 Abs.4 SG.",
    "options": [
      "Nur 2 und 3",
      "Nur 2–4",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Aussagen treffen zur Sachverhaltsaufklärung zu?\n\n1. Belastende Tatsachen sind zu ermitteln.\n2. Entlastende Tatsachen sind zu ermitteln.\n3. Auch Einlassungen des Beschuldigten sind zu würdigen.\n4. Ziel ist die objektive Sachverhaltsaufklärung.",
    "options": [
      "Nur 1–3",
      "Nur 2–4",
      "Alle",
      "Nur 1 und 4"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Reihenfolge entspricht dem gesetzlichen Ablauf?",
    "options": [
      "Tatverdacht → Ermittlungen → Vernehmung → VP → Schlussgehör → Nachtfrist → Verhängung",
      "Vernehmung → VP → Ermittlungen → Verhängung",
      "VP → Verhängung → Ermittlungen",
      "Schlussgehör → Ermittlungen → Verhängung"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Reihenfolge entspricht der Prüfung einer Beschwerde?",
    "options": [
      "Begründetheit → Zulässigkeit → Entscheidung",
      "Zulässigkeit → Begründetheit → Entscheidung",
      "Entscheidung → Zulässigkeit → Begründetheit",
      "Frist → Entscheidung → Begründetheit"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Reihenfolge ist sachgerecht?",
    "options": [
      "Vorgesetztenverhältnis → Rechtmäßigkeit → Verbindlichkeit → Gehorsamspflicht",
      "Verbindlichkeit → Vorgesetztenverhältnis → Dienstvergehen",
      "Dienstvergehen → Strafbarkeit → Vorgesetztenverhältnis",
      "Rechtmäßigkeit → Dienstgrad → Verbindlichkeit"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welche Umstände dürfen bei der Bemessung einer Disziplinarmaßnahme berücksichtigt werden?\n\n1. Schwere des Dienstvergehens\n2. Auswirkungen\n3. Schuldmaß\n4. Beweggründe\n5. Bisherige Führung\n6. Persönlichkeit",
    "options": [
      "Nur 1–4",
      "Nur 2–6",
      "Alle",
      "Nur 1, 3 und 5"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welcher Prüfungsablauf ist sachgerecht?",
    "options": [
      "VorgV → Rechtmäßigkeit des Befehls → Verbindlichkeit → mögliche Folgen der Nichtbefolgung",
      "Verbindlichkeit → Rechtmäßigkeit → VorgV",
      "Dienstvergehen → VorgV → Strafrecht",
      "Strafrecht → WBO → WDO"
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Welcher Umstand führt nicht automatisch zur Unverbindlichkeit eines Befehls?",
    "options": [
      "Verstoß gegen eine interne Verwaltungsvorschrift.",
      "Aufforderung zu einer Straftat.",
      "Verletzung der Menschenwürde.",
      "Offensichtlich fehlender dienstlicher Zweck."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Während der Ermittlungen entlastet ein Zeuge den Beschuldigten vollständig. Ein anderer Zeuge belastet ihn erheblich. Wie ist zu verfahren?",
    "options": [
      "Nur der glaubwürdigere Zeuge wird berücksichtigt.",
      "Beide Aussagen sind zu würdigen und ihre Glaubhaftigkeit zu prüfen.",
      "Der belastende Zeuge ist vorrangig zu berücksichtigen.",
      "Das Verfahren ist einzustellen."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Während einer Gefechtsausbildung erhält ein Soldat gleichzeitig Weisungen seines Gruppenführers, des Leiters der Gefechtsausbildung, des Kompaniechefs. Welche Aussagen treffen zu?\n\n1. Mehrere Vorgesetztenverhältnisse können gleichzeitig bestehen.\n2. Jede Weisung ist automatisch gleichrangig.\n3. Maßgeblich sind die jeweilige Rechtsgrundlage und der Aufgabenbereich.\n4. Ein Ausbildungsleiter kann nur innerhalb seines Aufgabenbereichs Befehle erteilen.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 3 und 4",
      "Nur 2 und 4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Während einer Schießausbildung ordnet der verantwortliche Schießleiter einem Soldaten an: „Sicherung einlegen, Waffe entladen und drei Schritte zurücktreten.„ Der Soldat antwortet: „Sie sind nicht mein Zugführer. Ich befolge Ihren Befehl nicht.„ Welche Aussagen treffen zu?\n\n1. Zunächst ist zu prüfen, ob der Schießleiter aufgrund seines Aufgabenbereichs Vorgesetzter ist.\n2. Ein Unterstellungsverhältnis ist nicht in jedem Fall Voraussetzung für eine Befehlsbefugnis.\n3. Liegt ein wirksames Vorgesetztenverhältnis vor, kann die Verweigerung ein Dienstvergehen darstellen.\n4. Ohne Unterstellung gibt es niemals ein Vorgesetztenverhältnis.",
    "options": [
      "Nur 1 und 2",
      "Nur 1–3",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Fälle",
    "mode": "single",
    "topic": "Komplexe Fälle",
    "q": "Während eines laufenden Disziplinarverfahrens stellen Sie fest, dass Sie selbst Zeuge des Vorfalls waren. Welche Aussage trifft zu?",
    "options": [
      "Sie bleiben zuständig.",
      "Ein Zuständigkeitswechsel kommt in Betracht.",
      "Das Verfahren ist automatisch beendet.",
      "Die Vertrauensperson übernimmt."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Anfangsverdacht eines Dienstvergehens liegt vor. Was gilt?",
    "options": [
      "Ermittlungen stehen im freien Ermessen.",
      "Disziplinarvorgesetzter muss ermitteln.",
      "Ermittlungen erst nach Strafurteil.",
      "Erst VP anhören, dann Verdacht prüfen."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Ausbilder befiehlt einem Rekruten, Regenwürmer zu essen. Welche Aussage trifft zu?",
    "options": [
      "Befehl ist nur unzweckmäßig.",
      "Menschenwürdeverletzung; Befehl unverbindlich.",
      "Befehl ist verbindlich, bis Beschwerde entschieden ist.",
      "Nur § 17 SG ist betroffen."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Beschuldigter legt ein vollständiges Geständnis ab. Welche Aussagen treffen zu?\n\n1. Das Geständnis beendet die Ermittlungen automatisch.\n2. Die Glaubhaftigkeit des Geständnisses ist zu würdigen.\n3. Entlastende Umstände sind weiterhin zu prüfen.\n4. Weitere Beweiserhebungen können erforderlich sein.",
    "options": [
      "Nur 2 und 3",
      "Nur 2–4",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Beschuldigter macht zunächst ein Geständnis. Später widerruft er dieses vollständig. Welche Aussage trifft zu?",
    "options": [
      "Maßgeblich ist ausschließlich das erste Geständnis.",
      "Der Widerruf beendet das Verfahren.",
      "Beide Einlassungen sind im Rahmen der Beweiswürdigung zu bewerten.",
      "Das Geständnis darf nach einem Widerruf nicht mehr berücksichtigt werden."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Fachvorgesetzter erteilt einen Befehl außerhalb seines Fachbereichs. Welche Aussage trifft zu?",
    "options": [
      "Fachvorgesetzte dürfen alles befehlen.",
      "Seine Befugnis ist auf den Fachbereich begrenzt.",
      "Der Befehl ist automatisch rechtmäßig.",
      "§ 4 VorgV verdrängt § 2 VorgV immer."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Feldwebel beleidigt einen Untergebenen, schlägt ihn, unterlässt anschließend die Meldung, beeinflusst später einen Zeugen. Welche Aussagen treffen zu?\n\n1. Es kommen mehrere Pflichtverletzungen nach dem Soldatengesetz in Betracht.\n2. Strafrechtliche Vorschriften können betroffen sein.\n3. Das Verhalten kann die Bemessung der Disziplinarmaßnahme erschwerend beeinflussen.\n4. Die Zeugenbeeinflussung ist für das Disziplinarverfahren ohne Bedeutung.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Feldwebel erscheint alkoholisiert, beleidigt einen Untergebenen, macht im Disziplinarverfahren falsche Angaben, verweigert später einen unverbindlichen Befehl und legt Beschwerde gegen die Disziplinarmaßnahme ein. Welche Rechtsgebiete sind betroffen?",
    "options": [
      "Nur SG",
      "SG, WDO, WBO; WStG/Strafrecht je nach Einzelhandlung",
      "Nur WBO",
      "Nur Strafrecht"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Feldwebel misshandelt einen Untergebenen, beleidigt ihn, macht im Disziplinarverfahren falsche Angaben, beeinflusst anschließend einen Zeugen. Welche Aussagen treffen zu?\n\n1. Mehrere Dienstpflichten können verletzt sein.\n2. Strafrechtliche Konsequenzen sind möglich.\n3. Das Verhalten kann sich auf die Bemessung der Disziplinarmaßnahme auswirken.\n4. Das Verfahren ist allein wegen der Falschangaben automatisch beendet.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Gruppenführer sieht, wie Untergebene einen Kameraden erniedrigen, greift aber nicht ein. Welche Pflichten sind zu prüfen?",
    "options": [
      "Nur § 12 SG bei den Tätern.",
      "§ 10 Abs. 2 SG beim Gruppenführer und § 12 SG bei den Tätern.",
      "Nur § 13 SG.",
      "Keine, weil kein Befehl betroffen ist."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Hauptfeldwebel befiehlt einem Gefreiten: „Löschen Sie sofort alle Aufzeichnungen des heutigen Schießens, damit die Sicherheitsmängel nicht auffallen.„ Welche Aussagen treffen zu?\n\n1. Es ist zunächst das Vorgesetztenverhältnis zu prüfen.\n2. Der Befehl verfolgt keinen rechtmäßigen dienstlichen Zweck.\n3. Die Ausführung könnte strafrechtliche Konsequenzen haben.\n4. Der Soldat darf den Befehl nicht allein deshalb ausführen, weil er von einem Vorgesetzten stammt.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Alle Aussagen",
      "Nur 1, 3 und 4"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat beobachtet, wie ein Kamerad vorsätzlich Material beschädigt. Er schweigt aus falsch verstandener Kameradschaft. Welche Aussagen treffen zu?\n\n1. Kameradschaft bedeutet nicht, Dienstvergehen zu decken.\n2. Das Schweigen kann disziplinarrechtlich relevant sein.\n3. Kameradschaftspflichten können mit anderen Dienstpflichten zusammentreffen.\n4. Solange kein Schaden entsteht, bleibt das Verhalten folgenlos.",
    "options": [
      "Nur 1 und 2",
      "Nur 2–4",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat bleibt eigenmächtig fern und wollte sich von Anfang an dauerhaft dem Dienst entziehen. Welche Norm ist naheliegend?",
    "options": [
      "§ 15 WStG",
      "§ 16 WStG",
      "§ 19 WStG",
      "§ 31 WStG"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat erhält den Befehl, Beweismittel aus einem laufenden Ermittlungsverfahren zu vernichten. Welche Aussagen treffen zu?\n\n1. Der Soldat muss die Strafbarkeit seines Handelns berücksichtigen.\n2. Ein solcher Befehl ist nicht allein wegen der Befehlsform verbindlich.\n3. Die bloße Herkunft des Befehls von einem Vorgesetzten genügt nicht.\n4. Eine Befolgung kann strafrechtliche Folgen für den Untergebenen haben.",
    "options": [
      "Nur 1 und 2",
      "Nur 2–4",
      "Alle Aussagen",
      "Nur 1, 3 und 4"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat erhält den Befehl, dienstliche Unterlagen zu vernichten, obwohl gegen diese bereits ein Ermittlungsverfahren läuft. Welche Aussage trifft zu?",
    "options": [
      "Der Soldat muss den Befehl ausführen, da er von einem Vorgesetzten stammt.",
      "Der Soldat darf die Ausführung verweigern, wenn der Befehl auf eine Straftat gerichtet ist.",
      "Der Soldat muss zunächst Beschwerde einlegen und den Befehl danach ausführen.",
      "Die Rechtmäßigkeit spielt keine Rolle."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat erhält einen offensichtlich strafbaren Befehl. Welche Aussage trifft zu?",
    "options": [
      "Er muss ihn ausführen.",
      "Er darf ihn ausführen, wenn er Gegenvorstellung erhebt.",
      "Er darf ihn nicht ausführen.",
      "Nur der Vorgesetzte ist verantwortlich."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat erscheint alkoholisiert zum Dienst, verweigert einen rechtmäßigen und verbindlichen Befehl, beleidigt seinen Zugführer. Welche Aussagen treffen zu?\n\n1. Mehrere Dienstpflichten können verletzt sein.\n2. Eine Strafbarkeit nach dem Wehrstrafgesetz kann zu prüfen sein.\n3. Es liegt nur eine einzige Pflichtverletzung vor.\n4. Ein Disziplinarverfahren ist grundsätzlich möglich.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 4",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat erscheint pünktlich zum Dienst, ist aber wegen Alkoholkonsums nicht dienstfähig. Welche Aussage trifft zu?",
    "options": [
      "Keine Pflichtverletzung, da er erschienen ist.",
      "§ 7 SG ist wegen Schlechtleistung zu prüfen.",
      "Nur § 17 SG ist einschlägig.",
      "Es liegt automatisch Fahnenflucht vor."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat ist als Leiter einer konkreten Ausbildung eingesetzt. Seine Befehlsbefugnis ergibt sich am ehesten aus:",
    "options": [
      "§ 1 VorgV",
      "§ 2 VorgV",
      "§ 5 VorgV",
      "§ 6 VorgV"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat legt Beschwerde gegen eine Disziplinarmaßnahme ein, bevor die Vollstreckung begonnen hat. Welche Wirkung hat die Beschwerde?",
    "options": [
      "Keine Wirkung.",
      "Hemmende Wirkung.",
      "Maßnahme automatisch aufgehoben.",
      "Nur bei Verweis hemmend."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat legt fristgerecht Beschwerde ein. Die Beschwerde ist zulässig, aber unbegründet. Wie lautet die Entscheidung?",
    "options": [
      "Verwerfung als unzulässig.",
      "Einstellung.",
      "Zurückweisung als unbegründet.",
      "Sofortige Abhilfe."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat macht als Beschuldigter freiwillig Angaben und verschweigt dabei bewusst einen entscheidenden Umstand. Welche Aussage trifft zu?",
    "options": [
      "Das ist zulässig, da er Beschuldigter ist.",
      "Es ist zu prüfen, ob dadurch die soldatische Wahrheitspflicht verletzt wurde.",
      "Verschweigen ist niemals relevant.",
      "Nur ausdrückliche Falschaussagen sind disziplinarrechtlich bedeutsam."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat macht als Beschuldigter nach ordnungsgemäßer Belehrung freiwillig Angaben und lügt bewusst. Welche Aussage trifft zu?",
    "options": [
      "Er darf lügen, weil er Beschuldigter ist.",
      "Schweigerecht bedeutet auch Recht zur Lüge.",
      "Bei freiwilliger Aussage gilt die Wahrheitspflicht.",
      "§ 13 SG gilt nur vor Gericht."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat reicht seine Beschwerde zwei Monate nach Kenntnis der Maßnahme ein. Gründe für die Verspätung liegen nicht vor. Welche Aussage trifft zu?",
    "options": [
      "Die Beschwerde ist grundsätzlich fristgerecht.",
      "Die Zulässigkeit ist wegen der Frist zu prüfen.",
      "Die Begründetheit wird zuerst geprüft.",
      "Die Frist ist bedeutungslos."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat verweigert einen rechtmäßigen und verbindlichen Befehl ohne nachvollziehbaren Grund. Welche Aussage trifft zu?",
    "options": [
      "Eine Strafbarkeit nach dem Wehrstrafgesetz kann zu prüfen sein.",
      "Jeder Befehlsverstoß ist nur disziplinarrechtlich relevant.",
      "Es liegt ausschließlich ein Verstoß gegen § 17 SG vor.",
      "Die Rechtmäßigkeit des Befehls spielt keine Rolle."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat verweigert einen unverbindlichen Befehl. Welche Aussage trifft zu?",
    "options": [
      "§ 19 WStG ist regelmäßig nicht erfüllt.",
      "§ 19 WStG ist immer erfüllt.",
      "Dienstgrad entscheidet.",
      "Unverbindlichkeit spielt keine Rolle."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat wird zum Leiter einer ABC-Ausbildung bestellt. Welche Aussage trifft zu?",
    "options": [
      "Er ist automatisch Disziplinarvorgesetzter.",
      "Seine Befehlsbefugnis beschränkt sich grundsätzlich auf den übertragenen Aufgabenbereich.",
      "Er ist allen Soldaten der Bundeswehr uneingeschränkt weisungsbefugt.",
      "Seine Befehlsbefugnis endet erst mit dem Ausscheiden aus der Bundeswehr."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Soldat äußert privat extreme politische Ansichten, tritt damit aber nicht nach außen auf. Welche Aussage ist am zutreffendsten?",
    "options": [
      "§ 8 SG ist automatisch verletzt.",
      "Entscheidend ist regelmäßig eine äußere Manifestation.",
      "Private Gedanken sind immer strafbar.",
      "§ 8 SG gilt nur im Dienst."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Vorgesetzter befiehlt einem Soldaten, privat sein Auto zu waschen. Welche Aussage trifft zu?",
    "options": [
      "Dienstlicher Zweck fehlt.",
      "Befehl ist rechtmäßig, weil Vorgesetzter.",
      "Soldat muss immer gehorchen.",
      "Es liegt automatisch § 19 WStG vor."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Vorgesetzter schlägt einen Untergebenen. Welche Normen können betroffen sein?",
    "options": [
      "Nur § 223 StGB",
      "§ 223 StGB und § 30 WStG",
      "Nur § 13 SG",
      "Nur WBO"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein Zugführer erfährt, dass Sicherheitsbestimmungen bei einer Ausbildung regelmäßig missachtet werden. Er unternimmt nichts, da bisher kein Unfall eingetreten ist. Welche Aussage trifft zu?",
    "options": [
      "Ohne Schaden liegt keine Pflichtverletzung vor.",
      "Bereits das bewusste Unterlassen erforderlicher Maßnahmen kann dienstrechtlich relevant sein.",
      "Dienstaufsicht beginnt erst nach einem Unfall.",
      "Sicherheitsverstöße sind ausschließlich Angelegenheit des Kompaniechefs."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein rechtskräftiges Strafurteil enthält tatsächliche Feststellungen. Welche Aussage trifft zu?",
    "options": [
      "Kann Bindungswirkung entfalten.",
      "Ist disziplinarrechtlich immer bedeutungslos.",
      "Beendet automatisch das Disziplinarverfahren.",
      "Gilt genauso wie ein Strafbefehl."
    ],
    "correct": 0,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Ein ziviler Rechtslehrer unterrichtet Soldaten. Welche Aussage ist richtig?",
    "options": [
      "Er ist militärischer Vorgesetzter nach VorgV.",
      "Er erteilt militärische Befehle nach §§ 10, 11 SG.",
      "Er kann dienstliche Weisungen geben; ein militärisches Vorgesetztenverhältnis folgt daraus nicht automatisch.",
      "Soldaten müssen zivilen Lehrern nie folgen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Eine Disziplinarmaßnahme wurde verhängt. Der Disziplinarvorgesetzte merkt später, dass sie zu streng war. Was gilt grundsätzlich?",
    "options": [
      "Er kann sie jederzeit selbst ändern.",
      "Er kann sie jederzeit aufheben.",
      "Er kann sie grundsätzlich nicht mehr selbst ändern.",
      "Die VP entscheidet."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Eine zulässige Beschwerde ist unbegründet. Entscheidung?",
    "options": [
      "Verwerfung als unzulässig",
      "Stattgabe",
      "Zurückweisung als unbegründet",
      "Einstellung"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Nach Abschluss des Schlussgehörs wird ein weiterer Zeuge vernommen. Er belastet den Beschuldigten erheblich. Welche Aussagen treffen zu?\n\n1. Die neuen Erkenntnisse sind zu würdigen.\n2. Der Beschuldigte muss grundsätzlich erneut Gelegenheit zur Stellungnahme erhalten.\n3. Die Vertrauensperson ist – soweit erforderlich – erneut zu beteiligen.\n4. Die Disziplinarmaßnahme darf unmittelbar verhängt werden.",
    "options": [
      "Nur 1 und 2",
      "Nur 2 und 3",
      "Nur 1–3",
      "Alle"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Nach dem Schlussgehör darf die Disziplinarmaßnahme frühestens verhängt werden:",
    "options": [
      "sofort",
      "nach Ablauf der Nachtfrist",
      "erst nach Ablauf der Beschwerdefrist",
      "erst nach Strafurteil"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Nach den Ermittlungen wird die VP angehört, danach das Schlussgehör durchgeführt. Anschließend kommt ein neuer belastender Zeuge hinzu. Was ist richtig?",
    "options": [
      "Sofort verhängen.",
      "Zeugen ignorieren.",
      "Nachermitteln und erforderliche Verfahrensschritte erneut durchführen.",
      "Verfahren automatisch einstellen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Sie sind Kompaniechef. Ein Soldat Ihrer Kompanie soll während einer Standortveranstaltung einen Kameraden geschlagen haben. Der Vorfall ereignete sich außerhalb der Kaserne. Welche Aussage trifft zu?",
    "options": [
      "Da sich der Vorfall außerhalb der Kaserne ereignete, ist ausschließlich die zivile Polizei zuständig.",
      "Außerdienstliches Verhalten ist für das Disziplinarrecht grundsätzlich bedeutungslos.",
      "Es ist zu prüfen, ob ein Dienstvergehen vorliegt; strafrechtliche Ermittlungen schließen disziplinare Ermittlungen nicht aus.",
      "Erst nach Abschluss eines Strafverfahrens dürfen disziplinare Ermittlungen beginnen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Sie übernehmen als Bataillonskommandeur ein Disziplinarverfahren. Bei der Prüfung stellen Sie fest: ordnungsgemäße Ermittlungen, ordnungsgemäße Belehrung, ordnungsgemäße Beschuldigtenvernehmung, Vertrauensperson beteiligt, Schlussgehör durchgeführt, anschließend neue belastende Erkenntnisse, Disziplinarmaßnahme verhängt. Welche Bewertung trifft am ehesten zu?",
    "options": [
      "Das Verfahren ist offensichtlich fehlerfrei.",
      "Nach den neuen belastenden Erkenntnissen hätten die erforderlichen Verfahrensschritte vor der Verhängung erneut geprüft und gegebenenfalls durchgeführt werden müssen.",
      "Neue Erkenntnisse dürfen nach dem Schlussgehör grundsätzlich nicht mehr berücksichtigt werden.",
      "Die Verhängung heilt den Verfahrensfehler."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Sie übernehmen als neuer Kompaniechef ein laufendes Disziplinarverfahren. Bei der Aktenprüfung stellen Sie fest: ordnungsgemäße Ermittlungen, ordnungsgemäße Beschuldigtenvernehmung, keine Beteiligung der Vertrauensperson, obwohl der Beschuldigte dies verlangt hatte, Schlussgehör durchgeführt, Disziplinarmaßnahme bereits verhängt. Welche Aussage trifft zu?",
    "options": [
      "Das Verfahren ist offensichtlich fehlerfrei.",
      "Die unterlassene Beteiligung der Vertrauensperson ist rechtlich zu prüfen und kann die Rechtmäßigkeit des Verfahrens beeinflussen.",
      "Die Beteiligung der Vertrauensperson ist immer entbehrlich.",
      "Nach der Verhängung dürfen keine Verfahrensfehler mehr geprüft werden."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Sie übernehmen ein Disziplinarverfahren kurz vor dessen Abschluss. Bei der Aktenprüfung stellen Sie fest: Ermittlungen vollständig, Beschuldigtenvernehmung ordnungsgemäß, Vertrauensperson ordnungsgemäß beteiligt, Schlussgehör durchgeführt, danach neuer entlastender Zeuge, Disziplinarmaßnahme noch nicht verhängt. Wie gehen Sie vor?",
    "options": [
      "Sofort die Disziplinarmaßnahme verhängen.",
      "Den neuen Zeugen ignorieren.",
      "Den entlastenden Zeugen vernehmen und anschließend prüfen, ob weitere Verfahrensschritte – insbesondere ein erneutes Schlussgehör – erforderlich sind.",
      "Das Verfahren einstellen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Was ist bei jeder Beschwerde zuerst zu prüfen?",
    "options": [
      "Frist",
      "Begründetheit",
      "Beschwerdeart / Statthaftigkeit",
      "Entscheidung"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage beschreibt Legalitäts- und Opportunitätsprinzip richtig?",
    "options": [
      "Ermittlung und Ahndung sind immer Ermessen.",
      "Ermittlung ist Pflicht, Ahndung steht im Ermessen.",
      "Ahndung ist Pflicht, Ermittlung Ermessen.",
      "Beide Prinzipien gibt es nur im Strafrecht."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Frühere Führung kann berücksichtigt werden.",
      "Beweggründe sind zu berücksichtigen.",
      "Die öffentliche Meinung bestimmt die Disziplinarmaßnahme.",
      "Das Schuldmaß ist zu berücksichtigen."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Die Zulässigkeit wird vor der Begründetheit geprüft.",
      "Eine zulässige Beschwerde kann unbegründet sein.",
      "Eine verspätete Beschwerde ist stets begründet.",
      "Die Frist gehört zur Zulässigkeitsprüfung."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage ist falsch?",
    "options": [
      "Rechtmäßigkeit und Verbindlichkeit sind getrennt zu prüfen.",
      "Ein rechtswidriger Befehl kann verbindlich sein.",
      "Jeder rechtswidrige Befehl ist automatisch unverbindlich.",
      "Ein strafbarer Befehl darf nicht befolgt werden."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage ist richtig?",
    "options": [
      "Die Vertrauensperson wird grundsätzlich erst nach der Verhängung beteiligt.",
      "Nach neuen belastenden Erkenntnissen kann eine erneute Beteiligung des Beschuldigten erforderlich sein.",
      "Die Nachtfrist entfällt immer.",
      "Das Schlussgehör ist freiwillig."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage ist richtig?",
    "options": [
      "Jeder nicht ausgeführte Befehl erfüllt automatisch § 19 WStG.",
      "Ein unverbindlicher Befehl kann grundsätzlich keinen Ungehorsam nach § 19 WStG begründen.",
      "Ungehorsam setzt keinen militärischen Befehl voraus.",
      "Die Rechtmäßigkeit eines Befehls ist bedeutungslos."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage zum Schlussgehör ist richtig?",
    "options": [
      "Es ersetzt die VP-Anhörung.",
      "Es ist das letzte Wort des Beschuldigten vor Entscheidung.",
      "Es findet nach der Verhängung statt.",
      "Es ist stets mündlich ausreichend."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage zum Strafbefehl ist richtig?",
    "options": [
      "Strafbefehl hat dieselbe Bindungswirkung wie Urteil.",
      "Strafbefehl entfaltet keine entsprechende Bindungswirkung wie ein Urteil.",
      "Strafbefehl beendet jedes Disziplinarverfahren.",
      "Strafbefehl ersetzt das Schlussgehör."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Aussage zur politischen Betätigung von Soldaten ist richtig?",
    "options": [
      "Soldaten dürfen sich nie politisch betätigen.",
      "Politische Betätigung ist grundsätzlich erlaubt, aber im Dienst, in Uniform oder unter Ausnutzung der Dienststellung eingeschränkt.",
      "Politische Betätigung ist nur Offizieren erlaubt.",
      "§ 15 SG verbietet jede Parteimitgliedschaft."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Dominanzreihenfolge gilt bei konkurrierenden Vorgesetztenverhältnissen nach der VorgV?",
    "options": [
      "§ 1 → § 2 → § 3 → § 4 → § 5 → § 6",
      "§ 5 → § 3 → § 1 → § 2 → § 4; § 6",
      "§ 4 → § 2 → § 1 → § 3 → § 5",
      "§ 6 → § 5 → § 4 → § 3 → § 2 → § 1"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Faktoren sind für die Bemessung einer Disziplinarmaßnahme besonders bedeutsam?\n\n1. Schwere des Dienstvergehens.\n2. Schuldmaß.\n3. Auswirkungen.\n4. Beweggründe.\n5. Persönlichkeit und bisherige Führung.",
    "options": [
      "Nur 1–3",
      "Nur 2–5",
      "Alle",
      "Nur 1 und 5"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Reihenfolge ist bei der Prüfung eines Befehls sachgerecht?",
    "options": [
      "Verbindlichkeit → Rechtmäßigkeit → VorgV",
      "VorgV → Rechtmäßigkeit → Verbindlichkeit",
      "Strafbarkeit → Beschwerde → VorgV",
      "WDO → WBO → VorgV"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welche Reihenfolge ist bei einer Beschuldigtenvernehmung grundsätzlich richtig?",
    "options": [
      "Aussage → Belehrung → Tatvorwurf",
      "Tatvorwurf → Belehrung → Einlassung des Beschuldigten",
      "Schlussgehör → Belehrung → Aussage",
      "VP-Anhörung → Aussage → Belehrung"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Welcher Gesichtspunkt gehört nicht zu den maßgeblichen Bemessungskriterien?",
    "options": [
      "Schwere des Dienstvergehens",
      "Beweggründe",
      "Sympathie des Disziplinarvorgesetzten für den Soldaten",
      "Bisherige Führung"
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Während der Ermittlungen ergeben sich entlastende Tatsachen. Was gilt?",
    "options": [
      "Nur belastende Tatsachen zählen.",
      "Entlastendes ist erst im Beschwerdeverfahren relevant.",
      "Belastende und entlastende Umstände sind zu ermitteln.",
      "Entlastendes darf ignoriert werden."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Während der Ermittlungen ergibt sich ein Video, das den Beschuldigten vollständig entlastet. Wie ist zu verfahren?",
    "options": [
      "Das Video wird nicht berücksichtigt.",
      "Nur Zeugenaussagen dürfen gewertet werden.",
      "Das entlastende Beweismittel ist in die Sachverhaltsaufklärung einzubeziehen.",
      "Das Verfahren endet automatisch."
    ],
    "correct": 2,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Während einer Gefechtsausbildung erhält ein Soldat gleichzeitig Befehle von seinem Gruppenführer und vom Ausbildungsleiter. Beide Befehle betreffen denselben Ausbildungsabschnitt, unterscheiden sich jedoch im Inhalt. Welche Aussagen treffen zu?\n\n1. Mehrere Vorgesetztenverhältnisse können gleichzeitig bestehen.\n2. Zunächst ist die jeweilige Rechtsgrundlage der Befehlsbefugnis zu prüfen.\n3. Der Soldat darf frei entscheiden, welchen Befehl er befolgt.\n4. Widersprüchliche Befehle müssen nach den Grundsätzen der VorgV und den konkreten Zuständigkeiten bewertet werden.",
    "options": [
      "Nur 1 und 2",
      "Nur 1, 2 und 4",
      "Nur 2–4",
      "Alle"
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  },
  {
    "cat": "Prüfung",
    "mode": "single",
    "topic": "Prüfungssimulation",
    "q": "Während einer Schießausbildung ordnet der verantwortliche Schießleiter einem Soldaten an: „Feuer einstellen!„ Der Soldat verweigert die Ausführung mit der Begründung: „Sie sind nicht mein Disziplinarvorgesetzter.„ Welche Aussage trifft zu?",
    "options": [
      "Nur Disziplinarvorgesetzte dürfen Befehle erteilen.",
      "Die Eigenschaft als Disziplinarvorgesetzter ist nicht Voraussetzung für eine Befehlsbefugnis.",
      "Der Soldat entscheidet selbst, wer Vorgesetzter ist.",
      "Ohne truppendienstliche Unterstellung gibt es niemals eine Befehlsbefugnis."
    ],
    "correct": 1,
    "expl": "Zu dieser Frage ist in der Word-Datei keine zusätzliche Begründung hinterlegt."
  }
];

// ─── KATEGORIE-STYLING ────────────────────────────────────────────────────────
const CAT_STYLES = {
  GG:           { bg:"#1A3A5C", light:"#E6EEF5", accent:"#1A6B9A", icon:Shield, label:"Verfassungsrecht (GG)" },
  SG:           { bg:"#7A4419", light:"#FBF1E6", accent:"#B5651D", icon:BookOpen, label:"Soldatengesetz (SG)" },
  VorgV:        { bg:"#4B2E83", light:"#F1ECFA", accent:"#6A4BBC", icon:Scale, label:"Vorgesetztenverordnung (VorgV)" },
  Befehlsrecht: { bg:"#5C2E2E", light:"#FAEEEE", accent:"#A94A4A", icon:Shield, label:"Befehlsrecht" },
  Strafrecht:   { bg:"#2C3E50", light:"#EAF0F5", accent:"#2E4053", icon:Scale, label:"Strafrecht (StGB / WStG)" },
  WDO:          { bg:"#1F3864", light:"#E8EDF5", accent:"#2E5F8A", icon:Shield, label:"Disziplinarrecht (WDO)" },
  WBO:          { bg:"#1E5631", light:"#E9F5EC", accent:"#2D7A45", icon:BookOpen, label:"Beschwerderecht (WBO)" },
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

  // ── START ──
  if (stage === "start") {
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:620, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", marginBottom:18, boxShadow:"0 8px 24px rgba(46,95,138,0.4)" }}><Award size={28} color="#fff" /></div>
            <div style={{ fontSize:11, letterSpacing:3, color:"#7FA8D9", fontWeight:600, marginBottom:6 }}>BUNDESWEHR OFFIZIERSLEHRGANG · LUFTWAFFE</div>
            <h1 style={{ fontSize:28, fontWeight:800, margin:0 }}>Prüfungs-Quiz Recht</h1>
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
