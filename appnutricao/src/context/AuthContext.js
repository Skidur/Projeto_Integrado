import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                console.error("Token inválido:", error);
                localStorage.removeItem('authToken');
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    const register = async (nome, email, senha) => {
        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Falha ao cadastrar.');
        }

        return data;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};