import { useDispatch, useSelector } from "react-redux"
import "./SpotReviews.css"
import { useEffect } from "react"
import { fetchSingleSpot } from "../../store/spots"
import { getAllReviewsBySpotIdThunk } from "../../store/review"
import OpenModalButton from "../OpenModalButton"
import CreateReviewModal from "./CreateReviewModal"
import DeleteReviewModal from "./DeleteReviewModal"

const SpotReviews = ({ reviews, spotId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session)
    const reviewObj = useSelector(state => state.reviews.spot)
    // const reviews = Object.values(reviewObj)
    const spot = useSelector(state => state.spots.singleSpot)


    useEffect(() => {
        dispatch(fetchSingleSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getAllReviewsBySpotIdThunk(spotId))
    }, [dispatch, spotId])

    // console.log("this is user", user)
    // console.log("this is spot", spot)
    // console.log("this is review", reviews)

    if (!spot || !spotId || !user) return null

    let months = {
        "01": "January",
        "02": "Feburary",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    const newReviews = reviews.toReversed()

    return (
        <div>
            {(user?.id !== spot.ownerId) && !(reviews.find(review => review.userId === user.id)) &&
                <div>
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReviewModal spotId={spotId} />}
                    />
                </div>}
            {!reviews.length && user.id !== spot.ownerId ?
                (<div>
                    <p>Be the first to post a review!</p>
                </div>) :
                (<div>
                    {newReviews.map(review => {
                        return !review.User ? null :
                            (
                                <div>
                                    <div className="review-detail">
                                        <h3>{review.User.firstName} {review.User.lastName}</h3>
                                        <p className="review-date">{months[review.createdAt.slice(5, 7)]} {review.createdAt.slice(0, 4)}</p>
                                        <p>{review.review}</p>
                                        {review.userId === user?.id &&
                                            <div>
                                                <OpenModalButton
                                                    buttonText="Delete Review"
                                                    modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                    })}
                </div>)
            }
        </div>
    )

}





export default SpotReviews
