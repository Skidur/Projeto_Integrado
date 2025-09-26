import React, { useState, useEffect } from 'react';
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

function RegisterPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        if (confirmarSenha && senha !== confirmarSenha) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    }, [senha, confirmarSenha]);

    const { register } = useAuth();
    const navigate = useNavigate();

    const checkPasswordStrength = (password) => { let score = 0; let strengthText = ''; if (password.length >= 8) score++; if (/[a-z]/.test(password)) score++; if (/[A-Z]/.test(password)) score++; if (/[0-9]/.test(password)) score++; if (/[^a-zA-Z0-9]/.test(password)) score++; switch (score) { case 1: case 2: strengthText = 'Fraca'; break; case 3: strengthText = 'Média'; break; case 4: strengthText = 'Forte'; break; case 5: strengthText = 'Muito Forte'; break; default: strengthText = ''; } setPasswordStrength({ score, text: strengthText }); };
    const handlePasswordChange = (e) => { const newPassword = e.target.value; setSenha(newPassword); checkPasswordStrength(newPassword); };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!passwordsMatch) {
            setError('As senhas não coincidem!');
            return;
        }
        if (passwordStrength.score < 3) {
            setError('Sua senha é muito fraca.');
            return;
        }
        setIsLoading(true);
        try {
            await register(nome, email, senha);
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
                    <div className="auth-header">
                        <h2>Criar Conta</h2>
                        <p>Preencha os campos abaixo para começar.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <div className="input-wrapper">
                                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="senha"
                                    value={senha}
                                    onChange={handlePasswordChange}
                                    maxLength="50"
                                    required
                                />
                                <button 
                                    type="button" 
                                    className={`password-toggle-btn ${showPassword ? 'is-visible' : ''}`} 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>
                        {senha.length > 0 && (
                            <div className="password-strength-meter-container">
                                <div className="password-strength-meter">
                                    <div className={`strength-bar score-${passwordStrength.score}`}></div>
                                    <span className="strength-text">{passwordStrength.text}</span>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="confirmarSenha">Confirmar Senha</label>
                            <div className="input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmarSenha"
                                    className={!passwordsMatch ? 'input-error' : ''}
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    maxLength="50"
                                    required
                                />
                                <button 
                                    type="button" 
                                    className={`password-toggle-btn ${showConfirmPassword ? 'is-visible' : ''}`}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {!passwordsMatch && <p className="error-text">As senhas não coincidem.</p>}
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