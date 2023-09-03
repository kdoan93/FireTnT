import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { deleteReview } from '../../store/reviews'

export default function DeleteReviewModal({ spotId }) {

    const dispatch = useDispatch();

    const { closeModal } = useModal;

    const handleClick = (e) => {
        e.preventDefault();
        // return dispatch(deleteReview(spotId)).then(closeModal)
    }

    return (
        <div className="deleteModal">
            <div className="deleteTitle">
                <h2 className="confirmDeleteTitle">Confirm Delete</h2>
                <p className="deleteParagraph">Are you sure you want to delete this review?</p>
            </div>
            <div className="deleteButtons">
                <button className="b yesButton" onClick={handleClick}> Yes (Delete Review) </button>
                <button className="b noButton" onClick={closeModal}> No (Keep Review) </button>
            </div>
        </div>
    )
}
