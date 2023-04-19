/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type V3dPlayerEvents =
  | 'abort'
  | 'canplay'
  | 'canplaythrough'
  | 'durationchange'
  | 'emptied'
  | 'ended'
  | 'error'
  | 'loadeddata'
  | 'loadedmetadata'
  | 'loadstart'
  | 'mozaudioavailable'
  | 'pause'
  | 'play'
  | 'playing'
  | 'progress'
  | 'ratechange'
  | 'seeked'
  | 'seeking'
  | 'stalled'
  | 'suspend'
  | 'timeupdate'
  | 'volumechange'
  | 'waiting'
  // 播放器事件
  | 'ready'
  | 'screenshot'
  | 'contextmenu_show'
  | 'contextmenu_hide'
  | 'fetch_start'
  | 'fetch_stop'
  | 'notice_show'
  | 'notice_hide'
  | 'quality_start'
  | 'quality_end'
  | 'destroy'
  | 'resize'
  | 'fullscreen'
  | 'fullscreen_cancel'

export type Preload = 'none' | 'metadata' | 'auto'
export type VideoType =
  | 'auto'
  | 'hls'
  | 'flv'
  | 'dash'
  | 'webtorrent'
  | 'normal'

export interface DPlayerHighLightItem {
  text: string
  time: number
}

export interface DPlayerContextMenuItem {
  text: string
  link?: string | undefined
  click?: (() => void) | undefined
}

export interface DPlayerVideoQuality {
  name: string
  url: string
  type?: string | undefined
}

export interface DPlayerVideo {
  url: string
  pic?: string | undefined
  type?: VideoType | string | undefined
  customType?: any
  quality?: DPlayerVideoQuality[] | undefined
  defaultQuality?: number | undefined
}

export interface RateParam {
  enabled: boolean
  min: number
  max: number
}

export interface RecordParam {
  enabled: boolean
  live?: boolean | undefined
}

export interface V3dPlayerOptions {
  autoplay?: boolean | undefined
  autoRate?: RateParam | undefined
  closeTime?: number | undefined
  connect?: boolean | undefined
  container?: HTMLElement | null
  controls?: boolean | undefined
  contextmenu?: DPlayerContextMenuItem[] | undefined
  debug?: boolean | undefined
  hasAudio?: boolean | undefined
  hotkey?: boolean | undefined
  lang?: string | undefined
  live?: boolean | undefined
  logo?: string | undefined
  loop?: boolean | undefined
  muted?: boolean | undefined
  mutex?: boolean | undefined
  order?: number | undefined
  preload?: Preload | undefined
  preventClickToggle?: boolean | undefined
  screenshot?: boolean | undefined
  src: string
  record?: boolean | undefined
  replay?: number
  theme?: string | undefined
  title?: string | undefined
  video?: DPlayerVideo | undefined
  volume?: number | undefined
  unique?: string | undefined
}

