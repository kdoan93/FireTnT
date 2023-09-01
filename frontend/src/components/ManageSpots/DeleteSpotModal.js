import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import deleteSpot thunk from store
import { deleteSpot } from "../../store/spots";

export const DeleteSpotModal = ({ spotId }) => {

    const dispatch = useDispatch();

    const { closeModal } = useModal();
    console.log('spotId: ', spotId)

    const handleClick = (e) => {
        e.preventDefault();
        // console.log('delete handleClick')
        return dispatch(deleteSpot(spotId)).then(closeModal)
    }

    return (
        <div className="deleteModal">
            {/* <h2>DELETE MODAL</h2> */}
            <div className="deleteTitle">
                <h2 className="confirmDeleteTitle">Confirm Delete</h2>
                <p className="deleteParagraph">Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className="deleteButtons">
                <button className="yesButton" onClick={handleClick}>Yes (Delete Spot)</button>
                <button className="noButton" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
}
