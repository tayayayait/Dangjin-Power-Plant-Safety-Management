import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Screensaver from "./pages/Screensaver";
import MainScreen from "./pages/MainScreen";
import ContentList from "./pages/ContentList";
import ContentView from "./pages/ContentView";
import AdminDashboard from "./pages/AdminDashboard";
import { KioskProvider } from "./context/KioskContext";
import { ToastContainer } from "./components/kiosk/Toast";
import { ErrorBoundary } from "./components/kiosk/ErrorBoundary";
import { seedDatabase } from "./db/seed";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { // Disable retries for offline kiosk
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

const App = () => {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    seedDatabase().then(() => setIsDbReady(true));
  }, []);

  if (!isDbReady) {
    return <div className="h-screen w-screen bg-background flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <BrowserRouter>
            <KioskProvider>
              <Routes>
                <Route path="/" element={<Screensaver />} />
                <Route path="/main" element={<MainScreen />} />
                <Route path="/list" element={<ContentList />} />
                <Route path="/view" element={<ContentView />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              <ToastContainer />
            </KioskProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
