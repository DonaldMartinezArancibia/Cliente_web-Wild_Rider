import React, { createContext, useContext } from 'react';
import { useStore } from '../store/useStore';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const { language, setLanguage } = useStore();
  return (
    <I18nContext.Provider value={{ language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
