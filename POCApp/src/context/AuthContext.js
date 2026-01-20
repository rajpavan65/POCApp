import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                api.setToken(storedToken);
            }
        } catch (error) {
            console.error('Error loading auth:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const data = await api.login(email, password);
        setToken(data.token);
        setUser(data.user);
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        return data;
    };

    const signup = async (name, email, password) => {
        const data = await api.signup(name, email, password);
        return data;
    };

    const logout = async () => {
        setToken(null);
        setUser(null);
        api.clearToken();
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
