<template>
  <div class="demo-player">
    <v3d-player
      ref="player"
      :border="self.border"
      :fill="self.filled"
      :lock-control="self.lockControl"
      :poster="self.poster"
    >
    </v3d-player>

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
        name="options-border"
        v-model="self.border"
      />
      <label for="options-border">border</label>
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
      <input
        type="checkbox"
        class="demo-check"
        name="options-screenshot"
        v-model="self.screenshot"
      />
      <label for="options-screenshot">screenshot</label>
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
  border: boolean
  live: boolean
  record: boolean
  connect: boolean
  hasAudio: boolean
  screenshot: boolean
}

const _data: Data = {
  lockControl: true,
  filled: false,
  poster: '',
  border: false,
  src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/gear3/prog_index.m3u8',
  live: true,
  record: true,
  connect: true,
  hasAudio: true,
  screenshot: true
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
  player.value.occupy(1, '456', '占用中')
}

const play = () => {
  const options = {
    allowPause: true,
    autoplay: true,
    muted: false,
    screenshot: self.screenshot,
    closeTime: 0,
    // controls: true,
    preventClickToggle: true,
    theme: '#FF3366',
    volume: 0.6,
    connect: self.connect,
    hasAudio: self.hasAudio,
    live: self.live,
    debug: false,
    // autoRate: {
    //   enabled: true,
    //   min: 3.0,
    //   max: 9.0
    // },
    title: '粤-AB123 CH1',
    record: self.record,
    // src: 'http://120.84.96.62:808/hls/1/index.m3u8?blog.ntnas.top'
    src: self.src,
    // src: 'https://www.trans.cn/test/h264.flv',
    // unique: 'abcabc',
    contextmenu: [
      {
        text: 'custom1',
        link: 'https://github.com/DIYgod/DPlayer'
      },
      {
        text: 'custom2',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        click: (player: any) => {
          console.log(player.options)
        }
      }
    ],
    userData: {
      test1: '1',
      test2: '2'
    }
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
  max-width: 640px;
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
