import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
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
                    <h1>Bem-vindo de volta ao Alimetria</h1>
                    <p>Monitore suas refeições e alcance seus objetivos de saúde com nossa ajuda.</p>
                </div>
            </div>
            <div className="auth-form-section">
                <div className="auth-container">
                    <h2>Entrar</h2>
                    <p>Bem-vindo de volta! Faça login para continuar.</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
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