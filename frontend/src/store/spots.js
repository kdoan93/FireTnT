import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD';

// POJO action creator
const load = spot => {
    return {
        type: LOAD,
        spot
    }
};

// Thunk action to get all spots
export const getSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`)
    // console.log('response: ', response)
    if (response.ok) {
        const spot = await response.json()
        dispatch(load(spot))
        // console.log('spot', spot)
        return spot
    }
};



// key into 2nd
const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { ...state, allSpots: {}, singleSpot: {} };
            action.spot.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });

            return newState;
            default:
                return state;
    }
}

export default spotsReducer;
