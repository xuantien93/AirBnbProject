import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import './SpotBySpotId.css'
import { fetchSingleSpot } from "../../store/spots"


const SpotBySpotId = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    console.log(spot)
    useEffect(() => {
        dispatch(fetchSingleSpot(id))
    }, [dispatch, id])

    if (!spot) return null

    return (
        <div className="spot-id">
            <div className="spot-id-container">
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
                <div className="image-box">
                    <div className="big-image">

                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}







export default SpotBySpotId
