<template>
    <v-container style="height: calc(100vh - 112px)">
        <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="请选择日期"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                @input="dateMenu = false"
            ></v-date-picker>
        </v-menu>
        <v-simple-table
            dense
            fixed-header
            class="elevation-1 table"
            height="calc(100vh - 256px)"
        >
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Calories</th>
                        <th class="text-left">Calories</th>
                        <th class="text-left">Calories</th>
                        <th class="text-left">Calories</th>
                        <th class="text-left">Calories</th>
                        <th class="text-left">Calories</th>
                        <th class="text-left">Calories</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                        <td>{{ item.calories }}</td>
                        <td>{{ item.calories }}</td>
                        <td>{{ item.calories }}</td>
                        <td>{{ item.calories }}</td>
                        <td>{{ item.calories }}</td>
                        <td>{{ item.calories }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
        <v-bottom-navigation :value="activeBtn" grow color="teal" app>
            <v-btn height="100%">
                <span>个股预警</span>
            </v-btn>
            <v-btn height="100%">
                <span>行业预警</span>
            </v-btn>
            <v-btn height="100%">
                <span>个股查询</span>
            </v-btn>
            <v-btn height="100%">
                <span>行业查询</span>
            </v-btn>
        </v-bottom-navigation>
    </v-container>
</template>

<script>
export default {
    layout: 'blank',
    name: 'Analysis',
    data: () => ({
        activeBtn: '',
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        dateMenu: false,
        page: 1,
        pageCount: 1,
        itemsPerPage: 10,
        headers: [
            {
                text: 'Dessert (100g serving)',
                align: 'start',
                value: 'name',
            },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Protein (g)', value: 'protein' },
            { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1%',
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1%',
            },
            {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7%',
            },
            {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: '8%',
            },
            {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: '16%',
            },
            {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: '0%',
            },
            {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: '2%',
            },
            {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: '45%',
            },
            {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: '22%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
        ],
    }),
}
</script>

<style scoped>
.table tr th:first-child {
    position: sticky;
    left: 0;
    background-color: #1e1e1e;
    z-index: 3 !important;
}
.table tr td:first-child {
    position: sticky;
    left: 0;
    background-color: #1e1e1e;
    z-index: 1;
}
.table
    tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
    td {
    background-color: #616161;
}
</style>
