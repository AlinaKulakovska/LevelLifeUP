import React from 'react';
import userPhoto from '../images/user-avatar.jpg'; 
import badge1 from '../images/badge.png'; 

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    level: 5,
    points: 120,
    tasksCompleted: 45,
    achievements: ['First Task Completed', 'Level 5 Achieved'],
    badges: [badge1], // Add paths to badge images
  };

  return (
      <div className="rounded-lg overflow-hidden">
        <div className="flex items-center p-6 bg-neutral-950 text-white">
          <img
            className="w-20 h-20 rounded-full mr-4"
            src={userPhoto}
            alt="User"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-neutral-700 p-4 rounded-lg">
              <h3 className="font-bold">Level</h3>
              <p>{user.level}</p>
            </div>
            <div className="bg-neutral-700 p-4 rounded-lg">
              <h3 className="font-bold">Points</h3>
              <p>{user.points}</p>
            </div>
            <div className="bg-neutral-700 p-4 rounded-lg">
              <h3 className="font-bold">Tasks Completed</h3>
              <p>{user.tasksCompleted}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4">Achievements</h2>
          <ul className="list-disc list-inside  p-4 rounded-lg">
            {user.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-4">Badges</h2>
          <div className="flex space-x-4">
            {user.badges.map((badge, index) => (
              <img key={index} className="w-12 h-12" src={badge} alt={`Badge ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>

  );
};

export default Profile;
