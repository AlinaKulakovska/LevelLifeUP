import React from 'react';

const HabitCard = ({ habit, onComplete, onDelete }) => {

    return (
        <div
            className={`p-4 rounded-md shadow-md text-white mx-4 flex flex-col justify-between bg-[#393434]`}
        >
            <div>
                <h3 className="text-lg font-semibold">{habit.title}</h3>
                <p className="text-sm">{habit.description}</p>
                <p className="text-sm">XP: {habit.xp}</p>
            </div>
            <div>
                <button
                    onClick={() => onComplete(habit.id)}
                    className="text-white bg-amber-600 py-2 px-4 mt-3 rounded-md"
                >
                    Complete
                </button>
                <button
                    onClick={() => onDelete(habit.id)}
                    className="text-red-900 ml-2"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default HabitCard;
