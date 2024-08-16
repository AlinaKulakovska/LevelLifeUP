import React, { useState, useEffect } from 'react';

import SidebarHeader from '../components/SidebarHeader';
import Sidebar from '../components/Sidebar';
import AuthPopup from '../components/AuthPopup';
import LoreCard from '../components/LoreCard';
import LoreForm from '../components/LoreForm';
import FutureGoal from '../components/FutureGoal';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";

const Lore = () => {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
    const [userlogined, setUserlogined] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [loreAchievements, setLoreAchievements] = useState([]);
    const [futureGoals, setFutureGoals] = useState([]);

    const openAuthPopup = () => setIsAuthPopupOpen(true);
    const closeAuthPopup = () => setIsAuthPopupOpen(false);
    const toggleSidebar = () => { setIsOpen(!isOpen); };

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
                    setLoreAchievements(userData.loreAchievements || []);
                    setFutureGoals(userData.futureGoals || []);
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

    const handleAddLore = async (newLore) => {
        if (userlogined) {
            const userDocRef = doc(db, 'users', userlogined.uid);
            try {
                await updateDoc(userDocRef, {
                    futureGoals: arrayUnion(newLore),
                });
                setFutureGoals([...futureGoals, newLore]);
            } catch (error) {
                console.error("Error adding future goal: ", error);
            }
        }
    };

    const handleCompleteGoal = async (goalId) => {
        const completedGoal = futureGoals.find((goal) => goal.id === goalId);
        if (completedGoal) {
            if (userlogined) {
                const userDocRef = doc(db, 'users', userlogined.uid);
                try {
                    await updateDoc(userDocRef, {
                        futureGoals: arrayRemove(completedGoal),
                        loreAchievements: arrayUnion({
                            ...completedGoal,
                            id: Date.now(),
                        }),
                    });
                    setLoreAchievements([...loreAchievements, { ...completedGoal, id: Date.now() }]);
                    setFutureGoals(futureGoals.filter((goal) => goal.id !== goalId));
                } catch (error) {
                    console.error("Error completing goal: ", error);
                }
            }
        }
    };

    return (
        <div className="flex flex-col kanit-regular text-white bg-[#282424] ">
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
                <div className='flex flex-col w-full mt-8 px-4'>
                    <h1 className='text-2xl'>Your Lore</h1>
                    <p className='text-sm text-neutral-400'>
                        The Lore Page serves as a timeline or storybook that chronicles significant events and accomplishments in life. It is a space where you can reflect on past achievements, ongoing tasks, or future ambitions, presented in a narrative-like structure. Each card on this page represents a milestone, a major goal, or an impactful moment—completed or still in progress.
                    </p>
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <h2 className="text-xl font-semibold mb-4">Future Goals</h2>
                        {futureGoals.map((goal) => (
                            <FutureGoal
                                key={goal.id}
                                goal={goal}
                                onComplete={handleCompleteGoal}
                            />
                        ))}
                    </div>
                    <div className="p-6">
                        <LoreForm onAddLore={handleAddLore} />
                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {loreAchievements.map((achievement, index) => (
                                <LoreCard
                                    key={index}
                                    title={achievement.title}
                                    date={achievement.date}
                                    description={achievement.description}
                                    category={achievement.category}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lore;
