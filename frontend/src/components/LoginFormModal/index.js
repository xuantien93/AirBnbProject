import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoUser = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
            .then(closeModal)
    }

    let errorsLength = Object.values(errors).length

    return (
        <div className={errorsLength ? "failed-login" : "normal-login"}>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className={errorsLength ? "failed-form" : "normal-form"}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        className="login-credential"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        className="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p className="error-text">{errors.credential}</p>
                )}
                <button disabled={(credential.length < 4) || (password.length < 6)} type="submit" className="login-button">Log In</button>
            </form>
            <button onClick={demoUser} className={errorsLength ? "failed-demo-button" : "normal-demo-button"}>Demo User</button>
        </div >
    );
}

export default LoginFormModal;
