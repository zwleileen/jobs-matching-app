// src/App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import SavedResults from './components/SavedResults/SavedResults';
import { useCallback, useEffect, useState } from 'react';
import * as jobService from './services/jobService';


const App = () => {

  const [savedResults, setSavedResults] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    values: "",
    category: ""
  });
  const [jobsData, setJobsData] = useState([]);
  const [valuesList, setValuesList] = useState([]);  
  const [category, setCategory] = useState("Software%20Engineering");
  const [loading, setLoading] = useState(false);


  const fetchData = useCallback(async () => {
  setLoading(true)
  const data = await jobService.index(category);
  // console.log(data) 
  const formattedData = data.results.map(job => (
  {
    id: job.id,
    company: job.company?.name || 'Unknown Company',
    content: job.contents || 'No content provided',
    category: job.categories[0].name,
    role: job.name || 'No role listed',
    link: job.refs?.landing_page || '#',
    companyId: job.company?.id
  }))
      setJobsData(formattedData);
      setLoading(false);
  }, [category]);
  // console.log(jobsData);

  //Note: fetches data when category changes
  useEffect(() => {
      fetchData();
  }, [fetchData]);


  useEffect(() => {
  const fetchValues = async () => {
    const values = await jobService.getValues();
    if(values.length > 0) { 
      setValuesList(values);
    } else {
      setValuesList(["Company Values", "Joy", "Creativity", "Inclusive", "Equity"])
    }
    };
  fetchValues();
  }, [])

  useEffect(() => {
  const fetchCompanyDetails = async () => {
    if (searchResults.length > 0) {
      const details = await Promise.all(
        searchResults.map(async company => {
          const detail = await jobService.companyDetails(company.companyId);
          return {
            id: detail.id,
            company: detail.name,
            description: detail.description || 'No description available',
            industries: detail.industries?.length ? detail.industries.map(industry => industry.name) : 'Industry unknown'
          };
        })
      );
      setCompanyDetails(details);
    }
  };
  fetchCompanyDetails();
  }, [searchResults, setCompanyDetails]);
  // console.log(companyDetails);


  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<HomePage savedResults={savedResults} setSavedResults={setSavedResults} count={count} setCount={setCount} companyDetails={companyDetails} setCompanyDetails={setCompanyDetails} searchResults={searchResults} setSearchResults={setSearchResults} searchInputs={searchInputs} setSearchInputs={setSearchInputs} jobsData={jobsData} setJobsData={setJobsData} valuesList={valuesList} setValuesList={setValuesList} category={category} setCategory={setCategory} loading={loading} jobService={jobService}/>} />
    <Route path="savedjobs" element={<SavedResults savedResults={savedResults} setSavedResults={setSavedResults} companyDetails={companyDetails} setcompanyDetails={setCompanyDetails}/>}/>
  </Routes>
  </>
  );
};

export default App;
