import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD';

// POJO action creator
const load = list => {
    return {
        type: LOAD,
        list
    }
};

// Thunk action to get all spots
export const getSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`)

    if (response.ok) {
        const list = await response.json()
        dispatch(load(list))
        return list
    }
};




const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { ...state, allSpots: {}, singleSpot: {} };
            action.list.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });

            return newState;
            default:
                return state;
    }
}

export default spotsReducer;
