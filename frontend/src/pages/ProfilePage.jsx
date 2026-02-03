import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

function ProfilePage() {
    const { userData, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    // Demo stats
    const stats = {
        foodSaved: userData?.type === 'Donor' ? '125kg' : '45kg',
        peopleFed: userData?.type === 'Donor' ? '480' : '—',
        level: 12
    }

    // Demo activities
    const recentActivities = [
        { title: 'Donated 5kg Vegetables', time: 'Today, 2:30 PM', status: 'Completed' },
        { title: 'Successful Bread Swap', time: 'Yesterday, 4:15 PM', status: 'Completed' }
    ]

    return (
        <div className="profile-page">
            <TopBar title="Impact Profile" showBack rightIcon="settings" />

            <motion.div
                className="profile-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        {getInitials(userData?.name)}
                        <div className="profile-level">
                            <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>stars</span>
                            Level {stats.level}
                        </div>
                    </div>
                    <h2 className="profile-name">{userData?.name || 'User'}</h2>
                    <p className="profile-type">
                        {userData?.type === 'Donor' ? 'Community Hero' : 'Food Rescuer'}
                    </p>
                </div>

                {/* Profile Body */}
                <div className="profile-body">
                    {/* Stats */}
                    <div className="profile-stats">
                        <div className="profile-stat primary">
                            <p className="profile-stat-label">FOOD SAVED</p>
                            <p className="profile-stat-value">{stats.foodSaved}</p>
                        </div>
                        <div className="profile-stat secondary">
                            <p className="profile-stat-label">PEOPLE FED</p>
                            <p className="profile-stat-value">{stats.peopleFed}</p>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="profile-section">
                        <div className="profile-section-title">
                            Recent Activity
                            <button className="profile-section-link">View All</button>
                        </div>
                        <div className="activity-list">
                            {recentActivities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    className="activity-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <div className="activity-icon">
                                        <span className="material-symbols-outlined">restaurant</span>
                                    </div>
                                    <div className="activity-content">
                                        <p className="activity-title">{activity.title}</p>
                                        <p className="activity-time">{activity.time}</p>
                                    </div>
                                    <span className="activity-status">{activity.status}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="profile-section">
                        <div className="profile-section-title">Account</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <div className="activity-item">
                                <div className="activity-icon" style={{ background: 'rgba(60, 180, 112, 0.1)' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>email</span>
                                </div>
                                <div className="activity-content">
                                    <p className="activity-title">Email</p>
                                    <p className="activity-time">{userData?.email || 'Not set'}</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon" style={{ background: 'rgba(255, 140, 66, 0.1)' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>badge</span>
                                </div>
                                <div className="activity-content">
                                    <p className="activity-title">Account Type</p>
                                    <p className="activity-time">{userData?.type || 'User'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginTop: 'var(--space-xl)' }}>
                        <motion.button
                            className="btn btn-outline"
                            style={{ width: '100%' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(userData?.type === 'Donor' ? '/donor' : '/recipient')}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            Go to Dashboard
                        </motion.button>
                        <motion.button
                            className="btn btn-ghost"
                            style={{ width: '100%', color: 'var(--danger)' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                        >
                            <span className="material-symbols-outlined">logout</span>
                            Sign Out
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ProfilePage
