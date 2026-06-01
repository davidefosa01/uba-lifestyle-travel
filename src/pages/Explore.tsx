import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ListingCard } from '../components/ListingCard';

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const { listings } = useAppContext();
  const [search, setSearch] = React.useState('');

  const filtered = listings.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-container-margin-mb py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-secondary">search</span>
        </div>
        <input
          autoFocus
          className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl font-inter text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-secondary shadow-sm"
          placeholder="Where to next?"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-8">
        {['All', 'Lagos', 'Abuja', 'Port Harcourt', 'Enugu'].map(city => (
          <button key={city} className="px-4 py-2 rounded-full bg-surface-container-high text-sm font-medium whitespace-nowrap">
            {city}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-secondary">No listings found for "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filtered.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClick={() => navigate(`/listing/${listing.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
