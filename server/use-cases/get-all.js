export default function makeGetAll({ rectangleDb, connectingLineDb }) {
  return async function getAll() {
    return {
      rectangles: await rectangleDb.findAll(),
      connectingLines: await connectingLineDb.findAll(),
    }
  }
}
