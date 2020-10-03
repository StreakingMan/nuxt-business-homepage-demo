import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    subDesc: String,
    // founder表示创始人
    type: String,
    // {text:String,color: String}
    labels: Array,
    contents: Array,
})

const memberModel = mongoose.model('member', memberSchema, 'member')

export default memberModel
