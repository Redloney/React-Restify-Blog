const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8082',
            changeOrigin: true,
            // pathRewrite: {
            //     '^/api': ''
            // }
        }),
        createProxyMiddleware('/map', {
            target: 'https://apis.map.qq.com/ws/location/v1/ip',
            changeOrigin: true,
            pathRewrite: {
                '^/map': ''
            }
        })
    )
}