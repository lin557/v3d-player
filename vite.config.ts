import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// 增加对vue文件检测
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    eslintPlugin({
      include: [
        'src/**/*.js',
        'src/**/*.vue',
        'src/**/*.ts',
        'src/*.js',
        'src/*.vue',
        'src/*.ts'
      ]
    })
  ],
  build: {
    lib: {
      // formats: ['es', 'umd'],
      entry: './lib/index.js',
      name: 'v3d-player',
      // the proper extensions will be added
      fileName: format => `v3d-player.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'flv.js', 'hls.js'],
      output: {
        // 库构建模式下不能进行代码分割，开启此功能可将本应分割的代码整合在一起避免报错（代码分割可能由其他插件引起）
        inlineDynamicImports: true,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'flv.js': 'flvjs',
          'hls.js': 'Hls'
        }
      }
    }
  }
})
