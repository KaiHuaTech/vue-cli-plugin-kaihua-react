// preinstalled in @vue/cli-service
const { loadModule } = require('@vue/cli-shared-utils')
module.exports = async (api, options) => {
  // 1. vue 项目 src、public 目录文件
  const fs = loadModule('fs-extra', api.generator.context)
  await fs.emptyDir(api.resolve('./src'))
  await fs.emptyDir(api.resolve('./public'))

  api.render('./template')
}