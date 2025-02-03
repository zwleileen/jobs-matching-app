import { useNavigate } from "react-router"

const SavedResults = (props) => {

    const navigate = useNavigate();

    const handleClick = (link, event) => {
        if (event.target.closest('.unsave-btn')) return;
        window.open(link, '_blank', 'noopener,noreferrer')
    }

    const handleUnsave = (result) => {
        const newSavedResults = props.savedResults.filter(item => item.id !== result.id)
        props.setSavedResults(newSavedResults);
    }

    return (
        <>
        <div className="savedresults">
        <button onClick={() => navigate(`/`)}>Home</button>
        </div> 
        <div className="savedresultsbox">
            {!props.savedResults.length ? (
            <p>You have not saved any job</p> 
            ) : (
            <ul>
            {props.savedResults.map((result) => {
                const matchingDetail = props.companyDetails.find(detail => Number(detail.id) === Number(result.companyId));
                return (
                <li key={result.id} onClick={(event) => handleClick(result.link, event)} style={{ cursor: 'pointer' }}>
                    <button className="unsave-btn" onClick={() => handleUnsave(result)}>
                    <i className="material-icons">favorite</i>
                    </button>
                    <h3>{result.company}</h3>
                    <p>Role: {result.role}</p>
                    {matchingDetail ? (
                    <>
                    <p>Industry: {matchingDetail.industries.length ? matchingDetail.industries.join(', ') : 'Not sure, click to read on'}</p> 
                    </>
                ) : (
                    <>
                    <p>Industry: Not sure, click to read on</p>
                    </>
                )}
                </li>
            )})}
            </ul>
            )}
        </div>
        </>
    )
}

export default SavedResults

