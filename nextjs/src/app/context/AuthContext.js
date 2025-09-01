"use client"
import { createContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter()
    const login = async(username, password) => {
        try{
            // const formData = new FormData();
            // formData.append('username', username);
            // formData.append('password', password);
            // const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token`, formData, {
            //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            // })
            const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token`, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            localStorage.setItem('token', response.data.access_token);
            setUser(response.data);
            router.push('/')
        } catch(error){
            console.log('Login error', error);
            throw error; // Re-throw error to be handled by the component
        }
    }

    const logout = () => {
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login')
    };
    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;