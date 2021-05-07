import makeRectangle from '../rectangle'
export default function makeAddRectangle({ rectangleDb }) {
  return async function addRectangle(rectangleInfo) {
    const rectangle = makeRectangle(rectangleInfo)

    return rectangleDb.insert({
      name: rectangle.getName(),
      x: rectangle.getX(),
      y: rectangle.getY(),
      createdOn: rectangle.getCreatedOn(),
      id: rectangle.getId(),
      modifiedOn: rectangle.getModifiedOn(),
    })
  }
}
