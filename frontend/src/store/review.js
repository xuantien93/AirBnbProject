import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS_BY_SPOTID = 'review/GET_ALL_REVIEWS_BY_SPOTID'
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'


export const getAllReviewsBySpotId = (reviews) => ({
    type: GET_ALL_REVIEWS_BY_SPOTID,
    reviews
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const getAllReviewsBySpotIdThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviewsObj = await response.json()
        const reviews = reviewsObj.Reviews
        dispatch(getAllReviewsBySpotId(reviews))
        return reviews
    }
}


export const createReviewThunk = (data) => async dispatch => {
    const { id, review, stars } = data
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review, stars })
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(createReview(review))
        return review
    } else {
        const errRes = await response.json()
        return errRes
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
        case DELETE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.reviewId]
            return newState
        }
        default: {
            return state
        }
    }
}

export default reviewReducer
