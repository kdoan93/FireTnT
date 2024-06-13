import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserBookings } from "../../store/bookings"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteBookingModal } from "./deleteBookingModal";


function Trips() {
    const dispatch = useDispatch()
    let userBookings = useSelector(state => state.booking.booking)
    userBookings = Object.values(userBookings)
    console.log("userBookings ", userBookings)

    let booked = []

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    if (!userBookings) return null

    return (
        <>
            <div>
            <div>
                        {userBookings.map(booking => (
                            <div className={`bookingContainer`}>
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
                                <div className="bottomButtons">
                                    <OpenModalMenuItem  itemText='Delete Booking' modalComponent={<DeleteBookingModal bookingId={booking.id} />} />
                                </div>
                            </div>
                        ))}
                    </div>
                <h1>
                    TRIPS
                </h1>
                {/* Current and future trips will show here */}
            </div>

            <div>
                <h2>
                    Where you've been
                </h2>
                {/* Past trips will be shown here */}
            </div>
        </>
    )
}


export default Trips
