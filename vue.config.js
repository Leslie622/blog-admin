module.exports = {
  configureWebpack: {
    resolve: {
      //配置别名
      alias: {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "router": "@/router",
        "store": "@/store",
        "views": "@/views",
      }
    },
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://192.168.31.165:8080/land/',
    //       changeOrigin: true,
    //       ws: true,
    //       pathRewrite: {
    //         '^/api': ''
    //       },
    //     }
    //   },
    // }
  },
}

