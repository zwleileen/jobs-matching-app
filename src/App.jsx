// src/App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import SavedResults from './components/SavedResults/SavedResults';
import { useCallback, useEffect, useState } from 'react';
import * as jobService from './services/jobService';

const App = () => {

  const [jobsData, setJobsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    location: "",
    category: ""
  });
  const [savedResults, setSavedResults] = useState([]);
  const [category, setCategory] = useState("Software Engineering");
  
  const fetchData = useCallback(async () => {
    const data = await jobService.index(category);
    console.log(data) 
    const formattedData = data.results.map(job => (
    {
      id: job.id,
      company: job.company?.name || 'Unknown Company',
      location: job.locations?.[0]?.name || 'No location listed',
      role: job.categories?.[0]?.name || 'No role listed',
      link: job.refs?.landing_page || '#'
    }))
    setJobsData(formattedData);
  }, [category]);
  
  console.log(jobsData);

  useEffect(() => {
  if (searchInputs.category) {
    const searches = jobsData.filter(job => {
      const encodedRole = encodeURIComponent(job.role);
      return job.location === searchInputs.location || encodedRole === searchInputs.category;
    });
    setSearchResults(searches);
    }
  }, [jobsData, searchInputs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (newInputs) => {
    setCategory(newInputs.category);
    setSearchInputs(newInputs);
  }

  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<HomePage jobs={jobsData} searchResults={searchResults} setSearchResults={setSearchResults} handleSearch={handleSearch} searchInputs={searchInputs} setSearchInputs={setSearchInputs} savedResults={savedResults} setSavedResults={setSavedResults} category={category} setCategory={setCategory}/>}  />
    <Route path="savedjobs" element={<SavedResults savedResults={savedResults} setSavedResults={setSavedResults}/>}/>
  </Routes>
  </>
  );
};

export default App;
