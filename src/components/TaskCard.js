import React from 'react';

const TaskCard = ({ task, onComplete }) => {
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Health':
                return 'bg-green-500';
            case 'Work':
                return 'bg-blue-500';
            case 'Hobbies':
                return 'bg-purple-500';
            case 'Self-care':
                return 'bg-pink-500';
            case 'Friends':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className={`p-4 rounded-md shadow-md text-white ${getCategoryColor(task.category)} mx-4 flex flex-col justify-between `}>
           
            <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-sm">XP: {task.points}</p>
            </div>
            <div>
                <button
                    onClick={() => onComplete(task.id)}
                    className="bg-neutral-500 hover:bg-neutral-600 text-white py-2 px-4 mt-3 rounded-md"
                >
                    Complete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
