import { useNavigate } from "react-router"

const SavedResults = (props) => {

    const navigate = useNavigate();

    const handleUnsave = (result) => {
        const newSavedResults = props.savedResults.filter(item => item.id !== result.id)
        props.setSavedResults([...props.savedResults, newSavedResults]);
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
            {props.savedResults.map((result) => (
                <li key={result.id}>
                    <button className="unsave-btn" onClick={() => handleUnsave(result)}>
                    <i className="material-icons">favorite</i>
                    </button>
                    <h3>{result.company}</h3>
                    <p>{result.role}</p>
                    <p>{result.location}</p>
                </li>
            ))}
            </ul>
            )}
        </div>
        </>
    )
}

export default SavedResults