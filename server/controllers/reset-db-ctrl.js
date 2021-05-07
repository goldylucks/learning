export default function makeResetDbCtrl({ resetDb }) {
  return async function resetDbCtrl(httpRequest) {
    try {
      const { numberOfRectangles } = httpRequest.body
      const { rectangles, connectingLines } = await resetDb({
        numberOfRectangles,
      })
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { rectangles, connectingLines },
      }
    } catch (e) {
      // TODO: Error logging
      console.error(e)

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      }
    }
  }
}
