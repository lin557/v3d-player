<template>
  <div class="v3d-player" :class="fillCls" ref="refPlayer">
    <div class="v3d-shade" :class="statusCls" :style="posterImg">
      <template v-if="isReady">
        <template v-if="isCustomEmpty">
          <div class="v3d-custom" v-html="props.custom.empty"></div>
        </template>
        <template v-else>
          <div class="v3d-center">
            <svg
              class="svg-center"
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
      </template>
      <template v-if="isLoading">
        <template v-if="isCustomLoading">
          <div class="v3d-custom" v-html="props.custom.loading"></div>
        </template>
        <template v-else>
          <V3dLoading />
        </template>
      </template>

      <div class="v3d-error" v-if="isError">
        <div class="v3d-error-svg">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M512 1021.72444445c-281.07603513 0-509.72444445-228.64840931-509.72444445-509.72444445S230.92396487 2.27555555 512 2.27555555 1021.72444445 230.92396487 1021.72444445 512 793.07603513 1021.72444445 512 1021.72444445zM512 75.42018617c-240.73610126 0-436.57981383 195.84371143-436.57981383 436.57981383 0 240.69891527 195.84371143 436.57981383 436.57981383 436.57981383 240.69891527 0 436.57981383-195.87894158 436.57981383-436.57981383C948.57981383 271.26389874 752.69891527 75.42018617 512 75.42018617z"
            ></path>
            <path
              d="M563.26308978 513.56576313l157.43162481-155.72102827c14.30911886-14.12709945 14.41872213-37.17317746 0.29162383-51.48229632s-37.21036345-14.41872213-51.48229632-0.29162382l-157.65083136 155.90304768-155.24738503-155.72102827c-14.23670272-14.23670272-37.2455936-14.30911886-51.48229632-0.07241614-14.23670272 14.19951559-14.27193173 37.2455936-0.07241614 51.48229632l155.02817848 155.50182172-156.30427477 154.62890838c-14.30911886 14.16232846-14.41872213 37.17317746-0.29162382 51.48229632 7.13596587 7.20838315 16.49335865 10.81355264 25.88598158 10.81355264 9.24778951 0 18.49557902-3.53079637 25.59631474-10.52192882l156.52152433-154.81092778 157.79566479 158.30649514c7.10073685 7.13596587 16.42094251 10.70394937 25.77833529 10.70394937 9.32020565 0 18.60518229-3.5679835 25.70396103-10.63153209 14.23670272-14.19951559 14.27193173-37.21036345 0.07241614-51.48229632L563.26308978 513.56576313z"
            ></path>
          </svg>
        </div>
        <div class="v3d-error-text">
          {{ self.hint }}
        </div>
      </div>
    </div>
    <div class="v3d-video" ref="refVideo"></div>
    <div class="v3d-footer" ref="refFooter">
      <button
        class="v3d-control v3d-button"
        type="button"
        title="Pause"
        aria-disabled="false"
        v-if="self.allowPause"
        @click="toggle()"
      >
        <svg
          v-if="!self.paused"
          class="svg-footer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M874.058005 149.941995a510.06838 510.06838 0 1 0 109.740156 162.738976 511.396369 511.396369 0 0 0-109.740156-162.738976z m66.278708 362.178731A428.336713 428.336713 0 1 1 512 83.663287a428.698892 428.698892 0 0 1 428.336713 428.336713z"
          ></path>
          <path
            d="M417.954256 281.533601a41.046923 41.046923 0 0 0-41.77128 40.201839v385.116718a41.892007 41.892007 0 0 0 83.663287 0v-385.116718a41.167649 41.167649 0 0 0-41.892007-40.201839zM606.045744 281.533601a41.046923 41.046923 0 0 0-41.77128 40.201839v385.116718a41.892007 41.892007 0 0 0 83.663287 0v-385.116718a41.167649 41.167649 0 0 0-41.892007-40.201839z"
          ></path>
        </svg>
        <svg
          v-if="self.paused"
          class="svg-footer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M400.43759 732.273456a71.33239 71.33239 0 0 0 34.157473 8.810938 75.556813 75.556813 0 0 0 41.157944-12.069778l219.790665-144.837341a85.574729 85.574729 0 0 0 38.502593-72.418671 83.402169 83.402169 0 0 0-37.295615-70.608203l-221.842527-144.837341a72.41867 72.41867 0 0 0-74.591231-3.741631 84.488449 84.488449 0 0 0-41.761433 75.436115v289.674681a84.488449 84.488449 0 0 0 41.882131 74.591231z m42.002829-82.315889V374.163131l207.600188 135.664309v0.965582a13.156058 13.156058 0 0 1 0 2.293258z"
            fill="#4D4D4D"
            p-id="1454"
          ></path>
          <path
            d="M149.989688 874.093352a509.948138 509.948138 0 1 0-109.714286-162.700613 513.206978 513.206978 0 0 0 109.714286 162.700613zM84.571489 512a428.11504 428.11504 0 1 1 427.511551 428.11504A428.597831 428.597831 0 0 1 84.571489 512z"
            fill="#4D4D4D"
            p-id="1455"
          ></path>
        </svg>
      </button>
      <button
        class="v3d-control v3d-button"
        type="button"
        title="Muted"
        aria-disabled="false"
        @click="toggleMuted()"
      >
        <svg
          v-if="!self.muted"
          class="svg-footer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M849.27252859 201.31809659a42.88603022 42.88603022 0 0 0-32.59323734-5.87032651 42.89938015 42.89938015 0 0 0-27.05544533 19.10859851c-12.97370075 20.33193718-7.3849363 47.30971022 12.60233008 60.82226252 4.66640592 3.16757333 115.89313422 80.12504178 115.89313422 271.48288 0 191.84814459-106.68896711 268.85415822-110.9075437 271.75230578-20.06979318 13.67275141-25.43524978 40.927232-12.05255585 61.18392414a43.18458311 43.18458311 0 0 0 27.557888 18.63042845 43.18094222 43.18094222 0 0 0 32.62843258-6.47956859c6.12033422-4.08143645 149.61261985-103.92917333 149.61261986-345.13442134 0-241.57419141-149.29707615-341.37459675-155.68562252-345.49608296M714.11787852 330.760192a42.91030282 42.91030282 0 0 0-32.9197037-1.56315497 42.93578903 42.93578903 0 0 0-24.32235141 22.23248119c-10.28429748 21.73003852-1.53524148 47.70535348 19.80764918 58.78336475 2.76586192 1.44664652 67.80063289 35.71226548 67.80063289 133.42644148 0 104.33573925-60.82226252 138.9156883-62.81504237 140.04921837-21.5492077 11.09378845-30.20845511 37.42833778-19.44598756 59.1425991a43.42730903 43.42730903 0 0 0 58.28456297 19.76517216c4.53776118-2.35808237 110.77040355-58.14620918 110.77040356-218.90844445 0-155.23051141-112.40030815-210.65819022-117.15894993-212.96894104M516.60693808 862.43919645l-90.65206519-82.39331556-148.38321304-134.92648771a45.39460267 45.39460267 0 0 0-30.54705777-11.7843437l-138.32829156 0.04126341-0.44904297-291.06115319h182.10512593a45.41766163 45.41766163 0 0 0 38.83736177-11.010048l96.72385423-87.97358459 90.64356977-82.39331556v701.5009849h0.04975883z m53.837824-823.197696c-11.10107022-4.88850015-40.38109867-13.09749097-72.51072949 16.13520592l-71.98037334 65.44861866-143.94132858 130.84626489H108.24726755c-49.88867318 0.20024889-90.2224403 40.71241955-90.1945268 90.60109275v291.10363022c0 49.95299555 40.46969363 90.60352 90.1945268 90.60352h121.28043615L425.95365925 902.5496557l72.0689683 65.49109571c18.17531733 16.50172208 35.39550815 21.12079645 48.95053748 21.12079644 10.46270103 0 18.80397748-2.76586192 23.60995082-4.89578193 11.05859318-4.88971378 36.70744178-20.93511111 36.70744178-64.31023407v-816.57856c0-29.95844741-13.7746963-53.89243733-36.84579555-64.1354714z m0 0"
          ></path>
        </svg>
        <svg
          v-if="self.muted"
          class="svg-footer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M516.55839289 644.67399111v217.71423289L425.95365925 780.04102637 277.57165985 645.11696592a45.46256592 45.46256592 0 0 0-30.54584415-11.78919822l-138.33071881 0.04369067-0.44782934-291.05993955h105.94865304l-90.64235614-90.64235615h-15.3062969c-49.88867318 0.19903525-90.2224403 40.72091497-90.1945268 90.59866548v291.10363022c0 49.96634548 40.47212089 90.59866548 90.1945268 90.59866548h121.27679527L425.95365925 902.55572385l72.06775467 65.49352297c18.17653097 16.50050845 35.39550815 21.10137837 48.94811023 21.10137836 10.46270103 0 18.80640475-2.74280297 23.61116444-4.88850015 11.05980682-4.88850015 36.70622815-20.92418845 36.70622816-64.2993114V735.40494222l-90.72852386-90.73095111zM918.12173748 546.86636563c0 88.342528-22.64996978 152.06536533-47.47233659 195.68442785l63.29806696 63.30413511c36.10912237-55.672832 71.01189689-140.10019082 71.0118969-259.03225362 0-241.58025955-149.30071703-341.37945125-155.68804978-345.49365572a42.860544 42.860544 0 0 0-32.59687822-5.88367643 42.958848 42.958848 0 0 0-27.05059083 19.11102577c-12.97248711 20.32708267-7.38736355 47.31213748 12.60233008 60.82590341 4.66640592 3.16150518 115.89556148 80.11290548 115.89556148 271.48409363z"
            p-id="1645"
          ></path>
          <path
            d="M676.68589985 410.21652385c2.7646483 1.43815111 67.79941925 35.70012918 67.79941926 133.42037333 0 25.19373748-3.65545245 46.11792592-9.05731793 63.67914667l66.28359585 66.289664c16.6667757-32.5592557 29.56765867-74.65035852 29.56765867-129.92512 0-155.22929778-112.40152178-210.65819022-117.15652267-212.95801837v0.04369067a42.94185718 42.94185718 0 0 0-32.92334458-1.57043674 42.90059378 42.90059378 0 0 0-24.31992415 22.22884029c-10.28551111 21.74338845-1.53766875 47.710208 19.80643555 58.79186015zM397.38239052 269.27650133l28.53364623-25.94497422 90.64235614-82.39210193V388.4525037l90.73095111 90.73095112V103.38668089c0-29.9705837-13.7746963-53.90336-36.84458192-64.14396681-11.09864297-4.88850015-40.38352592-13.09385008-72.51072949 16.14612859l-71.9791597 65.42677333-92.72737186 84.29385955 64.15488949 64.16702578zM897.04341808 942.34821215c-11.59016297 0-23.18032592-4.42368-32.02768593-13.27104l-770.0844089-770.0844089c-17.69472-17.69472-17.69472-46.36065185 0-64.05537184 17.69472-17.69472 46.36065185-17.69472 64.05537186 0l770.08440889 770.08319526c17.69472 17.69472 17.69472 46.36065185 0 64.05537185-8.84736 8.84857363-20.43752297 13.27225363-32.02768592 13.27225363z"
          ></path>
        </svg>
      </button>
      <div class="v3d-control v3d-control-text v3d-control-info">
        {{ titleText }}
      </div>
      <div class="v3d-control v3d-control-text v3d-control-speed">
        {{ kbs }}
      </div>
      <button
        v-if="vIfRecord"
        :class="btnRecCls"
        type="button"
        title="Record"
        aria-disabled="false"
        @click="toggleRecord()"
      >
        <svg
          class="svg-footer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M512 512m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z"
          ></path>
        </svg>
      </button>
      <button
        v-if="vIfScreen"
        class="v3d-control v3d-button"
        type="button"
        title="Fullscreen"
        aria-disabled="false"
        @click="toggleScreen()"
      >
        <svg
          class="svg-footer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M56.88888853 694.0444448v136.53333333a136.53333333 136.53333333 0 0 0 136.53333334 136.53333334h136.53333333a45.51111147 45.51111147 0 0 0 0-91.02222294H193.42222187a45.51111147 45.51111147 0 0 1-45.5111104-45.5111104v-136.53333333a45.51111147 45.51111147 0 0 0-91.02222294 0z m637.15555627 273.06666667h136.53333333a136.53333333 136.53333333 0 0 0 136.53333334-136.53333334v-136.53333333a45.51111147 45.51111147 0 0 0-91.02222294 0v136.53333333a45.51111147 45.51111147 0 0 1-45.5111104 45.5111104h-136.53333333a45.51111147 45.51111147 0 0 0 0 91.02222294z m273.06666667-637.15555627V193.42222187a136.53333333 136.53333333 0 0 0-136.53333334-136.53333334h-136.53333333a45.51111147 45.51111147 0 0 0 0 91.02222294h136.53333333a45.51111147 45.51111147 0 0 1 45.5111104 45.5111104v136.53333333a45.51111147 45.51111147 0 0 0 91.02222294 0zM329.9555552 56.88888853H193.42222187a136.53333333 136.53333333 0 0 0-136.53333334 136.53333334v136.53333333a45.51111147 45.51111147 0 0 0 91.02222294 0V193.42222187a45.51111147 45.51111147 0 0 1 45.5111104-45.5111104h136.53333333a45.51111147 45.51111147 0 0 0 0-91.02222294z"
          ></path>
        </svg>
      </button>
      <button
        class="v3d-control v3d-button"
        type="button"
        title="Close"
        aria-disabled="false"
        @click="close()"
      >
        <svg
          class="svg-footer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M512 1021.72444445c-281.07603513 0-509.72444445-228.64840931-509.72444445-509.72444445S230.92396487 2.27555555 512 2.27555555 1021.72444445 230.92396487 1021.72444445 512 793.07603513 1021.72444445 512 1021.72444445zM512 75.42018617c-240.73610126 0-436.57981383 195.84371143-436.57981383 436.57981383 0 240.69891527 195.84371143 436.57981383 436.57981383 436.57981383 240.69891527 0 436.57981383-195.87894158 436.57981383-436.57981383C948.57981383 271.26389874 752.69891527 75.42018617 512 75.42018617z"
          ></path>
          <path
            d="M563.26308978 513.56576313l157.43162481-155.72102827c14.30911886-14.12709945 14.41872213-37.17317746 0.29162383-51.48229632s-37.21036345-14.41872213-51.48229632-0.29162382l-157.65083136 155.90304768-155.24738503-155.72102827c-14.23670272-14.23670272-37.2455936-14.30911886-51.48229632-0.07241614-14.23670272 14.19951559-14.27193173 37.2455936-0.07241614 51.48229632l155.02817848 155.50182172-156.30427477 154.62890838c-14.30911886 14.16232846-14.41872213 37.17317746-0.29162382 51.48229632 7.13596587 7.20838315 16.49335865 10.81355264 25.88598158 10.81355264 9.24778951 0 18.49557902-3.53079637 25.59631474-10.52192882l156.52152433-154.81092778 157.79566479 158.30649514c7.10073685 7.13596587 16.42094251 10.70394937 25.77833529 10.70394937 9.32020565 0 18.60518229-3.5679835 25.70396103-10.63153209 14.23670272-14.19951559 14.27193173-37.21036345 0.07241614-51.48229632L563.26308978 513.56576313z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup name="V3dPlayer">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Dplayer from 'dplayer-lite'
