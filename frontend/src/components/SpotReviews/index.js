import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { DeleteReviewModal } from "../ReviewModal/DeleteReviewModal";
import './SpotReviews.css'

const SpotReviews = () => {

    const dispatch = useDispatch();

    let { spotId } = useParams();

    let sessionUser = useSelector(state => state.session.user)
    // console.log('SpotReviews sessionuser: ', sessionUser)

    spotId = parseInt(spotId)

    let reviews = useSelector(state => state.review.spot)
    const spotReviews = Object.values(reviews)
    // console.log('IN SpotReviews: spotReviews: ', spotReviews)
    // console.log('SpotReviews reviews: ', reviews)

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let year = newDate.substring(10, 16)
        return month.concat(year)
    }

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch])

    if(!reviews) return null
    if(!sessionUser) sessionUser = 0;

    return (
        <div className="spotReviewsContainer">
            {!spotReviews.length ? <h2>Be the first to post a review!</h2> : spotReviews.map(review => (
                <div key={`${review.id}`} className="review">
                    {/* <h2>hello</h2> */}
                    <span className="name">{review.User.firstName}</span>
                    {/* <span className="date">{Date(review.createdAt).substring(4,16)}</span> */}
                    <span className="date">{lowBudgetDateConverter(review.createdAt)}</span>
                    <div className="reviewBody">{review.review}</div>
                {review.User.id === sessionUser.id ?
                    <button className="deleteReviewButton">
                        <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal review={review} />} />
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
