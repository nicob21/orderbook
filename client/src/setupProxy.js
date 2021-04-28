const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = 3000;

module.exports = function (app) {
  app.use(
    createProxyMiddleware(`/api`, {
      target: `http://localhost:${PORT}`,
    })
  );
};
