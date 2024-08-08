import userPhoto from '../images/user-avatar.jpg';
import badge1 from '../images/badge.png';
import RadarChart from '../components/RadarChart';
import Rewards from '../components/Rewards';
import logo from '../images/Logo.png'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="flex flex-col kanit-regular bg-[#282424]">
      {/* Sidebar Header */}
      <div className="bg-orange-100 text-red-950 p-4 flex justify-between items-center">
        <div className='flex'><img className='h-10 mr-4 ' src={logo} alt='logo' />
          <h1 className="text-2xl font-bold kanit-regular hidden lg:flex">LevelLifeUP</h1></div>
        <div className='flex'>
          <div className='border-4 border-amber-500 text-[#FFEBDD] rounded-full mr-4 min-w-24 overflow-hidden'><div className='w-[70%] h-full bg-amber-500 text-red-950 text-center flex items-center'>HP</div></div>
          <div className='bg-red-950 text-[#FFEBDD] px-4 py-2 rounded-full min-w-24 text-center'>XP:12/32</div>
        </div>
        <button
          className="block lg:hidden p-2 rounded-md hover:bg-white focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/* Sidebar Content */}
      <div className='flex'>
        <div
          className={`${isOpen ? 'block' : 'hidden'} sidebar lg:block  text-white w-full lg:w-64 h-auto lg:h-[100vh] space-y-6 px-2 py-4 lg:py-8 lg:px-6 transition-transform transform lg:translate-x-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative absolute top-16 left-0  lg:inset-0 z-20 lg:z-auto`}>
          <div className="space-y-4 flex flex-col">
            <Link to="/" className="block py-2.5 px-4 rounded transition border-b-2 border-stone-600 duration-200 hover:bg-red-950">Profile</Link>
            <Link to="/tasks" className="block py-2.5 px-4 rounded transition border-b-2 border-stone-600 duration-200 hover:bg-orange-800">Tasks</Link>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden text-white w-full">
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


        
      </div>
    </div>



  );
};

export default Profile;
