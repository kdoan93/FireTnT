import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpot } from '../../store/spots'
import './SingleSpot.css'
// console.log('getSpots ', getSpots)

const SingleSpot = () => {

    const dispatch = useDispatch();
    let { spotId } = useParams();
    // turn id from string into a number value
    spotId = parseInt(spotId)
    // selecting with 'useSelector' an object from 'store/index' then 'store/spots'
    let spot = useSelector(state => state.spot.singleSpot)

    // console.log('spot: ', spot)

    // const images = spot[13]
    // console.log('images: ', images)
    // const { id, name, previewImage, city, state, avgRating, price } = spot;

    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)
    // const [images, setImages] = useState(spotImages)
    // console.log('images: ', images)

    // const firstImg = spotImages[0]
    // console.log('firstImg: ', firstImg)

    // const imgBox = spotImages.slice(1)
    // console.log('imgBox: ', imgBox)

    // const image = spotImages.map(image => (image.url))
    // console.log('image: ', image)




    // Renders spot object with 'dispatch' from store using thunk function 'getSpots'
    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])


    if (!spotImages) return null;

    return (
        <div className="entireSpot">
            <div className="nameLocation">
                <h2>{spot.name}</h2>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </div>
            <div className="imagesContainer">
                {/* <div className="bigImg"><img src={spotImages[0].url} alt='firstImg' /></div> */}
                <div className="imgBox">
                    {spotImages.map(image => (
                        <img src={image.url} className="img" alt="imgBox" />
                    ))}
                </div>
            </div>
                {/* <img src={image} alt='spotImg' /> */}
        </div>
    )
}


export default SingleSpot;
