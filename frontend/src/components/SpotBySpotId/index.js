import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import './SpotBySpotId.css'
import { fetchSingleSpot } from "../../store/spots"


const SpotBySpotId = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    useEffect(() => {
        dispatch(fetchSingleSpot(id))
    }, [dispatch, id])

    console.log(spot)
    if (!spot) return null

    let previewImg = [];
    let nonPreviewImg = [];

    if (spot.SpotImages && spot.SpotImages.length > 0) {
        previewImg = spot.SpotImages.find(image => image.preview === true)
        nonPreviewImg = spot.SpotImages.filter(image => image.preview === false)
    }


    return (
        <div className="spot-id">
            <div className="spot-id-container">
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
                <div className="image-box">
                    <div className="big-image">
                        <img src={previewImg ? previewImg.url : "https://i.imgur.com/IySASzx.jpg"}></img>
                    </div>
                    <div className="small-image">
                        {nonPreviewImg.length > 0 && nonPreviewImg.map(image =>
                            <img key={image.id} src={image.url}></img>)}
                    </div>
                    <div className="spot-detail">
                        <div className="spot-description">
                            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                            <p>{spot.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}







export default SpotBySpotId