import { DPlayerEvents, DPlayerOptions } from 'dplayer-lite'
import flvjs from 'flv.js'
// 这是hls的bug 在vite4时会出现错误
import Hls from 'hls.js'
// import Hls from 'hls.js/dist/hls.min.js'
// import { Events, FragLoadedData, FragBufferedData } from 'hls.js'
import V3dLoading from './v3d-loading.vue'
import Fetcher from '../utils/fetcher'
import { V3dPlayerEvents, V3dPlayerOptions } from '../../d.ts'
import { merge } from '../utils/utils'

// 获取视频容器
const refPlayer = ref()
const refVideo = ref()
const refFooter = ref<HTMLDivElement>()

const emits = defineEmits([
  // 视频事件
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'mozaudioavailable',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
  // 播放器事件
  'ready',
  'screenshot',
  'contextmenu_show',
  'contextmenu_hide',
  'fetch_start',
  'fetch_stop',
  'notice_show',
  'notice_hide',
  'quality_start',
  'quality_end',
  'destroy',
  'resize',
  'fullscreen',
  'fullscreen_cancel'
])

const props = defineProps({
  border: {
    type: Boolean,
    default: false
  },
  fill: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: 0
  },
  /**
   * 锁定控制栏
   */
  lockControl: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    default() {
      return {
        allowPause: false,
        autoplay: false,
        controls: true,
        contextmenu: [],
        hotkey: true,
        live: false,
        logo: undefined,
        loop: false,
        muted: false,
        mutex: false,
        preload: 'auto',
        screenshot: false,
        src: undefined,
        theme: '#b7daff',
        volume: 0.7
      }
    }
  },
  poster: {
    type: String,
    default: ''
  },
  custom: {
    type: Object,
    default() {
      return {
        empty: '',
        loading: ''
      }
    }
  }
})

