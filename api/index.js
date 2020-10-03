import Express from 'express'
import mongoose from 'mongoose'
import sha1 from 'sha1'
import bodyParser from 'body-parser'
import { dbConnect } from './db-connect'
import SectionModel from './models/section'
import MemberModel from './models/member'
import ProductModel from './models/product'
import ConfigModel from './models/config'
import UserModel from './models/user'
import ReserveModel from './models/reserve'
import { wxAppInfo } from './wx-connect'
import {
    getJsToken,
    getJsTicket,
    generateSignature,
    getAccessToken,
} from './wx-utils'

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
app.use(bodyParser.json())

app.get('/section', function (_req, res) {
    SectionModel.find({}, (err, sections) => {
        if (!err) {
            res.json(sections)
        }
    })
})

app.get('/member', function (_req, res) {
    MemberModel.find({}, (err, members) => {
        if (!err) {
            res.json(members)
        }
    })
})

app.get('/product', function (_req, res) {
    ProductModel.find({}, (err, products) => {
        if (!err) {
            res.json(products)
        }
    })
})

app.get('/wxCheck', function (req, res) {
    const signature = req.query.signature
    const timestamp = req.query.timestamp
    const nonce = req.query.nonce
    const token = wxAppInfo.token
    // 字典排序
    const str = [token, timestamp, nonce].sort().join('')
    const result = sha1(str)
    if (result === signature) {
        res.send(req.query.echostr)
    } else {
        res.status(400).send('校验未通过')
    }
})

app.post('/user', async function (req, res) {
    const user = req.body
    const hasUser = await UserModel.findOne({ openid: user.openid })
    if (!hasUser) {
        await UserModel.create(user)
        res.send('记录成功')
    }
})

app.get('/user', async function (req, res) {
    const findUser = await UserModel.findOne({ openid: req.query.openid })
    if (findUser) {
        res.send(findUser)
    } else {
        res.status(400).send('未找到用户')
    }
})

app.post('/reserve', async function (req, res) {
    const reserve = req.body
    reserve.reserveType = ['认购', '申购', '赎回'][reserve.reserveType]
    await ReserveModel.create(reserve)
    res.send('预约成功')
})

app.get('/wxAccess', async function (req, res) {
    try {
        const data = await getAccessToken(req.query.code)
        res.send(data)
    } catch (e) {
        res.status(500).send('获取access_token失败' + e)
    }
})

app.get('/jsSignature', async function (req, res) {
    const timestamp = req.query.timestamp
    const url = req.query.url
    const noncestr = req.query.noncestr
    const config = await ConfigModel.findOne({})

    const isFirst = !config
    const isTimeout =
        !isFirst && Number(Date.now() - config.jsTicketUpdateAt) / 1000 > 7200

    const token = await getJsToken()
    if (!token) {
        res.status(500).send('获取token失败')
        return
    }

    if (!isTimeout && !isFirst) {
        // 返回签名
        const signature = generateSignature(
            config.jsTicket,
            noncestr,
            timestamp,
            url
        )
        res.send(signature)
        return
    }

    const jsApiTicket = await getJsTicket(token)
    if (!jsApiTicket) {
        res.status(500).send('获取ticket失败')
        return
    }

    const signature = generateSignature(jsApiTicket, noncestr, timestamp, url)

    if (config) {
        config.jsTicket = jsApiTicket
        config.jsTicketUpdateAt = Date.now()
        const _config = new ConfigModel(config)
        await _config.save()
    } else {
        await ConfigModel.create({
            jsTicket: jsApiTicket,
            jsTicketUpdateAt: Date.now(),
        })
    }

    res.send(signature)
})

export const expressServer = {
    path: '/api',
    handler: app,
}
