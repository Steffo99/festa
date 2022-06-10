const { i18n } = require("./next-i18next.config")


function fixCssLoaderLocalIdent(webpackConfig) {

    function innerFix(used) {

        if (used.loader?.match?.(/[/]css-loader/)) {

            let modules = used.loader.options?.modules

            if (modules) {
                let { getLocalIdent, ...modules } = modules

                modules.localIdentName = "[name]-[local]"

                used.loader.options.modules = modules
            }

        }

        return used
    }

    webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {

        if (rule.oneOf) {

            rule.oneOf = rule.oneOf.map(one => {

                if (one.use === undefined) {

                }
                else if (Array.isArray(one.use)) {
                    one.use = one.use.map(innerFix)
                }
                else {
                    one.use = innerFix(one.use)
                }

                return one
            })
        }

        return rule

    })

    return webpackConfig
}


function webpack(config) {
    config = fixCssLoaderLocalIdent(config)
    return config
}


/** 
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
    reactStrictMode: true,
    webpack,
    i18n,
}

module.exports = nextConfig
