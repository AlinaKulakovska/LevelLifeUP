import React, { useState } from 'react';

const FutureGoal = ({ goal, onComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle card expansion
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`border p-4 rounded-md bg-orange-100 text-black mb-4 transition-all duration-300 ease-in-out ${
        isExpanded ? 'shadow-lg' : 'shadow-md'
      }`}
      onClick={handleToggle}
    >
      {/* Card Header (Always Visible) */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{goal.title}</h3>
        <span className="text-sm text-gray-600">{goal.date}</span>
      </div>

      {/* XP and Category Info (Always Visible) */}
      <div className="text-sm text-gray-600 mt-2">
        <p>Category: {goal.category}</p>
      </div>

      {/* Expanded Content (Shown when expanded) */}
      {isExpanded && (
        <div className="mt-4">
          <p className="text-sm text-gray-800">{goal.description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card expansion
              onComplete(goal.id);
            }}
            className="mt-2 bg-amber-600 hover:bg-amber-700 text-white py-1 px-3 rounded-md"
          >
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default FutureGoal;
