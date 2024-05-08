import { csrfFetch } from "./csrf";


const GET_ALL_BOOKINGS = 'bookings/GET_ALL_BOOKINGS'
const ADD_BOOKING = 'bookings/ADD_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'


const getAllBookings = (bookings, spotId) => {
    return { type: GET_ALL_BOOKINGS, bookings, spotId}
}

const addBooking = (bookingId) => {
    return { type: ADD_BOOKING, bookingId }
}

const deleteBooking = (bookingId) => {
    return { type: DELETE_BOOKING, bookingId }
}


export const getSpotBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(getAllBookings(bookings, spotId))
        return bookings
    } else {
        const errors = await response.json()
        return errors
    }
}


const initialState = { spot: {}, user: {} }

const bookingReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ALL_BOOKINGS:
            newState = { ...state, spot: {} }
            action.bookings.Bookings.forEach(booking => {
                newState.spot[booking.id] = booking
            })
            return newState

        default:
            return state
    }
}


export default bookingReducer;
