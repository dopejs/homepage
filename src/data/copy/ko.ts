import type { ProjectCopyMap } from './types';

export const ko: ProjectCopyMap = {
  'dope-agent': {
    tagline: '개인용 에이전트 OS — 로컬 데몬 하나에 여러 개의 얇은 클라이언트.',
    summary:
      'Rust 컨트롤 플레인이 로컬에서 실행되며 런타임, LLM 프로바이더, 채널 커넥터, 저장소, 이벤트를 담당합니다. 클라이언트는 얇게 유지됩니다: React 웹 UI, 전체 화면 Rust TUI, 채팅 채널 커넥터, TypeScript SDK — 모두 동일한 JSON Schema 계약을 따릅니다.',
    body: [
      '제품의 본체는 데몬입니다. 정확해야 하는 모든 것 — 세션 상태, 프로바이더 라우팅, 툴 하네스, 이벤트 로그 — 이 하나의 Rust 워크스페이스에 모여 로컬 HTTP API 뒤에 있습니다. 클라이언트는 그 위의 뷰일 뿐입니다. 데몬 바이너리는 `dope-cli`, HTTP API는 `dope-api`입니다.',
      '언어 간 계약은 `schemas/`에 JSON Schema로 존재하며 API, 이벤트, 설정의 유일한 기준입니다. Rust 데몬과 TypeScript 클라이언트는 관례로 맞추는 대신 같은 정의에서 생성됩니다.',
      '명시된 전제는 오래 사는 에이전트 상태가 관측 가능하고 재생 가능하며 안전하게 진화할 수 있어야 한다는 것입니다. 컨텍스트 엔지니어링, 메모리, 계획, 인계, 정책은 임시방편이 아니라 재설계 대상입니다.',
    ],
    highlights: [
      'Rust 컨트롤 플레인: 런타임, LLM 프로바이더, 채널/커넥터, 스토어, 이벤트, HTTP API, 하네스를 하나의 워크스페이스에 통합.',
      '하나의 데몬 위에 세 가지 인터페이스: React 19 + Vite 웹 UI, 전체 화면 Rust TUI(`dope-tui`), 채팅 채널 커넥터.',
      '공유 JSON Schema 계약에서 생성되는 TypeScript 클라이언트 SDK(`@dope/client`).',
      '테스트와 프로덕션 환경 분리 — `~/.dope-test`는 19192 포트, `~/.dope`는 19191 포트. 테스트에서는 실제 커넥터가 기본 비활성화.',
      '이전 Go 데몬은 Rust 워크스페이스로 완전히 대체되었으며 마이그레이션 기록은 `crates/MIGRATION.md`에 있습니다.',
    ],
    licenseNote: '저장소에 아직 라이선스 파일이 없습니다.',
  },

  dcode: {
    tagline: '터미널에서 실행되는 가벼운 코딩 에이전트.',
    summary:
      'Codex CLI의 DeepSeek 중심 포크로 `dcode` 명령을 제공합니다. 기본값은 DeepSeek V4 Flash이며 API 키 로그인, DeepSeek 잔액 및 모델 API, 이미지 입력을 위한 선택적 외부 비전 모델을 지원합니다. macOS, Linux, Windows용 체크섬 포함 릴리스 빌드를 제공합니다.',
    body: [
      'DCode는 상위 Codex의 개발 흐름을 유지하면서 그 위에 DeepSeek 형태의 제품을 얹었습니다. TUI에서 `/login`으로 DeepSeek API 키를 입력하면 상태 표시줄에 계정 잔액이 나타납니다. 이미지 입력은 메인 코딩 모델이 아니라 선택적 외부 비전 모델이 처리합니다.',
      '이 프로젝트가 특히 공들인 부분은 릴리스 경로입니다. 설치 스크립트는 `dcode_SHA256SUMS`로 아카이브를 검증하고, 완전한 런타임 패키지를 `${DCODE_HOME:-~/.dcode}/packages/standalone`에 풀며, `~/.local/bin`을 통해 명령을 노출합니다. `dcode update`는 같은 검증 경로로 최신 릴리스를 다시 설치합니다. macOS 산출물은 ad-hoc 서명이며 Apple 공증은 받지 않았습니다.',
    ],
    highlights: [
      '`dcode` 명령 제공. 기본값은 DeepSeek V4 Flash이며 TUI 안에서 API 키로 로그인.',
      'DeepSeek 잔액 및 모델 API 연동 — 로그인 후 남은 잔액이 상태 표시줄에 표시됩니다.',
      '이미지 입력을 위한 선택적 외부 비전 모델.',
      '릴리스 대상: macOS(Apple Silicon 및 Intel), Linux glibc(arm64 및 x86_64), Windows x86_64.',
      '설치 스크립트가 SHA-256을 검증하며 `DCODE_INSTALL_DIR`과 `DCODE_RELEASE`로 설치 경로와 버전을 바꿀 수 있습니다.',
    ],
    commandLabels: ['macOS 및 Linux', 'Windows PowerShell(x86_64)'],
  },

  gozen: {
    tagline: 'API 프록시 자동 페일오버를 갖춘 멀티 CLI 환경 전환기.',
    summary:
      'Claude Code, Codex, OpenCode의 환경을 한곳에서 전환하고, 상위 프로바이더가 불안정해져도 작업을 계속합니다 — GoZen이 API 트래픽을 프록시하고 자동으로 페일오버합니다.',
    body: [
      '모든 API 설정은 `~/.zen/zen.json`에 모이고, 단일 `zend` 데몬이 프록시 서버와 비밀번호로 보호되는 웹 UI를 함께 호스팅합니다. 디렉터리를 특정 프로파일과 CLI에 바인딩할 수 있어, 프로젝트 폴더에서 `zen`만 입력하면 알맞은 클라이언트가 알맞은 프로바이더로 연결됩니다.',
      '도입할 이유는 프록시에 있습니다. 요청은 thinking, image, long-context 같은 특성에 따라 라우팅되고, 주 프로바이더를 쓸 수 없으면 백업으로 넘어갑니다. 3버전에서는 프로바이더·모델·프로젝트별 토큰/비용 추적, 경고·다운그레이드·차단 동작이 있는 예산 한도, 프로바이더 헬스 체크, 여러 부하 분산 전략, 웹훅 알림이 추가되었습니다.',
      '설정은 WebDAV, S3, GitHub Gist 또는 GitHub 저장소를 통해 기기 간 동기화할 수 있으며 AES-256-GCM으로 암호화됩니다. 웹 UI 토큰은 세션 인증 하에 RSA로 암호화되어 전송됩니다.',
    ],
    highlights: [
      'Claude Code, Codex, OpenCode를 하나의 전환기로 관리하며 디렉터리 바인딩으로 프로젝트별 설정 가능.',
      '백업 프로바이더로 자동 페일오버하는 내장 HTTP 프록시와 시나리오 라우팅(thinking, image, 긴 컨텍스트).',
      '프로바이더·모델·프로젝트별 사용량 및 비용 추적, 일/주/월 예산 한도.',
      '지연 시간과 오류율을 추적하는 프로바이더 헬스 모니터링. 페일오버, 라운드로빈, 최소 지연, 최소 비용 분산.',
      'WebDAV, S3, GitHub Gist, GitHub 저장소를 통한 암호화 설정 동기화(AES-256-GCM).',
      'Telegram, Discord, Slack, Lark, Messenger에서 Claude Code 세션을 모니터링하고 제어하는 봇 게이트웨이.',
      '`zen upgrade`로 자체 업데이트하며 zsh / bash / fish 자동완성 제공.',
    ],
    commandLabels: ['설치', '첫 실행'],
  },

  doper: {
    tagline: '처음부터 새로 설계한 웹 Canvas 렌더링 엔진.',
    summary:
      '고성능 TSX 런타임, 네이티브 가상 스크롤, 버전이 지정된 바이너리 ABI 뒤의 결정론적 Rust/WASM 코어, 완전한 텍스트 렌더링과 Canvas 네이티브 편집. M0–M3 마일스톤이 완료되었고, M4에서 편집·이벤트·히트 테스트·접근성 체인이 들어옵니다.',
    body: [
      'doper는 아직 제품에 그대로 넣을 수 있는 렌더링 엔진이 아니며, 저장소도 그렇게 분명히 밝히고 있습니다. P0/M0부터 M3까지 완료되었고 다음 단계는 M4 — 편집, 이벤트, 히트 테스트, 접근성 체인입니다. 기술 결정은 `docs/design.md`, 전달 순서와 통과 기준은 `docs/plan.md`를 따릅니다.',
      '오늘 실제로 실행되는 것은 `apps/platform-probe`이며, 데모가 아니라 계측용 조각입니다. 워커 rAF 프레임 간격, SharedArrayBuffer를 통한 메인 스레드→워커 지연, 메인 스레드가 200ms 블로킹된 동안의 워커 자체 구동, Canvas2D 및 scroll-copy 처리량, WASM 크기와 로드 비용, 그리고 Canvas 편집 입력 경로(EditContext 우선, 중앙화된 textarea 프록시로 폴백)를 기록하며, 결정론적으로 재생되는 IME 녹화도 포함합니다.',
      '프로브는 로컬 환경이 성립한다는 것만 보여줍니다(개발 서버가 교차 출처 격리를 위해 COOP/COEP 헤더를 보냅니다). 실제 배포가 그 조건을 충족한다는 뜻은 아닙니다. 실기기 성능과 실제 IME 동작은 별도의 플랫폼 인증으로 다루며, `pnpm platform:qualify`로 인증되기 전에는 해당 수치를 주장하지 않습니다.',
    ],
    highlights: [
      '가상 스크롤을 애드온이 아닌 일급 프리미티브로 갖춘 고성능 TSX 런타임.',
      '버전이 지정된 바이너리 ABI 뒤의 결정론적 Rust/WASM 코어.',
      'Canvas 네이티브 텍스트 편집: EditContext 우선 입력, 중앙화된 textarea 프록시 폴백, 결정론적 IME 기록/재생.',
      '플랫폼 인증은 마일스톤 완료와 명확히 분리되어 있으며, 인증되지 않은 플랫폼에서는 성능을 주장하지 않습니다.',
    ],
    commandLabels: ['플랫폼 프로브 실행'],
    requirements: 'Node.js 22.12+, pnpm 10.33.2, Rust 1.96.0(wasm32-unknown-unknown 타깃 포함).',
    licenseNote: '저장소에 아직 라이선스 파일이 없습니다.',
  },

  'dope-canvas': {
    tagline: 'AI가 생성한 대량의 웹 산출물을 위한 무한 캔버스.',
    summary:
      '수백 개의 살아 있는 iframe은 확장되지 않고, 모든 페이지를 이미지로 평탄화하면 선택과 이벤트 타기팅을 잃습니다. dope-canvas는 산출물을 보존된 형태로 유지합니다 — 소스, 지속 상태, 상호작용 트리, 페인트 캐시, 선택적 라이브 런타임 — 그래서 Figma 같은 선택과 활성화가 살아남습니다. 저장소는 개발 이전 기준선 단계로 아키텍처, 전달 계획, 보안 모델은 있지만 동작하는 캔버스는 아직 없습니다.',
    body: [
      '모든 iframe은 브라우징 컨텍스트, DOM/CSS 상태, 스크립트 realm, 리소스, 렌더링 상태를 유지하므로 생성된 페이지 수백 개를 살려 두는 비용이 큽니다. 여기서의 설계적 답이 보존형 산출물 모델 — `산출물 = 소스 + 지속 상태 + 상호작용 트리 + 페인트 캐시 + 선택적 라이브 런타임` — 이며 스냅샷은 페인트 캐시일 뿐입니다. 문서와 상호작용 모델은 계속 남아 선택, 이벤트 라우팅, 활성화, 리비전 안전한 복원에 쓰입니다.',
      '캔버스가 카메라 이동, 공간 가상화, 라이브/스냅샷 생명주기, 상호작용 메타데이터, 리소스 예산, 렌더링 합성을 담당하고, 산출물은 HTML, CSS, 통제된 JavaScript를 제공합니다. 패키지 분리도 그 경계를 따릅니다 — protocol, spatial, core, artifact, security, runtime, renderer, editor. 모든 패키지는 private이고 버전은 0.0.0이며, 안정적인 공개 계약으로 제시된 것은 없습니다.',
      '두 가지 한계를 먼저 밝히고 있습니다. M0 브라우저 증거 게이트를 통과하지 못했으므로 실험적인 HTML-in-Canvas API 지원은 약속이 아니라 가능성에 머문다는 점, 그리고 라이선스가 선택되지 않아 소유자가 추가하기 전까지 저장소 내용이 오픈소스 라이선스로 제공되지 않는다는 점입니다.',
    ],
    highlights: [
      '보존형 산출물 모델: 스냅샷은 페인트 캐시일 뿐이므로 선택과 이벤트 타기팅이 유지됩니다.',
      '캔버스가 카메라, 공간 가상화, 라이브/스냅샷 생명주기, 리소스 예산, 합성을 담당합니다.',
      '패키지 경계가 설계를 반영합니다: protocol, spatial, core, artifact, security, runtime, renderer, editor.',
      '보안은 나중의 강화 작업이 아니라 일급 패키지입니다 — 새니타이저, URL 정책, 쿼터, 케이퍼빌리티.',
      '사전 문서가 갖춰져 있습니다: 기술 설계, 전달 계획, 보안 모델, 호환성 전략, 벤치마크 프로토콜, 미해결 질문.',
    ],
    requirements: 'Node.js 22.12+ 및 pnpm 10.33.2.',
    licenseNote: '아직 라이선스가 선택되지 않았습니다 — 추가되기 전까지 내용은 오픈소스 라이선스로 제공되지 않습니다.',
  },
};
