import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteReviewModal } from "../ReviewModal/DeleteReviewModal";
import './SpotReviews.css'
import { getUserBookings } from "../../store/bookings";

const SpotReviews = () => {

    const dispatch = useDispatch();

    let { spotId } = useParams();
    spotId = parseInt(spotId)

    let sessionUser = useSelector(state => state.session.user)

    let reviews = useSelector(state => state.review.spot)

    let bookings = useSelector(state => state.booking.booking)

    console.log("bookings: ", bookings)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
        dispatch(getUserBookings())
    }, [dispatch, spotId])

    if (!reviews) return null
    if (!sessionUser) sessionUser = 0;
    if (!bookings) return

    function hasBooked() {
        let bookingsArr = Object.values(bookings)
        for (let booking of bookingsArr) {
            if (compareDates(booking.endDate, new Date())) console.log(`booking end date < today, ${booking.endDate}`)
        }
    }

    hasBooked()

    function compareDates(endBooking, today) {
        endBooking = endBooking.toString()
        today = today.toString()

        let bookingStr = ''
        let todayStr = ''

        let monthNums = {
            'Jan' : '01',
            'Feb' : '02',
            'Mar' : '03',
            'Apr' : '04',
            'May' : '05',
            'Jun' : '06',
            'Jul' : '07',
            'Aug' : '08',
            'Sep' : '09',
            'Oct' : '10',
            'Nov' : '11',
            'Dec' : '12'
        }

        let bookingMonth = endBooking.slice(5, 7)
        let bookingDays = endBooking.slice(8, 10)
        let bookingYear = endBooking.slice(0, 4)

        let todayMonth = today.slice(4, 7)
        let todayDays = today.slice(8, 10)
        let todayYear = today.slice(11, 15)

        bookingStr = bookingMonth + bookingDays + bookingYear
        todayStr = monthNums[todayMonth] + todayDays + todayYear
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", 'booking ', bookingStr, 'today ', todayStr, bookingStr < todayStr)
        return bookingStr < todayStr
    }

    const spotReviews = Object.values(reviews).reverse()

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let year = newDate.substring(10, 16)
        return month.concat(year)
    }

    return (
        <div className="spotReviewsContainer">
            {!spotReviews.length && sessionUser ? <h2>Be the first to post a review!</h2> : <></>}
            {!spotReviews.length ? <></> : spotReviews.map(review => (
                <div key={`${review.id}`} className="review">
                    <div className="nameDateContainer">
                        <span className="name">{review.User.firstName}</span>
                        <span className="date">{lowBudgetDateConverter(review.createdAt)}</span>
                    </div>
                    <div className="reviewBody">{review.review}</div>
                {review.User.id === sessionUser.id ?
                    <button className="deleteReviewButton">
                        <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal review={review}/>}/>
                    </button>
                        :
                    <></>
                }
                </div>
            ))}
        </div>
    )
}

export default SpotReviews;
