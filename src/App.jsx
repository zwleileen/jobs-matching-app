// src/App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import SavedResults from './components/SavedResults/SavedResults';
import { useEffect, useState } from 'react';
import * as jobService from './services/jobService';

const App = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const data = await jobService.index();
    setJobs(data);
  }
  
  console.log(jobs);

  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="savedjobs" element={<SavedResults/>}/>
  </Routes>
  </>
  );
};

export default App;
