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
                <v-icon>mdi-history</v-icon>
            </v-btn>

            <v-btn to="product" height="100%">
                <span>旗下产品</span>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn to="/reserve" height="100%">
                <span>我要预约</span>
                <v-icon>mdi-map-marker</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        activeBtn: 0,
    }),
}
</script>
