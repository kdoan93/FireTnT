import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots'
import './NewSpot.css';

function CreateNewSpot() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState()
    const [img, setImg] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        // add createSpot thunk function. use components/SignUpFormModal for reference. Line 23
    }

    return (
        <div className='spotFormContainer'>
            <h2>Create a new Spot</h2>
        </div>
    )
}

export default CreateNewSpot;
