import type { ProjectCopyMap } from './types';

export const es: ProjectCopyMap = {
  'dope-agent': {
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

  'dsh-tui': {
    tagline: 'Una interfaz de terminal al estilo de Claude Code para DeepSeek Harness.',
    summary:
      'dsh-tui se distribuye como bundle Harness out-of-tree y se ejecuta en el mismo proceso que el runtime del agente. Crea y reanuda agentes mediante `ctx.agents`, renderiza el registro session/event duradero sin depender del código del cliente Web y aporta adaptadores de terminal para aprobaciones, preguntas y comandos. Se instala con npm y se inicia con `dtui`.',
    body: [
      'Es un plugin de Harness, no un cliente aparte: vive en el mismo proceso que el runtime del agente. La arquitectura de proceso único es deliberada — un transporte remoto queda como posible adaptador y modo de producto posterior, en vez de mezclarse en la primera implementación.',
      'La interfaz sigue a Claude Code: la transcripción se lee como una conversación continua y no como una rejilla de paneles que compiten por la pantalla, el Markdown se renderiza mientras llega en streaming y una línea de estado indica el tiempo transcurrido y el rendimiento. El razonamiento queda plegado tras Ctrl-E y fuera tanto del portapapeles como del contrato `--print`, para que la deliberación nunca se confunda con la respuesta.',
      'Los peers de Harness se declaran `^0.1.0-rc.6` y opcionales, porque el runtime de Harness lo aporta la CLI `dsh` y nada instala esos paquetes en nombre del plugin. Cada publicación verifica la instalación global y la local contra el `latest` actual del host, de modo que una nueva release candidate aguas arriba no pueda dejar el paquete instalable solo en apariencia.',
      'La ergonomía del terminal es la sustancia del proyecto: un editor multilínea con movimiento de cursor Unicode, selección, deshacer/rehacer, historial acotado y bracketed paste; referencias `@ruta` resueltas al enviar; una transcripción que sigue la salida hasta que la navegación la desacopla, con búsqueda acotada; una paleta difusa de comandos en Ctrl-P; y un centro de sesiones en Ctrl-O que solo cambia si el agente está inactivo y el editor vacío.',
    ],
    highlights: [
      'Transcripción de una sola columna al estilo de Claude Code: una conversación continua, con paneles que se piden cuando hacen falta en vez de disputarse la pantalla.',
      'Markdown renderizado mientras llega en streaming, con un lector acotado que nunca lanza excepciones: un bloque de código sin cerrar se informa, no se oculta.',
      'Referencias `@ruta` resueltas contra el espacio de trabajo al enviar, informando cada rechazo: fuera del espacio de trabajo, ilegible, binario o sin almacén de adjuntos.',
      'Una línea de estado con tiempo transcurrido y esfuerzo de razonamiento; la tasa de tokens se omite en lugar de adivinarse cuando la ventana es demasiado corta para medirla con honestidad.',
      'El razonamiento se pliega tras Ctrl-E y se excluye de la proyección al portapapeles y del contrato `--print`, para que nunca se actúe sobre él como si fuera la respuesta.',
      'Idioma de la interfaz en inglés o chino, siguiendo la configuración regional del host cuando no se elige.',
      'Un lanzador `dtui` que prepara el perfil en el primer arranque y lo realinea tras una actualización, en vez de imprimir un comando para volver a teclear.',
      'La paleta de Ctrl-P fusiona los comandos de Harness con la navegación del TUI, de forma que todo panel siga alcanzable en terminales incapaces de emitir combinaciones de teclas.',
      'La accesibilidad viene de serie: temas `default`, `high-contrast` y `no-color`, paneles que nombran tonos semánticos en vez de colores, modo lector de pantalla sin recuadros, movimiento reducido y reasignación de teclas en un único objeto de preferencias validado.',
      'Lo que el host no ofrece se informa como no disponible en lugar de fabricarse: salida de trabajos, hooks, salud de MCP y coste lo dicen con claridad.',
    ],
    commandLabels: ['Instalar', 'Ejecutar el TUI', 'Comprobación de entorno en solo lectura'],
    requirements:
      'Node.js ^22.19.0 || >=24.0.0 y una credencial de proveedor como DEEPSEEK_API_KEY. La CLI `dsh` delega la instalación de perfiles en pnpm, que debe estar disponible en el primer arranque.',
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

  doper: {
    tagline: 'Un motor de renderizado Canvas para la web diseñado desde cero.',
    summary:
      'Un runtime TSX de alto rendimiento con scroll virtual nativo, un núcleo determinista en Rust/WASM tras una ABI binaria versionada, renderizado de texto completo y edición nativa sobre Canvas. Los hitos M0–M3 están completos; M4 trae la cadena de edición, eventos, hit-testing y accesibilidad.',
    body: [
      'doper todavía no es un motor de renderizado que puedas integrar en un producto, y el repositorio lo dice sin rodeos. P0/M0 hasta M3 están hechos; la siguiente etapa es M4: la cadena de edición, eventos, hit-testing y accesibilidad. Las decisiones técnicas se fijan en `docs/design.md`, y el orden de entrega y los criterios de salida en `docs/plan.md`.',
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

  'dope-canvas': {
    tagline: 'Un lienzo infinito para grandes colecciones de artefactos web generados por IA.',
    summary:
      'Cientos de iframes activos no escalan; aplanar cada página a una imagen pierde la selección y el enrutado de eventos. dope-canvas mantiene los artefactos retenidos —fuente, estado duradero, árbol de interacción, caché de pintado y un runtime activo opcional— de modo que la selección y la activación al estilo Figma sobreviven. El repositorio está en su línea base previa al desarrollo: arquitectura, plan de entrega y modelo de seguridad, todavía sin un lienzo funcional.',
    body: [
      'Cada iframe retiene un contexto de navegación, estado DOM/CSS, un realm de scripts, recursos y estado de renderizado, así que mantener vivas cientos de páginas generadas escala mal. La respuesta de diseño es un modelo de artefacto retenido —`artefacto = fuente + estado duradero + árbol de interacción + caché de pintado + runtime activo opcional`— en el que una instantánea es solo una caché de pintado. El documento y el modelo de interacción siguen disponibles para la selección, el enrutado de eventos, la activación y la restauración segura entre revisiones.',
      'El lienzo se encarga del movimiento de cámara, la virtualización espacial, el ciclo de vida activo/instantánea, los metadatos de interacción, los presupuestos de recursos y la composición del renderizado; los artefactos aportan HTML, CSS y JavaScript controlado. La división en paquetes sigue esas fronteras —protocol, spatial, core, artifact, security, runtime, renderer, editor— y todos son privados y con versión 0.0.0: ninguno se presenta como contrato público estable.',
      'Se declaran dos límites por adelantado: no se han superado las puertas de evidencia de navegador de M0, así que el soporte de las APIs experimentales de HTML en Canvas sigue siendo una capacidad y no una promesa; y no se ha elegido licencia, por lo que hasta que los responsables añadan una, el contenido no se ofrece bajo una licencia de código abierto.',
    ],
    highlights: [
      'Modelo de artefacto retenido: una instantánea es solo una caché de pintado, así que la selección y el enrutado de eventos sobreviven.',
      'El lienzo gestiona la cámara, la virtualización espacial, el ciclo de vida activo/instantánea, los presupuestos de recursos y la composición.',
      'Las fronteras entre paquetes reflejan el diseño: protocol, spatial, core, artifact, security, runtime, renderer, editor.',
      'La seguridad es un paquete de primera clase —sanitizador, política de URL, cuotas y capacidades—, no un endurecimiento posterior.',
      'Documentado desde el inicio: diseño técnico, plan de entrega, modelo de seguridad, estrategia de compatibilidad, protocolo de benchmark y preguntas abiertas.',
    ],
    requirements: 'Node.js 22.12+ y pnpm 10.33.2.',
    licenseNote:
      'Aún no se ha elegido licencia: hasta que se añada una, el contenido no se ofrece bajo una licencia de código abierto.',
  },
};
