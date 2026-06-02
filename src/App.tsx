import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { TravelHome } from './pages/TravelHome';
import { ListingDetails } from './pages/ListingDetails';
import { MyBookings } from './pages/MyBookings';
import { PaymentFlow } from './pages/PaymentFlow';
import { BookingSubmitted } from './pages/BookingSubmitted';
import { Explore } from './pages/Explore';
import { Profile } from './pages/Profile';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { UbaLogin } from './pages/UbaLogin';
import { UbaDashboard } from './pages/UbaDashboard';
import { useAppContext } from './context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppContent = () => {
  const { role, isAuthenticated } = useAppContext();
  const location = useLocation();

  const renderRoutes = () => {
    if (role === 'MERCHANT') return <Route path="*" element={<PageWrapper><MerchantDashboard /></PageWrapper>} />;
    if (role === 'ADMIN') return <Route path="*" element={<PageWrapper><AdminDashboard /></PageWrapper>} />;

    return (
      <>
        <Route path="/" element={<PageWrapper><TravelHome /></PageWrapper>} />
        <Route path="/listing/:id" element={<PageWrapper><ListingDetails /></PageWrapper>} />
        <Route path="/bookings" element={<PageWrapper><MyBookings /></PageWrapper>} />
        <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/payment/:id" element={<PageWrapper><PaymentFlow /></PageWrapper>} />
        <Route path="/booking-submitted" element={<PageWrapper><BookingSubmitted /></PageWrapper>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  };

  const isUbaDashboard = location.pathname === '/dashboard';
  const isLogin = location.pathname === '/login';
  const showTravelChrome = isAuthenticated && !isUbaDashboard && !isLogin;

  return (
    <div className={`min-h-screen bg-background ${showTravelChrome ? 'pb-20' : ''}`}>
      {showTravelChrome && <TopBar />}
      <main className={`${isAuthenticated ? 'max-w-md mx-auto bg-white min-h-screen shadow-xl relative overflow-hidden' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<UbaLogin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UbaDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Routes>
                    {renderRoutes()}
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
        {showTravelChrome && <BottomNav />}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
