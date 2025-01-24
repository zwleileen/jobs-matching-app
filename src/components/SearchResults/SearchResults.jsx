const SearchResults = (props) => {

    return (
        <>
        {!props.searchResults.length ? (
        <p>No result to show, try modifying your search</p> 
        ) : (
        <ul>
        {props.searchResults.map((result) => (
            <li key={result.id}>
                <h3>{result.role}</h3>
            </li>
        ))}
    </ul>
        )}
        </>
    )
}

export default SearchResults