import { router as routes } from './routes/router'
import serverless from 'serverless-http'
import { MongoClient } from 'mongodb'

const server = express()
const uri = process.env.MONGO_URI

let client
let db

// Connect to the MongoDB client
const connectToDB = async () => {
    try {
      if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

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
app.use(async (req, res, next) => {
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

app.use('//.netlify/functions/app', routes)

export const serverHandler = serverless(server)