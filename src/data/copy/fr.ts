import type { ProjectCopyMap } from './types';

export const fr: ProjectCopyMap = {
  'dope-agent': {
    tagline: 'Un OS d’agents personnel — un daemon local, de nombreux clients légers.',
    summary:
      'Un plan de contrôle en Rust s’exécute localement et prend en charge le runtime, les fournisseurs de LLM, les connecteurs de canaux, le stockage et les événements. Les clients restent légers : une interface web React, une TUI Rust plein écran, des connecteurs de messagerie et un SDK TypeScript — tous fondés sur les mêmes contrats JSON Schema.',
    body: [
      'Le daemon est le produit. Tout ce qui doit être juste — l’état de session, le routage des fournisseurs, le harness d’outils, le journal d’événements — vit dans un seul workspace Rust derrière une API HTTP locale ; un client n’est jamais qu’une vue sur celui-ci. Le binaire du daemon est `dope-cli`, l’API HTTP est `dope-api`.',
      'Les contrats inter-langages se trouvent dans `schemas/` sous forme de JSON Schema et font autorité pour l’API, les événements et la configuration : le daemon Rust et les clients TypeScript sont générés à partir des mêmes définitions plutôt que synchronisés par convention.',
      'Une hypothèse de travail assumée : l’état d’agent de longue durée doit être observable, rejouable et pouvoir évoluer sans risque. L’ingénierie du contexte, la mémoire, la planification, les passations et les politiques sont repensées plutôt que rafistolées.',
    ],
    highlights: [
      'Plan de contrôle Rust : runtime, fournisseurs de LLM, canaux et connecteurs, stockage, événements, API HTTP et harness dans un seul workspace.',
      'Trois surfaces au-dessus d’un même daemon : interface web React 19 + Vite, TUI Rust plein écran (`dope-tui`) et connecteurs de messagerie.',
      'SDK client TypeScript (`@dope/client`) généré à partir des contrats JSON Schema partagés.',
      'Environnements de test et de production séparés — `~/.dope-test` sur le port 19192 contre `~/.dope` sur 19191, les connecteurs réels étant désactivés par défaut en test.',
      'L’ancien daemon Go a été entièrement remplacé par le workspace Rust ; la migration est consignée dans `crates/MIGRATION.md`.',
    ],
    licenseNote: 'Le dépôt ne contient pas encore de fichier de licence.',
  },

  gozen: {
    tagline: 'Commutateur d’environnements multi-CLI avec bascule automatique du proxy d’API.',
    summary:
      'Basculez d’un environnement à l’autre entre Claude Code, Codex et OpenCode depuis un seul endroit, et continuez à travailler quand un fournisseur en amont se dégrade : GoZen relaie le trafic d’API et bascule automatiquement.',
    body: [
      'Toute la configuration d’API vit dans `~/.zen/zen.json`, et un unique daemon `zend` héberge à la fois le serveur proxy et une interface web protégée par mot de passe. Des répertoires peuvent être liés à un profil et à une CLI précis : taper `zen` dans un dossier de projet lance le bon client vers le bon fournisseur, sans option supplémentaire.',
      'Le proxy est la vraie raison de l’utiliser : les requêtes sont routées selon leurs caractéristiques (raisonnement, image, contexte long) et basculent vers des fournisseurs de secours quand le principal est indisponible. La version 3 ajoute le suivi des jetons et des coûts par fournisseur, modèle et projet, des limites de budget avec avertissement, rétrogradation ou blocage, des contrôles de santé, plusieurs stratégies de répartition de charge et des notifications webhook.',
      'La configuration peut être synchronisée entre appareils via WebDAV, S3, un Gist GitHub ou un dépôt GitHub, chiffrée en AES-256-GCM. Les jetons de l’interface web transitent chiffrés en RSA derrière une authentification par session.',
    ],
    highlights: [
      'Un seul commutateur pour Claude Code, Codex et OpenCode, configurable par projet grâce aux liaisons de répertoire.',
      'Proxy HTTP intégré avec bascule automatique vers des fournisseurs de secours et routage par scénario (raisonnement, image, contexte long).',
      'Suivi de l’usage et des coûts par fournisseur, modèle et projet, avec limites de budget quotidiennes, hebdomadaires et mensuelles.',
      'Surveillance de santé des fournisseurs (latence et taux d’erreur) ; répartition par bascule, tourniquet, latence minimale ou coût minimal.',
      'Synchronisation chiffrée de la configuration via WebDAV, S3, Gist GitHub ou dépôt GitHub (AES-256-GCM).',
      'Passerelle de bots pour surveiller et piloter des sessions Claude Code depuis Telegram, Discord, Slack, Lark ou Messenger.',
      'Mise à jour autonome via `zen upgrade`, plus la complétion zsh / bash / fish.',
    ],
    commandLabels: ['Installation', 'Première utilisation'],
  },

  loopforge: {
    tagline: 'Une boîte à outils de développement de jeux faite d’Agent Skills et d’une CLI déterministe.',
    summary:
      'Loopforge aide un agent de code que vous utilisez déjà à transformer une idée de jeu en builds jouables, testés et étayés par des preuves, sans enfermer l’état du projet dans une conversation. Le jugement créatif reste dans les skills et la relecture humaine ; les transitions d’état, la validation, les preuves et la reprise restent dans la CLI. Le projet en est à une implémentation précoce.',
    body: [
      'C’est précisément cette séparation qui compte. Les skills portent le jugement créatif et la relecture humaine ; la CLI possède les transitions d’état, la validation, les preuves et la reprise. Plutôt que de construire un runtime d’agents propriétaire, Loopforge pilote les agents de code que vous exécutez déjà : `loopforge setup --host codex` installe les skills officielles dans le répertoire de skills de Codex, et `$loopforge-router` lit l’état durable du projet pour orienter l’action suivante vers le prototypage de gameplay, l’implémentation Godot, le game design ou la production artistique.',
      'L’état du projet est durable et inspectable au lieu de vivre dans un journal de conversation : événements chaînés par empreinte, verrouillage, réconciliation, diagnostics en lecture seule, validation de l’intégrité des artefacts, preuves enregistrées, fiches d’hypothèses et avancement d’étape sous garde. `status` dérive en outre des affirmations de qualité à portée définie et les marque comme périmées lorsque l’identité de leur source change : une affirmation ne peut pas survivre à ce qu’elle décrivait.',
      'Le dépôt dit clairement ce qui n’est pas fait. Il s’agit d’une implémentation précoce : la validation contre une installation Godot réelle et les skills de publication en production ne sont pas encore implémentées. Le paquet n’est pas non plus publié sur PyPI — `uv tool install loopforge` ne désigne pas ce projet — installez donc depuis l’URL Git et épinglez une étiquette ou un commit relu pour des environnements reproductibles.',
    ],
    highlights: [
      'Des Agent Skills et une CLI Python déterministe : le jugement créatif dans les skills, les transitions d’état et la validation dans la CLI.',
      'État d’événements chaîné par empreinte, avec verrouillage, réconciliation et reprise : l’historique du projet est auditable plutôt que conversationnel.',
      'Démarche fondée sur les preuves : preuves enregistrées, fiches d’hypothèses, validation de l’intégrité des artefacts et avancement d’étape sous garde.',
      'Des affirmations de qualité à portée définie, qui périment d’elles-mêmes quand l’identité de leur source change.',
      'Adaptateur de build et de test pour Godot 4, import de playtests et décisions atomiques de conserver, abandonner ou refondre un prototype.',
      'Pilote les agents de code que vous utilisez déjà au lieu d’imposer un runtime d’agents propriétaire.',
    ],
    commandLabels: ['Installer la CLI', 'Installer les skills dans Codex'],
    requirements:
      'Python 3.11+, uv et Git ; Godot 4 uniquement pour le flux de build Godot. Non publié sur PyPI : installez depuis l’URL Git.',
    licenseNote: 'Le dépôt ne contient pas encore de fichier de licence.',
  },

  doper: {
    tagline: 'Un moteur de rendu Canvas pour le web, conçu de zéro.',
    summary:
      'Un runtime TSX performant avec défilement virtuel natif, un cœur Rust/WASM déterministe derrière une ABI binaire versionnée, un rendu de texte complet et une édition native sur Canvas. Les jalons M0 à M3 sont terminés ; M4 apportera la chaîne édition, événements, hit-testing et accessibilité.',
    body: [
      'doper n’est pas encore un moteur de rendu que l’on peut intégrer tel quel dans un produit, et le dépôt le dit clairement. P0/M0 à M3 sont achevés ; l’étape suivante est M4 — la chaîne édition, événements, hit-testing et accessibilité. Les décisions techniques sont arrêtées dans `docs/design.md`, l’ordre de livraison et les critères de sortie dans `docs/plan.md`.',
      'Ce qui tourne aujourd’hui, c’est `apps/platform-probe` : une tranche de mesure, pas une démo. Elle enregistre les intervalles d’images rAF du worker, la latence du thread principal vers le worker via SharedArrayBuffer, l’autonomie du worker pendant un blocage de 200 ms du thread principal, le débit de Canvas2D et du scroll-copy, la taille et le coût de chargement du WASM, ainsi que le chemin de saisie pour l’édition Canvas — EditContext d’abord, avec un proxy textarea centralisé en repli — y compris des sessions IME enregistrées puis rejouées de façon déterministe.',
      'La sonde prouve que l’environnement local est viable — le serveur de développement envoie les en-têtes COOP/COEP pour l’isolation cross-origin — et non qu’un déploiement en production remplit ces conditions. Les performances sur appareil réel et le comportement réel des IME relèvent d’une qualification de plateforme distincte : tant qu’une plateforme n’est pas qualifiée via `pnpm platform:qualify`, le projet n’en revendique pas les chiffres.',
    ],
    highlights: [
      'Runtime TSX performant où le défilement virtuel est une primitive de premier ordre, pas un ajout applicatif.',
      'Cœur Rust/WASM déterministe derrière une ABI binaire versionnée.',
      'Édition de texte native sur Canvas : saisie via EditContext en priorité, repli sur un proxy textarea centralisé, enregistrement et rejeu déterministes de l’IME.',
      'La qualification de plateforme est explicitement séparée de l’achèvement des jalons : aucune revendication de performance sur une plateforme non qualifiée.',
    ],
    commandLabels: ['Lancer la sonde depuis un clone du dépôt'],
    requirements: 'Node.js 22.12+, pnpm 10.33.2 et Rust 1.96.0 avec la cible wasm32-unknown-unknown.',
    licenseNote: 'Le dépôt ne contient pas encore de fichier de licence.',
  },

  'dope-canvas': {
    tagline: 'Un canvas infini pour de grandes collections d’artefacts web générés par IA.',
    summary:
      'Des centaines d’iframes actives ne passent pas à l’échelle ; aplatir chaque page en image fait perdre la sélection et le ciblage des événements. dope-canvas conserve les artefacts — source, état durable, arbre d’interaction, cache de rendu et runtime actif optionnel — pour que la sélection et l’activation à la Figma survivent. Le dépôt en est à sa base d’avant-développement : architecture, plan de livraison et modèle de sécurité, mais pas encore de canvas fonctionnel.',
    body: [
      'Chaque iframe conserve un contexte de navigation, un état DOM/CSS, un realm de scripts, des ressources et un état de rendu : garder des centaines de pages générées en vie passe donc très mal à l’échelle. La réponse de conception est un modèle d’artefact conservé — `artefact = source + état durable + arbre d’interaction + cache de rendu + runtime actif optionnel` — où une capture n’est qu’un cache de rendu. Le document et le modèle d’interaction restent disponibles pour la sélection, le routage d’événements, l’activation et une restauration sûre entre révisions.',
      'Le canvas gère le déplacement de caméra, la virtualisation spatiale, le cycle de vie actif/capture, les métadonnées d’interaction, les budgets de ressources et la composition du rendu ; les artefacts apportent HTML, CSS et JavaScript contrôlé. Le découpage en paquets suit ces frontières — protocol, spatial, core, artifact, security, runtime, renderer, editor — et tous sont privés, en version 0.0.0 : aucun n’est présenté comme un contrat public stable.',
      'Deux limites sont annoncées d’emblée : les portes de preuve navigateur du jalon M0 ne sont pas franchies, si bien que la prise en charge des API expérimentales HTML-in-Canvas reste une capacité et non une promesse ; et aucune licence n’a été choisie, donc tant que les responsables n’en ajoutent pas une, le contenu n’est pas proposé sous licence open source.',
    ],
    highlights: [
      'Modèle d’artefact conservé : une capture n’est qu’un cache de rendu, la sélection et le ciblage des événements survivent.',
      'Le canvas gère la caméra, la virtualisation spatiale, le cycle de vie actif/capture, les budgets de ressources et la composition.',
      'Les frontières des paquets reflètent la conception : protocol, spatial, core, artifact, security, runtime, renderer, editor.',
      'La sécurité est un paquet de premier ordre — assainisseur, politique d’URL, quotas et capacités — et non un durcissement tardif.',
      'Documenté dès le départ : conception technique, plan de livraison, modèle de sécurité, stratégie de compatibilité, protocole de benchmark et questions ouvertes.',
    ],
    requirements: 'Node.js 22.12+ et pnpm 10.33.2.',
    licenseNote:
      'Aucune licence choisie pour l’instant — tant qu’elle n’est pas ajoutée, le contenu n’est pas proposé sous licence open source.',
  },
};
