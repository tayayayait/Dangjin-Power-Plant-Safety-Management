import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type KioskScreen = 'screensaver' | 'main' | 'content-list' | 'content-view' | 'admin';

interface KioskState {
  currentScreen: KioskScreen;
  selectedCategoryId: string | null;
  selectedContentId: string | null;
  isAdminMode: boolean;
  adminPinAttempts: number;
  adminLockUntil: number | null;
}

interface KioskContextType extends KioskState {
  goToScreen: (screen: KioskScreen) => void;
  selectCategory: (id: string) => void;
  selectContent: (id: string) => void;
  enterAdminMode: () => void;
  exitAdminMode: () => void;
  incrementPinAttempts: () => void;
  resetPinAttempts: () => void;
  lockAdmin: () => void;
  goHome: () => void;
  goBack: () => void;
}

const KioskContext = createContext<KioskContextType | null>(null);

export function KioskProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [state, setState] = useState<KioskState>({
    currentScreen: 'screensaver',
    selectedCategoryId: null,
    selectedContentId: null,
    isAdminMode: false,
    adminPinAttempts: 0,
    adminLockUntil: null,
  });

  const goToScreen = useCallback((screen: KioskScreen) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
    const routes: Record<string, string> = {
      'screensaver': '/',
      'main': '/main',
      'content-list': '/list',
      'content-view': '/view',
      'admin': '/admin'
    };
    navigate(routes[screen] || '/');
  }, [navigate]);

  const selectCategory = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      selectedCategoryId: id,
      selectedContentId: null,
      currentScreen: 'content-list',
    }));
    navigate('/list');
  }, [navigate]);

  const selectContent = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      selectedContentId: id,
      currentScreen: 'content-view',
    }));
    navigate('/view');
  }, [navigate]);

  const enterAdminMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAdminMode: true,
      currentScreen: 'admin',
      adminPinAttempts: 0,
    }));
    navigate('/admin');
  }, [navigate]);

  const exitAdminMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAdminMode: false,
      currentScreen: 'main',
      adminPinAttempts: 0,
      adminLockUntil: null,
    }));
    navigate('/main');
  }, [navigate]);

  const incrementPinAttempts = useCallback(() => {
    setState(prev => ({ ...prev, adminPinAttempts: prev.adminPinAttempts + 1 }));
  }, []);

  const resetPinAttempts = useCallback(() => {
    setState(prev => ({ ...prev, adminPinAttempts: 0 }));
  }, []);

  const lockAdmin = useCallback(() => {
    setState(prev => ({
      ...prev,
      adminLockUntil: Date.now() + 300000,
      adminPinAttempts: 0,
    }));
  }, []);

  const goHome = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'screensaver',
      selectedCategoryId: null,
      selectedContentId: null,
      isAdminMode: false,
    }));
    navigate('/');
  }, [navigate]);

  const goBack = useCallback(() => {
    setState(prev => {
      let nextScreen: KioskScreen = 'main';
      if (prev.currentScreen === 'content-view') {
        nextScreen = 'content-list';
        navigate('/list');
        return { ...prev, currentScreen: nextScreen, selectedContentId: null };
      }
      if (prev.currentScreen === 'content-list') {
        nextScreen = 'main';
        navigate('/main');
        return { ...prev, currentScreen: nextScreen, selectedCategoryId: null };
      }
      if (prev.currentScreen === 'admin') {
        nextScreen = 'main';
        navigate('/main');
        return { ...prev, currentScreen: nextScreen, isAdminMode: false };
      }
      navigate('/main');
      return { ...prev, currentScreen: 'main' };
    });
  }, [navigate]);

  return (
    <KioskContext.Provider value={{
      ...state,
      goToScreen, selectCategory, selectContent,
      enterAdminMode, exitAdminMode,
      incrementPinAttempts, resetPinAttempts, lockAdmin,
      goHome, goBack,
    }}>
      {children}
    </KioskContext.Provider>
  );
}

export function useKiosk() {
  const context = useContext(KioskContext);
  if (!context) throw new Error('useKiosk must be used within KioskProvider');
  return context;
}