interface MediaErrorX {
  code: number
  message: string
}

interface Data {
  allowPause: boolean
  // 当http-flv头有音视频 但http-flv没有音频流时 自动重置播放器
  autoAudio: boolean
  error: MediaErrorX | undefined
  fetcher: Fetcher | undefined
  flv: flvjs.Player | undefined
  focused: boolean
  // 提示文本
  hint: string
  hls: Hls | undefined
  // last Decoded Count
  lastCount: number
  // last Decoded Frame
  lastFrame: number
  lastOptions: V3dPlayerOptions | undefined
  muted: boolean
  // 创建时间(或占用时间)
  order: number
  // 手动暂停
  paused: boolean
  player: Dplayer | undefined
  progress: number
  // 播放速率 1.0
  rate: number
  // 加载flv时用于显示加载网速
  speed: string
  // 0=空闲 1=占用中 2=请求中 3=播放中/缓冲中 4=错误
  status: number
  // 定时器句柄
  timerConnect: number
  // 定时关闭的定时器句柄
  timerClose: number
  // 标题
  title: string | undefined
  // 唯一标识
  unique: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: any | undefined
}

// 超过5个process 都没有收到音频流 自动重载播放器
const ERR_MAX_AUDIO_COUNT = 10

let _data: Data = {
  allowPause: false,
  autoAudio: true,
  error: undefined,
  fetcher: undefined,
  flv: undefined,
  focused: false,
  hint: '',
  hls: undefined,
  lastCount: 0,
  lastFrame: 0,
  lastOptions: undefined,
  muted: false,
  order: 0,
  paused: false,
  player: undefined,
  progress: 0,
  rate: 1.0,
  speed: '',
  status: 0,
  timerConnect: 0,
  timerClose: 0,
  title: '',
  unique: '',
  userData: undefined
}

