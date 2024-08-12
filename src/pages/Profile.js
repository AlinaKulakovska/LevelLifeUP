import React, { useState, useEffect } from 'react';
import userPhoto from '../images/user-avatar.jpg';
import RadarChart from '../components/RadarChart';
import Rewards from '../components/Rewards';
import AuthPopup from '../components/AuthPopup';
import SidebarHeader from '../components/SidebarHeader';
import Sidebar from '../components/Sidebar';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Profile = () => {
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [userlogined, setUserlogined] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const openAuthPopup = () => setIsAuthPopupOpen(true);
  const closeAuthPopup = () => setIsAuthPopupOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        setUserlogined(user);
        if (userDocSnap.exists()) {
          setUserInfo(userDocSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('User is not signed in');
        setUserInfo(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      setUserlogined(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kanit-regular bg-[#282424]">
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
        <div className="rounded-lg overflow-hidden text-white w-full">
          <div className="flex items-center p-6 bg-neutral-950 text-white pattern">
            <img
              className="w-20 h-20 rounded-full mr-4"
              src={userPhoto}
              alt="User"
            />
            <div>
              <h1 className="text-2xl font-bold">{userInfo?.name || 'User Name'}</h1>
              <p className='text-neutral-200'>{userInfo?.email || 'User Email'}</p>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#393434] p-4 rounded-lg">
                <h3 className="font-bold">Level</h3>
                <p>{userInfo?.level || 0}</p>
              </div>
              <div className="bg-[#393434] p-4 rounded-lg">
                <h3 className="font-bold">Points</h3>
                <p>{userInfo?.points || 0}</p>
              </div>
              <div className="bg-[#393434] p-4 rounded-lg">
                <h3 className="font-bold">Tasks Completed</h3>
                <p>{userInfo?.tasksCompleted || 0}</p>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <RadarChart userData={userInfo?.statistics || [0, 0, 0, 0, 0]} />
              <div>
                <div>
                  <h2 className="text-xl font-bold mt-6 mb-4">Achievements</h2>
                  <ul className="list-disc list-inside p-4 rounded-lg">
                    {userInfo?.achievements?.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    )) || 'No Achievements'}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-bold mt-6 mb-4">Badges</h2>
                  <div className="flex space-x-4">
                    {userInfo?.badges?.map((badge, index) => (
                      <img key={index} className="w-12 h-12" src={badge} alt={`Badge ${index + 1}`} />
                    )) || 'No Badges'}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* get from firebase */}
              <Rewards userId={userlogined.uid}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
