<template>
    <v-container>
        <v-card
            v-for="(product, index) in products"
            :key="index + 'products'"
            :elevation="0"
            class="mx-auto my-4"
        >
            <v-card-title>
                {{ product.title }}
            </v-card-title>
            <v-card-text>
                <v-row class="mx-0">
                    <v-col>
                        <v-responsive aspect-ratio="1">
                            <v-sheet
                                color="grey darken-3"
                                rounded
                                elevation="0"
                                height="100%"
                                width="100%"
                                class="d-flex flex-column align-center justify-center"
                            >
                                <div class="caption text-center">累计收益</div>
                                <h2>{{ product.acc }}</h2>
                            </v-sheet>
                        </v-responsive>
                    </v-col>
                    <v-col>
                        <v-responsive aspect-ratio="1">
                            <v-sheet
                                color="grey darken-3"
                                rounded
                                elevation="0"
                                height="100%"
                                width="100%"
                                class="d-flex flex-column align-center justify-center"
                            >
                                <div class="caption text-center">单位净值</div>
                                <div class="caption text-center">
                                    更新日期({{ product.updatedAt }})
                                </div>
                                <h2>{{ product.netAssetValue }}</h2>
                            </v-sheet>
                        </v-responsive>
                    </v-col>
                </v-row>
                <v-row class="mx-3">
                    <span>投资经理：{{ product.manager }}</span>
                    <v-spacer></v-spacer>
                    <span>成立日期：{{ product.createdAt }}</span>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn-toggle mandatory>
                    <v-btn small> 认购起点 </v-btn>
                    <v-btn small> RMB:{{ product.startingPoint }} </v-btn>
                </v-btn-toggle>
                <v-spacer></v-spacer>
                <v-btn color="white" text outlined small> 查看原文 </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Product',
    data: () => ({
        products: [],
    }),
    created() {
        this.$axios
            .$get('/api/product')
            .then((res) => {
                this.products = res
            })
            .catch(() => {
                //
            })
    },
}
</script>
