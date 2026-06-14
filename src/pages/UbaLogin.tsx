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
    <div className="flex flex-col h-screen overflow-hidden bg-[#f7f7f7] p-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-2">
        <h1 className="text-xl font-bold text-gray-800 font-inter tracking-tight">Enter Access Passcode</h1>
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <img src="/uba-logo-only.png" alt="UBA Logo" className="w-full h-full object-contain scale-150" />
        </div>
      </div>

      {/* Center Icon */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 bg-[#f0f0f0] rounded-full flex items-center justify-center mb-6 relative">
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
      <div className="flex justify-center space-x-4 mb-6">
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
      <div className="text-center mb-6">
        <button className="text-uba-red font-bold text-base hover:underline font-montserrat">
          Forgot Access Passcode?
        </button>
      </div>

      {/* Number Pad */}
      <div className="mt-auto grid grid-cols-3 gap-y-4 gap-x-8 max-w-xs mx-auto mb-8">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
          <button
            key={num}
            onClick={() => handleKeyPress(num)}
            className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-white rounded-full shadow-sm active:bg-gray-100 transition-colors"
          >
            {num}
          </button>
        ))}
        <div className="w-16 h-16 flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                <span className="material-symbols-outlined text-2xl">fingerprint</span>
            </div>
        </div>
        <button
          onClick={() => handleKeyPress('0')}
          className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-white rounded-full shadow-sm active:bg-gray-100 transition-colors"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="w-16 h-16 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl font-light">backspace</span>
        </button>
      </div>

      {/* Footer bar */}
      <div className="w-32 h-1 bg-black rounded-full mx-auto mb-2 opacity-20"></div>
    </div>
  );
};
