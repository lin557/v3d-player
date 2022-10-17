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
