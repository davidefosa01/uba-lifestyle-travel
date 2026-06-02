import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const AppContent = () => {
  const { role } = useAppContext();
  const location = useLocation();

  const renderContent = () => {
    if (role === 'MERCHANT') return <PageWrapper><MerchantDashboard /></PageWrapper>;
    if (role === 'ADMIN') return <PageWrapper><AdminDashboard /></PageWrapper>;

    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><TravelHome /></PageWrapper>} />
          <Route path="/listing/:id" element={<PageWrapper><ListingDetails /></PageWrapper>} />
          <Route path="/bookings" element={<PageWrapper><MyBookings /></PageWrapper>} />
          <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/payment/:id" element={<PageWrapper><PaymentFlow /></PageWrapper>} />
          <Route path="/booking-submitted" element={<PageWrapper><BookingSubmitted /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><TravelHome /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />
      <main className="max-w-md mx-auto bg-white min-h-[calc(100vh-64px)] shadow-xl relative overflow-hidden">
        {renderContent()}
        <BottomNav />
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
