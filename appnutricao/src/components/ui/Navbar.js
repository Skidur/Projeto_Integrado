import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleScroll = (event, targetId) => {
        event.preventDefault(); 

        if (window.location.pathname === '/') {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            navigate(`/#${targetId}`);
        }
    };

    return (
        <header className="navbar-container">
            <nav className="navbar">
                <Link to={user ? "/resumo" : "/"} className="logo">
                    Alimetria
                </Link>

                {!user && (
                    <ul className="nav-center">
                        <li><a href="/#features" onClick={(e) => handleScroll(e, 'features')}>Funcionalidades</a></li>
                        <li><a href="/#sobre" onClick={(e) => handleScroll(e, 'sobre')}>Sobre</a></li>
                        <li><a href="/#contato" onClick={(e) => handleScroll(e, 'contato')}>Contato</a></li>
                    </ul>
                )}

                <div className="nav-right">
                    {user ? (
                        <div className="nav-user-info">
                            <span>Olá, {user.email.split('@')[0]}</span>
                            <button onClick={logout} className="btn btn-logout">Sair</button>
                        </div>
                    ) : (
                        <div className="nav-actions">
                            <Link to="/login" className="btn btn-login">Login</Link>
                            <Link to="/register" className="btn btn-register">Cadastre-se</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;