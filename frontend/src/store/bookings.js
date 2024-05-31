import { csrfFetch } from "./csrf";


const GET_ALL_BOOKINGS = '/GET_ALL_BOOKINGS'
const ADD_BOOKING = 'booking/ADD_BOOKING'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'


const getAllBookings = (booking, spotId) => {
    return { type: GET_ALL_BOOKINGS, booking, spotId}
}

const addBooking = (booking) => {
    return { type: ADD_BOOKING, booking }
}

const removeBooking = (bookingId) => {
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

export const createBooking = (booking, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(addBooking(booking))
        return booking
    } else {
        const errors = await response.json()
        return errors
    }
}

export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeBooking(bookingId))
        return response
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
            newState = { ...state, booking: {} }
            action.booking.Bookings.forEach(booking => {
                newState.booking[booking.id] = booking
            })
            return newState

        case ADD_BOOKING:
            newState = { ...state, booking: { ...state.booking } }
            newState.booking[action.booking.id] = action.booking
            return newState

        case DELETE_BOOKING:
            newState = { ...state, booking: { ...state.booking } }
            delete newState.booking[action.bookingId]
            return newState

        default:
            return state
    }
}


export default bookingReducer;