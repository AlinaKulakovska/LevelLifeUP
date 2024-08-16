import React, { useState } from 'react';

const HabitForm = ({ onAddHabit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [xp, setXp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description && xp) {
            onAddHabit({ title, description, xp: parseInt(xp) }); // Include isUrgent in task data
            setTitle('');
            setDescription('');
            setXp('');
        }
    };


    return (
        <div className='kanit-regular'>

            <form onSubmit={handleSubmit} className="p-4 bg-[#393434] rounded-md text-white space-y-4 m-4">
                <div>
                    <label className="block text-sm font-medium">Task Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full p-1 text-neutral-600 rounded-md bg-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-1 text-neutral-600 rounded-md bg-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
               
                <div>
                    <label className="block text-sm font-medium">XP</label>
                    <input
                        type="number"
                        value={xp}
                        onChange={(e) => setXp(e.target.value)}
                        className="mt-1 block w-full p-1 text-neutral-600 rounded-md bg-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
               
                <button
                    type="submit"
                    className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md"
                >
                    Add Habit
                </button>
            </form></div>
    );
};

export default HabitForm;
