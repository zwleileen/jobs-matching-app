// src/App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
// import SearchInputs from './components/SearchInputs/SearchInputs';
import HomePage from './components/HomePage/HomePage';

const App = () => {

  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<HomePage/>} >
      {/* <Route path="searchInputs" element={<SearchInputs/>}/> */}
    </Route>
  </Routes>
  </>
  );
};

export default App;
