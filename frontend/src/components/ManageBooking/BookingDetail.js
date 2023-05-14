import { useHistory } from "react-router-dom"
import "./ManageBooking.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchSpots } from "../../store/spots"
import { loadReviewThunk } from "../../store/review"
import OpenModalButton from "../OpenModalButton"
import DeleteBookingModal from "./DeleteBookingModal"
import CreateReviewModal from "../SpotBySpotId/CreateReviewModal"



const BookingDetail = ({ booking, future }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSpots()).then(() => dispatch(loadReviewThunk()))
    }, [dispatch])
    const user = useSelector(state => state.session.user)
    const reviewObj = useSelector(state => state.reviews.spot)
    const reviews = Object.values(reviewObj)
    console.log("this is review ", reviews)
    // console.log("this is booking", booking)


    const spotObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotObj)
    // console.log("this is spots", spots)
    // console.log("this is booking", booking)
    let previewImg = spots.find(spot => spot.id === booking.spotId)
    if (previewImg) {
        previewImg = previewImg.previewImage
    }
    let userSpotReviewObj = reviews.find(review => review.spotId === booking.spotId)
    console.log('this is user spot review', userSpotReviewObj)
    let spot = booking.Spot
    let startDate = booking.startDate
    let endDate = booking.endDate
    return (
        <div className="booking-detail-container">
            <img className="booking-date-container-img" src={previewImg} onClick={() => history.push(`/spots/${spot.id}`)}></img>
            <div className="booking-detail">
                <div className="booking-detail-city-name">
                    <h3 onClick={() => history.push(`/spots/${spot.id}`)}>{spot.city}</h3>
                    <h3 onClick={() => history.push(`/spots/${spot.id}`)}>{spot.name}</h3>
                </div>
                <div className="booking-date-container">
                    {future && (
                        <>
                            <span>Begins {startDate}</span>
                            <span>Ends {endDate}</span>
                            <OpenModalButton
                                buttonText="Cancel Booking"
                                modalComponent={<DeleteBookingModal bookingId={booking.id} spotId={spot.id} />}
                            />
                        </>
                    )}
                    {!future && (
                        <>
                            <span>Started {startDate}</span>
                            <span>Ended {endDate}</span>
                            {/* {!userSpotReview.length && (
                            <>
                            <OpenModalButton
                            buttonText="Post a Review"
                            modalComponent={<CreateReviewModal spotId={spot.id} />}
                            />
                            </>
                        )} */}
                        </>
                    )}
                </div>
            </div>
        </div>

    )


}



export default BookingDetail
