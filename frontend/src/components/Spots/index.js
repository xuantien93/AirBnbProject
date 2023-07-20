import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import './SpotIndex.css'
import SingleSpotDetail from "../SingleSpotDetail";
import { cleanUp } from "../../store/spots";


function SpotIndex() {
    const [loading, setLoading] = useState(true);
    const spotsObj = useSelector(state => state.spots.allSpots)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpots())
            .then(() => setLoading(false))
        return () => dispatch(cleanUp())
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!spotsObj) return null
    const spots = Object.values(spotsObj)


    return (
        <div className="body">
            <div className="spot-body">
                {spots.length > 0 && spots.map(spot => <SingleSpotDetail key={spot.id} spot={spot} />)}
            </div>
            <div className="footer">


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="flask" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux" />



                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="postgresql" />



                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" alt="sqlalchemy" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" />



            </div>
            <div className="footer-about">
                <a href="https://github.com/xuantien93/AirBnbProject" target="_blank"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/tien-hoang-6205b5281" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
            </div>
        </div>
    )
}

export default SpotIndex;
