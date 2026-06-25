import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';
import type { Booking } from '../types';

export const MerchantDashboard: React.FC = () => {
  const { bookings, listings, updateBookingStatus, role, activeMerchantId, setActiveMerchantId } = useAppContext();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ANALYTICS' | 'AUTHENTICATION' | 'LISTINGS' | 'SUPPORT'>('OVERVIEW');
  const [showAddListing, setShowAddListing] = useState(false);

  if (role !== 'MERCHANT') return <div className="p-6">Access Denied</div>;

  const merchantBookings = bookings.filter(b => {
    const listing = listings.find(l => l.id === b.listingId);
    return listing?.merchantId === activeMerchantId;
  });

  const pending = merchantBookings.filter(b => b.status === 'PENDING');
  const active = merchantBookings.filter(b => b.status !== 'PENDING' && b.status !== 'DECLINED');
  const revenue = active.reduce((acc, b) => acc + b.totalPrice, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
            <div>
            <h1 className="text-2xl font-bold font-montserrat">Merchant Dashboard</h1>
            <p className="text-xs text-gray-500 font-inter">{activeMerchantId === 'merchant-1' ? 'Azure Sanctuary' : 'Heritage Stays'} • 4.8★</p>
            </div>

            <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                <button
                    onClick={() => setActiveMerchantId('merchant-1')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeMerchantId === 'merchant-1' ? 'bg-white shadow-sm text-uba-red' : 'text-gray-400'}`}
                >
                    Azure
                </button>
                <button
                    onClick={() => setActiveMerchantId('merchant-2')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeMerchantId === 'merchant-2' ? 'bg-white shadow-sm text-uba-red' : 'text-gray-400'}`}
                >
                    Heritage
                </button>
            </div>
        </div>
        <div className="flex gap-2">
            <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Trust Score</p>
                <p className="text-sm font-bold text-green-600">98/100</p>
            </div>
            <div className="w-10 h-10 bg-uba-red/10 rounded-full flex items-center justify-center text-uba-red">
                <span className="material-symbols-outlined">analytics</span>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 mb-8">
        {(['OVERVIEW', 'ANALYTICS', 'AUTHENTICATION', 'LISTINGS', 'SUPPORT'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-xs font-bold transition-all relative ${activeTab === tab ? 'text-uba-red' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-uba-red" />}
          </button>
        ))}
      </div>

      {activeTab === 'OVERVIEW' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Pending Requests</p>
              <p className="text-3xl font-bold text-uba-red">{pending.length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₦{revenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Average Rating</p>
              <div className="flex items-center gap-1">
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <span className="material-symbols-outlined text-yellow-400">star</span>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-bold mb-4 font-montserrat">Active Requests</h2>
          {pending.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
               <p className="text-gray-400 text-sm">All requests processed. Sit back and relax!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pending.map(booking => {
                const listing = listings.find(l => l.id === booking.listingId);
                return (
                  <BookingRequestCard
                    key={booking.id}
                    booking={booking}
                    listing={listing}
                    onConfirm={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                    onDecline={() => updateBookingStatus(booking.id, 'DECLINED')}
                  />
                );
              })}
            </div>
          )}
          </section>
        </motion.div>
      )}

      {activeTab === 'ANALYTICS' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft">
                <h3 className="font-bold mb-6 font-montserrat">Revenue Stream (Last 7 Days)</h3>
                <div className="h-48 flex items-end justify-between gap-4">
                    {[0.2, 0.5, 0.3, 0.8, 0.4, 0.6, 1].map((factor, i) => {
                        const dayRevenue = revenue * factor * 0.3;
                        return (
                        <div key={i} className="flex-grow group relative">
                            <div style={{ height: `${Math.max(5, factor * 100)}%` }} className="bg-red-100 rounded-t-xl group-hover:bg-uba-red transition-all duration-300" />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 shadow-xl z-20 whitespace-nowrap">
                                ₦{Math.floor(dayRevenue).toLocaleString()}
                            </div>
                        </div>
                    )})}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-extrabold text-gray-400 font-inter">
                    <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
                    <h3 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-widest">Customer Demographics</h3>
                    <div className="space-y-4">
                        <DemoRow label="Lagos, NG" value="65%" width="w-[65%]" />
                        <DemoRow label="Abuja, NG" value="20%" width="w-[20%]" />
                        <DemoRow label="Port Harcourt" value="10%" width="w-[10%]" />
                        <DemoRow label="Others" value="5%" width="w-[5%]" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
                    <h3 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-widest">Top Performance</h3>
                    <div className="space-y-4">
                        {listings.filter(l => l.merchantId === activeMerchantId).slice(0, 3).map(listing => (
                            <p key={listing.id} className="text-xs font-bold flex justify-between">
                                <span className="truncate pr-4">{listing.name}</span>
                                <span className="text-uba-red whitespace-nowrap">₦{(listing.price * 8).toLocaleString()}</span>
                            </p>
                        ))}
                        {listings.filter(l => l.merchantId === activeMerchantId).length === 0 && (
                            <p className="text-xs text-gray-400 italic">No data yet</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
      )}

      {activeTab === 'AUTHENTICATION' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-soft max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-uba-red/10 text-uba-red rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                    </div>
                    <h2 className="text-2xl font-bold font-montserrat">Authenticate Booking</h2>
                    <p className="text-xs text-gray-500 mt-1">Enter the booking code provided by the customer to verify reservation.</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-center">Booking Reference Code</label>
                        <input
                            type="text"
                            placeholder="e.g. UBA-X1Y2Z3"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center text-xl font-mono font-bold outline-none focus:border-uba-red/30 transition-all uppercase"
                            id="auth-code-input"
                        />
                    </div>
                    <Button
                        className="w-full rounded-2xl py-4 shadow-lg shadow-uba-red/20"
                        onClick={() => {
                            const val = (document.getElementById('auth-code-input') as HTMLInputElement).value;
                            const b = bookings.find(x => x.bookingReference === val.toUpperCase());
                            if (b) {
                                const l = listings.find(lx => lx.id === b.listingId);
                                if (l?.merchantId === activeMerchantId) {
                                    alert(`Verification Successful!\n\nBooking: ${l.name}\nStatus: ${b.status}\nCustomer ID: ${b.customerId}`);
                                } else {
                                    alert('Unauthorized: This booking belongs to another merchant.');
                                }
                            } else {
                                alert('Invalid Code: No booking found with this reference.');
                            }
                        }}
                    >
                        Verify & Authenticate
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Today's Check-ins</p>
                        <p className="text-xl font-bold text-gray-900">12</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Verified Today</p>
                        <p className="text-xl font-bold text-green-600">8</p>
                    </div>
                </div>
            </div>
        </motion.div>
      )}

      {activeTab === 'LISTINGS' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-montserrat">Your Listings</h2>
                <Button onClick={() => setShowAddListing(true)} size="sm" className="rounded-xl">Add New Listing</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.filter(l => l.merchantId === 'merchant-1').map(listing => (
                    <div key={listing.id} className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden group">
                        <div className="relative h-40">
                            <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-uba-red">
                                {listing.category}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-gray-900 mb-1">{listing.name}</h3>
                            <p className="text-xs text-gray-500 mb-4">{listing.location}</p>
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-uba-red text-sm">₦{listing.price.toLocaleString()}</p>
                                <button className="text-[10px] font-bold text-gray-400 hover:text-uba-red uppercase tracking-widest">Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
      )}

      {showAddListing && <AddListingModal onClose={() => setShowAddListing(false)} />}

      {activeTab === 'SUPPORT' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-uba-red/5 p-8 rounded-3xl border border-uba-red/10">
                <h3 className="font-bold text-uba-red mb-2">Need help with your listings?</h3>
                <p className="text-sm text-gray-600 mb-6">Our dedicated merchant support team is available 24/7 to assist you.</p>
                <div className="flex gap-4">
                    <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg hover:bg-green-600 transition-colors">
                        <span className="material-symbols-outlined">chat</span> WhatsApp Support
                    </a>
                    <button className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-sm hover:bg-gray-50">
                        <span className="material-symbols-outlined">mail</span> Raise a Ticket
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
                <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    <FAQItem question="When do I get paid for a booking?" answer="Settlements are processed 24 hours after the customer checks in." />
                    <FAQItem question="How do I update my listing prices?" answer="Go to Listings > Edit > Pricing and Save." />
                    <FAQItem question="What is FlexPay Capacity?" answer="It's the amount of credit we offer your customers to pay for your services in installments." />
                </div>
            </div>
        </motion.div>
      )}
    </div>
  );
};

