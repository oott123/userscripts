// ==UserScript==
// @name NGA 版头折叠
// @namespace com.oott123.nga.collapsetop
// @match https://bbs.nga.cn/thread.php*
// @run-at document-end
// @grant none
// ==/UserScript==

const s = document.createElement('style')
s.innerText = `
#toppedtopic {
    display: none!important;
}
`

const btn = document.createElement('a')
btn.href = 'javascript:;'
btn.innerText = '展开/收起'

Object.assign(btn.style, {
  position: 'absolute',
  top: '0',
  right: '1em',
  fontSize: '1.166em',
  lineHeight: '2.63em'
})

btn.onclick = function () {
  if (s.parentElement) {
    s.remove()
  } else {
    document.head.appendChild(s)
  }
}

document.head.appendChild(s)
const top = document.querySelector('#toptopics')
top.style.position = 'relative'
top.appendChild(btn)
