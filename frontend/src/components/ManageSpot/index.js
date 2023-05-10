import { useDispatch, useSelector } from "react-redux"
import "./ManageSpot.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import { fetchSpots } from "../../store/spots"
import SingleSpotDetail from "../SingleSpotDetail"


const ManageSpot = () => {

    const spotObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotObj)

    const user = useSelector(state => state.session.user)
    const currentUserSpot = spots.filter(spot => spot.ownerId === user.id)
    // console.log(currentUserSpot)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return (
        <div className="manage-spot-page">
            <div className="manage-spot-header">
                {currentUserSpot.length ?
                    <h1 className="manage-spot-title">Manage your spots</h1> : <h1 className="manage-spot-title">Add a spot</h1>
                }
                <button
                    className="create-new-spot-manage-button"
                    onClick={(e) => history.push(`/spots/new`)}
                >
                    Create a New Spot
                </button>
            </div>
            <div className="current-user-spot">
                {currentUserSpot.length > 0 && currentUserSpot.map(spot =>
                    <SingleSpotDetail key={spot.id} manage={true} spot={spot} />
                )}
            </div>
        </div>
    )

}



export default ManageSpot
