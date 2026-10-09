/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TopBar } from './components/navigation/TopBar';
import { ColorSystemView } from './components/views/ColorSystemView';
import { TypographyView } from './components/views/TypographyView';
import { ComponentLibraryView } from './components/views/ComponentLibraryView';
import { BOMWorkspaceView } from './components/views/BOMWorkspaceView';
import { ThemeCenterView } from './components/views/ThemeCenterView';
import { DesignGuideDocView } from './components/views/DesignGuideDocView';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<string>('colors');

  return (
    <div className="min-h-screen bg-[var(--plm-bg)] text-[var(--plm-text)] transition-colors flex flex-col font-sans">
      {/* Top Global Bar (56px) */}
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Render Tab Views */}
        {activeTab === 'colors' && <ColorSystemView />}
        {activeTab === 'typography' && <TypographyView />}
        {activeTab === 'components' && <ComponentLibraryView />}
        {activeTab === 'workspace' && <BOMWorkspaceView />}
        {activeTab === 'theme-center' && <ThemeCenterView />}
        {activeTab === 'guidelines' && <DesignGuideDocView />}
      </main>

      {/* Subtle Footer */}
      <footer className="w-full border-t border-[var(--plm-border)] bg-[var(--plm-surface)] py-4 px-6 text-xs text-[var(--plm-text-secondary)] select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--plm-text)]">PLM 产品生命周期管理系统 · 前端 UI 设计规范</span>
            <span>·</span>
            <span>通用离散制造 V1.0 基线</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>遵循 WCAG 2.2 / DTCG 标准</span>
            <span>·</span>
            <span>2026 研发基准方案</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
