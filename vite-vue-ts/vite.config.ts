import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import viteImagemin from "vite-plugin-imagemin";
import path from "path";
const isProduction = process.env.NODE_ENV === "production";
// 填入项目的 CDN 域名地址
const CDN_URL = "/";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      // optipng: {
      //   optimizationLevel: 7
      // },
      // 有损压缩配置，有损压缩下图片质量可能会变差

      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.5, 0.5],
        speed: 4,
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  // base: isProduction ? CDN_URL: '/',
  resolve: {
    // 别名配置
    alias: {
      "@assets": path.join(__dirname, "src/assets"),
    },
  },
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },

    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
  },
});
