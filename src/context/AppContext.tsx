import type { UserRole, User, Booking, Notification, Listing } from '../types';
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { mockUsers, mockListings } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  listings: Listing[];
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('uba_auth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('uba_bookings');
    return saved ? JSON.parse(saved) : [];
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [listings] = useState<Listing[]>(mockListings);

  useEffect(() => {
    localStorage.setItem('uba_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (isAuthenticated) {
      const user = mockUsers.find(u => u.role === role) || mockUsers[0];
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated, role]);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('uba_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('uba_auth');
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    addNotification({
      userId: booking.customerId,
      title: 'Booking Requested',
      message: `Your booking for ${mockListings.find(l => l.id === booking.listingId)?.name} is pending merchant confirmation.`,
      type: 'INFO'
    });
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));

    const booking = bookings.find(b => b.id === id);
    if (booking) {
      const listing = listings.find(l => l.id === booking.listingId);
      let title = '';
      let message = '';
      let type: Notification['type'] = 'INFO';

      if (status === 'CONFIRMED') {
        title = 'Booking Confirmed!';
        message = `Merchant has confirmed your booking for ${listing?.name}. You can now proceed to payment.`;
        type = 'SUCCESS';
      } else if (status === 'DECLINED') {
        title = 'Booking Declined';
        message = `Unfortunately, the merchant declined your booking for ${listing?.name}.`;
        type = 'ERROR';
      } else if (status === 'PAID') {
        title = 'Payment Successful';
        message = `Your payment for ${listing?.name} has been processed successfully. Enjoy your trip!`;
        type = 'SUCCESS';
      }

      if (title) {
        addNotification({
          userId: booking.customerId,
          title,
          message,
          type
        });
      }
    }
  };

  const addNotification = (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...n,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      role, switchRole,
      bookings, addBooking, updateBookingStatus,
      notifications, addNotification, markNotificationRead,
      listings,
      isAuthenticated, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
