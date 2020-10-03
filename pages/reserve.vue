<template>
    <v-form ref="form">
        <v-container>
            <h2 class="text-center mb-4">产品认购/申购/赎回意向申请</h2>
            <p class="text--secondary mb-4">
                该预约提交的仅为意向申请，我们会根据填写的联系方式与您联系，具体认购/申购/赎回操作流程以实际操作为准
            </p>

            <v-select
                :items="productOptions"
                :rules="[(v) => !!v || '请选择基金']"
                label="选择基金"
                outlined
            ></v-select>
            <v-text-field label="推荐人" outlined></v-text-field>

            <v-tabs v-model="form.currentType" grow class="mb-8">
                <v-tab>认购</v-tab>
                <v-tab>申购</v-tab>
                <v-tab>赎回</v-tab>
            </v-tabs>

            <v-text-field
                label="金额"
                outlined
                :rules="[(v) => !!v || '请填写金额']"
            ></v-text-field>
            <v-text-field
                label="姓名"
                outlined
                :rules="[(v) => !!v || '请填写姓名']"
            ></v-text-field>
            <v-text-field
                label="联系电话"
                outlined
                :rules="[
                    (v) => !!v || '请填写电话',
                    (v) =>
                        /^1[3456789]\d{9}$/.test(v) || '请填写正确的手机号码',
                ]"
            ></v-text-field>
            <v-textarea label="备注" outlined></v-textarea>

            <v-btn
                depressed
                x-large
                block
                :loading="loading"
                @click="onConfirm"
            >
                我要预约
            </v-btn>
        </v-container>

        <v-snackbar v-model="snackbar" :timeout="3000" top color="success">
            预约成功，请等待工作人员联系
        </v-snackbar>
    </v-form>
</template>

<script>
export default {
    name: 'Reserve',
    data: () => ({
        form: {
            currentType: 0,
        },
        snackbar: false,
        loading: false,
        productOptions: [],
    }),
    created() {
        this.$axios
            .$get('/api/product')
            .then((res) => {
                this.productOptions = res.map((p) => p.title)
            })
            .catch(() => {
                //
            })
    },
    methods: {
        onConfirm() {
            console.log(this.form)
            const validate = this.$refs.form.validate()
            if (validate) {
                this.loading = true
                setTimeout(() => {
                    this.snackbar = true
                    this.loading = false
                }, 3000)
            }
        },
    },
}
</script>
