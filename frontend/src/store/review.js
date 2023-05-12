import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS_BY_SPOTID = 'review/GET_ALL_REVIEWS_BY_SPOTID'
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'
const LOAD_REVIEWS = 'review/LOAD_REVIEWS'
const UPDATE_REVIEWS = 'review/UPDATE_REVIEWS'


export const loadReview = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const getAllReviewsBySpotId = (reviews) => ({
    type: GET_ALL_REVIEWS_BY_SPOTID,
    reviews
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const updateReview = (review) => ({
    type: UPDATE_REVIEWS,
    review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const loadReviewThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(loadReview(reviews))
        return reviews
    }
}

export const getAllReviewsBySpotIdThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviewsObj = await response.json()
        const reviews = reviewsObj.Reviews
        dispatch(getAllReviewsBySpotId(reviews))
        return reviews
    }
}


export const createReviewThunk = (data, user) => async dispatch => {
    const { review, stars } = data
    const { id, firstName, lastName } = user
    const response = await csrfFetch(`/api/spots/${data.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review, stars })
    })
    if (response.ok) {
        const review = await response.json()
        review.User = {
            id,
            firstName,
            lastName
        }
        dispatch(createReview(review))
        return review
    } else {
        const errRes = await response.json()
        return errRes
    }
}

export const updateReviewThunk = (data, reviewSpot) => async dispatch => {
    const { review, stars } = data
    const response = await csrfFetch(`/api/reviews/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review, stars })
    })
    if (response.ok) {
        const review = await response.json()
        review.Spot = reviewSpot
        dispatch(updateReview(review))
        return review
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteReview(reviewId))
    }
}

const initialState = { spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS_BY_SPOTID: {
            const newState = { ...state, spot: {} }
            const reviews = action.reviews
            reviews.forEach(review => newState.spot[review.id] = review)
            return newState
        }
        case CREATE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } }
            newState.spot[action.review.id] = action.review
            return newState
        }
        case UPDATE_REVIEWS: {
            const newState = { ...state, spot: { ...state.spot } }
            newState.spot[action.review.id] = action.review
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.reviewId]
            return newState
        }
        case LOAD_REVIEWS: {
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            const reviews = action.reviews.Reviews
            reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default reviewReducer
