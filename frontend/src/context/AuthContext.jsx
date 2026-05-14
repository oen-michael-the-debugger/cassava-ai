/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true); // Added to prevent flickering

    // 1. Fetch User Data on Load/Reload
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // Make sure this endpoint matches your backend auth route
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
                        headers: { 'x-auth-token': token }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error("Auth Error:", err);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    // 2. Sync Token with localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};