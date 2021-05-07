export default function makePatchRectangle({ editRectangle }) {
  return async function patchRectangle(httpRequest) {
    try {
      const rectangleInfo = httpRequest.body
      const { id } = httpRequest.params
      const toEdit = rectangleInfo
      const patched = await editRectangle({ id, ...toEdit })
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(patched.modifiedOn).toUTCString(),
        },
        statusCode: 200,
        body: patched,
      }
    } catch (e) {
      // TODO: Error logging
      console.error(e)
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 404,
          body: {
            error: e.message,
          },
        }
      }
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
