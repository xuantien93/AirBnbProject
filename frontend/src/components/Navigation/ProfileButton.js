import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className="profile-button-container">
                <button onClick={openMenu} className="profile-button-icon">
                    <i className="fa-solid fa-bars"></i>
                    <i className="fas fa-user-circle" />
                </button>
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <div className="user-menu">
                            <div className="user-menu-content">
                                <span>Hello, {user.username}</span>
                                <span>{user.email}</span>
                                <span
                                    className="manage-spots-button"
                                    onClick={(e) => {
                                        history.push(`/spots/current`)
                                        closeMenu()
                                    }}
                                >Manage Spots
                                </span>
                                <span
                                    className="manage-reviews-button"
                                    onClick={(e) => {
                                        history.push(`/reviews/current`)
                                        closeMenu()
                                    }}
                                >Manage Reviews
                                </span>
                                <span>
                                    <button onClick={logout} className="log-out-button">Log Out</button>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="open-modal-menu">
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    className="login-topright"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    className="signup-topright"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </div>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
}

export default ProfileButton;
