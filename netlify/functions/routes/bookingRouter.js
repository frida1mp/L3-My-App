import { Router } from 'express'

export const router = Router()

// get all bookings
router.get('/', (req, res) => {
    const bookings = req.bookingManager.getAllBookings()
     console.log('rendered', book)
     res.status(200).json({bookings})
 })
// create new booking
router.post('/create', (req, res) => {
    
})

// gets booking by id
router.get('/:id/', (req, res) => {
    
})

// deletes a specific booking
router.get('/:id/delete', (req, res) => {
    
})