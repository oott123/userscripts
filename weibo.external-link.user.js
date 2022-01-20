// ==UserScript==
// @name        微博外链直接跳转
// @namespace   com.oott123.weibo.external-link
// @match       https://weibo.cn/sinaurl
// @grant       none
// @run-at      document-start
// @version     1.0
// @author      -
// @description 微博外链直接跳转
// ==/UserScript==

const url = new URLSearchParams(location.search).get('toasturl')
if (url) {
  window.stop()
  document.write('正在跳转')
  location.replace(url)
}
