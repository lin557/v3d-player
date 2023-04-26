<template>
  <span class="v3d-loading"></span>
</template>
<style>
.v3d-loading {
  left: calc(50% - 24px);
  top: calc(50% - 24px);
  position: absolute;
  width: 48px;
  height: 48px;
  border: 3px dotted #fff;
  background: #000;
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: v3d-rotation 2s linear infinite;
}
.v3d-loading::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px dotted #ff3d00;
  border-style: solid solid dotted;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  animation: v3d-rotation-back 1s linear infinite;
  transform-origin: center center;
}

@keyframes v3d-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes v3d-rotation-back {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
