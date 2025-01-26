import { useNavigate } from "react-router"

const SearchResults = (props) => {

    const navigate = useNavigate();

    const handleClick = (link, event) => {
        if (event.target.closest('.save-btn')) return;
        window.open(link, '_blank', 'noopener,noreferrer')
    }

    const handleSave = (result) => {
        props.setSavedResults([...props.savedResults, result]);
        navigate(`/savedjobs`);
    }

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
            return(
            <li key={result.id} onClick={(event) => handleClick(result.link, event)} style={{ cursor: 'pointer' }}>
                <button className="save-btn" onClick={() => handleSave(result)}>
                <i className="material-icons">favorite</i>
                </button>
                <h3>{result.company}</h3>
                <p>Role: {result.role}</p>  
                {matchingDetail ? (
                    <>
                    <p>Industry: {Array.isArray(matchingDetail.industries) ? matchingDetail.industries.join(', ') : 'Not sure, click to read on'}</p> 
                    {/* <p>Description: {matchingDetail.description || 'Click to find out'}</p> */}
                    </>
                ) : (
                    <>
                    <p>Industry: Not sure, click to read on</p>
                    {/* <p>Description: Click to find out</p> */}
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