const DemoRow = ({ label, value, width }: { label: string, value: string, width: string }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-gray-600">
            <span>{label}</span>
            <span>{value}</span>
        </div>
        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
            <div className={`bg-uba-red h-full ${width}`} />
        </div>
    </div>
);

const BookingRequestCard = ({ booking, listing, onConfirm, onDecline }: { booking: Booking, listing: any, onConfirm: () => void, onDecline: () => void }) => {
    const { updateBookingStatus } = useAppContext();
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!booking.expiresAt) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(booking.expiresAt!).getTime();
            const diff = end - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft('00:00');
                setIsExpired(true);
                updateBookingStatus(booking.id, 'DECLINED'); // Auto-cancel
            } else {
                const mins = Math.floor(diff / 60000);
                const secs = Math.floor((diff % 60000) / 1000);
                setTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [booking.expiresAt, booking.id]);

    return (
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft relative overflow-hidden">
            {isExpired && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <p className="text-uba-red font-bold uppercase tracking-widest text-xs">Booking Cancelled (Expired)</p>
                </div>
            )}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-gray-900">{listing?.name}</h3>
                    <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase font-bold">RESERVATION REQUEST</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-uba-red mb-1">₦{booking.totalPrice.toLocaleString()}</p>
                    {booking.expiresAt && !isExpired && (
                        <div className="flex items-center justify-end gap-1 text-amber-600 font-mono text-[10px] font-bold">
                            <span className="material-symbols-outlined text-[12px]">timer</span>
                            {timeLeft}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    className="flex-grow rounded-xl"
                    size="sm"
                    onClick={onConfirm}
                    disabled={isExpired}
                >
                    Confirm
                </Button>
                <Button
                    className="flex-grow rounded-xl"
                    variant="outline"
                    size="sm"
                    onClick={onDecline}
                    disabled={isExpired}
                >
                    Decline
                </Button>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="border-b border-gray-50 pb-4">
        <p className="text-sm font-bold text-gray-900 mb-1">{question}</p>
        <p className="text-xs text-gray-500">{answer}</p>
    </div>
);

const AddListingModal = ({ onClose }: { onClose: () => void }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Hotels',
        location: '',
        price: '',
        description: '',
        image: ''
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);
    const handleSubmit = () => {
        alert('Listing submitted for admin approval!');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 overflow-hidden relative"
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="mb-10">
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`h-1 flex-grow rounded-full transition-colors ${step >= s ? 'bg-uba-red' : 'bg-gray-100'}`} />
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold font-montserrat">
                        {step === 1 && "Basic Information"}
                        {step === 2 && "Pricing & Location"}
                        {step === 3 && "Photos & Details"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Step {step} of 3</p>
                </div>

                <div className="space-y-6 min-h-[300px]">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Listing Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Luxury Beach Villa"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-uba-red/30 transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-uba-red/30 appearance-none"
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                >
                                    <option>Hotels</option>
                                    <option>Short-lets</option>
                                    <option>Tours</option>
                                    <option>Flights</option>
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Ikoyi, Lagos"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-uba-red/30 transition-all"
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price per Night (₦)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-uba-red/30 transition-all"
                                    value={formData.price}
                                    onChange={e => setFormData({...formData, price: e.target.value})}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about this place..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-uba-red/30 transition-all resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                            <div className="w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 group hover:border-uba-red/30 cursor-pointer transition-all">
                                <span className="material-symbols-outlined text-3xl mb-1">add_photo_alternate</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Upload Cover Photo</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="mt-10 flex gap-4">
                    {step > 1 && (
                        <Button variant="outline" className="flex-grow rounded-2xl" onClick={handleBack}>Back</Button>
                    )}
                    <Button
                        className="flex-grow rounded-2xl shadow-lg shadow-uba-red/20"
                        onClick={step === 3 ? handleSubmit : handleNext}
                    >
                        {step === 3 ? "Submit for Approval" : "Continue"}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
