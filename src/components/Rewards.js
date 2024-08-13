import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this points to your Firebase configuration

const Rewards = ({ userId }) => {
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({ title: '', points: '' });
  const [addRewardOpen, setAddRewardOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    // Fetch rewards and user points from Firestore
    const fetchUserRewards = async () => {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setRewards(userData.rewards || []);
        setUserPoints(userData.points || 0);
      }
    };

    fetchUserRewards();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReward({ ...newReward, [name]: value });
  };

  const handleAddReward = async (e) => {
    e.preventDefault();
    if (newReward.title && newReward.points) {
      const updatedRewards = [
        ...rewards,
        { id: rewards.length + 1, title: newReward.title, points: Number(newReward.points) },
      ];
      setRewards(updatedRewards);

      // Update Firestore with the new rewards
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { rewards: updatedRewards });

      setNewReward({ title: '', points: '' });
    }
  };

  const handlePurchase = async (points, rewardId) => {
    if (userPoints >= points) {
      const remainingRewards = rewards.filter((reward) => reward.id !== rewardId);
      const updatedPoints = userPoints - points;

      setRewards(remainingRewards);
      setUserPoints(updatedPoints);

      // Update Firestore with the new rewards and points
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        rewards: remainingRewards,
        points: updatedPoints,
      });

      alert(`Purchased for ${points} points!`);
    } else {
      alert('Not enough points to purchase this reward.');
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-2xl font-bold mb-6">Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const isAffordable = userPoints >= reward.points;
          return (
            <div 
              key={reward.id} 
              className="shadow-md rounded-lg p-6 bg-[#393434]"
            >
              <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
              <p className="mb-4">Points: {reward.points}</p>
              <button
                className={`py-2 px-4 rounded ${isAffordable ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-500 cursor-not-allowed'}`}
                onClick={() => isAffordable && handlePurchase(reward.points, reward.id)}
                disabled={!isAffordable}
              >
                {isAffordable ? 'Purchase' : 'Not enough points'}
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center" onClick={() => setAddRewardOpen(!addRewardOpen)}>
          Add New Reward
          <FaChevronDown className="ml-4" />
        </h2>
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
              <label className="block text-sm font-bold mb-2" htmlFor="points">
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
