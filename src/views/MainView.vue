<script setup>
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { ref, watch, onMounted } from 'vue'

const productStore = useProductStore()
const { filteredData } = storeToRefs(productStore)

const cartStore = useCartStore()
const { addProductToCart } = cartStore

const searchStr = ref(null)
const minPrice = ref(0)
const maxPrice = ref(1000)
const rangePrice = ref([minPrice.value, maxPrice.value])
const dialog = ref(false)

watch([searchStr, () => rangePrice.value], ([newStr, newRange]) => {
  productStore.activateFilter(newStr, newRange)
})

function addPurchase(productId) {
  const product = productStore.getProductById(productId)
  addProductToCart(product)
  dialog.value = true
}

onMounted(() => {
  productStore.getProducts()
})
</script>

<template>
  <v-container fluid>
    <AppHeader v-model="searchStr" />
    <v-progress-linear v-if="!filteredData" class="mt-3" color="cyan" indeterminate></v-progress-linear>
    <v-row v-else class="mt-3">
      <v-col cols="2">
        <ProductCardSearch v-model="searchStr" v-model:range-price="rangePrice" :minPrice="minPrice"
          :maxPrice="maxPrice" />
      </v-col>
      <v-col>
        <v-row class="d-flex justify-center">
          <ProductCard class="mt-5" v-for="product in filteredData" :key="product.id" :product-data="product"
            :productAmount="cartStore.getAmountCart(product.id)" @buy="addPurchase(product.id)" />
        </v-row>
      </v-col>
    </v-row>
    <PurchaseConfirm v-model="dialog" />
  </v-container>
</template>
