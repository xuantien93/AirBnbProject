import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getAllBookingThunk } from "../../store/booking"
import { cleanUp } from "../../store/spots"
import "./ManageBooking.css"
import BookingDetail from "./BookingDetail"



const ManageBooking = () => {
    const [loading, setLoading] = useState(true)
    const bookingObj = useSelector(state => state.bookings.spot)
    const bookings = Object.values(bookingObj)
    // const userBookObj = useSelector(state => state.bookings.user)
    // const userBooking = Object.values(userBookObj)
    // console.log("this is userbook", userBooking)

    // console.log("this is bookings", bookings)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllBookingThunk()).then(() => setLoading(false))
        return () => dispatch(cleanUp())
    }, [dispatch])

    if (!user) {
        history.push('/')
    }

    let date = new Date()
    let dateNow = new Date(date).setHours(0, 0, 0, 0)

    let futureBook = bookings.filter(booking => {
        const curBook = new Date(booking.startDate)
        return curBook >= dateNow
    })
    // console.log("this is future book", futureBook)

    let pastBook = bookings.filter(booking => {
        const curBook = new Date(booking.endDate)
        return curBook < dateNow
    })

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="manage-booking-page">
            <h2>Your trips</h2>
            {!futureBook.length && (
                <div className="no-booking-yet">
                    <h3>No bookings yet!</h3>
                    <p>Let's get you started on a journey</p>
                    <button className="view-all-spot-button" onClick={() => { history.push("/") }}>
                        View all spots
                    </button>
                </div>
            )}
            {futureBook.length > 0 && futureBook.toReversed().map(booking => {
                return (<div key={booking.id} className="booking-show">
                    <BookingDetail booking={booking} future={true} />
                </div>)
            })}
            {pastBook.length > 0 && <h2>Your past trips</h2>}
            <div className="manage-booking-page-2">
                {pastBook.toReversed().map(booking => {
                    return (<div key={booking.id} className="booking-show">
                        <BookingDetail booking={booking} future={false} />
                    </div>)
                })}
            </div>
        </div>
    )
}


export default ManageBooking