let self = reactive(_data)

const defaultOption = {
  airplay: true,
  allowPause: false,
  autoplay: false,
  autoRate: {
    enabled: false,
    // 小于3秒 正常速度播放
    min: 3.0,
    // 大于9秒 1.5倍速播放
    max: 9.0
  },
  chromecast: false,
  connect: false,
  contextmenu: [],
  controls: true,
  hasAudio: true,
  hotkey: true,
  lang: navigator.language.toLowerCase(),
  live: false,
  loop: false,
  muted: false,
  mutex: false,
  order: 0,
  playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
  pluginOptions: { hls: {}, flv: {}, dash: {}, webtorrent: {} },
  preload: 'auto',
  preventClickToggle: false,
  record: false,
  // 重试计数 达到5次不再试
  replay: 0,
  screenshot: false,
  theme: '#b7daff',
  title: '',
  video: {},
  volume: 0.7,
  unique: ''
}

const btnRecCls = computed(() => {
  let cls = ''
  if (self.lastOptions && self.lastOptions.record) {
    if (self.fetcher && self.fetcher.fetching) {
      cls = 'v3d-fetching'
    }
  } else {
    cls = 'v3d-hidden'
  }
  return 'v3d-control v3d-button v3d-record ' + cls
})

const fillCls = computed(() => {
  let cls = ''
  if (props.lockControl) {
    if (self.status > 0) {
      // 开始播放或占用时才显示控制栏
      cls = 'v3d-footer-show'
    }
  }
  if (props.border) {
    cls = cls + ' v3d-border'
  }
  if (props.fill) {
    cls = cls + ' v3d-fill'
  }
  if (self.focused) {
    cls = cls + ' v3d-focus'
  }
  return cls
})

const isReady = computed(() => {
  return self.status === 0
})

const isLoading = computed(() => {
  return self.status > 0 && self.status < 3
})

