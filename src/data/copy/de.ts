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
    tagline: 'Eine plugin-native Terminaloberfläche für DeepSeek Harness.',
    summary:
      'dsh-tui wird als Harness-Bundle außerhalb des Quellbaums ausgeliefert und läuft im selben Prozess wie die Agent-Runtime. Es erzeugt und setzt Agenten über `ctx.agents` fort, stellt das dauerhafte Session-/Event-Log ohne Web-Client-Code dar und bietet Terminal-Adapter für Freigaben, Rückfragen und Kommandos. Version 0.1.0 ist die erste veröffentlichte Fassung.',
    body: [
      'Das hier ist ein Harness-Plugin und kein eigener Client: Es lebt im selben Prozess wie die Agent-Runtime. Die Ein-Prozess-Architektur ist Absicht — ein entfernter Transport bleibt ein möglicher späterer Adapter und Produktmodus, statt in die erste Implementierung hineingemischt zu werden.',
      '0.1.0 pinnt exakt die Harness-Peers `0.1.0-rc.6` und erhebt damit keinen Kompatibilitätsanspruch über Harness-Release-Candidates hinweg. Bevor eine Sitzung überhaupt etwas tun kann, muss eine Provider-Anmeldung wie `DEEPSEEK_API_KEY` vorhanden sein; `dsh --profile tui --doctor` prüft nur lesend Dienste, Modellauswahl, Sitzungspersistenz und Terminalfähigkeiten, ohne Sitzung oder Agent zu starten.',
      'Die Terminal-Ergonomie ist der eigentliche Inhalt des Projekts: ein mehrzeiliger Editor mit Unicode-Cursorbewegung, Auswahl, Rückgängig/Wiederholen, begrenzter Historie und Bracketed Paste; ein Transkript, das der Ausgabe folgt, bis die Navigation es löst, mit begrenzter Suche; eine unscharfe Befehlspalette auf Strg-P, die die Harness-Kommandos des Agenten mit der TUI-Navigation zusammenführt; und eine begrenzte Sitzungszentrale auf Strg-O, die nur bei untätigem Agenten und leerem Editor wechselt und die alte Anbindung zuvor vollständig leert und freigibt.',
    ],
    highlights: [
      'Harness-Plugin im selben Prozess: erzeugt und setzt Agenten über `ctx.agents` fort und stellt das dauerhafte Session-/Event-Log ohne Web-Client-Code dar.',
      'Werkzeugeigene Darstellungsabsichten für Terminal, Diff, Suche, Lesen und Web-Ergebnisse.',
      'Mehrzeiliger Editor mit Unicode-Cursorbewegung, Auswahl, Rückgängig/Wiederholen, begrenzter Historie und Bracketed Paste.',
      'Die Strg-P-Befehlspalette verbindet Harness-Kommandos mit der TUI-Navigation, sodass jedes Panel auch auf Terminals erreichbar bleibt, die keine Tastenkombinationen senden können.',
      'Barrierefreiheit ist eingebaut: Themes `default`, `high-contrast` und `no-color`, Panels benennen semantische Tonalitäten statt Farben, ein Screenreader-Modus ohne Rahmenzeichen, reduzierte Bewegung und Tastenbelegungen in einem validierten Einstellungsobjekt.',
      'Jedes erworbene Agent-Handle, jeder Listener, jede Eingabeaufforderung und jeder Terminalmodus gilt als ausdrücklich besessene Ressource.',
    ],
    commandLabels: ['TUI starten', 'Prüfung nur lesend'],
    requirements:
      'Node.js ^22.19.0 || >=24.0.0, pnpm 11.7.0 und eine Provider-Anmeldung wie DEEPSEEK_API_KEY. Die Installation des Bundles als Harness-Plugin ist im README des Repositorys beschrieben.',
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
    commandLabels: ['Plattform-Probe ausführen'],
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
