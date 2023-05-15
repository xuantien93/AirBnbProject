import "./ManageReview.css"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"
import { cleanUp } from "../../store/spots"
import { loadReviewThunk } from "../../store/review"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from "../SpotBySpotId/DeleteReviewModal"
import CreateReviewModal from "../SpotBySpotId/CreateReviewModal"


const ManageReview = () => {
    const [loading, setLoading] = useState(true);
    const reviewsObj = useSelector(state => state.reviews.spot)
    const reviews = Object.values(reviewsObj)


    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(loadReviewThunk())
            .then(() => setLoading(false))
        return () => dispatch(cleanUp())
    }, [dispatch])

    if (!user) {
        history.push(`/`)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    let months = {
        "01": "January",
        "02": "February",
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


    return (
        <div className="manage-spot-page">
            <div className="manage-spot-header">
                {reviews.length ?
                    <h1 className="manage-spot-title">Manage your reviews</h1> : <h1 className="manage-spot-title">You currently have no reviews</h1>
                }
                <div>
                    {reviews.toReversed().map(review =>
                        review.userId === user.id && <div key={review.id}>
                            <div className="review-detail">
                                <h3>{review.Spot.name}</h3>
                                {/* <p className="review-date">{months[review.createdAt.slice(5, 7)]} {review.createdAt.slice(0, 4)}</p> */}
                                <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
                                <p className="review-review">{review.review}</p>
                                {(review.userId === user?.id) &&

                                    <div className="update-delete-review-modal">
                                        <OpenModalButton
                                            buttonText="Update"
                                            modalComponent={<CreateReviewModal spotName={review.Spot.name} reviewSpot={review.Spot} reviewId={review.id} spotId={review.spotId} manageReview={true} />}
                                        />
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review.spotId} manageReview={true} />}
                                        />
                                    </div>
                                }
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}



export default ManageReview
