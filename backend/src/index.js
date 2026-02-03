import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// ========================================
// In-Memory Database (Replace with Firebase)
// ========================================

// Sample users
const users = new Map([
    ['demo-donor-1', {
        id: 'demo-donor-1',
        name: 'John Donor',
        email: 'donor@demo.com',
        type: 'Donor',
        phone: '+1234567890',
        location: { lat: 40.7128, lng: -74.006, address: 'New York, NY' },
        createdAt: new Date().toISOString()
    }],
    ['demo-recipient-1', {
        id: 'demo-recipient-1',
        name: 'Jane Recipient',
        email: 'recipient@demo.com',
        type: 'Recipient',
        phone: '+0987654321',
        location: { lat: 40.7580, lng: -73.9855, address: 'Manhattan, NY' },
        createdAt: new Date().toISOString()
    }]
])

// Sample donations
const donations = new Map([
    ['donation-1', {
        id: 'donation-1',
        donorID: 'demo-donor-1',
        donorName: 'College Canteen',
        foodName: 'Fresh Sandwiches & Salads',
        quantity: '15 portions',
        expiryTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7128, lng: -74.006, address: 'Main Campus Canteen, Building A' },
        dietary: ['Vegetarian', 'Vegan'],
        createdAt: new Date().toISOString()
    }],
    ['donation-2', {
        id: 'donation-2',
        donorID: 'demo-donor-1',
        donorName: 'Pizza Palace',
        foodName: 'Leftover Pizza Slices',
        quantity: '12 slices',
        expiryTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7580, lng: -73.9855, address: '123 Main Street, Downtown' },
        dietary: ['Vegetarian'],
        createdAt: new Date().toISOString()
    }],
    ['donation-3', {
        id: 'donation-3',
        donorID: 'demo-donor-1',
        donorName: 'Student Union',
        foodName: 'Rice & Curry Bowls',
        quantity: '8 bowls',
        expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7489, lng: -73.9680, address: 'Student Union Building' },
        dietary: ['Halal', 'Gluten-Free'],
        createdAt: new Date().toISOString()
    }],
    ['donation-4', {
        id: 'donation-4',
        donorID: 'demo-donor-1',
        donorName: 'Healthy Bites Cafe',
        foodName: 'Fruit Salads',
        quantity: '6 containers',
        expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7614, lng: -73.9776, address: 'Healthy Bites, 5th Avenue' },
        dietary: ['Vegan', 'Gluten-Free'],
        createdAt: new Date().toISOString()
    }],
    ['donation-5', {
        id: 'donation-5',
        donorID: 'demo-donor-1',
        donorName: "Joe's Diner",
        foodName: 'Burgers & Fries',
        quantity: '10 combos',
        expiryTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000).toISOString(),
        status: 'available',
        location: { lat: 40.7282, lng: -73.7949, address: "Joe's Diner, Queens Blvd" },
        dietary: [],
        createdAt: new Date().toISOString()
    }]
])

// Claims
const claims = new Map()

// ========================================
// API Routes
// ========================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'FoodSwap API is running!' })
})

// ----------------------------------------
// Donations Routes
// ----------------------------------------

// POST /api/donate - Add a new donation
app.post('/api/donate', (req, res) => {
    try {
        const { donorID, donorName, foodName, quantity, expiryTime, location, dietary } = req.body

        if (!foodName || !quantity || !expiryTime) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const donation = {
            id: uuidv4(),
            donorID: donorID || 'anonymous',
            donorName: donorName || 'Anonymous Donor',
            foodName,
            quantity,
            expiryTime,
            status: 'available',
            location: location || { lat: 40.7128, lng: -74.006, address: 'Not specified' },
            dietary: dietary || [],
            createdAt: new Date().toISOString()
        }

        donations.set(donation.id, donation)

        res.status(201).json({
            success: true,
            message: 'Donation posted successfully!',
            donation
        })
    } catch (error) {
        console.error('Error creating donation:', error)
        res.status(500).json({ error: 'Failed to create donation' })
    }
})

// GET /api/donations - Get available donations
app.get('/api/donations', (req, res) => {
    try {
        const { status, dietary } = req.query

        let result = Array.from(donations.values())

        // Filter by status
        if (status && status !== 'all') {
            result = result.filter(d => d.status === status)
        } else {
            // By default, only return available donations
            result = result.filter(d => d.status === 'available')
        }

        // Filter by dietary preferences
        if (dietary) {
            const dietaryFilters = dietary.split(',')
            result = result.filter(d =>
                dietaryFilters.some(filter => d.dietary?.includes(filter))
            )
        }

        // Sort by creation date (newest first)
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        res.json({
            success: true,
            count: result.length,
            donations: result
        })
    } catch (error) {
        console.error('Error fetching donations:', error)
        res.status(500).json({ error: 'Failed to fetch donations' })
    }
})

// GET /api/donations/:id - Get a specific donation
app.get('/api/donations/:id', (req, res) => {
    try {
        const donation = donations.get(req.params.id)

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' })
        }

        res.json({ success: true, donation })
    } catch (error) {
        console.error('Error fetching donation:', error)
        res.status(500).json({ error: 'Failed to fetch donation' })
    }
})

