import { router } from './routes/router'
import serverless from 'serverless-http'

const server = express()
const router = router()

router.get('/server', (req, res) => res.send('My App'))

app.use('/', router)

export const serverHandler = serverless(server)