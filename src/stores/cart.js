import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore("cart", () => {
    const shopCart = ref({})
    

    function addProductToCart(product) {
        if (shopCart.value.hasOwnProperty(product.id)) {
            shopCart.value[product.id].amount += 1
        } else {
            shopCart.value[product.id] = {
                amount: 1,
                title: product.title,
                price: product.price,
            }
        }
    }

    function getAmountCart(productId) {
        return shopCart.value.hasOwnProperty(productId) ? shopCart.value[productId].amount : 0
    }

    function clearCart() {
        for (let member in shopCart.value) delete (shopCart.value[member])
    }

    const productAmmount = computed(() => {
        return Object.entries(shopCart.value).reduce((accumulator, currentValue) => accumulator + currentValue[1].amount, 0)
    })

    const cartToArray = computed(() => { 
        return Object.entries(shopCart.value).map((el) => el[1])
    })

    const totalCost = computed(() => {
    return Object.entries(shopCart.value).reduce((accumulator, currentValue) => accumulator + currentValue[1].amount * currentValue[1].price, 0).toFixed(2)
    })

    return {addProductToCart, getAmountCart, clearCart, productAmmount, cartToArray, totalCost}
 })