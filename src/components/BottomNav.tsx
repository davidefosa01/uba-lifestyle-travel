import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAppContext();

  if (role !== 'CUSTOMER') return null;

  const navItems = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Explore', icon: 'explore', path: '/explore' },
    { label: 'Bookings', icon: 'confirmation_number', path: '/bookings' },
    { label: 'Profile', icon: 'person', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full flex justify-around items-center bg-surface px-4 py-2 border-t border-surface-variant z-50 shadow-[0_-4px_16px_rgba(51,51,51,0.04)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5 ${
              isActive ? 'text-primary font-bold' : 'text-secondary hover:bg-surface-container-lowest'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
