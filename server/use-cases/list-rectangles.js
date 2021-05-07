export default function makeListRectangles({ rectangleDb }) {
  return async function listRectangles() {
    const rectangles = await rectangleDb.findAll()
    return rectangles
  }
}
