'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, STORAGE_KEY, T } from '../lib/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    if (saved && LANGS.indexOf(saved) >= 0) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    const dict = T[lang] || T.en;
    const title = dict['meta.title'];
    if (title) document.title = title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }, [lang]);

  const setLang = (next) => {
    if (LANGS.indexOf(next) >= 0) setLangState(next);
  };

  const value = useMemo(() => {
    const dict = T[lang] || T.en;
    const get = (key) => (dict[key] != null ? dict[key] : T.en[key] != null ? T.en[key] : null);
    return { lang, setLang, t: get };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
