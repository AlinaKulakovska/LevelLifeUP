import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Health');
    const [xp, setXp] = useState('');
    const [date, setDate] = useState(''); // New state for date input
    const [isUrgent, setIsUrgent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && category && xp) {
            onAddTask({ title, description, category, xp: parseInt(xp), date, isUrgent });
            setTitle('');
            setDescription('');
            setCategory('Health');
            setXp('');
            setDate(''); // Reset date after submission
            setIsUrgent(false);
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
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full p-1 text-neutral-600 rounded-md bg-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 text-neutral-600 block w-full p-1 rounded-md bg-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="Health">Health</option>
                        <option value="Work">Work</option>
                        <option value="Hobbies">Hobbies</option>
                        <option value="Chores">Chores</option>
                        <option value="Social">Social</option>
                    </select>
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
                <div>
                    <input
                        type="checkbox"
                        checked={isUrgent}
                        onChange={(e) => setIsUrgent(e.target.checked)}
                        className="mt-1 p-1 text-neutral-600 bg-white border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                    /> Mark as Urgent
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
