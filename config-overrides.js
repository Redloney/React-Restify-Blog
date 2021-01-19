const { override, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra')
const path = require("path");

module.exports = override(
    addWebpackAlias({
        '@': path.join(__dirname, './src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    addDecoratorsLegacy()
)