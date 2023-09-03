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

    const sessionUser = useSelector(state => state.session.user)
    // console.log('SpotReviews sessionuser: ', sessionUser)

    spotId = parseInt(spotId)

    let reviews = useSelector(state => state.review.allReviews)
    const spotReviews = Object.values(reviews)
    console.log('IN SpotReviews: spotReviews: ', spotReviews)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch])

    if(!reviews) return null
    if(!sessionUser) return null

    return (
        <div className="spotReviewsContainer">
            {!spotReviews.length ? <h2>Be the first to post a review!</h2> : spotReviews.map(review => (
                <div key={`${review.id}`} className="review">
                    {/* <h2>hello</h2> */}
                    <span className="name">{review.User.firstName}</span>
                    <span className="date">{review.createdAt}</span>
                    <div className="reviewBody">{review.review}</div>
                {review.User.id === sessionUser.id ?
                    <button className="deleteReviewButton">
                        <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal reviewId={review.id} />} />
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
