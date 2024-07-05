import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar"; // Correct import path for the Navbar component
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import dayjs from 'dayjs';
import Profile from "./components/Profile"; // Import the Profile component
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    try {
      setCustomSearch(false);
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, orderBy("postedOn", "desc"));
      const req = await getDocs(q);

      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate(),
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsCustom = async (jobCriteria) => {
    try {
      setCustomSearch(true);
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const queries = [orderBy("postedOn", "desc")];

      if (jobCriteria.type) queries.push(where("type", "==", jobCriteria.type));
      if (jobCriteria.location) queries.push(where("location", "==", jobCriteria.location));

      const q = query(jobsRef, ...queries);
      const req = await getDocs(q);

      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate(),
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching custom jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchJobs();
      } else {
        setIsAuthenticated(false);
        window.location.href = '../login.html';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <MainContent fetchJobs={fetchJobs} fetchJobsCustom={fetchJobsCustom} customSearch={customSearch} jobs={jobs} onJobClick={handleJobClick} /> : <Navigate to="../public/login.html" />}
        />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chats/:orgId" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {selectedJob && <JobDetail job={selectedJob} onClose={handleClose} />}
    </Router>
  );
}

const MainContent = ({ fetchJobs, fetchJobsCustom, customSearch, jobs, onJobClick }) => (
  <div>
    <Navbar />
    <Header />
    <SearchBar fetchJobsCustom={fetchJobsCustom} />
    {customSearch && (
      <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
        <p className="bg-blue-500 px-10 py-2 rounded-md text-white">
          Clear Filters
        </p>
      </button>
    )}
    {jobs.map((job) => (
      <JobCard key={job.id} job={job} onClick={onJobClick} />
    ))}
  </div>
);

const JobDetail = ({ job, onClose }) => (
  <div className="fixed inset-0 bg-white bg-opacity-90 z-50 overflow-auto">
    <div className="relative bg-white p-8 m-4 shadow-lg rounded-lg max-w-4xl mx-auto mt-20">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 mt-4 mr-4 text-xl font-bold"
      >
        &times;
      </button>
      <h1 className="text-3xl font-bold mb-4">{job.company}</h1>
      <h2 className="text-2xl mb-4">{job.title}</h2>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Job Type:</strong> {job.jobType}</p>
      <p><strong>Posted On:</strong> {dayjs(job.postedOn).format('MMMM D, YYYY')}</p>
      <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
      <p><strong>Job Link:</strong> <a href={job.job_link} target="_blank" rel="noopener noreferrer">{job.job_link}</a></p>
      <p><strong>More Data:</strong> {job.moreData}</p>
    </div>
  </div>
);

export default App;
