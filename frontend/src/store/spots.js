import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const DELETE_SPOT = "spots/DELETE_SPOT"

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots

})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})







export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }
};

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
        default:
            return state;

    }
}

export default spotsReducer
