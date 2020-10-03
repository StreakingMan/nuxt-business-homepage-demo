import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
    title: String,
    image: String,
    subtitle: String,
    contents: [String],
})

const sectionModel = mongoose.model('section', sectionSchema, 'section')

export default sectionModel
