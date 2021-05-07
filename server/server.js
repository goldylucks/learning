import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
  deleteRectangle,
  getRectangles,
  notFound,
  postRectangle,
  patchRectangle,
  getConnectingLines,
  getAllCtrl,
  resetDbCtrl,
} from './controllers'
import makeCallback from './express-callback'
import { resetDb } from './use-cases'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const apiRoot = '/api'
app.use(bodyParser.json())

app.post(`${apiRoot}/rectangles`, makeCallback(postRectangle))
app.delete(`${apiRoot}/rectangles/:id`, makeCallback(deleteRectangle))
app.patch(`${apiRoot}/rectangles/:name`, makeCallback(patchRectangle))
app.get(`${apiRoot}/rectangles`, makeCallback(getRectangles))
app.get(`${apiRoot}/connectingLines`, makeCallback(getConnectingLines))
app.post(`${apiRoot}/resetDb`, makeCallback(resetDbCtrl))
app.get(`${apiRoot}/all`, makeCallback(getAllCtrl))
app.use(makeCallback(notFound))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default app

resetDb({ numberOfRectangles: 10 })
