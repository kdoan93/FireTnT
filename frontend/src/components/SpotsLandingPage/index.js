import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Thunk action to getSpots from store/db
import { getSpots } from '../../store/spots'
import './SpotsLandingPage.css'

// create imports to import SpotDetails


const SpotsBrowser = () => {
    // dispatch is to interact with store
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spot.allSpots)
    const spotsArray = Object.values(allSpots)
    console.log('spotsArray: ', spotsArray)



    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    if (!spotsArray) return null;

    return (
        <div className='spotsBrowser'>
            {spotsArray.map(spot => (
                <div className='spot'>
                    <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
                    <span className='cityState'>{spot.city}, {spot.state}</span>
                    <span className='rating'><i className="fa-solid fa-star"></i>{spot.avgRating}</span>
                    <span className='price'>${spot.price}/night</span>
                </div>
            ))}
        </div>
    )
}

export default SpotsBrowser;
