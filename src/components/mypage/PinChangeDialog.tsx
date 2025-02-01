import React, { useState } from "react";
import { Shield, X } from "lucide-react";
interface PinChangeDialogProps {
  children: React.ReactNode;
}

const PinChangeDialog: React.FC<PinChangeDialogProps> = ({ children }) => {
  const [pin, setPin] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePinChange = () => {
    console.log("PIN change initiated");
    setIsOpen(false);
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)} 
        className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-3">
          <Shield size={18} className="text-green-500" />
          <span className="text-gray-700">보안 PIN 설정</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-900">PIN 변경</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <input 
                type="password" 
                placeholder="새 PIN 입력" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handlePinChange}
                className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                PIN 변경
              </button>
              <button
                onClick={() => setIsOpen(false)} 
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
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
