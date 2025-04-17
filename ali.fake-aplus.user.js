// ==UserScript==
// @name 阿里系追踪脚本修复
// @namespace com.oott123.ali.fake-aplus
// @match *://*.tbcdn.cn/*
// @match *://*.1688.com/*
// @match *://*.3c.tmall.com/*
// @match *://*.alibaba.com/*
// @match *://*.alicdn.com/*
// @match *://*.aliexpress.com/*
// @match *://*.alikunlun.com/*
// @match *://*.aliqin.tmall.com/*
// @match *://*.alitrip.com/*
// @match *://*.aliyun.com/*
// @match *://*.cainiao.com/*
// @match *://*.cainiao.com.cn/*
// @match *://*.chi.taobao.com/*
// @match *://*.chi.tmall.com/*
// @match *://*.china.taobao.com/*
// @match *://*.cloudvideocdn.taobao.com/*
// @match *://*.cmos.greencompute.org/*
// @match *://*.dingtalk.com/*
// @match *://*.django.t.taobao.com/*
// @match *://*.etao.com/*
// @match *://*.feizhu.cn/*
// @match *://*.feizhu.com/*
// @match *://*.fliggy.com/*
// @match *://*.fliggy.hk/*
// @match *://*.food.tmall.com/*
// @match *://*.jia.taobao.com/*
// @match *://*.jia.tmall.com/*
// @match *://*.ju.taobao.com/*
// @match *://*.juhuasuan.com/*
// @match *://*.lw.aliimg.com/*
// @match *://*.m.1688.com/*
// @match *://*.m.alibaba.com/*
// @match *://*.m.alitrip.com/*
// @match *://*.m.cainiao.com/*
// @match *://*.m.etao.com/*
// @match *://*.m.taobao.com/*
// @match *://*.m.taopiaopiao.com/*
// @match *://*.m.tmall.com/*
// @match *://*.m.tmall.hk/*
// @match *://*.mei.com/*
// @match *://*.mobgslb.tbcache.com/*
// @match *://*.taobao.com/*
// @match *://*.taopiaopiao.com/*
// @match *://*.tbcache.com/*
// @match *://*.tmall.com/*
// @match *://*.tmall.hk/*
// @match *://*.trip.taobao.com/*
// @match *://*.xiami.com/*
// @match *://1688.com/*
// @match *://alibaba.com/*
// @match *://alicdn.com/*
// @match *://aliexpress.com/*
// @match *://alikunlun.com/*
// @match *://alitrip.com/*
// @match *://aliyun.com/*
// @match *://cainiao.com/*
// @match *://cainiao.com.cn/*
// @match *://cloudvideocdn.taobao.com/*
// @match *://cmos.greencompute.org/*
// @match *://dingtalk.com/*
// @match *://etao.com/*
// @match *://feizhu.cn/*
// @match *://feizhu.com/*
// @match *://fliggy.com/*
// @match *://fliggy.hk/*
// @match *://juhuasuan.com/*
// @match *://m.intl.taobao.com/*
// @match *://mei.com/*
// @match *://taobao.com/*
// @match *://taopiaopiao.com/*
// @match *://tmall.com/*
// @match *://tmall.hk/*
// @match *://xiami.com/*
// @match *://tbcdn.cn/*
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';
  const noop = function () { return };
  const proxy = new Proxy(noop, {
    construct(_, args) {
      return proxy;
    },
    apply(_, _this, args) {
      return proxy;
    },
    get(_, name) {
      if (name === Symbol.toPrimitive) {
        return (hint) => {
          switch (hint) {
              case 'number': return 0;
              case 'string': return '';
              default: return true;
          }
        }
      }

      return proxy;
    },
    set(_, name) {
      return true
    },
  });

  const keys = [
      'AES', 'AESPluginPV', 'AESPluginEvent', 'AESPluginJSError', 'AESPluginAPI', 'AESPluginResourceError',
      'AESPluginPerf', 'AESPluginEventTiming', 'AESPluginSurvey', 'AESPluginAutolog',
      'dataTracker', 'aplus', 'goldlog', 'AWSC', '_aes'
  ]
  keys.forEach(key => {
      unsafeWindow[key] = proxy;
      Object.defineProperty(unsafeWindow, key, {
          get() {
              return proxy;
          },
          set() {},
      })
  });
})();
