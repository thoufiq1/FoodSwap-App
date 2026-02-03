import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import TopBar from '../components/TopBar'
import DonationCard from '../components/DonationCard'
import MapView from '../components/MapView'
import toast from 'react-hot-toast'

// Demo donations data
const DEMO_DONATIONS = [
    {
        id: 'demo-1',
        donorID: 'demo-donor-1',
        donorName: 'Sarah Kitchen',
        foodName: 'Fresh Produce Basket',
        quantity: '5 kg',
        expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7128, lng: -74.006, address: '123 Green Street' },
        dietary: ['Vegetarian', 'Vegan'],
        distance: '0.4 mi',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'
    },
    {
        id: 'demo-2',
        donorID: 'demo-donor-2',
        donorName: 'Mario Cafe',
        foodName: 'Homemade Lasagna',
        quantity: '3 portions',
        expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7580, lng: -73.9855, address: '456 Oak Avenue' },
        dietary: ['Halal'],
        distance: '1.2 mi',
        image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400'
    },
    {
        id: 'demo-3',
        donorID: 'demo-donor-3',
        donorName: 'The Bakery',
        foodName: 'Fresh Sourdough Bread',
        quantity: '4 loaves',
        expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7489, lng: -73.9680, address: '789 Maple Drive' },
        dietary: ['Vegan'],
        distance: '0.8 mi',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
    }
]

function RecipientDashboard() {
    const { userData } = useAuth()
    const [donations, setDonations] = useState(DEMO_DONATIONS)
    const [view, setView] = useState('list') // 'list' or 'map'
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredDonations = donations.filter(d => {
        if (filter !== 'all' && !d.dietary?.includes(filter)) return false
        if (searchQuery && !d.foodName.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return d.status === 'available'
    })

    const handleClaim = (donationId) => {
        setDonations(prev => prev.map(d =>
            d.id === donationId ? { ...d, status: 'claimed', claimedBy: userData?.name } : d
        ))
        toast.success('Food claimed! Check your messages for pickup details.')
    }

    return (
        <div className="dashboard" style={{ padding: 0, maxWidth: '100%' }}>
            <TopBar title="Food Discovery" />

            {/* Search Bar */}
            <div style={{ padding: 'var(--space-md)' }}>
                <div className="explore-search-bar glass">
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', marginRight: 'var(--space-sm)' }}>search</span>
                    <input
                        type="text"
                        placeholder="Search food near you..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* View Toggle & Filters */}
            <div style={{ padding: '0 var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                    <div className="toggle-container" style={{ width: 'auto' }}>
                        <button
                            className={`toggle-option ${view === 'list' ? 'active' : ''}`}
                            onClick={() => setView('list')}
                            style={{ padding: 'var(--space-xs) var(--space-md)' }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>view_list</span>
                        </button>
                        <button
                            className={`toggle-option ${view === 'map' ? 'active' : ''}`}
                            onClick={() => setView('map')}
                            style={{ padding: 'var(--space-xs) var(--space-md)' }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>map</span>
                        </button>
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {filteredDonations.length} available
                    </span>
                </div>

                {/* Category Pills */}
                <div className="category-pills scrollbar-hide">
                    {['all', 'Vegetarian', 'Vegan', 'Halal'].map(category => (
                        <button
                            key={category}
                            className={`category-pill ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category === 'all' ? 'All' : category}
                        </button>
                    ))}
                </div>
            </div>

            {view === 'map' ? (
                /* Map View */
                <div style={{ height: 'calc(100vh - 280px)', position: 'relative' }}>
                    <MapView donations={filteredDonations} />

                    {/* Floating Cards at Bottom */}
                    <div className="explore-cards scrollbar-hide">
                        {filteredDonations.map((donation, index) => (
                            <motion.div
                                key={donation.id}
                                className="explore-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => handleClaim(donation.id)}
                            >
                                <div
                                    className="explore-card-image"
                                    style={{ backgroundImage: `url('${donation.image}')` }}
                                >
                                    <span className={`explore-card-tag ${index % 2 === 0 ? 'primary' : 'secondary'}`}>
                                        {donation.dietary?.[0] || 'Food'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h4 className="explore-card-title">{donation.foodName}</h4>
                                    <span className="explore-card-price">Free</span>
                                </div>
                                <div className="explore-card-meta">
                                    <span>
                                        <span className="material-symbols-outlined">location_on</span>
                                        {donation.distance}
                                    </span>
                                    <span>
                                        <span className="material-symbols-outlined">schedule</span>
                                        15m ago
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                /* List View */
                <div style={{ padding: '0 var(--space-md)' }}>
                    {filteredDonations.length > 0 ? (
                        <div className="dashboard-grid">
                            {filteredDonations.map((donation, index) => (
                                <DonationCard
                                    key={donation.id}
                                    donation={donation}
                                    userType="Recipient"
                                    onClaim={handleClaim}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">🍽️</div>
                            <h3 className="empty-state-title">No food available</h3>
                            <p>Check back later for new donations!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default RecipientDashboard
