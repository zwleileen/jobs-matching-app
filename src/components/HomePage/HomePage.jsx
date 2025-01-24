import SearchInputs from "../SearchInputs/SearchInputs"
import SearchResults from "../SearchResults/SearchResults"

const HomePage = () => {
    return (
    <>
        <div className="homepage">
        <button className="home">Home</button>
        <button className="savedjobs">Saved Jobs</button>
        </div>
        <SearchInputs />
        <SearchResults/>
    </>
    )
}

export default HomePage