// src/App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import SearchInputs from './components/SearchInputs/SearchInputs';

const App = () => {

  return (
  <>
  <h1>Jobs Matching App</h1>
  <Routes>
    <Route path="/" element={<NavBar/>} >
      <Route path="searchInputs" element={<SearchInputs/>}/>
    </Route>
  </Routes>
  </>
  );
};

export default App;
