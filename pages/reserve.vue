<template>
    <v-container>
        <h2 class="text-center mb-4">产品认购/申购/赎回意向申请</h2>
        <p class="text--secondary mb-4">该预约啦记得发啦肯定就发；卢卡斯的发</p>

        <v-select
            :items="['基金1', '基金2']"
            label="选择基金"
            outlined
        ></v-select>
        <v-text-field label="推荐人" outlined></v-text-field>

        <div class="d-flex mb-8">
            <v-btn depressed x-large class="flex-grow-1 mx-2">认购</v-btn>
            <v-btn depressed x-large class="flex-grow-1 mx-2">认购</v-btn>
            <v-btn depressed x-large class="flex-grow-1 mx-2">认购</v-btn>
        </div>

        <v-text-field label="金额" outlined></v-text-field>
        <v-text-field label="姓名" outlined></v-text-field>
        <v-text-field label="联系电话" outlined></v-text-field>
        <v-text-field label="备注" outlined></v-text-field>

        <v-btn depressed x-large block>我要预约</v-btn>
    </v-container>
</template>

<script>
export default {
    name: 'Reserve',
}
</script>
