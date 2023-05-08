import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteSingleSpot } from "../../store/spots";


const DeleteModal = ({ spotId }) => {

    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()


    const deleteYes = async () => {
        await dispatch(deleteSingleSpot(spotId))
        history.push(`/spots/current`)
        closeModal()
    }

    const deleteNo = async () => {
        closeModal()
    }

    return (
        <div className="delete-spot-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <div className="delete-spot-modal-button">
                <button onClick={deleteYes} className="delete-yes-button">Yes (Delete Spot)</button>
                <button onClick={deleteNo} className="delete-no-button">No (Keep Spot)</button>
            </div>
        </div>
    )

}



export default DeleteModal;
