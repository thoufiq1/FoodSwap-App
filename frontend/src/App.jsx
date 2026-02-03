import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DonorDashboard from './pages/DonorDashboard'
import RecipientDashboard from './pages/RecipientDashboard'
import ProfilePage from './pages/ProfilePage'
import Header from './components/Header'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'

function ProtectedRoute({ children, allowedType }) {
    const { user, userData, loading } = useAuth()

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (allowedType && userData?.type !== allowedType) {
        return <Navigate to={userData?.type === 'Donor' ? '/donor' : '/recipient'} replace />
    }

    return children
}

function App() {
    const { user, userData, loading } = useAuth()
    const location = useLocation()

    // Don't show nav on auth pages
    const isAuthPage = ['/login', '/signup'].includes(location.pathname)

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={user ? <Navigate to={userData?.type === 'Donor' ? '/donor' : '/recipient'} /> : <LoginPage />} />
                    <Route path="/signup" element={user ? <Navigate to={userData?.type === 'Donor' ? '/donor' : '/recipient'} /> : <SignUpPage />} />
                    <Route
                        path="/donor"
                        element={
                            <ProtectedRoute allowedType="Donor">
                                <DonorDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recipient"
                        element={
                            <ProtectedRoute allowedType="Recipient">
                                <RecipientDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
            {!isAuthPage && <BottomNav />}
        </div>
    )
}

export default App
