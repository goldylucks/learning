export default function makeGetConnectingLines({ listConnectingLines }) {
  return async function getConnectingLines(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const connectingLines = await listConnectingLines()
      return {
        headers,
        statusCode: 200,
        body: connectingLines,
      }
    } catch (e) {
      // TODO: Error logging
      console.error(e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      }
    }
  }
}
