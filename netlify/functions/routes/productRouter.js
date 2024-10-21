import { Router } from 'express'

export const router = Router()

// get all products
router.get('/', (req, res) => {
   const products = req.bookingManager.getAllProducts()
    console.log('rendered')
    res.status(200).json({products})
})

// create new product
router.post('/create', async (req, res) => {
    console.log('inside create prod')
    const product = {
        name: 'game1',
        description: 'test1',
        price: 10
    }
    console.log(product, 'test')
    const newProduct = await req.bookingManager.addProduct(product)
    console.log('neww', newProduct)
    res.status(200).json({newProduct})

})

// gets product by id
router.get('/:id/', (req, res) => {
    
})

// deletes a specific product
router.get('/:id/delete', (req, res) => {
    
})