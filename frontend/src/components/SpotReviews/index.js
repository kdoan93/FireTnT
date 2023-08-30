import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";

const SpotReviews = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)

    let reviews = useSelector(state => state.review.allReviews)
    console.log('IN SpotReviews: reviews: ', reviews)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch])

    return (
        <div>
            SPOT REVIEWS
        </div>
    )
}

export default SpotReviews;
