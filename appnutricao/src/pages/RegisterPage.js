import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (senha !== confirmarSenha) {
        setError('As senhas não coincidem!');
        return;
        }

        setIsLoading(true);

        try {
        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Falha ao cadastrar.');
        }

        alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
        navigate('/login');

        } catch (err) {
        setError(err.message);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
        <div className="auth-form-container">
            <h2>Crie sua conta</h2>
            <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

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
            <div className="form-group">
                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                <input
                type="password"
                id="confirmarSenha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                />
            </div>
            <button type="submit" className="form-button" disabled={isLoading}>
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            </form>
            <p className="auth-switch-text">
            Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
        </div>
        </div>
    );
}

export default RegisterPage;