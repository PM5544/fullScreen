fullScreen
==========

A small JavaScript to normalize the fullScreen DOM API cross-browser and adds some other easy things like
* a way to automatically hide/show content on the page dependent on the fullScreen support
* a way to add handlers to the normalized fullscreenchange event
* automatically add eventHandlers to elements on the page with a "fullScreenToggle" className
* automatically selects the element with the "fullScreenElement" id to be taken fullScreen when a user requests fullScreen

Use
=========
A global object with an API is defined in this script with the normailized names for the fullScreen DOM API.
* requestFullScreen:  function to request an element to go fullScreen (params: an optional node reference deafults to the node with the "fullScreenElement" id attribute)
* cancelFullScreen:   function to cancel fullScreen
* fullscreenchange:   function to add a handler to the normalized fullscreenchange event (params: function and an optional context)
* addEventListener:   function to bind an eventHandler on a node to toggle an element fullScreens state (params: the node, an optional eventName defaulted to "click", an optional node toggle the fullScreen state of defaults to the node with the "fullScreenElement" id attribute)
* fullScreenElement:  undefined or the current element which is fullScreen
* fullScreenEnabled:  boolean indicating support in the current browser
* fullScreen:         boolean value indicating if an elmeent is fullScreen or not

known issues
=========
At this time there's a bug in Chrome for Android which gives a false positive while feature detecting the fullScreen DOM API [go here to star the issue to get it resolved](https://code.google.com/p/chromium/issues/detail?id=180734 "go here to star the issue")
