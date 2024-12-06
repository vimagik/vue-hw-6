<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const route = useRoute()
const dataProduct = ref(null)
const error = ref(null)

onMounted(() => {
    fetch(`https://fakestoreapi.com/products/${route.params.id}`)
        .then((res) => res.json())
        .then((json) => {
            dataProduct.value = json
        })
        .catch((err) => (error.value = err))
})
</script>

<template>
    <v-container fluid>
        <AppHeader />
        <v-progress-linear v-if="!dataProduct" class="mt-3" color="cyan" indeterminate></v-progress-linear>
        <template v-else>
            <h1 class="text-h5 text-center">{{ dataProduct.title }}</h1>
            <v-row class="mt-3">
                <v-col cols="4">
                    <v-img :src="dataProduct.image"></v-img>
                </v-col>
                <v-col>
                    <div>{{ dataProduct.description }}</div>
                    <div class="d-flex align-center mt-3">
                        <v-chip color="primary">{{ dataProduct.category }}</v-chip>
                        <v-rating class="ml-3" readonly :length="5" :size="32" :model-value="dataProduct.rating.rate"
                            active-color="primary" half-increments />
                    </div>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>