import { useNavigate } from "react-router"
import SearchInputs from "../SearchInputs/SearchInputs"
import SearchResults from "../SearchResults/SearchResults"

const HomePage = (props) => {

    const navigate = useNavigate();

    return (
    <>
        <div className="homepage">
        <button onClick={() => navigate(`/savedjobs`)} >Saved Jobs</button>
        </div>
        <SearchInputs searchResults={props.searchResults} setSearchResults={props.setSearchResults} searchInputs={props.searchInputs} setSearchInputs={props.setSearchInputs} handleSearch={props.handleSearch}/>
        <SearchResults searchResults={props.searchResults} savedResults={props.savedResults} setSavedResults={props.setSavedResults}/>
    </>
    )
}

export default HomePage