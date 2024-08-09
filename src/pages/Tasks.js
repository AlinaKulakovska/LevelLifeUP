import logo from '../images/Logo.png'
import { FaChevronDown } from 'react-icons/fa';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthPopup from '../components/AuthPopup';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth"; 

const Tasks = () => {
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const openAuthPopup = () => setIsAuthPopupOpen(true);
  const closeAuthPopup = () => setIsAuthPopupOpen(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Run', description: 'Run 5km in the morning', category: 'Health', points: "20" },
    { id: 2, title: 'Finish Project', description: 'Complete the frontend project', category: 'Work', points: "30" },
    { id: 3, title: 'Read a Book', description: 'Read 50 pages of a book', category: 'Hobbies', points: "10" },
    { id: 4, title: 'Meditation', description: '15 minutes of meditation', category: 'Self-care', points: 5 },
    { id: 5, title: 'Call a Friend', description: 'Catch up with a friend', category: 'Friends', points: 8 },
    // Add more tasks here...
  ]);
  const categories = ['Health', 'Work', 'Hobbies', 'Self-care', 'Friends'];
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [ishabitFormOpen, setIshabitFormOpen] = useState(false);

  const [habits, setHabits] = useState([
    { id: 1, title: 'Drink Water', description: 'Drink 8 glasses of water', xp: 5 },
    { id: 2, title: 'Daily Exercise', description: '30 minutes of exercise', xp: 10 },
    // Add more habits here
  ]);
  const handleHabitComplete = (habitId) => {
    // Update state or perform any action needed when habit is completed
    const habit = habits.find(habit => habit.id === habitId);
    console.log(`Habit completed: ${habit.title}, XP: ${habit.xp}`);
    // You could also update the user's XP here
  };
  const handleAddHabit = (newHabit) => {
    setHabits([...habits, { ...newHabit, id: habits.length + 1 }]);
  };

  const handleComplete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleTaskForm = () => {
    setIsTaskFormOpen(!isTaskFormOpen);
  };
  const togglehabitForm = () => {
    setIshabitFormOpen(!ishabitFormOpen);
  };
  return (
    <div className="flex flex-col kanit-regular bg-[#282424]">
      {/* Sidebar Header */}
      <div className="bg-orange-100 text-red-950 p-4 flex justify-between items-center">
        <div className='flex'><img className='h-10 mr-4 ' src={logo} alt='logo' />
          <h1 className="text-2xl font-bold kanit-regular hidden lg:flex">LevelLifeUP</h1></div>
        <div className='flex'>
          <div className='border-4 border-amber-500 text-[#FFEBDD] rounded-full mr-4 min-w-24 overflow-hidden'><div className='w-[70%] h-full bg-amber-500 text-red-950 text-center flex items-center'>HP</div></div>
          <div className='bg-red-950 text-[#FFEBDD] px-4 py-2 rounded-full min-w-24 text-center'>XP:12</div>
          {user? "" : <button
          onClick={openAuthPopup}
          className="text-neutral-700 px-2 py-1 mx-4 text-sm rounded hover:text-white"
        >
          Sign In
        </button>} 
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
        <div className='flex flex-col mt-8'>

        {isAuthPopupOpen && <AuthPopup onClose={closeAuthPopup} />}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 text-white kanit-regular">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-xl font-semibold mb-2 text-center">{category}</h2>
                <div className="space-y-4">
                  {tasks
                    .filter(task => task.category === category)
                    .map(task => (
                      <TaskCard key={task.id} task={task} onComplete={handleComplete} />
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 ml-6 text-white">Your Habits</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {habits.map(habit => (
                <TaskCard key={habit.id} task={habit} onComplete={handleHabitComplete} />
              ))}
            </div>
          </div>

          <div className='flex justify-between mx-4 my-8'>
            <div className='w-1/2'>  
              <h2 className='text-white text-2xl kanit-bold ml-6 flex items-center' onClick={togglehabitForm}>Add Habits <FaChevronDown className='ml-4' /></h2>
                {ishabitFormOpen && (
                <TaskForm onAddTask={handleAddHabit} />
              )}</div>
              <div className='w-1/2'>  <h2 className='text-white text-2xl kanit-bold ml-6 flex items-center' onClick={toggleTaskForm}>Add Tasks <FaChevronDown className='ml-4' /></h2>
                  {isTaskFormOpen && (
                  <TaskForm onAddTask={handleAddTask} />
                )}</div>
              </div>


            </div>
          </div>
        </div>
        );
};

        export default Tasks;
