import type { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onClick?: () => void;
  variant?: 'large' | 'small';
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick, variant = 'large' }) => {
  if (variant === 'small') {
    return (
      <div
        onClick={onClick}
        className="group bg-surface border border-surface-variant rounded-xl overflow-hidden shadow-soft active:scale-[0.98] transition-all cursor-pointer hover:shadow-lg"
      >
        <div className="h-40 overflow-hidden relative">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-3">
          <h5 className="font-inter font-bold text-sm truncate text-on-surface">{listing.name}</h5>
          <p className="text-secondary text-[10px] mb-2">{listing.location}</p>
          <p className="text-primary font-bold text-sm">₦{listing.price.toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group relative bg-surface border border-surface-variant rounded-xl overflow-hidden shadow-soft active:scale-[0.98] transition-all duration-200 cursor-pointer hover:shadow-lg ${listing.flexPayAvailable ? 'hover:shadow-flexpay border-primary/10' : ''}`}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-xs font-bold">{listing.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
            {listing.flexPayAvailable && (
                <span className="bg-primary text-on-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-montserrat shadow-lg">
                    FlexPay Available
                </span>
            )}
            {listing.instantBooking && (
                <span className="bg-green-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-montserrat shadow-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">bolt</span> Instant
                </span>
            )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-montserrat font-semibold text-lg text-on-surface">{listing.name}</h4>
          <span className="font-inter font-bold text-primary">
            ₦{listing.price.toLocaleString()}
            <span className="text-secondary text-xs font-normal">/night</span>
          </span>
        </div>
        <p className="font-inter text-sm text-secondary">{listing.location}</p>
      </div>
    </div>
  );
};
