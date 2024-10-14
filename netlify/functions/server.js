/**
 * @file Defines the main application..
 * @module app
 * @author Frida Pedersén
 * @version 1.1.0
 */
import { router } from './routes/router.js'
import serverless from 'serverless-http'
import { MongoClient } from 'mongodb'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const server = express()
const uri = process.env.MONGO_URI
console.log('URI:',uri)

let client
let db

// Connect to the MongoDB client
const connectToDB = async () => {
    try {
      if (!client) {
        console.log('uri?', process.env.MONGO_URI)
        client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

        await client.connect()

        db = client.db('mongodb')

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
      }
      req.db = db
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