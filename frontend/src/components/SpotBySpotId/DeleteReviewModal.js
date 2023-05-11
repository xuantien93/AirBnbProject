import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/review";
import "./DeleteReviewModal.css"

const DeleteReviewModal = ({ reviewId, spotId }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteYes = () => {
        dispatch(deleteReviewThunk(reviewId))
        history.push(`/spots/${spotId}`);
        closeModal();
    }

    const deleteNo = () => {
        closeModal();
    }



    return (
        <div className="delete-review-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="delete-review-modal-button">
                <button onClick={deleteYes} className="delete-review-button">Yes (Delete Review)</button>
                <button onClick={deleteNo} className="no-delete-review-button">No (Keep Review)</button>
            </div>
        </div>
    )
}



export default DeleteReviewModal
