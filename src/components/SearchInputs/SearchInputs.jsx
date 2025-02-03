import { useEffect } from "react";
import JobCategory from "../JobCategory/JobCatgory";

const SearchInputs = ({searchInputs, setSearchInputs, setCount, jobsData, setSearchResults, setCategory, valuesList}) => {

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
        setCount(searches.length);
      }
      }, [setCount, jobsData, searchInputs, setSearchResults]);
      // console.log(companyIds)
    
      //Notes: why writing filter data in handleSearch doesn't work - User selects new category handleSearch calls setCategory -> handleSearch tries to filter jobsData immediately -> But the API fetch triggered by the category change hasn't completed yet -> So you're filtering old data before new data arrives
    const handleSearch = (newInputs) => {
        setCategory(newInputs.category);
        setSearchInputs(newInputs);
      }

    const handleChange = ({target}) => {
        const newInputs = {...searchInputs, [target.name]: target.value}
        handleSearch(newInputs);
    }

    const reset = (event) => {
        event.preventDefault(); //Notes: prevents page from refreshing and lose all the React state updates 
        setSearchInputs({
            values: "",
            category: ""
          });
          setSearchResults([]);
    }
    
    return (
        <>
        <div className="searchInputs">
        <div className="categorySearch">
        <label htmlFor="category">Select the job category to begin your search: </label>
            <select id="category" name="category" value={searchInputs.category} onChange={handleChange}>
            <JobCategory/>
            </select>
        </div>
        <div className="valuesSearch">
        <label htmlFor="values">For a change, you can try filtering your search based on company values: </label>
            <select id="values" name="values" value={searchInputs.values} onChange={handleChange}>
                {valuesList.map(value => (
                    <option key={value} value={value}>{value}</option>))}
            </select>
        </div>
            <button onClick={reset}>Clear Search</button>
        </div>
        </>
    )
}

export default SearchInputs