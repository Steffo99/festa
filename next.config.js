const { i18n } = require("./next-i18next.config")


function fixCssLoaderLocalIdent(webpackConfig) {

    function innerFix(used) {

        if (used.loader?.match?.(/.*[/]css-loader.*/)) {

            if (used.options?.modules) {

                if (used.options.modules.getLocalIdent) {

                    used.options.modules.getLocalIdent = (context, localIdentName, localName) => `festa__${localName}`

                }

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
    experimental: {
        images: {
            allowFutureImage: true,
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "images.unsplash.com",
                    port: "",
                    pathname: "/photo-*"
                }
            ]
        }
    },
    reactStrictMode: true,
    webpack,
    i18n,
}

module.exports = nextConfig
