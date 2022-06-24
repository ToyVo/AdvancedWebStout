import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/BoardGameBrowser'
let db = null
let client = null

/**
 * connect to database return the existing database if it exists
 * @returns {db}
 */
export async function connectDB () {
  if (!db) {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = client.db()
  }
  return db
}

export function closeClient () {
  if (client) {
    client.close()
  }
}
