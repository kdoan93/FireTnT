import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots'

const UserSpots = () => {

    // dispatch used to interact with redux store/db
    const dispatch = useDispatch();

    // useSelector selects store data objects
    const userSpots = useSelector(state => state.spot.allSpots)


    return (
        <div>Manage Spots page</div>
    )
}

export default UserSpots;
