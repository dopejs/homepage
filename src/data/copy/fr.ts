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

  'dsh-tui': {
    tagline: 'Une interface terminal native aux plugins pour DeepSeek Harness.',
    summary:
      'dsh-tui est distribué comme un bundle Harness hors arborescence et s’exécute dans le même processus que le runtime d’agent. Il crée et reprend des agents via `ctx.agents`, affiche le journal durable des sessions et des événements sans dépendre du code du client web, et fournit des adaptateurs terminal pour les approbations, les questions et les commandes. La version 0.1.0 est la première publiée.',
    body: [
      'C’est un plugin Harness et non un client distinct : il vit dans le même processus que le runtime d’agent. Cette architecture mono-processus est délibérée — un transport distant reste un adaptateur et un mode produit envisageables plus tard, plutôt qu’un ajout mêlé à la première implémentation.',
      'La version 0.1.0 épingle exactement les pairs Harness `0.1.0-rc.6` : elle ne revendique donc aucune compatibilité entre les versions candidates de Harness. Une identification de fournisseur telle que `DEEPSEEK_API_KEY` doit exister avant qu’une session puisse faire quoi que ce soit ; `dsh --profile tui --doctor` effectue une vérification en lecture seule des services, du sélecteur de modèle, de la persistance des sessions et des capacités du terminal, sans démarrer de session ni d’agent.',
      'L’ergonomie du terminal est la substance du projet : un éditeur multiligne avec déplacement de curseur Unicode, sélection, annuler/rétablir, historique borné et collage entre crochets ; une transcription qui suit la sortie jusqu’à ce que la navigation l’en détache, avec recherche bornée ; une palette de commandes floue sur Ctrl-P qui fusionne les commandes Harness de l’agent et la navigation de la TUI ; et un centre de sessions borné sur Ctrl-O qui ne bascule que si l’agent est inactif et l’éditeur vide, après avoir vidé et libéré l’attachement précédent.',
    ],
    highlights: [
      'Plugin Harness dans le même processus : crée et reprend les agents via `ctx.agents` et affiche le journal durable des sessions et événements sans code client web.',
      'Intentions de présentation propres à chaque outil pour le terminal, les diffs, la recherche, la lecture et les résultats web.',
      'Éditeur multiligne avec déplacement de curseur Unicode, sélection, annuler/rétablir, historique borné et collage entre crochets.',
      'La palette de commandes Ctrl-P fusionne les commandes Harness et la navigation de la TUI : tous les panneaux restent accessibles même sur un terminal incapable d’émettre des combinaisons de touches.',
      'Accessibilité intégrée : thèmes `default`, `high-contrast` et `no-color`, panneaux nommant des tonalités sémantiques plutôt que des couleurs, mode lecteur d’écran sans tracé de cadres, mouvement réduit et redéfinition des touches dans un même objet de préférences validé.',
      'Chaque handle d’agent, écouteur, invite et mode terminal acquis est traité comme une ressource explicitement possédée.',
    ],
    commandLabels: ['Lancer la TUI', 'Vérification en lecture seule'],
    requirements:
      'Node.js ^22.19.0 || >=24.0.0, pnpm 11.7.0 et une identification de fournisseur telle que DEEPSEEK_API_KEY. L’installation du bundle comme plugin Harness est documentée dans le README du dépôt.',
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
