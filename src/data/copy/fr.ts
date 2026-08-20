import type { ProjectCopyMap } from './types';

export const fr: ProjectCopyMap = {
  kura: {
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
    tagline: 'Un agent local et autonome de développement de jeux, avec un atelier de bureau.',
    summary:
      'Loopforge travaille à l’intérieur d’un dépôt de jeu ordinaire : il transforme des idées en expériences jouables, réunit des preuves techniques et humaines, et aide à décider explicitement de garder, d’abandonner ou de refondre. L’Agent est le plan de contrôle et le Workbench de bureau en est l’interface ; la CLI et les Skills sont des capacités internes, pas des outils à piloter à la main.',
    body: [
      'Ouvrir un projet, c’est toute la préparation : le Workbench prend un dépôt de jeu via le sélecteur de dossier natif, démarre ou reconnecte l’Agent de ce projet et charge une part restreinte du contexte, sans exposer les identifiants de fournisseur, les variables d’environnement ni les jetons d’accès.',
      'L’interface s’organise autour du projet et non du processus de l’Agent. Un menu de projet change de dépôt et de vue, l’en-tête porte l’identité du projet et ses actions, la zone de travail accueille les outils propres à chaque mode, et une barre flottante passe de l’exploration à la conception, à la compilation puis au test. Le chat accompagne le travail au lieu de le remplacer, car l’état et les preuves vivent dans le dépôt : l’historique de conversation n’est pas la seule trace de ce qui s’est passé.',
      'Les frontières sont voulues. `apps/agent` porte l’Agent métier et tout ce que voit l’utilisateur ; `cli` porte les opérations déterministes et un adaptateur sans interface, et n’est explicitement pas le plan de contrôle ; `skills` porte des capacités versionnées pour le travail qui demande du jugement ; `contracts` porte les schémas versionnés. Kura fournit le comportement générique de modèle, de session et d’exécution sans conserver d’état Loopforge, et l’application publiée embarque l’Agent avec un sidecar Kura épinglé.',
    ],
    highlights: [
      'Un Workbench de bureau (Tauri + React) comme surface du produit, dont l’Agent est l’unique sidecar.',
      'Les projets s’ouvrent depuis un dépôt de jeu ordinaire ; identifiants et variables d’environnement restent hors du contexte chargé.',
      'Barre de modes pour l’exploration, la conception, la compilation et le test, avec le chat de l’Agent à côté du travail plutôt qu’à sa place.',
      'L’état et les preuves sont écrits dans le dépôt : la trace de ce qui s’est passé ne dépend pas d’un journal de conversation.',
      'Les opérations déterministes et les Skills versionnées restent disponibles pour l’automatisation et le diagnostic — des capacités internes, pas la porte d’entrée.',
      'Le comportement générique de modèle, de session et d’exécution vient d’un sidecar Kura épinglé, la logique métier restant du côté de Loopforge.',
    ],
    commandLabels: ['Lancer le Workbench depuis un clone'],
    requirements:
      'Git, Node.js 22 et pnpm, Rust et Cargo, Python 3.11+ avec uv ; Godot 4 uniquement pour le flux Godot. Aucune version empaquetée n’existe encore : l’application de bureau se construit depuis un clone.',
  },

  pingo: {
    tagline: 'Un moteur de rendu Canvas pour le web, conçu de zéro.',
    summary:
      'Un runtime TSX performant avec défilement virtuel natif, un cœur Rust/WASM déterministe derrière une ABI binaire versionnée, un rendu de texte complet et une édition native sur Canvas. Les jalons M0 à M3 sont terminés ; M4 apportera la chaîne édition, événements, hit-testing et accessibilité.',
    body: [
      'Pingo n’est pas encore un moteur de rendu que l’on peut intégrer tel quel dans un produit, et le dépôt le dit clairement. P0/M0 à M3 sont achevés ; l’étape suivante est M4 — la chaîne édition, événements, hit-testing et accessibilité. Les décisions techniques sont arrêtées dans `docs/design.md`, l’ordre de livraison et les critères de sortie dans `docs/plan.md`.',
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
  },

  deckle: {
    tagline: 'Un canvas infini pour de grandes collections d’artefacts web générés par IA.',
    summary:
      'Des centaines d’iframes actives ne passent pas à l’échelle ; aplatir chaque page en image fait perdre la sélection et le ciblage des événements. Deckle conserve les artefacts — source, état durable, arbre d’interaction, cache de rendu et runtime actif optionnel — pour que la sélection et l’activation à la Figma survivent. Les contrats du moteur, indépendants du backend, sont implémentés et testés ; les portes de preuve navigateur ne sont pas encore franchies.',
    body: [
      'Chaque iframe conserve un contexte de navigation, un état DOM/CSS, un realm de scripts, des ressources et un état de rendu : garder des centaines de pages générées en vie passe donc très mal à l’échelle. La réponse de conception est un modèle d’artefact conservé — `artefact = source + état durable + arbre d’interaction + cache de rendu + runtime actif optionnel` — où une capture n’est qu’un cache de rendu. Le document et le modèle d’interaction restent disponibles pour la sélection, le routage d’événements, l’activation et une restauration sûre entre révisions.',
      'Comme les artefacts proviennent d’agents, ils arrivent progressivement : le streaming est donc une propriété de premier ordre du modèle de nœuds, et non une couche posée autour. Chaque type de contenu valide à sa propre frontière — un graphème, une ligne, une construction markdown fermée, une valeur JSON, une balise HTML décidée — et cette frontière n’avance que dans un sens, si bien qu’un lecteur ne voit jamais une interprétation être retirée.',
      'Implémenté et testé aujourd’hui : transactions de scène, caméra et virtualisation spatiale, cycle de vie et budgets, révisions d’artefacts, assainissement, protocole de runtime contrôlé, rendu conservé et hit-testing interne. Pas encore : les portes de preuve navigateur de M0 ne sont pas franchies, la prise en charge des API expérimentales HTML-in-Canvas est une capacité détectée par la sonde et non une promesse, et les seuils absolus de performance et de mémoire restent non fixés tant qu’il n’y a pas de mesures. Rien n’est encore un contrat public stable.',
      'Le nom résume la thèse. Un deckle est le cadre qui délimite une feuille de papier fait main pendant que la pâte se dépose encore, et le bord irrégulier qu’il laisse s’appelle un bord de deckle : un cadre autour d’un contenu qui n’a pas fini d’arriver, qui laisse la limite visible au lieu de prétendre que la feuille est terminée.',
    ],
    highlights: [
      'Modèle d’artefact conservé : une capture n’est qu’un cache de rendu, la sélection et le ciblage des événements survivent.',
      'Le streaming est intégré au modèle de nœuds, avec des frontières de validation par type qui n’avancent que dans un sens — aucune interprétation retirée.',
      'Contrats du moteur implémentés et testés : transactions de scène, caméra et virtualisation spatiale, cycle de vie, budgets, révisions, assainissement, protocole de runtime, rendu conservé, hit-testing.',
      'La sécurité est un paquet de premier ordre — assainisseur, politique d’URL, quotas et capacités — et non un durcissement tardif.',
      'Apache-2.0, choisie pour la concession de brevets : le modèle de frontières de streaming et le profil de rendu natif Canvas sont un travail d’implémentation qui gagne à une concession explicite.',
      'Les bibliothèques ont été publiées sous `@dopejs/canvas-*` jusqu’à 0.3.0 et sont renommées `@dopejs/deckle-*` à partir de 0.4.0 ; seul le nom change.',
    ],
    requirements: 'Node.js 22.12+ et pnpm 10.33.2.',
  },
};
