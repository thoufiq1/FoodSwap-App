import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            await login(email, password)
            toast.success('Welcome back!')
            navigate('/')
        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.message || 'Failed to login')
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
                <form className="auth-form" onSubmit={handleSubmit}>
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
                            placeholder="Enter password"
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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </motion.button>
                </form>
            </motion.div>

            <div className="auth-footer">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                <p style={{ marginTop: 'var(--space-md)', fontSize: '0.75rem' }}>
                    By joining, you agree to our <a href="#" style={{ color: 'var(--primary)' }}>Terms</a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
