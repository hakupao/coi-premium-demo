# COI Premium Demo

[![Live Demo](https://img.shields.io/badge/GitHub%20Pages-Live-0A7EA4?logo=githubpages&logoColor=white)](https://hakupao.github.io/coi-premium-demo/)
![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Radix%20UI-111827)
![Deploy](https://img.shields.io/github/actions/workflow/status/hakupao/coi-premium-demo/deploy-pages.yml?branch=main&label=deploy)

一个面向科研机构、医院研究办公室与 COI 审查场景的前端演示项目，聚焦“利益相反（COI）申报与审批”工作流。项目提供桌面端与移动端自适应界面，适合用于产品原型展示、客户演示、售前讲解和内部方案评审。

## 在线体验

- GitHub Pages: [https://hakupao.github.io/coi-premium-demo/](https://hakupao.github.io/coi-premium-demo/)
- 部署方式: push 到默认分支后由 GitHub Actions 自动构建并发布

## 亮点能力

- COI 管理驾驶舱：展示待办、审查状态、风险提醒、时间线与统计概览。
- 研究项目台账：集中查看课题列表、申报进度、人员角色与研究周期。
- 审批工作台：覆盖申报检索、异常金额提醒、审批流与书面材料导出入口。
- 响应式布局：PC 端为完整左侧导航与表格视图，移动端切换为抽屉菜单与卡片式信息块。

## 页面预览

| Dashboard | Research Registry |
| --- | --- |
| ![Dashboard desktop preview](docs/images/dashboard-desktop.png) | ![Research desktop preview](docs/images/research-desktop.png) |
| Application Review | Mobile Dashboard |
| ![Applications desktop preview](docs/images/applications-desktop.png) | ![Dashboard mobile preview](docs/images/dashboard-mobile.png) |

## 适用场景

- 高校或医院科研管理部门的 COI 系统原型演示
- 药企合作、临床试验管理平台的售前展示
- 内部产品设计评审与可用性讨论
- 前端招聘作品集、组件能力展示与响应式 UI 样例

## 技术栈

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 3
- shadcn/ui + Radix UI

## 本地运行

```bash
pnpm install
pnpm dev
```

默认开发地址通常为 `http://127.0.0.1:5173/`。如端口冲突，Vite 会自动切换到下一个可用端口。

## 构建与校验

```bash
pnpm build
pnpm lint
```

## GitHub Pages 自动部署

仓库已配置 `.github/workflows/deploy-pages.yml`：

1. push 到 `main` 分支
2. GitHub Actions 自动执行 `pnpm install` 与 `pnpm build`
3. 将 `dist/` 发布到 GitHub Pages
4. 访问 `https://hakupao.github.io/coi-premium-demo/`

如果仓库默认分支不是 `main`，请同步调整 workflow 触发分支。

## 日本語概要

このリポジトリは、研究機関向けの利益相反（COI）申告管理システムを想定したフロントエンドデモです。ダッシュボード、研究一覧、申請審査ワークスペースを含み、PC とモバイルの両方で見やすく操作しやすい UI を確認できます。

## 说明

- 本仓库仅包含前端演示界面，数据为虚构示例。
- 预览图片来自本地运行后的真实页面截图。
