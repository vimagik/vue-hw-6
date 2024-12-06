<script setup>
import { useUserStore } from '@/stores/user';

const store = useUserStore()
</script>

<template>
    <div>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-avatar class="cursor" color="indigo" v-bind="props">
                    <span class="text-h5">{{ store.acronym }}</span>
                </v-avatar>
            </template>
            <v-list>
                <v-list-item to="/newproduct">
                    <v-list-item-title>Добавить товар</v-list-item-title>
                </v-list-item>
                <v-list-item @click="store.logout">
                    <v-list-item-title>Выйти</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<style scoped>
.cursor:hover {
    cursor: pointer;
}
</style>