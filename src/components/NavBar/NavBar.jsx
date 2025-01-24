import SearchInputs from "../SearchInputs/SearchInputs"

const NavBar = () => {
    return (
    <>
        <div className="navbar">
        <button className="home">Home</button>
        <button className="savedjobs">Saved Jobs</button>
        </div>
        <SearchInputs />
    </>
    )
}

export default NavBar