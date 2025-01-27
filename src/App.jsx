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
    values: "",
    category: ""
  });
  const [valuesList, setValuesList] = useState([]);  
  const [savedResults, setSavedResults] = useState([]);
  const [category, setCategory] = useState("Software%20Engineering");
  const [loading, setLoading] = useState(false);
  const [companyDetails, setcompanyDetails] = useState([]);
  const [count, setCount] = useState();
  
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
  console.log(jobsData);

  //Note: fetches data when category changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Notes: filters data when (and AFTER) jobsData or searchInputs update, to make sure we filter the updated data
  useEffect(() => {
  if (searchInputs.values || searchInputs.category) {
    const searches = jobsData.filter(job => {
      const encodedCategory = encodeURIComponent(job.category);
      const cleanContent = job.content.replace(/<[^>]*>|<br\/>|\n/g, ' ');
      const values = searchInputs.values.toLowerCase().split(',')
      return values.some(value => {
        const regex = new RegExp(`\\b${value.trim()}\\b`, 'i'); //Notes: this ensures the whole word e.g. "creativity" is checked and not just parts of the word
        return regex.test(cleanContent);
      }) && encodedCategory === searchInputs.category;
    });
    setSearchResults(searches);
    // console.log(searches)
    const newCount = searches.length;
    setCount(newCount);
  }
  }, [count, jobsData, searchInputs]);
  // console.log(companyIds)

  //Notes: why writing filter data in handleSearch doesn't work - User selects new category handleSearch calls setCategory -> handleSearch tries to filter jobsData immediately -> But the API fetch triggered by the category change hasn't completed yet -> So you're filtering old data before new data arrives
  const handleSearch = (newInputs) => {
    setCategory(newInputs.category);
    setSearchInputs(newInputs);
  }

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


  const saveToAirtable = async (savedResult) => {
    try {
      const response = await jobService.create(savedResult);
      setSavedResults(prev => [...prev, response.records[0]]);
    } catch (error) {
      console.error("Failed to save result:", error);
    }
  };


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
        setcompanyDetails(details);
      }
    };
    fetchCompanyDetails();
  }, [searchResults]);
  // console.log(companyDetails);
      

  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<HomePage jobs={jobsData} searchResults={searchResults} setSearchResults={setSearchResults} handleSearch={handleSearch} searchInputs={searchInputs} setSearchInputs={setSearchInputs} valuesList={valuesList} setValuesList={setValuesList} savedResults={savedResults} setSavedResults={setSavedResults} category={category} setCategory={setCategory} loading={loading} companyDetails={companyDetails} setcompanyDetails={setcompanyDetails} count={count} setCount={setCount} saveToAirtable={saveToAirtable}/>} />
    <Route path="savedjobs" element={<SavedResults savedResults={savedResults} setSavedResults={setSavedResults} companyDetails={companyDetails} setcompanyDetails={setcompanyDetails}/>}/>
  </Routes>
  </>
  );
};

export default App;
