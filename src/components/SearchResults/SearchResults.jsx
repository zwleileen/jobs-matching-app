// import { useNavigate } from "react-router"

// import SavedResults from "../SavedResults/SavedResults";

const SearchResults = (props) => {

    // const navigate = useNavigate();

    const handleClick = (link, event) => {
        if (event.target.closest('.save-btn')) return;
        window.open(link, '_blank', 'noopener,noreferrer')
    }

    const saved = (result) => {
        return props.savedResults.some(saved => String(saved.id) === String(result.id));
    }

    const handleSave = async (result) => {

        //if saved(result) is true, unsave it 
        if (saved(result)) {
            const newSaved = props.savedResults.filter(item => String(item.id) !== String(result.id));
            props.setSavedResults(newSaved);
            return;
        }
        //else, save it
        try {
            const matchingDetail = props.companyDetails.find(
                detail => detail.id === result.companyId
            );

            const response = await props.jobService.create(result, matchingDetail);     

            if (response && response.records && response.records[0]) {
                // Update local state with the new record from Airtable
                props.setSavedResults(prevResults => [...prevResults, response.records[0].fields]);
                // navigate(`/savedjobs`);
            } else {
                console.error('Invalid response from Airtable');
            }
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };

    return (
        <>
        {!props.searchResults.length ? (
        <p>No result to show, try modifying your search</p> 
        ) : props.loading ? (
        <p>Loading...</p>
        ) : (
        <div>
        <p>Showing {props.count} results</p>
        <ul>
        {props.searchResults.map((result) => {
        
            const matchingDetail = props.companyDetails.find(detail => detail.id === result.companyId);
            const savedClassName = saved(result) ? 'saved' : '';

            return(
            <li key={result.id} onClick={(event) => handleClick(result.link, event)} style={{ cursor: 'pointer' }}>
                <button className={`save-btn ${savedClassName}`} onClick={() => handleSave(result)}>
                <i className="material-icons">favorite</i>
                </button>
                <h3>{result.company}</h3>
                <p>Role: {result.role}</p>  
                {matchingDetail ? (
                    <>
                    <p>Industry: {Array.isArray(matchingDetail.industries) ? matchingDetail.industries.join(', ') : 'Not sure, click to read on'}</p> 
                    </>
                ) : (
                    <>
                    <p>Industry: Not sure, click to read on</p>
                    </>
                )}
            </li>
        )})} 
        </ul>
        </div>
        )}    
        </>
    )
}

export default SearchResults