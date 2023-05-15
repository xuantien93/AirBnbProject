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
                        <i class="fa-solid fa-truck-plane"></i>
                    </div>
                </NavLink>
                <NavLink exact to="/" className="top-logo-name">
                    <h1>LuxBnb</h1>
                </NavLink>
            </div>
            {isLoaded && (
                <div className='topright-nav'>
                    {sessionUser &&
                        <NavLink to="/spots/new" className="topright-nav-create-text">
                            <button>Create a New Spot</button>
                        </NavLink>}
                    <ProfileButton user={sessionUser} />
                </div>
            )}

        </div>
    );
}

export default Navigation;
