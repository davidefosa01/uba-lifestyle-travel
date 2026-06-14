import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
  const { bookings, role } = useAppContext();
  const [activeTab, setActiveTab] = useState<'STATS' | 'MERCHANTS' | 'RISK'>('STATS');

  if (role !== 'ADMIN') return <div className="p-6">Access Denied</div>;

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    paid: bookings.filter(b => b.status === 'PAID').length,
    flexpay: bookings.filter(b => b.paymentPlan === 'FLEXPAY').length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-montserrat tracking-tight">Admin Overview</h1>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
           {(['STATS', 'MERCHANTS', 'RISK'] as const).map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === tab ? 'bg-white shadow-sm text-uba-red' : 'text-gray-500'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'STATS' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Bookings" value={stats.total.toString()} />
            <StatCard label="Active Revenue" value={`₦${bookings.filter(b => b.status === 'PAID').reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}`} color="text-green-600" />
            <StatCard label="FlexPay Score" value="84%" color="text-uba-red" />
            <StatCard label="System Health" value="99.9%" color="text-blue-600" />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
            <h2 className="text-sm font-bold mb-6 uppercase tracking-widest text-gray-400 font-inter">Recent Transactions</h2>
            <div className="space-y-4">
                {bookings.slice(0, 8).map(booking => (
                <div key={booking.id} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-xs">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    booking.status === 'PAID' ? 'bg-green-100 text-green-600' :
                    booking.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                        <span className="material-symbols-outlined text-lg">
                            {booking.status === 'PAID' ? 'check_circle' : booking.status === 'PENDING' ? 'schedule' : 'sync'}
                        </span>
                    </div>
                    <div className="flex-grow">
                    <p className="font-bold text-gray-900">Booking {booking.status}</p>
                    <p className="text-gray-400 font-mono">ID: {booking.bookingReference}</p>
                    </div>
                    <div className="text-right">
                    <p className="font-bold text-gray-900">₦{booking.totalPrice.toLocaleString()}</p>
                    <p className="text-gray-400">{new Date(booking.createdAt).toLocaleTimeString()}</p>
                    </div>
                </div>
                ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'MERCHANTS' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">Verified Merchants</h2>
                  <Button size="sm">Add New Merchant</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <MerchantCard name="Transcorp Hilton" email="hi@transcorp.com" status="ACTIVE" rating="4.9" />
                  <MerchantCard name="Eko Hotels" email="booking@ekohotels.com" status="ACTIVE" rating="4.7" />
                  <MerchantCard name="Radisson Blu" email="info@radisson.com" status="PENDING" rating="4.5" />
                  <MerchantCard name="Federal Palace" email="sales@federalpalace.com" status="ACTIVE" rating="4.6" />
              </div>
          </motion.div>
      )}

      {activeTab === 'RISK' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">shield_person</span>
              <h3 className="font-bold text-xl mb-2">FlexPay Risk Engine</h3>
              <p className="text-gray-500 max-w-md mx-auto text-sm">Advanced credit scoring and default monitoring dashboard. Access restricted to Risk Officers.</p>
          </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, color = "text-gray-900" }: { label: string, value: string, color?: string }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

const MerchantCard = ({ name, email, status, rating }: { name: string, email: string, status: string, rating: string }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft hover:border-uba-red/30 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-uba-red group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">storefront</span>
            </div>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                {status}
            </div>
        </div>
        <h3 className="font-bold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500 mb-4">{email}</p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-yellow-400">star</span>
                <span className="text-xs font-bold text-gray-900">{rating}</span>
            </div>
            <button className="text-[10px] font-bold text-uba-red hover:underline uppercase tracking-widest">Edit Details</button>
        </div>
    </div>
);
