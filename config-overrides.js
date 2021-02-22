const { override, fixBabelImports, addWebpackAlias, addDecoratorsLegacy, addWebpackModuleRule } = require('customize-cra')
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
    addDecoratorsLegacy(),
    addWebpackModuleRule({
        test: /\.md$/,
        use: 'raw-loader'
    })
)