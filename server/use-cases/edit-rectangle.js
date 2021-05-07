import makeRectangle from '../rectangle'
export default function makeEditRectangle({ rectangleDb }) {
  return async function editRectangle(changes = {}) {
    if (!changes.name) {
      throw new Error('You must supply a name')
    }

    const existing = await rectangleDb.findByName({ name: changes.name })

    if (!existing) {
      throw new RangeError('Rectangle not found.')
    }
    const rectangle = makeRectangle({
      ...existing,
      ...changes,
      modifiedOn: null,
    })
    const updated = await rectangleDb.update({
      name: rectangle.getName(),
      id: rectangle.getId(),
      x: rectangle.getX(),
      y: rectangle.getY(),
      modifiedOn: rectangle.getModifiedOn(),
    })

    return { ...existing, ...updated }
  }
}
