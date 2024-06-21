import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots'
import { DeleteSpotModal } from './DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './ManageSpots.css'
import { UpdateSpotModal } from './UpdateSpotModal';

const UserSpots = () => {

    const [buttonClicked, setButtonClicked] = useState(false)

    // dispatch used to interact with redux store/db
    const dispatch = useDispatch();

    const history = useHistory();

    // useSelector selects store data objects
    const userSpots = useSelector(state => state.spot.allSpots)
    const spotsArray = Object.values(userSpots)

    // onClick to handle creating new spot
    const onClick = (e) => {
        history.push('/spots/new')
    }

    useEffect(() => {

        dispatch(spotsActions.getUserSpots())
    }, [dispatch, spotsArray.length])

    return (
        <>
            <div className='title'> Manage Spots </div>
            {/* <div className='spotsContainer'> */}
            <div className='manageContainer'>
                {spotsArray.length === 0 ? <button onClick={onClick}>Create a New Spot</button> : spotsArray.map(spot => (
                    // <div className='manageSpotsBrowser'>
                    <div className='singleManageContainer'>
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
                            {/* <NavLink className='manageButtons' to={`/spots/${spot.id}/edit`} props={{spot}} >Update</NavLink> */}
                            <OpenModalMenuItem itemText='Update' modalComponent={<UpdateSpotModal spot={spot} />} />
                            <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteSpotModal spotId={spot.id} />} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserSpots;
