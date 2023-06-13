<template>
  <div
    ref="barRef"
    class="v3d-bar-wrapper"
    @mousemove="handleMouseMove"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseover="handleMouseOver"
  >
    <div class="v3d-bar-time" ref="timeRef" :style="timeStyle">
      {{ timeText }}
    </div>
    <div class="v3d-bar-inner">
      <div class="v3d-bar-played" ref="played" :style="barWidth">
        <span class="v3d-bar-thumb" :style="thumbStyle"></span>
      </div>
    </div>
    <div class="v3d-bar-border"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { time2Str } from '../../utils/utils'

export interface PropsBar {
  position: number
  duration: number
  themeColor: string
}

const props = withDefaults(defineProps<PropsBar>(), {
  position: 0,
  duration: 100,
  themeColor: '#b7daff'
})

const emit = defineEmits<{
  (e: 'v3dposition', position: number): void
}>()

const barRef = ref<HTMLInputElement | null>(null)
const timeRef = ref<HTMLInputElement | null>(null)

const self = reactive({
  timeLeft: 0,
  timeMove: 0,
  tempWidth: 0,
  mouseDown: false
})

const thumbStyle = computed(() => {
  return 'background: ' + props.themeColor
})

const barWidth = computed(() => {
  if (props.duration === 0) {
    return 'display:none'
  }
  let cur = (props.position / props.duration) * 100
  if (cur < 0) {
    cur = 0
  }
  if (cur > 100) {
    cur = 100
  }
  let style = 'background:' + props.themeColor + ';'
  if (self.mouseDown) {
    return style + 'width:' + self.tempWidth + 'px'
  } else {
    return style + 'width:' + cur + '%'
  }
})

const timeStyle = computed(() => {
  return 'left:' + self.timeLeft + 'px'
})

const timeText = computed(() => {
  if (self.timeMove === 0 && props.position > 0) {
    updateTimeMove()
  }
  return time2Str(self.timeMove, props.duration)
})

const updateTimeMove = () => {
  self.timeMove = props.position
  self.timeLeft = 8000
}

const handleMouseMove = (e: MouseEvent) => {
  self.tempWidth = e.offsetX
  self.timeLeft = e.offsetX - (timeRef.value?.clientWidth || 0) / 2
  self.timeMove = px2second(e.offsetX)
}

const handleMouseDown = (e: MouseEvent) => {
  self.tempWidth = e.offsetX
  self.mouseDown = true
}

const handleMouseOver = () => {
  self.mouseDown = false
}

const handleClick = (e: MouseEvent) => {
  self.mouseDown = false
  self.timeMove = px2second(e.offsetX)
  emit('v3dposition', self.timeMove)
}

const getWidth = () => {
  return barRef.value?.clientWidth || 0
}

/**
 * 像素转秒
 */
const px2second = (offsetX: number) => {
  let width = getWidth()
  if (width === 0) {
    return 0
  }
  // 1像素多长时间
  let pxTime = props.duration / width
  return offsetX * pxTime
}
</script>

<style lang="scss">
.v3d-bar-wrapper {
  position: absolute;
  top: -10px;
  height: 13px;
  width: 100%;
  z-index: 5;
  cursor: pointer;
  //background-color: rgba(0, 255, 0, 0.62);

  .v3d-bar-border {
    border-top: 1px solid rgba(0, 0, 0, 0.62);
    pointer-events: none;
  }

  .v3d-bar-time {
    position: absolute;
    left: 0px;
    top: -22px;
    border-radius: 4px;
    padding: 5px 7px;
    background-color: rgba(0, 0, 0, 0.62);
    color: #fff;
    font-size: 12px;
    text-align: center;
    opacity: 1;
    transition: opacity 0.1s ease-in-out;
    word-wrap: normal;
    word-break: normal;
    z-index: 2;
    pointer-events: none;
    display: none;
    font-family: Verdana, Tahoma, sans-serif;
  }

  .v3d-bar-inner {
    margin-top: 7px;
    height: 3px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    pointer-events: none;

    .v3d-bar-played {
      height: 100%;
      width: 100px;
      // background-color: $barColor;
      z-index: 1;
      position: relative;

      .v3d-bar-thumb {
        width: 9px;
        height: 9px;
        z-index: 2;
        // background-color: $barColor;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 5px;
        position: absolute;
        right: -4px;
        top: -2px;
        transition: all 0.2s ease-in-out;
        transform: scale(0);
        pointer-events: none;
      }
    }
  }
}
.v3d-bar-wrapper:hover {
  height: 20px;
  .v3d-bar-inner {
    margin-top: 6px;
    height: 5px;

    .v3d-bar-played {
      .v3d-bar-thumb {
        top: -3px;
        transform: scale(1);
      }
    }
  }
  .v3d-bar-time {
    display: block;
  }
  .v3d-bar-border {
    display: none;
  }
}
</style>
