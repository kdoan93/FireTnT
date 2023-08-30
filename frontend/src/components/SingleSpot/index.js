import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
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
    console.log('spot: ', spot)
    // getting spotImages
    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)

    // Renders spot object with 'dispatch' from store using thunk function 'getSpots'
    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])

    if (!spotImages) return null;



    const firstImg = spotImages[0]
    // console.log('firstImg: ', firstImg)
    if (!firstImg) return null;

    const topBox = spotImages.slice(1, 3)
    // console.log('imgBox: ', imgBox)

    const bottomBox = spotImages.slice(3)







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
                            <img src={image.url} className="img" alt="imgBox" />
                        ))}
                    </div>
                    <div className="bottomBox">
                        {bottomBox.map(image => (
                            <img src={image.url} className="img" alt="imgBox" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="spotDetails">
                <div className="ownerAndDescription">
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <div className="description">{spot.description}</div>
                </div>
                <div className="infoBox">
                    <div className="topInfo">
                        <h3 className="price">${spot.price} <h6 className="night">night</h6> </h3>
                        <div className="ratingReviews">
                            <h5 className="rating"><i className="fa-solid fa-star"></i>{!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating}</h5>
                            <i className="fa-solid fa-circle"></i>
                            <h5 className="numReviews"> {spot.numReviews} reviews</h5>
                        </div>
                    </div>
                    <button className="reserve">
                            Reserve
                    </button>
                </div>
            </div>
        </div>
    )
}


export default SingleSpot;
