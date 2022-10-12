export as namespace V3dPlayer

export type V3dPlayerEvents =
'abort' |
'canplay' |
'canplaythrough' |
'durationchange' |
'emptied' |
'ended' |
'error' |
'loadeddata' |
'loadedmetadata' |
'loadstart' |
'mozaudioavailable' |
'pause' |
'play' |
'playing' |
'progress' |
'ratechange' |
'seeked' |
'seeking' |
'stalled' |
'suspend' |
'timeupdate' |
'volumechange' |
'waiting' |
// 播放器事件
'ready' |
'screenshot' |
'contextmenu_show' |
'contextmenu_hide' |
'fetch_start' |
'fetch_stop' |
'notice_show' |
'notice_hide' |
'quality_start' |
'quality_end' |
'destroy' |
'resize' |
'fullscreen' |
'fullscreen_cancel'

export type Preload = 'none' | 'metadata' | 'auto'
export type VideoType = 'auto' | 'hls' | 'flv' | 'dash' | 'webtorrent' | 'normal'


export interface DPlayerHighLightItem {
  text: string
  time: number
}

export interface DPlayerContextMenuItem {
  text: string
  link?: string | undefined;
  click?: (() => void) | undefined;
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
  container?: HTMLElement | null
  controls?: boolean | undefined
  contextmenu?: DPlayerContextMenuItem[] | undefined
  hotkey?: boolean | undefined
  lang?: string | undefined
  live?: boolean | undefined
  logo?: string | undefined
  loop?: boolean | undefined
  muted?: boolean | undefined
  mutex?: boolean | undefined
  preload?: Preload | undefined
  screenshot?: boolean | undefined
  src: string
  theme?: string | undefined
  video?: DPlayerVideo | undefined
  volume?: number | undefined
  autoRate?: RateParam | undefined
  connect?: boolean | undefined
  record?: boolean | undefined
  hasAudio?: boolean | undefined
  title?: string | undefined
}

export default class V3dPlayer {
  close(): void
  currentUrl(): string
  pause(): void
  play(option: V3dPlayerOptions): void
  seek(time: number): void
  snapshot(): void
  speed(rate: number): void
  toggle(): void
  trigger(event: string): void
  volume(percentage?: number, nonotice?: boolean): number
}