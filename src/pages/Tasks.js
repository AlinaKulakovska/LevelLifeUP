import { FaChevronDown } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import SidebarHeader from '../components/SidebarHeader';
import Sidebar from '../components/Sidebar';
import AuthPopup from '../components/AuthPopup';

import { onAuthStateChanged, signOut} from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserlogined(user);
    });
    return () => unsubscribe();
  }, []);

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
    const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
    setTasks(updatedTasks);

    if (userlogined) {
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          tasks: arrayUnion({ ...newTask, id: tasks.length + 1 }),
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
  
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          tasks: arrayRemove(completedTask),
          points: updatedPoints,
          tasksCompleted: (userInfo.tasksCompleted || 0) + 1,
          statistics: updatedStats,
        });
  
        setUserInfo((prev) => ({
          ...prev,
          points: updatedPoints,
          tasksCompleted: (userInfo.tasksCompleted || 0) + 1,
          statistics: updatedStats,
        }));
      } catch (error) {
        console.error("Error completing task: ", error);
      }
    }
  };
  

  const handleAddHabit = async (newHabit) => {
    const updatedHabits = [...habits, { ...newHabit, id: habits.length + 1 }];
    setHabits(updatedHabits);

    if (userlogined) {
      try {
        const userDocRef = doc(db, 'users', userlogined.uid);
        await updateDoc(userDocRef, {
          habits: arrayUnion({ ...newHabit, id: habits.length + 1 }),
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
        console.log(`Habit completed: ${completedHabit.title}, XP: ${completedHabit.xp}`);
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
