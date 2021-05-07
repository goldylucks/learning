export default function makeResetDb({
  rectangleDb,
  connectingLineDb,
  generateSeedData,
}) {
  return async function resetDb({ numberOfRectangles }) {
    await rectangleDb.removeAll()
    await connectingLineDb.removeAll()
    const { rectangles, connectingLines } = generateSeedData({
      numberOfRectangles,
    })

    return {
      rectangles: await rectangleDb.insertMany(rectangles),
      connectingLines: await connectingLineDb.insertMany(connectingLines),
    }
  }
}
