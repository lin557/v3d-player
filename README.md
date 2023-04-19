<p align="center">
  <a href="https://www.npmjs.org/package/v3d-player">
    <img src="https://img.shields.io/npm/v/v3d-player.svg">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

# v3d-player
Html5 Video Player: vue3 + typescript + dplayer-lite

**[Dplayer Docs](https://dplayer.diygod.dev/)**

## Supports

- Streaming formats
  - [HLS](https://github.com/video-dev/hls.js)
  - [FLV](https://github.com/Bilibili/flv.js)
  - MP4

- Media formats
  - AVC(H.264)
  - AAC
  - MP3

## Installation

``` bash
npm i v3d-player
```

or

``` bash
npm i v3d-player flv.js hls.js
```

## Usage

This is a vue 3.x component that can only be used in vue 3.x

### ES Modules

Install v3d-player via npm and `import` the plugin as you would any other module.
You will also need to import the stylesheet in some way.

``` js
<template>
  <div class="demo-player">
    <v3d-player
      ref="playerRef"
      :options="options"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import V3dPlayer from 'v3d-player'
import 'v3d-player/dist/style.css'

const options = reactive({
  autoplay: true,
  muted: true,
  screenshot: true,
  preventClickToggle: true,
  theme: '#FF3366',
  volume: 0.9,
  src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/gear3/prog_index.m3u8'
})
</script>

</script>
<style>
.demo-player {
  margin: 0 auto;
  margin-top: 50px;
  width: 640px;
  height: 480px;
}
</style>
```

## Methods

### pause()
  pause video

### play()
  play video

### close()
  close video

### seek(time: number)
  seek to specified time

### snapshot()
  video capture. format: .png

### speed(rate: number)
  set video speed

### toggle()
  toggle between play and pause

### volume(percentage: number, nonotice: boolean)

  get video volume

  ``` js
    let value = playerRef.value?.volume()
  ```

  set video volume

  ``` js
    playerRef.value?.volume(0.5, true)
  ```

## Events

### Example

``` js
<v3d-player
  @canplay="handleCanPlay"
  @loadstart="handleLoadStart"
/>

const handleCanPlay = () => {
  // console.log('canplay')
}

const handleLoadStart = () => {
  // console.log('loadstart')
}
```

### Event List

- Video events

  - abort
  - canplay
  - canplaythrough
  - durationchange
  - emptied
  - ended
  - error
  - loadeddata
  - loadedmetadata
  - loadstart
  - mozaudioavailable
  - pause
  - play
  - playing
  - progress
  - ratechange
  - seeked
  - seeking
  - stalled
  - suspend
  - timeupdate
  - volumechange
  - waiting

- Player events

  - screenshot
  - contextmenu_show
  - contextmenu_hide
  - notice_show
  - notice_hide
  - quality_start
  - quality_end
  - destroy
  - resize
  - fullscreen
  - fullscreen_cancel
  - webfullscreen
  - webfullscreen_cancel

## Project

setup

``` bash
npm i
```

dev

``` bash
npm run dev
```

build

``` bash
npm run build
```
