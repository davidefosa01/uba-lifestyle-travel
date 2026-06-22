import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

export const ListingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, addBooking, currentUser } = useAppContext();
  const listing = listings.find(l => l.id === id);

  const [checkIn, setCheckIn] = useState('2024-12-20');
  const [checkOut, setCheckOut] = useState('2024-12-25');

  if (!listing) return <div>Listing not found</div>;

  const days = Math.max(1, (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24));
  const totalPrice = listing.price * days;

  const handleBookNow = () => {
    const bookingId = Math.random().toString(36).substr(2, 9);
    addBooking({
      id: bookingId,
      listingId: listing.id,
      customerId: currentUser?.id || '',
      checkIn,
      checkOut,
      guests: 2,
      totalPrice,
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
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.name + ' ' + listing.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-uba-red underline decoration-dotted"
                >
                    {listing.location}
                </a>
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 font-bold mb-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {listing.rating}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-3 text-sm">Merchant Reviews</h3>
            <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-[10px] font-bold text-gray-900">Bisi A.</p>
                        <div className="flex text-amber-400"><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs">star</span></div>
                    </div>
                    <p className="text-[10px] text-gray-500 italic">"Exceptional service and beautiful views!"</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-[10px] font-bold text-gray-900">Chidi O.</p>
                        <div className="flex text-amber-400"><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs">star</span><span className="material-symbols-outlined text-xs text-gray-300">star</span></div>
                    </div>
                    <p className="text-[10px] text-gray-500 italic">"Very professional staff. Highly recommended."</p>
                </div>
            </div>
          </div>

          <div className="border-t border-b border-surface-variant py-4 mb-6">
            <h3 className="font-bold mb-2">About this place</h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              {listing.description} Experience luxury like never before in this UBA-verified premium property.
              Enjoy state-of-the-art amenities and world-class service.
            </p>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">person</span>
                </div>
                <div className="flex-grow">
                    <p className="text-[10px] font-bold text-gray-900">Merchant Profile</p>
                    <p className="text-[10px] text-secondary">Verified UBA Partner</p>
                </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-3 text-sm">Select Dates</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Check In</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="bg-transparent text-sm font-bold w-full outline-none"
                    />
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Check Out</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="bg-transparent text-sm font-bold w-full outline-none"
                    />
                </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary">Total Price</p>
              <p className="text-2xl font-bold text-primary">₦{totalPrice.toLocaleString()}</p>
              <p className="text-[10px] text-secondary">{days} nights • 2 guests</p>
            </div>
            <Button onClick={handleBookNow} size="lg">
              Confirm Availability
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended for you simulation */}
      <div className="px-container-margin-mb mt-8">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-uba-red text-lg">travel_explore</span>
            Recommended for You
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {listings.slice(0, 3).filter(l => l.id !== id).map(rec => (
                <div
                    key={rec.id}
                    onClick={() => navigate(`/listing/${rec.id}`)}
                    className="min-w-[160px] bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden cursor-pointer"
                >
                    <img src={rec.image} className="w-full h-24 object-cover" alt="" />
                    <div className="p-3">
                        <p className="text-[10px] font-bold text-gray-900 truncate">{rec.name}</p>
                        <p className="text-[10px] text-uba-red font-bold">₦{rec.price.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {listing.flexPayAvailable && (
        <div className="px-container-margin-mb mt-4">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-uba-red rounded-full flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <p className="font-bold text-uba-red text-sm">FlexPay Available</p>
              <p className="text-xs text-gray-600">Pay as low as ₦{((totalPrice * 1.18) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/month</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
