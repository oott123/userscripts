// ==UserScript==
// @name        NGA 表情加文本
// @namespace   com.oott123.nga.smiletext
// @match       https://bbs.nga.cn/read.php
// @grant       none
// @version     1.0
// @author      -
// @description 10/14/2021, 12:08:57 PM
// ==/UserScript==

ubbcode.add_smile_text = function (e) {
  [...e.querySelectorAll('[class^="smile"]')]
    .forEach(el => el.parentNode.insertBefore(document.createTextNode(`(${el.alt})`), el.nextSibling))
}

ubbcode.bbscode_common_old = ubbcode.bbscode_common
ubbcode.bbscode_common = function (arg) {
  ubbcode.bbscode_common_old(arg);
  setTimeout(() => ubbcode.add_smile_text(arg.c))
}

ubbcode.add_smile_text(document)
