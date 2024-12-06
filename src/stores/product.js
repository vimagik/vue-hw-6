import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
    const originalData = ref([]);
    const filteredData = ref([]);

    function getProducts() {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
                originalData.value = json;
                filteredData.value = json;
            });
    }

    function activateFilter(newStr, newRange) {
        if (!newStr) {
            filteredData.value = originalData.value.filter(
                (product) =>
                    product.price >= newRange[0] && product.price <= newRange[1]
            );
        } else {
            filteredData.value = originalData.value.filter(
                (product) =>
                    product.title.indexOf(newStr) > -1 &&
                    product.price >= newRange[0] &&
                    product.price <= newRange[1]
            );
        }
    }

    function getProductById(productId) {
        return originalData.value.find((el) => el.id === productId)
    }

    return {
        originalData, filteredData, getProducts,
        activateFilter, getProductById
    };
});
