import React from "react";

interface StatusCardProps {
  title: string;
  subtitle: string;
  active?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  subtitle,
  active = true,
}) => (
  <div
    className={`rounded-3xl p-4 ${
      active
        ? "bg-[#FFB4A2] text-[#8B0000]" 
        : "bg-[#F0ECEC] text-[#5C5C5C]"
    }`}
  >
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm opacity-80">{subtitle}</p>
  </div>
);

export default StatusCard;
