import { Router } from 'express'
import serverless from 'serverless-http'

const server = express()
const router = Router()

router.get('/server', (req, res) => res.send('My App'))

app.use('/api', router)

export const serverHandler = serverless(server)