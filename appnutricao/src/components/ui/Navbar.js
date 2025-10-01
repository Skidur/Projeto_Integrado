import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleScroll = (event, targetId) => {
        event.preventDefault();
        if (window.location.pathname !== '/') {
            navigate(`/#${targetId}`);
            return;
        }
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (targetId === 'contato') {
                setTimeout(() => { targetElement.classList.add('is-highlighted'); }, 1000);
                setTimeout(() => { targetElement.classList.remove('is-highlighted'); }, 2200); 
            }
        }
    };

    const handleLogoClick = (event) => {
        if (window.location.pathname === '/') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate('/');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="navbar-container">
            <nav className="navbar">
                <Link
                    to={user ? "/" : "/"}
                    className="logo"
                    onClick={handleLogoClick}
                >
                    Alimetria
                </Link>

                {!user && (
                    <ul className="nav-center">
                        <li><a href="#features" onClick={(e) => handleScroll(e, 'features')}>Funcionalidades</a></li>
                        <li><a href="#sobre" onClick={(e) => handleScroll(e, 'sobre')}>Sobre</a></li>
                        <li><a href="#contato" onClick={(e) => handleScroll(e, 'contato')}>Contato</a></li>
                    </ul>
                )}

                <div className="nav-right">
                    {user ? (
                        <div className="nav-user-info">
                            <span className="user-greeting">
                                Olá, <strong className="user-name">{user.nome || user.email.split('@')[0]}</strong>
                            </span>
                            <button onClick={handleLogout} className="btn-logout">Sair</button>
                        </div>
                    ) : (
                        <div className="nav-actions">
                            <Link to="/login" className="btn-login">Login</Link>
                            <Link to="/register" className="btn-register">Cadastre-se</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;