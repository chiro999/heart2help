import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase.config'; // Adjust the path to your Firebase configuration
import { getDoc, doc } from "firebase/firestore";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
    };
    fetchProfileData();
  }, []);

  return (
    <Navbar />
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>My Profile</h1>
      <div className='bg-white shadow-md rounded p-4'>
        {profileData.type === 'user' ? (
          <>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Full Name</label>
              <input
                type='text'
                value={profileData.fullname || ''}
                readOnly
                className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input
                type='text'
                value={profileData.email || ''}
                readOnly
                className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          </>
        ) : (
          <>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Organization Name</label>
              <input
                type='text'
                value={profileData.orgName || ''}
                readOnly
                className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Number of Employees</label>
              <input
                type='text'
                value={profileData.orgCount || ''}
                readOnly
                className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Type of Industry</label>
              <input
                type='text'
                value={profileData.orgIndustry || ''}
                readOnly
                className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input
                type='text'
                value={profileData.email || ''}
                readOnly
                className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
