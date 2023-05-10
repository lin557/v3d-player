<template>
  <span class="v3d-loading"></span>
</template>
<style>
.v3d-loading {
  left: calc(50% - 36px);
  top: calc(50% - 36px);
  position: absolute;
  width: 72px;
  height: 72px;
  border: 5px solid #aaa;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: v3d-rotation 1s linear infinite;
}

@keyframes v3d-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
