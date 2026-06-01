import React from 'react';
import { useAppContext } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { bookings, role } = useAppContext();

  if (role !== 'ADMIN') return <div className="p-6">Access Denied</div>;

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    paid: bookings.filter(b => b.status === 'PAID').length,
    flexpay: bookings.filter(b => b.paymentPlan === 'FLEXPAY').length,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface p-4 rounded-2xl border border-surface-variant">
          <p className="text-[10px] text-secondary font-bold uppercase">Total Bookings</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-surface-variant">
          <p className="text-[10px] text-secondary font-bold uppercase">Active Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            ₦{bookings.filter(b => b.status === 'PAID').reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-surface-variant">
          <p className="text-[10px] text-secondary font-bold uppercase">FlexPay Approvals</p>
          <p className="text-2xl font-bold text-uba-red">84%</p>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-surface-variant">
          <p className="text-[10px] text-secondary font-bold uppercase">Merchant Perf.</p>
          <p className="text-2xl font-bold text-blue-600">9.8</p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">Recent System Activity</h2>
      <div className="space-y-4">
        {bookings.slice(0, 5).map(booking => (
          <div key={booking.id} className="flex gap-4 items-center bg-white p-3 rounded-xl border border-surface-variant text-xs">
            <div className={`w-2 h-10 rounded-full ${
              booking.status === 'PAID' ? 'bg-green-500' :
              booking.status === 'PENDING' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            <div className="flex-grow">
              <p className="font-bold">Booking {booking.status}</p>
              <p className="text-secondary">Ref: {booking.bookingReference}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">₦{booking.totalPrice.toLocaleString()}</p>
              <p className="text-secondary">{new Date(booking.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
