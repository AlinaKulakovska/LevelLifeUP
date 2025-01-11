import React, { useState, useEffect } from "react";
import SidebarHeader from "../components/SidebarHeader";
import Sidebar from "../components/Sidebar";
import AuthPopup from "../components/AuthPopup";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Bingo = () => {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
    const [userlogined, setUserlogined] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [bingoGrid, setBingoGrid] = useState(
        Array.from({ length: 25 }, (_, index) => ({
            id: `${Math.floor(index / 5)}-${index % 5}`,
            goal: "",
            completed: false,
            completionDate: null,
            imageUrl: null,
        }))
    );

    const openAuthPopup = () => setIsAuthPopupOpen(true);
    const closeAuthPopup = () => setIsAuthPopupOpen(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

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
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUserInfo(userData);
                    setBingoGrid(userData.bingoGrid || bingoGrid);
                    updateDoc(userDocRef, { bingoGrid: bingoGrid });
                } else {
                    console.log("No such document!");
                }
            } else {
                console.log("User is not signed in");
                setUserInfo(null);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserlogined(user);
            fetchUserData(user);
        });

        return () => unsubscribe();
    }, []);

    const handleGoalChange = (cellId, newGoal) => {
        const updatedGrid = bingoGrid.map((cell) =>
            cell.id === cellId ? { ...cell, goal: newGoal } : cell
        );
        setBingoGrid(updatedGrid);
    };


    const handleMarkComplete = (cellId) => {
        const updatedGrid = bingoGrid.map((cell) =>
            cell.id === cellId
                ? {
                    ...cell,
                    completed: !cell.completed,
                    completionDate: !cell.completed
                        ? new Date().toLocaleDateString()
                        : null,
                }
                : cell
        );
        setBingoGrid(updatedGrid);
    };

    const saveBingoGrid = async () => {
        if (userlogined) {
            const userDocRef = doc(db, "users", userlogined.uid);
            try {
                await updateDoc(userDocRef, { bingoGrid });
                console.log("Bingo grid updated successfully!");
            } catch (error) {
                console.error("Error updating bingo grid: ", error);
            }
        }
    };

    const checkBingoCompletion = () => {
        // Helper to group cells by row
        const getRow = (rowIndex) => bingoGrid.filter(cell => cell.id.startsWith(`${rowIndex}-`));

        // Helper to group cells by column
        const getColumn = (colIndex) => bingoGrid.filter(cell => cell.id.endsWith(`-${colIndex}`));

        // Helper to get diagonals
        const getDiagonals = () => {
            const mainDiagonal = bingoGrid.filter((_, index) => index % 6 === 0); // Top-left to bottom-right
            const antiDiagonal = bingoGrid.filter((_, index) => index % 4 === 0 && index !== 0 && index !== 24); // Top-right to bottom-left
            return [mainDiagonal, antiDiagonal];
        };

        // Check rows and columns
        for (let i = 0; i < 5; i++) {
            const rowCompleted = getRow(i).every(cell => cell.completed);
            const colCompleted = getColumn(i).every(cell => cell.completed);
            if (rowCompleted || colCompleted) {
                return true;
            }
        }

        // Check diagonals
        const [mainDiagonal, antiDiagonal] = getDiagonals();
        if (mainDiagonal.every(cell => cell.completed) || antiDiagonal.every(cell => cell.completed)) {
            return true;
        }

        return false;
    };


    useEffect(() => {
        if (checkBingoCompletion()) {
            alert("Bingo Completed!");
        }
        saveBingoGrid()
    }, [bingoGrid]);


    return (
        <div className="flex flex-col kanit-regular text-white bg-[#282424]">
            {isAuthPopupOpen && <AuthPopup onClose={closeAuthPopup} />}
            <SidebarHeader
                userlogined={userlogined}
                signOutUser={signOutUser}
                openAuthPopup={openAuthPopup}
                toggleSidebar={toggleSidebar}
                points={userInfo ? userInfo.points : ""}
            />
            <div className="flex">
                <Sidebar isOpen={isOpen} />
                <div className="flex flex-col w-full mt-8 px-4">
                    <h1 className="text-3xl font-bold text-center">Bingo 2025</h1>
                    <p>Bingo goals are personal objectives or tasks organized into a 5x5 grid resembling a bingo card. Each cell represents a specific goal, and users mark them as completed. When an entire row, column, or diagonal is completed, it highlights the achievement, similar to a traditional bingo game. It's a fun and visual way to track progress toward goals for a specific period, such as a year.</p>
                    <p className="text-neutral-700">*doble click to mark as completed</p>
                    <div className="grid grid-cols-5 gap-2 mt-6">
                        {bingoGrid.map((cell) => (
                            <div
                                key={cell.id}
                                className={`p-4 border min-h-28 rounded ${cell.completed ? "bg-amber-500" : "bg-neutral-700"
                                    }`}
                                onDoubleClick={() => handleMarkComplete(cell.id)}
                            >
                                <textarea
                                    className="w-full h-full bg-transparent border-none  text-white text-center bingo-textarea"
                                    value={cell.goal}
                                    onChange={(e) => handleGoalChange(cell.id, e.target.value)}
                                />
                                {cell.completionDate && (
                                    <p className="text-xs text-white -mt-3">
                                        Completed: {cell.completionDate}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Bingo;
