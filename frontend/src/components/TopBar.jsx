import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function TopBar({ title, showBack = false, showMenu = false, rightIcon = null, onRightClick = null }) {
    const navigate = useNavigate()
    const { user, userData } = useAuth()

    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <header className="top-bar">
            <div className="top-bar-left">
                {showBack ? (
                    <button onClick={() => navigate(-1)} className="top-bar-btn">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                ) : showMenu ? (
                    <span className="material-symbols-outlined">menu</span>
                ) : (
                    <div className="top-bar-logo">
                        <span className="material-symbols-outlined">volunteer_activism</span>
                    </div>
                )}
                <h2 className="top-bar-title">{title}</h2>
            </div>
            <div className="top-bar-right">
                {rightIcon ? (
                    <button onClick={onRightClick} className="top-bar-btn">
                        <span className="material-symbols-outlined">{rightIcon}</span>
                    </button>
                ) : user ? (
                    <button onClick={() => navigate('/profile')} className="top-bar-avatar">
                        {getInitials(userData?.name)}
                    </button>
                ) : (
                    <button onClick={() => navigate('/login')} className="top-bar-btn">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                )}
            </div>
        </header>
    )
}

export default TopBar
