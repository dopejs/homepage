# dopejs 团队 Logo 设计

日期：2026-08-20 · 状态：已获用户批准 · 概念决策过程见 `.superpowers/brainstorm/42820-1787157889/content/`（本地，不入库）

## 概念

**终端提示符 d▮**：小写 `d` 紧跟一个方块光标。`d` = dopejs 的首字母，也是"命令已输入"；方块光标 = 终端等待执行的状态。直指这个组织做 CLI/开发者工具的本质。

决策过程（已被否掉的方向）：延续现有 favicon 字母标（个性太弱）、延续猫形 mascot（16px 会糊）、双轨制（维护两套资产）、dj 连字（定制字形成本高）、花括号 `{d}`（元素被用滥）、错位切割（小尺寸损失细节）、加宽容器与终端窗口造型（GitHub 头像圆形裁切不友好 / 小尺寸需二档造型）。

## 主标几何（权威规范）

viewBox `0 0 32 32`，所有尺寸以此为唯一事实来源：

| 元素 | 规格 |
| --- | --- |
| 容器 | 32×32 圆角矩形，`rx=7`，填充 `#b6ff3b` |
| 字形 `d` | 复用现有 `public/favicon.svg` 的 d 路径，`transform="translate(-0.95,2.4) scale(0.85)"`，填充 `#08090a` |
| 光标方块 | `x=20.6 y=14.15 w=6.5 h=9.5`，填充 `#08090a`，底部与字碗基线（y=25）对齐 |

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

## 色彩

锁定现有品牌色，不引入新色：

- 主色 `#b6ff3b`（酸性黄绿）
- 底色 `#08090a`（近黑）

反色版：容器填充 `#08090a`，字形与光标填充 `#b6ff3b`。用于浅色/印刷场景及需要单色反白的场合。

## 变体与用途映射

| 变体 | 文件 | 用途 |
| --- | --- | --- |
| 标准主标 | `public/logo.svg` | 网站 Header、README、org 头像源文件、贴纸 |
| favicon | `public/favicon.svg`（更新现有文件） | 浏览器标签页；已验证 16px 可读 |
| 字标 lockup | `public/logo-lockup.svg` | README 横幅：主标 + 小写 `dopejs` + 尾随光标方块，水平排列 |
| 反色版 | `public/logo-inverse.svg` | 浅色底/印刷 |
| org 头像 | `public/logo-512.png`（由主标导出） | GitHub org 头像（手动上传，见"手动步骤"） |

### 字标（lockup）排版规范

- 文本：小写 `dopejs`，尾随一个光标方块（宽高比与主标光标一致，即宽:高 ≈ 0.68）
- 字体：**JetBrains Mono Bold**（OFL 许可，网站 mono 字体栈成员）；最终交付的 SVG 必须转曲为路径，不依赖查看端字体
- 主标与字标间距：约主标宽度的 0.4 倍；基线对齐
- lockup 在深色（`#08090a`）横幅上使用黄绿色文字；不提供浅色字标版本（浅色场景直接用反色主标，不带字标）

### 吉祥物处置

`public/logo-mascot.svg`（猫形，当前未跟踪）**保留为独立吉祥物资产**，不进入 logo 系统。实现阶段将其提交入库，位置保持 `public/logo-mascot.svg` 不变。

## 交付与集成

1. 新建 `public/logo.svg`、`public/logo-inverse.svg`、`public/logo-lockup.svg`
2. 更新 `public/favicon.svg` 为主标几何
3. 网站 Header：站点名旁加入 32px 主标（检查现有 `Header.astro` 的排布后最小改动接入）
4. README 顶部插入 lockup 横幅（`public/logo-lockup.svg` 的 raw GitHub / dopejs.com 绝对 URL，保证在 npm 等站外渲染）
5. 由 `logo.svg` 导出 512×512 PNG，提交为 `public/logo-512.png`，供 GitHub org 头像手动上传及任何需要位图的场合

## 验证

- `pnpm check` 保持 0 错误；`pnpm build` 通过
- 浏览器打开站点确认 Header 与 favicon 生效
- 各 SVG 在 16/32/64/128px 目检：光标方块可辨、字碗闭合清晰
- GitHub 头像圆形裁切安全：主标四角留空，裁圆后字形与光标均不受损（设计稿已验证）

## 手动步骤（不属于本次代码交付）

- GitHub org 头像上传需要 org 权限，由用户手动完成
- 贴纸印刷文件由 `logo.svg` 加白边模切即可，无需额外设计

## 回滚

全部为新增静态资源 + favicon 替换 + Header/README 小幅改动；`git revert` 即可，无数据迁移、无外部依赖。
