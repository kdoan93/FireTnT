import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './bookings.css'
import { getSpot } from "../../store/spots";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createBooking, getSpotBookings } from "../../store/bookings";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteBookingModal } from "./deleteBookingModal";
import '../ManageSpots/ManageSpots.css'


function Bookings() {

    let [startDate, setStartDate] = useState(new Date())
    let [endDate, setEndDate] = useState(new Date())

    let {spotId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    spotId = parseInt(spotId)
    let spot = useSelector(state => state.spot.singleSpot)

    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)

    let bookings = useSelector(state => state.booking.booking)

    // bookings.map(booking => console.log("booking: ", booking.startDate.slice(0, 10)))
    // let first = bookings[0].startDate.slice(0, 10)
    // console.log(">>>>>>>>>>", first)

    // console.log("IN DATE: ", startDate.toDateString())

    // console.log(">>>>>>", (endDate - startDate) / 86399240) // 86399240 === 1 day

    // console.log("OUT DATE: ", endDate)

    function getPreviewImg (spotImages) {
        let previewImg = null
        for(let image of spotImages) {
            if (image.preview === true) previewImg = image.url
        }
        return previewImg
    }

    let previewImage = getPreviewImg(spotImages)

    const submitBooking = async (e) => {
        e.preventDefault()
        await dispatch( createBooking( { startDate, endDate }, spotId ) )
        // alert("Booking feature coming soon!")
    }

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

    if (!spot) return null
    if (!previewImage) return null
    if (!bookings) return null


    bookings = Object.values(bookings)

    let testDate = bookings[0].startDate.slice(0, 10)

    console.log('>>>>>>>>>>>>>>', new Date(testDate))

    return (
        <div className="bookingsContainer">
            <button className="bookingsReturn fa-solid fa-less-than" onClick={onClick} />
            <div className="bookingsLeft">
                <h2>
                    Request to book
                </h2>
                <div className="bookingsDate">
                    <h3>
                        Your trip
                    </h3>

                    <form onSubmit={submitBooking}>

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
                                    // excludeDates={testDate}
                                />
                            </div>
                            <div className="dateSelectionBox" >
                                <div className="dateSelectionText">
                                    Checkout
                                </div>
                                <DatePicker
                                    className="datePicker"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    monthsShown={2}
                                />
                            </div>
                        </div>

                        {/* <button className="bookingsButton">Book it!</button> */}

                    </form>


                    {/* REMOVE AFTER TESTING */}

                    {/* <div>
                        {bookings.map(booking => (
                            <div className={`bookingContainer`}>
                                <p>
                                    Booking ID: {booking.id}
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
                    </div> */}

                    {/* REMOVE AFTER TESTING */}

                </div>
            </div>
            <div className="bookingsRight">
                <div className="bookingsRightUpper">
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
                        <div>
                            <p>
                                ${Number(spotPrice).toFixed(2)} x {nights} {nights > 1 ? "nights" : "night"}
                            </p>
                            <p>
                                ${pricePerNight().toFixed(2)}
                                {/* Func to get price total / night */}
                            </p>
                        </div>
                        <div>
                            <p>
                                Cleaning fee
                            </p>
                            <p>
                                ${cleaningFee().toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p>
                                Airbnb service fee
                            </p>
                            <p>
                                ${serviceFee().toFixed(2)}
                            </p>
                        </div>
                        <div>
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
        </div>
    )
}

export default Bookings;
