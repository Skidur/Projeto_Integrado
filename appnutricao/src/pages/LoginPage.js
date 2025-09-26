import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erro no login.');
            }

            login(data.token);

            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-branding-section">
                <div className="auth-branding-content">
                    <h1>Bem-vindo de volta!</h1>
                    <p>Faça login para continuar sua jornada rumo a uma vida mais saudável!</p>
                </div>
            </div>

            <div className="auth-form-section">
                <div className="auth-container">
                    <div className="auth-header">
                        <h2>Entrar</h2>
                        <p>Faça login para continuar.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="auth-button">Entrar</button>
                    </form>
                    <p className="auth-switch">
                        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;