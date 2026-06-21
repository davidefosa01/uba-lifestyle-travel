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

  const { accountBalance, flexPayCapacity } = useAppContext();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f7f7f7]">
      {/* MainHeader */}
      <div className="bg-white border-b border-gray-100 z-50">
        <header className="px-4 md:px-12 py-4 relative">
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
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
            <div className="w-12 h-12 flex items-center justify-end">
              <img src="/logo.png" alt="UBA Logo" className="w-10 h-10 object-contain" />
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
      <main className="flex-grow overflow-y-auto p-4 md:p-12 space-y-4 md:space-y-8 pb-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
        {/* Account Balance Card */}
        <section className="bg-uba-red rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden h-full min-h-[240px] flex flex-col justify-center">
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

            </div>

            <div className="space-y-6">
                {/* FlexPay Capacity Banner */}
                <section className="bg-white rounded-3xl border border-red-100 p-8 shadow-sm h-full flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-uba-red text-3xl">credit_score</span>
                    <span className="text-base font-bold text-gray-800 uppercase tracking-widest">FlexPay Capacity</span>
                    </div>
                    <span className="text-xl font-bold text-uba-red">₦{flexPayCapacity.visible.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-uba-red h-full w-[20%] transition-all duration-1000"></div>
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">
                    Repay successfully to unlock your <span className="font-bold text-gray-700">Tier 2</span> limit of <span className="font-bold text-gray-700">₦{(flexPayCapacity.visible + flexPayCapacity.potential).toLocaleString()}</span>.
                </p>
                </section>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                {/* Lifestyle Travel Entry */}
                <section className="bg-white rounded-3xl shadow-sm border border-red-50 p-2 overflow-hidden group">
                <div
                    onClick={handleEnterTravel}
                    className="w-full bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
                >
                    <div className="flex items-center space-x-8">
                    <div className="w-20 h-20 bg-uba-red rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-3 transition-transform">
                        <span className="material-symbols-outlined text-4xl">explore</span>
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-gray-900 text-3xl font-montserrat tracking-tight mb-1">Lifestyle Travel</h3>
                        <p className="text-base text-gray-500 font-inter">Explore the world with flexible payment options.</p>
                    </div>
                    </div>
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:translate-x-2 transition-transform">
                    <span className="material-symbols-outlined text-uba-red text-2xl font-bold">chevron_right</span>
                    </div>
                </div>
                </section>

                <section className="bg-white rounded-3xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-8 font-montserrat">Quick Shortcuts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <Shortcut icon="swap_horiz" label="Transfer" />
                    <Shortcut icon="atm" label="Cardless Withdrawal" />
                    <Shortcut icon="receipt_long" label="Pay Bills" />
                    <Shortcut icon="phone_iphone" label="Airtime & Data" />
                </div>
                </section>
            </div>

            <div className="space-y-8">
        <section className="bg-white rounded-3xl shadow-sm p-8 h-full">
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-montserrat">Financial Manager</h2>
          <div className="flex space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-uba-red flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#2d2d2d] flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#8e8e93] flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
          </div>
          <p className="text-base text-gray-600 leading-relaxed mb-8 font-inter">
            Track your expenses, set goals and manage your limits effortlessly.
          </p>
          <div className="flex justify-center border-t border-gray-100 pt-6">
            <button className="text-uba-red font-bold text-lg flex items-center font-montserrat group">
              Activate PFM
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 font-montserrat tracking-tight">Scheduled Payments</h2>
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-gray-200">event_busy</span>
            </div>
            <p className="text-gray-400 text-sm mb-8 font-inter">No payments scheduled for this month</p>
            <button className="text-uba-red font-bold text-base flex items-center mx-auto font-montserrat group">
              View History
              <span className="material-symbols-outlined ml-2 text-xl group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
          </div>
        </section>
            </div>
        </div>
      </main>

      {/* Footer bar (Mobile only) */}
      <div className="w-32 h-1 bg-black rounded-full mx-auto mb-2 opacity-20 md:hidden shrink-0"></div>
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
