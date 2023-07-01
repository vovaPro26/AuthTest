const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api",
    //"/api/login",
    //"/api/register",
    //"/api/login/{username}"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7220',
        secure: false
    });

    app.use(appProxy);
};
