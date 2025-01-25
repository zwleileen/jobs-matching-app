const SearchInputs = (props) => {

    const handleChange = ({target}) => {
        const newInputs = {...props.searchInputs, [target.name]: target.value}
        props.setSearchInputs(newInputs);
        props.handleSearch(newInputs);
    }

    const reset = () => {
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
                <option value="Shanghai, China">Shanghai, China</option>
                <option value="Seoul, South Korea">Seoul, South Korea</option>
                <option value="Melbourne, Australia">Melbourne, Australia</option>
                <option value="Taipei, Taiwan">Taipei, Taiwan</option>
                <option value="Tokyo, Japan">Tokyo, Japan</option>
            </select>
            <select id="category" name="category" value={props.searchInputs.category} onChange={handleChange}>
                <option value="">Category</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Management">Product Management</option>
                <option value="Data and Analytics">Data and Analytics</option>
            </select>
            <button onClick={reset}>Clear Search</button>
            </form>
        </div>
        </>
    )
}

export default SearchInputs