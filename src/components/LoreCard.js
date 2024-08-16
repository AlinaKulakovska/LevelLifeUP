import React, { useState } from 'react';

const LoreCard = ({ title, date, description, category}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle card expansion
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`p-4 rounded-md bg-[#393434]  mb-4 transition-all duration-300 ease-in-out ${
        isExpanded ? 'shadow-lg' : 'shadow-md'
      }`}
      onClick={handleToggle}
    >
      {/* Card Header (Always Visible) */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
      
      {/* XP and Category Info (Always Visible) */}
      <div className="text-sm text-gray-400 mt-2">
        <p>Category: {category}</p>
      </div>

      {/* Expanded Content (Shown when expanded) */}
      {isExpanded && (
        <div className="mt-4">
          <p className="text-sm text-white">{description}</p>
        </div>
      )}
    </div>
  );
};

export default LoreCard;
