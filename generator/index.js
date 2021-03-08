// preinstalled in @vue/cli-service
const { loadModule } = require('@vue/cli-shared-utils')
const cleanVue = require('./clean-vue')
const genEslint = require('./gen-eslint')
const genBabel = require('./gen-babel')
module.exports = (...args) => {
  const [api, options] = args
  cleanVue(api, options)

  // 生成 react app file
  api.render('./gen-react-app/template')
  
  // 删除项目初始文件 https://github.com/vuejs/vue-cli/blob/7f56846a2e54ee5b748232e8b5ae2411a147416d/packages/@vue/cli/lib/Generator.js#L173
  Object.keys(api.generator.files).forEach(p => {
    const _path = p.replace(/\\/g, '/')
    if (_path.endsWith('.vue') || _path.endsWith('src/assets/logo.png')) {
      Reflect.deleteProperty(api.generator.files, _path)
    }
  })
  
  api.extendPackage({
    dependencies: {
      "react": ">16",
      "react-dom": ">16",
    }
  })


  if (options.useEslint) {
    api.genEslint(...args)
  }

  genBabel(...args)

}