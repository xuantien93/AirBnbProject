import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import './SpotIndex.css'
import SingleSpotDetail from "../SingleSpotDetail";



function SpotIndex() {
    const [loading, setLoading] = useState(true);
    const spotsObj = useSelector(state => state.spots.allSpots)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpots())
            .then(() => setLoading(false))
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!spotsObj) return null
    const spots = Object.values(spotsObj)


    return (
        <div className="body">
            <div className="spot-body">
                {spots.length > 0 && spots.map(spot => <SingleSpotDetail key={spot.id} spot={spot} />)}
            </div>
        </div>
    )
}

export default SpotIndex;
