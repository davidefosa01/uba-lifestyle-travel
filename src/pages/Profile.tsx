import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

import { useState } from 'react';

export const Profile: React.FC = () => {
  const { currentUser, logout, flexPayCapacity } = useAppContext();
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'SUPPORT' | 'FEEDBACK'>('PROFILE');

  return (
    <div className="px-container-margin-mb py-6 pb-24">
      <div className="flex gap-6 border-b border-gray-100 mb-8 px-2">
        {(['PROFILE', 'SUPPORT', 'FEEDBACK'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[10px] font-bold transition-all relative ${activeTab === tab ? 'text-uba-red' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-uba-red" />}
          </button>
        ))}
      </div>

      {activeTab === 'PROFILE' && (
      <div className="text-center">
      <div className="relative inline-block mb-6">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mx-auto">
          <img src={currentUser?.avatar} alt={currentUser?.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-uba-red text-white rounded-full flex items-center justify-center border-2 border-white">
          <span className="material-symbols-outlined text-sm">edit</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-1">{currentUser?.name}</h1>
      <p className="text-secondary mb-8">{currentUser?.email}</p>

      {/* FlexPay Capacity replacing Account Balance */}
      <div className="bg-uba-red rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden mb-8 text-left">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">FlexPay Capacity</p>
                    <h2 className="text-3xl font-bold font-montserrat">₦{flexPayCapacity.visible.toLocaleString()}</h2>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md">
                    Tier {flexPayCapacity.tier}
                </div>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-3">
                <div className="bg-white h-full w-[25%]" />
            </div>
            <p className="text-[9px] opacity-80 italic font-inter leading-relaxed">
                Repay successfully to increase your capacity to Tier {flexPayCapacity.tier + 1}. Max limit: ₦{(flexPayCapacity.visible + flexPayCapacity.potential).toLocaleString()}
            </p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: 'Personal Information', icon: 'person' },
          { label: 'Security & Password', icon: 'shield' },
          { label: 'Payment Methods', icon: 'payments' },
          { label: 'Help & Support', icon: 'help' },
        ].map(item => (
          <div key={item.label} className="flex justify-between items-center p-4 bg-white border border-surface-variant rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">{item.icon}</span>
              <span className="font-bold text-sm">{item.label}</span>
            </div>
            <span className="material-symbols-outlined text-secondary">chevron_right</span>
          </div>
        ))}

        <Button variant="outline" onClick={logout} className="w-full mt-4 text-uba-red border-uba-red">Logout</Button>
      </div>
      </div>
      )}

      {activeTab === 'SUPPORT' && (
        <div className="space-y-6">
            <div className="bg-uba-red/5 p-8 rounded-3xl border border-uba-red/10">
                <h3 className="font-bold text-uba-red mb-2">Need help with your bookings?</h3>
                <p className="text-sm text-gray-600 mb-6">Our dedicated customer support team is available 24/7 to assist you.</p>
                <div className="flex flex-col gap-4">
                    <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg hover:bg-green-600 transition-colors">
                        <span className="material-symbols-outlined">chat</span> WhatsApp Support
                    </a>
                    <button className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-gray-50">
                        <span className="material-symbols-outlined">mail</span> Raise a Ticket
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
                <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    <div className="border-b border-gray-50 pb-4">
                        <p className="text-sm font-bold text-gray-900 mb-1">How do I cancel a booking?</p>
                        <p className="text-xs text-gray-500">Go to My Bookings, select the booking and click Cancel.</p>
                    </div>
                    <div className="border-b border-gray-50 pb-4">
                        <p className="text-sm font-bold text-gray-900 mb-1">Is my payment secure?</p>
                        <p className="text-xs text-gray-500">Yes, all payments are processed securely through UBA's encrypted gateway.</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'FEEDBACK' && (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft">
                <h3 className="font-bold mb-2 text-uba-red">Share your experience</h3>
                <p className="text-xs text-gray-500 mb-6">Your feedback helps us improve the Lifestyle Travel experience.</p>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Rating</label>
                        <div className="flex gap-2 text-amber-400">
                            {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined cursor-pointer">star</span>)}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Your Message</label>
                        <textarea className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm outline-none focus:border-uba-red/30 transition-all resize-none" rows={4} placeholder="What did you think of the service?" />
                    </div>
                    <Button className="w-full rounded-2xl" onClick={() => alert('Feedback submitted! Thank you.')}>Submit Feedback</Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
