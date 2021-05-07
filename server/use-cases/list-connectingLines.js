export default function makeListConnectingLines({ connectingLinesDb }) {
  return async function listConnectingLines() {
    const conncetingLines = await connectingLinesDb.findAll()
    return conncetingLines
  }
}
