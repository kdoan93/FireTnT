import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import spotsReducer from '../../store/spots';
// import {}

export const ReviewModal = ({ spot }) => {

    // console.log('ReviewModal spot: ', spot)

    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault()
        return dispatch()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('you clicked the button')
    }

    return (
        <div className='reviewModal'>
            <h2 className='reviewTitle'>How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                
            </form>

        </div>
    )
}
