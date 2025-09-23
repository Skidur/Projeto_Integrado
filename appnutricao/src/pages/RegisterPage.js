import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        console.log('Tentando registrar com:', { email, senha });
        alert('Funcionalidade de cadastro ainda não implementada.');
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <h2>Crie sua conta</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="form-button">
                        Cadastrar
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