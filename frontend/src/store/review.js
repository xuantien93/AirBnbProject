import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS_BY_SPOTID = 'review/GET_ALL_REVIEWS_BY_SPOTID'



const getAllReviewsBySpotId = (reviews) => ({
    type: GET_ALL_REVIEWS_BY_SPOTID,
    reviews
})



export const getAllReviewsBySpotIdThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getAllReviewsBySpotId(reviews))
        return reviews
    }
}


const initialState = { spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS_BY_SPOTID: {
            const newState = { ...state, spot: { ...state.spot }, user: {} }
            const reviews = action.reviews.Reviews
            reviews.forEach(review => newState.spot[review.id] = review)
            return newState
        }
        default: {
            return state
        }
    }
}

export default reviewReducer
