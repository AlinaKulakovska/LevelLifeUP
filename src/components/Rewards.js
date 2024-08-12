import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Rewards = () => {
  const [rewards, setRewards] = useState([{ id: 1, title: 'Gift Card', points: 50 },
    { id: 2, title: 'Extra Day Off', points: 100}]);
  const [newReward, setNewReward] = useState({ title: '', points: '' });
  const [addRewardOpen, setAddRewardOpen] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReward({ ...newReward, [name]: value });
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    if (newReward.title && newReward.points) {
      setRewards([
        ...rewards,
        { id: rewards.length + 1, title: newReward.title, points: Number(newReward.points) },


// connect to firebase


      ]);
      setNewReward({ title: '', points: '' });
    }
  };

  const handlePurchase = (points) => {
    alert(`Purchased for ${points} points!`);


    // Implement point deduction logic here



  };

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-2xl font-bold mb-6">Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="shadow-md rounded-lg p-6 bg-[#393434]">
            <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
            <p className="mb-4">Points: {reward.points}</p>
            <button
              className="bg-amber-500 py-2 px-4 rounded hover:bg-amber-600"
              onClick={() => handlePurchase(reward.points)}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center"    onClick={() => setAddRewardOpen(!addRewardOpen)} >Add New Reward<FaChevronDown className='ml-4' /></h2>
        <div className={addRewardOpen ? 'block' : 'hidden'}>
          <form onSubmit={handleAddReward} className="bg-[#393434] shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="title">
                Reward Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newReward.title}
                onChange={handleInputChange}
                className="shadow appearance-none bg-neutral-800 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block  text-sm font-bold mb-2" htmlFor="points">
                Points Required
              </label>
              <input
                type="number"
                id="points"
                name="points"
                value={newReward.points}
                onChange={handleInputChange}
                className="shadow appearance-none border bg-neutral-800 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600"
            >
              Add Reward
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
