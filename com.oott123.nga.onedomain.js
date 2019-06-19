// ==UserScript==
// @name NGA 域名统一
// @namespace com.oott123.nga.onedomain
// @match *://bbs.nga.cn/*
// @match *://nga.178.com/*
// @match *://ngabbs.com/*
// @match *://www.ngabbs.com/*
// @grant none
// @run-at document-start
// ==/UserScript==

if (location.hostname !== 'bbs.nga.cn') {
  location.hostname = 'bbs.nga.cn';
}
