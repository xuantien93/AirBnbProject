import { useState, useEffect } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createReviewThunk, updateReviewThunk } from "../../store/review"
import "./CreateReviewModal.css"
import { fetchSingleSpot } from "../../store/spots"


const CreateReviewModal = ({ spot, spotId, manageReview, spotName, reviewId, reviewSpot }) => {



    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [activeRating, setActiveRating] = useState(1)

    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.reviews.spot)

    useEffect(() => {
        if (manageReview) {
            setReview(reviewsObj[reviewId].review);
            setStars(reviewsObj[reviewId].stars)
            setActiveRating(reviewsObj[reviewId].stars)
            // console.log(reviewsObj[reviewId]);
        }
    }, [manageReview]);

    const handleClick = async (e) => {
        e.preventDefault()

        const payload = {
            id: manageReview === true ? reviewId : spotId,
            review,
            stars
        }


        let newReview = await dispatch(manageReview === true ? updateReviewThunk(payload, reviewSpot) : createReviewThunk(payload, user))
        if (newReview) {
            dispatch(fetchSingleSpot(spotId)).then(() => closeModal())
        }
    }

    return (
        <form onSubmit={handleClick}>
            <div className="create-review-modal">
                {manageReview ? <h2>How was your stay {`at ${spotName}`}?</h2> : <h2>How was your stay {`at ${spot.name}`}?</h2>}
                <textarea
                    className="review-modal-text"
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={8}
                    cols={30}
                />

                <div className="star-rating-input">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(1)}
                        onClick={() => setStars(1)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(2)}
                        onClick={() => setStars(2)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(3)}
                        onClick={() => setStars(3)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(4)}
                        onClick={() => setStars(4)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(5)}
                        onClick={() => setStars(5)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                </div>
                <button type="submit" className="submit-review-button-modal" disabled={(review.length < 10) || !stars}>Submit Your Review</button>
            </div>
        </form>
    )

}




export default CreateReviewModal
