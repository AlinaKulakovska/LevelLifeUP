// SidebarHeader.js
import React from 'react';
import logo from '../images/Logo.png';

const SidebarHeader = ({ userlogined, signOutUser, openAuthPopup, toggleSidebar }) => {
  return (
    <div className="bg-orange-100 text-red-950 p-4 flex justify-between items-center">
      <div className='flex'>
        <img className='h-10 mr-4' src={logo} alt='logo' />
        <h1 className="text-2xl font-bold kanit-regular hidden lg:flex">LevelLifeUP</h1>
      </div>
      <div className='flex'>
        <div className='border-4 border-amber-500 text-[#FFEBDD] rounded-full mr-4 min-w-12 md:min-w-24 overflow-hidden'>
          <div className='w-[70%] h-full bg-amber-500 text-red-950 text-center flex items-center'>HP</div>
        </div>
        <div className='bg-red-950 text-[#FFEBDD] px-4 py-2 rounded-full min-w-12 md:min-w-24 text-center'>XP:12</div>
        {userlogined ? (
          <button
            onClick={signOutUser}
            className="sign-out-button text-neutral-700 px-4 py-2 rounded">
            Sign Out
          </button>
        ) : (
          <button
            onClick={openAuthPopup}
            className="text-neutral-700 px-2 py-1 mx-4 text-sm rounded hover:text-white"
          >
            Sign In
          </button>
        )}
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
  );
};

export default SidebarHeader;
