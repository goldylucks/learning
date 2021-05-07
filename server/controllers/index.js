import {
  addRectangle,
  editRectangle,
  listRectangles,
  listConnectingLines,
  removeRectangle,
  resetDb,
  getAll,
} from '../use-cases'
import makeDeleteRectangle from './delete-rectangle'
import makeGetRectangles from './get-rectangles'
import makeGetConnectingLines from './get-connectingLines'
import makePostRectangle from './post-rectangle'
import makePatchRectangle from './patch-rectangle'
import makeResetDbCtrl from './reset-db-ctrl'
import makeGetAllCtrl from './get-all-ctrl'
import notFound from './not-found'
const deleteRectangle = makeDeleteRectangle({ removeRectangle })
const getRectangles = makeGetRectangles({
  listRectangles,
})
const getConnectingLines = makeGetConnectingLines({
  listConnectingLines,
})

const postRectangle = makePostRectangle({ addRectangle })
const patchRectangle = makePatchRectangle({ editRectangle })
const resetDbCtrl = makeResetDbCtrl({ resetDb })
const getAllCtrl = makeGetAllCtrl({ getAll })

const learningController = Object.freeze({
  deleteRectangle,
  getRectangles,
  getConnectingLines,
  notFound,
  postRectangle,
  patchRectangle,
  resetDbCtrl,
  getAllCtrl,
})

export default learningController
export {
  deleteRectangle,
  getRectangles,
  notFound,
  postRectangle,
  patchRectangle,
  resetDbCtrl,
  getConnectingLines,
  getAllCtrl,
}
