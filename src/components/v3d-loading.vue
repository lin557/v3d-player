<template>
  <div class="v3d-loading">
    <div class="v3d-loading-dot"></div>
    <div class="v3d-loading-dot"></div>
    <div class="v3d-loading-dot"></div>
    <div class="v3d-loading-dot"></div>
    <div class="v3d-loading-dot"></div>
    <div class="v3d-loading-dot"></div>
  </div>
</template>
<style>
.v3d-loading {
  width: 30px;
  height: 30px;
  left: calc(50% - 15px);
  top: calc(50% - 15px);
  position: absolute;
  animation: v3d-loading 2.5s infinite linear both;
}

.v3d-loading-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: v3d-loading-dot 2s infinite ease-in-out both;
}

.v3d-loading-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #ccc;
  border-radius: 100%;
  animation: v3d-loading-dot-before 2s infinite ease-in-out both;
}

.v3d-loading-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.v3d-loading-dot:nth-child(2) {
  animation-delay: -1s;
}
.v3d-loading-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.v3d-loading-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.v3d-loading-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.v3d-loading-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.v3d-loading-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.v3d-loading-dot:nth-child(2):before {
  animation-delay: -1s;
}
.v3d-loading-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.v3d-loading-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.v3d-loading-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.v3d-loading-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes v3d-loading {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes v3d-loading-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes v3d-loading-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>
