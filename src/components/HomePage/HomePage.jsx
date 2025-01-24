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
        <SearchInputs />
        <SearchResults jobs={props.jobsData} searchResults={props.searchResults}/>
    </>
    )
}

export default HomePage