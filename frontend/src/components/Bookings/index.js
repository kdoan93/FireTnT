import { useHistory, useParams } from "react-router-dom";
import './bookings.css'


function Bookings() {

    let {spotId} = useParams()
    spotId = parseInt(spotId)
    const history = useHistory()

    const onClick = () => {
        history.push(`/spots/${spotId}`)
    }

    return (
        <div className="bookingsContainer">
            <button className="fa-less-than" onClick={onClick} />
            <div className="bookingsLeft">
                {/* LEFT */}
            </div>
            <div className="bookingsRight">
                {/* RIGHT */}
            </div>
        </div>
    )
}

export default Bookings;
