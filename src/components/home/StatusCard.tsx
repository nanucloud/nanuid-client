import React from "react";

interface StatusCardProps {
  title: string;
  subtitle: string;
  active?: boolean;
  onClick?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  subtitle,
  active = true,
  onClick,
}) => (
  <div
    className={`rounded-3xl p-4 transition-all ${
      active
        ? "bg-green-50 border-2 border-green-200 text-green-800"
        : "bg-red-50 border-2 border-red-200 text-red-800"
    } ${onClick ? "cursor-pointer hover:shadow-md" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-2 mb-2">
      <div
        className={`w-3 h-3 rounded-full ${
          active ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <p className="text-sm pl-5 opacity-90">{subtitle}</p>
  </div>
);

export default StatusCard;
