// ==UserScript==
// @name        闲鱼跳转 PC 版
// @namespace   com.oott123.goofish.pc
// @match       https://h5.m.goofish.com/item
// @grant       none
// @version     1.0
// @author      -
// @description 2022/9/7 10:56:42
// ==/UserScript==

const myUrl = new URL(location.href)
const myId = myUrl.searchParams.get('id')
if (myId) {
  location.href = `https://item.taobao.com/item.htm?id=${myId}`
}
