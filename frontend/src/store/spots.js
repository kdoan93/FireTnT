import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT = 'spots/GET_SPOT';
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS';
const DELETE_SPOT = 'spots/DELETE_SPOT'

// POJO action creator
const getAllSpots = spot => {
    return {
        type: GET_ALL_SPOTS,
        spot
    }
};

const getASpot = spot => {
    return {
        type: GET_SPOT,
        spot
    }
};

const getAllUserSpots = spot => {
    return {
        type: GET_USER_SPOTS,
        spot
    }
}

const deleteASpot = spotId => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}


// Thunk action to get all spots
export const getSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`)
    // console.log('response: ', response)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getAllSpots(spot))
        // console.log('spots', spot)
        return spot
    } else {
        const errors = await response.json();
        return errors
    }
};

// Thunk action to get Current User's spots
export const getUserSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    if (response.ok) {
        const userSpots = await response.json()
        dispatch(getAllUserSpots(userSpots))
        // console.log('STORE/SPOTS userSpots: ', userSpots)
        // userSpots.map(spot => spot.ownerId)
        return userSpots
    } else {
        const errors = await response.json()
        // console.log('errors in store/spots ', errors)
        return errors
    }
}

// Thunk to GET a spot
export const getSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getASpot(spot))
        // console.log('getSpot: ', spot)
        return spot
    } else {
        const errors = await response.json();
        return errors;
    }
}

// CreateSpot thunk action
export const createSpot = (spot) => async (dispatch) => {

    // console.log('createSpot spot: ', spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })
    const newSpot = await response.json()
    dispatch(getASpot(newSpot))
    console.log('createSpot THUNK newSpot: ', newSpot)
    return newSpot
};

// THUNK action to delete spot
export const deleteSpot = (spotId) => async dispatch => {
    // fetch must be made to URL path
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    console.log('response BEFORE delete response: ', response)
    dispatch(deleteASpot(spotId))
    console.log('response AFTER delete response: ', response)
    return response;
};

// THUNK to update spot
export const updateSpot = spot => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(getASpot(updatedSpot))
        return updatedSpot;
    }
}


// key into 2nd
const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } }
// const initialState = { allSpots: {}, singleSpot: {} }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_SPOTS:
            newState = { ...state, allSpots: {} };
            // key into 'spot' from action creator and 'Spots' from the return in backend route
            action.spot.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;

        case GET_SPOT:
            newState = { ...state, singleSpot: {} }
            newState.singleSpot = action.spot;
            return newState;

        case GET_USER_SPOTS:
            newState = { ...state, allSpots: {} };
            action.spot.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState;

        case DELETE_SPOT:
            // spreading state and making copy of allSpots and singleSpot
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            // delete wanted action.spotId within newState.allSpots object
            delete newState.allSpots[action.spotId]
            // return the rest of the remaining newState.allSpots object
            return newState;

        default:
            return state;
    }
}

export default spotsReducer;
