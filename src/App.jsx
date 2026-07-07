import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award, CheckSquare } from "lucide-react";

const PASSWORD = "MAJOR2026";
const APP_TITLE = "Major-Fall F – WDO Prüfung";

const QUESTIONS = [
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "1. Ermittlungspflicht",
    "q": "Ausgangslage: Major F (Inspektionschef 10. Inspektion) und Oberst C (Lehrgruppenkommandeur III./OSLw) beobachten, wie OG (OA) A seiner Kameradin OG (OA) U absichtlich und schmerzhaft auf den Fuß tritt. Müssen Major F und Oberst C disziplinar tätig werden oder können sie über das Geschehen „milde“ hinwegsehen?",
    "options": [
      "Sie können darüber hinwegsehen, weil nur ein leichter Vorfall vorliegt.",
      "Ja, es besteht eine Ermittlungspflicht nach § 32 Abs. 1 S. 1 WDO (Legalitätsprinzip).",
      "Nur Oberst C muss tätig werden, weil er ranghöher ist.",
      "Ermittlungen sind erst nach Strafanzeige zulässig."
    ],
    "correct": 1,
    "expl": "Bei Anfangsverdacht besteht eine Ermittlungspflicht nach § 32 Abs. 1 S. 1 WDO. Das ist das Legalitätsprinzip im einfachen Disziplinarverfahren.",
    "sourceId": "major-1",
    "order": 1
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "2. Zuständigkeit",
    "q": "Major F und Oberst C überlegen, wer disziplinar tätig werden muss. Wer ist zuständig?",
    "options": [
      "Oberst C als ranghöchster anwesender Soldat.",
      "Major F als nächster Disziplinarvorgesetzter, § 29 Abs. 1 S. 1, 2 i.V.m. § 28 Abs. 1 S. 2 Nr. 1 WDO.",
      "Hauptmann S als möglicher Ermittlungsführer.",
      "Das Truppendienstgericht."
    ],
    "correct": 1,
    "expl": "Zuständig ist Major F als Inspektionschef und nächster Disziplinarvorgesetzter.",
    "sourceId": "major-2",
    "order": 2
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "3a. Beschuldigter ist VP",
    "q": "Ändert sich die Zuständigkeit, wenn OG (OA) A Vertrauensperson ist? Was muss Major F veranlassen?",
    "options": [
      "Die Zuständigkeit ändert sich kraft Gesetzes.",
      "Zuständig wird der nächsthöhere Disziplinarvorgesetzte.",
      "Rechtsgrundlagen sind §§ 29 Abs. 1 S. 3, 30 Abs. 1 Nr. 3 1. Alt. WDO i.V.m. § 15 Abs. 2 S. 1 SBG.",
      "Major F muss nach § 30 Abs. 3 WDO Meldung an Oberst C machen.",
      "Major F bleibt zuständig, weil die VP-Stellung keine Rolle spielt."
    ],
    "correct": [
      0,
      1,
      2,
      3
    ],
    "expl": "Ist der beschuldigte Soldat VP, wechselt die Zuständigkeit kraft Gesetzes auf den nächsthöheren Disziplinarvorgesetzten. Major F muss melden.",
    "sourceId": "major-3a",
    "order": 3
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "3b. Geschädigte ist Tochter",
    "q": "Ändert sich die Zuständigkeit automatisch, wenn die geschädigte Soldatin die Tochter des Major F ist?",
    "options": [
      "Die Zuständigkeit ändert sich automatisch.",
      "Die Zuständigkeit ändert sich nicht automatisch.",
      "Major F kann sich wegen Befangenheit nach § 30 Abs. 2 Nr. 3 WDO für befangen erklären.",
      "Erklärt er sich für befangen, muss er dies nach § 30 Abs. 3 WDO an Oberst C melden.",
      "Der beschuldigte Soldat hat einen Anspruch auf Ablehnung des Disziplinarvorgesetzten wegen Befangenheit."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "expl": "Bei persönlicher Nähe ändert sich die Zuständigkeit nicht automatisch. Major F kann sich aber für befangen erklären und muss dann Meldung machen.",
    "sourceId": "major-3b",
    "order": 4
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "4. Delegation",
    "q": "Major F möchte die ganze Angelegenheit einschließlich disziplinarer Ahndung auf Hauptmann S übertragen. Ist das zulässig?",
    "options": [
      "Die Sachverhaltsaufklärung kann nach § 32 Abs. 2 S. 1 WDO einem Offizier übertragen werden.",
      "Die Entscheidung über die Ahndung kann vollständig übertragen werden.",
      "Das Gespräch mit der VP muss grundsätzlich der Disziplinarvorgesetzte selbst führen.",
      "Das Schlussgehör nach § 32 Abs. 5 WDO muss grundsätzlich der Disziplinarvorgesetzte selbst durchführen.",
      "Ausnahmefälle können bei dringenden dienstlichen Gründen, unverhältnismäßigem Aufwand oder erheblicher Verzögerung bestehen."
    ],
    "correct": [
      0,
      2,
      3,
      4
    ],
    "expl": "Delegierbar ist die Sachverhaltsaufklärung, nicht die disziplinare Ahndung als solche. VP-Gespräch und Schlussgehör bleiben grundsätzlich beim DVG.",
    "sourceId": "major-4",
    "order": 5
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "5. Beschleunigungsgrundsatz",
    "q": "Major F möchte wegen eines Übergabeappells erst in zwei Wochen mit den Ermittlungen beginnen. Ist das zulässig?",
    "options": [
      "Ja, organisatorische Belastung hat Vorrang.",
      "Nein, Disziplinarsachen sind beschleunigt zu behandeln (§ 17 Abs. 1 WDO).",
      "Ja, solange die sechsmonatige Frist noch läuft.",
      "Nur die VP kann den Beginn der Ermittlungen verlangen."
    ],
    "correct": 1,
    "expl": "§ 17 Abs. 1 WDO fordert die beschleunigte Behandlung von Disziplinarsachen.",
    "sourceId": "major-5",
    "order": 6
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "6. Entlastung des DVG",
    "q": "Welche Möglichkeiten hat Major F zu seiner Entlastung bei der Sachverhaltsaufklärung?",
    "options": [
      "Er kann nach § 32 Abs. 2 S. 1 WDO einen Offizier mit der Sachverhaltsaufklärung einschließlich Beschuldigtenvernehmung beauftragen.",
      "Er kann nach § 32 Abs. 2 S. 2 WDO den Inspektionsfeldwebel in bestimmten Fällen mit Zeugenvernehmungen beauftragen.",
      "Der Inspektionsfeldwebel kann auch die Beschuldigtenvernehmung durchführen.",
      "Der Fall muss zwingend wegen § 223 StGB an die Staatsanwaltschaft abgegeben werden.",
      "Für den Inspektionsfeldwebel braucht es u.a. Mannschaften oder Unteroffiziere ohne Portepee und einen Fall geringer Bedeutung."
    ],
    "correct": [
      0,
      1,
      4
    ],
    "expl": "Ein Offizier kann umfassender beauftragt werden. Der Inspektionsfeldwebel nur eingeschränkt für Zeugenvernehmungen; die Beschuldigtenvernehmung kann er hier nicht übernehmen.",
    "sourceId": "major-6",
    "order": 7
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "7. Sicherung der Flagge",
    "q": "Hauptmann S erfährt, dass OG (OA) A eine Hakenkreuzflagge im Privatfach versteckt. Auf welchem Weg kann die Flagge für die Ermittlungen gesichert werden?",
    "options": [
      "Nur durch freiwillige Herausgabe, Durchsuchung ist ausgeschlossen.",
      "Durch Durchsuchung und Beschlagnahme nach § 20 Abs. 1 WDO, wenn die Flagge gefunden wird.",
      "Nur durch die Feldjäger.",
      "Durch Vernehmung der VP."
    ],
    "correct": 1,
    "expl": "Die Flagge ist ein Augenscheinsobjekt und kann als Beweismittel durch Durchsuchung/Beschlagnahme nach § 20 Abs. 1 WDO gesichert werden.",
    "sourceId": "major-7",
    "order": 8
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "8. Richterliche Anordnung",
    "q": "Kann Major F alleine über Durchsuchung und Beschlagnahme entscheiden?",
    "options": [
      "Ja, der Disziplinarvorgesetzte entscheidet immer alleine.",
      "Nein, grundsätzlich nur auf Anordnung des Richters des zuständigen bzw. nächst erreichbaren Truppendienstgerichts, § 20 Abs. 1 S. 1 2. Halbsatz WDO.",
      "Ja, wenn Oberst C zustimmt.",
      "Nein, nur die Staatsanwaltschaft darf entscheiden."
    ],
    "correct": 1,
    "expl": "Durchsuchung und Beschlagnahme bedürfen grundsätzlich der richterlichen Anordnung.",
    "sourceId": "major-8",
    "order": 9
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "9. Gefahr im Verzug",
    "q": "OG (OA) A hat zufällig erfahren, dass gegen ihn ermittelt wird. Was gilt für Durchsuchung und Beschlagnahme?",
    "options": [
      "Bei Gefahr im Verzug darf der Disziplinarvorgesetzte ausnahmsweise ohne vorherige richterliche Anordnung handeln.",
      "Die richterliche Genehmigung muss unverzüglich beantragt werden, § 20 Abs. 2 S. 2 WDO.",
      "Gefahr im Verzug liegt vor, wenn durch vorherige richterliche Beantragung Beweismittel verloren gehen könnten.",
      "Sobald der Beschuldigte von Ermittlungen weiß, ist jede Durchsuchung verboten."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Kennt der Beschuldigte die Ermittlungen, kann Beweismittelverlust drohen. Dann kommt Gefahr im Verzug in Betracht.",
    "sourceId": "major-9",
    "order": 10
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "10. Beweismittel",
    "q": "Welche Beweismittel stehen Major F generell und in diesem Fall konkret zur Verfügung?",
    "options": [
      "Zeugen, hier insbesondere OG (OA) U, OG (OA) E, Major F und Oberst C.",
      "Augenschein, insbesondere die beschlagnahmte Hakenkreuzflagge.",
      "Sachverständige.",
      "Urkunden und andere Schriftstücke.",
      "Aussagen des Beschuldigten (§ 32 Abs. 4, 5 WDO).",
      "Nur schriftliche Urkunden sind im einfachen Disziplinarverfahren zulässig."
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4
    ],
    "expl": "Im einfachen Disziplinarverfahren kommen verschiedene Beweismittel in Betracht: Zeugen, Augenschein, Sachverständige, Urkunden/Schriftstücke und Aussagen des Beschuldigten.",
    "sourceId": "major-10",
    "order": 11
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "11. Zeuge E",
    "q": "OG (OA) E will nicht aussagen. Darf er schweigen oder wahrheitswidrig behaupten, nichts mitbekommen zu haben?",
    "options": [
      "Ein Zeugnisverweigerungsrecht nach § 52 StPO scheidet mangels Angehörigenverhältnis grundsätzlich aus.",
      "Ein Auskunftsverweigerungsrecht nach § 55 StPO kommt in Betracht, wenn er sich selbst belasten würde.",
      "Wegen einer möglichen Meldepflichtverletzung nach ISoLa kann ein Auskunftsverweigerungsrecht bestehen.",
      "Er darf ohne Weiteres lügen, um Kameradschaft zu wahren.",
      "Nach der Lösung ist OG (OA) E nicht zur Aussage verpflichtet."
    ],
    "correct": [
      0,
      1,
      2,
      4
    ],
    "expl": "Kein Zeugnisverweigerungsrecht, aber ein Auskunftsverweigerungsrecht kann wegen möglicher Selbstbelastung durch unterlassene Meldung bestehen. Lügen ist nicht erlaubt.",
    "sourceId": "major-11",
    "order": 12
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "12. Beschuldigtenvernehmung",
    "q": "OG (OA) A wird durch Zeugenaussagen und die Flagge belastet. Ist es noch nötig, den Beschuldigten selbst zu vernehmen?",
    "options": [
      "Nein, wenn die Beweise eindeutig sind.",
      "Ja, der beschuldigte Soldat ist nach § 32 Abs. 4 WDO zu vernehmen; außerdem ist ihm nach § 32 Abs. 5 WDO Schlussgehör zu gewähren.",
      "Nur wenn er selbst eine Vernehmung beantragt.",
      "Nur bei beabsichtigtem Disziplinararrest."
    ],
    "correct": 1,
    "expl": "Die Beschuldigtenvernehmung und das Schlussgehör sind Verfahrensschritte des Disziplinarverfahrens.",
    "sourceId": "major-12",
    "order": 13
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "13. Akteneinsicht",
    "q": "OG (OA) A verlangt Akteneinsicht und Ablichtungen. Muss dem entsprochen werden, obwohl er als gewalttätig gilt und Zeugen beeinflussen könnte?",
    "options": [
      "Grundsätzlich hat der Beschuldigte nach § 3 Abs. 1 S. 1 WDO ein Akteneinsichtsrecht.",
      "Bei Gefährdung des Ermittlungszwecks kann Akteneinsicht vorübergehend verwehrt werden.",
      "Spätestens zum Schlussgehör nach § 32 Abs. 5 S. 1 WDO besteht umfassendes Akteneinsichtsrecht.",
      "Akteneinsicht gibt es im einfachen Disziplinarverfahren nie."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Akteneinsicht besteht grundsätzlich, kann aber bei Gefährdung des Ermittlungszwecks vorübergehend beschränkt werden.",
    "sourceId": "major-13",
    "order": 14
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "14. Rechtsanwalt",
    "q": "Der Rechtsanwalt des A verlangt als bevollmächtigter Vertreter Beteiligung am einfachen Disziplinarverfahren. Muss Major F ihn beteiligen?",
    "options": [
      "Ja, der Rechtsanwalt ist immer Verfahrensbeteiligter.",
      "Nein, die WDO sieht im einfachen Disziplinarverfahren keine Beteiligung des Rechtsanwalts als bevollmächtigtem Vertreter vor.",
      "Ja, aber nur beim Schlussgehör.",
      "Nur die VP entscheidet darüber."
    ],
    "correct": 1,
    "expl": "Nach der Lösung besteht im einfachen Disziplinarverfahren kein Anspruch auf Vertretung durch einen Rechtsanwalt als Verfahrensbeteiligten.",
    "sourceId": "major-14",
    "order": 15
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "15. Beteiligung der VP",
    "q": "OG (OA) A gesteht. Major F will direkt das Schlussgehör durchführen und hält die Beteiligung der VP nicht für erforderlich. Wie ist die Rechtslage?",
    "options": [
      "Wenn der Beschuldigte die Beteiligung nicht ausdrücklich ablehnt, ist die VP zu beteiligen.",
      "Rechtsgrundlagen sind § 4 WDO i.V.m. § 28 Abs. 1 SBG.",
      "Die Beteiligung erfolgt nach Abschluss der Ermittlungen und vor dem Schlussgehör.",
      "Die VP wird zur Person des Soldaten, zum Sachverhalt und zur beabsichtigten Disziplinarmaßnahme gehört.",
      "Ein Geständnis ersetzt die Beteiligung der VP."
    ],
    "correct": [
      0,
      1,
      2,
      3
    ],
    "expl": "Die VP ist grundsätzlich zwingend zu beteiligen, sofern der Beschuldigte dies nicht ausdrücklich ablehnt.",
    "sourceId": "major-15",
    "order": 16
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "16. Pflichtverletzungen A",
    "q": "Gegen welche Pflichten bzw. Vorschriften hat OG (OA) A nach der Lösung verstoßen?",
    "options": [
      "Durch das Aufhängen der Hakenkreuzflagge liegt kein § 86a StGB vor, weil keine Wahrnehmbarkeit durch die Öffentlichkeit gegeben war.",
      "Durch das Aufhängen der Flagge liegt ein Verstoß gegen § 8 SG vor.",
      "Durch das Aufhängen der Flagge liegt § 17 Abs. 2 S. 1, 2. Alt. SG vor.",
      "Durch Drohung und Fußtritt liegen § 223 StGB und versuchte Nötigung nach § 240 Abs. 1, 3 StGB vor.",
      "Durch Drohung und Fußtritt liegt § 7 SG als Kernpflichtverletzung (Straftat im Dienst) vor.",
      "Zusätzlich sind § 12 S. 2 SG und § 17 Abs. 2 S. 1, 2. Alt. SG verletzt.",
      "Das Aufhängen der Flagge begründet in jedem Fall auch § 11 Abs. 1 S. 1 SG."
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "expl": "Die Lösung trennt Flagge und Gewalt/Drohung: Flagge: § 8 SG und § 17 Abs. 2 S. 1, 2. Alt. SG; Gewalt/Drohung: u.a. StGB, § 7 SG, § 12 S. 2 SG und § 17 SG. § 11 SG wird hier nicht als eigenständige Pflichtverletzung bejaht.",
    "sourceId": "major-16",
    "order": 17
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "17. Erneute VP-Anhörung",
    "q": "Major F hatte die VP zu einer Disziplinarbuße von 2000 Euro gehört. Welche Auswirkungen haben spätere Änderungen der beabsichtigten Maßnahme?",
    "options": [
      "Reduziert Major F die Disziplinarbuße bei unverändertem Sachverhalt auf 1500 Euro, muss die VP nicht erneut angehört werden.",
      "Die Abmilderung innerhalb derselben Maßnahmenart ist keine wesentliche Änderung.",
      "Wechselt Major F auf 7 Tage Disziplinararrest, muss die VP erneut angehört werden.",
      "Der Wechsel auf eine andere Art von Disziplinarmaßnahme ist eine wesentliche Änderung.",
      "Jede Änderung des Betrages löst zwingend eine erneute VP-Anhörung aus."
    ],
    "correct": [
      0,
      1,
      2,
      3
    ],
    "expl": "Eine bloße Abmilderung innerhalb derselben Maßnahmenart erfordert keine erneute Anhörung. Ein Wechsel der Maßnahmenart, insbesondere Verschärfung, schon.",
    "sourceId": "major-17",
    "order": 18
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "18. Disziplinarbefugnis",
    "q": "Major F hält 21 Tage Disziplinararrest für erforderlich. Kann er diese Maßnahme selbst verhängen?",
    "options": [
      "Ja, als Inspektionschef kann er jeden Arrest verhängen.",
      "Nein, seine Disziplinarbefugnis reicht nicht aus; als Stufe 1 kann er gegen Mannschaften nur bis zu 7 Tage Arrest verhängen (§ 28 Abs. 1 Nr. 1 a WDO).",
      "Ja, wenn die VP zustimmt.",
      "Nein, Disziplinararrest darf nie im einfachen Disziplinarverfahren verhängt werden."
    ],
    "correct": 1,
    "expl": "Major F hat Disziplinarbefugnis der Stufe 1. Für 21 Tage Arrest ist der nächsthöhere Disziplinarvorgesetzte zuständig.",
    "sourceId": "major-18",
    "order": 19
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "19. Meldung an Oberst C",
    "q": "Was muss Major F unternehmen, damit der Lehrgruppenkommandeur III./OSLw den Fall übernehmen kann?",
    "options": [
      "Er muss nach § 30 Abs. 3, Abs. 2 Nr. 1 WDO i.V.m. § 28 Abs. 1 Nr. 1 a WDO melden, dass er seine Disziplinarbefugnis nicht für ausreichend hält.",
      "Er muss den Fall an die Staatsanwaltschaft abgeben.",
      "Er muss nur die VP informieren.",
      "Er muss die Maßnahme selbst verhängen und später korrigieren lassen."
    ],
    "correct": 0,
    "expl": "Durch die Meldung wird Oberst C als nächsthöherer Disziplinarvorgesetzter zuständig.",
    "sourceId": "major-19",
    "order": 20
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "20. VP nach Übernahme",
    "q": "Oberst C übernimmt den Fall und will nun eine strengere bzw. andere Maßnahme verhängen. Was muss er hinsichtlich der VP beachten?",
    "options": [
      "Keine erneute Anhörung erforderlich.",
      "Er muss die VP erneut anhören, weil Art bzw. Maß der beabsichtigten Disziplinarmaßnahme wesentlich geändert wurden.",
      "Die VP darf nur einmal beteiligt werden.",
      "Er muss nur Major F anhören."
    ],
    "correct": 1,
    "expl": "Bei wesentlicher Änderung der beabsichtigten Maßnahme ist eine erneute Beteiligung der VP erforderlich.",
    "sourceId": "major-20",
    "order": 21
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "21. Nachtfrist",
    "q": "Nach VP-Anhörung und Schlussgehör will Oberst C noch am Tag des Schlussgehörs 21 Tage Disziplinararrest verhängen. Ist das zulässig?",
    "options": [
      "Ja, wenn die Ermittlungen abgeschlossen sind.",
      "Nein, nach dem Schlussgehör muss vor Verhängung eine Nacht ablaufen (§ 37 Abs. 1 WDO).",
      "Ja, wenn der Richter vorher zustimmt.",
      "Nein, weil Disziplinararrest nie zulässig ist."
    ],
    "correct": 1,
    "expl": "§ 37 Abs. 1 WDO: Eine Disziplinarmaßnahme darf erst nach Ablauf einer Nacht nach dem Schlussgehör verhängt werden.",
    "sourceId": "major-21",
    "order": 22
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "22. Richterliche Zustimmung Arrest",
    "q": "Was muss Oberst C vor Verhängung des Disziplinararrests zwingend beachten?",
    "options": [
      "Er muss die richterliche Zustimmung des zuständigen bzw. nächst erreichbaren Truppendienstgerichts einholen, § 40 Abs. 1 WDO.",
      "Er braucht nur die Zustimmung der VP.",
      "Er braucht nur die Zustimmung von Major F.",
      "Eine richterliche Zustimmung ist erst bei mehr als 21 Tagen erforderlich."
    ],
    "correct": 0,
    "expl": "Disziplinararrest darf erst verhängt werden, nachdem der Richter des zuständigen bzw. nächst erreichbaren Truppendienstgerichts zugestimmt hat.",
    "sourceId": "major-22",
    "order": 23
  },
  {
    "cat": "Major-Fall",
    "mode": "multi",
    "topic": "23. Kombination Arrest und Buße",
    "q": "Kann Oberst C zusätzlich zum Disziplinararrest noch 500 Euro Disziplinarbuße verhängen?",
    "options": [
      "Nein, diese Kombination ist grundsätzlich nicht in § 22 Abs. 2 S. 1 WDO genannt.",
      "Andere als die in § 22 Abs. 2 S. 1 WDO genannten Kombinationen sind nach § 22 Abs. 2 S. 2 WDO unzulässig.",
      "Nur bei unerlaubter Abwesenheit von mehr als einem Tag kann die Disziplinarbuße mit Ausgangsbeschränkung oder Disziplinararrest kombiniert werden (§ 22 Abs. 2 S. 1 Nr. 2 WDO).",
      "Ja, Disziplinarbuße und Disziplinararrest sind immer kombinierbar."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "expl": "Die Kombination Arrest + Buße ist nur in den gesetzlich zugelassenen Fällen möglich. Hier ist sie unzulässig.",
    "sourceId": "major-23",
    "order": 24
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "24. Früheste Vollstreckung",
    "q": "Der Lehrgruppenkommandeur will am 10.07. Disziplinararrest verhängen. Wann kann frühestens mit der Vollstreckung begonnen werden?",
    "options": [
      "10.07., sofort.",
      "11.07., 06:00 Uhr.",
      "11.07. nach der Mittagspause, 13:00 Uhr (§ 47 Abs. 1 WDO).",
      "12.07., 00:00 Uhr."
    ],
    "correct": 2,
    "expl": "Nach der Lösung: früheste Vollstreckung am Folgetag nach der Mittagspause, also 11.07., 13:00 Uhr.",
    "sourceId": "major-24",
    "order": 25
  },
  {
    "cat": "Major-Fall",
    "mode": "single",
    "topic": "25. Sofortige Vollstreckbarkeit",
    "q": "Gibt es beim Disziplinararrest eine Möglichkeit, das Verfahren bzw. die Vollstreckung zu beschleunigen?",
    "options": [
      "Nein, die Vollstreckung kann nie beschleunigt werden.",
      "Ja, der Richter kann zugleich die sofortige Vollstreckbarkeit anordnen, wenn dies zur Aufrechterhaltung der militärischen Ordnung geboten ist (§ 40 Abs. 1 S. 4 WDO).",
      "Ja, Major F kann die sofortige Vollstreckbarkeit selbst anordnen.",
      "Nur die VP kann die sofortige Vollstreckbarkeit anordnen."
    ],
    "correct": 1,
    "expl": "§ 40 Abs. 1 S. 4 WDO ermöglicht die richterliche Anordnung der sofortigen Vollstreckbarkeit.",
    "sourceId": "major-25",
    "order": 26
  }
];

const CAT_STYLES = {
  "Major-Fall": { bg:"#1F3864", light:"#E8EDF5", accent:"#2E5F8A", icon:Shield, label:"Major-Fall F" },
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
            <p style={{ color:"#A8BAD0", fontSize:13.5, marginTop:8 }}>{QUESTIONS.length} Fragen · Major-Fall F · Single & Multi-Select</p>
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
