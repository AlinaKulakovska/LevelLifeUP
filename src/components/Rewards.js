import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this points to your Firebase configuration

const Rewards = ({ userId }) => {
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({ title: '', points: '', moneyCost: ''});
  const [addRewardOpen, setAddRewardOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [userBudget, setUserBudget] = useState(0);
  const [usermaxBudget, setUsermaxBudget] = useState(0);
  

  useEffect(() => {
    // Fetch rewards and user points from Firestore
    const fetchUserRewards = async () => {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setRewards(userData.rewards || []);
        setUserPoints(userData.points || 0);
        setUserBudget(userData.budgetLeft || 0);
        setUsermaxBudget(userData.maxFunBudget || 0)
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
        { id: rewards.length + 1, title: newReward.title, points: Number(newReward.points), moneyCost: Number(newReward.moneyCost) },
      ];
      setRewards(updatedRewards);

      // Update Firestore with the new rewards
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { rewards: updatedRewards });

      setNewReward({ title: '', points: '', moneyCost: ''});
    }
  };

  const handlePurchase = async (points, rewardId, moneyCost) => {
    if (userPoints >= points && userBudget >= moneyCost) {
      const remainingRewards = rewards.filter((reward) => reward.id !== rewardId);
      const updatedPoints = userPoints - points;
      const updatedBudget = userBudget - moneyCost;

      setRewards(remainingRewards);
      setUserPoints(updatedPoints);
      setUserBudget(updatedBudget)
      // Update Firestore with the new rewards and points
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        rewards: remainingRewards,
        points: updatedPoints,
        budgetLeft: updatedBudget,
        funBudget: usermaxBudget - updatedBudget,
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
          const isAffordableXP = userPoints >= reward.points;
          const isAffordableMoney = userBudget >= reward.moneyCost;
          return (
            <div
              key={reward.id}
              className="shadow-md rounded-lg p-6 bg-[#393434]"
            >
              <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
              <p className="mb-2">Points Required: {reward.points}</p>
              <p className="mb-2">Money Required: {reward.moneyCost}</p>
              <button
                className={`py-2 px-4 rounded ${isAffordableXP &&  isAffordableMoney ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-500 cursor-not-allowed'}`}
                onClick={() => isAffordableXP && isAffordableMoney && handlePurchase(reward.points, reward.id, reward.moneyCost)}
                disabled={!isAffordableXP && !isAffordableMoney}
              >
                {isAffordableXP ? '' : 'Not enough points'}
                {isAffordableMoney ? '' : 'Not enough Money'}
                {isAffordableMoney && isAffordableXP ? 'Purchase' : ''}
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
                required
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
                required
                className="shadow appearance-none border bg-neutral-800 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="moneyCost">
                Money Cost
              </label>
              <input
                type="number"
                id="moneyCost"
                name="moneyCost"
                value={newReward.moneyCost}
                onChange={handleInputChange}
                required
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
