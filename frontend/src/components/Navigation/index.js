import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='top-container'>
            <div className='logo-and-name'>
                <NavLink exact to="/" className="top-navbar">
                    <div className='logo'>
                        <i className="fa-brands fa-airbnb"></i>
                    </div>
                </NavLink>
                <NavLink exact to="/" className="top-logo-name">
                    <h1>LuxBnb</h1>
                </NavLink>
            </div>
            <ul>
                {isLoaded && (
                    <>
                        <ProfileButton user={sessionUser} />
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navigation;
