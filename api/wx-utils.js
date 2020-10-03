import axios from 'axios'
import sha1 from 'sha1'
import { wxAppInfo } from './wx-connect'
const instance = axios.create({})

export const generateSignature = function (
    jsApiTicket,
    noncestr,
    timestamp,
    url
) {
    const str =
        'jsapi_ticket=' +
        jsApiTicket +
        '&noncestr=' +
        noncestr +
        '&timestamp=' +
        timestamp +
        '&url=' +
        url
    return sha1(str)
}

// 获取jsToken
export const getJsToken = async function () {
    const params = {
        grant_type: 'client_credential',
    }

    params.appid = wxAppInfo.appId
    params.secret = wxAppInfo.appSecret

    const { data } = await instance.get(
        'https://api.weixin.qq.com/cgi-bin/token',
        {
            params,
        }
    )
    if (data.errcode) {
        return false
    } else {
        return data.access_token
    }
}

export const getJsTicket = async function (token) {
    const { data } = await instance.get(
        'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
        {
            params: {
                access_token: token,
                type: 'jsapi',
            },
        }
    )
    if (data.errcode !== 0) {
        return false
    } else {
        return data.ticket
    }
}

export const getAccessToken = async function (code) {
    const params = {
        code,
        grant_type: 'authorization_code',
    }
    params.appid = wxAppInfo.appId
    params.secret = wxAppInfo.appSecret
    const { data } = await instance.get(
        'https://api.weixin.qq.com/sns/oauth2/access_token',
        {
            params,
        }
    )
    if (data.errcode) {
        return false
    } else {
        return await refreshAccessToken(data)
    }
}

const refreshAccessToken = async function (firstAccess) {
    const params = {
        appid: wxAppInfo.appId,
        refresh_token: firstAccess.refresh_token,
        grant_type: 'refresh_token',
    }
    const { data } = await instance.get(
        'https://api.weixin.qq.com/sns/oauth2/refresh_token',
        {
            params,
        }
    )
    if (data.errcode) {
        return false
    } else {
        return data
    }
}
