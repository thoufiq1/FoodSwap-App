import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function DonationForm({ isOpen, onClose, onSubmit }) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        foodName: '',
        quantity: '',
        expiryTime: '',
        address: '',
        dietary: [],
        description: ''
    })

    const categories = ['Bread', 'Veggies', 'Meals', 'Fruit', 'Dairy', 'Other']
    const dietaryOptions = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Nut-Free']

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const toggleDietary = (option) => {
        setFormData(prev => ({
            ...prev,
            dietary: prev.dietary.includes(option)
                ? prev.dietary.filter(d => d !== option)
                : [...prev.dietary, option]
        }))
    }

    const handleSubmit = () => {
        if (!formData.foodName || !formData.quantity || !formData.address) {
            return
        }
        onSubmit(formData)
        onClose()
        setStep(1)
        setFormData({
            foodName: '',
            quantity: '',
            expiryTime: '',
            address: '',
            dietary: [],
            description: ''
        })
    }

    const handleClose = () => {
        onClose()
        setStep(1)
    }

    const progress = (step / 3) * 100

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
            >
                <motion.div
                    className="modal"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="modal-header">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="modal-close" style={{ background: 'transparent' }}>
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                        ) : (
                            <button onClick={handleClose} className="modal-close" style={{ background: 'transparent' }}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        )}
                        <h3 className="modal-title" style={{ flex: 1, textAlign: 'center' }}>Donate Item</h3>
                        <div style={{ width: 32 }}></div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ padding: 'var(--space-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 'var(--space-sm)' }}>
                            <span>Step {step} of 3</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{Math.round(progress)}%</span>
                        </div>
                        <div style={{ height: 8, background: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                            <motion.div
                                style={{ height: '100%', background: 'var(--primary)', borderRadius: 4 }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>Item Details</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Tell us what you're sharing today</p>

                                {/* Photo Upload */}
                                <div style={{
                                    border: '2px dashed rgba(0,0,0,0.1)',
                                    borderRadius: 'var(--radius)',
                                    padding: 'var(--space-2xl)',
                                    textAlign: 'center',
                                    marginBottom: 'var(--space-xl)',
                                    background: 'rgba(255,255,255,0.5)'
                                }}>
                                    <div style={{
                                        width: 64,
                                        height: 64,
                                        background: 'rgba(60, 180, 112, 0.1)',
                                        borderRadius: 'var(--radius-full)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto var(--space-md)'
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--primary)' }}>add_a_photo</span>
                                    </div>
                                    <p style={{ fontWeight: 600, marginBottom: 'var(--space-sm)' }}>Upload Photo</p>
                                    <button className="btn btn-outline btn-sm">Take Photo</button>
                                </div>

                                {/* Item Name */}
                                <div className="form-group">
                                    <label className="form-label">Item Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Homemade Sourdough Bread"
                                        value={formData.foodName}
                                        onChange={e => handleChange('foodName', e.target.value)}
                                    />
                                </div>

                                {/* Category */}
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <div className="category-pills scrollbar-hide" style={{ paddingBottom: 'var(--space-sm)' }}>
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                className="category-pill"
                                                type="button"
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>Pickup Details</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Set location and preferences</p>

                                {/* Quantity */}
                                <div className="form-group">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. 5 pieces, 2 kg, 3 servings"
                                        value={formData.quantity}
                                        onChange={e => handleChange('quantity', e.target.value)}
                                    />
                                </div>

                                {/* Address */}
                                <div className="form-group">
                                    <label className="form-label">Pickup Address</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter pickup location"
                                        value={formData.address}
                                        onChange={e => handleChange('address', e.target.value)}
                                    />
                                </div>

                                {/* Expiry */}
                                <div className="form-group">
                                    <label className="form-label">Best Before</label>
                                    <input
                                        type="datetime-local"
                                        className="form-input"
                                        value={formData.expiryTime}
                                        onChange={e => handleChange('expiryTime', e.target.value)}
                                    />
                                </div>

                                {/* Description */}
                                <div className="form-group">
                                    <label className="form-label">Description (optional)</label>
                                    <textarea
                                        className="form-input"
                                        placeholder="Allergens, ingredients, special notes..."
                                        rows={3}
                                        value={formData.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        style={{ resize: 'none' }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>Dietary Info</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Help recipients find suitable food</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                                    {dietaryOptions.map(option => (
                                        <button
                                            key={option}
                                            type="button"
                                            className={`category-pill ${formData.dietary.includes(option) ? 'active' : ''}`}
                                            onClick={() => toggleDietary(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                {/* Preview */}
                                <div style={{
                                    marginTop: 'var(--space-xl)',
                                    padding: 'var(--space-lg)',
                                    background: 'rgba(255, 140, 66, 0.1)',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid rgba(255, 140, 66, 0.2)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                        <div style={{
                                            width: 48,
                                            height: 48,
                                            background: 'rgba(255, 140, 66, 0.2)',
                                            borderRadius: 'var(--radius-full)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>eco</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem' }}>
                                            You are about to save <strong style={{ color: 'var(--secondary)' }}>0.5kg of CO2</strong> by sharing!
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer" style={{ flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {step < 3 ? (
                            <button
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%' }}
                                onClick={() => setStep(step + 1)}
                            >
                                Next Step
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-lg btn-glow"
                                style={{ width: '100%' }}
                                onClick={handleSubmit}
                            >
                                <span className="material-symbols-outlined">check</span>
                                List Item Now
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default DonationForm
