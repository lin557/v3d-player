<template>
  <div class="demo-player">
    <v3d-player
      ref="player"
      lang="zh-cn"
      :allow-pause="self.allowPause"
      :border="self.border"
      :forward="self.forward"
      :fill="self.filled"
      :controls="self.controls"
      :screenshot="self.screenshot"
      :fullscreen="self.fullscreen"
      :poster="self.poster"
      :alarm="self.alarm"
      @timeout="handleError"
      @position="handlePosition"
      @forward="handleForward"
      @close="handleClose"
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
      <button @click="errorMsg">error</button>
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
      <input
        type="text"
        class="demo-alarm"
        placeholder="alarm"
        v-model="self.alarm"
      />
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
        name="options-pause"
        v-model="self.allowPause"
      />
      <label for="options-pause">allowPause</label>
      <input
        type="checkbox"
        class="demo-check"
        name="options-screenshot"
        v-model="self.screenshot"
      />
      <label for="options-screenshot">screenshot</label>
      <input
        type="checkbox"
        class="demo-check"
        name="options-fullscreen"
        v-model="self.fullscreen"
      />
      <label for="options-fullscreen">fullscreen</label>
      <input
        type="checkbox"
        class="demo-check"
        name="options-forward"
        v-model="self.forward"
      />
      <label for="options-fullscreen">forward</label>
    </div>
    <div class="demo-control">
      <input type="text" class="demo-url" v-model="self.src" />
      <button @click="play">play</button>
      <button @click="close">close</button>
    </div>
    <!-- <div class="demo-control demo-flv">
      <div><button @click="create">create</button></div>
      <video ref="videoRef" controls></video>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import V3dPlayer from './components/v3d-player.vue'
import { V3dPlayerEvents, V3dPlayerOptions } from '../d.ts'

const _data = {
  allowPause: true,
  controls: 'auto',
  filled: false,
  poster: '',
  border: false,
  src: 'https://dno-xiu-hd.youku.com/lfgame/cmcu_alias_1891330092_8063939.flv?auth_key=1718194311-0-0-8d16158fcc3e0c60e1d08550dce02931',
  //src: 'https://dno-xiu-hd.youku.com/lfgame/cmcu_alias_1083973850_8151419.flv?auth_key=1718161205-0-0-65ba80dcc2159dde59f49c936ef46c81',
  // src: 'https://dno-xiu-hd.youku.com/lfgame/cmcu_alias_1800902400_8142744.flv?auth_key=1718193060-0-0-ecf09a39f02193d81c5f13fc0991fd08',
  //src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/gear3/prog_index.m3u8',
  live: true,
  record: true,
  connect: true,
  hasAudio: true,
  screenshot: true,
  fullscreen: true,
  forward: true,
  alarm: ''
}

let self = reactive(_data)

const player = ref()

const close = () => {
  player.value.close()
}

const errorMsg = () => {
  player.value.error('这是一个错误提示测试')
}

const handleError = (e: V3dPlayerEvents) => {
  console.log(e)
}

const handlePosition = (position: number) => {
  console.log(position)
}

const handleForward = (rate: number) => {
  console.log('forward: ' + rate)
}

const handleClose = (opts: V3dPlayerOptions) => {
  console.log(opts)
}

const muted = () => {
  player.value.muted()
}

const occupy = () => {
  player.value.occupy(1, '456', '占用中')

  console.log(player.value.userData())
}

const play = () => {
  const options = {
    autoplay: true,
    muted: false,
    closeTime: 0,
    // controls: true,
    preventClickToggle: true,
    // theme: '#FF3366',
    theme: '#b7daff',
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
    },
    // 开始时间
    startTime: 120,
    // 针对http-flv显示时长
    duration: 0
  }
  player.value.play(options)
}

const snapshot = () => {
  player.value.snapshot()
}

const toggleControl = () => {
  if (self.controls === 'none') {
    self.controls = 'auto'
  } else {
    self.controls = 'none'
  }
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
