import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react"
import { deleteBookingThunk } from "../../store/booking"
import { fetchSingleSpot } from "../../store/spots"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"



const DeleteBookingModal = ({ bookingId, spotId }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const deleteYes = () => {
        dispatch(deleteBookingThunk(bookingId))
            .then(() => dispatch(fetchSingleSpot(spotId)))
        history.push(`/bookings/current`)
        closeModal()
    }

    const deleteNo = () => {
        closeModal();
    }

    return (
        <div className="delete-review-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="delete-review-modal-button">
                <button onClick={deleteYes} className="delete-review-button">Yes (Delete Booking)</button>
                <button onClick={deleteNo} className="no-delete-review-button">No (Keep Booking)</button>
            </div>
        </div>
    )

}


export default DeleteBookingModal
