import Id from '../Id'

export default function makeRectangleDb({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    findByName,
    insert,
    insertMany,
    remove,
    removeAll,
    update,
  })

  async function findAll(query = {}) {
    const db = await makeDb()
    const result = await db.collection('rectangles').find(query)
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }))
  }

  async function findById({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('rectangles').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function findByName({ name }) {
    const db = await makeDb()
    const result = await db.collection('rectangles').find({ name })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function insert({ id: _id = Id.makeId(), ...rectangleInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('rectangles')
      .insertOne({ _id, ...rectangleInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function insertMany(rectangles) {
    const db = await makeDb()
    const result = await db.collection('rectangles').insertMany(rectangles)
    return (await result.ops).map(({ _id: id, ...created }) => ({
      id,
      ...created,
    }))
  }

  async function update(rectangleInfo) {
    const db = await makeDb()
    const result = await db
      .collection('rectangles')
      .updateOne({ name: rectangleInfo.name }, { $set: { ...rectangleInfo } })
    return result.modifiedCount > 0 ? { ...rectangleInfo } : null
  }

  async function remove({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('rectangles').deleteOne({ _id })
    return result.deletedCount
  }

  async function removeAll() {
    const db = await makeDb()
    const result = await db.collection('rectangles').deleteMany()
    return result.deletedCount
  }
}
