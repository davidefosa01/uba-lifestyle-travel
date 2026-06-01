import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

export const ListingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, addBooking, currentUser } = useAppContext();
  const listing = listings.find(l => l.id === id);

  if (!listing) return <div>Listing not found</div>;

  const handleBookNow = () => {
    const bookingId = Math.random().toString(36).substr(2, 9);
    addBooking({
      id: bookingId,
      listingId: listing.id,
      customerId: currentUser?.id || '',
      checkIn: '2024-07-15',
      checkOut: '2024-07-20',
      guests: 2,
      totalPrice: listing.price * 5,
      status: 'PENDING',
      bookingReference: `UBA-${Math.random().toString(36).toUpperCase().substr(2, 6)}`,
      createdAt: new Date().toISOString(),
    });
    navigate('/booking-submitted');
  };

  return (
    <div className="pb-24">
      <div className="relative h-80">
        <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <div className="px-container-margin-mb -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-surface-variant">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                {listing.category}
              </span>
              <h1 className="text-2xl font-bold text-on-surface">{listing.name}</h1>
              <p className="text-secondary text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {listing.location}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 font-bold mb-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {listing.rating}
              </div>
            </div>
          </div>

          <div className="border-t border-b border-surface-variant py-4 mb-6">
            <h3 className="font-bold mb-2">About this place</h3>
            <p className="text-sm text-secondary leading-relaxed">
              {listing.description} Experience luxury like never before in this UBA-verified premium property.
              Enjoy state-of-the-art amenities and world-class service.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary">Total Price</p>
              <p className="text-2xl font-bold text-primary">₦{(listing.price * 5).toLocaleString()}</p>
              <p className="text-[10px] text-secondary">5 nights • 2 guests</p>
            </div>
            <Button onClick={handleBookNow} size="lg">
              Confirm Availability
            </Button>
          </div>
        </div>
      </div>

      {listing.flexPayAvailable && (
        <div className="px-container-margin-mb mt-6">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-uba-red rounded-full flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <p className="font-bold text-uba-red text-sm">FlexPay Available</p>
              <p className="text-xs text-gray-600">Pay as low as ₦{((listing.price * 5 * 1.18) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/month</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
