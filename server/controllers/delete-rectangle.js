export default function makeDeleteRectangle({ removeRectangle }) {
  return async function deleteRectangle(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const deleted = await removeRectangle({ id: httpRequest.params.id })
      return {
        headers,
        statusCode: deleted.deletedCount === 0 ? 404 : 200,
        body: { deleted },
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
