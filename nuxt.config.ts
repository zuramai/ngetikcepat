import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'
import presetIcon from '@unocss/preset-icons'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@unocss/nuxt',
        '@pinia/nuxt',
    ],
    postcss: {
        plugins: {
            'postcss-nesting': {}
        }
    },
    vue: {
        compilerOptions: {
          isCustomElement: tag => ['letter'].includes(tag)
        }
    },
    unocss: {
        // core options
        shortcuts: [],
        rules: [],
        presets: [
            presetIcon({
                autoInstall: true,
            }),
            presetUno(),
            presetWebFonts({
                fonts: {
                    sans: 'Oxygen'
                }
            })
        ]
    },
})
