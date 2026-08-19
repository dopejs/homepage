# dopejs 团队 Logo 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 落地 spec `docs/superpowers/specs/2026-08-20-dopejs-logo-design.md`：d▮ 主标、lockup、favicon、512px PNG、Header 与 README 集成。

**Architecture:** 纯静态资产 + 两处小幅集成（`Header.astro`、README）。lockup 字标用一次性脚本（opentype.js + JetBrains Mono Bold）转曲生成，脚本在临时目录运行、不入库。

**Tech Stack:** SVG、Astro 7、Node 22、opentype.js（临时）、qlmanage（macOS 原生 SVG 光栅化，已验证 512×512 输出）

**已验证的外部依赖：**
- `https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-2.304.zip` → HTTP 200
- `qlmanage -t -s 512 -o <dir> <file>.svg` → 输出 512×512 PNG（文件名带 `.svg.png` 后缀，需重命名）
- `npx sharp-cli` 在本机超时，**不要用**

---

### Task 1: 主标 SVG 文件（标准版 / 反色版 / favicon）

**Files:**
- Create: `public/logo.svg`
- Create: `public/logo-inverse.svg`
- Modify: `public/favicon.svg`（整体替换）

- [ ] **Step 1: 写 `public/logo.svg`（标准主标，spec 权威几何）**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-labelledby="title">
  <title>dopejs logo</title>
  <rect width="32" height="32" rx="7" fill="#b6ff3b"/>
  <g transform="translate(-0.95,2.4) scale(0.85)">
    <path d="M20.6 7v18h-3.1v-1.9c-.9 1.4-2.4 2.2-4.3 2.2-3.7 0-6.2-2.9-6.2-7.1s2.5-7.1 6.2-7.1c1.9 0 3.4.8 4.3 2.2V7h3.1Zm-6.8 15.4c2.2 0 3.8-1.7 3.8-4.2s-1.6-4.2-3.8-4.2-3.7 1.7-3.7 4.2 1.5 4.2 3.7 4.2Z" fill="#08090a"/>
  </g>
  <rect x="20.6" y="14.15" width="6.5" height="9.5" fill="#08090a"/>
</svg>
```

- [ ] **Step 2: 写 `public/logo-inverse.svg`（反色版）**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-labelledby="title">
  <title>dopejs logo (inverse)</title>
  <rect width="32" height="32" rx="7" fill="#08090a"/>
  <g transform="translate(-0.95,2.4) scale(0.85)">
    <path d="M20.6 7v18h-3.1v-1.9c-.9 1.4-2.4 2.2-4.3 2.2-3.7 0-6.2-2.9-6.2-7.1s2.5-7.1 6.2-7.1c1.9 0 3.4.8 4.3 2.2V7h3.1Zm-6.8 15.4c2.2 0 3.8-1.7 3.8-4.2s-1.6-4.2-3.8-4.2-3.7 1.7-3.7 4.2 1.5 4.2 3.7 4.2Z" fill="#b6ff3b"/>
  </g>
  <rect x="20.6" y="14.15" width="6.5" height="9.5" fill="#b6ff3b"/>
</svg>
```

- [ ] **Step 3: 整体替换 `public/favicon.svg`（几何同主标，保持无 title 的极简形态）**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#b6ff3b"/>
  <g transform="translate(-0.95,2.4) scale(0.85)">
    <path d="M20.6 7v18h-3.1v-1.9c-.9 1.4-2.4 2.2-4.3 2.2-3.7 0-6.2-2.9-6.2-7.1s2.5-7.1 6.2-7.1c1.9 0 3.4.8 4.3 2.2V7h3.1Zm-6.8 15.4c2.2 0 3.8-1.7 3.8-4.2s-1.6-4.2-3.8-4.2-3.7 1.7-3.7 4.2 1.5 4.2 3.7 4.2Z" fill="#08090a"/>
  </g>
  <rect x="20.6" y="14.15" width="6.5" height="9.5" fill="#08090a"/>
