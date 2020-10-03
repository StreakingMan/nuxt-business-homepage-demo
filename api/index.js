import Express from 'express'
import mongoose from 'mongoose'
import sha1 from 'sha1'
import { dbConnect } from './db-connect'
import sectionModel from './models/section'
import memberModel from './models/member'
import productModel from './models/product'

mongoose.connect(dbConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongoose connection error:'))
db.once('open', function () {
    console.log('mongoose connected')
})

const app = new Express()

app.get('/section', function (_req, res) {
    sectionModel.find({}, (err, sections) => {
        if (!err) {
            res.json(sections)
        }
    })
})

app.get('/member', function (_req, res) {
    memberModel.find({}, (err, members) => {
        if (!err) {
            res.json(members)
        }
    })
})

app.get('/product', function (_req, res) {
    productModel.find({}, (err, products) => {
        if (!err) {
            res.json(products)
        }
    })
})

app.get('/wxCheck', function (req, res) {
    const signature = req.query.signature
    const timestamp = req.query.timestamp
    const nonce = req.query.nonce
    const token = req.token
    // 字典排序
    const str = [token, timestamp, nonce].sort().join('')
    const result = sha1(str)
    if (result === signature) {
        res.send(req.query.echostr)
    } else {
        res.json({
            code: -1,
            msg: 'fail',
        })
    }
})

export const expressServer = {
    path: '/api',
    handler: app,
}
