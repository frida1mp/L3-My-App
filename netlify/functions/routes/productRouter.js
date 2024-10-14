import { Router } from 'express'

export const router = Router()

// get all products
router.get('/', (req, res) => {
    console.log('render?')
   const bookings = req.bookingManager.getAllBookings()
    console.log('rendered')
    res.status(200).json({bookings})
})

// create new product
router.post('/create', (req, res) => {
    const product = {
        name: 'game1',
        description: 'test1',
        price: 100
    }
    const bookings = req.bookingManager.addProduct(product)
})

// gets product by id
router.get('/:id/', (req, res) => {
    
})

// deletes a specific product
router.get('/:id/delete', (req, res) => {
    
})