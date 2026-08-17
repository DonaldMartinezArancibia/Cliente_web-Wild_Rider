import { create } from 'zustand';

// Estado global para preferencias de usuario y configuración
export const useStore = create((set) => ({
  // Idioma actual (ej: 'en', 'es', 'de')
  language: 'en',
  setLanguage: (language) => set({ language }),
  
  // Configuración de cookies (ej: para GDPR)
  cookiesAccepted: false,
  acceptCookies: () => set({ cookiesAccepted: true }),
  
  // Estado de UI (ej: barra lateral, modales)
  isStickyBarVisible: true,
  toggleStickyBar: () => set((state) => ({ isStickyBarVisible: !state.isStickyBarVisible })),
}));