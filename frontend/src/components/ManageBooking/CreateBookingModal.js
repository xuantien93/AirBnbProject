import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { createBookingThunk, getAllBookingThunk } from "../../store/booking"




const CreateBookingModal = ({ spot }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        let errors = {}
        if (!startDate) errors.start = "Start date is required"
        if (!endDate) errors.end = "End date is required"
        let start = new Date(startDate)
        let end = new Date(endDate)
        if (end <= start) errors.end = "End date cannot be before Start Date"
        setValidationErrors(errors)
    }, [startDate, endDate])


    const handleClick = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const payload = {
            startDate,
            endDate
        }

        let newBooking = await dispatch(createBookingThunk(spot.id, payload)).then(() => dispatch(getAllBookingThunk()))
            .then(() => closeModal()).then(() => history.push(`/bookings/current`))
            .catch(async (res) => {
                let error = await res.json()
                error = error.errors
                // console.log(error)

                let err = {}
                if (error && error.message === "Authentication required") {
                    err.message = "Must logged in to request a booking"
                }

                if (error && error.startDate) {
                    err.start = error.startDate
                }
                if (error && error.endDate) {
                    err.end = error.endDate
                }

                if (!error) {
                    err.message = "Cannot submit booking. Please enter valid dates"
                }

                setValidationErrors(err)
                return
            })

    }

    return (
        <div className="booking-modal-container">
            <h3>Let's book your stay at {spot.name}</h3>
            {submitted && validationErrors.startDate && <p className="error-text">{validationErrors.startDate}</p>}
            {submitted && validationErrors.message && <p className="error-text">{validationErrors.message}</p>}
            {submitted && validationErrors.endDate && <p className="error-text">{validationErrors.endDate}</p>}
            <form className="booking-modal-form" onSubmit={handleClick}>
                <div className="start-date">
                    <label>Start Date</label>
                    <input type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    ></input>
                    {submitted && validationErrors.start && <p className="error-text">{validationErrors.start}</p>}
                </div>
                <div className="end-date">
                    <label>End Date</label>
                    <input type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    ></input>
                    {submitted && validationErrors.end && <p className="error-text">{validationErrors.end}</p>}
                </div>
                <button className="submit-booking" type="submit">Submit Booking</button>
            </form>
        </div>
    )

}



export default CreateBookingModal
