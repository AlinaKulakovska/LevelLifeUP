// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} sidebar lg:block text-white w-full lg:w-64 h-auto lg:h-[100vh] space-y-6 px-2 py-4 lg:py-8 lg:px-6 transition-transform transform lg:translate-x-0 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative absolute top-16 left-0 lg:inset-0 z-20 lg:z-auto`}>
      <div className="space-y-4 flex flex-col">
        <Link to="/" className="block py-2.5 px-4 rounded transition border-b-2 border-stone-600 duration-200 hover:bg-red-950">Profile</Link>
        <Link to="/tasks" className="block py-2.5 px-4 rounded transition border-b-2 border-stone-600 duration-200 hover:bg-orange-800">Quests</Link>
        <Link to="/lore" className="block py-2.5 px-4 rounded transition border-b-2 border-stone-600 duration-200 hover:bg-amber-600">Lore</Link>
        <Link to="/bingo" className="block py-2.5 px-4 rounded transition border-b-2 border-stone-600 duration-200 hover:bg-amber-400">Bingo</Link>
      </div>
    </div>
  );
};

export default Sidebar;
