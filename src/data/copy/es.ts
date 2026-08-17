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
    tagline: 'Una interfaz de terminal nativa de plugins para DeepSeek Harness.',
    summary:
      'dsh-tui se distribuye como un paquete de Harness fuera del árbol y se ejecuta en el mismo proceso que el runtime del agente. Crea y reanuda agentes mediante `ctx.agents`, renderiza el registro duradero de sesión y eventos sin depender del código del cliente web, y aporta adaptadores de terminal para aprobaciones, preguntas y comandos. La versión 0.1.0 es la primera publicada.',
    body: [
      'Es un plugin de Harness y no un cliente aparte: vive en el mismo proceso que el runtime del agente. La arquitectura de proceso único es deliberada; un transporte remoto queda como posible adaptador y modo de producto posterior en lugar de mezclarse con la primera implementación.',
      'La 0.1.0 fija exactamente las dependencias de Harness `0.1.0-rc.6`, así que no afirma compatibilidad entre candidatas de versión de Harness. Antes de que una sesión pueda hacer algo debe existir una credencial de proveedor como `DEEPSEEK_API_KEY`; `dsh --profile tui --doctor` realiza una comprobación de solo lectura de servicios, selector de modelo, persistencia de sesiones y capacidades del terminal, sin iniciar sesión ni agente.',
      'La ergonomía del terminal es la sustancia del proyecto: un editor multilínea con movimiento de cursor Unicode, selección, deshacer/rehacer, historial acotado y pegado entre corchetes; una transcripción que sigue la salida hasta que la navegación la desacopla, con búsqueda acotada; una paleta de comandos difusa en Ctrl-P que combina los comandos de Harness del agente con la navegación de la TUI; y un centro de sesiones acotado en Ctrl-O que solo cambia de sesión con el agente inactivo y el editor vacío, vaciando y liberando antes la conexión anterior.',
    ],
    highlights: [
      'Plugin de Harness en el mismo proceso: crea y reanuda agentes con `ctx.agents` y renderiza el registro duradero de sesión y eventos sin código del cliente web.',
      'Intenciones de presentación propiedad de cada herramienta para terminal, diff, búsqueda, lectura y resultados web.',
      'Editor multilínea con movimiento de cursor Unicode, selección, deshacer/rehacer, historial acotado y pegado entre corchetes.',
      'La paleta de comandos de Ctrl-P combina los comandos de Harness con la navegación de la TUI, de modo que todos los paneles siguen siendo accesibles en terminales que no pueden emitir combinaciones de teclas.',
      'Accesibilidad incorporada: temas `default`, `high-contrast` y `no-color`, paneles que nombran tonos semánticos en lugar de colores, modo lector de pantalla sin dibujo de cajas, movimiento reducido y reasignación de teclas en un único objeto de preferencias validado.',
      'Cada manejador de agente, escucha, aviso y modo de terminal adquirido se trata como un recurso de propiedad explícita.',
    ],
    commandLabels: ['Ejecutar la TUI', 'Comprobación de solo lectura'],
    requirements:
      'Node.js ^22.19.0 || >=24.0.0, pnpm 11.7.0 y una credencial de proveedor como DEEPSEEK_API_KEY. La instalación del paquete como plugin de Harness está documentada en el README del repositorio.',
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
    commandLabels: ['Ejecutar la sonda de plataforma'],
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
