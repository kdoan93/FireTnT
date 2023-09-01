import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const POST_SPOT_IMAGE = 'spots/POST_SPOT_IMAGE';

// POJO action creator
const postAnImage = spotImage => {
    return {
        type: POST_SPOT_IMAGE,
        spotImage
    }
};

// POST spotImage thunk action
export const createSpotImage = (spotImage, spotId) => async (dispatch) => {
    const { url, preview } = spotImage;
    // console.log('spotId: ', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({ url, preview })
    })
    const data = await response.json()
    console.log('store/spotsImages response: ', data)
    return data;
}

const initialState = {}

// const spotImageReducer = ( state = initialState, action) => {

// }
