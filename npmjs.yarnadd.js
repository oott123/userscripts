// ==UserScript==
// @name        npm install to yarn add
// @namespace   com.oott123.npmjs.yarnadd
// @match       https://www.npmjs.com/package/@techstark/opencv-js
// @grant       none
// @version     1.0
// @author      -
// @description 10/25/2021, 11:16:09 PM
// ==/UserScript==

const selector = '[title="Copy Command to Clipboard"] span[role=button]'

const handler = (e) => {
  for (var target = e.target; target && target != this; target = target.parentNode) {
    if (target.matches(selector)) {
      target.childNodes[0].textContent = 'yarn add '
      break;
    }
  }
}

document.body.addEventListener('click', handler, true)
document.body.addEventListener('mouseover', handler)
