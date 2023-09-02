import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots'
import { createSpotImage } from '../../store/spotsImages';
// import './UpdateSpot.css';

function UpdateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [errors, setErrors] = useState({})
    // const [img1, setImg1] = useState('')
    // const [img2, setImg2] = useState('')
    // const [img3, setImg3] = useState('')
    // const [img4, setImg4] = useState('')
    // const [imgErrors, setImgErrors] = useState({})
    // const [previewImg, setPreviewImg] = useState('')
    // const [needPreviewImg, setNeedPreviewImg] = useState(false)
    // const [correctImg1, setCorrectImg1] = useState(false)
    // const [correctImg2, setCorrectImg2] = useState(false)
    // const [correctImg3, setCorrectImg3] = useState(false)
    // const [correctImg4, setCorrectImg4] = useState(false)

    function checkValue (e) {
        setPrice(decimalsOnly(e.target.value))
    }

    function decimalsOnly (value) {
        const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
        return value.match(regex)[0];
    }

    // Use spotId param and convert into number value
    let { spotId } = useParams();
    spotId = parseInt(spotId)

    let spotDetails = useSelector(state => state.spot.singleSpot)
    console.log('UpdateSpot spotDetails: ', spotDetails)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        // setImgErrors({})
        // const imgErrorsObj = { previewImgError: 'Preview image is required' }

        try {



            const updateSpot = await dispatch(

                spotsActions.updateSpot({
                    ...spotDetails,
                    country,
                    address,
                    city,
                    state,
                    description,
                    name,
                    price
                })
            //     // add createSpot thunk function. use components/SignUpFormModal for reference. Line 23
            //     spotsActions.createSpot({
            //         country,
            //         address,
            //         city,
            //         state,
            //         description,
            //         name,
            //         price,
            //     })
            )

            // if (previewImg) {
            //     (
            //         // if previewImg does end with ..., setPreviewImg to false, else set true
            //         previewImg.endsWith('jpg') ? setPreviewImg(false) : setPreviewImg(true) ||
            //         previewImg.endsWith('jpeg') ? setPreviewImg(false) : setPreviewImg(true) ||
            //         previewImg.endsWith('png') ? setPreviewImg(false) : setPreviewImg(true)
            //     )
            // }
            // if (img1) {
            //     (
            //         img1.endsWith('jpg') ? setCorrectImg1(false) : setCorrectImg1(true) ||
            //         img1.endsWith('jpeg') ? setCorrectImg1(false) : setCorrectImg1(true) ||
            //         img1.endsWith('png') ? setCorrectImg1(false) : setCorrectImg1(true)
            //     )
            // }
            // if (img2) {
            //     (
            //         img2.endsWith('jpg') ? setCorrectImg2(false) : setCorrectImg2(true) ||
            //         img2.endsWith('jpeg') ? setCorrectImg2(false) : setCorrectImg2(true) ||
            //         img2.endsWith('png') ? setCorrectImg2(false) : setCorrectImg2(true)
            //     )
            // }
            // if (img3) {
            //     (
            //         img3.endsWith('jpg') ? setCorrectImg3(false) : setCorrectImg3(true) ||
            //         img3.endsWith('jpeg') ? setCorrectImg3(false) : setCorrectImg3(true) ||
            //         img3.endsWith('png') ? setCorrectImg3(false) : setCorrectImg3(true)
            //     )
            // }
            // if (img4) {
            //     (
            //         img4.endsWith('jpg') ? setCorrectImg4(false) : setCorrectImg4(true) ||
            //         img4.endsWith('jpeg') ? setCorrectImg4(false) : setCorrectImg4(true) ||
            //         img4.endsWith('png') ? setCorrectImg4(false) : setCorrectImg4(true)
            //     )
            // }
            // // console.log('newSpot: ', newSpot)
            // // creates new previewImg and following spot images
            // if (newSpot.id) {
            //     await dispatch(createSpotImage({
            //         url: previewImg,
            //         preview: true
            //     }, newSpot.id ))
            //     await dispatch(createSpotImage({
            //         url: img1,
            //         preview: false
            //     }, newSpot.id ))
            //     await dispatch(createSpotImage({
            //         url: img2,
            //         preview: false
            //     }, newSpot.id ))
            //     await dispatch(createSpotImage({
            //         url: img3,
            //         preview: false
            //     }, newSpot.id ))
            //     await dispatch(createSpotImage({
            //         url: img4,
            //         preview: false
            //     }, newSpot.id ))
            // }
            // console.log('newSpot: ', newSpot)
            history.push(`/spots/${updateSpot.id}`)
            // error = response.error
        } catch (error) {
            // if (!previewImg) {
            //     setNeedPreviewImg(true)
            //     setImgErrors(imgErrorsObj)
            //     console.log('NewSpot imgErrors: ', imgErrors)
            //     return imgErrors
            // }
            if (error) {
                // data receives errors object
                console.log('NewSpot component error: ', error)
                const data = await error.json()
                setErrors(data.errors)
                console.log('data: ', data)
                return data
            }
        }
    }

    useEffect(() => {
        dispatch(spotsActions.getSpot(spotId))
    }, [dispatch])

    if (!spotDetails) return null;

    return (
        <div className='spotFormContainer'>
            <h2>Update your Spot</h2>
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
                        {/* {errors.country && <span className='error sideError'>Country is required</span>} */}
                        <input
                            className='i'
                            type='text'
                            placeholder={`${spotDetails.country}`}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            // required
                        />
                    </ul>
                    <ul>
                        <span>Street Addrress</span>
                        {/* {errors.address && <span className='error sideError'>Address is required</span>} */}
                        <input
                            className='i'
                            type='text'
                            placeholder={`${spotDetails.address}`}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            // required
                        />
                    </ul>
                        <div className='cityStateContainer'>
                            <ul className='cityContainer'>
                            <span>City
                                {/* {errors.city && <span className='error sideError'>City is required</span>} */}
                            </span>

                            <input
                                className='cityInput'
                                type='text'
                                placeholder={`${spotDetails.city}`}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                // required
                                />
                            </ul>
                            <ul className='commaContainer'>,</ul>

                            <ul className='stateContainer'>
                            <span>
                                State
                                {/* {errors.state && <span className='error stateError'>State is required</span>} */}
                            </span>
                            <input
                                className='stateInput'
                                type='text'
                                placeholder={`${spotDetails.state}`}
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
                            Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.
                            </p>
                        </div>
                        <input
                            className='descriptionInput'
                            type='text'
                            placeholder={`${spotDetails.description}`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            // required
                        />
                        {/* {errors.description && <span className='error bottomError'>Description needs a minimum of 30 characters</span>} */}
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
                            placeholder={`${spotDetails.name}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            // required
                        />
                        {/* {errors.name && <span className='error bottomError'>Name is required</span>} */}
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
                                placeholder={`${spotDetails.price}`}
                                value={price}
                                onChange={e => checkValue(e, 'change')}
                                // required
                            />
                        </div>
                        {/* {errors.price && <span className='error bottomError'>Price is required</span>} */}
                    </div>
                    {/* <div className='c photoContainer'>
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
                            // required
                        />
                        {needPreviewImg && <span className='error'>Preview image is required.</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img1}
                            onChange={e => setImg1(e.target.value)}
                            // required
                        />
                        {correctImg1 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img2}
                            onChange={e => setImg2(e.target.value)}
                            // required
                            />
                        {correctImg2 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img3}
                            onChange={e => setImg3(e.target.value)}
                            // required
                            />
                        {correctImg3 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                        <input
                            className='i'
                            type='url'
                            placeholder='Image URL'
                            value={img4}
                            onChange={e => setImg4(e.target.value)}
                            // required
                            />
                        {correctImg4 && <span className='error'>Image URL must end in .png, .jpg, .jpeg</span>}
                    </div> */}
            <button>Create Spot</button>
            </form>
        </div>
    )
}


export default UpdateSpot;