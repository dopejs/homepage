import type { ProjectCopyMap } from './types';

export const zhTW: ProjectCopyMap = {
  'dope-agent': {
    tagline: '個人 Agent 作業系統 —— 一個本機常駐程式，多個輕量用戶端。',
    summary:
      'Rust 控制平面在本機執行，掌管執行時、LLM 供應方、通道連接器、儲存與事件。用戶端保持輕量：React Web UI、全螢幕 Rust TUI、聊天通道連接器與 TypeScript SDK —— 全部基於同一套 JSON Schema 契約。',
    body: [
      '常駐程式才是產品本體。所有必須保證正確的部分 —— 工作階段狀態、供應方路由、工具 harness、事件紀錄 —— 都收斂在一個 Rust workspace 裡，透過本機 HTTP API 對外暴露；用戶端不過是它的一個檢視。常駐程式執行檔為 `dope-cli`，HTTP API 為 `dope-api`。',
      '跨語言契約以 JSON Schema 形式存放在 `schemas/`，是 API、事件與設定的唯一事實來源 —— Rust 常駐程式與 TypeScript 用戶端基於同一份定義產生，而不是靠慣例手動對齊。',
      '專案明確的工作假設是：長生命週期的 Agent 狀態必須可觀測、可重播、可安全演進；脈絡工程、記憶、規劃、交接與策略是重新設計，而非小幅修補。',
    ],
    highlights: [
      'Rust 控制平面：執行時、LLM 供應方、通道連接器、儲存、事件、HTTP API 與 harness 收斂在一個 workspace。',
      '同一常駐程式之上的三種介面：React 19 + Vite Web UI、全螢幕 Rust TUI（`dope-tui`）、聊天通道連接器。',
      'TypeScript 用戶端 SDK（`@dope/client`），基於共用的 JSON Schema 契約產生。',
      '測試與正式環境隔離 —— `~/.dope-test` 使用 19192 連接埠，`~/.dope` 使用 19191；測試環境預設關閉真實連接器。',
      '早期的 Go 常駐程式已被 Rust workspace 完全取代，遷移過程記錄在 `crates/MIGRATION.md`。',
    ],
    licenseNote: '儲存庫尚未加入 license 檔案。',
  },

  'dsh-tui': {
    tagline: '為 DeepSeek Harness 打造的 Claude Code 風格終端介面。',
    summary:
      'dsh-tui 以 out-of-tree 的 Harness bundle 形式發佈，與 Agent 執行時執行在同一行程內。它透過 `ctx.agents` 建立與恢復 Agent，不依賴 Web 用戶端程式碼即可渲染持久化的 session/event 紀錄，並為審批、提問與指令提供終端轉接層。用 npm 安裝，用 `dtui` 啟動。',
    body: [
      '它是 Harness 外掛，而不是獨立用戶端：與 Agent 執行時同行程執行。同行程架構是刻意的選擇 —— 遠端傳輸被留作後續可能的轉接器與產品形態，而不是混進第一版實作裡。',
      '介面對齊 Claude Code：轉錄區是一條連貫的對話流，而不是互相搶佔畫面的分欄；助理輸出的 Markdown 邊串流邊渲染；Agent 執行時有一行狀態回報已用時間與吞吐。推理過程摺疊在 Ctrl-E 之後，並且既不進剪貼簿，也不進 `--print` 的輸出契約 —— 思考過程不應被當成結論。',
      'Harness 相依宣告為 `^0.1.0-rc.6` 且是選用的：Harness 執行時由 `dsh` CLI 提供，沒有任何安裝器會替外掛安裝這些套件。每次發佈都會對著 host 目前的 `latest` 驗證全域安裝與本地安裝，因此上游發佈新的 RC 不會讓這個套件在無人察覺的情況下變得裝不起來。',
      '終端體驗才是這個專案的實質：多行編輯器支援 Unicode 游標移動、選取、復原/重做、有界歷史與 bracketed paste；送出時解析 `@路徑` 參照；轉錄區跟隨輸出直到導覽將其脫離，並提供有界搜尋；Ctrl-P 提供模糊指令面板；Ctrl-O 的工作階段中心僅在 Agent 閒置且編輯器為空時才允許切換。',
    ],
    highlights: [
      'Claude Code 風格的單欄轉錄：一條連貫的對話流，面板按需喚出，而不是常駐搶佔畫面。',
      '助理 Markdown 邊串流邊渲染，讀取器有界且從不擲出例外 —— 未閉合的程式碼圍籬會被如實回報，而不是被隱藏。',
      '送出時對著工作區解析 `@路徑` 參照，每一次拒絕都會說明原因：越出工作區、不可讀、二進位、或沒有附件儲存。',
      '執行狀態列給出已用時間與推理強度；當時間窗太短、無法誠實量測時，寧可不給 token 速率，也不猜一個。',
      '推理摺疊在 Ctrl-E 之後，並被排除在剪貼簿投影與 `--print` 契約之外，確保它永遠不會被當作結論去執行。',
      '介面語言支援中文與英文；未明確選擇時跟隨主機 locale。',
      '`dtui` 啟動器在首次執行時自舉 profile，升級後自動對齊版本，而不是印出一條指令讓你重打。',
      'Ctrl-P 指令面板融合 Harness 指令與 TUI 導覽，即使終端無法送出組合鍵，所有面板依然可達。',
      '無障礙是內建能力：`default`、`high-contrast`、`no-color` 三套主題，面板以語意色調而非顏色命名，螢幕閱讀器模式去除畫框字元，減弱動效與按鍵重新綁定統一收在一份經驗證的偏好設定中。',
      '主機沒有提供的能力會如實回報為「不可用」，而不是編造 —— 工作輸出、hooks、MCP 健康狀態與成本都會明說。',
    ],
    commandLabels: ['安裝', '啟動 TUI', '唯讀環境檢查'],
    requirements:
      'Node.js ^22.19.0 || >=24.0.0，以及供應商憑證（如 DEEPSEEK_API_KEY）。`dsh` CLI 把 profile 的安裝委派給 pnpm，因此首次執行時機器上需要有 pnpm。',
  },

  gozen: {
    tagline: '多 CLI 環境切換器，內建 API 代理自動故障移轉。',
    summary:
      '在同一處切換 Claude Code、Codex、OpenCode 的執行環境；上游供應商不穩時也不中斷 —— GoZen 代理 API 流量並自動切換到可用線路。',
    body: [
      '所有 API 設定集中在 `~/.zen/zen.json`，單一 `zend` 常駐程式同時承載代理服務與具密碼保護的 Web UI。目錄可綁定到指定 profile 與 CLI，在專案目錄直接輸入 `zen` 就會以正確的用戶端連上正確的供應商，不需附加參數。',
      '真正的價值在代理層：請求依 thinking、image、longContext 等特徵路由，主線路無法使用時自動切到備用供應商。v3 新增了依供應商 / 模型 / 專案維度的 token 與成本統計、具警告/降級/阻擋動作的預算控制、供應商健康檢查、多種負載平衡策略以及 Webhook 通知。',
      '設定可透過 WebDAV、S3、GitHub Gist 或 GitHub 儲存庫在多裝置間同步，並以 AES-256-GCM 加密。Web UI 採用工作階段驗證，權杖傳輸使用 RSA 加密。',
    ],
    highlights: [
      '一個切換器涵蓋 Claude Code、Codex、OpenCode，可透過目錄綁定依專案設定。',
      '內建 HTTP 代理，主線路故障時自動切換備用供應商，並支援情境化路由（thinking、image、長脈絡）。',
      '依供應商、模型、專案統計用量與成本，支援日 / 週 / 月預算上限。',
      '供應商健康監控（延遲與錯誤率），支援故障移轉、輪詢、最低延遲、最低成本等平衡策略。',
      '透過 WebDAV、S3、GitHub Gist 或 GitHub 儲存庫同步設定，並以 AES-256-GCM 加密。',
      'Bot 閘道：可從 Telegram、Discord、Slack、Lark 或 Messenger 監控與控制 Claude Code 工作階段。',
      '`zen upgrade` 自我更新，並提供 zsh / bash / fish 補完。',
    ],
    commandLabels: ['安裝', '首次執行'],
  },

  loopforge: {
    tagline: '由 Agent Skills 與確定性 CLI 組成的遊戲開發工具包。',
    summary:
      'Loopforge 讓你既有的編碼 Agent 把遊戲創意變成經過測試、有證據支撐的可玩建置，而不是把專案狀態藏在聊天紀錄裡。創意判斷留在 skills 與人工審查中；狀態轉移、驗證、證據與復原則由 CLI 掌管。專案目前處於早期實作階段。',
    body: [
      '這種拆分正是重點所在。Skills 承載創意判斷與人工審查，CLI 掌管狀態轉移、驗證、證據與復原。Loopforge 不自建專有的 Agent 執行時，而是驅動你已經在用的編碼 Agent：`loopforge setup --host codex` 會把官方 skills 安裝到 Codex 的 skills 目錄，`$loopforge-router` 則讀取持久化的專案狀態，把下一步動作路由到玩法原型、Godot 實作、遊戲設計或美術製作。',
      '專案狀態是持久且可檢視的，而不是散落在對話裡：雜湊鏈事件、鎖定、對帳、唯讀診斷、產物完整性驗證、已登記的證據、假設紀錄，以及帶門檻的階段推進。`status` 還會推導出具作用域的品質結論，並在來源識別改變時標記為過期 —— 結論不能比它所描述的對象活得更久。',
      '儲存庫對「還沒做什麼」寫得很直接：目前是早期實作，針對真實 Godot 安裝的驗證與生產階段的發布 skills 尚未實作；套件也沒有發布到 PyPI —— `uv tool install loopforge` 指向的並不是本專案 —— 因此請從 Git URL 安裝，並在需要可重現環境時鎖定經過審查的 tag 或 commit。',
    ],
    highlights: [
      'Agent Skills 加上確定性的 Python CLI：創意判斷在 skills，狀態轉移與驗證在 CLI。',
      '雜湊鏈事件狀態，搭配鎖定、對帳與復原，專案歷史可稽核，而不是靠聊天回溯。',
      '以證據為先的流程：證據登記、假設紀錄、產物完整性驗證與帶門檻的階段推進。',
      '具作用域的品質結論，在來源識別改變時自動失效。',
      'Godot 4 建置/測試轉接器、playtest 匯入，以及對原型的保留、捨棄或重構的原子決策。',
      '驅動你已經在用的編碼 Agent，而不是另造一套專有的 Agent 執行時。',
    ],
    commandLabels: ['安裝 CLI', '把 skills 安裝到 Codex'],
    requirements:
      'Python 3.11+、uv 與 Git；僅在使用 Godot 建置流程時需要 Godot 4。未發布到 PyPI —— 請從 Git URL 安裝。',
    licenseNote: '儲存庫尚未加入 license 檔案。',
  },

  doper: {
    tagline: '從零設計的 Web Canvas 算繪引擎。',
    summary:
      '高效能 TSX 執行時，原生虛擬捲動，具確定性的 Rust/WASM Core 與版本化二進位 ABI，完整文字算繪與 Canvas 原生編輯能力。M0–M3 里程碑已完成，M4 將補齊編輯、事件、命中測試與無障礙主鏈。',
    body: [
      'doper 目前還不是可直接接入產品的算繪引擎，儲存庫本身也是這麼寫的。P0/M0 至 M3 已完成，下一階段是 M4 —— 編輯、事件、命中測試與無障礙主鏈。技術決策以 `docs/design.md` 為準，交付順序與出場門檻見 `docs/plan.md`。',
      '目前真正可執行的是 `apps/platform-probe`：一條用於量測而非展示的切片。它蒐集 Worker rAF 影格間隔、主執行緒經 SharedArrayBuffer 到 Worker 的延遲、主執行緒阻塞 200ms 時 Worker 的自驅情況、Canvas2D 與 scroll-copy 吞吐、WASM 體積與載入成本，以及 Canvas 編輯輸入路徑（EditContext 優先，集中式 textarea proxy 降級），並包含可確定性重播的 IME 錄製。',
      '探針只證明本機環境可用（開發伺服器會送出 COOP/COEP 標頭以啟用跨來源隔離），不代表正式部署已滿足這些條件。實機效能與真實輸入法行為屬於獨立的平台資格認證：在通過 `pnpm platform:qualify` 認證之前，專案不對外宣稱對應指標。',
    ],
    highlights: [
      '高效能 TSX 執行時，虛擬捲動是一等原語，而非上層附加實作。',
      '具確定性的 Rust/WASM Core，透過版本化二進位 ABI 對外暴露。',
      'Canvas 原生文字編輯：EditContext 優先、集中式 textarea proxy 降級，並支援可確定性的 IME 錄製與重播。',
      '平台資格認證與里程碑完成明確脫鉤 —— 未認證的平台不做效能宣稱。',
    ],
    commandLabels: ['從儲存庫原始碼執行平台探針'],
    requirements: 'Node.js 22.12+、pnpm 10.33.2、Rust 1.96.0，並安裝 wasm32-unknown-unknown target。',
    licenseNote: '儲存庫尚未加入 license 檔案。',
  },

  'dope-canvas': {
    tagline: '面向大量 AI 產生 Web 產物的無限畫布執行時。',
    summary:
      '數百個活躍 iframe 無法規模化，而把頁面全部壓平成圖片又會失去選取與事件定位。dope-canvas 以「保留式產物」建模 —— 原始碼、持久狀態、互動樹、繪製快取與可選的活躍執行時 —— 讓 Figma 式的選取與啟用得以保留。儲存庫目前處於開發前基線：只有架構、交付計畫與安全模型，尚無可執行的畫布。',
    body: [
      '每個 iframe 都保留著瀏覽脈絡、DOM/CSS 狀態、指令碼 realm、資源與算繪狀態，因此讓數百個產生頁面同時存活的代價極高。這裡的設計回答是「保留式產物」模型 —— `產物 = 原始碼 + 持久狀態 + 互動樹 + 繪製快取 + 可選的活躍執行時` —— 其中快照僅僅是繪製快取，文件與互動模型始終可用，從而支援選取、事件路由、啟用與版本安全的還原。',
      '畫布本身掌管相機移動、空間虛擬化、活躍/快照生命週期、互動中繼資料、資源預算與算繪合成；產物則提供 HTML、CSS 與受控 JavaScript。套件的拆分沿著這些邊界展開 —— protocol、spatial、core、artifact、security、runtime、renderer、editor —— 所有套件皆為 private 且版本為 0.0.0，沒有任何一個被視為穩定的公開契約。',
      '有兩條限制是儲存庫主動寫明的：M0 的瀏覽器證據門檻尚未通過，因此對實驗性 HTML-in-Canvas API 的支援只是「能力」而非「承諾」；以及尚未選擇 license，在維護者補上之前，儲存庫內容不以開源授權提供。',
    ],
    highlights: [
      '保留式產物模型：快照只是繪製快取，因此選取與事件定位不會遺失。',
      '畫布掌管相機、空間虛擬化、活躍/快照生命週期、資源預算與合成。',
      '套件邊界與設計一致：protocol、spatial、core、artifact、security、runtime、renderer、editor。',
      '安全是一等公民套件 —— sanitizer、URL 策略、配額與能力控制 —— 而不是後期加固。',
      '前置文件齊備：技術設計、交付計畫、安全模型、相容性策略、基準測試協定與待解問題。',
    ],
    requirements: 'Node.js 22.12+ 與 pnpm 10.33.2。',
    licenseNote: '尚未選擇 license —— 在維護者補上之前，儲存庫內容不以開源授權提供。',
  },
};
