import gamesData from './api/games'
import { closeClient, connectDB } from './connect-db'

async function initializeDB () {
  const defaultState = {
    games: [...gamesData]
  }

  const db = await connectDB()
  for (const collectionName in defaultState) {
    const collection = db.collection(collectionName)
    await collection.insertMany(defaultState[collectionName])
  }
}

initializeDB().then(() => closeClient())
