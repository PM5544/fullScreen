fullScreen
==========

A small JavaScript to normalize the fullScreen DOM API cross-browser and adds some other easy things like
* a way to automatically hide/show content on the page dependent on the fullScreen support
* a way to add handlers to the normalized fullscreenchange event
* automatically add eventHandlers to elements on the page with a "fullScreenToggle" className
* automatically selects the element with the "fullScreenElement" id to be taken fullScreen when a user requests fullScreen

known issues
=========
At this time there's a bug in Chrome for Android which gives a false positive while feature detecting the fullScreen DOM API [go here to star the issue to get it resolved](https://code.google.com/p/chromium/issues/detail?id=180734 "go here to star the issue")
