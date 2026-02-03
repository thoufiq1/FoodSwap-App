import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import StatsPanel from '../components/StatsPanel'

function LandingPage() {
    const stats = {
        totalDonations: 12000,
        foodSaved: 8500,
        peopleFed: 2800,
        co2Saved: 1200
    }

    return (
        <div className="landing-page">
            <TopBar title="FoodSwap" />

            {/* Hero Section - Mobile First */}
            <section className="hero">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Visual Element */}
                    <div className="hero-visual">
                        <div className="hero-visual-icons">
                            <div className="hero-visual-icon">
                                <span className="material-symbols-outlined">local_pizza</span>
                            </div>
                            <div className="hero-visual-icon">
                                <span className="material-symbols-outlined">nutrition</span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="hero-text">
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Save Food. <span className="gradient-text">Feed People.</span>
                        </motion.h1>
                        <motion.p
                            className="hero-tagline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Join the movement to turn surplus food into local impact.
                            Sharing is the new shopping.
                        </motion.p>
                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link to="/signup" className="btn btn-primary btn-lg btn-glow">
                                    Start Donating
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link to="/signup" className="btn btn-white btn-lg">
                                    Find Food
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section - Glass Card */}
            <section className="stats-section">
                <motion.div
                    className="stats-glass glass"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="stat-item">
                        <span className="stat-value">12k+</span>
                        <p className="stat-label">Donations</p>
                    </div>
                    <div className="stats-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value accent">8.5k</span>
                        <p className="stat-label">Kg Saved</p>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Why Choose FoodSwap?
                </motion.h2>
                <div className="features-grid">
                    <motion.div
                        className="feature-card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -8 }}
                    >
                        <div className="gradient-icon">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <h3 className="feature-title">Quick & Easy</h3>
                        <p className="feature-desc">
                            Post donations in minutes. Our simple platform connects donors and recipients effortlessly.
                        </p>
                    </motion.div>

                    <motion.div
                        className="feature-card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -8 }}
                    >
                        <div className="gradient-icon-orange">
                            <span className="material-symbols-outlined">map</span>
                        </div>
                        <h3 className="feature-title">Map View</h3>
                        <p className="feature-desc">
                            Find nearby food donations in real-time with our intuitive map interface.
                        </p>
                    </motion.div>

                    <motion.div
                        className="feature-card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -8 }}
                    >
                        <div className="gradient-icon">
                            <span className="material-symbols-outlined">notifications_active</span>
                        </div>
                        <h3 className="feature-title">Real-time Alerts</h3>
                        <p className="feature-desc">
                            Get instant alerts for new listings and successful connections.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    How It Works
                </motion.h2>
                <div className="steps">
                    <motion.div
                        className="step"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="step-number">1</div>
                        <h3 className="step-title">Sign Up</h3>
                        <p className="step-desc">Create an account as a Donor or Recipient in just a few seconds.</p>
                    </motion.div>

                    <motion.div
                        className="step"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="step-number step-number-orange">2</div>
                        <h3 className="step-title">Post or Browse</h3>
                        <p className="step-desc">Donors post leftover food. Recipients browse and find nearby donations.</p>
                    </motion.div>

                    <motion.div
                        className="step"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="step-number">3</div>
                        <h3 className="step-title">Claim & Pickup</h3>
                        <p className="step-desc">Recipients claim donations and pick them up from the specified location.</p>
                    </motion.div>

                    <motion.div
                        className="step"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="step-number step-number-orange">4</div>
                        <h3 className="step-title">Make an Impact</h3>
                        <p className="step-desc">Track your contributions and see the collective impact we're making.</p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <motion.div
                    className="cta-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Ready to Make a Difference?</h2>
                    <p>
                        Join thousands of people who are already reducing food waste in their community.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/signup" className="btn btn-white btn-lg">
                            Join FoodSwap Today 🎉
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}

export default LandingPage