const isCustomEmpty = computed(() => {
  return props.custom.empty && props.custom.empty !== ''
})

const isCustomLoading = computed(() => {
  return props.custom.loading && props.custom.loading !== ''
})

const isError = computed(() => {
  return self.status === 4
})

const kbs = computed(() => {
  if (self.speed === '') {
    return ''
  } else {
    return self.speed + ' kb/s'
  }
})

const posterImg = computed(() => {
  if (props.poster === '') {
    return ''
  }
  return 'background-image: url(' + props.poster + ');'
})

const statusCls = computed(() => {
  switch (self.status) {
    case 0:
      return ''
    case 1:
    case 2:
      return 'v3d-loading'
    case 4:
      return 'vvp-error'
    default:
      return 'v3d-hidden'
  }
})

const vIfRecord = computed(() => {
  if (self.lastOptions && self.lastOptions.record) {
    return self.lastOptions.record
  }
  return false
})

const vIfScreen = computed(() => {
  return self.status > 2
})

const titleText = computed(() => {
  if (self.title) {
    return self.title
  }
  return ''
})

const bufferedEnd = () => {
  let ret = 0
  if (self.player) {
    if (self.player.video.buffered.length > 0) {
      ret = self.player.video.buffered.end(0)
    }
  }
  return ret
}

const close = () => {
  destoryPlayer()
}

