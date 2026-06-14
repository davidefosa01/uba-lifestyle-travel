import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

export const MerchantDashboard: React.FC = () => {
  const { bookings, listings, updateBookingStatus, role } = useAppContext();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ANALYTICS' | 'SUPPORT'>('OVERVIEW');

  if (role !== 'MERCHANT') return <div className="p-6">Access Denied</div>;

  const merchantBookings = bookings.filter(b => {
    const listing = listings.find(l => l.id === b.listingId);
    return listing?.merchantId === 'merchant-1';
  });

  const pending = merchantBookings.filter(b => b.status === 'PENDING');
  const active = merchantBookings.filter(b => b.status !== 'PENDING' && b.status !== 'DECLINED');
  const revenue = active.reduce((acc, b) => acc + b.totalPrice, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-montserrat">Merchant Dashboard</h1>
          <p className="text-xs text-gray-500 font-inter">Transcorp Hilton Lagos • 4.8★</p>
        </div>
        <div className="flex gap-2">
            <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Trust Score</p>
                <p className="text-sm font-bold text-green-600">98/100</p>
            </div>
            <div className="w-10 h-10 bg-uba-red/10 rounded-full flex items-center justify-center text-uba-red">
                <span className="material-symbols-outlined">analytics</span>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 mb-8">
        {(['OVERVIEW', 'ANALYTICS', 'SUPPORT'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-xs font-bold transition-all relative ${activeTab === tab ? 'text-uba-red' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-uba-red" />}
          </button>
        ))}
      </div>

      {activeTab === 'OVERVIEW' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Pending Requests</p>
              <p className="text-3xl font-bold text-uba-red">{pending.length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₦{revenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Average Rating</p>
              <div className="flex items-center gap-1">
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <span className="material-symbols-outlined text-yellow-400">star</span>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-bold mb-4 font-montserrat">Active Requests</h2>
          {pending.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
               <p className="text-gray-400 text-sm">All requests processed. Sit back and relax!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pending.map(booking => {
                const listing = listings.find(l => l.id === booking.listingId);
                return (
                  <div key={booking.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{listing?.name}</h3>
                        <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{booking.bookingReference}</p>
                      </div>
                      <p className="font-bold text-uba-red">₦{booking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-grow rounded-xl"
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                      >
                        Confirm
                      </Button>
                      <Button
                        className="flex-grow rounded-xl"
                        variant="outline"
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'DECLINED')}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </section>
        </motion.div>
      )}

      {activeTab === 'ANALYTICS' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft">
                <h3 className="font-bold mb-6">Booking Performance (Last 30 Days)</h3>
                <div className="h-48 flex items-end justify-between gap-2">
                    {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                        <div key={i} className="flex-grow group relative">
                            <div style={{ height: `${h}%` }} className="bg-red-100 rounded-t-lg group-hover:bg-uba-red transition-all duration-300" />
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">₦{Math.floor(Math.random() * 500)}k</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400">
                    <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
                    <h3 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-widest">Customer Demographics</h3>
                    <div className="space-y-4">
                        <DemoRow label="Lagos, NG" value="65%" width="w-[65%]" />
                        <DemoRow label="Abuja, NG" value="20%" width="w-[20%]" />
                        <DemoRow label="Port Harcourt" value="10%" width="w-[10%]" />
                        <DemoRow label="Others" value="5%" width="w-[5%]" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
                    <h3 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-widest">Top Listings</h3>
                    <div className="space-y-4">
                        <p className="text-xs font-bold flex justify-between"><span>Luxury Resort Suite</span> <span className="text-uba-red">₦1.2M</span></p>
                        <p className="text-xs font-bold flex justify-between"><span>Minimalist Zen Den</span> <span className="text-uba-red">₦450k</span></p>
                        <p className="text-xs font-bold flex justify-between"><span>Ocean View Loft</span> <span className="text-uba-red">₦320k</span></p>
                    </div>
                </div>
            </div>
        </motion.div>
      )}

      {activeTab === 'SUPPORT' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-uba-red/5 p-8 rounded-3xl border border-uba-red/10">
                <h3 className="font-bold text-uba-red mb-2">Need help with your listings?</h3>
                <p className="text-sm text-gray-600 mb-6">Our dedicated merchant support team is available 24/7 to assist you.</p>
                <div className="flex gap-4">
                    <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg hover:bg-green-600 transition-colors">
                        <span className="material-symbols-outlined">chat</span> WhatsApp Support
                    </a>
                    <button className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-sm hover:bg-gray-50">
                        <span className="material-symbols-outlined">mail</span> Raise a Ticket
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
                <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    <FAQItem question="When do I get paid for a booking?" answer="Settlements are processed 24 hours after the customer checks in." />
                    <FAQItem question="How do I update my listing prices?" answer="Go to Listings > Edit > Pricing and Save." />
                    <FAQItem question="What is FlexPay Capacity?" answer="It's the amount of credit we offer your customers to pay for your services in installments." />
                </div>
            </div>
        </motion.div>
      )}
    </div>
  );
};

const DemoRow = ({ label, value, width }: { label: string, value: string, width: string }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-gray-600">
            <span>{label}</span>
            <span>{value}</span>
        </div>
        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
            <div className={`bg-uba-red h-full ${width}`} />
        </div>
    </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="border-b border-gray-50 pb-4">
        <p className="text-sm font-bold text-gray-900 mb-1">{question}</p>
        <p className="text-xs text-gray-500">{answer}</p>
    </div>
);
