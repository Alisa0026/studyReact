// 引用自己写的react
import React from './react'

// 字符串或者数字
// React.render('123',document.getElementById('root'))

// 原生的dom节点
let btn = React.createElement('button', { id: '1' }, 'hello')
let ele = React.createElement('div', { id: 'wrap' }, 'say', btn)
React.render(ele, document.getElementById('root'))