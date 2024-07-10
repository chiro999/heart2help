import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase.config';
import Navbar from '../Navbar';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [userType, setUserType] = useState('');

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

  useEffect(() => {
    const fetchApplications = async () => {
      const user = auth.currentUser;
      if (!user) return;

      let q;
      if (userType === 'org') {
        q = query(collection(db, 'applications'), where('orgId', '==', user.uid));
      } else {
        q = query(collection(db, 'applications'), where('userId', '==', user.uid));
      }

      const querySnapshot = await getDocs(q);
      const applicationsData = [];
      querySnapshot.forEach((doc) => {
        applicationsData.push({ id: doc.id, ...doc.data() });
      });
      setApplications(applicationsData);
    };

    if (userType) {
      fetchApplications();
    }
  }, [userType]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Applications</h2>
        <div className="bg-white shadow-md rounded p-4">
          {applications.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <ul>
              {applications.map((application) => (
                <li key={application.id} className="mb-4">
                  <p><strong>Job ID:</strong> {application.jobId}</p>
                  {userType === 'org' ? (
                    <>
                      <p><strong>Applicant Name:</strong> {application.userName}</p>
                      <p><strong>Applicant Email:</strong> {application.userEmail}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Organization Name:</strong> {application.orgName}</p>
                    </>
                  )}
                  <p><strong>Applied On:</strong> {new Date(application.appliedOn.seconds * 1000).toLocaleDateString()}</p>
                  <a href={application.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View CV
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
