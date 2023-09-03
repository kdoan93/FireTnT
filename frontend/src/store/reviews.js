import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_REVIEW = 'reviews/GET_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

// POJO action creator
const getAllReviews = review => {
    return { type: GET_ALL_REVIEWS, review } };

const getAReview = review => {
    return { type: GET_REVIEW, review } }

const deleteAReview = reviewId => {
    return { type: DELETE_REVIEW, reviewId } }

// THUNK to create a review
export const createReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        console.log('store/reviews review: ', review)
        console.log('store/reviews createReview response: ', response)
        const newReview = await response.json()
        dispatch(getAReview(newReview))
        return newReview
    } else {
        const errors = await response.json()
        return errors;
    }
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

        case DELETE_REVIEW:
            newState = { ...state, allReviews: { ...state.allReviews } }
            delete newState.allReviews[action.reviewId]

        default:
            return state;
    }
}

export default reviewReducer;
