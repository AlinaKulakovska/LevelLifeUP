import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { IoCloseCircleOutline } from 'react-icons/io5';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Ensure this points to your Firebase configuration


const AuthPopup = ({ onClose, }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        signUpUser(email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose(); // Close the popup after successful sign-in/up
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to sign up user and set initial user data in Firestore
  const signUpUser = async (email, password) => {
    try {
      // Sign up the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set initial user data
      const initialUserInfo = {
        email: user.email,
        title: 'Newbie',
        level: 0,
        points: 0,
        tasksCompleted: 0,
        achievements: [],
        badges: [], // Add paths to badge images if needed
        statistics: [0, 0, 0, 0, 0], // Hobbies, Friends, Work, Self-care, Love
        rewards: [{ id: 1, title: 'Gift Card', points: 50 },
        { id: 2, title: 'Extra Day Off', points: 100 },],
        tasks: [{ id: 1, title: 'Morning Run', description: 'Run 5km in the morning', category: 'Health', points: "20" },
        { id: 2, title: 'Finish Project', description: 'Complete the frontend project', category: 'Work', points: "30" },
        { id: 3, title: 'Read a Book', description: 'Read 50 pages of a book', category: 'Hobbies', points: "10" },
        { id: 4, title: 'Meditation', description: '15 minutes of meditation', category: 'Self-care', points: 5 },
        { id: 5, title: 'Call a Friend', description: 'Catch up with a friend', category: 'Friends', points: 8 },],
        habits: [{ id: 1, title: 'Drink Water', description: 'Drink 8 glasses of water', xp: 5 },
        { id: 2, title: 'Daily Exercise', description: '30 minutes of exercise', xp: 10 },],
      };

      // Add user info to Firestore
      await setDoc(doc(db, "users", user.uid), initialUserInfo);
      console.log("User signed up and initial data added to Firestore");

    } catch (error) {
      console.error("Error signing up user: ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <IoCloseCircleOutline onClick={onClose} />
        <h2 className="text-2xl font-semibold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleAuth}
          className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-amber-500 hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthPopup;
