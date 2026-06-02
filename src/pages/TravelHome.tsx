import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ListingCard } from '../components/ListingCard';

export const TravelHome: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, listings } = useAppContext();

  const categories = [
    { name: 'Hotels', icon: 'hotel' },
    { name: 'Short-lets', icon: 'apartment' },
    { name: 'Tours', icon: 'explore' },
    { name: 'Sites', icon: 'temple_buddhist' },
    { name: 'Venues', icon: 'theater_comedy' },
    { name: 'Organisers', icon: 'groups' },
  ];

  const featured = listings.slice(0, 3);

  return (
    <div className="pb-24">
      {/* Welcome Banner */}
      <section className="mb-8 px-container-margin-mb mt-6">
        <h1 className="text-2xl font-semibold text-on-background mb-1">Discover your next escape,</h1>
        <h2 className="text-5xl font-bold text-primary leading-tight font-montserrat">{currentUser?.name}</h2>
      </section>

      {/* Search Bar */}
      <div className="relative mb-8 px-container-margin-mb">
        <div className="absolute inset-y-0 left-9 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-secondary">search</span>
        </div>
        <input
          className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl font-inter text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-secondary shadow-sm"
          placeholder="Where to next?"
          type="text"
          onFocus={() => navigate('/explore')}
        />
      </div>

      {/* Categories */}
      <section className="mb-12 overflow-x-auto hide-scrollbar flex gap-4 px-container-margin-mb">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center gap-2 group cursor-pointer min-w-[72px]"
            onClick={() => navigate(`/explore?category=${cat.name}`)}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform active:scale-95 bg-surface-container-high text-secondary hover:bg-primary/10 hover:text-primary`}>
              <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
            </div>
            <span className={`text-xs font-medium text-secondary`}>{cat.name}</span>
          </div>
        ))}
      </section>

      {/* Featured Listings */}
      <section className="mb-12 px-container-margin-mb">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-on-background">Featured Experiences</h3>
          <button className="text-primary text-sm font-bold" onClick={() => navigate('/explore')}>See all</button>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <ListingCard
            listing={featured[0]}
            onClick={() => navigate(`/listing/${featured[0].id}`)}
          />
          <div className="grid grid-cols-2 gap-4">
            {featured.slice(1).map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                variant="small"
                onClick={() => navigate(`/listing/${listing.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FlexPay Promo */}
      <section className="mb-12 px-container-margin-mb">
        <div className="relative bg-gradient-to-r from-[#D71920] to-[#AE0011] rounded-2xl p-6 overflow-hidden shadow-xl shadow-primary/30">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <span className="text-[10px] text-white uppercase tracking-widest font-extrabold">Financial Freedom</span>
            </div>
            <h3 className="text-2xl font-bold text-white leading-tight">Travel now, pay later with FlexPay</h3>
            <p className="text-sm text-white/90">Spread your travel costs into manageable monthly installments with UBA's secure credit facility.</p>
            <button className="bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-transform" onClick={() => navigate('/explore')}>
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
