// ==UserScript==
// @name        jsDelivr Button for Github.com
// @namespace   com.oott123.github.jsdelivrbutton
// @include     https://github.com/*
// @version     3
// @grant       none
// @description add a jsDelivr button for Github.com
// ==/UserScript==

document.addEventListener('pjax:complete', rawgitButton);
rawgitButton();

function rawgitButton() {
    var rawDom = document.querySelector('#raw-url');
    if (!rawDom) {
        return;
    }
    var url = rawDom.pathname.replace(/((?:\/[^\/]+){2})\/raw\/([^\/]+)\/(.*)$/, 'https://cdn.jsdelivr.net/gh$1@$2/$3');
    var rawGitDom = document.createElement('a');
    rawGitDom.href = url;
    rawGitDom.textContent = 'jsDelivr';
    rawGitDom.className = 'btn btn-sm BtnGroup-item';
    rawGitDom.target = '_blank';
    rawDom.parentNode.insertBefore(rawGitDom, rawDom.nextSibling);
}
