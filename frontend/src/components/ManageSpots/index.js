import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getUserSpots } from '../../store/spots'
import * as spotsActions from '../../store/spots'
import { DeleteSpotModal } from './DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './ManageSpots.css'

const UserSpots = () => {

    // dispatch used to interact with redux store/db
    const dispatch = useDispatch();

    const history = useHistory();

    // useSelector selects store data objects
    const userSpots = useSelector(state => state.spot.allSpots)
    // console.log('userSpots: ', userSpots)
    const spotsArray = Object.values(userSpots)
    // console.log('MANAGESPOTS spotsArray: ', spotsArray)

    // onClick to handle creating new spot
    const onClick = (e) => {
        history.push('/spots/new')
    }

    useEffect(() => {
        dispatch(spotsActions.getUserSpots())
    }, [dispatch])

    return (
        <>
            <div className='manageSpotsContainer'> Manage Spots </div>
            <div className='spotsContainer'>
                {/* {!userSpots ? <NavLink to='/spots/new'>Create a new spot</NavLink> : spotsArray.map(spot => ( */}
                {spotsArray.length === 0 ? <button onClick={onClick}>Create a New Spot</button> : spotsArray.map(spot => (
                    <div className='manageSpotsBrowser'>
                        <NavLink key={`${spot.name}`} className='ownedSpot' to={`/spots/${spot.id}`}>
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
                        <div className='bottomButtons'>
                            <NavLink className='manageButtons' to={`/spots/${spot.id}/edit`}>Update</NavLink>
                            {/* Import OpenModalMenuItem, then set modalComponent to desired modal */}
                            <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteSpotModal spotId={spot.id} />} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserSpots;
