import Dplayer from 'dplayer-lite'
import { merge } from './utils'

interface FetchOptions {
  live: boolean
  text?: string
  position?: string
  offsetH?: number
  offsetV?: number
  padding?: number
  opacity?: number
}

// Default options for the plugin.
const defaultOptions = {
  text: 'Download',
  // 默认实时流
  live: true,
  position: 'top-right',
  offsetH: 0,
  offsetV: 0,
  padding: 10,
  opacity: 0.9
}

/**
 * http-flv 下载
 */
class Fetcher {

  filename: string
  fetching: boolean
  controller: AbortController | undefined
  data: BlobPart[]
  type: string | undefined
  player: Dplayer
  el: HTMLElement | null
  options: FetchOptions
  flashCount: number
  flash: boolean

  constructor(player: Dplayer, options: FetchOptions) {
    this.filename = ''
    this.fetching = false
    this.controller = undefined
    this.data = []
    this.type = 'video/x-flv'
    this.player = player
    this.el = null
    this.flashCount = 0
    this.flash = false

    this.options = merge(options, defaultOptions)

    player.on('ready', ()=> {
      this.setup()
    })
  }

  /**
   * save blob to media file
   *
   * @param {Blob} blob media data
   */
   blob2File(blob: Blob) {
    if (blob !== null) {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.download = this.filename
      document.body.appendChild(link)
      link.click()
      // 下载完成移除元素
      document.body.removeChild(link)
      // 释放掉blob对象
      window.URL.revokeObjectURL(url)
    }
  }

  getUrl() {
    let ret = this.player.options.video?.url
    if (ret) {
      return ret
    }
    return ''
  }

  /**
  * init element
  */
  setup() {
    if (this.el !== null) {
      return
    }
    // Create div element
    const div = document.createElement('div')
    div.classList.add('v3d-fetcher')
    div.classList.add('v3d-hidden')

    // Setup position
    const { offsetH, offsetV } = this.options
    switch (this.options.position) {
      case 'top-left':
        div.style.top = offsetV + 'px'
        div.style.left = offsetH + 'px'
        break;
      case 'top-right':
        div.style.top = offsetV + 'px'
        div.style.right = offsetH + 'px'
        break;
      case 'bottom-left':
        div.style.bottom = offsetV + 'px'
        div.style.left = offsetH + 'px'
        break;
      case 'bottom-right':
        div.style.bottom = offsetV + 'px'
        div.style.right = offsetH + 'px'
        break;
      default:
        div.style.top = offsetV + 'px'
        div.style.right = offsetH + 'px'
      }
      div.innerHTML = '<span>REC</span>' + 
                      '<span>' +
                      '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                      '<path' +
                      ' style="stroke: #fff; fill: #f00; stroke-width: 60px;" d="M512 512m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z">' +
                      '</path>' +
                      '</svg>' + 
                      '</span>'
      const { opacity } = this.options

      if (opacity) {
        div.style.opacity = opacity.toString()
      }
      this.el = div
      this.player.video.parentElement?.append(div)


      this.player.on('timeupdate', () => {
        if (this.fetching) {
          this.flashCount++
          if (this.flashCount % 2 === 0) {
            this.flash = !this.flash
            if (this.el) {
              if (this.flash) {
                if (this.options.opacity) {
                  this.el.style.opacity = this.options.opacity.toString()
                }
              } else {
                this.el.style.opacity = '0'
              }
            }
          }
        }
      })
  }

  /**
   * show fetch status
   */
  show() {
    if (this.el) {
      this.el.classList.remove('v3d-hidden')
    }
  }

  /**
   * hide fetch status
   */
  hide() {
    if (this.el) {
      this.el.classList.add('v3d-hidden');
    }
  }

  getName(url: string | undefined) {
    let ret = 'unknow'
    if (url) {
      const vlist = url.split('?')
      if (vlist.length > 0) {
        let sTmp = vlist[0].split('\\').pop()
        if (sTmp) {
          sTmp = sTmp.split('/').pop()
          if (sTmp) {
            return sTmp
          }
        }
      } 
    }
    return ret
  }

  /**
   * 利用fetch按帧下载数据并合并成blob
   */
   fetchMedia() {
    const that = this;
    const url = that.getUrl()

    this.filename = this.getName(url)
    this.controller = new window.AbortController();
    const signal = this.controller.signal;

    fetch(url, { signal })
      .then((res: Response) => {
        // console.log(res)
        // 自己读取每一帧
        if (res && res.body) {
          const reader = res.body.getReader()
          let aType = res.headers.get('Content-Type')
          if (aType) {
            that.type = aType
          }
          that.data = []
          return new Promise((resolve) => {
            /**
             * 读取所有数据
             */
            function push() {
              reader.read()
                .then(({done, value}) => {
                  if (value) {
                    that.data.push(value)
                    if (done) {
                      // 包装成 blob 对象并返回
                      resolve(new Blob(that.data, {type: that.type }))
                    } else {
                      push()
                    }
                  }
                })
                .catch(() => {
                  // console.log(e)
                })
            }
            push()
          })
        }
      })
      .then((blob: any) => {
        // 成功
        this.fetching = false
        this.hide()
        this.blob2File(blob)
        this.controller = undefined
      })
      .catch(() => {
        this.fetching = false
        this.hide()
        this.controller = undefined
      })
  }

  /**
   * start fetch
   */
  start() {
    if (!this.options.live) {
      // 不是实时文件 直接下载
      window.open(this.getUrl(), 'Download')
    } else if (!this.fetching) {
      this.fetching = true
      this.flash = true
      this.flashCount = 0
      this.show()
      // 下载文件
      this.fetchMedia()
      // 触发下载事件
      this.player.events.trigger('fetch_start')
    }
  }

  /**
   * stop fetch
   *
   * @param save Save file when stopped
   */
  stop(save: boolean) {
    if (this.fetching) {
      this.hide()
      if (this.controller) {
        this.controller.abort()
        this.controller = undefined
      }
      this.fetching = false;
      if (this.data.length > 0 && save) {
        let aType
        if (this.type === null) {
          aType = undefined
        } else {
          aType = this.type
        }
        const blob = new window.Blob(this.data as BlobPart[], { type: aType });

        this.blob2File(blob);
      }
      // 触发下载事件
      this.player.events.trigger('fetch_stop')
    }
  }

  toggle() {
    if (this.fetching) {
      this.stop(true)
    } else {
      this.start()
    }
  }
}

export default Fetcher