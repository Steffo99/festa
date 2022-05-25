const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "it-IT",
    locales: [
      "it-IT",
    ],
    localePath: path.resolve('./public/locales'),
  }
}

module.exports = nextConfig
