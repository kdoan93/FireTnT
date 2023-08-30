import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpot } from '../../store/spots'
import './SingleSpot.css'
// console.log('getSpots ', getSpots)

const SingleSpot = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    // turn id from string into a number value
    spotId = parseInt(spotId)
    // selecting with 'useSelector' an object from 'store/index' then 'store/spots'
    const spot = useSelector(state => state.spot.singleSpot)
    const { id, name, previewImage, city, state, avgRating, price } = spot;

    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)
    console.log('spotImages: ', spotImages)

    // const image = spotImages.map(image => (image.url))
    // console.log('image: ', image)




    // Renders spot object with 'dispatch' from store using thunk function 'getSpots'
    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])

    // if (!spot.length) return null;

    return (
        <div className="entireSpot">
            <div className="nameLocation">
                <h2>{spot.name}</h2>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </div>
            <div className="imagesContainer">
                {spotImages.map(image => (
                    <img src={image.url} alt="spotImg" />
                ))}
                {/* <img src={image} alt='spotImg' /> */}
            </div>
        </div>
    )
}


export default SingleSpot;
