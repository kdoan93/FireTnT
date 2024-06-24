import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { getUserBookings } from "../../store/bookings"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteBookingModal } from "./deleteBookingModal";


function Trips() {
    const dispatch = useDispatch()
    let userBookings = useSelector(state => state.booking.booking)


    let booked = []

    function convertDate(start, end) {
        start = start.toString()
        end = end.toString()

        let dateStr = ''

        let monthNums = {
            '01': "Jan",
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec'
        }

        let startMonth = start.slice(5, 7)
        let startDays = start.slice(8, 10)
        let startYear = start.slice(0, 4)

        let endMonth = end.slice(5, 7)
        let endDays = end.slice(8, 10)
        let endYears = end.slice(0, 4)

        return dateStr + monthNums[startMonth] + ' ' + startDays + ' - ' + monthNums[endMonth] + ' ' + endDays + ', ' + endYears
    }

    useEffect(() => {
        dispatch(getUserBookings())
        }, [dispatch])

    if (!userBookings) return null
    userBookings = Object.values(userBookings)
    if (userBookings.length && !userBookings[0].Spot) return null
    // console.log("userBookings ", userBookings)

    return (
        <>
            <div className="title">My Trips</div>
            <div className="tripsContainer">
                {!userBookings.length ?
                <h2>You don't have any bookings yet, let's fix that!</h2>
                :
                userBookings.map(booking => (
                    <div className={`singleTripContainer`}>
                        <NavLink key={`${booking.id}`} className='trip' to={`/spots/${booking.spotId}`} >
                            <div className="image">
                                <img className="bookingPreviewImg" src={booking.Spot.previewImage} alt="bookingImg" />
                            </div>
                            <div className="tripDetails">
                                <p className="tripCity">
                                    {booking.Spot.city}
                                </p>
                                <p>
                                    Hosted by: {booking.Spot.ownerId}
                                </p>
                                <p>
                                    {convertDate(booking.startDate, booking.endDate)}
                                </p>
                                <p>
                                    {/* End: {convertDate(booking.endDate)} */}
                                </p>
                            </div>
                        </NavLink>
                        <div className="tripButton">
                                <OpenModalMenuItem className='delete' itemText='Delete Booking' modalComponent={<DeleteBookingModal bookingId={booking.id} />} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default Trips
