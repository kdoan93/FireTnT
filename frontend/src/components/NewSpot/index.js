import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots'
import { createSpotImage } from '../../store/spotsImages';
import './NewSpot.css';

function CreateNewSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [errors, setErrors] = useState({})
    const [imgErrors, setImgErrors] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    const [needPreviewImg, setNeedPreviewImg] = useState(false)
    const [correctImg1, setCorrectImg1] = useState(true)
    const [correctImg2, setCorrectImg2] = useState(true)
    const [correctImg3, setCorrectImg3] = useState(true)
    const [correctImg4, setCorrectImg4] = useState(true)

    function checkValue (e) {
        setPrice(decimalsOnly(e.target.value))
    }

    function decimalsOnly (value) {
        const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
        return value.match(regex)[0];
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        setImgErrors({})
        setNeedPreviewImg(false)
        setCorrectImg1(true)
        setCorrectImg2(true)
        setCorrectImg3(true)
        setCorrectImg4(true)
        const imgErrorsObj = { previewImgError: 'Preview image is required' }
        // if no previewImg, set useState for imgErrors and return

        try {

            const newSpot = await dispatch(
                spotsActions.createSpot({ country, address, city, state, description, name, price })
            )
            if (!previewImg) return;
            if (previewImg) {
                previewImg.endsWith('jpg') ? setNeedPreviewImg(false) : setNeedPreviewImg(true) ||
                previewImg.endsWith('jpeg') ? setNeedPreviewImg(false) : setNeedPreviewImg(true) ||
                previewImg.endsWith('png') ? setNeedPreviewImg(false) : setNeedPreviewImg(true)
            }
            if (img1) { (
                    img1.endsWith('jpg') ? setCorrectImg1(true) : setCorrectImg1(false) ||
                    img1.endsWith('jpeg') ? setCorrectImg1(true) : setCorrectImg1(false) ||
                    img1.endsWith('png') ? setCorrectImg1(true) : setCorrectImg1(false)
            ) }
            if (img2) { (
                    img2.endsWith('jpg') ? setCorrectImg2(true) : setCorrectImg2(false) ||
                    img2.endsWith('jpeg') ? setCorrectImg2(true) : setCorrectImg2(false) ||
                    img2.endsWith('png') ? setCorrectImg2(true) : setCorrectImg2(false)
            ) }
            if (img3) { (
                    img3.endsWith('jpg') ? setCorrectImg3(true) : setCorrectImg3(false) ||
                    img3.endsWith('jpeg') ? setCorrectImg3(true) : setCorrectImg3(false) ||
                    img3.endsWith('png') ? setCorrectImg3(true) : setCorrectImg3(false)
            ) }
            if (img4) { (
                    img4.endsWith('jpg') ? setCorrectImg4(true) : setCorrectImg4(false) ||
                    img4.endsWith('jpeg') ? setCorrectImg4(true) : setCorrectImg4(false) ||
                    img4.endsWith('png') ? setCorrectImg4(true) : setCorrectImg4(false)
            ) }
            if (newSpot.id) {
                await dispatch(createSpotImage({ url: previewImg, preview: true }, newSpot.id ))
                await dispatch(createSpotImage({ url: img1, preview: false }, newSpot.id ))
                await dispatch(createSpotImage({ url: img2, preview: false }, newSpot.id ))
                await dispatch(createSpotImage({ url: img3, preview: false }, newSpot.id ))
                await dispatch(createSpotImage({ url: img4, preview: false }, newSpot.id ))
            }
            history.push(`/spots/${newSpot.id}`)
        } catch (error) {

            if (error) {
                const data = await error.json()
                setErrors(data.errors)

                if (!previewImg) {
                    setNeedPreviewImg(true)
                    setImgErrors(true)
                } if (img1 && correctImg1) {
                    setCorrectImg1(false)
                } if (img2 && !correctImg2) {
                    setCorrectImg2(false)
                } if (img3 && !correctImg3) {
                    setCorrectImg1(false)
                } if (img4 && !correctImg4) {
                    setCorrectImg4(false)
                } else return imgErrors, data, correctImg1, correctImg2, correctImg3, correctImg4
            }
        }
    }

    return (
        <div className='spotFormContainer'>
            <h2>Create a new Spot</h2>
            <form onSubmit={handleSubmit}>
                    <div className='locationParagraph'>
                        <div className='t'>
                            <span>Where's your place located?</span>
                            <p>Guests will only get your exact address once they booked a reservation.</p>
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
                            />
                            </ul>
                        </div>
                    </div>
                    <div className='c descriptionContainer'>
                        <div className='t'>
                            <span>Describe your place to guests</span>
                            <p>
                            Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.
                            </p>
                        </div>
                        <textarea
                            className='descriptionInput'
                            type='text'
                            placeholder='Please write at least 30 characters'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
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
                            type='url'
                            placeholder='Preview Image URL'
                            value={previewImg}
                            onChange={e => setPreviewImg(e.target.value)}
                        />
                        {needPreviewImg && <span className='error'>Preview image is required.</span>}
                        {previewImg && !needPreviewImg && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img1}
                            onChange={e => setImg1(e.target.value)}
                        />
                        {!correctImg1 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img2}
                            onChange={e => setImg2(e.target.value)}
                            />
                        {!correctImg2 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img3}
                            onChange={e => setImg3(e.target.value)}
                            />
                        {!correctImg3 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img4}
                            onChange={e => setImg4(e.target.value)}
                            />
                        {!correctImg4 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                    </div>
            <button>Create Spot</button>
            </form>
        </div>
    )
}

export default CreateNewSpot;
