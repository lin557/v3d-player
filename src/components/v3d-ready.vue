<template>
  <div class="v3d-ready">
    <svg
      class="v3d-ready-svg"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M512 12C236.31 12 12 236.31 12 512s224.31 500 500 500 500-224.31 500-500S787.69 12 512 12z m0 944.44C266.94 956.44 67.56 757.06 67.56 512S266.94 67.56 512 67.56 956.44 266.94 956.44 512 757.06 956.44 512 956.44z"
        p-id="1737"
      ></path>
      <path
        d="M749.63 488.89L416.3 266.67a27.78 27.78 0 0 0-43.19 23.11v444.44a27.78 27.78 0 0 0 43.19 23.11l333.33-222.22a27.78 27.78 0 0 0 0-46.22z m-321 193.44V341.67L684.15 512z"
      ></path>
    </svg>
  </div>
</template>
<style lang="scss">
.v3d-ready {
  position: absolute;
  left: calc(50% - 36px);
  top: calc(50% - 36px);

  .v3d-ready-svg {
    transition: fill 0.1s;
    fill: #aaa;
    width: 72px;
    height: 72px;
  }
}
</style>
