import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = () => {
    login();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      {/* Status Bar Placeholder */}
      <div className="w-full h-10 bg-white flex items-center justify-between px-4 text-xs font-semibold">
        <span>{new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</span>
        <div className="flex items-center space-x-1">
          <span className="text-[10px]">4G</span>
          <div className="w-5 h-3 border border-gray-400 rounded-sm relative">
            <div className="absolute inset-y-0 left-0 bg-gray-600 w-3/4"></div>
          </div>
          <span>96</span>
        </div>
      </div>

      {/* MainHeader */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-500 font-medium">
            DE
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 leading-tight">Good Morning</h1>
            <p className="text-sm text-gray-600">David</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              alt="UBA Logo"
              className="w-8 h-8 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4XxIHiaRGjFAzA2xHJ-57JXynepJ1Voy-0z5zBx35N5M-n5QOhrnjoOZ2uyClyNIG41sXrEg4v4f0uDhMCZO2yAj7aKzs6mkxe6753oA3Ldhc-kPhQUtg6YsyhejKV0i1KV9UoJjwmgVj_8XPRElQchlM112wrfFdNxciVtMZSFSqfk1XFelb-Q2S58xjnjJ2c4TiGPbSrH7oKTodtv7ccRTLmJBFSa7KoYeipALKmP_T4YtEF2yE8ienYnjBlG-18q1JvEYDVuM3"
            />
          </div>
        </div>
      </header>

      {/* MainContent */}
      <main className="flex-grow p-4 space-y-4">
        <section className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-6 font-montserrat">Shortcuts</h2>
          <div className="grid grid-cols-4 gap-4">
            <Shortcut icon="swap_horiz" label="Transfer" />
            <Shortcut icon="atm" label="Cardless Withdrawal" />
            <Shortcut icon="receipt_long" label="Bill" />
            <Shortcut icon="phone_iphone" label="Top Up" />

            <div className="flex flex-col items-center col-span-4 mt-4 border-t border-dashed border-gray-200 pt-4">
              <div
                onClick={handleLogin}
                className="w-full bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-uba-red rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">explore</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800 font-montserrat">Lifestyle Travel</p>
                    <p className="text-xs text-gray-500 font-inter">Book flights, hotels & more</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-uba-red">chevron_right</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4 font-montserrat">Personal Financial Manager</h2>
          <div className="flex space-x-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-uba-red flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">restaurant</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">shopping_bag</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">directions_car</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 font-inter">
            Our PFM helps you track your expenses, set goals and set your monthly and daily limits easily.
          </p>
          <div className="flex justify-center">
            <button className="text-uba-red font-bold text-base flex items-center font-montserrat">
              Activate your PFM
              <span className="material-symbols-outlined ml-1">chevron_right</span>
            </button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-5 pb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-10 font-montserrat">Upcoming Payments</h2>
          <div className="text-center">
            <p className="text-uba-red text-sm mb-8 font-inter">You have no upcoming payments</p>
            <button className="text-uba-red font-bold text-base flex items-center mx-auto font-montserrat">
              More
              <span className="material-symbols-outlined ml-1">chevron_right</span>
            </button>
          </div>
        </section>
      </main>

      {/* BottomNavigation */}
      <nav className="bg-white border-t border-gray-200 py-3 px-6 fixed bottom-0 left-0 right-0">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavItem icon="dashboard" label="Dashboard" active />
          <NavItem icon="swap_horiz" label="Transfer" />
          <NavItem icon="payments" label="Pay" />
          <NavItem icon="phone_iphone" label="Top Up" />
          <NavItem icon="grid_view" label="More" />
        </div>
      </nav>
      <div className="h-20"></div>
    </div>
  );
};

const Shortcut = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 bg-uba-red rounded-full flex items-center justify-center mb-2 shadow-md text-white">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <span className="text-[10px] text-center font-medium text-gray-700 font-inter leading-tight">{label}</span>
  </div>
);

const NavItem = ({ icon, label, active }: { icon: string; label: string; active?: boolean }) => (
  <div className={`flex flex-col items-center ${active ? '' : 'opacity-40'}`}>
    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${active ? 'bg-uba-red text-white' : 'text-gray-600'}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <span className={`text-[10px] mt-1 font-bold ${active ? 'text-uba-red' : 'text-gray-600'}`}>{label}</span>
  </div>
);
