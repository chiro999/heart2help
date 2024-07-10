// src/components/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase.config'; // Adjust the path to your Firebase configuration
import { getDoc, doc } from "firebase/firestore";

function Navbar() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserType(userDoc.data().type);
        }
      }
    };
    fetchUserType();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login.html'; // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleOpenForm = (e) => {
    if (userType !== 'org') {
      e.preventDefault();
      alert('You need to register as an organization to access this form.');
    }
  };

  return (
    <div className='h-20 flex items-center justify-between w-full text-white bg-blue-500 bg-opacity-0'>
      <Link to="/" className='text-3xl pl-20 font-bold'>heart2help</Link>
      <div className='flex items-center'>
        <Link 
          to="/JobForm.html" 
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4'
          target="_blank"
          onClick={handleOpenForm}
        >
          Open Form
        </Link>
        <Link 
          to="/profile" 
          className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4'
        >
          My Profile
        </Link>
        <Link 
          to="/applications" 
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-4'
        >
          Applications
        </Link>
        <Link 
          to="/chats" 
          className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4'
        >
          Chat
        </Link>
        <button 
          onClick={handleLogout} 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-20'
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
