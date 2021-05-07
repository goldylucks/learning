export default function makeGetRectangles({ listRectangles }) {
  return async function getRectangles(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const rectangles = await listRectangles()
      return {
        headers,
        statusCode: 200,
        body: rectangles,
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
