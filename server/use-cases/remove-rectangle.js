export default function makeRemoveRectangle({ rectangleDb }) {
  return async function removeRectangle({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a rectangle id.')
    }

    const rectangleToDelete = await rectangleDb.findById({ id })

    if (!rectangleToDelete) {
      return deleteNothing()
    }

    return deleteRectangle(rectangleToDelete)
  }

  function deleteNothing() {
    return {
      deletedCount: 0,
      message: 'Rectangle not found, nothing to delete.',
    }
  }

  async function deleteRectangle(rectangle) {
    await rectangleDb.remove(rectangle)
    return {
      deletedCount: 1,
      message: 'Rectangle deleted.',
    }
  }
}
