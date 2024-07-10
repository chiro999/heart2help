// src/components/JobCard.jsx

import React from 'react';
import dayjs from 'dayjs';
import { auth, db, storage } from '../../firebase.config';
import { collection, addDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

function JobCard({ job, onClick }) {
  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(job.postedOn, 'day');

  const quickApply = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userDoc = userDocSnap.data();

        const cvRef = ref(storage, `cvs/${user.uid}`);
        const cvUrl = await getDownloadURL(cvRef);

        await addDoc(collection(db, 'applications'), {
          userId: user.uid,
          orgId: job.orgId,
          jobId: job.id,
          userName: userDoc.fullname,
          userEmail: userDoc.email,
          orgName: job.company,
          cvUrl: cvUrl,
          appliedOn: serverTimestamp(),
        });

        alert('Quick apply successful!');
      } catch (error) {
        console.error('Error applying for job:', error);
        alert('Error applying for job. Please try again.');
      }
    } else {
      alert('You need to log in to apply for a job.');
    }
  };

  return (
    <div className='mx-40 mb-4' onClick={() => onClick(job)}>
      <div className='flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103'>
        <div className='flex flex-col items-start gap-3'>
          <h1 className='text-lg font-semibold'>{job.title} - {job.company}</h1>
          <p>{job.type} &#x2022; {job.experience} &#x2022; {job.location}</p>
          <div className='flex items-center gap-2'>
            {job.skills.map((skill, i) => (
              <p key={i} className='text-gray-500 py-1 px-2 rounded-md border border-black'>{skill}</p>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <p className='text-gray-500'>Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago</p>
          <button onClick={quickApply} className='text-blue-500 border border-blue-500 px-10 py-2 rounded-md'>
            Quick Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
