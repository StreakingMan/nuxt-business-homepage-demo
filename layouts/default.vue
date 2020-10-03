<template>
    <v-app>
        <v-app-bar
            app
            absolute
            color="#fcb69f"
            src="http://lorempixel.com/1920/1080?business"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                ></v-img>
            </template>

            <v-spacer></v-spacer>
            <v-toolbar-title>
                <v-avatar color="teal" size="36"> XH </v-avatar>
                <span>星瀚投资</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-sheet class="overflow-y-auto grey darken-2" height="100vh">
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
                    <v-btn
                        x-large
                        depressed
                        text
                        color="red"
                        @click="agreeDialog = false"
                    >
                        离开
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                        x-large
                        depressed
                        color="error"
                        @click="agreeDialog = false"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        activeBtn: 0,
        agreeDialog: true,
    }),
}
</script>
