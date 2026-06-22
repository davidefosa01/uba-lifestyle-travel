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

  const isUbaDashboard = location.pathname === '/dashboard';
  const isLogin = location.pathname === '/login';
  const isBankingApp = isLogin || isUbaDashboard;
  const showTravelChrome = isAuthenticated && !isBankingApp;

  return (
    <div className={`h-screen overflow-hidden flex flex-col ${isBankingApp ? 'bg-gray-100' : 'bg-white'}`}>
      <main className={`
        flex-grow overflow-hidden relative flex flex-col mx-auto transition-all duration-500
        ${isBankingApp ? 'md:my-6 md:max-w-[400px] md:h-[800px] md:max-h-[90vh] md:rounded-[3rem] md:border-[12px] md:border-gray-900 md:shadow-2xl md:relative' : 'w-full'}
      `}>
        {showTravelChrome && <TopBar />}
        <div className="flex-grow overflow-y-auto hide-scrollbar relative z-10 bg-white">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<UbaLogin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageWrapper><UbaDashboard /></PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* Role-based entry */}
            {role === 'MERCHANT' ? (
              <Route path="*" element={<ProtectedRoute><PageWrapper><MerchantDashboard /></PageWrapper></ProtectedRoute>} />
            ) : role === 'ADMIN' ? (
              <Route path="*" element={<ProtectedRoute><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />
            ) : (
              <>
                <Route path="/" element={<ProtectedRoute><PageWrapper><TravelHome /></PageWrapper></ProtectedRoute>} />
                <Route path="/listing/:id" element={<ProtectedRoute><PageWrapper><ListingDetails /></PageWrapper></ProtectedRoute>} />
                <Route path="/bookings" element={<ProtectedRoute><PageWrapper><MyBookings /></PageWrapper></ProtectedRoute>} />
                <Route path="/explore" element={<ProtectedRoute><PageWrapper><Explore /></PageWrapper></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />
                <Route path="/payment/:id" element={<ProtectedRoute><PageWrapper><PaymentFlow /></PageWrapper></ProtectedRoute>} />
                <Route path="/booking-submitted" element={<ProtectedRoute><PageWrapper><BookingSubmitted /></PageWrapper></ProtectedRoute>} />
              </>
            )}

            <Route path="*" element={<Navigate to={isAuthenticated ? (role === 'CUSTOMER' ? "/" : "/dashboard") : "/login"} replace />} />
          </Routes>
        </AnimatePresence>
        </div>
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
