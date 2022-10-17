<template>
  <div class="v3d-chase">
    <div class="v3d-chase-dot"></div>
    <div class="v3d-chase-dot"></div>
    <div class="v3d-chase-dot"></div>
    <div class="v3d-chase-dot"></div>
    <div class="v3d-chase-dot"></div>
    <div class="v3d-chase-dot"></div>
  </div>
</template>
<style>
.v3d-chase {
  width: 30px;
  height: 30px;
  position: absolute;
  animation: v3d-chase 2.5s infinite linear both;
}

.v3d-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: v3d-chase-dot 2s infinite ease-in-out both;
}

.v3d-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #ccc;
  border-radius: 100%;
  animation: v3d-chase-dot-before 2s infinite ease-in-out both;
}

.v3d-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.v3d-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
.v3d-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.v3d-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.v3d-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.v3d-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.v3d-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.v3d-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}
.v3d-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.v3d-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.v3d-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.v3d-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes v3d-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes v3d-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes v3d-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>
