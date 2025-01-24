const SearchInputs = () => {
    return (
        <>
        <div className="searchinputs">
        <h3>Select the location and job category to begin your search</h3>
            <div className="searchboxes">
            <select id="location" name="location" value="Location" ><option value="Singapore">Singapore</option><option value="Munich, Germany">Munich, Germany</option></select>
            <select id="category" name="category" value="Job Category" ><option value="Software Engineering">Software Engineering</option><option value="HR">HR</option></select>
            <button>Clear Search</button>
            </div>
        </div>
        </>
    )
}

export default SearchInputs