export default function makePostRectangle({ addRectangle }) {
  return async function postRectangle(httpRequest) {
    try {
      const rectangleInfo = httpRequest.body
      const added = await addRectangle(rectangleInfo)
      console.log('**********\nhttpRequest.headers\n*********')
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(added.modifiedOn).toUTCString(),
        },
        statusCode: 201,
        body: added,
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
