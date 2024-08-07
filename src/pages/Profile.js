import React from 'react';
import userPhoto from '../images/user-avatar.jpg';
import badge1 from '../images/badge.png';
import RadarChart from '../components/RadarChart';
import Rewards from '../components/Rewards';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'Newbie',
    level: 5,
    points: 120,
    tasksCompleted: 45,
    achievements: ['First Task Completed', 'Level 5 Achieved'],
    badges: [badge1, badge1], // Add paths to badge images
    statistics: [60, 70, 80, 50, 40], // Hobbies, Friends, Work, Self-care, Love
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="flex items-center p-6 bg-neutral-950 text-white pattern">
        <img
          className="w-20 h-20 rounded-full mr-4"
          src={userPhoto}
          alt="User"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className='text-neutral-200'>{user.email}</p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#393434] p-4 rounded-lg">
            <h3 className="font-bold">Level</h3>
            <p>{user.level}</p>
          </div>
          <div className="bg-[#393434] p-4 rounded-lg">
            <h3 className="font-bold">Level</h3>
            <p>{user.level}</p>
          </div>
          <div className="bg-[#393434] p-4 rounded-lg">
            <h3 className="font-bold">Points</h3>
            <p>{user.points}</p>
          </div>
          <div className="bg-[#393434] p-4 rounded-lg">
            <h3 className="font-bold">Tasks Completed</h3>
            <p>{user.tasksCompleted}</p>
          </div>
        </div>
        <div className='flex flex-wrap'>
            <RadarChart userData={user.statistics} />
         
          <div>
            <div>
              <h2 className="text-xl font-bold mt-6 mb-4">Achievements</h2>
              <ul className="list-disc list-inside  p-4 rounded-lg">
                {user.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mt-6 mb-4">Badges</h2>
              <div className="flex space-x-4">
                {user.badges.map((badge, index) => (
                  <div className='flex flex-col items-center'>
                    <img key={index} className="w-12 h-12 " src={badge} alt={`Badge ${index + 1}`} />
                    <p className='text-center font-thin'>badge name</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Rewards />
        </div>
      </div>
    </div>

  );
};

export default Profile;
