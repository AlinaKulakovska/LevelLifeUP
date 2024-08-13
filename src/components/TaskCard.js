import React from 'react';

const TaskCard = ({ task, onComplete, onDelete }) => {
  return (
    <div
      className={`p-4 rounded-md shadow-md text-white mx-4 flex flex-col justify-between bg-[#393434] ${
        task.isUrgent ? 'border-4 border-amber-600' : ''
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm">{task.description}</p>
        <p className="text-sm">XP: {task.xp}</p>
      </div>
      <div>
        <button
          onClick={() => onComplete(task.id)}
          className="text-white bg-amber-600 py-2 px-4 mt-3 rounded-md"
        >
          Complete
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-900 ml-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
