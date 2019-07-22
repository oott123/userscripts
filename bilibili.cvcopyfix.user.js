// ==UserScript==
// @name B站专栏允许复制
// @namespace com.oott123.bilibili.cvcopyfix
// @match https://www.bilibili.com/read/*
// @grant none
// ==/UserScript==

var css = `.article-holder.unable-reprint {
    user-select: initial!important;
}`
var el = document.createElement('style');
el.innerHTML = css;

document.head.appendChild(el);
document.addEventListener('copy', e => e.stopImmediatePropagation(), true);
