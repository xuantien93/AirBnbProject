import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './SingleSpotDetail.css'
import OpenModalButton from '../OpenModalButton';
import DeleteModal from './DeleteModal';
import { useEffect } from 'react';


const SingleSpotDetail = ({ spot, manage }) => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    // console.log("this is user", user)
    // console.log("this  is spot", spot)
    const handleClick = () => {
        history.push(`/spots/${spot.id}`)
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        history.push(`/spots/${spot.id}/edit`)
    }




    let previewImg;
    spot.previewImage ? previewImg = spot.previewImage : previewImg = "https://i.imgur.com/IySASzx.jpg"

    return (
        <div className='all-spots'>
            <div className='detail-spot' onClick={handleClick}>
                <div className='tooltip'>
                    <span className='tooltiptext'>{spot.name}</span>
                    <img src={previewImg} alt='' className='preview-image' title={spot.name}></img>
                </div>
            </div>
            <div className='city-state'>
                <span>{spot.city}, </span>
                <span>{spot.state}</span>
            </div>
            <span className='star-icon'><i id="fa-star-review" className='fa-solid fa-star'></i> {!spot.avgRating.length ? "New" : spot.avgRating}</span>
            <div><span className='price'>${Number(spot.price).toFixed(2)}</span> night</div>
            {user?.id === spot.ownerId && manage && <div className='update-delete-button'>
                <button onClick={handleUpdate} className='update-button'>Update</button>
                <OpenModalButton
                    className="delete-button"
                    buttonText='Delete'
                    modalComponent={<DeleteModal spotId={spot.id} />}
                />
            </div>}
        </div>
    )

}






export default SingleSpotDetail
