import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './bookings.css'
import { getSpot } from "../../store/spots";


function Bookings() {

    let {spotId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    spotId = parseInt(spotId)

    let spot = useSelector(state => state.spot.singleSpot)

    console.log(spot)

    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)


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
    }, [dispatch])

    const onClick = () => {
        history.push(`/spots/${spotId}`)
    }

    let nights = 1

    let spotPrice = spot.price

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

    // let cleaningFee = (spotPrice * .03).toFixed(2)

    // let serviceFee = (spotPrice * .08).toFixed(2)

    // let taxes = (spotPrice * .05).toFixed(2)

    // let total = parseFloat(cleaningFee) + parseFloat(serviceFee) + parseFloat(taxes)

    if (!spot) return null

    if (!previewImage) return null

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
                    <h4>
                        Dates
                    </h4>
                    {/* Show selected booking dates here */}
                    {/* "Edit" will bring calendar modal to select dates */}
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
                                ${spot.price.toFixed(2)} x {nights} {nights > 1 ? "nights" : "night"}
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
                                Total(USD)
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
