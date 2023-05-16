// const langArray = ['en', 'zh-cn', 'th']

interface Module {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: any
}

// import.meta.glob('*', { eager: true })
const i18n = import.meta.glob('./i18n/*.ts', { eager: true })

// 对批量导入存放模块的对象进行处理
// 先获取其全部属性
const keys = Object.keys(i18n)

// 执行批量替换操作
for (const path of keys) {
  // 裁剪字符串方式得到路径中的文件名（无扩展名）
  const name = path.substring(
    path.lastIndexOf('/') + 1,
    path.lastIndexOf('.ts')
  )
  // 对原对象执行添加新的属性并删除旧属性达到处理效果
  i18n[name] = (i18n[path] as Module).default
  delete i18n[path]
}

export default i18n
