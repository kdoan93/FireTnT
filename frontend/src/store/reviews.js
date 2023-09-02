import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_REVIEW = 'reviews/GET_REVIEW'

// POJO action creator
const getAllReviews = review => {
    return {
        type: GET_ALL_REVIEWS,
        review
    }
};

const getAReview = review => {
    return {
        type: GET_REVIEW,
        review
    }
}

// THUNK to create a review
export const createReview = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
}


// Thunk action to get all spots
export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const review = await response.json()
        // console.log('review: ', review)
        dispatch(getAllReviews(review))
        return review
    } else {
        const errors = await response.json();
        return errors;
    }
}


// key into second
const initialState = { allReviews: {} }

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_REVIEWS:
            newState = { ...state, allReviews: {} };
            // key into 'review' from above action creator and 'Reviews' from the return in backend route
            action.review.Reviews.forEach(review => {
                newState.allReviews[review.id] = review
            })
            return newState;

        default:
            return state;
    }
}

export default reviewReducer;
