import mongoose, { Schema } from 'mongoose'

const projectModel = new Schema({
  name: {
    type: String, default: ''
  },
  publishDate: {
    type: Date, default: new Date()
  },
  updateDate: {
    type: Date, default: new Date()
  },
  creator: {
    type: String, default: ''
  },
  imageURLs: {
    type: [String], default: []
  },
  fileURLs: {
    type: [String], default: []
  }
})

export default mongoose.model('projects', projectModel)
