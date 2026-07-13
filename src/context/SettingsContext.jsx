import {
  createContext,
  useContext,
  useEffect,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DEFAULT_SETTINGS = {
  theme: 'light',
  defaultFocusMinutes: 25,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(
    'studyflow-settings',
    DEFAULT_SETTINGS,
  );

  const theme = settings.theme ?? 'light';

  const defaultFocusMinutes =
    Number(settings.defaultFocusMinutes) || 25;

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme,
    );
  }, [theme]);

  function setTheme(nextTheme) {
    if (!['light', 'dark'].includes(nextTheme)) {
      return;
    }

    setSettings((currentSettings) => ({
      ...currentSettings,
      theme: nextTheme,
    }));
  }

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  function setDefaultFocusMinutes(minutes) {
    const parsedMinutes = Number(minutes);

    if (
      !Number.isFinite(parsedMinutes) ||
      parsedMinutes < 1 ||
      parsedMinutes > 180
    ) {
      return;
    }

    setSettings((currentSettings) => ({
      ...currentSettings,
      defaultFocusMinutes: parsedMinutes,
    }));
  }

  const value = {
    settings,
    theme,
    defaultFocusMinutes,
    setTheme,
    toggleTheme,
    setDefaultFocusMinutes,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === null) {
    throw new Error(
      'useSettings must be used inside a SettingsProvider.',
    );
  }

  return context;
}