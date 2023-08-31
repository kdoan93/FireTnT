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
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState()
    const [previewImg, setPreviewImg] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        // add createSpot thunk function. use components/SignUpFormModal for reference. Line 23
        setErrors({})
        return dispatch(
            spotsActions.createSpot({
                country,
                address,
                city,
                state,
                description,
                title,
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
                    <div className='spotLocationContainer'>
                    <ul>
                        <span>Country</span>
                        <input
                            className='i'
                            type='text'
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </ul>
                    <ul>
                        <span>Street Addrress</span>
                        <input
                            className='i'
                            type='text'
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </ul>
                        <div className='cityStateContainer'>
                            <ul className='cityContainer'>
                            <span>City</span>
                            <input
                                className='cityInput'
                                type='text'
                                placeholder='City'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                />
                            </ul>
                            <ul className='commaContainer'>,</ul>

                            <ul className='stateContainer'>
                            <span>State</span>
                            <input
                                className='stateInput'
                                type='text'
                                placeholder='STATE'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                            </ul>
                        </div>
                    </div>
                    <div className='descriptionContainer'>
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
                            required
                        />
                    </div>
                    <div className='titleContainer'>
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
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='priceContainer'>
                        <div className='t'>
                            <span>Set a base price for your spot</span>
                            <p>
                                Competitive pricing can help your listing stand out and rank higher in search results.
                            </p>
                        </div>
                        <input
                            type='number'
                            placeholder='Price per night (USD)'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className='photoContainer'>
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
                            required
                        />
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img1}
                            onChange={e => setImg1(e.target.value)}
                            required
                        />
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img2}
                            onChange={e => setImg2(e.target.value)}
                            required
                        />
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img3}
                            onChange={e => setImg3(e.target.value)}
                            required
                        />
                        <input
                            className='i'
                            type='text'
                            placeholder='Image URL'
                            value={img4}
                            onChange={e => setImg4(e.target.value)}
                            required
                        />
                    </div>
            </form>
            <button>Create Spot</button>
        </div>
    )
}

export default CreateNewSpot;
