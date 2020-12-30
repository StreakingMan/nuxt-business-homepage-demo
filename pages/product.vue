<template>
    <v-container>
        <v-card
            v-for="(product, index) in products"
            :key="index + 'products'"
            :elevation="0"
            class="mb-4"
        >
            <v-card-title>
                <div style="width: 100%; text-align: center">
                    {{ product.title }}
                </div>
            </v-card-title>
            <v-card-text>
                <v-sheet
                    class="mb-2 pa-2"
                    color="grey darken-3"
                    rounded
                    style="position: relative"
                    elevation="0"
                >
                    <div
                        :id="product._id"
                        style="width: 100%; height: 200px"
                    ></div>
                    <div
                        style="
                            position: absolute;
                            left: 4px;
                            bottom: 4px;
                            font-size: 12px;
                            color: #999;
                        "
                    >
                        {{ product.timeTend[0].substring(0, 10) }}
                    </div>
                </v-sheet>

                <div
                    style="
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 16px;
                    "
                    class="my-4 px-2"
                >
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
                    <v-responsive aspect-ratio="1">
                        <v-sheet
                            color="grey darken-3"
                            rounded
                            elevation="0"
                            height="100%"
                            width="100%"
                            class="d-flex flex-column align-center justify-center"
                        >
                            <div class="caption text-center">今年以来收益</div>
                            <h2>{{ product.yearAcc }}</h2>
                        </v-sheet>
                    </v-responsive>
                    <v-responsive aspect-ratio="1">
                        <v-sheet
                            color="grey darken-3"
                            rounded
                            elevation="0"
                            height="100%"
                            width="100%"
                            class="d-flex flex-column align-center justify-center"
                        >
                            <div class="caption text-center">
                                最新净值
                                <br />
                                ({{
                                    product.timeTend[
                                        product.timeTend.length - 1
                                    ].substring(0, 10)
                                }})
                            </div>
                            <h2>
                                {{
                                    String(product.netAssetValue).substring(
                                        0,
                                        6
                                    )
                                }}
                            </h2>
                        </v-sheet>
                    </v-responsive>
                </div>

                <v-row class="mx-3">
                    <span>基金经理：{{ product.manager }}</span>
                    <v-spacer></v-spacer>
                    <span>成立日期：{{ product.createdAt }}</span>
                </v-row>
            </v-card-text>
            <v-card-actions class="px-6 pt-0 pb-4">
                <v-btn-toggle>
                    <v-btn small class="no-bg"> 认购起点 </v-btn>
                    <v-btn small class="no-bg">
                        RMB:{{ product.startingPoint }}
                    </v-btn>
                </v-btn-toggle>
                <v-spacer></v-spacer>
                <!--<v-btn color="white" text outlined small> 查看原文 </v-btn>-->
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
    mounted() {
        this.$axios
            .$get('/api/product')
            .then((res) => {
                res.forEach((p) => {
                    if (p.timeTend) {
                        p.timeTend = p.timeTend.map((i) =>
                            String(i).substring(0, 10)
                        )
                    }
                    if (p.netAssetValueTend) {
                        p.netAssetValueTend = p.netAssetValueTend.map((i) =>
                            String(i).substring(0, 4)
                        )
                    }
                    if (p['500valueTend']) {
                        p['500valueTend'] = p['500valueTend'].map((i) =>
                            String(i).substring(0, 4)
                        )
                    }
                })
                this.products = res
            })
            .catch(() => {
                //
            })
            .finally(() => {
                this.products.forEach((p) => {
                    // 基于准备好的dom，初始化echarts实例
                    const myChart = window.echarts.init(
                        document.getElementById(p._id)
                    )

                    // 指定图表的配置项和数据
                    const option = {
                        color: ['#d14a61', '#999'],
                        legend: {
                            data: [
                                { name: p.title, icon: 'rect' },
                                { name: '中证500净值走势', icon: 'rect' },
                            ],
                            textStyle: {
                                color: 'white',
                            },
                            itemWidth: 24,
                            itemHeight: 2,
                        },
                        grid: {
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 24,
                            containLabel: true,
                        },
                        /* tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.4)',
                                    type: 'dashed',
                                },
                            },
                            confine: true,
                        }, */
                        xAxis: {
                            type: 'category',
                            data: p.timeTend,
                            axisLabel: {
                                color: '#999',
                                interval: 10000000,
                                showMinLabel: false,
                                showMaxLabel: true,
                                align: 'right',
                                fontSize: 12,
                            },
                            boundaryGap: false,
                            axisTick: {
                                show: false,
                            },
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                color: '#999',
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    color: '#333',
                                },
                            },
                            min: 'dataMin',
                            max: 'dataMax',
                        },
                        series: [
                            {
                                symbol: 'none',
                                name: p.title,
                                type: 'line',
                                data: p.netAssetValueTend,
                                lineStyle: {
                                    width: 1,
                                },
                            },
                            {
                                symbol: 'none',
                                name: '中证500净值走势',
                                type: 'line',
                                data: p['500valueTend'],
                                lineStyle: {
                                    width: 1,
                                },
                            },
                        ],
                    }

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option)
                })
            })
    },
}
</script>

<style>
.no-bg::before {
    background-color: transparent !important;
}
</style>
