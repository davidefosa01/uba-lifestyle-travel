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
  const [showContract, setShowContract] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!booking || !listing) return <div>Booking not found</div>;

  const upfrontCommitment = booking.totalPrice * 0.3;
  const remainingPrincipal = booking.totalPrice * 0.7;
  const annualInterestRate = 0.18;
  const totalWithInterest = remainingPrincipal * (1 + (annualInterestRate * (flexPayTenor / 12)));
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
        <button onClick={() => navigate(-1)} className="material-symbols-outlined hover:bg-surface-container-low p-2 rounded-full transition-colors">arrow_back</button>
        <h1 className="text-xl font-bold font-montserrat">Secure Payment</h1>
      </div>

      <div className="bg-surface-container-low rounded-2xl p-4 mb-6 border border-surface-variant/50">
        <h2 className="text-[10px] font-extrabold text-secondary uppercase tracking-widest mb-3 font-inter">Booking Summary</h2>
        <div className="flex gap-4">
          <img src={listing.image} alt={listing.name} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
          <div>
            <h3 className="font-bold font-montserrat text-on-surface">{listing.name}</h3>
            <p className="text-[10px] text-secondary font-medium">{booking.bookingReference}</p>
            <p className="text-sm font-bold mt-1 text-primary">₦{booking.totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div
          onClick={() => setPaymentMethod('FULL')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'FULL' ? 'border-uba-red bg-white shadow-soft' : 'border-surface-variant bg-white'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined ${paymentMethod === 'FULL' ? 'text-uba-red' : 'text-secondary'}`}>account_balance_wallet</span>
              <div>
                <p className="font-bold font-montserrat">Pay in Full</p>
                <p className="text-xs text-secondary font-inter">Pay the total amount now</p>
              </div>
            </div>
            {paymentMethod === 'FULL' && <span className="material-symbols-outlined text-uba-red" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
          </div>
        </div>

        <div
          onClick={() => setPaymentMethod('FLEXPAY')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'FLEXPAY' ? 'border-uba-red bg-white shadow-flexpay' : 'border-surface-variant bg-white'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined ${paymentMethod === 'FLEXPAY' ? 'text-uba-red' : 'text-secondary'}`}>payments</span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold font-montserrat">FlexPay Installments</p>
                  <span className="bg-uba-red text-[8px] text-white px-1.5 py-0.5 rounded-full font-extrabold uppercase">Premium</span>
                </div>
                <p className="text-xs text-secondary font-inter">Spread payment over 3, 6, or 12 months</p>
              </div>
            </div>
            {paymentMethod === 'FLEXPAY' && <span className="material-symbols-outlined text-uba-red" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
          </div>

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'IDLE' && (
            <div className="mt-4 pt-4 border-t border-surface-variant/50">
              <Button onClick={(e) => { e.stopPropagation(); handleFlexPayCheck(); }} className="w-full">Check Eligibility</Button>
            </div>
          )}

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'PROCESSING' && (
            <div className="mt-4 pt-4 border-t border-surface-variant/50 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-uba-red border-t-transparent mb-2"></div>
              <p className="text-sm font-bold font-inter text-deep-slate">Evaluating your credit history...</p>
            </div>
          )}

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'APPROVED' && (
            <div className="mt-4 pt-4 border-t border-surface-variant/50 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
              <div className="bg-green-50 text-green-700 p-3 rounded-xl flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-sm font-bold font-inter">FlexPay Approved!</span>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-6">
                 <p className="text-[10px] font-extrabold text-blue-800 mb-1 tracking-widest font-inter uppercase">REQUIRED UPFRONT COMMITMENT (30%)</p>
                 <p className="text-xl font-bold text-blue-900 font-montserrat">₦{upfrontCommitment.toLocaleString()}</p>
                 <p className="text-[10px] text-blue-600 mt-1">This amount will be debited immediately upon plan activation.</p>
              </div>

              <p className="text-[10px] font-extrabold text-secondary mb-3 tracking-widest font-inter uppercase">SELECT REPAYMENT TENOR</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[3, 6, 12].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFlexPayTenor(t)}
                    className={`py-2 rounded-xl border text-sm font-bold transition-colors ${flexPayTenor === t ? 'border-uba-red bg-uba-red text-white' : 'border-surface-variant bg-white text-secondary'}`}
                  >
                    {t} Mo
                  </button>
                ))}
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant/30">
                <div className="flex justify-between text-xs mb-2 text-secondary font-medium font-inter">
                  <span>Balance to Finance</span>
                  <span>₦{remainingPrincipal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs mb-2 text-secondary font-medium font-inter">
                  <span>Monthly Interest</span>
                  <span>1.5%</span>
                </div>
                <div className="flex justify-between font-bold text-base font-montserrat">
                  <span className="text-deep-slate">Monthly Installment</span>
                  <span className="text-uba-red">₦{monthlyInstallment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <button
                onClick={() => setShowContract(true)}
                className="mt-4 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">description</span> View Digital Contract
              </button>
            </div>
          )}

          {paymentMethod === 'FLEXPAY' && flexPayStatus === 'DECLINED' && (
            <div className="mt-4 pt-4 border-t border-surface-variant/50" onClick={(e) => e.stopPropagation()}>
              <div className="bg-red-50 text-red-700 p-3 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                <span className="text-sm font-bold font-inter">Eligibility check failed. Please pay in full.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-4 left-0 right-0">
        <Button
          onClick={handlePayment}
          className="w-full shadow-lg"
          size="lg"
          variant="primary"
          disabled={paymentMethod === 'FLEXPAY' && (flexPayStatus !== 'APPROVED' || !agreedToTerms)}
        >
          {paymentMethod === 'FULL' ? `Pay ₦${booking.totalPrice.toLocaleString()}` : 'Confirm Installment Plan'}
        </Button>
      </div>

      {/* Contract Modal Overlay */}
      {showContract && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-end justify-center sm:items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto max-h-[85vh] animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-bold font-montserrat text-uba-red uppercase tracking-tight">FlexPay Digital Contract</h2>
              <button onClick={() => setShowContract(false)} className="material-symbols-outlined text-gray-400">close</button>
            </div>

            <div className="space-y-4 text-xs text-gray-700 leading-relaxed font-inter">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                 <p className="font-bold mb-2">PARTIES TO THE AGREEMENT</p>
                 <p>This Digital Installment Agreement is made between <span className="font-bold">United Bank for Africa (UBA)</span> and <span className="font-bold">David Enabulele</span> regarding the booking for <span className="font-bold">{listing.name}</span>.</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                 <p className="font-bold mb-2">LOAN DETAILS</p>
                 <div className="space-y-1">
                    <div className="flex justify-between"><span>Principal Amount:</span><span className="font-bold font-mono">₦{remainingPrincipal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Upfront Payment (30%):</span><span className="font-bold font-mono">₦{upfrontCommitment.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Tenor:</span><span className="font-bold font-mono">{flexPayTenor} Months</span></div>
                    <div className="flex justify-between"><span>Interest Rate:</span><span className="font-bold font-mono">18% APR</span></div>
                 </div>
              </div>

              <p className="font-bold">TERMS & CONDITIONS</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>The Borrower agrees to pay the lender the principal sum plus interest of 18% per annum in equal monthly installments.</li>
                <li>Monthly installments will be automatically debited from the Borrower's UBA account on the 28th of every month via <span className="font-bold">Auto-Debit</span>.</li>
                <li>Late payments will attract a <span className="font-bold">daily penalty charge</span> for every day the payment remains unpaid after the due date.</li>
                <li>Borrower has the right to pre-liquidate the loan without early termination penalties after 3 successful installments.</li>
              </ul>

              <div className="pt-6 border-t border-gray-100 mt-6 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-uba-red checked:border-uba-red transition-all"
                    />
                    <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-700 transition-colors">I hereby confirm that I have read, understood, and agreed to the terms and conditions of this installment agreement.</span>
                </label>
                <Button
                  className="w-full"
                  disabled={!agreedToTerms}
                  onClick={() => setShowContract(false)}
                >
                  Confirm & Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
