import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    base: '#2D2D2D',
                    googleblue: '#4285F4',
                    googlered: '#EA4335',
                    googlegreen: '#34A853',
                    googleyellow: '#FBBC05',
                    gs90: '#cccbcb'
                }
            }
        }
    }
})

export default vuetify