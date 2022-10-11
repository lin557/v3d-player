
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    lib: {
      // formats: ['es', 'umd'],
      entry: path.resolve(__dirname, './lib/index.js'),
      name: 'v3d-player',
      // the proper extensions will be added
      fileName: (format) => `v3d-player.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'flv.js', 'hls.js'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'flv.js': 'flvjs',
          'hls.js': 'Hls'
        },
      }
    }
  }
})
