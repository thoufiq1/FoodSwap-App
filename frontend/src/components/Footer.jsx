import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <span className="footer-logo">🍽️ FoodSwap</span>
                    <p className="footer-tagline">
                        Save Food. Feed People. Reduce Waste.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <div className="footer-links">
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/login" className="footer-link">Login</Link>
                        <Link to="/signup" className="footer-link">Sign Up</Link>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>For Donors</h4>
                    <div className="footer-links">
                        <Link to="/signup" className="footer-link">Start Donating</Link>
                        <span className="footer-link">Donation Guidelines</span>
                        <span className="footer-link">Success Stories</span>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>For Recipients</h4>
                    <div className="footer-links">
                        <Link to="/signup" className="footer-link">Find Food</Link>
                        <span className="footer-link">How to Claim</span>
                        <span className="footer-link">FAQs</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 FoodSwap. Made with ❤️ to reduce food waste.</p>
            </div>
        </footer>
    )
}

export default Footer
