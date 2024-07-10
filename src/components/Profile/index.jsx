import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebase.config'; // Adjust the path to your Firebase configuration
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from '../Navbar';

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [cvFile, setCvFile] = useState(null);
  const [cvUrl, setCvUrl] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
          if (userDoc.data().cvPath) {
            const cvRef = ref(storage, userDoc.data().cvPath);
            const cvUrl = await getDownloadURL(cvRef);
            setCvUrl(cvUrl);
          }
        }
      }
    };
    fetchProfileData();
  }, []);

  const handleCvChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleCvUpload = async () => {
    if (!cvFile) return;
    const user = auth.currentUser;
    const cvRef = ref(storage, `cvs/${user.uid}`);
    await uploadBytes(cvRef, cvFile);
    await updateDoc(doc(db, "users", user.uid), {
      cvPath: `cvs/${user.uid}`
    });
    const cvUrl = await getDownloadURL(cvRef);
    setCvUrl(cvUrl);
    alert("CV uploaded successfully");
  };

  return (
    <div className='container mx-auto p-4'>
      <Navbar />
      <h1 className='text-2xl font-bold mb-4 text-white'>My Profile</h1>
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
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>CV</label>
              {cvUrl ? (
                <div>
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className='text-blue-500'>View CV</a>
                  <input type='file' onChange={handleCvChange} className='block mt-2'/>
                  <button onClick={handleCvUpload} className='mt-2 bg-blue-500 text-white py-2 px-4 rounded'>Reupload CV</button>
                </div>
              ) : (
                <div>
                  <input type='file' onChange={handleCvChange} className='block'/>
                  <button onClick={handleCvUpload} className='mt-2 bg-blue-500 text-white py-2 px-4 rounded'>Upload CV</button>
                </div>
              )}
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
