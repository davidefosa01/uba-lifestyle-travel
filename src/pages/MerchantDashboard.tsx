import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

export const MerchantDashboard: React.FC = () => {
  const { bookings, listings, updateBookingStatus, role } = useAppContext();

  if (role !== 'MERCHANT') return <div className="p-6">Access Denied</div>;

  const merchantBookings = bookings.filter(b => {
    const listing = listings.find(l => l.id === b.listingId);
    return listing?.merchantId === 'merchant-1';
  });

  const pending = merchantBookings.filter(b => b.status === 'PENDING');
  const active = merchantBookings.filter(b => b.status !== 'PENDING' && b.status !== 'DECLINED');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Merchant Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface p-4 rounded-2xl border border-surface-variant">
          <p className="text-xs text-secondary font-bold uppercase">Pending Requests</p>
          <p className="text-3xl font-bold text-uba-red">{pending.length}</p>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-surface-variant">
          <p className="text-xs text-secondary font-bold uppercase">Total Revenue</p>
          <p className="text-2xl font-bold text-on-surface">
            ₦{active.reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">Pending Availability Requests</h2>
        {pending.length === 0 ? (
          <p className="text-secondary text-sm italic">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {pending.map(booking => {
              const listing = listings.find(l => l.id === booking.listingId);
              return (
                <div key={booking.id} className="bg-white p-4 rounded-2xl border border-surface-variant shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold">{listing?.name}</h3>
                      <p className="text-xs text-secondary">Ref: {booking.bookingReference}</p>
                    </div>
                    <p className="font-bold text-uba-red text-sm">₦{booking.totalPrice.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-grow"
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                    >
                      Confirm
                    </Button>
                    <Button
                      className="flex-grow"
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

      <section>
        <h2 className="text-lg font-bold mb-4">Settlements</h2>
        <div className="space-y-2">
          {active.filter(b => b.status === 'PAID').map(booking => (
            <div key={booking.id} className="flex justify-between items-center py-2 border-b border-surface-variant text-sm">
              <div>
                <p className="font-medium">Settlement - {booking.bookingReference}</p>
                <p className="text-[10px] text-secondary">{new Date(booking.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="font-bold text-green-600">+₦{booking.totalPrice.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
