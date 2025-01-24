const SearchResults = (props) => {

    return (
        <>
        {!props.searchResults.length ? (
        <p>No result to show, try modifying your search</p> 
        ) : (
        <ul>
        {props.searchResults.map((result) => (
            <li key={result.id}>
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