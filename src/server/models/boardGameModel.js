import mongoose, { Schema } from 'mongoose'

const boardGameModel = new Schema({
  name: {
    type: String,
    default: null
  },
  year: {
    type: Number,
    default: null
  },
  rating: {
    type: Number,
    default: null
  },
  minPlayers: {
    type: Number,
    default: null
  },
  maxPlayers: {
    type: Number,
    default: null
  },
  minPlaytime: {
    type: Number,
    default: null
  },
  maxPlaytime: {
    type: Number,
    default: null
  },
  minAge: {
    type: Number,
    default: null
  },
  designers: {
    type: [String],
    default: []
  },
  artists: {
    type: [String],
    default: []
  },
  publishers: {
    type: [String],
    default: []
  }
})

export default mongoose.model('games', boardGameModel)
