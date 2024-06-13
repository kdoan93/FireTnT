import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { getUserBookings } from "../../store/bookings"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteBookingModal } from "./deleteBookingModal";


function Trips() {
    const dispatch = useDispatch()
    let userBookings = useSelector(state => state.booking.booking)
    // console.log("userBookings ", userBookings)

    let booked = []

    useEffect(() => {
        dispatch(getUserBookings())
        }, [dispatch])

    if (!userBookings) return null
    userBookings = Object.values(userBookings)

    return (
        <>
            <div className="tripsContainer">
                {userBookings.map(booking => (
                    <div className={`singleTripContainer`}>
                        <NavLink key={`${booking.id}`} className='trip' to={`/spots/${booking.spotId}`} >
                            <div className="image">
                                <img className="bookingPreviewImg" src={booking.Spot.previewImage} alt="bookingImg" />
                            </div>
                            <div className="tripDetails">
                                <p>
                                    Booking location: {booking.Spot.city}
                                </p>
                                <p>
                                    Hosted by: {booking.Spot.ownerId}
                                </p>
                                <p>
                                    Start: {booking.startDate}
                                </p>
                                <p>
                                    End: {booking.endDate}
                                </p>
                            </div>
                        </NavLink>
                        <div className="bottomButtons">
                            <OpenModalMenuItem  itemText='Delete Booking' modalComponent={<DeleteBookingModal bookingId={booking.id} />} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default Trips