declare const V3dPlayer: __VLS_WithTemplateSlots<
  import('vue').DefineComponent<
    {
      border: {
        type: BooleanConstructor
        default: boolean
      }
      fill: {
        type: BooleanConstructor
        default: boolean
      }
      index: {
        type: NumberConstructor
        default: number
      }
      /**
       * 锁定控制栏
       */
      lockControl: {
        type: BooleanConstructor
        default: boolean
      }
      options: {
        type: ObjectConstructor
        default(): {
          allowPause: boolean
          autoplay: boolean
          controls: boolean
          contextmenu: never[]
          hotkey: boolean
          live: boolean
          logo: undefined
          loop: boolean
          muted: boolean
          mutex: boolean
          preload: string
          screenshot: boolean
          src: undefined
          theme: string
          volume: number
        }
      }
      poster: {
        type: StringConstructor
        default: string
      }
    },
    {
      bufferedEnd: () => number
      close: () => void
      currentTime: () => number
      currentUrl: () => string
      el: () => any
      focused: (focus?: boolean) => boolean | undefined
      index: () => number
      muted: () => void
      occupy: (order: number, unique: string, text: string) => void
      order: () => number
      pause: () => void
      play: (option: V3dPlayerOptions | undefined) => void
      playRate: (rate: number) => number
      seek: (time: number) => void
      snapshot: () => void
      status: () => number
      toggle: () => void
      toggleScreen: () => void
      trigger: (event: string) => void
      volume: (percentage?: number, nonotice?: boolean) => number
      unique: () => string | undefined
    },
    unknown,
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    (
      | 'progress'
      | 'ready'
      | 'timeupdate'
      | 'fetch_start'
      | 'abort'
      | 'fetch_stop'
      | 'canplay'
      | 'canplaythrough'
      | 'durationchange'
      | 'emptied'
      | 'ended'
      | 'error'
      | 'loadeddata'
      | 'loadedmetadata'
      | 'loadstart'
      | 'mozaudioavailable'
      | 'pause'
      | 'play'
      | 'playing'
      | 'ratechange'
      | 'seeked'
      | 'seeking'
      | 'stalled'
      | 'suspend'
      | 'volumechange'
      | 'waiting'
      | 'screenshot'
      | 'contextmenu_show'
      | 'contextmenu_hide'
      | 'notice_show'
      | 'notice_hide'
      | 'quality_start'
      | 'quality_end'
      | 'destroy'
      | 'resize'
      | 'fullscreen'
      | 'fullscreen_cancel'
    )[],
    | 'progress'
    | 'ready'
    | 'timeupdate'
    | 'fetch_start'
    | 'abort'
    | 'fetch_stop'
    | 'canplay'
    | 'canplaythrough'
    | 'durationchange'
    | 'emptied'
    | 'ended'
    | 'error'
    | 'loadeddata'
    | 'loadedmetadata'
    | 'loadstart'
    | 'mozaudioavailable'
    | 'pause'
    | 'play'
    | 'playing'
    | 'ratechange'
    | 'seeked'
    | 'seeking'
    | 'stalled'
    | 'suspend'
    | 'volumechange'
    | 'waiting'
    | 'screenshot'
    | 'contextmenu_show'
    | 'contextmenu_hide'
    | 'notice_show'
    | 'notice_hide'
    | 'quality_start'
    | 'quality_end'
    | 'destroy'
    | 'resize'
    | 'fullscreen'
    | 'fullscreen_cancel',
    import('vue').VNodeProps &
      import('vue').AllowedComponentProps &
      import('vue').ComponentCustomProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        border: {
          type: BooleanConstructor
          default: boolean
        }
        fill: {
          type: BooleanConstructor
          default: boolean
        }
        index: {
          type: NumberConstructor
          default: number
        }
        /**
         * 锁定控制栏
         */
        lockControl: {
          type: BooleanConstructor
          default: boolean
        }
        options: {
          type: ObjectConstructor
          default(): {
            allowPause: boolean
            autoplay: boolean
            controls: boolean
            contextmenu: never[]
            hotkey: boolean
            live: boolean
            logo: undefined
            loop: boolean
            muted: boolean
            mutex: boolean
            preload: string
            screenshot: boolean
            src: undefined
            theme: string
            volume: number
          }
        }
        poster: {
          type: StringConstructor
          default: string
        }
      }>
    > & {
      onError?: ((...args: any[]) => any) | undefined
      onAbort?: ((...args: any[]) => any) | undefined
      onCanplay?: ((...args: any[]) => any) | undefined
      onCanplaythrough?: ((...args: any[]) => any) | undefined
      onDurationchange?: ((...args: any[]) => any) | undefined
      onEmptied?: ((...args: any[]) => any) | undefined
      onEnded?: ((...args: any[]) => any) | undefined
      onLoadeddata?: ((...args: any[]) => any) | undefined
      onLoadedmetadata?: ((...args: any[]) => any) | undefined
      onLoadstart?: ((...args: any[]) => any) | undefined
      onPause?: ((...args: any[]) => any) | undefined
      onPlay?: ((...args: any[]) => any) | undefined
      onPlaying?: ((...args: any[]) => any) | undefined
      onProgress?: ((...args: any[]) => any) | undefined
      onRatechange?: ((...args: any[]) => any) | undefined
      onSeeked?: ((...args: any[]) => any) | undefined
      onSeeking?: ((...args: any[]) => any) | undefined
      onStalled?: ((...args: any[]) => any) | undefined
      onSuspend?: ((...args: any[]) => any) | undefined
      onTimeupdate?: ((...args: any[]) => any) | undefined
      onVolumechange?: ((...args: any[]) => any) | undefined
      onWaiting?: ((...args: any[]) => any) | undefined
      onReady?: ((...args: any[]) => any) | undefined
      onFetch_start?: ((...args: any[]) => any) | undefined
      onFetch_stop?: ((...args: any[]) => any) | undefined
      onMozaudioavailable?: ((...args: any[]) => any) | undefined
      onScreenshot?: ((...args: any[]) => any) | undefined
      onContextmenu_show?: ((...args: any[]) => any) | undefined
      onContextmenu_hide?: ((...args: any[]) => any) | undefined
      onNotice_show?: ((...args: any[]) => any) | undefined
      onNotice_hide?: ((...args: any[]) => any) | undefined
      onQuality_start?: ((...args: any[]) => any) | undefined
      onQuality_end?: ((...args: any[]) => any) | undefined
      onDestroy?: ((...args: any[]) => any) | undefined
      onResize?: ((...args: any[]) => any) | undefined
      onFullscreen?: ((...args: any[]) => any) | undefined
      onFullscreen_cancel?: ((...args: any[]) => any) | undefined
    },
    {
      fill: boolean
      border: boolean
      index: number
      lockControl: boolean
      options: Record<string, any>
      poster: string
    }
  >,
  {
    ready: (_: {}) => any
    loading: (_: {}) => any
  }
>
export default V3dPlayer
