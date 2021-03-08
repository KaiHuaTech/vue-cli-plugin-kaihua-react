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