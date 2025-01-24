// src/App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import SavedResults from './components/SavedResults/SavedResults';
import { useEffect, useState } from 'react';
import * as jobService from './services/jobService';

const App = () => {

  const [jobsData, setJobsData] = useState([]);
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const data = await jobService.index();
    // console.log(data)
    const formattedData = data.results.map(job => (
    {
      id: job.id,
      company: job.company.name,
      location: job.locations[0].name,
      role: job.name,
      link: job.refs.landing_page
    }))
    setJobsData(formattedData);
    setSearchResults(formattedData);
  }
  
  console.log(jobsData);

  
  // const handleSearch = () => {
  //   const searches = props.jobs.filter(job =)
  // }

  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<HomePage jobs={jobsData} />} />
    <Route path="savedjobs" element={<SavedResults/>}/>
  </Routes>
  </>
  );
};

export default App;
