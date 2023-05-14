import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import './SpotBySpotId.css'
import { fetchSingleSpot } from "../../store/spots"
import { getAllReviewsBySpotIdThunk } from "../../store/review"
import SpotReviews from "../SpotBySpotId/SpotReviews"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import CreateBookingModal from "../ManageBooking/CreateBookingModal"


const SpotBySpotId = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const reviewObj = useSelector(state => state.reviews.spot)
    const user = useSelector(state => state.session.user)
    const reviews = Object.values(reviewObj)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchSingleSpot(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getAllReviewsBySpotIdThunk(id))
    }, [dispatch, id])


    if (!spot || !reviews || !spot.Owner) return null

    let previewImg = [];
    let nonPreviewImg = [];

    if (spot.SpotImages && spot.SpotImages.length > 0) {
        previewImg = spot.SpotImages.find(image => image.preview === true)
        nonPreviewImg = spot.SpotImages.filter(image => image.preview === false)
    }

    // const handleReserve = () => {
    //     history.push(`/bookings/current`)
    // }

    // console.log("this is spot", spot)

    return (

        <div className="spot-id-container">
            <div className="spot-id-header">
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            </div>
            <div className="image-box">
                <div className="big-image">
                    <img src={previewImg ? previewImg.url : "https://i.imgur.com/IySASzx.jpg"}></img>
                </div>
                <div className="small-image">
                    {nonPreviewImg.length > 0 && nonPreviewImg.map(image =>
                        <img key={image.id} src={image.url}></img>)}
                </div>
            </div>

            <div className="spot-description">
                <div className="hosted-description">
                    <div className="hosted-to-reserve">
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p id="description-tag">{spot.description}</p>
                    </div>
                    <div className="spot-info-box">
                        <div className="price-review-rating">
                            <div className="price-review">

                                <p><span className="price">${Number(spot.price).toFixed(2)}</span> per night</p>
                                {reviews.length ? <h5><i id="fa-star-review" className="fa-solid fa-star review"></i> {spot.avgStarRating} · {spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}</h5>
                                    : <h5><i id="fa-star-review" className="fa-solid fa-star review"></i> New</h5>
                                }
                            </div>
                            {/* <button onClick={handleReserve} className="reserve-button">Reserve</button> */}
                            {user && user.id !== spot.Owner.id ? < OpenModalButton
                                buttonText="Reserve"
                                modalComponent={<CreateBookingModal spot={spot} />}
                            /> : user ?
                                <button disabled className="reserve-button">Reserve</button>
                                : <button disabled className="reserve-button">Login to Reserve</button>}
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="spot-reviews-details">
                    {reviews.length ?
                        <>
                            <h3 className="icon-review"><i id="fa-star-review" className="fa-solid fa-star"></i> {spot.avgStarRating} · {spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}</h3>
                            <SpotReviews reviews={reviews} spotId={id} />
                        </>
                        : <>
                            <h3><i id="fa-star-review" className="fa-solid fa-star"></i> New</h3>
                            <SpotReviews reviews={reviews} spotId={id} />
                        </>
                    }
                </div>
            </div>

        </div>

    )
}







export default SpotBySpotId
