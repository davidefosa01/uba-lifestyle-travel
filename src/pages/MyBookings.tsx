import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

export const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, listings } = useAppContext();

  return (
    <div className="px-container-margin-mb py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-secondary">confirmation_number</span>
          </div>
          <h3 className="font-bold text-lg mb-2">No bookings yet</h3>
          <p className="text-sm text-secondary mb-8 max-w-xs">You haven't made any travel bookings yet. Explore our featured destinations to get started.</p>
          <Button onClick={() => navigate('/')}>Explore Destinations</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const listing = listings.find(l => l.id === booking.listingId);
            return (
              <div key={booking.id} className="bg-white rounded-2xl border border-surface-variant overflow-hidden shadow-sm">
                <div className="flex">
                  <div className="w-24 h-24 shrink-0">
                    <img src={listing?.image} alt={listing?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm truncate max-w-[120px]">{listing?.name}</h3>
                        <p className="text-[10px] text-secondary">{booking.bookingReference}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        booking.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'PAID' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-end">
                      <p className="font-bold text-primary text-sm">₦{booking.totalPrice.toLocaleString()}</p>
                      {booking.status === 'CONFIRMED' && (
                        <Button
                          size="sm"
                          onClick={() => navigate(`/payment/${booking.id}`)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
