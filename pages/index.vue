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
                :src="section.image"
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

        <h2
            v-if="members.filter((m) => m.type === 'founder').length"
            class="text-center my-2"
        >
            创始人介绍
        </h2>

        <v-card
            v-for="(member, index) in members.filter(
                (m) => m.type === 'founder'
            )"
            :key="index + 'founder'"
            class="mx-auto mb-4"
        >
            <v-img :aspect-ratio="1.3" :src="member.avatar"></v-img>

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

        <h2
            v-if="members.filter((m) => m.type !== 'founder').length"
            class="text-center my-2"
        >
            团队成员
        </h2>

        <v-card
            v-for="(member, index) in members.filter(
                (m) => m.type !== 'founder'
            )"
            :key="index + 'member'"
            class="mx-auto mb-4"
        >
            <v-img :aspect-ratio="2" :src="member.avatar"></v-img>
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

<script>
export default {
    components: {},
    data: () => ({
        sections: [],
        members: [],
    }),
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
