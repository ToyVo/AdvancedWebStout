import projectsData from './projects.json'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/ProjectBrowser'
let db = null
let client = null

/**
 * connect to database return the existing database if it exists
 * @returns {db}
 */
async function connectDB () {
  if (!db) {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    db = client.db()
  }
  return db
}

function closeClient () {
  if (client) {
    client.close()
  }
}

async function initializeDB () {
  const defaultState = {
    projects: [...projectsData]
  }

  const db = await connectDB()
  await db.dropDatabase()
  for (const collectionName in defaultState) {
    const collection = db.collection(collectionName)
    await collection.insertMany(defaultState[collectionName])
  }
}

initializeDB().then(() => closeClient())
