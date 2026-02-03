import { useNavigate, useLocation } from 'react-router-dom'

function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()

    const getActiveTab = () => {
        const path = location.pathname
        if (path === '/' || path === '/home') return 'home'
        if (path === '/recipient' || path === '/explore') return 'explore'
        if (path === '/notifications') return 'notifications'
        if (path === '/profile') return 'profile'
        return 'home'
    }

    const activeTab = getActiveTab()

    const NavButton = ({ tab, icon, label, onClick }) => (
        <button
            onClick={onClick}
            className={`bottom-nav-btn ${activeTab === tab ? 'active' : ''}`}
        >
            <span className={`material-symbols-outlined ${activeTab === tab ? 'fill' : ''}`}>
                {icon}
            </span>
            <span className="bottom-nav-label">{label}</span>
        </button>
    )

    return (
        <nav className="bottom-nav">
            <NavButton
                tab="home"
                icon="home"
                label="Home"
                onClick={() => navigate('/')}
            />
            <NavButton
                tab="explore"
                icon="explore"
                label="Explore"
                onClick={() => navigate('/recipient')}
            />
            <button
                onClick={() => navigate('/donor')}
                className="bottom-nav-fab"
            >
                <div className="fab-button">
                    <span className="material-symbols-outlined">add</span>
                </div>
            </button>
            <NavButton
                tab="notifications"
                icon="notifications"
                label="Alerts"
                onClick={() => navigate('/notifications')}
            />
            <NavButton
                tab="profile"
                icon="person"
                label="Profile"
                onClick={() => navigate('/profile')}
            />
        </nav>
    )
}

export default BottomNav
