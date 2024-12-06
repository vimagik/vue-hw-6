<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const loginForm = ref(null)
const userName = ref(null)
const pass = ref(null)
const store = useUserStore()


const rules = {
    required: value => !!value || 'Обязательное поле',
    password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Пароль должен содержать заглавные буквы, числа и специальный символ'
}

const LoginSubmit = async function () {
    const { valid } = await loginForm.value.validate()
    if (valid) store.login(userName.value)
}
</script>

<template>
    <v-container class="d-flex" height="100%">
        <v-row class="align-self-center">
            <v-card class="mx-auto" width="500" elevation="16">
                <v-card-title primary-title>
                    Авторизация
                </v-card-title>
                <v-form ref="loginForm">
                    <v-card-text>
                        <v-text-field v-model="userName" label="Логин" :rules="[rules.required]"></v-text-field>
                        <v-text-field v-model="pass" label="Пароль" type="password"
                            :rules="[rules.required, rules.password]"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="indigo-darken-3" variant="flat" block @click="LoginSubmit">Вход</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>