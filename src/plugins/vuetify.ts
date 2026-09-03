import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    base: '#2D2D2D',
                    ink: '#202124',
                    meta: '#5F6368',
                    googleblue: '#4285F4',
                    googlered: '#EA4335',
                    googlegreen: '#34A853',
                    googleyellow: '#FBBC05',
                    googlelink: '#1A73E8',
                    'grey-50': '#F8F9FA',
                    'grey-100': '#F1F3F4',
                    'grey-200': '#E8EAED',
                    'grey-300': '#DADCE0',
                    'grey-400': '#BDC1C6',
                    gs90: '#cccbcb'
                }
            }
        }
    }
})

export default vuetify