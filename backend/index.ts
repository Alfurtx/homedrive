import express from 'express'
import cors from 'cors'
import { getroute } from './routes/getroute'
import { postroute } from './routes/postroute'
import { delroute } from './routes/delroute'
import { gotoparentroute } from './routes/gotoparentroute'

const port = 3000
const app = express()

app.use(cors())
app.use('/parent', gotoparentroute)
app.use('/get', getroute)
app.use('/post', postroute)
app.use('/del', delroute)

app.listen(port, () => {
    console.log(`[homedrive] listening to port ${port}`)
})
