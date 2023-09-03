import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import './DeleteSpotModal.css'

export const DeleteSpotModal = ({ spotId }) => {

    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();
        return dispatch(deleteSpot(spotId)).then(closeModal)
    }

    return (
        <div className="deleteModal">
            <div className="deleteTitle">
                <h2 className="confirmDeleteTitle">Confirm Delete</h2>
                <p className="deleteParagraph">Are you sure you want to remove this spot?</p>
            </div>
            <div className="deleteButtons">
                <button className="b yesButton" onClick={handleClick}>Yes (Delete Spot)</button>
                <button className="b noButton" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
}
