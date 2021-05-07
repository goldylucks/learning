import makeRectangleDb from './rectangle-db'
import makeConnectingLineDb from './connectingLine-db'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = process.env.MONGO_CONNECTION_STRING || 'mongodb://db:27017'
const dbName = 'learning'
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export async function makeDb() {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}

const rectangleDb = makeRectangleDb({ makeDb })
const connectingLineDb = makeConnectingLineDb({ makeDb })

const dbs = Object.freeze({ rectangleDb, connectingLineDb })

export default dbs

export { rectangleDb, connectingLineDb }
