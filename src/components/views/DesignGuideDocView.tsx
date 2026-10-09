import React, { useState } from 'react';
import { Button } from '../common/Button';
import { BookOpen, Copy, Check, ChevronRight, FileText, Download, CheckCircle2 } from 'lucide-react';

export const DesignGuideDocView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('sec-1');

  const fullMarkdownGuide = `# PLM 产品生命周期管理系统 · 前端 UI 设计规范与详细指南
**适用范围**：通用离散制造行业 (研发协同 · 产品数据管理 · 工程变更)
**版本**：V1.0 基线规范 | **编制日期**：2026年10月9日
**依据文件**：《PLM 系统功能清单与前端 UI 交互/主题设计方案》

---

## 01. 方案背景与首期业务闭环 (Business Closed-Loop)

### 1.1 核心业务定位
面向通用离散制造企业（如航空航天零部件、机器人与无人机、高精机电仪器），以桌面端为主，统一列表、对象详情、多层级BOM工作区、文档图纸预览与工程变更交互。通过统一组件库和设计变量，实现主题、模块颜色与组件样式的集中配置。

### 1.2 首期 (P0) 业务闭环流程
\`\`\`
建立物料 (PART-001) ➔ 关联工程图纸 (CAD/PDF) ➔ 建立多层 EBOM ➔ 提交评审 ➔ 正式发布 (冻结基线)
       ▲                                                                            │
       │                                                                            ▼
实施确认 ◀─── 审批生效 ◀─── 建立受控新修订 (Rev B) ◀─── 影响范围分析 ◀─── 发起变更 (ECR/ECO)
\`\`\`

### 1.3 数据身份与修订法则
- **长期稳定物料身份**：如 \`PART-001\`，长期不可变，除编号与名称外保留内部唯一 ID。
- **受控正式修订**：如 \`Rev A\`、\`Rev B\` 等大版本，独立记录发布历史、审批人和状态。
- **工作保存记录**：同一正式修订内的 \`A.1\`、\`A.2\` 等工作记录，普通保存仅更新工作记录，不自动提升大版本。
- **BOM 使用关系**：关系行独立标识；装配数量、安装位号（如 \`R102, C204\`）归属于父子装配关系。同一零件支持在不同装配总成中多次复用。

---

## 02. 色彩规范与无障碍设计标准 (Color System & Accessibility)

### 2.1 60-30-10 空间色彩分配准则
- **60% 中性背景画布 (Neutral Canvas)**：浅色使用 \`#F4F7FB\`，深色使用 \`#0B1220\`。营造低饱和工科质感，消除高光刺眼感。
- **30% 结构层级表面 (Structural Surfaces)**：浅色内容面板使用 \`#FFFFFF\`，深色使用 \`#111C2E\`；搭配 1px 发丝边框 \`#D8E0EA\` / \`#34465F\`。
- **10% 聚焦操作与状态 (Accent Budget)**：集中在主要按钮、选中的树节点与核心操作。

### 2.2 核心调色板 (WCAG 2.2 认证)
| 设计用途 | 浅色主题 (Light) | 深色主题 (Dark) | WCAG 对比度 |
| :--- | :--- | :--- | :--- |
| **主色 / 主要操作** | \`#1D4ED8\` (工业蓝) | \`#93B4FF\` (高光蓝) | 6.70:1 / 9.11:1 (AAA) |
| **页面底色** | \`#F4F7FB\` | \`#0B1220\` | 视疲劳消除 |
| **面板表面** | \`#FFFFFF\` | \`#111C2E\` | 单层标高深度 |
| **主要正文** | \`#172B4D\` | \`#E5ECF5\` | > 10:1 (极高清晰) |
| **次要文字** | \`#52637B\` | \`#A3B3C8\` | 4.8:1 (符合 AA) |
| **普通分割线** | \`#D8E0EA\` | \`#34465F\` | 1px 精密结构线 |
| **输入控件边界** | \`#8191A7\` | \`#7087A6\` | 明确可触达边界 |
| **选中行背景** | \`#DBEAFE\` | \`#233B64\` | 树表高亮交互 |

### 2.3 业务语义状态色与非纯颜色指示
根据 WCAG 2.2 准则，**严禁使用单色指示状态**，必须同时提供文字或语义图标：
- **成功 / 已发布 (Released)**：文字 \`#166534\` / 背景 \`#DCFCE7\` + 图标 Check
- **警告 / 待处理 (Pending / Review)**：文字 \`#92400E\` / 背景 \`#FEF3C7\` + 图标 Clock / Alert
- **错误 / 危险 (Rejected / Obsolete)**：文字 \`#B91C1C\` / 背景 \`#FEE2E2\` + 图标 AlertCircle
- **信息 / 处理中 (In Progress / Draft)**：文字 \`#1D4ED8\` / 背景 \`#DBEAFE\` + 图标 Info / Spinner

---

## 03. 字体排版与 8px 空间网格系统 (Typography & Spacing)

### 3.1 “2+1” 字体体系与等宽数字法则
- **界面通用字体**：\`Plus Jakarta Sans\` 或系统无衬线体系（14px 业务基准）。
- **等宽数据字体 (Tabular Figures)**：强制使用 \`JetBrains Mono\` 搭配 \`font-variant-numeric: tabular-nums\`。
  - 应用范围：物料编码（\`PART-001\`）、受控修订号（\`Rev A.2\`）、工程数量（\`14.000 PCS\`）、电路位号（\`R101, C204\`）、公差尺寸（\`±0.005mm\`）。
  - 核心目的：保证数千行表格中字符严格垂直对齐，消灭小数位抖动。

### 3.2 字阶层级比例标尺
- **Display / 主标题**：20px / 28px (Bold 700)
- **Section / 区块标题**：16px / 24px (SemiBold 600)
- **Body / 核心业务基准**：14px / 20px (Regular 400 / Medium 500)
- **Caption / 辅助说明**：12px / 16px (Regular 400)
- **Micro / 状态徽标与小标**：11px / 14px (Medium 500)

### 3.3 8px 空间系统物理尺寸
- **顶部全局工具栏**：56px (含组织切换、全局检索、通知、个人配置)
- **左侧主业务导航**：224px (支持一键折叠为 64px 极简图标模式)
- **右侧详情与属性抽屉**：320px ~ 420px (不打断主工作区，支持滑出检查)
- **容器与元素间距**：遵守 $Padding_{外} \\ge Gap_{内}$，采用 4px、8px、16px、24px、32px 阶梯。

---

## 04. 4级分层组件库架构 (Component Architecture)

1. **基础原子组件 (Tier 1 - 覆盖 19 大核心原子能力)**：
   - **表单与输入**：① 富文本 (RichTextEditor) · ② 多行文本框 (Textarea) · ③ 搜索框 (SearchInput) · ④ 时间/日期选择器 (DateTimePicker) · ⑨ 多选框 (Checkbox) · ⑩ 单选框 (Radio) · ⑪ 单选卡片 (RadioCards) · 按钮 (Button: Solid/Outline/Ghost/Danger/Accent) · 基础输入框 (Input) · 下拉选择 (Select)
   - **导航与排版**：⑯ Page Header 页头 · ⑯ Tabs 标签页 · ⑰ 步骤条 (Steps) · ⑱ 导航菜单 (NavMenu) · ⑮ 分页 (Pagination) · ⑦ Link 链接
   - **容器与展示**：⑫ 卡片 (Card) · ⑬ 图片与图纸缩放预览 (ImagePreview) · ⑭ 进度条 (ProgressBar) · ⑥ 布局容器 (SplitPane / GridContainer) · ⑧ 边框与分割线 (Border & Divider)
   - **反馈与图标**：⑲ 加载 (Spinner & Skeleton 骨架屏) · ⑤ PLM 制造专用图标库 (IconGallery) · 状态标签 (Badge) · 模态弹窗与右抽屉 (Modal & Drawer)
2. **通用业务组件 (Tier 2)**：
   - 数据表格 (DataTable，具备列宽调节、多选行、行高密度感知、固定列)
   - 复合筛选栏 (FilterBar，支持全文检索、分类过滤与筛选视图保存)
   - 属性表单 (PropertyForm，支持字段分组与就地校验)
   - 审批时间线 (Audit Timeline，串联会签、审批、意见与电子印鉴)
3. **PLM 专属业务组件 (Tier 3)**：
   - 产品结构与装配拓扑树 (Product Structure Tree，支持多层折叠展开、检出锁定、零件跨总成复用指示、节点快速搜索与右侧属性联动)
   - 多层级工程 BOM 树表 (BOM Tree Table，支持子件就地编辑、同一件多次复用、位号解析)
   - 受控修订物料卡片 (Part Master，显式展示稳定ID与工作迭代)
   - BOM 版本差异对比器 (Diff Comparator，新增/删除/修改字段级高亮)
   - 工程变更影响分析矩阵 (ECO Impact Matrix)
   - 2D/3D 图纸预览器 Mock (支持检入检出水印与标注)
4. **页面模板规范 (Tier 4)**：
   - 列表页、详情页、BOM工作区、变更审批页标准骨架。

---

## 05. 3 套样式预设与设计变量 (Style Presets & Tokens)

| 样式预设名称 | 圆角 (Radius) | 最小行高 (Row Height) | 核心字号 | 适用核心业务场景 |
| :--- | :--- | :--- | :--- | :--- |
| **标准专业 (Standard)** | 6px | 44px | 14px | 默认业务操作、个人工作台、审批管理 |
| **紧凑工程 (Compact)** | 4px | 36px | 14px | 多层级BOM、物料主数据批量编辑、比较视图 |
| **柔和协作 (Soft)** | 10px | 48px | 14px | 项目看板、团队评审、移动端/平板触控模式 |

### 变量继承与覆盖链
\`\`\`
系统默认 ➔ 企业主题 ➔ 全局组件配置 ➔ 模块配置 (如 BOM accent) ➔ 模块内组件覆盖
\`\`\`
每个覆盖项显式显示继承来源，并支持一键恢复继承。

---

## 06. 复杂交互规范与状态机 (Complex Interaction Rules)

1. **BOM 保存与同步状态机**：
   - 显式指示：\`未保存修改\` ➔ \`保存中 (Loading)\` ➔ \`草稿已保存 (Saved)\` ➔ \`同步失败\`。
   - 自动保存策略：编辑停止 1.5 秒后自动保存进入当前工作草稿 (A.1)，不触发正式修订。
2. **并发冲突处理机制 (Page 7 强制要求)**：
   - 当检测到服务端有更新时，模态弹窗以 3 列视图呈现：
     - **原值 (检出时基线)** vs **我的修改 (本地客户端)** vs **服务器最新值 (远程提交)**
   - 提供显式合并选项：保留我的修改 / 接受远程最新 / 另存为分支。
3. **发布前严格前置校验 (Pre-Publish Checklist)**：
   - 自动循环依赖检查 (检测装配回环)
   - 计量单位统一性校验
   - 关键尺寸与必填字段完整性
   - 所有子件受控状态复核 (子件必须处于非废弃态)
4. **状态保留原则**：
   - 切换主题、换肤、筛选或返回列表时，完整保留展开的节点、编辑中草稿、滚动位置与版本上下文。

---

## 07. 实施阶段与验收标准 (Implementation Roadmap & Acceptance)

- **第一阶段 (P0 基线)**：完成 4 级组件库、主题中心、物料主数据、图纸关联、多层EBOM、受控修订、审批流与ECO闭环。
- **第二阶段 (P1 协同深化)**：研发项目WBS、需求追溯、MBOM制造路线转换、合格供方与ERP/MES接口对账。
- **第三阶段 (P2 专项扩展)**：FMEA失效分析、材料环保合规、服务备件BOM与智能图纸检索。
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdownGuide);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: 'sec-1', title: '1. 业务背景与首期闭环', desc: '离散制造研发协同、物料身份与受控修订规则' },
    { id: 'sec-2', title: '2. 色彩规范与无障碍', desc: '工业蓝调、60-30-10比重与WCAG 2.2对比度' },
    { id: 'sec-3', title: '3. 字体排版与8px网格', desc: '2+1字体法则、等宽数字与物理尺寸标尺' },
    { id: 'sec-4', title: '4. 4级组件库分层规范', desc: '原子组件、业务表格、BOM专用组件与模板' },
    { id: 'sec-5', title: '5. 3套预设与设计变量', desc: '标准(6/44)、紧凑(4/36)、柔和(10/48)及继承链' },
    { id: 'sec-6', title: '6. 复杂交互与并发状态', desc: 'BOM草稿保存、并发冲突解决与发布前校验' },
    { id: 'sec-7', title: '7. 实施验收清单 (P0/P1)', desc: '实施阶段划分、可访问性及质量验收准则' }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--plm-primary)] uppercase tracking-wider">
            <span>Section 05</span>
            <span>·</span>
            <span>Comprehensive Design Guidelines</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--plm-text)] tracking-tight mt-1">
            PLM 离散制造系统详细设计指南白皮书
          </h1>
          <p className="text-sm text-[var(--plm-text-secondary)] mt-1.5 max-w-3xl leading-relaxed">
            完整收录方案中业务闭环、色彩度量、字体排版、4级组件库、并发冲突状态机与 3 大样式预设的技术标准。
            可直接复制为标准工程交付 Markdown 文件。
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="primary"
            leftIcon={<Copy className="w-3.5 h-3.5" />}
            onClick={handleCopyMarkdown}
          >
            {copied ? '已复制 Markdown 全文' : '一键复制设计指南全文'}
          </Button>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-4 sticky top-[72px]">
            <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block uppercase tracking-wider mb-2">
              指南章节目录 (Contents)
            </span>
            <div className="space-y-1">
              {sections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-2.5 rounded-xs text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    activeSection === sec.id
                      ? 'bg-[var(--plm-primary)]/10 text-[var(--plm-primary)] font-semibold border-l-2 border-[var(--plm-primary)]'
                      : 'text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3 h-3 shrink-0 opacity-60" />
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--plm-border)] text-[11px] text-[var(--plm-text-secondary)] space-y-1">
              <div>基线版本: <strong className="text-[var(--plm-text)] font-mono">V1.0</strong></div>
              <div>规范日期: <span className="font-mono">2026-10-09</span></div>
              <div className="text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>与原方案 14 页完全对齐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body (9 Cols) */}
        <div className="lg:col-span-9 space-y-8">
          {/* Section 1 */}
          <div id="sec-1" className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[var(--plm-text)] border-b border-[var(--plm-border)] pb-3">
              01. 方案背景与首期业务闭环 (Business Closed-Loop)
            </h2>
            <div className="text-xs text-[var(--plm-text-secondary)] space-y-3 leading-relaxed">
              <p>
                通用离散制造企业（智能无人机、机器人伺服模组、高精传感器、动力机械等）研发周期长、零部件层级多、工程变更频繁。
                前端交互以高分辨率桌面端为主，首期（P0）必须建立受控产品数据与工程变更的完整业务闭环：
              </p>

              <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-xs font-mono text-[11px] text-[var(--plm-text)] overflow-x-auto">
                建立物料 (PART-001) ➔ 关联图纸 (CAD/PDF) ➔ 建立 EBOM ➔ 提交评审 ➔ 发布冻结基线
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│
                <br />
                实施确认 ◀── 审批生效 ◀── 建立新受控修订 (Rev B) ◀── 影响分析 ◀── 发起变更 (ECO)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 border border-[var(--plm-border)] rounded-xs">
                  <strong className="text-[var(--plm-text)] block mb-1">长期物料标识 (PART-001)</strong>
                  物料编码必须终身稳定，承载分类、属性模板、计量单位与自制/外购属性，内部保留持久唯一 ID。
                </div>
                <div className="p-3 border border-[var(--plm-border)] rounded-xs">
                  <strong className="text-[var(--plm-text)] block mb-1">正式修订 (A/B) vs 工作记录 (A.1/A.2)</strong>
                  普通保存仅更新工作记录，正式发布才提升大版本修订，严禁未受控的静默变更。
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="sec-2" className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[var(--plm-text)] border-b border-[var(--plm-border)] pb-3">
              02. 色彩规范与无障碍设计标准 (Color System & Accessibility)
            </h2>
            <div className="text-xs text-[var(--plm-text-secondary)] space-y-3 leading-relaxed">
              <p>
                色彩体系以默认“工业蓝”（<code className="text-[var(--plm-text)] font-bold">#1D4ED8</code>）为代表，
                严格遵循 <strong>60-30-10 空间比重</strong> 与 <strong>WCAG 2.2 AA/AAA 对比度标准</strong>：
              </p>

              <div className="overflow-x-auto border border-[var(--plm-border)] rounded-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[var(--plm-bg)] border-b border-[var(--plm-border)]">
                      <th className="p-2.5 font-semibold">语义状态</th>
                      <th className="p-2.5 font-semibold">文字色 / 背景色 (浅色)</th>
                      <th className="p-2.5 font-semibold">深色光学补偿</th>
                      <th className="p-2.5 font-semibold">无障碍配套要求</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--plm-border)]">
                    <tr>
                      <td className="p-2.5 font-medium text-[var(--plm-text)]">成功 / 已发布</td>
                      <td className="p-2.5 font-mono text-emerald-700">#166534 / #DCFCE7</td>
                      <td className="p-2.5 font-mono text-emerald-400">#4ADE80 / #064E3B</td>
                      <td className="p-2.5">必须包含 CheckCircle 图标 + 明确文字</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-[var(--plm-text)]">警告 / 待处理</td>
                      <td className="p-2.5 font-mono text-amber-700">#92400E / #FEF3C7</td>
                      <td className="p-2.5 font-mono text-amber-400">#FBBF24 / #78350F</td>
                      <td className="p-2.5">必须包含 Clock 图标 + 变更波及原因</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-[var(--plm-text)]">错误 / 危险</td>
                      <td className="p-2.5 font-mono text-red-700">#B91C1C / #FEE2E2</td>
                      <td className="p-2.5 font-mono text-red-400">#F87171 / #7F1D1D</td>
                      <td className="p-2.5">必须包含 AlertCircle 图标 + 处理入口</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-[var(--plm-text)]">信息 / 处理中</td>
                      <td className="p-2.5 font-mono text-blue-700">#1D4ED8 / #DBEAFE</td>
                      <td className="p-2.5 font-mono text-blue-400">#93B4FF / #1E3A8A</td>
                      <td className="p-2.5">包含 Info 图标或转圈动画</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id="sec-3" className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[var(--plm-text)] border-b border-[var(--plm-border)] pb-3">
              03. 字体排版与 8px 空间网格系统 (Typography & Spacing)
            </h2>
            <div className="text-xs text-[var(--plm-text-secondary)] space-y-3 leading-relaxed">
              <p>
                <strong>2+1 字体规范</strong>：主界面采用现代化几何无衬线字体（Plus Jakarta Sans），
                在涉及物料编号、受控修订、工程数量、安装位号与公差时，强制调用等宽数字（JetBrains Mono tabular-nums）。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-xs">
                  <span className="font-bold text-[var(--plm-text)] block">顶部全局栏</span>
                  <span className="text-base font-mono font-bold text-[var(--plm-primary)]">56px</span>
                  <p className="text-[11px] mt-1">承载全局搜索、组织与项目切换、通知和个人设置</p>
                </div>
                <div className="p-3 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-xs">
                  <span className="font-bold text-[var(--plm-text)] block">左侧业务导航</span>
                  <span className="text-base font-mono font-bold text-[var(--plm-primary)]">224px / 64px</span>
                  <p className="text-[11px] mt-1">支持展开（224px）与折叠（64px 仅图标），8大核心模块</p>
                </div>
                <div className="p-3 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-xs">
                  <span className="font-bold text-[var(--plm-text)] block">右侧属性抽屉</span>
                  <span className="text-base font-mono font-bold text-[var(--plm-primary)]">320 ~ 420px</span>
                  <p className="text-[11px] mt-1">快速预览、属性检查、历史追溯与引用关系</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="sec-4" className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[var(--plm-text)] border-b border-[var(--plm-border)] pb-3">
              04. 4级分层组件库与业务配置 (Component Architecture)
            </h2>
            <div className="text-xs text-[var(--plm-text-secondary)] space-y-3 leading-relaxed">
              <p>
                组件库遵循 <strong>基础原子 ➔ 通用业务 ➔ PLM专用 ➔ 页面模板</strong> 4级架构：
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-[var(--plm-text)]">基础组件</strong>：按钮（Solid/Secondary/Ghost/Danger/Accent）、输入框、下拉框、标签、模态弹窗、抽屉，严格统一交互尺寸与圆角。
                </li>
                <li>
                  <strong className="text-[var(--plm-text)]">通用业务组件</strong>：带列宽调节和密度的表格（DataTable）、复合搜索筛选栏（FilterBar）、属性表单（PropertyForm）、审批时间线（ApprovalTimeline）。
                </li>
                <li>
                  <strong className="text-[var(--plm-text)]">PLM 专属组件</strong>：多层BOM树表（BOMTreeTable）、物料受控选择器（PartMasterPicker）、版本差异对比视图（VersionDiffViewer）、使用位置查询（WhereUsedViewer）、工程变更卡片（ECOCard）。
                </li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div id="sec-5" className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[var(--plm-text)] border-b border-[var(--plm-border)] pb-3">
              05. 3套样式预设与设计变量继承 (Presets & Tokens)
            </h2>
            <div className="text-xs text-[var(--plm-text-secondary)] space-y-3 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 border border-[var(--plm-border)] rounded-xs bg-[var(--plm-bg)]">
                  <span className="font-bold text-[var(--plm-text)] block">标准专业预设</span>
                  <div className="text-[11px] font-mono mt-1 text-[var(--plm-primary)]">
                    圆角: 6px · 行高: 44px · 字号: 14px
                  </div>
                  <p className="text-[11px] text-[var(--plm-text-secondary)] mt-1">
                    系统默认业务操作，平衡了数据密集度与鼠标/触控交互舒适感。
                  </p>
                </div>
                <div className="p-3 border border-[var(--plm-border)] rounded-xs bg-[var(--plm-bg)]">
                  <span className="font-bold text-[var(--plm-text)] block">紧凑工程预设</span>
                  <div className="text-[11px] font-mono mt-1 text-[var(--plm-primary)]">
                    圆角: 4px · 行高: 36px · 字号: 14px
                  </div>
                  <p className="text-[11px] text-[var(--plm-text-secondary)] mt-1">
                    面向庞大 EBOM、零件明细库批量编辑，单屏呈现更多数据行。
                  </p>
                </div>
                <div className="p-3 border border-[var(--plm-border)] rounded-xs bg-[var(--plm-bg)]">
                  <span className="font-bold text-[var(--plm-text)] block">柔和协作预设</span>
                  <div className="text-[11px] font-mono mt-1 text-[var(--plm-primary)]">
                    圆角: 10px · 行高: 48px · 字号: 14px
                  </div>
                  <p className="text-[11px] text-[var(--plm-text-secondary)] mt-1">
                    个人工作台、项目评审看板、跨部门会议协同与触屏设备。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="sec-6" className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[var(--plm-text)] border-b border-[var(--plm-border)] pb-3">
              06. 复杂交互规范与状态机 (Complex Interactions)
            </h2>
            <div className="text-xs text-[var(--plm-text-secondary)] space-y-3 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-[var(--plm-text)]">并发冲突显式合并 (Page 7)</strong>：
                  当多人编辑产生冲突时，界面必须清晰呈现「原值」、「我的修改」与「服务器最新值」，并提供明确的解决方案（保留我方、采纳对方、生成分支版本），严禁静默覆盖。
                </li>
                <li>
                  <strong className="text-[var(--plm-text)]">发布前严密复核校验</strong>：
                  系统提交发布前自动执行循环引用检测、单位一致性检查、必填属性完整性核验，并在界面中高亮问题行。
                </li>
                <li>
                  <strong className="text-[var(--plm-text)]">切换主题与刷新保留业务状态</strong>：
                  换肤操作仅更新样式与 CSS 变量，绝不可丢失用户未保存的表单数据、展开的树节点或筛选记录。
                </li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div id="sec-7" className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[var(--plm-text)] border-b border-[var(--plm-border)] pb-3">
              07. 实施阶段与验收标准 (Implementation Roadmap & Acceptance)
            </h2>
            <div className="text-xs text-[var(--plm-text-secondary)] space-y-3 leading-relaxed">
              <div className="border border-[var(--plm-border)] rounded-xs overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[var(--plm-bg)] border-b border-[var(--plm-border)]">
                      <th className="p-2.5 font-semibold">实施阶段</th>
                      <th className="p-2.5 font-semibold">核心交付物</th>
                      <th className="p-2.5 font-semibold">首期验收完成标准</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--plm-border)]">
                    <tr>
                      <td className="p-2.5 font-bold text-[var(--plm-primary)]">第一阶段 (P0)</td>
                      <td className="p-2.5">组件库、主题中心、物料主数据、图纸关联、EBOM、受控修订、ECO变更闭环</td>
                      <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-medium">
                        完成首期业务闭环；支持并发冲突解决；主题与状态正确继承
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300">第二阶段 (P1)</td>
                      <td className="p-2.5">研发项目WBS、需求分解、MBOM制造路线转换、合格供应商协同、CAD/ERP接口</td>
                      <td className="p-2.5">研发到制造协同拉通；系统接口具备幂等投递与对账回执</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300">第三阶段 (P2)</td>
                      <td className="p-2.5">产品配置与变型BOM、服务备件BOM、FMEA/APQP质量专项、智能知识检索</td>
                      <td className="p-2.5">按离散制造具体业务产线定制深化</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
