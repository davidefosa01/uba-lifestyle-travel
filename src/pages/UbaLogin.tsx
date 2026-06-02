import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const UbaLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [passcode, setPasscode] = useState('');

  const handleKeyPress = (num: string) => {
    if (passcode.length < 6) {
      setPasscode(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (passcode.length === 6) {
      const timer = setTimeout(() => {
        login();
        navigate('/dashboard');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [passcode, login, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7] p-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-12 pt-4">
        <h1 className="text-2xl font-semibold text-gray-800 font-inter tracking-tight">Enter Access Passcode</h1>
        <div className="w-10 h-10 flex items-center justify-center">
            {/* UBA Red Symbol Logo Placeholder */}
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20L80 20L50 80L20 20Z" fill="#D21F3C"/>
                <path d="M40 20L100 20L70 80L40 20Z" fill="#D21F3C" fillOpacity="0.8"/>
            </svg>
        </div>
      </div>

      {/* Center Icon */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-36 h-36 bg-[#f0f0f0] rounded-full flex items-center justify-center mb-10 relative">
            <div className="w-16 h-16 border-2 border-gray-800 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-gray-800">lock</span>
            </div>
            {/* Small sparkles or dots from the image */}
            <div className="absolute top-10 right-10 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-lg text-gray-600 font-inter text-center">Please enter Access Passcode to proceed</p>
      </div>

      {/* Passcode Dots */}
      <div className="flex justify-center space-x-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-full border border-gray-300 transition-all duration-200 ${
              passcode.length > i ? 'bg-gray-800 border-gray-800' : 'bg-white'
            }`}
          ></div>
        ))}
      </div>

      {/* Forgot Passcode */}
      <div className="text-center mb-10">
        <button className="text-uba-red font-bold text-base hover:underline font-montserrat">
          Forgot Access Passcode?
        </button>
      </div>

      {/* Number Pad */}
      <div className="mt-auto grid grid-cols-3 gap-y-6 gap-x-8 max-w-xs mx-auto mb-10">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
          <button
            key={num}
            onClick={() => handleKeyPress(num)}
            className="w-20 h-20 flex items-center justify-center text-3xl font-bold bg-white rounded-full shadow-sm active:bg-gray-100 transition-colors"
          >
            {num}
          </button>
        ))}
        <div className="w-20 h-20 flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                <span className="material-symbols-outlined text-3xl">fingerprint</span>
            </div>
        </div>
        <button
          onClick={() => handleKeyPress('0')}
          className="w-20 h-20 flex items-center justify-center text-3xl font-bold bg-white rounded-full shadow-sm active:bg-gray-100 transition-colors"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="w-20 h-20 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-4xl font-light">backspace</span>
        </button>
      </div>

      {/* Footer bar */}
      <div className="w-32 h-1 bg-black rounded-full mx-auto mb-2 opacity-20"></div>
    </div>
  );
};
