import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const DELETE_SPOT = "spots/DELETE_SPOT"
const GET_SPOT_BY_SPOTID = "spots/GET_SPOT_BY_SPOTID"
const CREATE_SPOT = "spots/CREATE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const CLEAN_UP = "spots/CLEAN_UP"

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots

})

export const cleanUp = () => ({
    type: CLEAN_UP
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

export const getSpotById = (spot) => ({
    type: GET_SPOT_BY_SPOTID,
    spot
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

// export const createSpotImage = (spot) => ({
//     type: CREATE_SPOT_IMAGE,
//     spot
// })




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

export const createASpot = (payload) => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price, spotImages } = payload
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price })
    })

    if (response.ok) {
        const newSpot = await response.json()
        for (let i = 0; i < spotImages.length; i++) {
            await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(spotImages[i])
            })
        }
        dispatch(createSpot(newSpot))
        return newSpot
    }
}

export const updateSpotThunk = (payload) => async dispatch => {
    const { id, address, city, state, country, lat, lng, name, description, price } = payload
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, address, city, state, country, lat, lng, name, description, price })
    })
    if (response.ok) {
        // console.log(response)
        const spot = await response.json()
        dispatch(updateSpot(spot))
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


const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
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
            const newState = { ...state, singleSpot: {} }
            newState.singleSpot = action.spot
            return newState
        }
        case CREATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots } }
            const spot = action.spot
            newState.singleSpot = spot
            newState.allSpots[spot.id] = spot
            return newState
        }
        case UPDATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots } }
            newState.allSpots[action.spot.id] = action.spot
            return newState
        }
        case CLEAN_UP: {
            return initialState
        }
        default:
            return state;

    }
}

export default spotsReducer
