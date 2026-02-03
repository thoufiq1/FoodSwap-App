import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function SignUpPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('Donor')
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try {
            await signup(email, password, name, userType)
            toast.success('Account created successfully!')
            navigate(userType === 'Donor' ? '/donor' : '/recipient')
        } catch (error) {
            console.error('Signup error:', error)
            toast.error(error.message || 'Failed to create account')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <motion.div
                className="auth-logo"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-logo-icon">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', padding: '8px' }}>
                        <span className="material-symbols-outlined">nutrition</span>
                        <span className="material-symbols-outlined">eco</span>
                    </div>
                </div>
                <h1>FoodSwap</h1>
                <p>Community Freshness Shared</p>
            </motion.div>

            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* User Type Toggle */}
                <div className="toggle-container" style={{ marginBottom: 'var(--space-xl)' }}>
                    <button
                        type="button"
                        className={`toggle-option ${userType === 'Donor' ? 'active' : ''}`}
                        onClick={() => setUserType('Donor')}
                    >
                        🎁 Donor
                    </button>
                    <button
                        type="button"
                        className={`toggle-option ${userType === 'Recipient' ? 'active' : ''}`}
                        onClick={() => setUserType('Recipient')}
                    >
                        🍽️ Recipient
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="hello@foodswap.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="At least 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: 'var(--space-md)' }}
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </motion.button>
                </form>
            </motion.div>

            <div className="auth-footer">
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
                <p style={{ marginTop: 'var(--space-md)', fontSize: '0.75rem' }}>
                    By joining, you agree to our <a href="#" style={{ color: 'var(--primary)' }}>Terms</a>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage
