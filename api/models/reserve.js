import mongoose from 'mongoose'

const reserveSchema = new mongoose.Schema({
    openid: String,
    selectedFund: String,
    referee: String,
    reserveType: String,
    money: String,
    name: String,
    phone: String,
    remark: String,
    createAt: Date,
})

reserveSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = Date.now()
    }
    next()
})

const ReserveModel = mongoose.model('reserve', reserveSchema, 'reserve')

export default ReserveModel
