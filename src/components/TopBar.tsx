import type { UserRole } from '../types';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const { currentUser, role, switchRole, logout } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="bg-white border-b border-surface-variant px-container-margin-mb py-4 z-50 flex items-center justify-between">
      <div className="flex items-center gap-2 relative">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold bg-[#f0f0f0] cursor-pointer hover:bg-gray-200 transition-colors"
        >
          DE
        </div>
        {showMenu && (
          <div className="absolute top-12 left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-[60]">
            <div className="px-4 py-2 border-b border-gray-50">
              <p className="text-xs font-bold text-gray-900">{currentUser?.name}</p>
              <p className="text-[10px] text-gray-500">{currentUser?.email}</p>
            </div>
            <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">person</span> Profile
            </button>
            <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">settings</span> Settings
            </button>
            <button
              onClick={() => logout()}
              className="w-full text-left px-4 py-2 text-xs text-uba-red font-bold hover:bg-red-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">logout</span> Logout
            </button>
          </div>
        )}
        <div>
          <h1 className="text-sm font-bold text-gray-800 leading-tight">
            {role === 'CUSTOMER' ? 'Good Day,' : role === 'MERCHANT' ? 'Merchant Portal' : 'Admin Panel'}
          </h1>
          <p className="text-xs text-gray-600 font-medium">{currentUser?.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={role}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="text-[10px] border-none bg-surface-container-low rounded-lg py-1 pl-1 pr-6 focus:ring-1 focus:ring-primary/20 font-bold text-uba-red uppercase tracking-tighter"
        >
          <option value="CUSTOMER">Customer</option>
          <option value="MERCHANT">Merchant</option>
          <option value="ADMIN">Admin</option>
        </select>

        <div className="w-10 h-10 flex items-center justify-end">
          <img
            alt="UBA Logo"
            className="w-full h-full object-contain"
            src="/logo.png"
          />
        </div>
      </div>
    </header>
  );
};
