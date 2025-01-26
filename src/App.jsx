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
  const [category, setCategory] = useState("Software%20Engineering");
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    company: "",
    companyId: ""
  })
  
  const fetchData = useCallback(async () => {
    setLoading(true)
    const data = await jobService.index(category);
    console.log(data) 
    const formattedData = data.results.map(job => (
    {
      id: job.id,
      company: job.company?.name || 'Unknown Company',
      location: job.locations?.[0]?.name || 'No location listed',
      role: job.categories?.[0]?.name || 'No role listed',
      link: job.refs?.landing_page || '#',
      companyId: job.company?.id
    }))
    setJobsData(formattedData);
    setLoading(false);
  }, [category]);
  console.log(jobsData);

  //Note: fetches data when category changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Notes: filters data when (and AFTER) jobsData or searchInputs update, to make sure we filter the updated data
  useEffect(() => {
  if (searchInputs.category) {
    const searches = jobsData.filter(job => {
      const encodedRole = encodeURIComponent(job.role);
      return job.location === searchInputs.location || encodedRole === searchInputs.category;
    });
    setSearchResults(searches);
    setCompanyData(searches.map(search => (
      {
        company: search.company,
        companyId: search.companyId
      })))
    }
  }, [jobsData, searchInputs]);
  // console.log(companyData)

  //Notes: why writing filter data in handleSearch doesn't work - User selects new category handleSearch calls setCategory -> handleSearch tries to filter jobsData immediately -> But the API fetch triggered by the category change hasn't completed yet -> So you're filtering old data before new data arrives
  const handleSearch = (newInputs) => {
    setCategory(newInputs.category);
    setSearchInputs(newInputs);
  }

  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<HomePage jobs={jobsData} searchResults={searchResults} setSearchResults={setSearchResults} handleSearch={handleSearch} searchInputs={searchInputs} setSearchInputs={setSearchInputs} savedResults={savedResults} setSavedResults={setSavedResults} category={category} setCategory={setCategory} loading={loading} />} />
    <Route path="savedjobs" element={<SavedResults savedResults={savedResults} setSavedResults={setSavedResults}/>}/>
  </Routes>
  </>
  );
};

export default App;
