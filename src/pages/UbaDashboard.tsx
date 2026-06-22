import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const UbaDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);

  const handleEnterTravel = () => {
    navigate('/');
  };

  const { accountBalance } = useAppContext();

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f7f7f7]">
      {/* MainHeader */}
      <div className="bg-white border-b border-gray-100 z-50">
        <header className="px-4 py-4 relative">
          <div className="flex items-center justify-between">
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-500 font-bold bg-[#f0f0f0] cursor-pointer hover:bg-gray-200 transition-colors"
            >
              DE
            </div>
            {showMenu && (
              <div className="absolute top-14 left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-[60]">
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="text-xs font-bold text-gray-900">David Enabulele</p>
                  <p className="text-[10px] text-gray-500">david.e@uba.com</p>
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
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Good Morning</h1>
              <p className="text-sm text-gray-500 font-medium">David Enabulele</p>
            </div>
            <div className="w-20 h-12 flex items-center justify-end">
              <img src="/uba-logo-premium.png" alt="UBA Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </header>

        {/* Back button below DE in blank space */}
        <div className="px-4 py-2 bg-gray-50/50">
          <button
            onClick={() => navigate('/login')}
            className="w-10 h-10 flex items-center justify-center text-gray-600 bg-white shadow-sm border border-gray-200 rounded-full hover:bg-gray-100 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
        </div>
      </div>

      {/* MainContent */}
      <main className="flex-grow overflow-y-auto p-4 space-y-4 pb-24">
        {/* Account Balance Card */}
        <section className="bg-uba-red rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10">
            <p className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">Total Balance</p>
            <h2 className="text-3xl font-bold font-montserrat">₦{accountBalance.toLocaleString()}</h2>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-[10px] opacity-70 uppercase">Account Number</p>
                <p className="font-mono text-sm tracking-widest">2039 **** 4822</p>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md">
                Tier 3 Savings
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle Travel Entry */}
        <section className="bg-white rounded-xl shadow-sm border border-red-50 p-1">
          <div
            onClick={handleEnterTravel}
            className="w-full bg-gradient-to-r from-red-50 to-white rounded-lg p-4 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-uba-red rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined text-2xl">explore</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-base font-montserrat">Lifestyle Travel</p>
                <p className="text-xs text-gray-500 font-inter">Marketplace & Bookings</p>
              </div>
            </div>
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-uba-red text-xl font-bold">chevron_right</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-6 font-montserrat">Shortcuts</h2>
          <div className="grid grid-cols-4 gap-4">
            <Shortcut icon="swap_horiz" label="Transfer" />
            <Shortcut icon="atm" label="Cardless Withdra..." />
            <Shortcut icon="receipt_long" label="Bill" />
            <Shortcut icon="phone_iphone" label="Top Up" />
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-montserrat">Personal Financial Manager</h2>
          <div className="flex space-x-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-uba-red flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-lg">restaurant</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#2d2d2d] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#8e8e93] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 font-inter">
            Our PFM helps you track your expenses, set goals and set your monthly and daily limits easily.
          </p>
          <div className="flex justify-center border-t border-gray-50 pt-4">
            <button className="text-uba-red font-bold text-base flex items-center font-montserrat">
              Activate your PFM
              <span className="material-symbols-outlined ml-1">chevron_right</span>
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-8 font-montserrat">Upcoming Payments</h2>
          <div className="text-center py-4">
            <p className="text-[#a52a2a] text-sm mb-8 font-inter font-medium">You have no upcoming payments</p>
            <button className="text-uba-red font-bold text-base flex items-center mx-auto font-montserrat">
              More
              <span className="material-symbols-outlined ml-1 text-xl">chevron_right</span>
            </button>
          </div>
        </section>
      </main>

      {/* BottomNavigation */}
      <nav className="bg-white border-t border-gray-100 py-3 px-6 sticky bottom-0 left-0 right-0 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] z-50">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavItem icon="grid_view" label="Dashboard" active hasBadge />
          <NavItem icon="swap_horiz" label="Transfer" />
          <NavItem icon="credit_card" label="Pay" />
          <NavItem icon="phone_iphone" label="Top Up" />
          <NavItem icon="more_horiz" label="More" />
        </div>
      </nav>

      {/* Footer bar */}
      <div className="w-32 h-1 bg-black rounded-full mx-auto mb-2 opacity-20 shrink-0"></div>
    </div>
  );
};

const Shortcut = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="w-14 h-14 bg-uba-red rounded-full flex items-center justify-center mb-2 shadow-md group-active:scale-95 transition-transform text-white">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <span className="text-[10px] text-center font-bold text-gray-700 font-inter leading-tight h-8 flex items-start justify-center px-1">
      {label}
    </span>
  </div>
);

// @ts-ignore
const NavItem = ({ icon, label, active, hasBadge }: { icon: string; label: string; active?: boolean; hasBadge?: boolean }) => (
  <div className={`flex flex-col items-center cursor-pointer transition-all ${active ? 'scale-105' : 'opacity-50 hover:opacity-80'}`}>
    <div className="relative">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-red-50 text-uba-red' : 'text-gray-600'}`}>
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: active ? "'FILL' 1" : "''" }}>
          {icon}
        </span>
      </div>
      {hasBadge && (
        <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow-sm"></div>
      )}
    </div>
    <span className={`text-[10px] mt-0.5 font-bold ${active ? 'text-uba-red' : 'text-gray-600'}`}>{label}</span>
  </div>
);
