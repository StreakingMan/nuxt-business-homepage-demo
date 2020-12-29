import mongoose from 'mongoose'

/* const memberSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    subDesc: String,
    type: String, // founder表示创始人
    labels: Array, // {text:String,color: String}
    contents: Array,
}) */

const MemberModel = mongoose.model('member', new mongoose.Schema(), 'member')

export default MemberModel
