<script setup>
import { ref } from 'vue'

defineProps(['product-data', 'productAmount'])

const count = ref(0)
</script>

<template>
    <div>
        <v-card class="mx-3 mb-2 d-flex flex-column" width="350" height="100%">
            <v-img class="mt-2" :src="productData.image" max-height="200"></v-img>
            <v-card-text>
                <p class="text-h6">{{ productData.title }}</p>
                <p class="font-weight-black">{{ productData.price }} тубриков</p>
                <div class="d-flex flex-row ga-2 mt-2">
                    <v-chip prepend-icon="mdi-bookmark-check" color="primary">
                        {{ productData.category }}
                    </v-chip>
                    <v-rating readonly :length="5" :size="32" :model-value="productData.rating.rate"
                        active-color="primary" half-increments />
                </div>
                <p class="mt-3">{{ productData.description }}</p>
            </v-card-text>
            <v-card-actions class="d-flex align-start">
                <v-badge :content="productAmount" :dot="productAmount === 0">
                    <v-btn color="primary" height="40" @click="$emit('buy')">Купить</v-btn>
                </v-badge>
                <v-btn height="40" :to="`/product/${productData.id}`">Подробнее</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>