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
        <div className="auth-page-container">
            <div className="auth-branding-section">
                <div className="auth-branding-content">
                    <h1>Junte-se ao Alimetria</h1>
                    <p>Comece sua jornada para uma vida mais saudável hoje mesmo.</p>
                </div>
            </div>

            <div className="auth-form-section">
                <div className="auth-container">
                    <h2>Criar Conta</h2>
                    <p>Preencha os campos abaixo para começar.</p>
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

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="auth-button" disabled={isLoading}>
                            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </form>
                    <p className="auth-switch">
                        Já tem uma conta? <Link to="/login">Faça login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;