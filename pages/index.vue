<template>
    <v-container>
        <v-card
            v-for="(section, index) in sections.slice(0, sections.length - 1)"
            :key="index + 'section'"
            :elevation="0"
            shaped
            class="mx-auto mb-4"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                :src="section.image"
            >
                <v-card-title>
                    <v-spacer></v-spacer>
                    <span>{{ section.title }}</span>
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

        <v-card
            v-for="(member, index) in members"
            :key="index + 'founder'"
            class="mx-auto mb-4"
        >
            <v-img :aspect-ratio="1.3" :src="member.avatar">
                <v-card-title
                    style="position: absolute; bottom: 0; width: 100%"
                >
                    <v-spacer></v-spacer>
                    <span>{{ typeDescMap[member.type] }}</span>
                </v-card-title>
            </v-img>

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

            <v-card-text class="text--primary">
                <p v-if="member.subDesc">
                    {{ member.subDesc }}
                </p>

                <p v-for="(c, i) in member.contents" :key="i">
                    {{ c }}
                </p>
            </v-card-text>
        </v-card>

        <v-card :elevation="0" class="mx-auto mb-4">
            <v-img
                class="white--text align-end"
                height="200px"
                :src="contactInfo.image"
            >
                <v-card-title>
                    <v-spacer></v-spacer>
                    <span>{{ contactInfo.title }}</span>
                </v-card-title>
            </v-img>

            <v-card-subtitle v-if="contactInfo.subtitle" class="text-center">
                <span>{{ contactInfo.subtitle }}</span>
            </v-card-subtitle>

            <v-card-text class="text--primary">
                <p v-for="(c, i) in contactInfo.contents" :key="i">
                    {{ c }}
                </p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    components: {},
    data: () => ({
        sections: [{}, {}, {}],
        members: [],
        typeDescMap: {
            founder: '创始人介绍',
            fundManager: '基金经理介绍',
        },
    }),
    computed: {
        contactInfo() {
            const sectionLength = this.sections.length
            return sectionLength ? this.sections[sectionLength - 1] : {}
        },
    },
    created() {
        this.$axios
            .$get('/api/section')
            .then((res) => {
                this.sections = res
            })
            .catch(() => {
                //
            })

        this.$axios
            .$get('/api/member')
            .then((res) => {
                this.members = res
            })
            .catch(() => {
                //
            })
    },
}
</script>
