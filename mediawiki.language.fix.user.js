// ==UserScript==
// @name        维基百科、萌娘百科链接语言修复 
// @namespace   com.oott123.mediawiki.language.fix
// @match       *://mzh.moegirl.org.cn/*
// @match       *://zh.moegirl.org.cn/zh-*
// @match       *://zh.wikipedia.org/zh-*
// @grant       none
// @version     1.0
// @author      -
// @run-at      document-start
// @description 跳转到维基百科不转换，跳转萌百网页到不转换 PC
// ==/UserScript==

function fixLink() {
  if (document.referrer) {
    const referrer = new URL(document.referrer)

    if (referrer.host === location.host) {
      return
    }
  }

  const newUrl = new URL(location.href)
  let changed = false
  if (newUrl.host === 'mzh.moegirl.org.cn') {
    newUrl.host = 'zh.moegirl.org.cn'
    changed = true
  }

  if (newUrl.pathname.startsWith('/zh-')) {
    newUrl.pathname = newUrl.pathname.replace(/^\/zh-\w+/, '/zh')
    changed = true
  }

  if (changed) {
    location.replace(newUrl.toString())
  }
}

fixLink()
