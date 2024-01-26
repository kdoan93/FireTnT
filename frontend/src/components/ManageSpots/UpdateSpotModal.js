import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { updateSpot } from "../../store/spots";
import * as spotsActions from "../../store/spots";
import './UpdateSpotModal.css'


export const UpdateSpotModal = ({ spot }) => {

    const dispatch = useDispatch()
    const [country, setCountry] = useState(spot.country)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [description, setDescription] = useState(spot.description)
    const [name, setName] = useState(spot.name)
    const [price, setPrice] = useState(spot.price)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const { closeModal } = useModal()

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

        try {
            await dispatch(
                updateSpot({
                    ...spot,
                    country,
                    address,
                    city,
                    state,
                    description,
                    name,
                    price
                })
            )
            setSubmitted(true)
            closeModal()
        } catch (error) {
            if (error) {
                const data = await error.json()
                setErrors(data.errors)
                return data
            }
        }
    }

    useEffect(() => {
        dispatch(spotsActions.getSpot(spot.id))
    }, [dispatch, spot])


    return (
        <div className='updateFormContainer'>
            <h2>Update your Spot</h2>
            <form onSubmit={handleSubmit}>
                    <div className='locationParagraph'>
                        <div className='t'>
                            <span>Update your place's location?</span>
                            <p>Guests will only get your exact address once they booked a reservation.</p>
                        </div>
                    </div>
                    <div className='c spotLocationContainer'>
                        <div className="spotLocationUpper">
                            <ul>
                                <span>Street Address</span>
                                {errors.address && <span className='error sideError'>Address is required</span>}
                                <ul>
                                    <input
                                        className='i'
                                        type='text'
                                        placeholder={`${spot.address}`}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </ul>
                            </ul>
                            <ul>
                                <span>Country</span>
                                {errors.country && <span className='error sideError'>Country is required</span>}
                                <ul>
                                    <input
                                        className='i'
                                        type='text'
                                        placeholder={`${spot.country}`}
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </ul>
                            </ul>
                        </div>
                        <div className='cityStateContainer'>
                            <ul className='cityContainer'>
                            <span>City
                                {errors.city && <span className='error sideError'>City is required</span>}
                            </span>

                            <input
                                className='cityInput'
                                type='text'
                                placeholder={`${spot.city}`}
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
                                placeholder={`${spot.state}`}
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
                        <input
                            className='descriptionInput'
                            type='text'
                            placeholder={`${spot.description}`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            placeholder={`${spot.name}`}
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
                                placeholder={`${spot.price}`}
                                value={price}
                                onChange={e => checkValue(e, 'change')}
                            />
                        </div>
                        {errors.price && <span className='error bottomError'>Price is required</span>}
                    </div>
            <button className='updateButton'>Update your Spot</button>
            </form>
        </div>
    )
}
