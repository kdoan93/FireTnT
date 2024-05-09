import { csrfFetch } from "./csrf";


const GET_ALL_BOOKINGS = '/GET_ALL_BOOKINGS'
const ADD_BOOKING = 'booking/ADD_BOOKING'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'


const getAllBookings = (booking, spotId) => {
    return { type: GET_ALL_BOOKINGS, booking, spotId}
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
        const booking = await response.json()
        dispatch(getAllBookings(booking))
        return booking
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
            action.booking.Bookings.forEach(booking => {
                newState.spot[booking.id] = booking
            })
            return newState

        default:
            return state
    }
}


export default bookingReducer;
