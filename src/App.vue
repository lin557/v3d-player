<template>
  <div class="demo-player">
    <v3d-player
      ref="player"
      :fill="self.filled"
      :lock-control="self.lockControl"
      :poster="self.poster"
    />

    <div class="demo-control">
      <button @click="toggleScreen">fullScreen</button>
      <button @click="toggleFill">toggleFill</button>
      <button @click="toggleControl">toggleControl</button>
      <button @click="toggleFocus">toggleFocus</button>
      <button @click="snapshot">snapshot</button>
      <button @click="occupy">occupy</button>
      <button @click="muted">muted</button>
    </div>
    <div class="demo-control">
      <input
        type="checkbox"
        class="demo-check"
        name="options-live"
        v-model="self.live"
      />
      <label for="options-live">live</label>
      <input
        type="checkbox"
        class="demo-check"
        name="options-record"
        v-model="self.record"
      />
      <label for="options-record">record</label>
      <input
        type="checkbox"
        class="demo-check"
        name="options-connect"
        v-model="self.connect"
      />
      <label for="options-connect">reconnect</label>
      <input
        type="checkbox"
        class="demo-check"
        name="options-audio"
        v-model="self.hasAudio"
      />
      <label for="options-audio">hasAudio(flv)</label>
    </div>
    <div class="demo-control">
      <input type="text" class="demo-url" v-model="self.src" />
      <button @click="play">play</button>
      <button @click="close">close</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import V3dPlayer from './components/v3d-player.vue'

interface Data {
  lockControl: boolean
  poster: string
  filled: boolean
  src: string
  live: boolean
  record: boolean
  connect: boolean
  hasAudio: boolean
}

const _data: Data = {
  lockControl: true,
  filled: false,
  poster: '',
  src: 'https://www.trans.cn/live/17000071029_2.flv',
  live: true,
  record: true,
  connect: true,
  hasAudio: true
}

let self = reactive(_data)

const player = ref()

const close = () => {
  player.value.close()
}

const muted = () => {
  player.value.muted()
}

const occupy = () => {
  player.value.occupy(1, '456', '?????????')
}

const play = () => {
  const options = {
    autoplay: true,
    muted: false,
    screenshot: true,
    // controls: true,
    preventClickToggle: true,
    theme: '#FF3366',
    volume: 0.6,
    connect: self.connect,
    hasAudio: self.hasAudio,
    live: self.live,
    // autoRate: {
    //   enabled: true,
    //   min: 3.0,
    //   max: 9.0
    // },
    title: 'ABC',
    record: self.record,
    // src: 'http://120.84.96.62:808/hls/1/index.m3u8?blog.ntnas.top'
    src: self.src
    // src: 'https://www.trans.cn/test/h264.flv',
    // unique: 'abcabc',
  }
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

const toggleFocus = () => {
  player.value.focused(!player.value.focused())
}

const toggleScreen = () => {
  player.value.toggleScreen()
}

onMounted(() => {
  player.value.el().classList.add('aaa')
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
