import React, { useState } from 'react';

const LoreForm = ({ onAddLore }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Health');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date && description) {
      onAddLore({
        title,
        date,
        description,
        category,
      });
      // Clear the form
      setTitle('');
      setDate('');
      setDescription('');
      setCategory('Health');
    }
  };

  return (
    <div className="p-4 bg-[#282424] rounded-md shadow-md mb-4">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full text-left bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md"
      >
        {isFormVisible ? 'Hide Form' : 'Add New Achievement'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4 bg-[#282424] space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 bg-[#282424] border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 bg-[#282424] border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 bg-[#282424] border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-2 bg-[#282424] border border-gray-300 rounded-md"
            >
              <option value="Health">Health</option>
              <option value="Work">Work</option>
              <option value="Hobbies">Hobbies</option>
              <option value="Self-care">Self-care</option>
              <option value="Friends">Friends</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md"
          >
            Add Achievement
          </button>
        </form>
      )}
    </div>
  );
};

export default LoreForm;
