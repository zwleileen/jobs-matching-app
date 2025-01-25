const SearchResults = (props) => {

    const handleClick = (link) => {
        window.open(link, '_blank', 'noopener,noreferrer')
    }

    return (
        <>
        {!props.searchResults.length ? (
        <p>No result to show, try modifying your search</p> 
        ) : (
        <ul>
        {props.searchResults.map((result) => (
            <li key={result.id} onClick={() => handleClick(result.link)} style={{ cursor: 'pointer' }}>
                <button className="save-btn">
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