const createPlayer = (option: V3dPlayerOptions) => {
  let opts = merge(option, defaultOption)
  if (props.lockControl) {
    opts.controls = false
  }
  if (opts.unique === '' && self.unique) {
    opts.unique = self.unique
  }
  if (opts.title === '' && self.title) {
    opts.title = self.title
  }
  destoryPlayer()
  self.muted = opts.muted
  self.order === opts.order
  self.unique = opts.unique
  self.title = opts.title
  self.allowPause = opts.allowPause

  // console.log(opts)
  let type = getMediaType(option.src)
  if (type === 'hls') {
    type = 'customHls'
    opts.record = false
  }
  opts.container = refVideo.value
  opts.video = {
    // 指定视频播放链接
    url: option.src,
    type: type,
    customType: {
      flv: (video: HTMLMediaElement) => {
        flvjs.LoggingControl.enableDebug = false
        flvjs.LoggingControl.enableVerbose = false
        flvjs.LoggingControl.enableWarn = false
        flvjs.LoggingControl.enableError = false
        const flvPlayer = flvjs.createPlayer(
          {
            type: 'flv',
            url: video.src,
            isLive: true,
            cors: true,
            withCredentials: false,
            hasAudio: option.hasAudio
          },
          {
            // 启用IO存储缓冲区。如果您需要实时流播放的实时（最小延迟），则设置为false
            enableStashBuffer: false,
            // 禁用音视频同步
            fixAudioTimestampGap: false
          }
        )
        flvPlayer.on(flvjs.Events.ERROR, (errType, errDetails, e) => {
          // this.status = 4
          // this.error = this.getError('(flv) ' + e.msg)
          // console.log(errType)
          switch (errType) {
            case flvjs.ErrorTypes.NETWORK_ERROR:
              // 存在多种情况 以下是常见几种
              // ERR_FAILED 504 连接到srs 超过1分钟一直没有等到流时提示  Exception
              // ERR_CONNECTION_REFUSED 访问到一个不存在的IP地址时 Exception
              // ERR_CONNECTION_TIMED_OUT IP地址存在 端口不存在时 Exception
              // ERR_INCOMPLETE_CHUNKED_ENCODING 服务器停止推流 UnrecoverableEarlyEof
              self.error = {
                code: 2,
                message: 'MEDIA_ERR_NETWORK: (flv) ' + e.msg
              }
              break
            case flvjs.ErrorTypes.MEDIA_ERROR:
              self.error = {
                code: 3,
                message: 'MEDIA_ERR_DECODE: (flv) ' + e.msg
              }
              break
            case flvjs.ErrorTypes.OTHER_ERROR:
              self.error = {
                code: 4,
                message: 'OTHER_ERROR: (flv) ' + e.msg
              }
              break
          }
          trigger('error')
          self.error = undefined
        })
        flvPlayer.on(flvjs.Events.STATISTICS_INFO, info => {
          self.speed = info.speed.toFixed(0)
          if (self.autoAudio && self.lastOptions && self.lastOptions.hasAudio) {
            // 有下载 但一直无法解码 表示无音频
            if (info.speed > 0 && info.decodedFrames === 0) {
              self.progress++
              if (self.progress >= ERR_MAX_AUDIO_COUNT) {
                window.console.warn(
                  currentUrl() +
                    ' has no audio data, video will auto reset to play.'
                )
                // 关掉音频 自动重载
                self.lastOptions.hasAudio = false
                play(self.lastOptions)
                return
              }
            }
          }

          if (self.lastFrame === 0) {
            self.lastFrame = info.decodedFrames
            return
          }
          if (self.lastFrame !== info.decodedFrames) {
            self.lastFrame = info.decodedFrames
            self.lastCount = 0
          } else {
            self.lastCount++
            // 30 约等于18秒 画面卡死时重连
            if (self.lastCount >= 30) {
              self.lastCount = 0
              self.lastFrame = 0
              replay(300, 'no decoded frame')
            }
          }
        })
        flvPlayer.attachMediaElement(video)
        flvPlayer.load()

        self.flv = flvPlayer
      },
      customHls: (video: HTMLMediaElement) => {
        const hls = new Hls({
          debug: false,
          // vite4时会出现 这里先改为false, hls官方bug 他们修复中
          // @see https://github.com/video-dev/hls.js/issues/5156
          // @see https://github.com/video-dev/hls.js/issues/5107
          // @see https://github.com/video-dev/hls.js/issues/2910
          enableWorker: false
        })
        hls.on(Hls.Events.ERROR, (event, data) => {
          // NETWORK_ERROR = "networkError",
          // MEDIA_ERROR = "mediaError",
          // KEY_SYSTEM_ERROR = "keySystemError",
          // MUX_ERROR = "muxError",
          // OTHER_ERROR = "otherError"
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              self.error = {
                code: 2,
                message: 'MEDIA_ERR_NETWORK: (hls) ' + data.details
              }
              trigger('error')
              self.error = undefined
              break
          }
        })
        // hls.on(Hls.Events.FRAG_LOADED, (frag: Events, data: FragLoadedData) => {
        //   // console.log(data.frag.stats)
        // })
        // hls.on(
        //   Hls.Events.FRAG_BUFFERED,
        //   (frag: Events, data: FragBufferedData) => {
        //     //
        //   }
        // )
        hls.loadSource(video.src)
        hls.attachMedia(video)
        self.hls = hls
      },
      flv265: (video: HTMLMediaElement) => {
        video.classList.add('v3d-hidden')
        const canvas = document.createElement('canvas')
        canvas.classList.add(
          'dplayer-video',
          'dplayer-video-current',
          'vjs-canvas'
        )
        video.parentElement?.append(canvas)
        const ctx = canvas.getContext('2d')
        if (ctx !== null) {
          ctx.fillStyle = 'rgb(200,0,0)'
          //绘制矩形
          ctx.fillRect(10, 10, 50, 50)

          ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
          ctx.fillRect(30, 30, 50, 50)
        }
      }
    }
  }
  // 初始化视频对象
  self.lastOptions = opts
  self.player = new Dplayer(opts as DPlayerOptions)
  // 下载插件
  if (opts.record) {
    self.fetcher = new Fetcher(self.player, { live: opts.live })
  }

  doDestroy()

  // 自动播放状态也要隐藏
  self.player.on('playing' as DPlayerEvents, () => {
    if (self.player) {
      self.player.controller.setAutoHide()
    }
  })
  self.player.on('pause', () => {
    // 实时流不允许隐藏时暂停
    if (
      self.player &&
      self.lastOptions &&
      self.lastOptions.live &&
      !self.paused
    ) {
      self.player.play()
    }
  })
  // 错误 播放mp4/m3u8时可以捕获 flv不行
  self.player.on('error', () => {
    if (self.error === undefined && self.player && self.player.video.error) {
      self.error = self.player.video.error
    }
    if (self.error) {
      self.status = 4
      switch (self.error.code) {
        case 1:
          // MEDIA_ERR_ABORTED
          break
        case 2:
          // MEDIA_ERR_NETWORK
          replay(380, self.error.message)
          break
        case 3:
          // MEDIA_ERR_DECODE
          replay(380, self.error.message)
          break
      }
      // console.log(self.error)
      self.hint = self.error.message
    }
  })
  self.player.on('loadeddata', () => {
    self.status = 3
    if (self.lastOptions) {
      self.lastOptions.replay = 0

      if (self.lastOptions.closeTime && self.timerClose === 0) {
        // 启用了定时关闭 但还没有创建定时器
        self.timerClose = setTimeout(() => {
          close()
        }, self.lastOptions.closeTime * 1000)
      }
    }
  })
  self.player.on('fullscreen', () => {
    if (props.lockControl) {
      refVideo.value.append(refFooter.value)
    }
  })
  self.player.on('fullscreen_cancel', () => {
    if (props.lockControl) {
      refPlayer.value.append(refFooter.value)
    }
  })

  self.player.on('canplay', () => {
    self.autoAudio = false
    if (self.lastOptions) {
      self.lastOptions.replay = 0
    }
  })

  doTimeUpdate()

  eventToVue()
  self.status = 2
}

const currentTime = () => {
  let ret = 0
  if (self.player) {
    ret = self.player.video.currentTime
  }
  return ret
}

const currentUrl = () => {
  let ret = ''
  if (self.player && self.lastOptions && self.lastOptions.video) {
    ret = self.lastOptions.video.url
  }
  return ret
}

const doDestroy = () => {
  if (self.player) {
    self.player.on('destroy', () => {
      if (self.flv) {
        self.flv.unload()
        self.flv.detachMediaElement()
        self.flv.destroy()
        self.flv = undefined
      }
      if (self.hls) {
        self.hls.destroy()
        self.hls = undefined
      }
    })
  }
}

const doTimeUpdate = () => {
  if (self.player) {
    self.player.on('timeupdate', () => {
      if (
        self.lastOptions &&
        self.lastOptions.autoRate &&
        self.lastOptions.autoRate.enabled
      ) {
        // 当前播放时间
        const cur = currentTime()
        // 缓冲区尾部时间
        const end = bufferedEnd()

        if (end - cur > self.lastOptions.autoRate.max) {
          playRate(1.5)
        }
        if (end - cur < self.lastOptions.autoRate.min) {
          playRate(1.0)
        }
      }
    })
  }
}

