import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                NutriTrack
            </Link>
            <div className="navbar-links">
                <Link to="/login" className="nav-button">
                    Login
                </Link>
                <Link to="/register" className="nav-button primary">
                    Cadastro
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;