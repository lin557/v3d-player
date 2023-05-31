type MergeObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in string | number]: any
}

// 只是写法这样看着顺眼
type Target<A, B> = A & Omit<Partial<B>, keyof A>

type Merge<A, B> = A & B

function merge<A extends MergeObject, B extends MergeObject>(
  target: A,
  source: B
): Merge<A, B> {
  for (const key in source) {
    if (typeof target[key] === 'undefined') {
      ;(target[key] as Target<A, B>) = source[key]
    }
  }
  return target as Merge<A, B>
}

export { merge }

export function time2Str(t: number, duration: number) {
  // 小时： h = parseInt(总秒数 / 60 / 60 % 24)
  // 分钟： m = parseInt(总秒数 / 60 % 60)
  // 秒：   s = parseInt(总秒数 % 60)
  const h = parseInt(((t / 60 / 60) % 24).toString())
  const m = parseInt(((t / 60) % 60).toString())
  const s = parseInt((t % 60).toString())
  // 因为h已经是数字型了，如果0不加引号就变成加法了
  const showHour = duration >= 3600
  const hh = h < 10 ? '0' + h : h
  const mm = m < 10 ? '0' + m : m
  const ss = s < 10 ? '0' + s : s
  return showHour ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
}
