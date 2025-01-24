import { useNavigate } from "react-router"

const SavedResults = () => {

    const navigate = useNavigate();

    return (
        <>
        <div className="savedresults">
        <button onClick={() => navigate(`/`)}>Home</button>
        </div> 
        <div className="savedresultsbox">
        <p>You have not saved any job</p>
        </div>
        </>
    )
}

export default SavedResults