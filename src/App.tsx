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
  const showTravelChrome = isAuthenticated && !isUbaDashboard && !isLogin;

  // Lockscreen and Banking Dashboard should be phone-sized on PC
  const isPhoneView = isLogin || isUbaDashboard;

  return (
    <div className={`h-screen overflow-hidden bg-background flex justify-center items-center`}>
      {/* Visual background decoration for PC */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-uba-red/5 to-gray-200 hidden md:block"></div>

      <main className={`
        z-10
        ${isPhoneView ? 'max-w-md w-full h-[90vh] rounded-[3rem] border-[8px] border-gray-900 shadow-2xl relative overflow-hidden bg-white' : 'w-full h-full bg-white relative flex flex-col'}
        ${!isPhoneView && isAuthenticated && role === 'CUSTOMER' ? 'md:max-w-4xl lg:max-w-6xl md:mx-auto md:my-4 md:rounded-3xl shadow-2xl overflow-hidden md:h-[95vh]' : ''}
        ${!isPhoneView && isAuthenticated && (role === 'MERCHANT' || role === 'ADMIN') ? 'w-full h-full' : ''}
        transition-all duration-500 ease-in-out
      `}>
        {showTravelChrome && <TopBar />}
        <div className="flex-grow overflow-y-auto hide-scrollbar">
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
