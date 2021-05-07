import makeAddRectangle from './add-rectangle'
import makeEditRectangle from './edit-rectangle'
import makeRemoveRectangle from './remove-rectangle'
import makeListRectangles from './list-rectangles'
import makeListConnectingLines from './list-connectingLines'
import makeResetDb from './reset-db'
import { rectangleDb, connectingLineDb } from '../data-access'
import generateSeedData from '../utils/generateSeedData'
import makeGetAll from './get-all'

const addRectangle = makeAddRectangle({ rectangleDb })
const editRectangle = makeEditRectangle({ rectangleDb })
const listRectangles = makeListRectangles({ rectangleDb })
const listConnectingLines = makeListConnectingLines({ connectingLineDb })
const removeRectangle = makeRemoveRectangle({ rectangleDb })
const resetDb = makeResetDb({ rectangleDb, connectingLineDb, generateSeedData })
const getAll = makeGetAll({ rectangleDb, connectingLineDb })

const rectangleService = Object.freeze({
  addRectangle,
  editRectangle,
  listRectangles,
  removeRectangle,
  resetDb,
  listConnectingLines,
  getAll,
})

export default rectangleService
export {
  addRectangle,
  editRectangle,
  listRectangles,
  removeRectangle,
  listConnectingLines,
  resetDb,
  getAll,
}
