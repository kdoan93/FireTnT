// import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSpot } from '../../store/spots'
import './SingleSpot.css'

const SingleSpot = () => {

    const dispatch = useDispatch();
    // const { id, name, previewImage, city, state, avgRating, price } = spot;
    let { spotId } = useParams();
    // turn id from string into a number value
    spotId = parseInt(spotId)
    // selecting with 'useSelector' an object from 'store/index' then 'store/spots'
    let spot = useSelector(state => state.spot.singleSpot)
    console.log('SPOT: ', spot)

    //spot.ownerId === session.user.id
    // getting spotImages
    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)
    const firstImg = spotImages[0]

    // Renders spot object with 'dispatch' from store using thunk function 'getSpots'
    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])

    if (!spot) return null;
    if (spotImages.length < 0) return null;

    // console.log('firstImg: ', firstImg)
    if (!firstImg) return null;

    const topBox = spotImages.slice(1, 3)
    // console.log('imgBox: ', imgBox)

    const bottomBox = spotImages.slice(3)

    const handleClick = (e) => {
        e.preventDefault();
        alert("FEATURE COMING SOON!")
    }

    return (
        <div className="entireSpot">
            <div className="nameLocation">
                <h2>{spot.name}</h2>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </div>

            <div className="imagesContainer">
                <div className="bigImg"><img src={firstImg.url} alt='firstImg' /></div>
                <div className="imgBox">
                    <div className="topBox">
                        {topBox.map(image => (
                            <img key={image.url} src={image.url} className="img" alt="imgBox" />
                        ))}
                    </div>
                    <div className="bottomBox">
                        {bottomBox.map(image => (
                            <img key={image.url} src={image.url} className="img" alt="imgBox" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="spotDetails">
                <div className="ownerAndDescription">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div className="description">{spot.description}</div>
                </div>
                <div className="infoBox">
                    <div className="topInfo">
                        <div className="priceNight">
                            <h3 className="price">${spot.price} </h3>
                            <h5 className="night"> night</h5>
                        </div>
                        <div className="ratingReviews">
                            <h5 className="rating">
                                <i className="fa-solid fa-star"></i>{!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating}
                            </h5>
                            {spot.numReviews ? <i className="fa-solid fa-circle"></i> : <p></p>}
                            <h5 className="numReviews">
                                {spot.numReviews ? `${spot.numReviews}  ${spot.numReviews > 1 ? 'reviews' : 'review'}` : <p></p>}
                            </h5>
                        </div>
                    </div>
                    <button className="reserve" onClick={handleClick}>
                            Reserve
                    </button>
                </div>
            </div>
            <div className="starReviews">
            <h3 className="reviewsRating">
                <i className="fa-solid fa-star"></i>{!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating}
            </h3>
            {spot.numReviews ? <i className="fa-solid fa-circle"></i> : <p></p>}
            <h3 className="reviewsNumReviews">
                {spot.numReviews ? `${spot.numReviews} ${spot.numReviews > 1 ? 'reviews' : 'review'}` : <p></p>}
            </h3>
            </div>
        </div>
    )
}


export default SingleSpot;
