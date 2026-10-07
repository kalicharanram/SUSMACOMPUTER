import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, translations } from './data/i18n';

const LangContext = createContext(null);

const STORAGE_KEY = 'susma:lang';

/**
 * Holds the chosen language and exposes `t()` for translating a string.
 *
 * The site always *renders* in English first, then restores the visitor's saved
 * choice once the page has mounted. Reading localStorage during the first render
 * would mean the markup and the markup-after-hydration disagree, and it would
 * also fail outright during the static prerender Vite does not run here but
 * anyone adding it later would.
 */
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
  }, []);

  // Urdu is right-to-left. Setting this on <html> rather than on individual
  // elements is what flips the whole layout — nav order, the info-card column,
  // the gallery arrows — instead of just the glyphs.
  useEffect(() => {
    const active = LANGS.find((l) => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = active?.dir ?? 'ltr';
  }, [lang]);

  const setLang = useCallback((code) => {
    setLangState(code);
    // Guarded: Safari in private mode throws on any localStorage write.
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* choice simply will not persist */
    }
  }, []);

  /**
   * Returns the Hindi/Urdu text for an English string, or the string itself when
   * the language is English or the phrase has no translation yet. Falling back
   * to English keeps a gap in the table from leaving a blank on the page.
   */
  const t = useCallback(
    (text) => (lang === 'en' || !text ? text : translations[lang]?.[text] ?? text),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}