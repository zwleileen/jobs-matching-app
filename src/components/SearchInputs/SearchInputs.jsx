import JobCategory from "../JobCategory/JobCatgory";

const SearchInputs = (props) => {

    const handleChange = ({target}) => {
        const newInputs = {...props.searchInputs, [target.name]: target.value}
        props.handleSearch(newInputs);
    }

    const reset = (event) => {
        event.preventDefault(); //Notes: prevents page from refreshing and lose all the React state updates 
        props.setSearchInputs({
            values: "",
            category: ""
          });
          props.setSearchResults([]);
    }
    
    return (
        <>
        <div className="searchInputs">
        <div className="categorySearch">
        <label htmlFor="category">Select the job category to begin your search: </label>
            <select id="category" name="category" value={props.searchInputs.category} onChange={handleChange}>
            <JobCategory/>
            </select>
        </div>
        <div className="valuesSearch">
        <label htmlFor="values">For a change, you can try filtering your search based on company values: </label>
            <select id="values" name="values" value={props.searchInputs.values} onChange={handleChange}>
                {props.valuesList.map(value => (
                    <option key={value} value={value}>{value}</option>))}
            </select>
        </div>
            <button onClick={reset}>Clear Search</button>
        </div>
        </>
    )
}

export default SearchInputs