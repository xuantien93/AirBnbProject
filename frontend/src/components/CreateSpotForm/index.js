import "./CreateSpotForm.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createASpot } from "../../store/spots"



const CreateSpotForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongtitude] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [errors, setErrors] = useState({})


    const user = useSelector(state => state.session.user)

    useEffect(() => {
        setErrors({})
    }, [dispatch])

    if (!user) {
        history.push("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {}

        if (!address) errors.address = 'Address is required';
        if (!state) errors.state = 'State is required';
        if (!city) errors.city = 'City is required';
        if (!country) errors.country = 'Country is required';
        if (!title) errors.title = 'Name is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!price) errors.price = 'Price is required';
        if (!previewImage) errors.prevImg = 'Preview Image is required';
        if (!(+price)) errors.price = 'Price must be valid number'

        if (Object.values(errors).length) {
            await dispatch(createASpot({
                address,
                city,
                state,
                country,
                lat: latitude,
                lng: longitude,
                name: title,
                description,
                price
            })).then((response) => history.push(`/spots/${response.id}`))
        }
        setErrors = (errors)
    }

    return (
        <div className="form-container">
            <div className="create-spot-form-page">
                <h1 className="create-spot-title">Create a Spot</h1>
                <form onSubmit={handleSubmit} className="create-spot-form"></form>
            </div>
        </div>
    )

}




export default CreateSpotForm
