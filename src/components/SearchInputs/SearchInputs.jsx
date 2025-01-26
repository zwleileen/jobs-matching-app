const SearchInputs = (props) => {

    const handleChange = ({target}) => {
        const newInputs = {...props.searchInputs, [target.name]: target.value}
        props.handleSearch(newInputs);
    }

    const reset = (event) => {
        event.preventDefault(); //Notes: prevents page from refreshing and lose all the React state updates 
        props.setSearchInputs({
            location: "",
            category: ""
          });
          props.setSearchResults([]);
    }
    
    return (
        <>
        <div className="searchinputs">
        <h3>Select the location and job category to begin your search</h3>
            <form>
            <select id="location" name="location" value={props.searchInputs.location} onChange={handleChange}>
                <option value="">Location</option>
                <option value="Flexible / Remote">Flexible / Remote</option>
                <option value="Singapore">Singapore</option>
            </select>
            <select id="category" name="category" value={props.searchInputs.category} onChange={handleChange}>
                <option value="">Category</option>
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