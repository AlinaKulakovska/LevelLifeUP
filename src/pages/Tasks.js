import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.png'
import TaskCard from '../components/TaskCard';
const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Run', description: 'Run 5km in the morning', category: 'Health', points:"20" },
    { id: 2, title: 'Finish Project', description: 'Complete the frontend project', category: 'Work' ,points:"30"},
    { id: 3, title: 'Read a Book', description: 'Read 50 pages of a book', category: 'Hobbies', points:"10"},
    // Add more tasks here...
  ]);

  const handleComplete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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


        <div className="p-6 lg:p-10 text-white">
          <h2 className="text-2xl font-bold mb-6">Tasks</h2>
          <div className="flex flex-wrap">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} onComplete={handleComplete} />
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Tasks;
