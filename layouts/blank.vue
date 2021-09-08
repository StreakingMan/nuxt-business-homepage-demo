<template>
    <v-app>
        <v-app-bar
            app
            absolute
            color="#fcb69f"
            src="http://dmt.upload.streakingman.com/xinghan-toolbar-bg.png"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                ></v-img>
            </template>

            <v-spacer></v-spacer>
            <v-toolbar-title class="d-flex align-center">
                <v-avatar size="36">
                    <v-img
                        src="http://dmt.upload.streakingman.com/xinghan-logo.png"
                    ></v-img>
                </v-avatar>
                <v-img
                    class="d-inline-flex ml-3 mt-1"
                    max-width="100"
                    src="http://dmt.upload.streakingman.com/xinghan-logo-text.png"
                ></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <div
            v-if="allow"
            class="overflow-y-auto grey darken-2"
            style="height: 100vh; padding: 56px 0"
        >
            <nuxt />
        </div>

        <v-dialog v-model="dialog" persistent light>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="white pa-6"
            >
                <v-text-field
                    v-model="account"
                    :rules="accountRules"
                    label="账号"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="密码"
                    type="password"
                    required
                    @keypress.enter="onConfirm"
                ></v-text-field>
            </v-form>
            <v-btn x-large depressed color="error" block @click="onConfirm">
                确定
            </v-btn>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    name: 'Table',
    data: () => ({
        allow: false,
        valid: false,
        dialog: true,
        account: '',
        accountRules: [(v) => v.toUpperCase() === 'TEST1' || '账号错误'],
        password: '',
        passwordRules: [(v) => v === '123456' || '密码错误'],
    }),
    methods: {
        async onConfirm() {
            try {
                await this.$refs.form.validate()
                if (this.valid) {
                    this.allow = this.valid
                    this.dialog = false
                }
            } catch (e) {
                //
            }
        },
    },
}
</script>
