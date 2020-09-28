<template>
    <v-container>
        <v-card
            v-for="(section, index) in sections"
            :key="index + 'section'"
            :elevation="0"
            shaped
            class="mx-auto my-4"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                :src="`http://lorempixel.com/1920/1080/business/${index}`"
            >
                <v-card-title>
                    <v-spacer v-if="!!index % 2"></v-spacer>
                    <span>{{ section.title }}</span>
                    <v-spacer v-if="!index % 2"></v-spacer>
                </v-card-title>
            </v-img>

            <v-card-subtitle v-if="section.subtitle" class="text-center">
                <span>{{ section.subtitle }}</span>
            </v-card-subtitle>

            <v-card-text class="text--primary">
                <p v-for="(c, i) in section.contents" :key="i">
                    {{ c }}
                </p>
            </v-card-text>
        </v-card>

        <h2 class="text-center my-2">创始人介绍</h2>

        <v-card
            v-for="(member, index) in members.filter(
                (m) => m.type === 'founder'
            )"
            :key="index + 'founder'"
            class="mx-auto mb-4"
        >
            <v-img
                :aspect-ratio="1.3"
                :src="`http://lorempixel.com/1920/1080/people/${index}`"
            ></v-img>

            <v-card-title>
                <span class="mr-1">{{ member.name }} </span>
                <v-chip
                    v-for="(label, i) in member.labels"
                    :key="i"
                    class="ml-2"
                    :color="label.color || 'primary'"
                    small
                >
                    {{ label.text }}
                </v-chip>
            </v-card-title>

            <v-card-text>
                <div v-if="member.subDesc" class="mb-4 subtitle-1">
                    {{ member.subDesc }}
                </div>

                <p v-for="(c, i) in member.contents" :key="i">
                    {{ c }}
                </p>
            </v-card-text>
        </v-card>

        <h2 class="text-center my-2">团队成员</h2>

        <v-card
            v-for="(member, index) in members.filter(
                (m) => m.type !== 'founder'
            )"
            :key="index + 'member'"
            class="mx-auto mb-4"
        >
            <v-img
                :aspect-ratio="2"
                :src="`http://lorempixel.com/1920/1080/people/${index}`"
            ></v-img>
            <v-container>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <span class="mr-1">{{ member.name }} </span>
                    <v-chip
                        v-for="(label, i) in member.labels"
                        :key="i"
                        class="ml-2"
                        :color="label.color || 'primary'"
                        small
                    >
                        {{ label.text }}
                    </v-chip>
                    <v-spacer></v-spacer>
                </v-card-title>

                <v-card-text>
                    <div v-if="member.subDesc" class="mb-4 subtitle-1">
                        {{ member.subDesc }}
                    </div>

                    <p
                        v-for="(c, i) in member.contents"
                        :key="i"
                        class="text-center"
                    >
                        {{ c }}
                    </p>
                </v-card-text>
            </v-container>
        </v-card>
    </v-container>
</template>

<script lang="ts">
export default {
    components: {},
    data: () => ({
        sections: [
            {
                title: '公司简介',
                image: '',
                contents: [
                    'asfdasdfasdfasdf',
                    '啊手动阀手动阀啊手动阀手动阀啊',
                    '杭州星瀚爱上了对方骄傲就；阿里山的空间发啊啊啊收到了发；阿斯兰的肌肤啊上的分厘卡flask京东方啊啊',
                ],
            },
            {
                title: '投资理念',
                subtitle: '二级标题',
                image: '',
                contents: [
                    '啊手动阀手动阀啊手动阀手动阀啊',
                    '杭州星瀚爱上了对方骄傲就；阿里山的空间发啊啊啊收到了发；阿斯兰的肌肤啊上的分厘卡flask京东方啊啊',
                ],
            },
        ],
        members: [
            {
                name: '丁佩民博士',
                avatar: '',
                subDesc: '请他的描述',
                type: 'founder',
                labels: [
                    { text: '创始人', color: 'primary' },
                    { text: '董事长', color: 'red' },
                ],
                contents: [
                    '初始合伙人：拉萨大家发爱丽丝大量的饭卡；',
                    '十多年啊收到了饭卡；顺利打开房间啊',
                ],
            },
            {
                name: 'ZZZZ',
                avatar: '',
                type: 'founder',
                labels: [{ text: 'CTO', color: 'blue' }],
                contents: [
                    'asfdasdf：拉萨大家发爱丽丝大量的饭卡；',
                    '十多年啊收到了饭卡；顺利打开房间啊',
                ],
            },
            {
                name: 'asdfad',
                avatar: '',
                labels: [{ text: 'CTO', color: 'blue' }],
                contents: [
                    'asfdasdf：拉萨大家发爱丽丝大量的饭卡；',
                    '十多年啊收到了饭卡；顺利打开房间啊',
                ],
            },
        ],
    }),
}
</script>
