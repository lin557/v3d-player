<template>
  <div class="demo-player">
    <v3d-player ref="player" :fill="self.filled" :lock-control="self.lockControl" :poster="self.poster" />

    <div class="demo-control">
      <button @click="toggleScreen">fullScreen</button>
      <button @click="toggleFill">toggleFill</button>
      <button @click="toggleControl">toggleControl</button>
      <button @click="snapshot">snapshot</button>
    </div>
    <div class="demo-control">
      <input type="checkbox" class="demo-check" name="options-live" v-model="options.live"/>
      <label for="options-live">live</label>
      <input type="checkbox" class="demo-check" name="options-record" v-model="options.record"/>
      <label for="options-record">record</label>
    </div>
    <div class="demo-control">
      <input type="text" class="demo-url" v-model="options.src"/>
      <button @click="play">play</button>
      <button @click="close">close</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import V3dPlayer from './v3d-player.vue'

interface Data {
  lockControl: boolean
  poster: string
  filled: boolean
}

const _data: Data = {
  lockControl: true,
  filled: false,
  poster: 'http://192.168.0.250/media/movie/%E5%BD%B1/poster.webp'
}

const options = reactive({
  autoplay: true,
  muted: false,
  screenshot: true,
  // controls: true,
  preventClickToggle: true,
  theme: '#FF3366',
  volume: 0.6,
  connect: true,
  // hasAudio: false,
  live: false,
  // autoRate: {
  //   enabled: true,
  //   min: 3.0,
  //   max: 9.0
  // },
  title: 'ABC',
  record: true,
  // src: 'http://120.84.96.62:808/hls/1/index.m3u8?blog.ntnas.top'
  src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/gear3/prog_index.m3u8'
  // src: 'https://www.transcodexx.cn/test/h264.flv'
})

let self = reactive(_data)

const player = ref()

const close = () => {
  player.value.close()
}

const play = () => {
  player.value.play(options)
}

const snapshot = () => {
  player.value.snapshot()
}

const toggleControl = () => {
  self.lockControl = !self.lockControl
}

const toggleFill = () => {
  self.filled = !self.filled
}

const toggleScreen = () => {
  player.value.toggleScreen()
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
  font-size: 14px;

  .demo-control {
    margin-top: 10px;
    button {
      min-width: 60px;
      margin-right: 6px;
    }
    .demo-url {
      width: 480px;
      margin-right: 6px;
    }
    .demo-check {
      vertical-align: middle;
    }
    label {
      margin-right: 6px;
    }
  }
}
</style>
