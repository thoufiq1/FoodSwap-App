import { motion } from 'framer-motion'

function DonationCard({ donation, userType, onClaim, onConfirmPickup }) {
    const getTimeRemaining = () => {
        const expiry = new Date(donation.expiryTime)
        const now = new Date()
        const diff = expiry - now

        if (diff <= 0) return 'Expired'

        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (hours > 24) {
            const days = Math.floor(hours / 24)
            return `${days}d ${hours % 24}h`
        }

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    const getStatusColor = () => {
        switch (donation.status) {
            case 'available': return 'available'
            case 'claimed': return 'claimed'
            case 'completed': return 'completed'
            default: return 'available'
        }
    }

    return (
        <motion.div
            className="donation-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div className="donation-card-header">
                <h3 className="donation-food-name">{donation.foodName}</h3>
                <span className={`donation-status ${getStatusColor()}`}>
                    {donation.status}
                </span>
            </div>

            {/* Details */}
            <div className="donation-details">
                <div className="donation-detail">
                    <span className="material-symbols-outlined">inventory_2</span>
                    <span>{donation.quantity}</span>
                </div>
                <div className="donation-detail">
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{getTimeRemaining()} remaining</span>
                </div>
                <div className="donation-detail">
                    <span className="material-symbols-outlined">location_on</span>
                    <span>{donation.location?.address || 'Location pending'}</span>
                </div>
                {donation.claimedBy && (
                    <div className="donation-detail">
                        <span className="material-symbols-outlined">person</span>
                        <span>Claimed by {donation.claimedBy}</span>
                    </div>
                )}
            </div>

            {/* Dietary Tags */}
            {donation.dietary && donation.dietary.length > 0 && (
                <div className="dietary-tags">
                    {donation.dietary.map(tag => (
                        <span
                            key={tag}
                            className={`dietary-tag ${tag.toLowerCase()}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="donation-actions" style={{ marginTop: 'var(--space-md)' }}>
                {userType === 'Recipient' && donation.status === 'available' && (
                    <motion.button
                        className="btn btn-primary btn-pulse"
                        style={{ flex: 1 }}
                        onClick={() => onClaim?.(donation.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="material-symbols-outlined">favorite</span>
                        Claim
                    </motion.button>
                )}

                {userType === 'Donor' && donation.status === 'claimed' && (
                    <motion.button
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        onClick={() => onConfirmPickup?.(donation.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="material-symbols-outlined">check_circle</span>
                        Confirm Pickup
                    </motion.button>
                )}

                {donation.status === 'completed' && (
                    <div
                        className="btn btn-ghost"
                        style={{ flex: 1, justifyContent: 'center', color: 'var(--primary)' }}
                    >
                        <span className="material-symbols-outlined">eco</span>
                        Impact Made!
                    </div>
                )}

                <motion.button
                    className="btn btn-icon btn-ghost"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="material-symbols-outlined">chat</span>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default DonationCard
