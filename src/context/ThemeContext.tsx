import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeConfig, ThemePreset, ThemeMode, PRESET_CONFIGS } from '../types/theme';

export interface ThemeContextValue {
  config: ThemeConfig;
  mode: ThemeMode;
  preset: ThemePreset;
  setMode: (mode: ThemeMode) => void;
  setPreset: (preset: ThemePreset) => void;
  setPrimaryColor: (color: string) => void;
  setBomAccent: (color: string) => void;
  setRadius: (radius: number) => void;
  setMinRowHeight: (height: number) => void;
  resetToDefaults: () => void;
  importConfig: (jsonString: string) => boolean;
  exportConfigJson: () => string;
  calculateContrast: (fg: string, bg: string) => number;
}

const DEFAULT_CONFIG: ThemeConfig = {
  schemaVersion: 1,
  id: 'industrial-blue',
  name: '工业蓝标准版',
  mode: 'light',
  preset: 'standard',
  globals: {
    primary: '#1D4ED8',
    background: '#F4F7FB',
    surface: '#FFFFFF',
    text: '#172B4D',
    radius: 6,
    density: 'standard',
    minRowHeight: 44,
    fontSize: 14
  },
  components: {
    button: { variant: 'solid', radius: 6 },
    table: { minRowHeight: 44, striped: false },
    input: { radius: 6 }
  },
  modules: {
    bom: {
      accent: '#0F766E',
      components: {
        table: { minRowHeight: 36 }
      }
    }
  }
};

// Calculate WCAG contrast
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    return [
      parseInt(cleanHex[0] + cleanHex[0], 16),
      parseInt(cleanHex[1] + cleanHex[1], 16),
      parseInt(cleanHex[2] + cleanHex[2], 16)
    ];
  }
  return [
    parseInt(cleanHex.substring(0, 2), 16) || 0,
    parseInt(cleanHex.substring(2, 4), 16) || 0,
    parseInt(cleanHex.substring(4, 6), 16) || 0
  ];
}

function getLuminance([r, g, b]: [number, number, number]): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const l1 = getLuminance(hexToRgb(hex1));
    const l2 = getLuminance(hexToRgb(hex2));
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
  } catch {
    return 4.5;
  }
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('plm_theme_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  const mode = config.mode;
  const preset = config.preset;

  useEffect(() => {
    try {
      localStorage.setItem('plm_theme_config', JSON.stringify(config));
    } catch {
      // ignore
    }

    // Update document root classes & CSS variables
    const root = document.documentElement;
    if (config.mode === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--plm-bg', '#0B1220');
      root.style.setProperty('--plm-surface', '#111C2E');
      root.style.setProperty('--plm-text', '#E5ECF5');
      root.style.setProperty('--plm-text-secondary', '#A3B3C8');
      root.style.setProperty('--plm-border', '#34465F');
      root.style.setProperty('--plm-input-border', '#7087A6');
      root.style.setProperty('--plm-selected-bg', '#233B64');
      root.style.setProperty('--plm-primary', config.globals.primary === '#1D4ED8' ? '#93B4FF' : config.globals.primary);
      root.style.setProperty('--plm-primary-light', '#233B64');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--plm-bg', '#F4F7FB');
      root.style.setProperty('--plm-surface', '#FFFFFF');
      root.style.setProperty('--plm-text', '#172B4D');
      root.style.setProperty('--plm-text-secondary', '#52637B');
      root.style.setProperty('--plm-border', '#D8E0EA');
      root.style.setProperty('--plm-input-border', '#8191A7');
      root.style.setProperty('--plm-selected-bg', '#DBEAFE');
      root.style.setProperty('--plm-primary', config.globals.primary);
      root.style.setProperty('--plm-primary-light', '#DBEAFE');
    }

    root.style.setProperty('--plm-radius', `${config.globals.radius}px`);
    root.style.setProperty('--plm-row-height', `${config.globals.minRowHeight}px`);
    root.style.setProperty('--plm-bom-accent', config.modules.bom.accent);
  }, [config]);

  const setMode = (newMode: ThemeMode) => {
    setConfig(prev => ({
      ...prev,
      mode: newMode
    }));
  };

  const setPreset = (newPreset: ThemePreset) => {
    const presetSpec = PRESET_CONFIGS[newPreset];
    setConfig(prev => ({
      ...prev,
      preset: newPreset,
      globals: {
        ...prev.globals,
        density: newPreset,
        radius: presetSpec.radius,
        minRowHeight: presetSpec.minRowHeight
      },
      components: {
        ...prev.components,
        button: { ...prev.components.button, radius: presetSpec.radius },
        table: { ...prev.components.table, minRowHeight: presetSpec.minRowHeight },
        input: { ...prev.components.input, radius: presetSpec.radius }
      }
    }));
  };

  const setPrimaryColor = (color: string) => {
    setConfig(prev => ({
      ...prev,
      globals: {
        ...prev.globals,
        primary: color
      }
    }));
  };

  const setBomAccent = (accent: string) => {
    setConfig(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        bom: {
          ...prev.modules.bom,
          accent
        }
      }
    }));
  };

  const setRadius = (radius: number) => {
    setConfig(prev => ({
      ...prev,
      globals: {
        ...prev.globals,
        radius
      },
      components: {
        ...prev.components,
        button: { ...prev.components.button, radius },
        input: { ...prev.components.input, radius }
      }
    }));
  };

  const setMinRowHeight = (minRowHeight: number) => {
    setConfig(prev => ({
      ...prev,
      globals: {
        ...prev.globals,
        minRowHeight
      },
      components: {
        ...prev.components,
        table: { ...prev.components.table, minRowHeight }
      }
    }));
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const importConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.globals && parsed.components) {
        setConfig(parsed);
        return true;
      }
    } catch {
      // parse error
    }
    return false;
  };

  const exportConfigJson = () => {
    return JSON.stringify(config, null, 2);
  };

  const value = useMemo(
    () => ({
      config,
      mode,
      preset,
      setMode,
      setPreset,
      setPrimaryColor,
      setBomAccent,
      setRadius,
      setMinRowHeight,
      resetToDefaults,
      importConfig,
      exportConfigJson,
      calculateContrast: getContrastRatio
    }),
    [config, mode, preset]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
