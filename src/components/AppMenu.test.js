import { mount } from '@vue/test-utils'
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
    it('Have acronim', () => {
        const wrapper = mount({
            template: '<v-layout><app-menu></app-menu></v-layout>'
        }, {
            props: {},
            global: {
                components: {
                    AppMenu,
                },
                plugins: [vuetify, createTestingPinia({
                    initialState: {
                        user: { username: 'RGM' },
                    },
                })],
            }
        })
        expect(wrapper.html()).toContain('RG')
    })
})

