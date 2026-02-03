import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FOOD_ICONS = ['🍕', '🍔', '🍟', '🌮', '🍜', '🍲', '🥗', '🍱', '🍛', '🥪', '🍝', '🥙', '🍰', '🧁', '🍩', '🍪']

function FloatingIcons() {
    const [icons, setIcons] = useState([])

    useEffect(() => {
        // Generate random icons
        const generatedIcons = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            icon: FOOD_ICONS[Math.floor(Math.random() * FOOD_ICONS.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1.5 + Math.random() * 1.5,
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 2
        }))
        setIcons(generatedIcons)
    }, [])

    return (
        <div className="floating-icons">
            {icons.map(icon => (
                <motion.span
                    key={icon.id}
                    className="floating-icon"
                    style={{
                        left: `${icon.x}%`,
                        top: `${icon.y}%`,
                        fontSize: `${icon.size}rem`
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: icon.duration,
                        delay: icon.delay,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    {icon.icon}
                </motion.span>
            ))}
        </div>
    )
}

export default FloatingIcons
