import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import './DeleteSpotModal.css'
import { deleteBooking } from "../../store/bookings";

export const DeleteBookingModal = ({ bookingId }) => {

    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            return dispatch(deleteBooking(bookingId)).then(closeModal)
        } catch(error) {
            if (error) {
                error = await error.json()
                // console.log('look >>>>>>>>>', error)
                return error
            }
        }
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
