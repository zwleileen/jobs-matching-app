import { useNavigate } from "react-router"
import SearchInputs from "../SearchInputs/SearchInputs"
import SearchResults from "../SearchResults/SearchResults"

const HomePage = () => {

    const navigate = useNavigate();

    return (
    <>
        <div className="homepage">
        <button onClick={() => navigate(`/savedjobs`)} >Saved Jobs</button>
        </div>
        <SearchInputs />
        <SearchResults/>
    </>
    )
}

export default HomePage