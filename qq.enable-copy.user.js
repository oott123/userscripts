// ==UserScript==
// @name        腾讯文档-允许复制，去除水印
// @namespace   com.oott123.qq.enable-copy
// @match       https://doc.weixin.qq.com/doc/*
// @match       https://docs.qq.com/doc/*
// @grant       none
// @version     1.0
// @author      -
// @description 2022/8/30 14:10:17
// @run-at      document-idle
// ==/UserScript==

// taken from https://bbs.tampermonkey.net.cn/thread-1080-1-1.html

window.App.CollabRoom.collabRoomOptions.notificationCenter._docEnv.copyable = true
window.pad.permissionCtrl.privilege.canCopy = true
window.App.CollabRoom.collabRoomOptions.clientVars.advPolicy.view_forbid_copy_print = 0

const css = `
.wecom-watermark-bg-wrapper {
  display: none!important;
}
`
const style = document.createElement('style')
style.innerText = css
document.head.appendChild(style)
