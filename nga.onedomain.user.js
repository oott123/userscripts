// ==UserScript==
// @name NGA 域名统一
// @namespace com.oott123.nga.onedomain
// @match *://bbs.nga.cn/*
// @match *://nga.178.com/*
// @match *://ngabbs.com/*
// @match *://www.ngabbs.com/*
// @match *://g.nga.cn/*
// @grant none
// @run-at document-start
// ==/UserScript==

const oldUrl = new URL(location.href)
if (oldUrl.hostname !== 'nga.178.com') {
  oldUrl.hostname = 'nga.178.com';
}
if (oldUrl.protocol !== 'https:') {
  oldUrl.protocol = 'https:';
}
if (oldUrl.toString() !== location.href) {
  location.replace(oldUrl.toString());
}
