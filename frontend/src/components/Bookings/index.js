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

    if (!previewImage) return null

    return (
        <div className="bookingsContainer">
            <button className="fa-less-than" onClick={onClick} />
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
                        <i class="fa-solid fa-star"></i>{spot.avgStarRating} ({spot.numReviews})
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookings;
