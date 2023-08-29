import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots'
// console.log('getSpots ', getSpots)

const SingleSpot = ({ spot }) => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    // turn id from string into a number value
    // spotId = parseInt(spotId)
    // const { id, name, previewImage, city, state, avgRating, price } = spot;

    // selecting with 'useSelector' an object from 'store/index' then 'store/spots'
    // const spot = useSelector(state => state.spot.allSpots)

    // Getting allSpots and turning into an array of spot objects
    // const spot = useSelector(state => Object.values(state.spot.allSpots))
    // console.log('spot: ', spot)

    // Renders spot object with 'dispatch' from store using thunk function 'getSpots'
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    // if (!spot.length) return null;

    return (
        <div>
            <h1>hi</h1>

        </div>
    )
}


export default SingleSpot;
