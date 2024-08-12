import { FaChevronDown } from 'react-icons/fa';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import SidebarHeader from '../components/SidebarHeader';
import Sidebar from '../components/Sidebar';
import React, { useState, useEffect } from 'react';
import AuthPopup from '../components/AuthPopup';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

const Tasks = () => {
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [userlogined, setUserlogined] = useState(false);
  const openAuthPopup = () => setIsAuthPopupOpen(true);
  const closeAuthPopup = () => setIsAuthPopupOpen(false);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserlogined(true)
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
      {isAuthPopupOpen && <AuthPopup onClose={closeAuthPopup} />}
      <SidebarHeader
        userlogined={userlogined}
        signOutUser={signOutUser}
        openAuthPopup={openAuthPopup}
        toggleSidebar={toggleSidebar}
      />
      <div className='flex'>
        <Sidebar isOpen={isOpen} />
        <div className='flex flex-col mt-8'>
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
