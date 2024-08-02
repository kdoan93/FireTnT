import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteReviewModal } from "../ReviewModal/DeleteReviewModal";
import './SpotReviews.css'

const SpotReviews = () => {

    const dispatch = useDispatch();

    let { spotId } = useParams();
    spotId = parseInt(spotId)

    let sessionUser = useSelector(state => state.session.user)

    let reviews = useSelector(state => state.review.spot)

    const spotReviews = Object.values(reviews).reverse()

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let year = newDate.substring(10, 16)
        return month.concat(year)
    }

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    if(!reviews) return null
    if(!sessionUser) sessionUser = 0;

    console.log("reviews: ", reviews)

    return (
        <div className="spotReviewsContainer">
            {!spotReviews.length && sessionUser ? <h2>Be the first to post a review!</h2> : <></>}
            {!spotReviews.length ? <></> : spotReviews.map(review => (
                <div key={`${review.id}`} className="review">
                    <div className="nameDateContainer">
                        <span className="name">{review.User.firstName}</span>
                        <span className="date">{lowBudgetDateConverter(review.createdAt)}</span>
                    </div>
                    <div className="reviewBody">{review.review}</div>
                {review.User.id === sessionUser.id ?
                    <button className="deleteReviewButton">
                        <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal review={review}/>}/>
                    </button>
                        :
                    <></>
                }
                </div>
            ))}
        </div>
    )
}

export default SpotReviews;
