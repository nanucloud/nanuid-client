import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const PinChangeDialog: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handlePinChange = () => {
    // PIN change logic
    console.log('PIN change initiated');
    setIsOpen(false); // Close modal after submission
  };

  return (
    <div>
      {/* Trigger button */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <Shield size={18} className="mr-2" />
        PIN 변경
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">PIN 변경</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="새 PIN" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <button 
                onClick={handlePinChange}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                PIN 변경
              </button>
              <button
                onClick={() => setIsOpen(false)} 
                className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinChangeDialog;
