import "./CreateSpotForm.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createASpot, createSpotImageThunk, fetchSpots, updateSpotThunk } from "../../store/spots"



const CreateSpotForm = ({ spot, update }) => {
    const spotId = spot?.id

    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(spot?.country || '')
    const [address, setAddress] = useState(spot?.address || '')
    const [city, setCity] = useState(spot?.city || '')
    const [state, setState] = useState(spot?.state || '')
    const [latitude, setLatitude] = useState(1)
    const [longitude, setLongtitude] = useState(1)
    const [description, setDescription] = useState(spot?.description || '')
    const [title, setTitle] = useState(spot?.name || '')
    const [price, setPrice] = useState(spot?.price || '')
    const [previewImage, setPreviewImage] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})


    const user = useSelector(state => state.session.user)


    useEffect(() => {
        const error = {}
        if (!address) error.address = 'Address is required';
        if (!state) error.state = 'State is required';
        if (!city) error.city = 'City is required';
        if (!country) error.country = 'Country is required';
        if (!title) error.title = 'Name is required';
        if (description.length < 30) error.description = 'Description needs a minimum of 30 characters';
        if (!price) error.price = 'Price is required';
        if (!previewImage && !update) error.prevImg = 'Preview Image is required';
        if (!(+price)) error.price = 'Price must be valid number'

        const imageExtensions = ['.png', '.jpg', '.jpeg']

        if (previewImage && !imageExtensions.includes(previewImage.slice(-5))) {
            error.prevImg = "Please make sure your images end with either .png, .jpg, or .jpeg"
        }
        if (img1 && !imageExtensions.includes(img1.slice(-5))) {
            error.img1 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        }
        if (img2 && !imageExtensions.includes(img2.slice(-5))) {
            error.img2 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        }
        if (img3 && !imageExtensions.includes(img3.slice(-5))) {
            error.img3 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        }
        if (img4 && !imageExtensions.includes(img4.slice(-5))) {
            error.img4 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        }

        setErrors(error)
    }, [country, address, state, city, title, description, price, previewImage])

    // useEffect(() => {
    //     setErrors({})
    // }, [dispatch])

    if (!user) {
        history.push("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const error = {}
        setSubmitted(true)
        // if (!address) error.address = 'Address is required';
        // if (!state) error.state = 'State is required';
        // if (!city) error.city = 'City is required';
        // if (!country) error.country = 'Country is required';
        // if (!title) error.title = 'Name is required';
        // if (description.length < 30) error.description = 'Description needs a minimum of 30 characters';
        // if (!price) error.price = 'Price is required';
        // if (!previewImage) error.prevImg = 'Preview Image is required';
        // if (!(+price)) error.price = 'Price must be valid number'

        // const imageExtensions = ['.png', '.jpg', '.jpeg']

        // if (previewImage && !imageExtensions.includes(previewImage.slice(-5))) {
        //     error.prevImg = "Please make sure your images end with either .png, .jpg, or .jpeg"
        // }
        // if (img1 && !imageExtensions.includes(img1.slice(-5))) {
        //     error.img1 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        // }
        // if (img2 && !imageExtensions.includes(img2.slice(-5))) {
        //     error.img2 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        // }
        // if (img3 && !imageExtensions.includes(img3.slice(-5))) {
        //     error.img3 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        // }
        // if (img4 && !imageExtensions.includes(img4.slice(-5))) {
        //     error.img4 = "Please make sure your images end with either .png, .jpg, or .jpeg"
        // }


        // setErrors(error)

        const imgURLs = [{ url: previewImage, preview: true }]
        if (img1.length) {
            imgURLs.push({ url: img1, preview: false })
        }
        if (img2.length) {
            imgURLs.push({ url: img2, preview: false })
        }
        if (img3.length) {
            imgURLs.push({ url: img3, preview: false })
        }
        if (img4.length) {
            imgURLs.push({ url: img4, preview: false })
        }
        console.log("this is spot", spot)

        const payload = {
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            name: title,
            description,
            price: Number(price),
            spotImages: imgURLs
        }



        if (update) {
            payload.id = spotId
        }

        let spotInfo;
        console.log(Object.values(errors))
        if (!Object.values(errors).length) {
            spotInfo = await dispatch(update === true ? updateSpotThunk(payload) : createASpot(payload))
            console.log(spotInfo)
        }

        if (spotInfo) {
            history.push(`/spots/${spotInfo.id}`)
        }
    }

    return (
        <div className="form-container">
            <div className="create-spot-form-page">
                <h1 className="create-spot-title">{update === true ? "Update a Spot" : "Create a Spot"}</h1>
                <form onSubmit={handleSubmit} className="create-spot-form">
                    <h4>Where's your place located?</h4>
                    <p>Guests will only get your exact address once they book a reservation</p>
                    <label>Country:</label>
                    {errors.country && submitted && < p className="error-text">{errors.country}</p>}
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"

                    ></input>

                    <label>Street Address:</label>
                    {errors.address && submitted && <p className="error-text">{errors.address}</p>}
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"

                    ></input>

                    <div className="city-box">
                        <label>City:</label>
                        {errors.city && submitted && <p className="error-text">{errors.city}</p>}
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"

                        ></input>
                    </div>

                    <div className="state-box">
                        <label>State:</label>
                        {errors.state && submitted && <p className="error-text">{errors.state}</p>}
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                        ></input>
                    </div>

                    <div className="lat-box">
                        <label>Latitude:</label>
                        <input
                            type="text"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="Optional"
                        ></input>
                    </div>
                    <div className="lng-box">
                        <label>Longtitude:</label>
                        <input
                            type="text"
                            value={longitude}
                            onChange={(e) => setLongtitude(e.target.value)}
                            placeholder="Optional"
                        ></input>
                    </div>
                    <div className="line"></div>
                    <h4>Describe your place to guests</h4>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</p>
                    <textarea
                        className="description-form-box"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                        rows='7'
                        cols='44'

                    ></textarea>
                    {errors.description && submitted && <p className="error-text">{errors.description}</p>}
                    <div className="line"></div>
                    <div className="spot-title">
                        <h4>Create a title for your spot</h4>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Name of your spot"

                        ></input>
                        {errors.title && submitted && <p className="error-text">{errors.title}</p>}
                    </div>
                    <div className="line"></div>
                    <div className="spot-price-box">
                        <h4>Set a base price for your spot</h4>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                        $ <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"

                        ></input>
                        {errors.price && submitted && <p className="error-text">{errors.price}</p>}
                    </div>
                    <div className="line"></div>
                    {!update && (<div className="spot-image-upload-box">
                        <h4>Liven up your spot with photos</h4>
                        <p>Submit a link to at least one photo to publish your spot</p>
                        <div className="image-inputs">
                            <input
                                type="text"
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                                placeholder="Preview Image URL"

                            ></input>
                            {errors.prevImg && submitted && <p className="error-text">{errors.prevImg}</p>}
                            <input
                                type="text"
                                value={img1}
                                onChange={(e) => setImg1(e.target.value)}
                                placeholder="Image URL"
                            >
                            </input>
                            <input
                                type="text"
                                value={img2}
                                onChange={(e) => setImg2(e.target.value)}
                                placeholder="Image URL"
                            >
                            </input>
                            <input
                                type="text"
                                value={img3}
                                onChange={(e) => setImg3(e.target.value)}
                                placeholder="Image URL"
                            >
                            </input>
                            <input
                                type="text"
                                value={img4}
                                onChange={(e) => setImg4(e.target.value)}
                                placeholder="Image URL"
                            >
                            </input>
                        </div>
                    </div>)}
                    <button type="submit" className="submit-spot-form-button">{update === true ? "Update Spot" : "Create Spot"}</button>
                </form>
            </div>
        </div >
    )

}




export default CreateSpotForm
