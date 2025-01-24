import { useState } from "react"

const SearchInputs = () => {

    const [searchInputs, setSearchInputs] = useState({
        location: "",
        category: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = ({target}) => {
        setSearchInputs({...searchInputs, [target.name]: target.value})
    }

    return (
        <>
        <div className="searchinputs">
        <h3>Select the location and job category to begin your search</h3>
            <form>
            <select id="location" name="location" value={searchInputs.location} onChange={handleChange}>
                <option value="Singapore">Singapore</option>
                <option value="Shanghai, China">Shanghai, China</option>
                <option value="Seoul, South Korea">Seoul, South Korea</option>
                <option value="Melbourne, Australia">Melbourne, Australia</option>
                <option value="Taipei, Taiwan">Taipei, Taiwan</option>
                <option value="Tokyo, Japan">Tokyo, Japan</option>
            </select>
            <select id="category" name="category" value={searchInputs.category} onChange={handleChange}>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Management">Product Management</option>
                <option value="Data and Analytics">Data and Analytics</option>
            </select>
            <button>Clear Search</button>
            </form>
        </div>
        </>
    )
}

export default SearchInputs