module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "@anejs/vue"    // 模式（严格：@anejs/vue，标准: @anejs/vue/lib/essential,基本：base）
  ],
  "rules": {
    "no-console": 0,
    "no-underscore-dangle": 0,

    "object-curly-spacing": 0,  // 对象{}两边加空格
    "vue/mustache-interpolation-spacing": 0, // 双{}两边加空格
    "space-before-function-paren": 0,   // function括号前加空格
    "vue/attribute-hyphenation": 0, // 组件传参必须使用中划线，禁止驼峰
    "prefer-const": 0, // 使用const代替let
    "no-trailing-spaces": 0, // 使用const代替let
    "vue/max-attributes-per-line": 0  // max属性新开单独一行
  }
}
