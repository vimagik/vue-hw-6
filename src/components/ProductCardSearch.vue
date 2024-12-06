<script setup>
defineProps(["minPrice", "maxPrice"])

const searchStr = defineModel()
const price = defineModel('rangePrice')
</script>

<template>
    <v-card min-width="280" class="pa-3">
        <v-card-title>Фильтр товаров</v-card-title>
        <v-card-text class="mt-3">
            <v-text-field v-model="searchStr" density="compact" label="Поиск по названию"
                variant="outlined"></v-text-field>
        </v-card-text>
        <p class="text-caption ml-4 mt-n5">Диапазон цен в тубриках</p>
        <v-range-slider v-model="price" class="mt-7 px-3" step="0.1" thumb-label="always" color="blue-darken-1"
            :min="minPrice" :max="maxPrice"></v-range-slider>
    </v-card>
</template>