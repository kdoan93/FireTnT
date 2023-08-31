import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots'
import './NewSpot.css';

function CreateNewSpot() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [previewImg, setPreviewImg] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [errors, setErrors] = useState({})

    function checkValue (e) {
        setPrice(decimalsOnly(e.target.value))
    }

    function decimalsOnly (value) {
        const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
        return value.match(regex)[0];
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // add createSpot thunk function. use components/SignUpFormModal for reference. Line 23
        // if (!errors) {
            // setErrors({})
            // console.log('submitted spot: ')
            // console.log('country: ', country)
            // console.log('address: ', address)
            // console.log('city: ', city)
            // console.log('state: ', state)
            // console.log('description: ', description)
            // console.log('title: ', title)
            // console.log('price: ', price)
        // }
        return dispatch(
            spotsActions.createSpot({
                country,
                address,
                city,
                state,
                description,
                name,
                price,
            })
        )
        .catch (async (res) => {
            const data = await res.json();
            console.log('DATA: ', data)
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })
    }

    return (
        <div className='spotFormContainer'>
            <h2>Create a new Spot</h2>
            <form onSubmit={handleSubmit}>
                    <div className='locationParagraph'>
                        <div className='t'>
                            <span>Where's your place located?</span>
                            <p>Guests will oly get your exact address once they booked a reservation.</p>
                        </div>
                    </div>
                    <div className='c spotLocationContainer'>
                    <ul>
                        <span>Country</span>
                        {errors.country && <span className='error sideError'>Country is required</span>}
                        <input
                            className='i'
                            type='text'
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            // required
                        />
                    </ul>
                    <ul>
                        <span>Street Addrress</span>
                        {errors.address && <span className='error sideError'>Address is required</span>}
                        <input
                            className='i'
                            type='text'
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            // required
                        />
                    </ul>
                        <div className='cityStateContainer'>
                            <ul className='cityContainer'>
                            <span>City {errors.city && <span className='error sideError'>City is required</span>}</span>

                            <input
                                className='cityInput'
                                type='text'
                                placeholder='City'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                // required
                                />
                            </ul>
                            <ul className='commaContainer'>,</ul>

                            <ul className='stateContainer'>
                            <span>
                                State
                                {errors.state && <span className='error stateError'>State is required</span>}
                            </span>
                            <input
                                className='stateInput'
                                type='text'
                                placeholder='STATE'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                // required
                            />
                            </ul>
                        </div>
                    </div>
                    <div className='c descriptionContainer'>
                        <div className='t'>
                            <span>Describe your place to guests</span>
                            <p>
                                Mention the best features of your space, any special amentities like fast wifi
                                or parking, and what you love about the neighborhood.
                            </p>
                        </div>
                        <input
                            className='descriptionInput'
                            type='text'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            // required
                        />
                        {errors.description && <span className='error bottomError'>Description needs a minimum of 30 characters</span>}
                    </div>
                    <div className='c titleContainer'>
                        <div className='t'>
                            <span>Create a title for your spot</span>
                            <p>
                                Catch guests' attention with a spot title that highlights what makes your place special.
                            </p>
                        </div>
                        <input
                            className='i'
                            type='text'
                            placeholder='Name of your spot'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            // required
                        />
                        {errors.name && <span className='error bottomError'>Name is required</span>}
                    </div>
                    <div className='c priceContainer'>
                        <div className='t'>
                            <span>Set a base price for your spot</span>
                            <p>
                                Competitive pricing can help your listing stand out and rank higher in search results.
                            </p>
                        </div>
                        <div className='dollarByInput'>
                            <i className="fa-solid fa-dollar-sign"></i>
                            <input
                                className='priceInput'
                                type='text'
                                placeholder='Price per night (USD)'
                                value={price}
                                onChange={e => checkValue(e, 'change')}
                                // required
                            />
                        </div>
                        {errors.price && <span className='error bottomError'>Price is required</span>}
                    </div>
                    <div className='c photoContainer'>
                        <div className='t'>
                            <span>Liven up your spot with photos</span>
                            <p>
                                Submit a link to at least one photo to publish your spot.
                            </p>
                        </div>
                        <input
                            className='i'
                            type='text'
                            placeholder='Preview Image URL'
                            value={previewImg}
                            onChange={e => setPreviewImg(e.target.value)}
                            // required
                        />
                        {errors.previewImg && <span className='error bottomError'>Preview image is required.</span>}
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img1}
                            onChange={e => setImg1(e.target.value)}
                            // required
                        />
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img2}
                            onChange={e => setImg2(e.target.value)}
                            // required
                        />
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img3}
                            onChange={e => setImg3(e.target.value)}
                            // required
                        />
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img4}
                            onChange={e => setImg4(e.target.value)}
                            // required
                        />
                    </div>
            <button>Create Spot</button>
            </form>
        </div>
    )
}

export default CreateNewSpot;
