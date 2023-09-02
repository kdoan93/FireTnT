import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
// import {}

export const ReviewModal = ({ spotId }) => {

    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault()
        return dispatch()
    }
}
