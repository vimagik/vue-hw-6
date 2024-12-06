<script setup>
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const searchStr = defineModel()
const route = useRoute()
const store = useCartStore()
const userStore = useUserStore()
</script>


<template>
    <v-app-bar>
        <v-app-bar-title>Супер-пупер магазин</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-text-field v-if="route.path === '/'" class="mt-4 mr-4" prepend-icon="mdi-magnify" density="compact"
            variant="outlined" max-width="300" v-model="searchStr"></v-text-field>
        <v-btn to="/">Главная</v-btn>
        <v-btn v-if="userStore.username === ''" class="ml-2" to="/login">Войти</v-btn>
        <app-menu class="ml-3" v-else />
        <v-badge v-if="route.path === '/'" :content="store.productAmmount" :dot="store.productAmmount === 0" inline>
            <v-btn color="indigo" icon="mdi-cart-variant" to="/cart"></v-btn>
        </v-badge>
    </v-app-bar>
</template>