// POST /api/claim - Claim a donation
app.post('/api/claim', (req, res) => {
    try {
        const { donationID, recipientID, recipientName } = req.body

        if (!donationID) {
            return res.status(400).json({ error: 'Donation ID is required' })
        }

        const donation = donations.get(donationID)

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' })
        }

        if (donation.status !== 'available') {
            return res.status(400).json({ error: 'Donation is no longer available' })
        }

        // Create claim
        const claim = {
            id: uuidv4(),
            donationID,
            recipientID: recipientID || 'anonymous',
            recipientName: recipientName || 'Anonymous',
            status: 'pending',
            timestamp: new Date().toISOString()
        }

        claims.set(claim.id, claim)

        // Update donation status
        donation.status = 'claimed'
        donation.claimID = claim.id
        donation.claimedBy = recipientName || 'Anonymous'
        donation.claimedAt = new Date().toISOString()
        donations.set(donationID, donation)

        res.json({
            success: true,
            message: 'Donation claimed successfully!',
            claim,
            donation
        })
    } catch (error) {
        console.error('Error claiming donation:', error)
        res.status(500).json({ error: 'Failed to claim donation' })
    }
})

// POST /api/pickup - Confirm pickup
app.post('/api/pickup', (req, res) => {
    try {
        const { donationID, claimID } = req.body

        if (!donationID) {
            return res.status(400).json({ error: 'Donation ID is required' })
        }

        const donation = donations.get(donationID)

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' })
        }

        if (donation.status !== 'claimed') {
            return res.status(400).json({ error: 'Donation must be claimed first' })
        }

        // Update donation status
        donation.status = 'completed'
        donation.completedAt = new Date().toISOString()
        donations.set(donationID, donation)

        // Update claim status
        if (claimID && claims.has(claimID)) {
            const claim = claims.get(claimID)
            claim.status = 'completed'
            claims.set(claimID, claim)
        }

        res.json({
            success: true,
            message: 'Pickup confirmed! Thank you for reducing food waste!',
            donation
        })
    } catch (error) {
        console.error('Error confirming pickup:', error)
        res.status(500).json({ error: 'Failed to confirm pickup' })
    }
})

// ----------------------------------------
// User Routes
// ----------------------------------------

// GET /api/user/:id/donations - Get donor's donation history
app.get('/api/user/:id/donations', (req, res) => {
    try {
        const userID = req.params.id
        const result = Array.from(donations.values())
            .filter(d => d.donorID === userID)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        res.json({
            success: true,
            count: result.length,
            donations: result
        })
    } catch (error) {
        console.error('Error fetching user donations:', error)
        res.status(500).json({ error: 'Failed to fetch donations' })
    }
})

// GET /api/user/:id/claims - Get recipient's claim history
app.get('/api/user/:id/claims', (req, res) => {
    try {
        const userID = req.params.id
        const userClaims = Array.from(claims.values())
            .filter(c => c.recipientID === userID)

        // Get the actual donation data for each claim
        const result = userClaims.map(claim => {
            const donation = donations.get(claim.donationID)
            return {
                ...claim,
                donation
            }
        }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

        res.json({
            success: true,
            count: result.length,
            claims: result
        })
    } catch (error) {
        console.error('Error fetching user claims:', error)
        res.status(500).json({ error: 'Failed to fetch claims' })
    }
})

// ----------------------------------------
// Stats Routes
// ----------------------------------------

// GET /api/stats - Get platform statistics
app.get('/api/stats', (req, res) => {
    try {
        const allDonations = Array.from(donations.values())
        const completedDonations = allDonations.filter(d => d.status === 'completed')

        const stats = {
            totalDonations: allDonations.length,
            availableDonations: allDonations.filter(d => d.status === 'available').length,
            claimedDonations: allDonations.filter(d => d.status === 'claimed').length,
            completedDonations: completedDonations.length,
            totalClaims: claims.size,
            // Estimated values
            foodSaved: completedDonations.length * 5, // kg estimate
            peopleFed: completedDonations.length * 3,
            co2Saved: completedDonations.length * 2.5 // kg estimate
        }

        res.json({ success: true, stats })
    } catch (error) {
        console.error('Error fetching stats:', error)
        res.status(500).json({ error: 'Failed to fetch stats' })
    }
})

// ----------------------------------------
// Start Server
// ----------------------------------------

app.listen(PORT, () => {
    console.log(`
  🍽️  FoodSwap API Server
  ========================
  ✅ Server running on http://localhost:${PORT}
  📚 API Documentation:
     - GET  /api/health           - Health check
     - GET  /api/donations        - Get available donations
     - POST /api/donate           - Add new donation
     - POST /api/claim            - Claim a donation
     - POST /api/pickup           - Confirm pickup
     - GET  /api/user/:id/donations - Donor history
     - GET  /api/user/:id/claims  - Recipient history
     - GET  /api/stats            - Platform statistics
  `)
})

export default app
