import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spots'
import './ManageSpots.css'

const UserSpots = () => {

    // dispatch used to interact with redux store/db
    const dispatch = useDispatch();

    // useSelector selects store data objects
    const userSpots = useSelector(state => state.spot.allSpots)
    // console.log('userSpots: ', userSpots)
    const spotsArray = Object.values(userSpots)
    console.log('spotsArray: ', spotsArray)

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    if (!userSpots) return null;

    return (
        <div className='ownerSpots'>
            <h2>hello?</h2>
            {spotsArray.map(spot => (
                <NavLink key={`${spot.name}`} className='spot' to={`/spots/${spot.id}`}>
                    <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
                    <div className='topRow'>
                        <span className='cityState'>{spot.city}, {spot.state}</span>
                        <span className='rating'><i className="fa-solid fa-star"></i>{!spot.avgRating ? <span>NEW</span> : spot.avgRating}</span>
                    </div>
                    <span className='price'>${spot.price}/night</span>
                    <div className='tooltip'>{spot.name}</div>
                </NavLink>
            ))}
        </div>
    )
}

export default UserSpots;
