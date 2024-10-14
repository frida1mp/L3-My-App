import { Router } from 'express'

export const router = Router()

// get all products
router.get('/', (req, res) => {
    const bookings = req.bookingManager.getAllBookings()
    res.render('products/index')
    console.log('rendered')
    res.status(200).json({bookings})
})

// create new product
router.post('/create', (req, res) => {
    
})

// gets product by id
router.get('/:id/', (req, res) => {
    
})

// deletes a specific product
router.get('/:id/delete', (req, res) => {
    
})