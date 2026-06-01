import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

export const Profile: React.FC = () => {
  const { currentUser } = useAppContext();

  return (
    <div className="px-container-margin-mb py-6 pb-24 text-center">
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

      <div className="bg-surface-container-low rounded-3xl p-6 text-left mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs font-bold text-secondary uppercase">Account Balance</p>
          <span className="material-symbols-outlined text-secondary">visibility</span>
        </div>
        <p className="text-3xl font-bold mb-2">₦{currentUser?.balance.toLocaleString()}</p>
        <div className="flex gap-2">
          <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded">Savings</div>
          <div className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">Verified</div>
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

        <Button variant="outline" className="w-full mt-4 text-uba-red border-uba-red">Logout</Button>
      </div>
    </div>
  );
};
