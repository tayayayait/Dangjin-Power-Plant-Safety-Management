import { useEffect, useState } from 'react';
import { KioskProvider, useKiosk } from '@/context/KioskContext';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { PinModal } from '@/components/kiosk/PinModal';
import Screensaver from './Screensaver';
import MainScreen from './MainScreen';
import ContentList from './ContentList';
import ContentView from './ContentView';
import AdminDashboard from './AdminDashboard';

function KioskApp() {
  const { currentScreen, goToScreen, isAdminMode } = useKiosk();
  const [pinModalOpen, setPinModalOpen] = useState(false);

  // Auto screensaver after 120s inactivity (only on main/content screens, not admin)
  useInactivityTimer(
    120,
    () => goToScreen('screensaver'),
    currentScreen !== 'screensaver' && !isAdminMode
  );

  // Listen for admin pin modal event
  useEffect(() => {
    const handler = () => setPinModalOpen(true);
    window.addEventListener('open-admin-pin', handler);
    return () => window.removeEventListener('open-admin-pin', handler);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className={`transition-opacity duration-300 ${currentScreen === 'screensaver' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}>
        <Screensaver />
      </div>

      {currentScreen === 'main' && (
        <div className="animate-fade-in">
          <MainScreen />
        </div>
      )}

      {currentScreen === 'content-list' && (
        <div className="animate-fade-in">
          <ContentList />
        </div>
      )}

      {currentScreen === 'content-view' && (
        <div className="animate-fade-in">
          <ContentView />
        </div>
      )}

      {currentScreen === 'admin' && (
        <div className="animate-fade-in">
          <AdminDashboard />
        </div>
      )}

      <PinModal open={pinModalOpen} onClose={() => setPinModalOpen(false)} />
    </div>
  );
}

export default function Index() {
  return (
    <KioskProvider>
      <KioskApp />
    </KioskProvider>
  );
}
