fullScreen
==========

A small JavaScript to normalize the fullScreen DOM API cross-browser and adds some other easy things like:
* a way to automatically hide/show content on the page dependent on the fullScreen support
* a way to add handlers to the normalized fullscreenchange event
* automatically add eventHandlers to elements on the page with a "fullScreenToggle" className
* automatically selects the element with the "fullScreenElement" id to be taken fullScreen when a user requests fullScreen

[Demo](http://pm5544.github.io/fullScreen/test.html "demo here!")
Use
=========

simple mode: just add an id to the element you would like to go fullScreen and add classes to the elements you want to show/hide dependent on fullScreen support and the elements you want to use as triggers to go fullScreen.


advanced: A global "fullScreen" object with the following properties is defined in this script which can be used to get a cross-browser normalized fullScreen DOM API.
* requestFullScreen:  function to request an element to go fullScreen (params: an optional node reference deafults to the node with the "fullScreenElement" id attribute)
* cancelFullScreen:   function to cancel fullScreen
* fullscreenchange:   function to add a handler to the normalized fullscreenchange event (params: function and an optional context)
* addEventListener:   function to bind an eventHandler on a node to toggle an element fullScreens state (params: the node, an optional eventName defaulted to "click", an optional node toggle the fullScreen state of defaults to the node with the "fullScreenElement" id attribute)
* fullScreenElement:  undefined or the current element which is fullScreen
* fullScreenEnabled:  boolean indicating support in the current browser
* fullScreen:         boolean value indicating if an elmeent is fullScreen or not

When using the default classNames and id you don't have to have a global object so you could also delete the var = fullScreen part from the beginning of the script.

known issues
=========
Before version 28 there was a bug in Chrome for Android which gave a false positive while feature detecting the fullScreen DOM API [go here to star the issue to get it resolved](https://code.google.com/p/chromium/issues/detail?id=180734 "go here to star the issue")
This has been resolved.
I'm not aware of any other issues.
