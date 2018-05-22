const fs = require('fs')

const componentName = process.argv[2]

const vueTpl = `<template src="./template.html"></template>
<script src="./script.js"></script>
<style src="./style.css"></style>
`

const templateTpl = `<div class="${componentName}-wrap">
  <p>${componentName} component</p>
</div>
`

const scriptTpl = `export default {
  created () {},
  data () {
    return {}
  },
  methods: {}
}
`

const styleTpl = `.${componentName}-wrap {
  /* style here */
}
`

fs.mkdir(`./src/components/${componentName}`, err => {
  if (err) {
    console.error(`组件创建失败！`)
    console.error('    ' + err.message)
    return
  }
  fs.writeFile(`./src/components/${componentName}/index.vue`, vueTpl,() => {})
  fs.writeFile(`./src/components/${componentName}/template.html`, templateTpl, () => {})
  fs.writeFile(`./src/components/${componentName}/script.js`, scriptTpl, () => {})
  fs.writeFile(`./src/components/${componentName}/style.css`, styleTpl, () => {})
  console.log('组件创建成功！')
})
