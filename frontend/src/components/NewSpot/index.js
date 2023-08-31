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
        setErrors({})
        return dispatch(
            spotsActions.createSpot({
                country,
                streetAddress,
                city,
                state,
                description,
                title,
                price,
                img
            })
        )
        .catch (async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })
    }

    return (
        <div className='spotFormContainer'>
            <h2>Create a new Spot</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    <label>
                        <div className='spotLocationContainer'>
                            <span>Country</span>
                            <input
                                type='text'
                                placeholder='Country'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                            <span>Street Addrress</span>
                            <input
                                type='text'
                                placeholder='Address'
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                required
                            />
                            <div className='cityState'>
                                <span>City</span>
                                <input
                                    type='text'
                                    placeholder='City'
                                    value={streetAddress}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                    required
                                />
                                <span>State</span>
                                <input
                                    type='text'
                                    placeholder='STATE'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <span></span>
                    </label>
                </ul>
            </form>
        </div>
    )
}

export default CreateNewSpot;
