import type { ProjectCopyMap } from './types';

export const es: ProjectCopyMap = {
  kura: {
    tagline: 'Un sistema operativo personal de agentes: un daemon local y muchos clientes ligeros.',
    summary:
      'Un plano de control en Rust se ejecuta localmente y se encarga del runtime, los proveedores de LLM, los conectores de canal, el almacenamiento y los eventos. Los clientes son ligeros: una interfaz web en React, una TUI de pantalla completa en Rust, conectores de chat y un SDK de TypeScript, todos hablando los mismos contratos JSON Schema.',
    body: [
      'El daemon es el producto. Todo lo que debe ser correcto —el estado de sesión, el enrutado de proveedores, el harness de herramientas, el registro de eventos— vive en un único workspace de Rust detrás de una API HTTP local, de modo que un cliente nunca es más que una vista sobre él. El binario del daemon es `dope-cli`; la API HTTP es `dope-api`.',
      'Los contratos entre lenguajes viven en `schemas/` como JSON Schema y son la fuente de verdad para la API, los eventos y la configuración: el daemon en Rust y los clientes en TypeScript se generan a partir de las mismas definiciones en lugar de mantenerse sincronizados por convención.',
      'Una premisa explícita del proyecto es que el estado de agente de larga vida debe ser observable, reproducible y seguro de evolucionar; la ingeniería de contexto, la memoria, la planificación, los traspasos y las políticas se rediseñan en lugar de parchearse.',
    ],
    highlights: [
      'Plano de control en Rust: runtime, proveedores de LLM, canales y conectores, almacenamiento, eventos, API HTTP y harness en un solo workspace.',
      'Tres superficies sobre un mismo daemon: interfaz web con React 19 + Vite, TUI de pantalla completa en Rust (`dope-tui`) y conectores de canales de chat.',
      'SDK de cliente en TypeScript (`@dope/client`) generado a partir de los contratos JSON Schema compartidos.',
      'Entornos de prueba y producción separados: `~/.dope-test` en el puerto 19192 frente a `~/.dope` en el 19191, con los conectores reales desactivados por defecto en pruebas.',
      'El antiguo daemon en Go fue sustituido por completo por el workspace de Rust; la migración está documentada en `crates/MIGRATION.md`.',
    ],
    licenseNote: 'El repositorio todavía no incluye un archivo de licencia.',
  },

  gozen: {
    tagline: 'Conmutador de entornos para varias CLI con conmutación por error automática del proxy de API.',
    summary:
      'Cambia de entorno entre Claude Code, Codex y OpenCode desde un mismo sitio y sigue trabajando cuando un proveedor upstream se degrada: GoZen actúa como proxy del tráfico de API y conmuta por error automáticamente.',
    body: [
      'Toda la configuración de API vive en `~/.zen/zen.json`, y un único daemon `zend` aloja tanto el servidor proxy como una interfaz web protegida por contraseña. Los directorios pueden vincularse a un perfil y una CLI concretos, de modo que ejecutar `zen` dentro de una carpeta de proyecto lanza el cliente correcto contra el proveedor correcto sin pasar opciones.',
      'El proxy es la razón para usarlo: las peticiones se enrutan según características como razonamiento, imagen o contexto largo, y pasan a proveedores de respaldo cuando el principal no está disponible. La versión 3 añade seguimiento de tokens y costes por proveedor, modelo y proyecto, límites de presupuesto con acciones de aviso, degradación o bloqueo, comprobaciones de salud, varias estrategias de balanceo y notificaciones por webhook.',
      'La configuración puede sincronizarse entre dispositivos mediante WebDAV, S3, un Gist de GitHub o un repositorio de GitHub, cifrada con AES-256-GCM. Los tokens de la interfaz web se transportan con cifrado RSA bajo autenticación por sesión.',
    ],
    highlights: [
      'Un único conmutador para Claude Code, Codex y OpenCode, configurable por proyecto mediante vínculos de directorio.',
      'Proxy HTTP integrado con conmutación automática a proveedores de respaldo y enrutado por escenario (razonamiento, imagen, contexto largo).',
      'Seguimiento de uso y coste por proveedor, modelo y proyecto, con límites de presupuesto diarios, semanales y mensuales.',
      'Monitorización de salud de proveedores con latencia y tasa de error; balanceo por conmutación, round-robin, menor latencia y menor coste.',
      'Sincronización cifrada de la configuración por WebDAV, S3, Gist de GitHub o repositorio de GitHub (AES-256-GCM).',
      'Pasarela de bots para supervisar y controlar sesiones de Claude Code desde Telegram, Discord, Slack, Lark o Messenger.',
      'Autoactualización con `zen upgrade` y autocompletado para zsh, bash y fish.',
    ],
    commandLabels: ['Instalación', 'Primera ejecución'],
  },

  loopforge: {
    tagline: 'Un kit de desarrollo de juegos hecho de Agent Skills y una CLI determinista.',
    summary:
      'Loopforge ayuda a un agente de programación que ya usas a convertir una idea de juego en compilaciones jugables, probadas y respaldadas por evidencia, sin esconder el estado del proyecto dentro de un chat. El juicio creativo permanece en las skills y en la revisión humana; las transiciones de estado, la validación, la evidencia y la recuperación viven en la CLI. El proyecto está en implementación temprana.',
    body: [
      'La separación es justamente el punto. Las skills concentran el juicio creativo y la revisión humana; la CLI posee las transiciones de estado, la validación, la evidencia y la recuperación. En lugar de construir un runtime de agentes propio, Loopforge dirige los agentes de programación que ya ejecutas: `loopforge setup --host codex` instala las skills oficiales en el directorio de skills de Codex, y `$loopforge-router` lee el estado duradero del proyecto para encaminar la siguiente acción hacia el prototipado de jugabilidad, la implementación en Godot, el diseño de juego o la producción artística.',
      'El estado del proyecto es duradero e inspeccionable en vez de vivir en un registro de chat: eventos encadenados por hash, bloqueo, reconciliación, diagnósticos de solo lectura, validación de integridad de artefactos, evidencia registrada, registros de hipótesis y avance de etapa con guardas. Además, `status` deriva afirmaciones de calidad con alcance definido y las marca como obsoletas cuando cambia la identidad de su fuente, de modo que una afirmación no sobreviva a aquello que describía.',
      'El repositorio es explícito sobre lo que falta. Esto es implementación temprana: la validación contra una instalación real de Godot y las skills de publicación en etapa de producción todavía no existen. El paquete tampoco está publicado en PyPI — `uv tool install loopforge` no se refiere a este proyecto —, así que instala desde la URL de Git y fija una etiqueta o commit revisado para entornos reproducibles.',
    ],
    highlights: [
      'Agent Skills más una CLI determinista en Python: el juicio creativo en las skills, las transiciones de estado y la validación en la CLI.',
      'Estado de eventos encadenado por hash, con bloqueo, reconciliación y recuperación: el historial del proyecto es auditable en lugar de conversacional.',
      'Flujo centrado en la evidencia: evidencia registrada, registros de hipótesis, validación de integridad de artefactos y avance de etapa con guardas.',
      'Afirmaciones de calidad con alcance definido que caducan solas cuando cambia la identidad de su fuente.',
      'Adaptador de compilación y pruebas para Godot 4, importación de playtests y decisiones atómicas de mantener, descartar o refactorizar prototipos.',
      'Dirige los agentes de programación que ya usas en vez de imponer un runtime de agentes propio.',
    ],
    commandLabels: ['Instalar la CLI', 'Instalar las skills en Codex'],
    requirements:
      'Python 3.11+, uv y Git; Godot 4 solo para el flujo de compilación con Godot. No está publicado en PyPI: instala desde la URL de Git.',
    licenseNote: 'El repositorio todavía no incluye un archivo de licencia.',
  },

  pingo: {
    tagline: 'Un motor de renderizado Canvas para la web diseñado desde cero.',
    summary:
      'Un runtime TSX de alto rendimiento con scroll virtual nativo, un núcleo determinista en Rust/WASM tras una ABI binaria versionada, renderizado de texto completo y edición nativa sobre Canvas. Los hitos M0–M3 están completos; M4 trae la cadena de edición, eventos, hit-testing y accesibilidad.',
    body: [
      'Pingo todavía no es un motor de renderizado que puedas integrar en un producto, y el repositorio lo dice sin rodeos. P0/M0 hasta M3 están hechos; la siguiente etapa es M4: la cadena de edición, eventos, hit-testing y accesibilidad. Las decisiones técnicas se fijan en `docs/design.md`, y el orden de entrega y los criterios de salida en `docs/plan.md`.',
      'Lo que se ejecuta hoy es `apps/platform-probe`: una porción de medición, no una demo. Registra los intervalos de frame de rAF en el worker, la latencia del hilo principal al worker a través de SharedArrayBuffer, la autonomía del worker mientras el hilo principal se bloquea 200 ms, el rendimiento de Canvas2D y scroll-copy, el tamaño y coste de carga del WASM y la ruta de entrada de edición en Canvas —EditContext primero, con un proxy de textarea centralizado como alternativa—, incluidas sesiones de IME grabadas y reproducidas de forma determinista.',
      'La sonda demuestra que el entorno local es viable —el servidor de desarrollo envía cabeceras COOP/COEP para el aislamiento entre orígenes—, no que un despliegue en producción cumpla esas condiciones. El rendimiento en dispositivos reales y el comportamiento real del IME se tratan como una cualificación de plataforma aparte: hasta que una plataforma se cualifica con `pnpm platform:qualify`, el proyecto no reivindica esas cifras.',
    ],
    highlights: [
      'Runtime TSX de alto rendimiento con el scroll virtual como primitiva de primera clase, no como añadido.',
      'Núcleo determinista en Rust/WASM tras una ABI binaria versionada.',
      'Edición de texto nativa en Canvas: entrada con EditContext primero, proxy de textarea centralizado como alternativa y grabación/reproducción determinista del IME.',
      'La cualificación de plataforma está explícitamente separada de la finalización de hitos: en plataformas no cualificadas no se hacen afirmaciones de rendimiento.',
    ],
    commandLabels: ['Ejecutar la sonda desde una copia del repositorio'],
    requirements: 'Node.js 22.12+, pnpm 10.33.2 y Rust 1.96.0 con el target wasm32-unknown-unknown.',
    licenseNote: 'El repositorio todavía no incluye un archivo de licencia.',
  },

  deckle: {
    tagline: 'Un lienzo infinito para grandes colecciones de artefactos web generados por IA.',
    summary:
      'Cientos de iframes activos no escalan; aplanar cada página a una imagen pierde la selección y el enrutado de eventos. Deckle mantiene los artefactos retenidos — fuente, estado duradero, árbol de interacción, caché de pintado y un runtime activo opcional — de modo que la selección y la activación al estilo Figma sobreviven. Los contratos del motor, independientes del backend, están implementados y probados; las puertas de evidencia de navegador aún no se han superado.',
    body: [
      'Cada iframe retiene un contexto de navegación, estado DOM/CSS, un realm de scripts, recursos y estado de renderizado, así que mantener vivas cientos de páginas generadas escala mal. La respuesta de diseño es un modelo de artefacto retenido — `artefacto = fuente + estado duradero + árbol de interacción + caché de pintado + runtime activo opcional` — en el que una instantánea es solo una caché de pintado. El documento y el modelo de interacción siguen disponibles para la selección, el enrutado de eventos, la activación y la restauración segura entre revisiones.',
      'Como los artefactos vienen de agentes, llegan de forma incremental, y el streaming es una propiedad de primera clase del modelo de nodos y no una capa que lo envuelve. Cada tipo de contenido confirma en su propia frontera — un grafema, una línea, una construcción markdown cerrada, un valor JSON, una etiqueta HTML ya decidida — y esa frontera solo avanza, de modo que quien lee nunca ve retirarse una interpretación.',
      'Implementado y probado hoy: transacciones de escena, cámara y virtualización espacial, ciclo de vida y presupuestos, revisiones de artefactos, saneamiento, el protocolo de runtime controlado, renderizado retenido y hit testing interno. Todavía no: las puertas de evidencia de navegador de M0 no se han superado, el soporte de las APIs experimentales de HTML en Canvas es una capacidad que detecta la sonda y no una promesa, y los límites absolutos de rendimiento y memoria siguen sin fijarse hasta que existan mediciones. Nada es aún un contrato público estable.',
      'El nombre es la tesis. Un deckle es el marco que delimita una hoja de papel hecho a mano mientras la pulpa todavía se asienta, y el borde irregular que deja se llama borde de deckle: un marco alrededor de un contenido que aún no ha terminado de llegar, que deja el límite a la vista en lugar de fingir que la hoja está acabada.',
    ],
    highlights: [
      'Modelo de artefacto retenido: una instantánea es solo una caché de pintado, así que la selección y el enrutado de eventos sobreviven.',
      'El streaming está integrado en el modelo de nodos, con fronteras de confirmación por tipo que solo avanzan: ninguna interpretación se retira.',
      'Contratos del motor implementados y probados: transacciones de escena, cámara y virtualización espacial, ciclo de vida, presupuestos, revisiones, saneamiento, protocolo de runtime, renderizado retenido y hit testing.',
      'La seguridad es un paquete de primera clase —saneador, política de URL, cuotas y capacidades—, no un endurecimiento posterior.',
      'Apache-2.0, elegida por la concesión de patentes: el modelo de fronteras de streaming y el perfil de renderizado nativo en Canvas son trabajo de implementación que se beneficia de una concesión explícita.',
      'Las bibliotecas se publicaron como `@dopejs/canvas-*` hasta 0.3.0 y pasan a llamarse `@dopejs/deckle-*` desde 0.4.0; solo cambia el nombre.',
    ],
    requirements: 'Node.js 22.12+ y pnpm 10.33.2.',
  },
};
