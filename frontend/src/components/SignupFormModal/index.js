import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();



    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });

    };

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            {errors.email && <p className="error-text">{errors.email}</p>}
            {errors.username && <p className="error-text">{errors.username}</p>}
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        className="sign-up-container-label"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        className="sign-up-container-label"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        className="sign-up-container-label"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        className="sign-up-container-label"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        className="sign-up-container-label"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p className="error-text">{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        className="sign-up-container-label"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword}</p>
                )}
                <button className="sign-up-button" type="submit">Sign Up</button>
            </form>
        </div >
    );
}

export default SignupFormModal;