const destoryPlayer = () => {
  if (self.player) {
    // 如果在录像中 需要停止录像功能
    if (self.fetcher && self.fetcher.fetching) {
      self.fetcher.stop(false)
    }
    self.player.destroy()
    self.player = undefined
  }
  if (self.timerConnect > 0) {
    clearTimeout(self.timerConnect)
    self.timerConnect = 0
  }
  if (self.timerClose > 0) {
    clearTimeout(self.timerClose)
    self.timerClose = 0
  }
  self.status = 0
  self.autoAudio = true
  self.error = undefined
  self.lastOptions = undefined
  self.rate = 1.0
  self.speed = ''
  self.hint = ''
  self.title = undefined
  self.unique = undefined
  self.lastCount = 0
  self.lastFrame = 0
  self.progress = 0
  self.allowPause = false
  self.paused = false
}

/**
 * 获取el容器
 */
const el = () => {
  return refPlayer.value
}

/**
 * 将事件传给vue
 */
const eventToVue = () => {
  if (self.player) {
    const events = self.player.events
    Object.keys(events).forEach(item => {
      if (item === 'events') {
        return false
      } else {
        events[item].forEach((event: string) => {
          if (self.player) {
            self.player.on(event, () => {
              emits(event as V3dPlayerEvents, this)
            })
          }
        })
      }
    })
  }
}

/**
 * 焦点
 * @param focus 空时返回状态 非常为设置或取消焦点
 */
const focused = (focus?: boolean) => {
  if (focus === undefined) {
    return self.focused
  }
  self.focused = focus
}

