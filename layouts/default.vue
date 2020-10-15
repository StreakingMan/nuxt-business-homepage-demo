<template>
    <v-app>
        <v-app-bar
            app
            absolute
            color="#fcb69f"
            src="http://dmt.upload.streakingman.com/xinghan-toolbar-bg.png"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                ></v-img>
            </template>

            <v-spacer></v-spacer>
            <v-toolbar-title class="d-flex align-center">
                <v-avatar size="36">
                    <v-img
                        src="http://dmt.upload.streakingman.com/xinghan-logo.png"
                    ></v-img>
                </v-avatar>
                <v-img
                    class="d-inline-flex ml-3 mt-1"
                    max-width="100"
                    src="http://dmt.upload.streakingman.com/xinghan-logo-text.png"
                ></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-sheet
            v-if="allow"
            class="overflow-y-auto grey darken-2"
            height="100vh"
        >
            <v-main>
                <nuxt />
            </v-main>
        </v-sheet>

        <v-bottom-navigation :value="activeBtn" grow color="teal" app>
            <v-btn to="/" height="100%">
                <span>公司简介</span>
                <v-icon>mdi-home-flood</v-icon>
            </v-btn>

            <v-btn to="product" height="100%">
                <span>旗下产品</span>
                <v-icon>mdi-shape</v-icon>
            </v-btn>

            <v-btn to="/reserve" height="100%">
                <span>我要预约</span>
                <v-icon>mdi-phone-classic</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <v-dialog v-model="agreeDialog" persistent light>
            <v-card>
                <v-card-title>”合格投资者“承诺</v-card-title>

                <v-card-text>
                    本人承诺符合中国证监会规定的私募证券投资基金的“合格投资者”标准。即：具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元、且个人金融资产不低于300万元或者最近三年个人年均收入不低于50万元。
                </v-card-text>

                <v-card-actions>
                    <v-btn x-large depressed text color="red" @click="onLeave">
                        离开
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                        x-large
                        depressed
                        color="error"
                        :loading="confirmLoading"
                        @click="onConfirm"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
            v-model="snackbar.visible"
            :timeout="3000"
            top
            :color="snackbar.color || 'info'"
        >
            {{ snackbar.text }}
        </v-snackbar>
    </v-app>
</template>

<script>
const appId =
    process.env.NODE_ENV === 'development'
        ? 'wxa275e2c02072f616'
        : 'wx6cbe6dd0fca49d5a'
const redirectUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://192.168.0.104:8000'
        : 'http://xinghan.streakingman.com'

export default {
    data: () => ({
        allow: false,
        activeBtn: 0,
        agreeDialog: true,
        confirmLoading: false,
        snackbar: {
            visible: false,
            text: '',
            color: '',
        },
        userInfo: {},
    }),

    created() {
        this.activeBtn = ['/', '/product', '/reserve'].indexOf(this.$route.path)
    },

    async mounted() {
        /* const { code } = this.$route.query

        let accessInfo = {}

        if (code) {
            const { data } = await this.$axios.get('/api/wxAccess', {
                params: { code },
            })
            accessInfo = data
            localStorage.setItem('openid', accessInfo.openid)
            localStorage.setItem('access_token', accessInfo.access_token)
        } else {
            accessInfo = {
                access_token: localStorage.getItem('access_token'),
                openid: localStorage.getItem('openid'),
            }
        }

        await this.getUserInfo(accessInfo.access_token, accessInfo.openid) */

        // await this.checkPermission()

        await this.jsValidate()
    },

    methods: {
        async getUserInfo(accessToken, openid) {
            const params = {
                access_token: accessToken,
                openid,
                lang: 'zh_CN ',
            }
            const { data } = await this.$axios.get('/sns/userinfo', {
                params,
            })
            if (data.errcode) {
                this.getCode()
            } else {
                this.userInfo = data
            }
        },

        getCode() {
            localStorage.clear()
            location.href =
                'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                appId +
                '&redirect_uri=' +
                encodeURIComponent(redirectUrl) +
                '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
        },

        async jsValidate() {
            const timestamp = Math.floor(new Date().getTime() / 1000).toString()
            const noncestr = Math.random().toString(36).substr(2)
            const url = location.href.split('#')[0]
            const params = {}
            params.noncestr = noncestr
            params.timestamp = timestamp
            params.url = url

            let signature = ''
            try {
                const { data } = await this.$axios.get('/api/jsSignature', {
                    params,
                })
                signature = data
            } catch (e) {
                //
            }
            // eslint-disable-next-line no-undef
            wx.config({
                debug: process.env.NODE_ENV === 'development', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId, // 必填，公众号的唯一标识
                timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature, // 必填，签名
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'closeWindow',
                ], // 必填，需要使用的JS接口列表
            })
            // eslint-disable-next-line no-undef
            wx.ready(function () {
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                // eslint-disable-next-line no-undef
                wx.updateAppMessageShareData({
                    title: '星瀚投资微官网', // 分享标题
                    desc: '杭州星瀚投资管理有限公司', // 分享描述
                    link:
                        process.env.NODE_ENV === 'development'
                            ? 'http://192.168.0.104:8000/'
                            : 'http://xinghan.streakingman.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://xinghan.streakingman.com/xinghan-logo.png', // 分享图标
                    success() {
                        // 设置成功
                    },
                })
                // eslint-disable-next-line no-undef
                wx.updateTimelineShareData({
                    title: '杭州星瀚投资管理有限公司', // 分享标题
                    link:
                        process.env.NODE_ENV === 'development'
                            ? 'http://192.168.0.104:8000/'
                            : 'http://xinghan.streakingman.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://xinghan.streakingman.com/xinghan-logo.png', // 分享图标
                    success() {
                        // 设置成功
                    },
                })
            })

            // eslint-disable-next-line no-undef
            wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res)
            })
        },

        async checkPermission() {
            try {
                const { data } = await this.$axios.get('/api/user', {
                    params: {
                        openid: this.userInfo.openid,
                    },
                })
                this.agreeDialog = !data
                this.allow = !!data
            } catch (e) {
                this.agreeDialog = true
            }
        },

        onLeave() {
            // eslint-disable-next-line no-undef
            wx.closeWindow()
        },

        onConfirm() {
            this.agreeDialog = false
            this.allow = true

            /* this.confirmLoading = true
            try {
                if (!this.userInfo.openid) {
                    this.snackbar = {
                        visible: true,
                        text: '获取用户信息失败，请稍后再试',
                        color: 'error',
                    }
                    this.confirmLoading = false
                    return
                }

                await this.$axios.post('/api/user', this.userInfo)
                this.agreeDialog = false
                this.allow = true
                this.snackbar = {
                    visible: true,
                    text: '已记录您为’合格投资者‘',
                    color: 'success',
                }
            } catch (e) {
                this.snackbar = {
                    visible: true,
                    text: '服务器正在开小差，请稍候再试',
                    color: 'error',
                }
                console.log(e)
            }
            this.confirmLoading = false */
        },
    },
}
</script>