</svg>
```

- [ ] **Step 4: 目检 16px 可读性**

Run: `qlmanage -t -s 16 -o /tmp public/logo.svg && open /tmp/logo.svg.png`
Expected: 光标方块与 d 字碗清晰可辨，不糊成一团

- [ ] **Step 5: Commit**

```bash
git add public/logo.svg public/logo-inverse.svg public/favicon.svg
git commit -m "Add d+cursor team logo and matching favicon"
```

---

### Task 2: 字标 lockup 生成（转曲，脚本一次性、不入库）

**Files:**
- Create: `public/logo-lockup.svg`（生成产物）
- 临时: `/tmp/dopejs-lockup/`（脚本与字体，结束后删除）

布局常量（96 高横幅，内边距 16，主标 2 倍 64×64，字标 JetBrains Mono Bold 44px，基线与主标字碗基线对齐 y=63.3，光标高 0.72em、宽 = 高 × 6.5/9.5 与主标光标同比，尾随）：

- [ ] **Step 1: 准备临时目录、字体和 opentype.js**

```bash
mkdir -p /tmp/dopejs-lockup && cd /tmp/dopejs-lockup
curl -sL -o jb.zip "https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-2.304.zip"
unzip -j -o jb.zip "fonts/ttf/JetBrainsMono-Bold.ttf"
npm init -y >/dev/null && npm install opentype.js --no-fund --no-audit
```

Expected: 当前目录出现 `JetBrainsMono-Bold.ttf`；`node -e "require('opentype.js')"` 不报错

- [ ] **Step 2: 写生成脚本 `/tmp/dopejs-lockup/generate-lockup.cjs`**

```js
const opentype = require('opentype.js');
const fs = require('fs');

const D_PATH =
  'M20.6 7v18h-3.1v-1.9c-.9 1.4-2.4 2.2-4.3 2.2-3.7 0-6.2-2.9-6.2-7.1s2.5-7.1 6.2-7.1c1.9 0 3.4.8 4.3 2.2V7h3.1Zm-6.8 15.4c2.2 0 3.8-1.7 3.8-4.2s-1.6-4.2-3.8-4.2-3.7 1.7-3.7 4.2 1.5 4.2 3.7 4.2Z';

async function main() {
  const [fontFile, outFile] = process.argv.slice(2);
  const font = await opentype.load(fontFile);

  const fontSize = 44;
  const textX = 105.6; // 16 pad + 64 mark + 25.6 gap
  const baseline = 63.3; // 16 pad + 47.3 glyph baseline in mark space
  const textPath = font.getPath('dopejs', textX, baseline, fontSize);
  const advance = font.getAdvanceWidth('dopejs', fontSize);

  const cursor = {
    x: textX + advance + 0.12 * fontSize,
    y: baseline - 0.72 * fontSize,
    h: 0.72 * fontSize,
    w: 0.72 * fontSize * (6.5 / 9.5), // 与主标光标同宽高比（spec：宽:高 ≈ 0.68）
  };
  const width = Math.ceil((cursor.x + cursor.w + 16) * 100) / 100;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 96" role="img" aria-labelledby="title">
  <title>dopejs</title>
  <rect width="${width}" height="96" rx="14" fill="#08090a"/>
  <g transform="translate(16,16) scale(2)">
    <rect width="32" height="32" rx="7" fill="#b6ff3b"/>
    <g transform="translate(-0.95,2.4) scale(0.85)"><path d="${D_PATH}" fill="#08090a"/></g>
    <rect x="20.6" y="14.15" width="6.5" height="9.5" fill="#08090a"/>
  </g>
  <path d="${textPath.toPathData(2)}" fill="#b6ff3b"/>
  <rect x="${cursor.x.toFixed(2)}" y="${cursor.y.toFixed(2)}" width="${cursor.w.toFixed(2)}" height="${cursor.h.toFixed(2)}" fill="#b6ff3b"/>
</svg>
`;
  fs.writeFileSync(outFile, svg);
  console.log(`wrote ${outFile} (viewBox 0 0 ${width} 96)`);
}

main();
```

- [ ] **Step 3: 生成并入库**

```bash
cd /tmp/dopejs-lockup
node generate-lockup.cjs JetBrainsMono-Bold.ttf /Users/John/Code/dopejs-page/public/logo-lockup.svg
```

Expected: 输出 `wrote .../public/logo-lockup.svg (viewBox 0 0 ~300 96)`（宽度约 300，具体由字宽决定）

- [ ] **Step 4: 目检 lockup**

Run: `qlmanage -t -s 900 -o /tmp /Users/John/Code/dopejs-page/public/logo-lockup.svg && open /tmp/logo-lockup.svg.png`
Expected: 深色圆角横幅内，左侧 d▮ 主标，右侧黄绿 `dopejs` + 尾随光标方块；文字边缘平滑（已转曲）、基线与主标字碗基线对齐

- [ ] **Step 5: 清理临时目录并 commit**

```bash
rm -rf /tmp/dopejs-lockup /tmp/logo-lockup.svg.png /tmp/logo.svg.png
cd /Users/John/Code/dopejs-page
git add public/logo-lockup.svg
git commit -m "Add outlined dopejs wordmark lockup for README banner"
```

---

### Task 3: 512×512 PNG 导出（GitHub org 头像源）

**Files:**
- Create: `public/logo-512.png`

- [ ] **Step 1: qlmanage 光栅化并重命名**

```bash
cd /Users/John/Code/dopejs-page
qlmanage -t -s 512 -o public public/logo.svg
mv public/logo.svg.png public/logo-512.png
```

- [ ] **Step 2: 验证尺寸**

Run: `sips -g pixelWidth -g pixelHeight public/logo-512.png`
Expected: `pixelWidth: 512` / `pixelHeight: 512`

- [ ] **Step 3: Commit**

```bash
git add public/logo-512.png
git commit -m "Add 512px PNG export for GitHub org avatar"
```

---

### Task 4: Header 接入主标

**Files:**
- Modify: `src/components/Header.astro:23-25`（替换 CSS 画的 d 色块为真实 logo）

- [ ] **Step 1: 替换 Header 中的占位 tile**

把：

```astro
      <span
        class="grid size-7 place-items-center rounded-[6px] bg-accent font-mono text-sm font-bold text-ink"
        aria-hidden="true">d</span
      >
```

替换为（URL 前缀模式与 `ProjectLogo.astro` / `Base.astro` 一致）：

```astro
      <img
        src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/logo.svg`}
        alt=""
        aria-hidden="true"
        width="28"
        height="28"
        class="size-7 shrink-0 rounded-[6px]"
      />
