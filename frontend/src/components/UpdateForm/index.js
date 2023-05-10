import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSingleSpot } from "../../store/spots"
import CreateSpotForm from "../CreateSpotForm"



const UpdateForm = () => {
    const { id } = useParams()
    const [spotObj, setSpotObj] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSingleSpot(id)).then((data) => setSpotObj(data))
    }, [dispatch, id])

    if (!spotObj) return null

    return (
        <CreateSpotForm spot={spotObj} update={true} />
    )

}



export default UpdateForm
