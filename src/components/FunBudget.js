import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const FunBudget = ({ userId }) => {
    const [budget, setBudget] = useState(0);
    const [maxBudget, setMaxBudget] = useState(1000);
    const [progress, setProgress] = useState(0);
    const [userBudgetleft, setUserBudgetleft] = useState(0);

    useEffect(() => {
        const fetchBudget = async () => {
            if (userId) {
                const userDocRef = doc(db, 'users', userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const { funBudget = 0, maxFunBudget = 1000 } = userData;
                    setBudget(funBudget);
                    setMaxBudget(maxFunBudget);
                    setProgress((funBudget / maxFunBudget) * 100);
                    setUserBudgetleft(userData.budgetLeft)
                }
            }
        };

        fetchBudget();
    }, [userId]);

    const handleBudgetChange = async (newBudget) => {
            setBudget(newBudget);
            setProgress((newBudget / maxBudget) * 100);
            setUserBudgetleft(maxBudget - newBudget)
            setMaxBudget(maxBudget)
            if (userId) {
                try {
                    const userDocRef = doc(db, 'users', userId);
                    await updateDoc(userDocRef, {
                        funBudget: newBudget,
                        budgetLeft: maxBudget - newBudget,
                        maxFunBudget: maxBudget,
                    });
                   
                } catch (error) {
                    console.error("Error updating budget: ", error);
                }
            }
        
    };

    const handleMaxBudgetChange = async (newMaxBudget) => {
        setMaxBudget(newMaxBudget);
        setProgress((budget / newMaxBudget) * 100);
        setUserBudgetleft(newMaxBudget - budget)
        if (userId) {
            try {
                const userDocRef = doc(db, 'users', userId);
                await updateDoc(userDocRef, {
                    maxFunBudget: newMaxBudget,
                    budgetLeft: newMaxBudget - budget,
                });
              
            } catch (error) {
                console.error("Error updating max budget: ", error);
            }
            
        }
    };

    return (
        <div className="p-4 bg-[#393434] rounded-md text-white space-y-4">
            <h3 className="text-lg font-semibold">Monthly Fun Budget</h3>
            <div className="relative h-4 bg-gray-300 rounded overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-4 bg-amber-600 rounded"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-md">Budget: ${userBudgetleft}</p>
            <p className="text-sm">Set your Expenses</p>
            <input
                type="number"
                value={budget}
                onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                className="mt-1 block w-full pl-1 text-neutral-600 rounded-md bg-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-sm">Set Max Budget</p>
            <input
                type="number"
                value={maxBudget}
                onChange={(e) => handleMaxBudgetChange(parseInt(e.target.value))}
                className="mt-1 block w-full pl-1 text-neutral-600 rounded-md bg-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
        </div>
    );
};

export default FunBudget;
