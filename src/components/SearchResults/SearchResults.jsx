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
        ) : (
        <ul>
        {props.searchResults.map((result) => (
            <li key={result.id} onClick={(event) => handleClick(result.link, event)} style={{ cursor: 'pointer' }}>
                <button className="save-btn" onClick={() => handleSave(result)}>
                <i className="material-icons">favorite</i>
                </button>
                <h3>{result.company}</h3>
                <p>{result.role}</p>
                <p>{result.location}</p>
            </li>
        ))}
        </ul>
        )}
        </>
    )
}

export default SearchResults