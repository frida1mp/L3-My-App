/**
 * @file Defines the main application..
 * @module app
 * @author Frida Pedersén
 * @version 1.1.0
 */
import { router } from './routes/router.js'
import serverless from 'serverless-http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MongoClient } from 'mongodb'
import { MongoStorage } from './storage/mongoDbStorage.js'
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import dotenv from 'dotenv'
import { BookingManager } from 'booking-manager-module'

dotenv.config()

const server = express()
const uri = process.env.MONGO_URI
let bookingManager
// Get the directory name of this module's path.
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// View engine setup.
server.set('view engine', 'ejs')
server.set('views', join(directoryFullName, 'views'))
server.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
server.set('layout extractScripts', true)
server.set('layout extractStyles', true)
server.use(expressLayouts)

let client
let db

// Connect to the MongoDB client
const connectToDB = async () => {
    try {
        if (!client) {
            db = new MongoStorage(process.env.MONGO_URI, 'mongoDb')
            console.log('Connection to MongoDB successfull')
            
        }
        return db
    } catch (err) {
        console.error('MongoDB connecting error:', err)
        throw err
    }
}


// Middleware to acess DB in routers
server.use(async (req, res, next) => {
    try {
        if (!db) {
            await connectToDB()
            bookingManager = new BookingManager(db)
        }
        
        req.db = db;
        req.bookingManager = bookingManager
        next()
    } catch (err) {
        res.status(500).json({ error: 'Database connection error' })
    }
});

server.use('/.netlify/functions/app', router)

// Start the server locally
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export const serverHandler = serverless(server)