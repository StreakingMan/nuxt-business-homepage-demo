import mongoose from 'mongoose'
const configSchema = new mongoose.Schema({
    jsTicket: String,
    jsTicketUpdateAt: Date,
    accessInfo: Object,
    accessInfoUpdateAt: Date,
})

const ConfigModel = mongoose.model('config', configSchema, 'config')
export default ConfigModel
