import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { IoCloseCircleOutline } from 'react-icons/io5';



const AuthPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose(); // Close the popup after successful sign-in/up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <IoCloseCircleOutline onClick={onClose}/>
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
