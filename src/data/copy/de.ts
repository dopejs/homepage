import type { ProjectCopyMap } from './types';

export const de: ProjectCopyMap = {
  'dope-agent': {
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

  'dsh-tui': {
    tagline: 'Eine Terminal-Oberfläche im Stil von Claude Code für DeepSeek Harness.',
    summary:
      'dsh-tui wird als Out-of-Tree-Harness-Bundle ausgeliefert und läuft im selben Prozess wie die Agent-Laufzeit. Es erzeugt und setzt Agents über `ctx.agents` fort, rendert das dauerhafte session/event-Log ohne Web-Client-Code und stellt Terminal-Adapter für Freigaben, Rückfragen und Befehle bereit. Installation über npm, Start mit `dtui`.',
    body: [
      'Dies ist ein Harness-Plugin und kein eigener Client: Es lebt im selben Prozess wie die Agent-Laufzeit. Die Ein-Prozess-Architektur ist bewusst gewählt — ein Remote-Transport bleibt ein möglicher späterer Adapter und Produktmodus, statt in die erste Implementierung hineingemischt zu werden.',
      'Die Oberfläche folgt Claude Code: Das Transkript liest sich als ein zusammenhängendes Gespräch statt als Raster konkurrierender Bereiche, Markdown wird schon während des Streamens gerendert, und eine Statuszeile nennt verstrichene Zeit und Durchsatz. Die Herleitung ist hinter Ctrl-E eingeklappt und weder in der Zwischenablage noch im `--print`-Vertrag enthalten, damit Überlegungen nie für die Antwort gehalten werden.',
      'Die Harness-Peers sind als `^0.1.0-rc.6` und optional deklariert, denn die Harness-Laufzeit liefert die `dsh`-CLI, und niemand installiert diese Pakete stellvertretend für das Plugin. Jede Veröffentlichung prüft globale und lokale Installation gegen das aktuelle `latest` des Hosts, damit ein neuer Upstream-Release-Candidate das Paket nicht unbemerkt uninstallierbar macht.',
      'Die Ergonomie im Terminal ist die eigentliche Substanz: ein mehrzeiliger Editor mit Unicode-Cursorbewegung, Auswahl, Undo/Redo, begrenzter Historie und Bracketed Paste; `@Pfad`-Referenzen, die beim Absenden aufgelöst werden; ein Transkript, das der Ausgabe folgt, bis Navigation es löst, mit begrenzter Suche; eine Fuzzy-Befehlspalette auf Ctrl-P; und ein Sitzungscenter auf Ctrl-O, das nur wechselt, wenn der Agent untätig und der Editor leer ist.',
    ],
    highlights: [
      'Einspaltiges Transkript im Stil von Claude Code: ein zusammenhängendes Gespräch, Panels werden bei Bedarf geholt, statt um den Bildschirm zu konkurrieren.',
      'Markdown wird schon beim Streamen gerendert, durch einen begrenzten Reader, der nie wirft — ein nicht geschlossener Code-Fence wird gemeldet, nicht versteckt.',
      '`@Pfad`-Referenzen werden beim Absenden gegen den Workspace aufgelöst; jede Ablehnung wird benannt: außerhalb des Workspace, nicht lesbar, binär oder kein Attachment-Store.',
      'Eine Statuszeile mit verstrichener Zeit und Reasoning-Aufwand; die Token-Rate wird zurückgehalten statt geraten, wenn das Zeitfenster zu kurz für eine ehrliche Messung ist.',
      'Die Herleitung ist hinter Ctrl-E eingeklappt und aus Zwischenablage und `--print`-Vertrag ausgeschlossen, damit sie nie als Antwort weiterverarbeitet wird.',
      'Oberflächensprache Englisch oder Chinesisch, die ohne ausdrückliche Wahl der Locale des Hosts folgt.',
      'Ein `dtui`-Starter, der das Profil beim ersten Lauf einrichtet und es nach einem Upgrade selbst angleicht, statt einen Befehl zum Abtippen auszugeben.',
      'Die Ctrl-P-Befehlspalette vereint Harness-Befehle und TUI-Navigation, sodass jedes Panel auch auf Terminals erreichbar bleibt, die keine Tastenkombinationen senden können.',
      'Barrierefreiheit ist eingebaut: Themes `default`, `high-contrast` und `no-color`, Panels, die semantische Töne statt Farben benennen, ein Screenreader-Modus ohne Rahmenzeichen, reduzierte Bewegung und Tastenbelegungen in einem geprüften Einstellungsobjekt.',
      'Was der Host nicht bereitstellt, wird als nicht verfügbar gemeldet statt erfunden — Job-Ausgabe, Hooks, MCP-Zustand und Kosten sagen das jeweils klar.',
    ],
    commandLabels: ['Installieren', 'TUI starten', 'Nur-Lese-Umgebungsprüfung'],
    requirements:
      'Node.js ^22.19.0 || >=24.0.0 und ein Provider-Zugang wie DEEPSEEK_API_KEY. Die `dsh`-CLI delegiert Profilinstallationen an pnpm, das daher beim ersten Start verfügbar sein muss.',
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
    licenseNote: 'Das Repository enthält noch keine Lizenzdatei.',
  },

  doper: {
    tagline: 'Eine von Grund auf entworfene Canvas-Rendering-Engine fürs Web.',
    summary:
      'Eine performante TSX-Runtime mit nativem virtuellem Scrollen, einem deterministischen Rust/WASM-Kern hinter einer versionierten Binär-ABI, vollständigem Textrendering und Canvas-nativer Bearbeitung. Die Meilensteine M0–M3 sind abgeschlossen; M4 bringt die Kette aus Bearbeitung, Events, Hit-Testing und Barrierefreiheit.',
    body: [
      'doper ist noch keine Rendering-Engine, die man in ein Produkt einbauen kann — das Repository sagt das unmissverständlich. P0/M0 bis M3 sind erledigt; als Nächstes folgt M4: die Kette aus Bearbeitung, Events, Hit-Testing und Barrierefreiheit. Technische Entscheidungen stehen in `docs/design.md`, Lieferreihenfolge und Abnahmekriterien in `docs/plan.md`.',
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

  'dope-canvas': {
    tagline: 'Ein unendliches Canvas für große Mengen KI-generierter Web-Artefakte.',
    summary:
      'Hunderte aktive iframes skalieren nicht; jede Seite auf ein Bild zu reduzieren, kostet Auswahl und Event-Zuordnung. dope-canvas hält Artefakte vor — Quelltext, dauerhafter Zustand, Interaktionsbaum, Paint-Cache und optionale Live-Runtime —, sodass Auswahl und Aktivierung wie in Figma erhalten bleiben. Das Repository steht auf seiner Basislinie vor der Entwicklung: Architektur, Lieferplan und Sicherheitsmodell, aber noch kein funktionierendes Canvas.',
    body: [
      'Jedes iframe hält einen Browsing-Kontext, DOM/CSS-Zustand, ein Skript-Realm, Ressourcen und Renderzustand vor; hunderte generierte Seiten am Leben zu halten skaliert deshalb schlecht. Die Entwurfsantwort ist ein vorgehaltenes Artefaktmodell — `Artefakt = Quelltext + dauerhafter Zustand + Interaktionsbaum + Paint-Cache + optionale Live-Runtime` —, in dem ein Snapshot nur ein Paint-Cache ist. Dokument und Interaktionsmodell bleiben für Auswahl, Event-Routing, Aktivierung und revisionssichere Wiederherstellung verfügbar.',
      'Das Canvas verantwortet Kamerabewegung, räumliche Virtualisierung, Live-/Snapshot-Lebenszyklus, Interaktionsmetadaten, Ressourcenbudgets und die Rendering-Komposition; die Artefakte liefern HTML, CSS und kontrolliertes JavaScript. Der Paketschnitt folgt diesen Grenzen — protocol, spatial, core, artifact, security, runtime, renderer, editor — und alle Pakete sind privat mit Version 0.0.0; keines gilt als stabiler öffentlicher Vertrag.',
      'Zwei Grenzen werden vorab benannt: Die Browser-Nachweis-Gates von M0 sind nicht bestanden, deshalb bleibt die Unterstützung experimenteller HTML-in-Canvas-APIs eine Fähigkeit und kein Versprechen; und es wurde keine Lizenz gewählt, sodass die Inhalte bis dahin nicht unter einer Open-Source-Lizenz angeboten werden.',
    ],
    highlights: [
      'Vorgehaltenes Artefaktmodell: Ein Snapshot ist nur ein Paint-Cache, deshalb bleiben Auswahl und Event-Zuordnung erhalten.',
      'Das Canvas verantwortet Kamera, räumliche Virtualisierung, Live-/Snapshot-Lebenszyklus, Ressourcenbudgets und Komposition.',
      'Die Paketgrenzen spiegeln den Entwurf: protocol, spatial, core, artifact, security, runtime, renderer, editor.',
      'Sicherheit ist ein Paket erster Klasse — Sanitizer, URL-Policy, Kontingente und Capabilities — und keine nachträgliche Härtung.',
      'Von Anfang an dokumentiert: technischer Entwurf, Lieferplan, Sicherheitsmodell, Kompatibilitätsstrategie, Benchmark-Protokoll und offene Fragen.',
    ],
    requirements: 'Node.js 22.12+ und pnpm 10.33.2.',
    licenseNote:
      'Noch keine Lizenz gewählt — bis eine hinzugefügt wird, stehen die Inhalte nicht unter einer Open-Source-Lizenz.',
  },
};
