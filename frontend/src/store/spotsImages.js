import { csrfFetch } from "./csrf";
/*
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
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({ url, preview })
    })
    const data = await response.json()
    return data;
}

const initialState = {}

// const spotImageReducer = ( state = initialState, action) => {

// }
*/

// /*



// TYPE_CONSTANTS
const GET_ALL_SPOT_IMAGES = 'spots/GET_ALL_SPOT_IMAGES';
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE';

// POJO action creator
const getAllSpotImages = (image, spotId) => {
    return { type: GET_ALL_SPOT_IMAGES, image, spotId }
}

const createImage = spotImage => {
    return {
        type: CREATE_SPOT_IMAGE,
        spotImage
    }
};

export const getSpotImages = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`)
    if (response.ok) {
        const spotImages = await response.json()
        dispatch(getAllSpotImages(spotId))
        return spotImages
    } else {
        const errors = await response.json()
        return errors
    }
}

// POST spotImage thunk action
export const createSpotImage = (spotImage, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotImage)
    })
    if (response.ok) {
        const newImage = await response.json()
        dispatch(createImage(newImage))
        return newImage;
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = { singleSpot: { SpotImages: [] } }

const spotsImageReducer = ( state = initialState, action ) => {
    let newState;
    switch (action.type) {

        case GET_ALL_SPOT_IMAGES:
            newState = { ...state, singleSpot: {} }
            return newState

        // case CREATE_SPOT_IMAGE:
        //     newState = {
        //         ...state,
        //         all
        //     }

        default:
            return state;
    }

}

export default spotsImageReducer

// */
