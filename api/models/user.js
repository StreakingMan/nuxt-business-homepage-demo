import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    openid: String,
    nickname: String,
    sex: Number,
    language: String,
    city: String,
    province: String,
    country: String,
    headimgurl: String,
    privilege: Array,
})

const UserModel = mongoose.model('user', userSchema, 'user')

export default UserModel
