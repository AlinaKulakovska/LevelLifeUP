import { FaChevronDown } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

import TaskCard from '../components/TaskCard';
import HabitCard from '../components/HabitCard';
import TaskForm from '../components/TaskForm';
import HabitForm from '../components/HabitForm';
import SidebarHeader from '../components/SidebarHeader';
import Sidebar from '../components/Sidebar';
import AuthPopup from '../components/AuthPopup';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";

const generateTitle = (level) => {
  const titles = [
    'Novice Explorer',
    'Apprentice Adventurer',
    'Journeyman Wanderer',
    'Master Navigator',
    'Epic Conqueror',
    'Legendary Hero'
  ];

  return titles[level % titles.length] || 'Ultimate Champion';
};


const Tasks = () => {
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [userlogined, setUserlogined] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const categories = ['Health', 'Work', 'Hobbies', 'Self-care', 'Friends'];
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [ishabitFormOpen, setIshabitFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    const fetchUserData = async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserInfo(userData);
          setTasks(userData.tasks || []);
          setHabits(userData.habits || []);
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('User is not signed in');
        setUserInfo(null);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserlogined(user);
      fetchUserData(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async (newTask) => {
    const taskId = Date.now(); // Use current timestamp as the unique task ID
    const updatedTasks = [...tasks, { ...newTask, id: taskId }];
    setTasks(updatedTasks);
  
    if (userlogined) {
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          tasks: arrayUnion({ ...newTask, id: taskId }),
        });
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const handleComplete = async (taskId) => {
    const completedTask = tasks.find(task => task.id === taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);

    if (userlogined && completedTask) {
      const updatedPoints = (userInfo.points || 0) + Number(completedTask.xp);
      const categories = ['Health', 'Work', 'Hobbies', 'Self-care', 'Friends'];
      const categoryIndex = categories.indexOf(completedTask.category);

      let updatedStats = [...(userInfo.statistics || [0, 0, 0, 0, 0])];
      if (categoryIndex !== -1) {
        updatedStats[categoryIndex] += 1;
      }
      let updatedTasksCompleted = (userInfo.tasksCompleted || 0) + 1;
      let newLevel = userInfo.level || 1;
      let newTitle = userInfo.title || "Beginner";

      if (updatedTasksCompleted % 10 === 0) {
        newLevel += 1;
        newTitle = generateTitle(newLevel);
      }
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          tasks: arrayRemove(completedTask),
          points: updatedPoints,
          tasksCompleted: (userInfo.tasksCompleted || 0) + 1,
          statistics: updatedStats,
          level: newLevel,
          title: newTitle,
        });

        setUserInfo((prev) => ({
          ...prev,
          points: updatedPoints,
          tasksCompleted: (userInfo.tasksCompleted || 0) + 1,
          statistics: updatedStats,
          level: newLevel,
          title: newTitle,
        }));
      } catch (error) {
        console.error("Error completing task: ", error);
      }
    }

  };


  const handleAddHabit = async (newHabit) => {
    const habbitid = Date.now(); // Use current timestamp as the unique task ID
    const updatedHabits = [...habits, { ...newHabit, id: habbitid}];
    setHabits(updatedHabits);

    if (userlogined) {
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          habits: arrayUnion({ ...newHabit, id: habbitid}),
        });
      } catch (error) {
        console.error("Error adding habit: ", error);
      }
    }
  };

  const handleHabitComplete = async (habitId) => {
    const completedHabit = habits.find(habit => habit.id === habitId);
    if (userlogined && completedHabit) {
      const updatedPoints = (userInfo.points || 0) + Number(completedHabit.xp);
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          points: updatedPoints,
        });
        setUserInfo((prev) => ({ ...prev, points: updatedPoints }));
        alert(`Habit completed: ${completedHabit.title}, XP: ${completedHabit.xp}`);
      } catch (error) {
        console.error("Error completing habit: ", error);
      }
    }
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

  const handleDeleteTask = async (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);

    if (userlogined && taskToDelete) {
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          tasks: arrayRemove(taskToDelete),
        });
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };

  const handleDeleteHabit = async (habitId) => {
    const habitToDelete = habits.find(habit => habit.id === habitId);
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    setHabits(updatedHabits);

    if (userlogined && habitToDelete) {
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          habits: arrayRemove(habitToDelete),
        });
      } catch (error) {
        console.error("Error deleting habit: ", error);
      }
    }
  };

  const sortedTasks = tasks.sort((a, b) => b.isUrgent - a.isUrgent); // Sort by urgency

  return (
    <div className="flex flex-col kanit-regular bg-[#282424]">
      {isAuthPopupOpen && <AuthPopup onClose={closeAuthPopup} />}
      <SidebarHeader
        userlogined={userlogined}
        signOutUser={signOutUser}
        openAuthPopup={openAuthPopup}
        toggleSidebar={toggleSidebar}
        points={userInfo ? userInfo.points : ""}
      />
      <div className='flex'>
        <Sidebar isOpen={isOpen} />
        <div className='flex flex-col w-full mt-8'>
          <div className="grid grid-cols-1 w-full  sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 text-white kanit-regular">
            {categories.map((category) => (
              <div key={category} className='w-full'>
                <h2 className="text-xl font-semibold mb-2 text-center">{category}</h2>
                <div className="space-y-4">
                  {sortedTasks
                    .filter(task => task.category === category)
                    .map(task => (
                      <TaskCard key={task.id} task={task} onComplete={handleComplete} onDelete={handleDeleteTask} />
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 ml-6 text-white">Your Habits</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {habits.map(habit => (
                <HabitCard key={habit.id} habit={habit} onComplete={handleHabitComplete} onDelete={handleDeleteHabit} />
              ))}
            </div>
          </div>

          <div className='flex justify-between flex-col md:flex-row mx-1 md:mx-4 my-8 '>
            <div className='w-full md:w-1/2'>
              <h2 className='text-white text-2xl kanit-bold ml-6 flex items-center' onClick={togglehabitForm}>Add Habits <FaChevronDown className='ml-4' /></h2>
              {ishabitFormOpen && (
                <HabitForm onAddHabit={handleAddHabit} />
              )}</div>
            <div className='w-full md:w-1/2'>  <h2 className='text-white text-2xl kanit-bold ml-6 flex items-center' onClick={toggleTaskForm}>Add Quest <FaChevronDown className='ml-4' /></h2>
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
