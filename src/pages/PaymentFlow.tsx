import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

export const PaymentFlow: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, listings, updateBookingStatus, currentUser } = useAppContext();
  const booking = bookings.find(b => b.id === id);
  const listing = listings.find(l => l.id === booking?.listingId);

  const [paymentMethod, setPaymentMethod] = useState<'FULL' | 'FLEXPAY'>('FULL');
  const [flexPayTenor, setFlexPayTenor] = useState<number>(3);
  const [flexPayStatus, setFlexPayStatus] = useState<'IDLE' | 'PROCESSING' | 'APPROVED' | 'DECLINED'>('IDLE');

  if (!booking || !listing) return <div>Booking not found</div>;

  const interestRate = 0.18;
  const totalWithInterest = booking.totalPrice * (1 + interestRate);
  const monthlyInstallment = totalWithInterest / flexPayTenor;

  const handleFlexPayCheck = () => {
    setFlexPayStatus('PROCESSING');
    setTimeout(() => {
      // Simulate approval logic
      setFlexPayStatus(currentUser?.flexPayEligible ? 'APPROVED' : 'DECLINED');
    }, 2000);
  };

  const handlePayment = () => {
    updateBookingStatus(booking.id, 'PAID');
    navigate('/bookings');
  };

  return (
    <div className="px-container-margin-mb py-6 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined">arrow_back</button>
        <h1 className="text-xl font-bold">Secure Payment</h1>
      </div>

      <div className="bg-surface-container-low rounded-2xl p-4 mb-6">
        <h2 className="text-sm font-bold text-secondary uppercase mb-3">Booking Summary</h2>
        <div className="flex gap-4">
          <img src={listing.image} alt={listing.name} className="w-20 h-20 rounded-xl object-cover" />
          <div>
            <h3 className="font-bold">{listing.name}</h3>
            <p className="text-xs text-secondary">{booking.bookingReference}</p>
            <p className="text-sm font-bold mt-1">₦{booking.totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div
          onClick={() => setPaymentMethod('FULL')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'FULL' ? 'border-uba-red bg-red-50/50' : 'border-surface-variant bg-white'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-uba-red">account_balance_wallet</span>
              <div>
                <p className="font-bold">Pay in Full</p>
                <p className="text-xs text-secondary">Pay the total amount now</p>
              </div>
            </div>
            {paymentMethod === 'FULL' && <span className="material-symbols-outlined text-uba-red">check_circle</span>}
          </div>
        </div>

        <div
          onClick={() => setPaymentMethod('FLEXPAY')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'FLEXPAY' ? 'border-uba-red bg-red-50/50' : 'border-surface-variant bg-white'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-uba-red">payments</span>
              <div>
                <p className="font-bold">FlexPay Installments</p>
                <p className="text-xs text-secondary">Spread payment over months</p>
              </div>
            </div>
            {paymentMethod === 'FLEXPAY' && <span className="material-symbols-outlined text-uba-red">check_circle</span>}
          </div>

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'IDLE' && (
            <div className="mt-4 pt-4 border-t border-red-100">
              <Button onClick={handleFlexPayCheck} className="w-full">Check Eligibility</Button>
            </div>
          )}

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'PROCESSING' && (
            <div className="mt-4 pt-4 border-t border-red-100 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-uba-red border-t-transparent mb-2"></div>
              <p className="text-sm font-bold">Evaluating your credit history...</p>
            </div>
          )}

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'APPROVED' && (
            <div className="mt-4 pt-4 border-t border-red-100 animate-fadeIn">
              <div className="bg-green-50 text-green-700 p-3 rounded-xl flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined">verified</span>
                <span className="text-sm font-bold">FlexPay Approved!</span>
              </div>

              <p className="text-xs font-bold text-secondary mb-3">SELECT TENOR</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[3, 6, 12].map(t => (
                  <button
                    key={t}
                    onClick={() => setFlexPayTenor(t)}
                    className={`py-2 rounded-xl border text-sm font-bold ${flexPayTenor === t ? 'border-uba-red bg-uba-red text-white' : 'border-surface-variant bg-white'}`}
                  >
                    {t} Months
                  </button>
                ))}
              </div>

              <div className="bg-surface p-3 rounded-xl">
                <div className="flex justify-between text-xs mb-1">
                  <span>Interest Rate</span>
                  <span>18% p.a.</span>
                </div>
                <div className="flex justify-between font-bold text-sm">
                  <span>Monthly Installment</span>
                  <span className="text-uba-red">₦{monthlyInstallment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'DECLINED' && (
            <div className="mt-4 pt-4 border-t border-red-100">
              <div className="bg-red-50 text-red-700 p-3 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                <span className="text-sm font-bold">Eligibility check failed. Please pay in full.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-4 left-0 right-0">
        <Button
          onClick={handlePayment}
          className="w-full shadow-2xl"
          size="lg"
          disabled={paymentMethod === 'FLEXPAY' && flexPayStatus !== 'APPROVED'}
        >
          {paymentMethod === 'FULL' ? `Pay ₦${booking.totalPrice.toLocaleString()}` : 'Confirm FlexPay Schedule'}
        </Button>
      </div>
    </div>
  );
};
