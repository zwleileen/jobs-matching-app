import { useNavigate } from "react-router"
import SearchInputs from "../SearchInputs/SearchInputs"
import SearchResults from "../SearchResults/SearchResults"

const HomePage = (props) => {

    const navigate = useNavigate();
    
    return (
    <>
        <div className="homepage">
            <h3>Find jobs in Singapore</h3>
            <button onClick={() => navigate(`/savedjobs`)} >Saved Jobs</button>
        </div>
        <SearchInputs setCount = {props.setCount} setSearchResults={props.setSearchResults} jobsData={props.jobsData} setJobsData={props.setJobsData} valuesList={props.valuesList} setValuesList={props.setValuesList} category={props.category} setCategory={props.setCategory} searchInputs={props.searchInputs} setSearchInputs={props.setSearchInputs}/>
        <SearchResults searchResults={props.searchResults} savedResults={props.savedResults} setSavedResults={props.setSavedResults} loading={props.loading} companyDetails={props.companyDetails} setCompanyDetails={props.setCompanyDetails} count={props.count} jobService={props.jobService}/>
    </>
    )
}

export default HomePage