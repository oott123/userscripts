// ==UserScript==
// @name 微博手机&国际版跳转电脑版
// @namespace com.oott123.weibo.gotodesktop
// @match *://m.weibo.cn/status/*
// @match *://m.weibo.cn/detail/*
// @match *://weibointl.api.weibo.cn/share/*
// @match *://share.api.weibo.cn/share/*
// @match *://weibointl.api.weibo.com/share/*
// @grant none
// ==/UserScript==

(function () {

/**
 * 新浪微博mid与url互转实用工具
 * 作者: XiNGRZ (http://weibo.com/xingrz)
 */

var WeiboUtil = {
    // 62进制字典
    str62keys: [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ],
};

/**
 * 62进制值转换为10进制
 * @param {String} str62 62进制值
 * @return {String} 10进制值
 */
WeiboUtil.str62to10 = function(str62) {
	var i10 = 0;
	for (var i = 0; i < str62.length; i++)
	{
		var n = str62.length - i - 1;
		var s = str62[i];
		i10 += this.str62keys.indexOf(s) * Math.pow(62, n);
	}
	return i10;
};

/**
 * 10进制值转换为62进制
 * @param {String} int10 10进制值
 * @return {String} 62进制值
 */
WeiboUtil.int10to62 = function(int10) {
	var s62 = '';
	var r = 0;
	while (int10 != 0 && s62.length < 100) {
		r = int10 % 62;
		s62 = this.str62keys[r] + s62;
		int10 = Math.floor(int10 / 62);
	}
	return s62;
};

/**
 * URL字符转换为mid
 * @param {String} url 微博URL字符，如 "wr4mOFqpbO"
 * @return {String} 微博mid，如 "201110410216293360"
 */
WeiboUtil.url2mid = function(url) {
	var mid = '';
	
	for (var i = url.length - 4; i > -4; i = i - 4)	//从最后往前以4字节为一组读取URL字符
	{
		var offset1 = i < 0 ? 0 : i;
		var offset2 = i + 4;
		var str = url.substring(offset1, offset2);
		
		str = this.str62to10(str);
		if (offset1 > 0)	//若不是第一组，则不足7位补0
		{
			while (str.length < 7)
			{
				str = '0' + str;
			}
		}
		
		mid = str + mid;
	}
	
	return mid;
};

/**
 * mid转换为URL字符
 * @param {String} mid 微博mid，如 "201110410216293360"
 * @return {String} 微博URL字符，如 "wr4mOFqpbO"
 */
WeiboUtil.mid2url = function(mid) {
    if(!mid) {
        return mid;
    }
    mid = String(mid); //mid数值较大，必须为字符串！
	if(!/^\d+$/.test(mid)){ return mid; }
	var url = '';
	
	for (var i = mid.length - 7; i > -7; i = i - 7)	//从最后往前以7字节为一组读取mid
	{
		var offset1 = i < 0 ? 0 : i;
		var offset2 = i + 7;
		var num = mid.substring(offset1, offset2);
		
		num = this.int10to62(num);
		if (offset1 > 0)	//若不是第一组，则不足4位补0
		{
			while (num.length < 4)
			{
				num = '0' + num;
			}
		}
		url = num + url;
	}
	
	return url;
};

var uid = window.$render_data && window.$render_data.status && window.$render_data.status.user.id;
if (!uid) {
  var avaintl = document.querySelector('.weibo-top.m-box.m-avatar-box .m-img-box');
  avaintl = avaintl && avaintl.getAttribute('onclick');
  avaintl = avaintl && avaintl.match(/forward\(([0-9]+)/);
  uid = avaintl && avaintl[1];
}
// status|detail 后可能是两种格式，一种纯数字，一种 base62
// 检查是否为 15 位以内（数字一般16位）
var s = location.href.match(/\/(?:status|detail)\/([A-Za-z0-9]{1,15})([^0-9]|$)/);
var url = '';
if (s) {
  url = 'https://weibo.com/' + uid + '/' + s[1];
} else {
  var m = location.href.match(/\/(?:status|detail)\/([0-9]+)/) || 
  	location.href.match(/\?weibo_id=([0-9]+)/);
  if (!m) {
  	var intlel = document.querySelector('#app .footer_suspension > a[onclick]');
  	if (intlel) {
      m = intlel.getAttribute('onclick');
      m = m && m.match(/forward\(0,([0-9]+)/);
      m = m && m[1];
  	}
  }
  if (m) {
  	url = 'https://weibo.com/' + uid + '/' + WeiboUtil.mid2url(m[1]);
  }
}

if (url) {
  var el = document.createElement('a');
  el.style = 'display: flex;position: fixed;top: 30px;right: 30px;width: 90px;height: 45px;z-index: 999;background: #4a4a4a;border-radius: 999px;align-items: center;justify-content: center;color: #fff;';
  el.innerText = '电脑版';
  el.href = url;
  document.body.appendChild(el);
}

})();
