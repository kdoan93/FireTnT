import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './bookings.css'
import { getSpot } from "../../store/spots";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createBooking, getSpotBookings } from "../../store/bookings";
import { isMobile } from "react-device-detect";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteBookingModal } from "./deleteBookingModal";
import '../ManageSpots/ManageSpots.css'


function Bookings() {

    let [startDate, setStartDate] = useState(new Date())
    let [endDate, setEndDate] = useState(new Date())

    let {spotId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    let booked = []

    spotId = parseInt(spotId)
    let spot = useSelector(state => state.spot.singleSpot)

    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)

    let bookings = useSelector(state => state.booking.booking)

    function getPreviewImg (spotImages) {
        let previewImg = null
        for(let image of spotImages) {
            if (image.preview === true) previewImg = image.url
        }
        return previewImg
    }

    let previewImage = getPreviewImg(spotImages)

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getSpotBookings(spotId))
    }, [dispatch, startDate, endDate])

    const onClick = () => {
        history.push(`/spots/${spotId}`)
    }

    let spotPrice = spot.price

    let nights = Math.round((endDate - startDate) / 86399240)

    function pricePerNight () {
        let price = spotPrice * nights
        return parseFloat(price)
    }

    function cleaningFee () {
        let cleaningFee = spotPrice * .03
        return parseFloat(cleaningFee)
    }

    function serviceFee () {
        let serviceFee = spotPrice * .08
        return parseFloat(serviceFee)
    }

    function taxes () {
        let taxes = spotPrice * .05
        return parseFloat(taxes)
    }

    function total () {
        let total = pricePerNight() + cleaningFee() + serviceFee() + taxes()
        return parseFloat(total)
    }

    function compareDates(start, today) {
        start = start.toString()
        today = today.toString()

        let startStr = ''
        let todayStr = ''

        let monthNums = {
            "Jan" : "01",
            'Feb' : "02",
            'Mar' : "03",
            'Apr' : "04",
            'May' : "05",
            'Jun' : "06",
            'Jul' : "07",
            'Aug' : "08",
            'Sep' : "09",
            'Oct' : "10",
            'Nov' : "11",
            'Dec' : "12"
        }

        let startMonth = start.slice(4, 7)
        let startDays = start.slice(8, 10)
        let startYear = start.slice(11, 15)

        let todayMonth = today.slice(4, 7)
        let todayDays = today.slice(8, 10)
        let todayYear = today.slice(11, 15)

        startStr = monthNums[startMonth] + startDays + startYear
        todayStr = monthNums[todayMonth] + todayDays + todayYear

        // console.log("startStr: ", startStr, todayStr, startStr >= todayStr)

        return startStr < todayStr
    }

    // console.log(compareDates(startDate, new Date()))

    const submitBooking = async (e) => {
        e.preventDefault()

        if (compareDates(startDate, new Date())) return alert("Sorry! You can't book dates before today!")

        try {
            await dispatch( createBooking( { startDate, endDate }, spotId ) )
            alert(
                `Spot has been booked! \nTotal price: $${total().toFixed(2)}`
            )

        } catch (errors) {
            if (startDate > endDate) alert(`Unable to book! The check-in date is after the checkout date.`)
            else alert('Sorry, your booking includes currently booked dates')
        }
    }

    const returnToSpot = () => {
        history.push(`/spots/${spot.id}`)
    }

    if (!spot) return null
    if (!previewImage) return null
    if (!bookings) return null


    bookings = Object.values(bookings)

    function fillDates(startDate, endDate) {
        let end = new Date(endDate)
        for (let d = new Date(startDate); d <= end; d.setDate(d.getDate() + 1)) {
            booked.push(new Date(d))
        }
    }

    let getBookings = (bookings) => {
        bookings.map(booking => {
            fillDates(booking.startDate, booking.endDate)
        })
    }

    getBookings(bookings)

    return (
        <div className="bookingsContainer">
            <button className="bookingsReturn fa-solid fa-less-than" onClick={onClick} />
            <div className="bookingsLeft">
                {!isMobile && <h2>
                    Request to book
                </h2>}
                {!isMobile && <h3>
                    Your trip
                </h3>}
                <div className="bookingsDate">
                    <form className="bookingFormContainer" onSubmit={submitBooking}>
                        <div className="dateSelection" >
                            <div className="dateSelectionBox" >
                                <div className="dateSelectionText">
                                    Check-in
                                </div>
                                <DatePicker
                                    className="datePicker"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    monthsShown={2}
                                    excludeDates={booked}
                                />
                            </div>
                            <div className="dateSelectionBox checkout" >
                                <div className="dateSelectionText">
                                    Checkout
                                </div>
                                <DatePicker
                                    className="datePicker"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    monthsShown={2}
                                    excludeDates={booked}
                                />
                            </div>
                        </div>
                        <button className="bookingsButton">Reserve</button>
                    </form>
                </div>
            </div>

            <div className="bookingsRight">
                <div className="bookingsRightUpper" onClick={returnToSpot}>
                    <div className="bookingsRightUpperLeft">
                        <img className="bookingsImg" src={previewImage} />
                    </div>
                    <div className="bookingsRightUpperRight">
                        <h4>
                            {spot.name}
                        </h4>
                        <p className="bookingsRating">
                            <i class="fa-solid fa-star"></i>{spot.avgStarRating > 0 ? spot.avgStarRating : "NEW"} ({spot.numReviews})
                        </p>
                    </div>
                </div>
                <div className="bookingsRightUpperMid">
                    <p className="bookingsPriceDetails">
                        Price details
                    </p>
                    <div className="bookingsRightPrices">
                        <div className="pricesDivider">
                            <p>
                                ${Number(spotPrice).toFixed(2)} x {nights} {nights > 1 ? "nights" : "night"}
                            </p>
                            <p>
                                ${pricePerNight().toFixed(2)}
                                {/* Func to get price total / night */}
                            </p>
                        </div>
                        <div className="pricesDivider">
                            <p>
                                Cleaning fee
                            </p>
                            <p>
                                ${cleaningFee().toFixed(2)}
                            </p>
                        </div>
                        <div className="pricesDivider">
                            <p>
                                Airbnb service fee
                            </p>
                            <p>
                                ${serviceFee().toFixed(2)}
                            </p>
                        </div>
                        <div className="pricesDivider">
                            <p>
                                Taxes
                            </p>
                            <p>
                                ${taxes().toFixed(2)}
                            </p>
                        </div>
                        <div className="bookingsTotalContainer">
                            <p className="bookingsTotal">
                                Total (USD)
                            </p>
                            <p>
                                ${total().toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {isMobile && <h2>
                    Request to book
            </h2>}
        </div>
    )
}

export default Bookings;
