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
    console.log('spot: ', spot)



    // Renders spot object with 'dispatch' from store using thunk function 'getSpots'
    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])

    // if (!spot.length) return null;

    return (
        <div className="singleSpotContainer">
            <h1>SingleSpot page</h1>

        </div>
    )
}


export default SingleSpot;
