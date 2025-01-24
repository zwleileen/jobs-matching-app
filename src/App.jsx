// src/App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
// import SearchInputs from './components/SearchInputs/SearchInputs';
import HomePage from './components/HomePage/HomePage';
import SavedResults from './components/SavedResults/SavedResults';

const App = () => {

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
