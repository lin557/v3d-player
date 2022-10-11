<template>
  <div class="demo-player">
    <v3d-player ref="player" :lock-control="true" />

    <div class="demo-control">
      <button @click="play">play</button>
      <button @click="close">close</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import V3dPlayer from './v3d-player.vue'

interface Data {
  poster: string
}

const _data: Data = {
  poster: 'http://192.168.0.250/media/movie/%E5%BD%B1/poster.webp', 
  // src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/gear3/prog_index.m3u8', 
}

const options = reactive({
  autoplay: true,
  muted: false,
  screenshot: true,
  // controls: true,
  preventClickToggle: true,
  theme: '#FF3366',
  volume: 0.6,
  // live: true,
  // autorate: {
  //   enabled: true,
  //   min: 3.0,
  //   max: 9.0
  // },
  // src: 'http://120.84.96.62:808/hls/1/index.m3u8?blog.ntnas.top'
  // src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/gear3/prog_index.m3u8'
  // src: 'https://www.transcodegroup.cn/test/h2641.mp4',
  src: 'https://www.transcodegroup.cn/test/h264.mp4',
  // src: 'https://www.transcodegroup.cn/test/h264.flv',
  // src: 'https://xn.transcodegroup.cn:8586/mdvr/live/11878_1.flv',
})

let self = reactive(_data)

const player = ref()

const close = () => {
  player.value.close()
}

const play = () => {
  player.value.play(options)
}

onMounted(() => {
  console.log(player.value)
})

</script>
<style lang="scss">
.demo-player {
  margin: 0 auto;
  margin-top: 50px;
  width: 640px;
  height: 480px;

  .demo-control {
    margin-top: 6px;
    button {
      min-width: 60px;
      margin-right: 6px;
    }
  }
}
</style>
