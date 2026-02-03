import { createContext, useContext, useState, useEffect } from 'react'

// Mock Auth Context for demo purposes
// Replace with Firebase Auth in production
const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

// Demo users for testing
const DEMO_USERS = {
    'donor@demo.com': {
        uid: 'demo-donor-1',
        email: 'donor@demo.com',
        name: 'John Donor',
        type: 'Donor',
        phone: '+1234567890',
        location: { lat: 40.7128, lng: -74.006, address: 'New York, NY' }
    },
    'recipient@demo.com': {
        uid: 'demo-recipient-1',
        email: 'recipient@demo.com',
        name: 'Jane Recipient',
        type: 'Recipient',
        phone: '+0987654321',
        location: { lat: 40.7580, lng: -73.9855, address: 'Manhattan, NY' }
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check localStorage for persisted user
        const savedUser = localStorage.getItem('foodswap_user')
        if (savedUser) {
            const parsed = JSON.parse(savedUser)
            setUser(parsed)
            setUserData(parsed)
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        // Demo login - in production, use Firebase Auth
        const demoUser = DEMO_USERS[email.toLowerCase()]
        if (demoUser) {
            setUser(demoUser)
            setUserData(demoUser)
            localStorage.setItem('foodswap_user', JSON.stringify(demoUser))
            return { success: true, user: demoUser }
        }

        // Allow any email/password for demo
        const newUser = {
            uid: 'user-' + Date.now(),
            email: email,
            name: email.split('@')[0],
            type: 'Recipient',
            phone: '',
            location: { lat: 40.7128, lng: -74.006, address: 'New York, NY' }
        }
        setUser(newUser)
        setUserData(newUser)
        localStorage.setItem('foodswap_user', JSON.stringify(newUser))
        return { success: true, user: newUser }
    }

    const signup = async (email, password, name, userType) => {
        // Demo signup - in production, use Firebase Auth
        const newUser = {
            uid: 'user-' + Date.now(),
            email: email,
            name: name,
            type: userType,
            phone: '',
            location: { lat: 40.7128, lng: -74.006, address: 'New York, NY' },
            createdAt: new Date().toISOString()
        }
        setUser(newUser)
        setUserData(newUser)
        localStorage.setItem('foodswap_user', JSON.stringify(newUser))
        return { success: true, user: newUser }
    }

    const logout = async () => {
        setUser(null)
        setUserData(null)
        localStorage.removeItem('foodswap_user')
    }

    const updateProfile = async (updates) => {
        const updatedUser = { ...userData, ...updates }
        setUser(updatedUser)
        setUserData(updatedUser)
        localStorage.setItem('foodswap_user', JSON.stringify(updatedUser))
        return { success: true }
    }

    const value = {
        user,
        userData,
        loading,
        login,
        signup,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