```

- [ ] **Step 2: 类型/诊断门**

Run: `pnpm check`
Expected: `0 errors`（与现状一致）

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "Use the real logo in the site header"
```

---

### Task 5: README 横幅 + 吉祥物入库

**Files:**
- Modify: `README.md:1`（文件最顶部插入横幅）
- Add: `public/logo-mascot.svg`（当前未跟踪，按 spec 保留为独立吉祥物资产）

- [ ] **Step 1: README 顶部插入 lockup 横幅**

在 `# dopejs homepage` 之前插入（绝对 URL 保证 npm 等站外渲染；lockup 自带深色横幅底，明/暗色 GitHub 主题下都成立）：

```markdown
<p align="center">
  <a href="https://dopejs.com">
    <img src="https://dopejs.com/logo-lockup.svg" alt="dopejs" width="420">
  </a>
</p>
```

- [ ] **Step 2: Commit（含吉祥物入库）**

```bash
git add README.md public/logo-mascot.svg
git commit -m "Add logo banner to README and commit the mascot asset"
```

---

### Task 6: 端到端验证

**Files:** 无改动

- [ ] **Step 1: 构建**

Run: `pnpm build`
Expected: 构建成功，`dist/logo.svg`、`dist/logo-lockup.svg`、`dist/logo-512.png`、`dist/favicon.svg` 均存在

```bash
ls dist/logo.svg dist/logo-lockup.svg dist/logo-512.png dist/favicon.svg
```

- [ ] **Step 2: dev server + 浏览器目检**

Run: `pnpm dev`，浏览器打开首页
Expected:
- Header 左侧显示 d▮ 主标（黄绿方砖 + 黑 d + 光标），不再是纯色块字母
- 浏览器标签页 favicon 为新主标
- 直接访问 `/logo-lockup.svg` 渲染深色横幅 lockup

- [ ] **Step 3: 推送（可选，由用户决定时机）**

```bash
git push
```

推送后 GitHub Pages 部署完成，README 横幅的 `https://dopejs.com/logo-lockup.svg` 才会 404 → 200。GitHub org 头像用 `public/logo-512.png` 手动上传。
