import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const DELETE_SPOT = "spots/DELETE_SPOT"
const GET_SPOT_BY_SPOTID = "spots/GET_SPOT_BY_SPOTID"

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots

})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

export const getSpotById = (spot) => ({
    type: GET_SPOT_BY_SPOTID,
    spot
})





export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }
};

export const fetchSingleSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getSpotById(spot))
        return spot
    }
}

export const deleteSingleSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteSpot(spotId))
    }
}


const initialState = { allSpots: null, singleSpot: null }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: null };
            const spots = action.spots.Spots
            spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState
        }
        case DELETE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            delete newState.allSpots[action.spotId]
            return newState
        }
        case GET_SPOT_BY_SPOTID: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.singleSpot = action.spot
            return newState
        }
        default:
            return state;

    }
}

export default spotsReducer
