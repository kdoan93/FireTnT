import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal'
import * as reviewActions from '../../store/reviews'
import './ReviewModal.css'

export const ReviewModal = ({ spot }) => {

    const dispatch = useDispatch();

    const [reviewText, setReviewText] = useState('')
    const [starRating, setStarRating] = useState(0)
    const [tempRating, setTempRating] = useState(starRating)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    // useEffect(() => {

        // setErrors(errors)

    // }, [reviewText, starRating])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('starRating: ', starRating)
        // console.log('reviewText: ', reviewText)
        setErrors({})
        if (starRating < 1) setErrors(errors.stars="Please add star rating.")
        if (reviewText.length < 10) setErrors(errors.review="Review must be at least 10 characters long")


        console.log('errors: ', errors)
        // if (errors) return

        return dispatch(reviewActions.createReview({
            review: reviewText, stars: starRating
        }, spot.id))
        .then(closeModal)
        .catch(error => {
             setErrors(error)})
    }

    return (
        <div className='reviewModal'>
            <h2 className='reviewTitle'>How was your stay?</h2>
            <div className='reviewErrorsText'>
                {errors.stars && <span className='error'>{errors.stars}</span>}
                {errors.review && <span className='error'>{errors.review}</span>}
                {errors.error && <span className='error'>{errors}</span>}
            </div>
            <form onSubmit={handleSubmit}>

                <textarea
                    className='reviewInput'
                    type='textarea'
                    placeholder='Leave your review here...'
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                >
                </textarea>

                <div className='starRatingContainer'>

                    <div
                        onClick={() => setStarRating(1)}
                        className=  {
                            (starRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star")
                            &&
                            (tempRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star")
                        }
                        onMouseEnter={() => setTempRating(1)}
                        onMouseLeave={() => setTempRating(1)}
                    >
                    </div>


                    <div
                        onClick={() => setStarRating(2)}
                        className=  {
                            (starRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star")
                            &&
                            (tempRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star")
                        }
                        onMouseEnter={() => setTempRating(2)}
                        onMouseLeave={() => setTempRating(2)}
                    >
                    </div>
                    <div
                        onClick={() => setStarRating(3)}
                        className=  {
                            (starRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star")
                            &&
                            (tempRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star")
                        }
                        onMouseEnter={() => setTempRating(3)}
                        onMouseLeave={() => setTempRating(3)}
                    >
                    </div>
                    <div
                        onClick={() => setStarRating(4)}
                        className=  {
                            (starRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star")
                            &&
                            (tempRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star")
                        }
                        onMouseEnter={() => setTempRating(4)}
                        onMouseLeave={() => setTempRating(4)}
                    >
                    </div>
                    <div
                        onClick={() => setStarRating(5)}
                        className=  {
                            (starRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star")
                            &&
                            (tempRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star")
                        }
                        onMouseEnter={() => setTempRating(5)}
                        onMouseLeave={() => setTempRating(5)}
                    >
                    </div>
                        <div className='starsText'>Stars</div>
                </div>

                <button className='submitReviewButton'
                disabled={!starRating || reviewText.length < 10}
                >
                    Submit Your Review
                </button>

            </form>

        </div>
    )
}
