const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // Fix ResizeObserver loop completed with undelivered notifications.
  devServer: {
    client: {
      overlay: false,
    },
  },
});
