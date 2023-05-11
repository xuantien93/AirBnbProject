import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { createReviewThunk, getAllReviewsBySpotIdThunk } from "../../store/review"
import "./CreateReviewModal.css"
import { fetchSingleSpot } from "../../store/spots"


const CreateReviewModal = ({ spotId }) => {

    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")

    const { closeModal } = useModal()
    const [activeRating, setActiveRating] = useState(1)

    const dispatch = useDispatch()



    const handleClick = async (e) => {
        e.preventDefault()

        const payload = {
            id: spotId,
            review,
            stars
        }


        let newReview = await dispatch(createReviewThunk(payload))
        if (newReview) {
            dispatch(fetchSingleSpot(spotId)).then(() => closeModal())
        }
        window.location.reload(false);
    }

    return (
        <form onSubmit={handleClick}>
            <div className="create-review-modal">
                <h2>How was your stay?</h2>
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
