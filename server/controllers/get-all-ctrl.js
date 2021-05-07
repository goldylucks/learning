export default function makeGetAllCtrl({ getAll }) {
  return async function getAllCtrl(httpRequest) {
    try {
      const data = await getAll()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: data,
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
