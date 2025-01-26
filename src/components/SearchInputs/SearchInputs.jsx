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
        <div className="searchinputs">
        <h3>Select the location and job category to begin your search</h3>
            <form>
            <select id="values" name="values" value={props.searchInputs.values} onChange={handleChange}>
                <option value="">Company Values</option>
                <option value="creativity">Creativity</option>
                <option value="joy">Joy</option>
            </select>
            <select id="category" name="category" value={props.searchInputs.category} onChange={handleChange}>
                <option value="">Job Category</option>
                <option value="Software%20Engineering">Software Engineering</option>
                <option value="Product%20Management">Product Management</option>
                <option value="Data%20and%20Analytics">Data and Analytics</option>
                <option value="Design%20and%20UX">Design and UX</option>
                <option value="Project%20Management">Project Management</option>
            </select>
            <button onClick={reset}>Clear Search</button>
            </form>
        </div>
        </>
    )
}

export default SearchInputs