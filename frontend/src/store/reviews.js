import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

// POJO action creator
const getAllReviews = (review, spotId) => {
    return { type: GET_ALL_REVIEWS, review, spotId }
};

const deleteAReview = reviewId => {
    return { type: DELETE_REVIEW, reviewId }
}

// THUNK to create a review
export const createReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(getSpotReviews(review.spotId))
        return review
    } else {
        const errors = await response.json()
        return errors;
    }
}

// Thunk action to get all spot reviews
export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const review = await response.json()
        dispatch(getAllReviews(review))
        return review
    } else {
        const errors = await response.json();
        return errors;
    }
}

// Thunk action to delete review
export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteAReview(reviewId))
        return response
    } else {
        const errors = await response.json()
        return errors;
    }
}


// key into second
const initialState = { spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_REVIEWS:
            newState = { ...state, spot: { } };
            action.review.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            return newState;

        case DELETE_REVIEW:
            newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.reviewId]
            return newState;

        default:
            return state;
    }
}

export default reviewReducer;
