import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import TopBar from '../components/TopBar'
import DonationCard from '../components/DonationCard'
import DonationForm from '../components/DonationForm'
import toast from 'react-hot-toast'

// Demo donations data
const DEMO_DONATIONS = [
    {
        id: 'demo-1',
        donorID: 'demo-donor-1',
        donorName: 'John Donor',
        foodName: 'Fresh Sandwiches',
        quantity: '10 pieces',
        expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7128, lng: -74.006, address: 'Main Campus, Building A' },
        dietary: ['Vegetarian']
    },
    {
        id: 'demo-2',
        donorID: 'demo-donor-1',
        donorName: 'John Donor',
        foodName: 'Pasta with Sauce',
        quantity: '5 portions',
        expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: 'claimed',
        location: { lat: 40.7580, lng: -73.9855, address: 'College Canteen' },
        dietary: ['Vegan'],
        claimedBy: 'Jane Recipient'
    },
    {
        id: 'demo-3',
        donorID: 'demo-donor-1',
        donorName: 'John Donor',
        foodName: 'Rice and Curry',
        quantity: '8 servings',
        expiryTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        location: { lat: 40.7489, lng: -73.9680, address: 'Student Center' },
        dietary: ['Halal']
    }
]

function DonorDashboard() {
    const { userData } = useAuth()
    const [donations, setDonations] = useState(DEMO_DONATIONS)
    const [showForm, setShowForm] = useState(false)
    const [filter, setFilter] = useState('all')

    const stats = {
        totalDonations: donations.length,
        foodSaved: donations.reduce((acc, d) => acc + parseInt(d.quantity) || 0, 0) * 0.5,
        peopleFed: donations.filter(d => d.status === 'completed').length * 3,
        co2Saved: donations.filter(d => d.status === 'completed').length * 2.5
    }

    const filteredDonations = donations.filter(d => {
        if (filter === 'all') return true
        return d.status === filter
    })

    const handleAddDonation = async (formData) => {
        const newDonation = {
            id: 'donation-' + Date.now(),
            donorID: userData?.uid,
            donorName: userData?.name,
            foodName: formData.foodName,
            quantity: formData.quantity,
            expiryTime: new Date(formData.expiryTime).toISOString(),
            status: 'available',
            location: {
                lat: 40.7128 + (Math.random() - 0.5) * 0.1,
                lng: -74.006 + (Math.random() - 0.5) * 0.1,
                address: formData.address
            },
            dietary: formData.dietary,
            createdAt: new Date().toISOString()
        }

        setDonations(prev => [newDonation, ...prev])
        toast.success('Donation posted successfully!')
    }

    const handleConfirmPickup = (donationId) => {
        setDonations(prev => prev.map(d =>
            d.id === donationId ? { ...d, status: 'completed' } : d
        ))
        toast.success('Pickup confirmed! Thank you for your donation!')
    }

    return (
        <div className="dashboard">
            <TopBar title="My Donations" />

            {/* Welcome Header */}
            <div className="dashboard-header">
                <div>
                    <motion.h1
                        className="dashboard-title"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Welcome, {userData?.name || 'Donor'}! 🎁
                    </motion.h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Manage your donations and track your impact
                    </p>
                </div>
                <motion.button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="material-symbols-outlined">add</span>
                    Add
                </motion.button>
            </div>

            {/* Stats Panel */}
            <div className="stats-panel">
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-value" style={{ color: 'var(--primary)' }}>{stats.totalDonations}</div>
                    <div className="stat-label">Donations</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🍎</div>
                    <div className="stat-value" style={{ color: 'var(--secondary)' }}>{stats.foodSaved}kg</div>
                    <div className="stat-label">Food Saved</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-value" style={{ color: 'var(--primary)' }}>{stats.peopleFed}</div>
                    <div className="stat-label">People Fed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🌍</div>
                    <div className="stat-value" style={{ color: 'var(--secondary)' }}>{stats.co2Saved}kg</div>
                    <div className="stat-label">CO2 Saved</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="category-pills scrollbar-hide" style={{ marginBottom: 'var(--space-lg)' }}>
                {['all', 'available', 'claimed', 'completed'].map(status => (
                    <button
                        key={status}
                        className={`category-pill ${filter === status ? 'active' : ''}`}
                        onClick={() => setFilter(status)}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {status === 'all' ? 'All' : status}
                    </button>
                ))}
            </div>

            {/* Donations Grid */}
            {filteredDonations.length > 0 ? (
                <div className="dashboard-grid">
                    {filteredDonations.map((donation, index) => (
                        <DonationCard
                            key={donation.id}
                            donation={donation}
                            userType="Donor"
                            onConfirmPickup={handleConfirmPickup}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h3 className="empty-state-title">No donations yet</h3>
                    <p>Start by adding your first donation!</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                        style={{ marginTop: 'var(--space-md)' }}
                    >
                        <span className="material-symbols-outlined">add</span>
                        Add Donation
                    </button>
                </div>
            )}

            {/* Donation History Table */}
            {donations.filter(d => d.status === 'completed').length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ marginTop: 'var(--space-2xl)' }}
                >
                    <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.25rem' }}>Donation History</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Food Name</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.filter(d => d.status === 'completed').map(donation => (
                                    <tr key={donation.id}>
                                        <td>{donation.foodName}</td>
                                        <td>{donation.quantity}</td>
                                        <td>{donation.location?.address || 'N/A'}</td>
                                        <td>
                                            <span className={`donation-status ${donation.status}`}>
                                                {donation.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Donation Form Modal */}
            <DonationForm
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleAddDonation}
            />
        </div>
    )
}

export default DonorDashboard
