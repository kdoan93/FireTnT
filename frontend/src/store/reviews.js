import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const GET_REVIEW = 'reviews/GET_REVIEW';

// POJO action creator
const getReview = review => {
    return {
        type: GET_REVIEW,
        review
    }
};


// Thunk action to get all spots
export const getReview = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/`)
}
