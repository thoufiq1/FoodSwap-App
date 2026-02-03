import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
    const { user, userData, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <svg className="logo-icon" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#28A745', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#FF7F50', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" />
                        <text x="50" y="65" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle">FS</text>
                    </svg>
                    FoodSwap
                </Link>

                {user ? (
                    <div className="nav-links">
                        <Link
                            to={userData?.type === 'Donor' ? '/donor' : '/recipient'}
                            className="nav-link"
                        >
                            Dashboard
                        </Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </div>
                ) : (
                    <nav className="nav-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#how-it-works" className="nav-link">How It Works</a>
                    </nav>
                )}

                <div className="user-menu">
                    {user ? (
                        <>
                            <Link to="/profile" className="user-avatar" title={userData?.name}>
                                {getInitials(userData?.name)}
                            </Link>
                            <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
