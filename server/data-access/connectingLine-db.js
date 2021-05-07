import Id from '../Id'

export default function makeConnectingLineDb({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    insert,
    insertMany,
    remove,
    removeAll,
    update,
  })

  async function findAll(query = {}) {
    const db = await makeDb()
    const result = await db.collection('connectingLines').find(query)
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }))
  }

  async function findById({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('connectingLines').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function insert({ id: _id = Id.makeId(), ...connectingLineInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('connectingLines')
      .insertOne({ _id, ...connectingLineInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function insertMany(connectingLines) {
    const db = await makeDb()
    const result = await db
      .collection('connectingLines')
      .insertMany(connectingLines)
    return (await result.ops).map(({ _id: id, ...created }) => ({
      id,
      ...created,
    }))
  }

  async function update({ id: _id, ...connectingLineInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('connectingLines')
      .updateOne({ _id }, { $set: { ...connectingLineInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...connectingLineInfo } : null
  }

  async function remove({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('connectingLines').deleteOne({ _id })
    return result.deletedCount
  }

  async function removeAll() {
    const db = await makeDb()
    const result = await db.collection('connectingLines').deleteMany()
    return result.deletedCount
  }
}
