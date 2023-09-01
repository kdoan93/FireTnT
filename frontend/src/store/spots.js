import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT = 'spots/GET_SPOT';

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

        default:
            return state;
    }
}

// CreateSpot thunk action
export const createSpot = (spot) => async (dispatch) => {

    // console.log('createSpot spot: ', spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify( spot )
    })
    const data = await response.json()
    console.log('data: ', data)
    dispatch(getASpot(data.spot))
    return data
};

export default spotsReducer;
