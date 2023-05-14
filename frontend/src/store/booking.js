import { csrfFetch } from "./csrf";

const GET_ALL_BOOKING_USER = 'booking/GET_ALL_BOOKING_USER'
const GET_BOOKING_BY_SPOTID = 'booking/GET_BOOKING_BY_SPOTID'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'

export const getAllBooking = (bookings) => ({
    type: GET_ALL_BOOKING_USER,
    bookings
})

export const getBookingBySpotId = (bookings) => ({
    type: GET_BOOKING_BY_SPOTID,
    bookings
})

export const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

export const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
})

export const getAllBookingThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(getAllBooking(bookings))
        return bookings
    }
}

export const getBookingBySpotIdThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const bookingsObj = await response.json()
        const bookings = bookingsObj.Bookings
        dispatch(getBookingBySpotId(bookings))
        return bookings
    }
}

export const deleteBookingThunk = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteBooking(bookingId))
    }
}

export const createBookingThunk = (spotId, data) => async dispatch => {
    const { startDate, endDate } = data
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate })
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(createBooking(booking))
        return booking
    } else {
        const error = await response.json()
        return error
    }
}

const initialState = { user: {}, spot: {} }


const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BOOKING_USER: {
            const newState = { ...state, user: {}, spot: { ...state.spot } }
            const bookingsArr = action.bookings.Bookings
            bookingsArr.forEach(booking => newState.spot[booking.id] = booking)
            return newState
        }
        case GET_BOOKING_BY_SPOTID: {
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            const bookings = action.bookings
            bookings.forEach(booking => newState.spot[booking.id] = booking)
            return newState
        }
        case CREATE_BOOKING: {
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            newState.spot[action.booking.id] = action.booking
            return newState
        }
        case DELETE_BOOKING: {
            const newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.bookingId]
            return newState
        }
        default:
            return state
    }
}


export default bookingReducer
