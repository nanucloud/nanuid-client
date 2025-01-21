import React, { useEffect, useState } from "react";

interface VirtualKeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

const VirtualKeypad: React.FC<VirtualKeypadProps> = ({
  onKeyPress,
  onDelete,
  onClear,
}) => {
  const [shuffledNumbers, setShuffledNumbers] = useState<string[]>([]);

  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];

  useEffect(() => {
    const shuffled = [...numbers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    setShuffledNumbers(shuffled);
  }, []); 

  const finalKeys = [...shuffledNumbers, "clear", "delete"];

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {finalKeys.map((num, index) => (
        <button
          key={num}
          onClick={() => {
            if (num === "delete") onDelete();
            else if (num === "clear") onClear();
            else onKeyPress(num);
          }}
          className="w-full h-12 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          {num === "delete" ? "←" : num === "clear" ? "C" : num}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeypad;
