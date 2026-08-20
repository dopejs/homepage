import type { ProjectCopyMap } from './types';

export const de: ProjectCopyMap = {
  kura: {
    tagline: 'Ein persönliches Agenten-Betriebssystem — ein lokaler Daemon, viele schlanke Clients.',
    summary:
      'Eine Control Plane in Rust läuft lokal und verantwortet Runtime, LLM-Provider, Kanal-Konnektoren, Speicher und Events. Die Clients bleiben schlank: eine React-Weboberfläche, eine Vollbild-TUI in Rust, Chat-Konnektoren und ein TypeScript-SDK — alle sprechen dieselben JSON-Schema-Verträge.',
    body: [
      'Der Daemon ist das Produkt. Alles, was korrekt sein muss — Sitzungszustand, Provider-Routing, das Tool-Harness, das Event-Log — liegt in einem einzigen Rust-Workspace hinter einer lokalen HTTP-API; ein Client ist nie mehr als eine Sicht darauf. Die Daemon-Binary heißt `dope-cli`, die HTTP-API `dope-api`.',
      'Sprachübergreifende Verträge liegen als JSON Schema in `schemas/` und sind die maßgebliche Quelle für API, Events und Konfiguration: Der Rust-Daemon und die TypeScript-Clients werden aus denselben Definitionen generiert, statt per Konvention synchron gehalten zu werden.',
      'Eine ausdrückliche Arbeitsannahme lautet: Langlebiger Agentenzustand muss beobachtbar, wiederabspielbar und sicher weiterentwickelbar sein. Kontext-Engineering, Gedächtnis, Planung, Übergaben und Policies werden neu entworfen statt oberflächlich geflickt.',
    ],
    highlights: [
      'Rust-Control-Plane: Runtime, LLM-Provider, Kanäle/Konnektoren, Store, Events, HTTP-API und Harness in einem Workspace.',
      'Drei Oberflächen auf einem Daemon: React 19 + Vite Web-UI, Vollbild-TUI in Rust (`dope-tui`) und Chat-Konnektoren.',
      'TypeScript-Client-SDK (`@dope/client`), erzeugt aus den gemeinsamen JSON-Schema-Verträgen.',
      'Getrennte Test- und Produktionsumgebungen — `~/.dope-test` auf Port 19192 gegenüber `~/.dope` auf 19191, echte Konnektoren im Test standardmäßig deaktiviert.',
      'Der frühere Go-Daemon wurde vollständig durch den Rust-Workspace ersetzt; die Migration ist in `crates/MIGRATION.md` dokumentiert.',
    ],
    licenseNote: 'Das Repository enthält noch keine Lizenzdatei.',
  },

  gozen: {
    tagline: 'Umgebungsumschalter für mehrere CLIs mit automatischem API-Proxy-Failover.',
    summary:
      'Wechsle Umgebungen für Claude Code, Codex und OpenCode an einer Stelle und arbeite weiter, wenn ein Upstream-Anbieter schwächelt — GoZen leitet den API-Verkehr weiter und schaltet automatisch um.',
    body: [
      'Die gesamte API-Konfiguration liegt in `~/.zen/zen.json`, und ein einzelner `zend`-Daemon betreibt sowohl den Proxy-Server als auch eine passwortgeschützte Weboberfläche. Verzeichnisse lassen sich an ein bestimmtes Profil und eine CLI binden: Ein `zen` im Projektordner startet den richtigen Client gegen den richtigen Anbieter, ganz ohne Flags.',
      'Der Proxy ist der eigentliche Grund für den Einsatz: Anfragen werden nach Merkmalen wie Thinking, Bild und langem Kontext geroutet und wechseln auf Ersatzanbieter, wenn der primäre ausfällt. Version 3 ergänzt Token- und Kostenerfassung je Anbieter, Modell und Projekt, Budgetgrenzen mit Warn-, Downgrade- oder Blockieraktionen, Health-Checks, mehrere Lastverteilungsstrategien und Webhook-Benachrichtigungen.',
      'Die Konfiguration lässt sich über WebDAV, S3, einen GitHub-Gist oder ein GitHub-Repository geräteübergreifend synchronisieren, verschlüsselt mit AES-256-GCM. Tokens der Weboberfläche werden RSA-verschlüsselt hinter sitzungsbasierter Authentifizierung übertragen.',
    ],
    highlights: [
      'Ein Umschalter für Claude Code, Codex und OpenCode, per Verzeichnisbindung projektweise konfigurierbar.',
      'Eingebauter HTTP-Proxy mit automatischem Failover auf Ersatzanbieter und szenariobasiertem Routing (Thinking, Bild, langer Kontext).',
      'Nutzungs- und Kostenerfassung je Anbieter, Modell und Projekt, mit Tages-, Wochen- und Monatsbudgets.',
      'Health-Monitoring der Anbieter mit Latenz und Fehlerrate; Verteilung per Failover, Round-Robin, geringster Latenz oder geringsten Kosten.',
      'Verschlüsselte Konfigurationssynchronisierung über WebDAV, S3, GitHub-Gist oder GitHub-Repository (AES-256-GCM).',
      'Bot-Gateway zum Beobachten und Steuern von Claude-Code-Sitzungen aus Telegram, Discord, Slack, Lark oder Messenger.',
      'Selbstaktualisierung per `zen upgrade`, dazu Vervollständigung für zsh, bash und fish.',
    ],
    commandLabels: ['Installation', 'Erster Start'],
  },

  loopforge: {
    tagline: 'Ein Werkzeugkasten für Spieleentwicklung aus Agent Skills und einer deterministischen CLI.',
    summary:
      'Loopforge hilft einem Coding-Agent, den du ohnehin nutzt, aus einer Spielidee getestete, belegte und spielbare Builds zu machen — ohne den Projektzustand in einem Chat zu verstecken. Das kreative Urteil bleibt in den Skills und in der menschlichen Durchsicht; Zustandsübergänge, Validierung, Belege und Wiederherstellung bleiben in der CLI. Das Projekt steht am Anfang der Implementierung.',
    body: [
      'Genau diese Aufteilung ist der Punkt. Die Skills tragen kreatives Urteil und menschliche Durchsicht, die CLI besitzt Zustandsübergänge, Validierung, Belege und Wiederherstellung. Statt eine eigene Agent-Runtime zu bauen, steuert Loopforge die Coding-Agents, die du schon betreibst: `loopforge setup --host codex` installiert die offiziellen Skills in das Skills-Verzeichnis von Codex, und `$loopforge-router` liest den dauerhaften Projektzustand und leitet den nächsten Schritt an Gameplay-Prototyping, Godot-Implementierung, Game Design oder Art-Produktion weiter.',
      'Der Projektzustand ist dauerhaft und prüfbar, statt in einem Chatverlauf zu leben: hash-verkettete Events, Sperren, Abgleich, nur lesende Diagnosen, Integritätsprüfung von Artefakten, registrierte Belege, Hypothesen-Einträge und abgesicherte Stufenwechsel. `status` leitet zusätzlich abgegrenzte Qualitätsaussagen ab und markiert sie als veraltet, sobald sich die Identität ihrer Quelle ändert — eine Aussage überlebt nicht das, worüber sie gemacht wurde.',
      'Das Repository benennt auch das Fehlende. Dies ist eine frühe Implementierung: Die Validierung gegen eine echte Godot-Installation und Release-Skills für die Produktionsstufe fehlen noch. Das Paket ist außerdem nicht auf PyPI veröffentlicht — `uv tool install loopforge` meint nicht dieses Projekt —, also über die Git-URL installieren und für reproduzierbare Umgebungen ein geprüftes Tag oder einen Commit festnageln.',
    ],
    highlights: [
      'Agent Skills plus deterministische Python-CLI: kreatives Urteil in den Skills, Zustandsübergänge und Validierung in der CLI.',
      'Hash-verketteter Ereigniszustand mit Sperren, Abgleich und Wiederherstellung — die Projekthistorie ist prüfbar statt gesprächsbasiert.',
      'Belege zuerst: registrierte Belege, Hypothesen-Einträge, Integritätsprüfung von Artefakten und abgesicherte Stufenwechsel.',
      'Abgegrenzte Qualitätsaussagen, die automatisch veralten, wenn sich die Identität ihrer Quelle ändert.',
      'Build-/Test-Adapter für Godot 4, Import von Playtests und atomare Entscheidungen: Prototyp behalten, verwerfen oder umbauen.',
      'Steuert Coding-Agents, die du bereits nutzt, statt eine eigene Agent-Runtime mitzubringen.',
    ],
    commandLabels: ['CLI installieren', 'Skills in Codex installieren'],
    requirements:
      'Python 3.11+, uv und Git; Godot 4 nur für den Godot-Build-Workflow. Nicht auf PyPI veröffentlicht — über die Git-URL installieren.',
  },

  pingo: {
    tagline: 'Eine von Grund auf entworfene Canvas-Rendering-Engine fürs Web.',
    summary:
      'Eine performante TSX-Runtime mit nativem virtuellem Scrollen, einem deterministischen Rust/WASM-Kern hinter einer versionierten Binär-ABI, vollständigem Textrendering und Canvas-nativer Bearbeitung. Die Meilensteine M0–M3 sind abgeschlossen; M4 bringt die Kette aus Bearbeitung, Events, Hit-Testing und Barrierefreiheit.',
    body: [
      'Pingo ist noch keine Rendering-Engine, die man in ein Produkt einbauen kann — das Repository sagt das unmissverständlich. P0/M0 bis M3 sind erledigt; als Nächstes folgt M4: die Kette aus Bearbeitung, Events, Hit-Testing und Barrierefreiheit. Technische Entscheidungen stehen in `docs/design.md`, Lieferreihenfolge und Abnahmekriterien in `docs/plan.md`.',
      'Lauffähig ist heute `apps/platform-probe` — ein Messschnitt, keine Demo. Erfasst werden rAF-Frameabstände im Worker, die Latenz vom Hauptthread zum Worker über SharedArrayBuffer, die Eigenständigkeit des Workers während einer 200-ms-Blockade des Hauptthreads, der Durchsatz von Canvas2D und Scroll-Copy, Größe und Ladekosten des WASM sowie der Eingabepfad für die Canvas-Bearbeitung — EditContext zuerst, mit zentralem Textarea-Proxy als Rückfallebene — samt aufgezeichneter IME-Sitzungen, die deterministisch wiedergegeben werden.',
      'Die Probe belegt nur, dass die lokale Umgebung tragfähig ist — der Dev-Server sendet COOP/COEP-Header für Cross-Origin-Isolation —, nicht dass eine Produktionsumgebung diese Bedingungen erfüllt. Performance auf echten Geräten und echtes IME-Verhalten gelten als eigene Plattformqualifizierung: Solange eine Plattform nicht per `pnpm platform:qualify` qualifiziert ist, behauptet das Projekt deren Zahlen nicht.',
    ],
    highlights: [
      'Performante TSX-Runtime, in der virtuelles Scrollen ein Primitiv erster Klasse ist und kein nachgelagerter Aufsatz.',
      'Deterministischer Rust/WASM-Kern hinter einer versionierten Binär-ABI.',
      'Canvas-native Textbearbeitung: Eingabe zuerst über EditContext, Rückfall auf einen zentralen Textarea-Proxy, deterministische IME-Aufzeichnung und -Wiedergabe.',
      'Die Plattformqualifizierung ist ausdrücklich vom Meilensteinabschluss getrennt — auf nicht qualifizierten Plattformen werden keine Performance-Aussagen gemacht.',
    ],
    commandLabels: ['Probe aus einem Checkout des Repositorys ausführen'],
    requirements: 'Node.js 22.12+, pnpm 10.33.2 und Rust 1.96.0 mit dem Target wasm32-unknown-unknown.',
    licenseNote: 'Das Repository enthält noch keine Lizenzdatei.',
  },

  deckle: {
    tagline: 'Ein unendliches Canvas für große Mengen KI-generierter Web-Artefakte.',
    summary:
      'Hunderte aktive iframes skalieren nicht; jede Seite auf ein Bild zu reduzieren, kostet Auswahl und Event-Zuordnung. Deckle hält Artefakte vor — Quelltext, dauerhafter Zustand, Interaktionsbaum, Paint-Cache und optionale Live-Runtime —, sodass Auswahl und Aktivierung wie in Figma erhalten bleiben. Die backend-unabhängigen Engine-Verträge sind implementiert und getestet; die Browser-Nachweis-Gates sind noch nicht bestanden.',
    body: [
      'Jedes iframe hält einen Browsing-Kontext, DOM/CSS-Zustand, ein Skript-Realm, Ressourcen und Renderzustand vor; hunderte generierte Seiten am Leben zu halten skaliert deshalb schlecht. Die Entwurfsantwort ist ein vorgehaltenes Artefaktmodell — `Artefakt = Quelltext + dauerhafter Zustand + Interaktionsbaum + Paint-Cache + optionale Live-Runtime` —, in dem ein Snapshot nur ein Paint-Cache ist. Dokument und Interaktionsmodell bleiben für Auswahl, Event-Routing, Aktivierung und revisionssichere Wiederherstellung verfügbar.',
      'Weil die Artefakte von Agenten kommen, treffen sie schrittweise ein: Streaming ist deshalb eine Eigenschaft erster Klasse des Knotenmodells und keine Hülle darum. Jede Inhaltsart committet an ihrer eigenen Grenze — ein Graphem, eine Zeile, eine geschlossene Markdown-Konstruktion, ein JSON-Wert, ein entschiedenes HTML-Tag — und diese Grenze bewegt sich nur vorwärts, sodass Lesende nie erleben, dass eine Deutung zurückgenommen wird.',
      'Heute implementiert und getestet: Szenen-Transaktionen, Kamera und räumliche Virtualisierung, Lebenszyklus und Budgets, Artefakt-Revisionen, Sanitizing, das kontrollierte Runtime-Protokoll, vorgehaltenes Rendering und internes Hit-Testing. Noch nicht: Die Browser-Nachweis-Gates von M0 sind nicht bestanden, die Unterstützung experimenteller HTML-in-Canvas-APIs ist eine von der Probe erkannte Fähigkeit und kein Versprechen, und absolute Performance- und Speichergrenzen bleiben ungesetzt, bis Messwerte vorliegen. Nichts ist bislang ein stabiler öffentlicher Vertrag.',
      'Der Name ist die These. Ein Deckel (deckle) ist der Rahmen, der ein handgeschöpftes Blatt begrenzt, während der Faserbrei sich noch setzt, und die ausgefranste Kante, die er hinterlässt, heißt Büttenrand: ein Rahmen um Inhalt, der noch nicht fertig angekommen ist, der die Grenze sichtbar lässt, statt so zu tun, als wäre das Blatt fertig.',
    ],
    highlights: [
      'Vorgehaltenes Artefaktmodell: Ein Snapshot ist nur ein Paint-Cache, deshalb bleiben Auswahl und Event-Zuordnung erhalten.',
      'Streaming steckt im Knotenmodell selbst, mit Commit-Grenzen je Inhaltsart, die sich nur vorwärts bewegen — keine zurückgenommenen Deutungen.',
      'Implementierte und getestete Engine-Verträge: Szenen-Transaktionen, Kamera und räumliche Virtualisierung, Lebenszyklus, Budgets, Revisionen, Sanitizing, Runtime-Protokoll, vorgehaltenes Rendering, Hit-Testing.',
      'Sicherheit ist ein Paket erster Klasse — Sanitizer, URL-Policy, Kontingente und Capabilities — und keine nachträgliche Härtung.',
      'Apache-2.0, gewählt wegen der Patentlizenz: Das Streaming-Grenzmodell und das Canvas-native Rendering-Profil sind Implementierungsarbeit, der eine ausdrückliche Lizenz guttut.',
      'Die Bibliotheken erschienen bis 0.3.0 als `@dopejs/canvas-*` und heißen ab 0.4.0 `@dopejs/deckle-*`; es ändert sich nur der Name.',
    ],
    requirements: 'Node.js 22.12+ und pnpm 10.33.2.',
  },
};
