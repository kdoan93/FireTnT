import { useDispatch, useSelector } from "react-redux";
import React, { Component, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
// import ReactDOM from 'react-dom'
import { getSpot } from '../../store/spots'
// import { getSpotReviews } from "../../store/reviews";
import { ReviewModal } from "../ReviewModal";
// import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import './SingleSpot.css'
import { getSpotImages } from "../../store/spotsImages";
import Bookings from "../Bookings";
import { UpdateSpotModal } from "../ManageSpots/UpdateSpotModal";

const SingleSpot = () => {

    const dispatch = useDispatch();

    let history = useHistory()

    // Selects session.user object
    const sessionUser = useSelector(state => state.session.user)

    // Getting review store data object
    const reviews = useSelector(state => state.review.spot)
    const reviewsArray = Object.values(reviews)

    let sessionUserId = 0;

    if (sessionUser) sessionUserId = sessionUser.id

    let reviewed = false;
    reviewsArray.map(
        review => {if (review.userId === sessionUserId) reviewed = true}
    )

    let { spotId } = useParams();
    // turn id from string into a number value
    spotId = parseInt(spotId)
    // selecting with 'useSelector' an object from 'store/index' then 'store/spots'

    let spot = useSelector(state => state.spot.singleSpot)
    const spotOwnerId = spot.ownerId

    // Renders spot object with 'dispatch' from store using thunk function 'getSpots'
    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getSpotImages(spotId))
    }, [dispatch, reviewsArray.length, spotId])

    if (!spotImages) return null;
    const firstImg = spotImages[0]
    if (!firstImg) return null;
    if (!reviews) return null

    const topBox = spotImages.slice(1, 3)
    const bottomBox = spotImages.slice(3)

    const handleClick = (e) => {
        e.preventDefault();
        if (sessionUserId) history.push(`/spots/${spotId}/booking`)
        else alert("Please log in to reserve a spot!")
    }

    return (
        <div className="entireSpot">
            <div className="nameLocation">
                <h2>{spot.name}</h2>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </div>

            {/* <Carousel className="carousel-container" infiniteLoop='true'>
                {spotImages.map((image) => (
                    <div>
                        <img key={image.url} src={image.url}/>
                    </div>
                ))}
            </Carousel> */}

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
                                <i className="fa-solid fa-star"></i>{!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating.toFixed(1)}
                            </h5>
                            {spot.numReviews ? <i className="fa-solid fa-circle"></i> : <p></p>}
                            <h5 className="numReviews">
                                {spot.numReviews ? `${spot.numReviews}  ${spot.numReviews > 1 ? 'reviews' : 'review'}` : <p></p>}
                            </h5>
                        </div>
                    </div>
                    {spotOwnerId === sessionUserId ?
                        <button className="reserve">
                            <OpenModalMenuItem itemText='Update Owned Spot' modalComponent={ <UpdateSpotModal spot={spot} /> }/>
                        </button>
                        :
                        <button className="reserve" onClick={handleClick} >
                            Reserve
                        </button>
                    }

                </div>
            </div>
            <div className="starReviews">
                <h3 className="reviewsRating">
                    <i className="fa-solid fa-star"></i>{!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating.toFixed(1)}
                </h3>
                {spot.numReviews ? <i className="fa-solid fa-circle"></i> : <p></p>}
                <h3 className="reviewsNumReviews">
                    {spot.numReviews ? `${spot.numReviews} ${spot.numReviews > 1 ? 'reviews' : 'review'}` : <p></p>}
                </h3>
            </div>
            {sessionUserId && spotOwnerId !== sessionUserId && !reviewed ?
                <button className="postButton">
                    <OpenModalMenuItem itemText='Post Your Review' modalComponent={<ReviewModal spot={spot} />} />
                </button>
                    :
                <></>
            }
        </div>
    )
}


export default SingleSpot;
