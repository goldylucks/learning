export default function buildMakeRectangle({ Id }) {
  return function makeRectangle({
    name,
    x,
    y,
    createdOn = Date.now(),
    id = Id.makeId(),
    modifiedOn = Date.now(),
  } = {}) {
    validateRectangle()

    return Object.freeze({
      getName: () => name,
      getCreatedOn: () => createdOn,
      getX: () => x,
      getY: () => y,
      getId: () => id,
      getModifiedOn: () => modifiedOn,
    })

    function validateRectangle() {
      if (!Id.isValidId(id)) {
        throw new Error('Rectangle must have a valid id.')
      }
      if (!name) {
        throw new Error('Rectangle must have a name.')
      }
      if (x !== 0 && !x) {
        throw new Error('Rectangle must have x value.')
      }
      if (y !== 0 && !y) {
        throw new Error('Rectangle must have y value.')
      }
    }
  }
}
