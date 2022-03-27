// ==UserScript==
// @name        腾讯云自动切换邮箱登录
// @namespace   com.oott123.tencentcloud.loginwithemail
// @match       https://cloud.tencent.com/login
// @grant       none
// @run-at      document-idle
// @version     1.0
// @author      -
// @description 3/27/2022, 10:41:50 AM
// ==/UserScript==

setTimeout(() => {
  document.querySelector('.J-btnSwitchLoginType[data-type="email"]').click()
}, 16)
