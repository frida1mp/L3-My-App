import { Router } from 'express'
import { BookingManager } from 'booking-manager-module'

export const router = Router()

// get all products
router.get('/', (req, res) => {
    const bookings = BookingManager.getAllBookings()
    res.render('layouts/default')
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