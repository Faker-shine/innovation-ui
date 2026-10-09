export type ThemePreset = 'standard' | 'compact' | 'soft';
export type ThemeMode = 'light' | 'dark';

export interface ColorScheme {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryText: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  inputBorder: string;
  selectedBg: string;
  bomAccent: string;
}

export interface SemanticColors {
  success: { text: string; bg: string; label: string };
  warning: { text: string; bg: string; label: string };
  danger: { text: string; bg: string; label: string };
  info: { text: string; bg: string; label: string };
}

export interface ThemeConfig {
  schemaVersion: number;
  id: string;
  name: string;
  mode: ThemeMode;
  preset: ThemePreset;
  globals: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    radius: number;
    density: ThemePreset;
    minRowHeight: number;
    fontSize: number;
  };
  components: {
    button: { variant: 'solid' | 'outline' | 'ghost'; radius: number };
    table: { minRowHeight: number; striped: boolean };
    input: { radius: number };
  };
  modules: {
    bom: {
      accent: string;
      components: {
        table: { minRowHeight: number };
      };
    };
  };
}

export const PRESET_CONFIGS: Record<ThemePreset, { name: string; radius: number; minRowHeight: number; fontSize: number; desc: string }> = {
  standard: {
    name: '标准专业',
    radius: 6,
    minRowHeight: 44,
    fontSize: 14,
    desc: '系统默认业务操作预设，兼顾信息呈现与操作触控'
  },
  compact: {
    name: '紧凑工程',
    radius: 4,
    minRowHeight: 36,
    fontSize: 14,
    desc: '面向多层级BOM、零件明细与批量密集编辑场景'
  },
  soft: {
    name: '柔和协作',
    radius: 10,
    minRowHeight: 48,
    fontSize: 14,
    desc: '面向个人工作台、项目评审与跨团队协同'
  }
};
