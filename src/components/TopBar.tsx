import type { UserRole } from '../types';
import { useAppContext } from '../context/AppContext';

export const TopBar: React.FC = () => {
  const { currentUser, role, switchRole } = useAppContext();

  return (
    <header className="bg-white border-b border-surface-variant px-container-margin-mb py-3 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-surface-variant overflow-hidden">
          <img src={currentUser?.avatar} alt={currentUser?.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-800 leading-tight">
            {role === 'CUSTOMER' ? 'Good Day,' : role === 'MERCHANT' ? 'Merchant Portal' : 'Admin Panel'}
          </h1>
          <p className="text-xs text-gray-600">{currentUser?.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={role}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="text-xs border-none bg-surface-container-low rounded-lg py-1.5 pl-2 pr-8 focus:ring-1 focus:ring-primary/20 font-medium"
        >
          <option value="CUSTOMER">Customer View</option>
          <option value="MERCHANT">Merchant View</option>
          <option value="ADMIN">Admin View</option>
        </select>

        <div className="w-8 h-8 flex items-center justify-center">
          <img
            alt="UBA Logo"
            className="w-6 h-6 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4XxIHiaRGjFAzA2xHJ-57JXynepJ1Voy-0z5zBx35N5M-n5QOhrnjoOZ2uyClyNIG41sXrEg4v4f0uDhMCZO2yAj7aKzs6mkxe6753oA3Ldhc-kPhQUtg6YsyhejKV0i1KV9UoJjwmgVj_8XPRElQchlM112wrfFdNxciVtMZSFSqfk1XFelb-Q2S58xjnjJ2c4TiGPbSrH7oKTodtv7ccRTLmJBFSa7KoYeipALKmP_T4YtEF2yE8ienYnjBlG-18q1JvEYDVuM3"
          />
        </div>
      </div>
    </header>
  );
};
