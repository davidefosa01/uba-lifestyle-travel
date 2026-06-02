import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const BookingSubmitted: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-container-margin-mb py-12 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <span className="material-symbols-outlined text-5xl text-blue-600">hourglass_empty</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Availability Requested</h1>
      <p className="text-secondary mb-8">
        We've sent your request to the merchant. You'll receive a notification once they confirm availability.
      </p>
      <div className="w-full max-w-xs space-y-4">
        <Button onClick={() => navigate('/bookings')} className="w-full">View My Bookings</Button>
        <Button onClick={() => navigate('/')} variant="outline" className="w-full">Back to Home</Button>
      </div>
    </div>
  );
};
