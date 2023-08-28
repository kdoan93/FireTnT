import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom'

// create imports to import SpotDetails

// Thunk action to getSpots from store/db
import { getSpots } from '../../store/spots'

const SpotsBrowser = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // console.log('spot: ', spot)
    // const spot = useSelector(state => {
    //     return state.spot.allSpots.map(spotId => state.spot[spotId])
    // })

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    // if (!spot) return null;

    return (
        <>
            {/* <nav>
                {spot.map((spot) => {
                    return (
                        <NavLink key={spot.name} to={`/spots/${spot.id}`}>
                            hi
                        </NavLink>
                    )
                })}
            </nav> */}
        </>
    )
}

export default SpotsBrowser;
