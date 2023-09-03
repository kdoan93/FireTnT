import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Thunk action to getSpots from store/db
import { getSpots } from '../../store/spots'
import './SpotsLandingPage.css'

const SpotsBrowser = () => {

    // dispatch is to interact with store
    const dispatch = useDispatch();

    // useSelector selects store data objects
    const allSpots = useSelector(state => state.spot.allSpots)

    // turn store data objects into an array
    const spotsArray = Object.values(allSpots)
    // console.log('spotsArray: ', spotsArray)

    // useEffect dispatches the thunk function 'getSpots()'
    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    if (!spotsArray) return null;

    return (
        <div className='spotsBrowser'>
            <div className='innerSpotsBrowser'>
                {spotsArray.map(spot => (
                    <NavLink key={`${spot.name}`} className='spot' to={`/spots/${spot.id}`}>
                        <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
                        <div className='topRow'>
                            <span className='cityState'>{spot.city}, {spot.state}</span>
                            <span className='rating'><i className="fa-solid fa-star"></i>
                                {!spot.avgRating ? <span>NEW</span> : spot.avgRating.toFixed(1)}
                            </span>
                        </div>
                        <span className='price'>${spot.price}/night</span>
                        <div className='tooltip'>{spot.name}</div>
                    </NavLink>
                ))}

            </div>
        </div>
    )
}

export default SpotsBrowser;
