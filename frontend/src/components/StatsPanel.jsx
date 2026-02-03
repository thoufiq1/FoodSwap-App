import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

function StatsPanel({ stats }) {
    return (
        <div className="stats-panel">
            <StatCard
                icon="🍽️"
                value={stats.totalDonations || 0}
                label="Total Donations"
            />
            <StatCard
                icon="🍎"
                value={stats.foodSaved || 0}
                label="Meals Saved"
                suffix="kg"
            />
            <StatCard
                icon="👥"
                value={stats.peopleFed || 0}
                label="People Fed"
            />
            <StatCard
                icon="🌍"
                value={stats.co2Saved || 0}
                label="CO₂ Saved"
                suffix="kg"
            />
        </div>
    )
}

function StatCard({ icon, value, label, suffix = '' }) {
    const [displayValue, setDisplayValue] = useState(0)
    const countRef = useRef(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    animateValue()
                }
            },
            { threshold: 0.5 }
        )

        if (countRef.current) {
            observer.observe(countRef.current)
        }

        return () => observer.disconnect()
    }, [value])

    const animateValue = () => {
        const duration = 2000
        const steps = 60
        const stepValue = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += stepValue
            if (current >= value) {
                setDisplayValue(value)
                clearInterval(timer)
            } else {
                setDisplayValue(Math.floor(current))
            }
        }, duration / steps)
    }

    return (
        <motion.div
            className="stat-card"
            ref={countRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">
                {displayValue.toLocaleString()}{suffix && ` ${suffix}`}
            </div>
            <div className="stat-label">{label}</div>
        </motion.div>
    )
}

export default StatsPanel
