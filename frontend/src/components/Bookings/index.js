import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './bookings.css'
import { getSpot } from "../../store/spots";


function Bookings({spotty}) {

    console.log('>>>>>>>>>>>', spotty)

    let {spotId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    spotId = parseInt(spotId)

    let spot = useSelector(state => state.spot.singleSpot)

    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)


    function getPreviewImg (spotImages) {
        let previewImg = null
        for(let image of spotImages) {
            if (image.preview === true) previewImg = image
        }
        return previewImg.url
    }

    let previewImage = getPreviewImg(spotImages)

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])

    const onClick = () => {
        history.push(`/spots/${spotId}`)
    }

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
                    {/* <img src={previewImage} /> */}
                    {spot.name}
                </div>
            </div>
        </div>
    )
}

export default Bookings;