const getMediaType = (src: string) => {
  let type = 'auto'
  if (/m3u8(#|\?|$)/i.exec(src)) {
    type = 'hls'
  } else if (/.flv(#|\?|$)/i.exec(src)) {
    type = 'flv'
  } else if (/.mpd(#|\?|$)/i.exec(src)) {
    type = 'dash'
  } else {
    type = 'normal'
  }
  return type
}

const index = () => {
  return props.index
}

/**
 * 静音
 */
const muted = () => {
  if (self.player) {
    self.muted = true
    self.player.muted(self.muted)
  }
}

/**
 * 占用
 * @param order {int} 创建顺序
 * @param text {string} 占用文本
 */
const occupy = (order: number, unique: string, text: string) => {
  if (self.status === 4) {
    close()
  }
  if (self.status === 0) {
    self.order = order
    self.status = 1
    self.unique = unique
    self.title = text
    self.allowPause = false
  }
}

const order = () => {
  return self.order
}

/**
 * 暂停播放
 */
const pause = () => {
  if (self.player) {
    self.paused = true
    self.player.pause()
  }
}

/**
 * 播放视频
 * @param option V3dPlayerOptions
 */
const play = (option: V3dPlayerOptions | undefined) => {
  if (option) {
    createPlayer(option)
  }
}

/**
 * 修改播放速度
 * @param rate 速度 0.5 1.0 1.5
 */
const playRate = (rate: number) => {
  if (self.player) {
    if (self.rate !== rate) {
      self.rate = rate
      self.player.speed(rate)
      window.console.warn(currentUrl() + ' play rate change to ' + self.rate)
    }
  }
  return self.rate
}

// const randomString = (len: number) => {
//   len = len || 32
//   const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
//   const maxPos = $chars.length
//   let pwd = ''
//   for (let i = 0; i < len; i++) {
//     pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
//   }
//   return pwd
// }

const replay = (time: number, msg: string) => {
  if (self.lastOptions && self.lastOptions.connect) {
    // 先占用 不被别人使用
    self.status = 1
    if (self.lastOptions.replay !== undefined) {
      time = time + self.lastOptions.replay * 1000
    }
    self.timerConnect = setTimeout(() => {
      if (self.lastOptions && self.lastOptions.replay !== undefined) {
        self.lastOptions.replay++
        if (self.lastOptions.replay < 6) {
          window.console.warn(
            self.lastOptions.replay +
              '. ' +
              currentUrl() +
              ' ' +
              msg +
              '. reconnect. '
          )
          play(self.lastOptions)
        }
      }
    }, time)
  }
}

/**
 * 跳转到视频的指定时间播放
 * @param time second
 */
const seek = (time: number) => {
  if (self.player) {
    self.player.seek(time)
  }
}

/**
 * 抓图
 */
const snapshot = () => {
  if (self.player) {
    self.player.snapshot()
  }
}

/**
 * 状态
 */
const status = () => {
  return self.status
}

/**
 * 切换暂停与播放
 */
const toggle = () => {
  if (self.player) {
    if (self.allowPause && !self.player.paused) {
      self.paused = true
    } else {
      self.paused = false
    }
    self.player.toggle()
  }
}

/**
 * 静音切换
 */
const toggleMuted = () => {
  if (self.player && self.status > 1) {
    self.muted = !self.muted
    self.player.muted(self.muted)
  }
}

/**
 * 录像切换
 */
const toggleRecord = () => {
  if (self.status === 3 && self.fetcher) {
    self.fetcher.toggle()
  }
}

/**
 * 全屏切换
 */
const toggleScreen = () => {
  if (self.player) {
    self.player.toggleScreen('browser')
  }
}

/**
 * 触发事件
 * @param event 事件名称
 */
const trigger = (event: string) => {
  if (self.player) {
    self.player.events.trigger(event)
  }
}

/**
 * 调节音量
 * @param percentage 音量 0.0 - 1.0
 * @param nonotice 是否显示通知
 */
const volume = (percentage?: number, nonotice?: boolean) => {
  if (self.player) {
    return self.player.volume(percentage, nonotice)
  } else {
    return 0
  }
}

const unique = () => {
  return self.unique
}

watch(props, () => {
  if (self.player) {
    self.player.options.controls = !props.lockControl
    self.player.controller.hide()
  }
})

onBeforeUnmount(() => {
  destoryPlayer()
})

onMounted(() => {
  if (props.options.autoplay) {
    createPlayer(props.options as V3dPlayerOptions)
  }
})

defineExpose({
  bufferedEnd,
  close,
  currentTime,
  currentUrl,
  el,
  focused,
  index,
  muted,
  occupy,
  order,
  pause,
  play,
  playRate,
  seek,
  snapshot,
  status,
  toggle,
  toggleScreen,
  trigger,
  volume,
  unique
})
</script>
<style lang="scss">
$footerHeight: 30px;
$footerColor: rgba(30, 30, 30, 72%);

.v3d-player {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
  box-sizing: border-box;

  .dplayer {
    width: 100%;
    height: 100%;
  }

  .dplayer-hide-controller {
    cursor: default !important;
  }

  .v3d-hidden {
    display: none !important;
  }

  .v3d-canvas {
    z-index: -3;
  }

  .dplayer-live-badge {
    display: none;
  }

  .v3d-loading {
    .v3d-shade {
      display: block;
    }
  }

  .v3d-shade {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
    //background: linear-gradient(to right, #35414b, #222b32, #35414b);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    box-sizing: border-box;
    pointer-events: none;

    .v3d-custom {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .v3d-chase {
      left: calc(50% - 15px);
      top: calc(50% - 15px);
    }

    .v3d-center {
      position: absolute;
      left: calc(50% - 36px);
      top: calc(50% - 36px);
    }

    .v3d-error {
      width: 100%;
      height: 100%;

      .v3d-error-svg {
        position: absolute;
        left: calc(50% - 24px);
        top: calc(50% - 24px);

        svg {
          fill: #999;
          width: 48px;
          height: 48px;
        }
      }
    }

    .v3d-error-text {
      color: #ccc;
      font-size: 12px;
      text-align: center;
      position: absolute;
      top: calc(50% + 28px);
      width: 100%;
    }
  }

  .v3d-video {
    z-index: 3;
  }

  .v3d-footer {
    position: absolute;
    bottom: 0;
    height: $footerHeight;
    width: 100%;
    background: $footerColor;
    display: none;
    z-index: 4;

    .v3d-control {
      position: relative;
      text-align: center;
      margin: 0;
      padding: 0;
      height: 100%;
      flex: none;
      color: #aaa;
      font-size: 12px;
    }

    .v3d-button {
      background: 0 0;
      border: none;
      cursor: pointer;
      display: inline-block;
      text-transform: none;
      text-decoration: none;
      transition: none;
      appearance: none;
      width: 32px;
      line-height: 0;
    }

    .v3d-button:hover {
      .svg-footer {
        background-color: #555;
        box-shadow: 0px 0px 8px #ccc;
        transform: scale(1.05);
        path {
          fill: #ddd;
        }
      }
    }

    .v3d-button:active {
      .svg-footer {
        background-color: #555;
        box-shadow: 0px 0px 8px #ccc;
        transform: scale(0.95);
        path {
          fill: #eee;
        }
      }
    }

    .v3d-control-text {
      line-height: $footerHeight;
    }

    .v3d-control-speed {
      width: 55px;
      margin: 0 5px;
    }

    .v3d-control-info {
      width: auto;
      flex-grow: 1;
      text-align: left;
      margin: 0 5px;
    }

    .v3d-fetching {
      .svg-footer {
        path {
          fill: #f00 !important;
        }
      }
    }
  }

  .v3d-fetcher {
    position: absolute;
    opacity: 1;
    user-select: none;
    width: 39px;
    height: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin: 5px;
    color: #fff;
    span:first-child {
      font-family: Tahoma, Arial, Helvetica, sans-serif;
      font-size: 12px;
      text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
    }
    span:last-child {
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  /**
   * 视频图像全屏显示 不支持ie
   */
  &.v3d-fill {
    .dplayer {
      video {
        object-fit: fill;
      }
    }
  }

  &.v3d-footer-show {
    .v3d-shade {
      height: calc(100% - #{$footerHeight});
    }

    .v3d-footer {
      display: flex;
    }

    .dplayer {
      height: calc(100% - #{$footerHeight});
    }

    .vjs-has-started .vjs-fetch-flv-ctx {
      top: 0px !important;
    }
  }

  .svg-footer {
    width: 16px;
    height: 16px;
    display: inline !important;
    path {
      transition: fill 0.1s;
      fill: #aaa;
    }
  }

  .svg-center {
    transition: fill 0.1s;
    fill: #aaa;
    width: 72px;
    height: 72px;
  }

  &.v3d-border {
    border: 1px solid black;
  }

  &.v3d-focus {
    border-color: #2d4edf !important;
  }
}
</style>
