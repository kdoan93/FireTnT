import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import './DeleteSpotModal.css'
import { deleteBooking } from "../../store/bookings";

export const DeleteBookingModal = ({ bookingId }) => {

    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();
        return dispatch(deleteBooking(bookingId)).then(closeModal)
    }

    return (
        <div className="deleteModal">
            <div className="deleteTitle">
                <h2 className="confirmDeleteTitle">Confirm Delete</h2>
                <p className="deleteParagraph">Are you sure you want to remove this booking?</p>
            </div>
            <div className="deleteButtons">
                <button className="b yesButton" onClick={handleClick}>Yes (Delete Booking)</button>
                <button className="b noButton" onClick={closeModal}>No (Keep Booking)</button>
            </div>
        </div>
    )
}
