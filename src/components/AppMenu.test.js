import { mount, DOMWrapper} from '@vue/test-utils'
import { describe, expect, it} from 'vitest'
import { createVuetify } from 'vuetify'
import { createTestingPinia } from '@pinia/testing'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AppMenu from './AppMenu.vue'


const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')


describe('Unit test for AppMenu', () => {
    function buildWrapper() { 
        return mount({
            template: '<v-layout><app-menu></app-menu></v-layout>'
        }, {
            props: {},
            global: {
                components: {
                    AppMenu,
                },
                plugins: [vuetify, createTestingPinia({
                    stubActions: false,
                    initialState: {
                        user: {
                            username: 'RGM'
                         },
                     },
                })],
            }

        })
    }

    it('Component exist', () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists()).toBe(true)
    })

    it('Outputs the label', () => {
        const wrapper = buildWrapper()
        const avatar = wrapper.find('[data-test="avatar"]')
        expect(avatar.html()).toContain('RG')
    })

    it('Menu close by default', () => {
        buildWrapper()
        const dom = new DOMWrapper(document.body);
        const menu = dom.find('[data-test="menu"]')
        expect(menu.exists()).toBe(false)
    })

    it('Menu opens by click', async () => {
        const wrapper = buildWrapper()
        const button = wrapper.find('[data-test="avatar"]')
        await button.trigger('click')
        const dom = new DOMWrapper(document.body);
        const menu = dom.find('[data-test="menu"]')
        expect(menu.exists()).toBe(true)
    })

    it('Menu have add item', async () => {
        const wrapper = buildWrapper()
        const button = wrapper.find('[data-test="avatar"]')
        await button.trigger('click')
        const dom = new DOMWrapper(document.body);
        const menu = dom.find('[data-test="menu"]')
        expect(menu.html()).toContain('Добавить товар')
    })

    it('Menu have logout', async () => {
        const wrapper = buildWrapper()
        const button = wrapper.find('[data-test="avatar"]')
        await button.trigger('click')
        const dom = new DOMWrapper(document.body);
        const menu = dom.find('[data-test="menu"]')
        expect(menu.html()).toContain('Выйти')
    })
})

