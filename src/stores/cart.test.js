import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, it } from "vitest";
import { useCartStore } from "./cart";


describe('Tests for cart store', () => {
    beforeEach(() => { 
        setActivePinia(createPinia())
    })

    it('Add product to cart', () => { 
        const cart = useCartStore()
        expect(cart.cartToArray).toStrictEqual([])
        const product = {
            id: 1,
            title: 'test',
            price: 100
        }
        cart.addProductToCart(product)
        expect(cart.cartToArray.length).toBe(1)
    })

    it('Test for getamounChart', () => {
        const cart = useCartStore()
        expect(cart.getAmountCart(1)).toBe(0)
        const product = {
            id: 1,
            title: 'test',
            price: 100
        }
        cart.addProductToCart(product)
        expect(cart.getAmountCart(1)).toBe(1)
        cart.addProductToCart(product)
        expect(cart.getAmountCart(1)).toBe(2)
    })

    it('Clear cart func', () => {
        const cart = useCartStore()
        expect(cart.getAmountCart(1)).toBe(0)
        const product = {
            id: 1,
            title: 'test',
            price: 100
        }
        cart.addProductToCart(product)
        expect(cart.getAmountCart(1)).toBe(1)
        cart.clearCart()
        expect(cart.getAmountCart(1)).toBe(0)
    })

    it('Product Amount', () => {
        const cart = useCartStore()
        expect(cart.productAmmount).toBe(0)
        const product = {
            id: 1,
            title: 'test',
            price: 100,
        }
        cart.addProductToCart(product)
        expect(cart.productAmmount).toBe(1)
        cart.addProductToCart(product)
        expect(cart.productAmmount).toBe(2)
    })

    it('Calc total cost', () => {
        const cart = useCartStore()
        expect(cart.totalCost).toBe("0.00")
        const product = {
            id: 1,
            title: 'test',
            price: 100.1,
        }
        cart.addProductToCart(product)
        expect(cart.totalCost).toBe("100.10")
        cart.addProductToCart(product)
        expect(cart.totalCost).toBe("200.20")
    })
})