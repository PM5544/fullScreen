/*
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
*/

var fullScreen = ( function ( doc, body, undefined ) {
    var prefixes                = [ "ms", "o", "", "webkit", "moz" ],
        nodeAPIs                = [ "request_" ],
        docAPIs                 = [ "cancel_" ,"_element", "_enabled", "_", "is_" ],
        fullScreenVariants      = [ "fullscreen", "fullScreen" ],

        slice                   = Array.prototype.slice,

        // internal object to keep a mapping of the noramlized API name and the browser supported string for that API member
        supported               = {},

        // ok jumping though hoops to account for the differences in casing of the supported API's
        caseConversion          = {
            fullscreenenabled:      "fullScreenEnabled",
            fullscreenelement:      "fullScreenElement",
            requestfullscreen:      "requestFullScreen",
            cancelfullscreen:       "cancelFullScreen",
            fullscreen:             "fullScreen",
            isfullscreen:           "fullScreen"
        },

        // array of functions to call when a fullscreenchange event fires, add them by using fullScreen.addEventListener with the function and an optional context
        handlers                = [],

        // some local vars initialized as undefined untill needed
        api, len, prefix, supportedPrefix
    ;

    // make returning a placeholder object for the API DRY since it can be returned in more stages of execution of this script
    function noSupport () {
        body.className += "fullSreenNotEnabled";
        return {
            requestFullScreen:  Function.prototype,
            cancelFullScreen:   Function.prototype,
            fullscreenchange:   Function.prototype,
            addEventListener:   Function.prototype,
            fullScreenElement:  undefined,
            fullScreenEnabled:  false,
            fullScreen:         false
        };
    }

    // some easy tests to rule out the really old browsers
    if ( !Array.prototype.forEach || !doc.querySelector ) {
        return noSupport();
    }

    // ok old shit is ruled out, let's proceed to check for the supported DOM API's

    // util function to glue two strings together and capitalize the second string, some local cache for the capitalized strings
    var glue = ( function () {
        var capitalizedCacheObject = {};

        return function ( glue1, glue2 ) {

            if ( !capitalizedCacheObject[ glue2 ] ) {
                capitalizedCacheObject[  glue2 ] = "" + glue2.substring( 0, 1 ).toUpperCase() + glue2.substring( 1 );
            }

            if ( glue1.length ) {
                return glue1 + capitalizedCacheObject[ glue2 ];
            }

            return glue2;
        };
    } ) ();

    // util function to replace the underscore in the strings from the values in the nodeAPI and docAPI objects
    function replace_ ( ) {
        var arg         = slice.call( arguments ),
            returnArray = [],
            str         = arg[ 0 ],
            inFront     = "_" === str[ 0 ]
        ;

        arg[ 1 ].forEach( function ( el ) {
            if ( inFront ) {
                returnArray.push( glue( el, str.replace( "_", "" ) ) );
            } else {
                returnArray.push( glue( str.replace( "_", "" ), el ) );
            }
        } );

        return returnArray;
    }


    // function to check for support for all prefixes in the prefixes array
    function checkSupport () {
        var docAPINames = [],
            nodeAPINames = [],
            foundSupport = false
        ;

        docAPIs.forEach( function ( docAPI ) {
            // ok jumping though hoops to account for the differences in casing of the supported API's
            docAPINames = docAPINames.concat( replace_( docAPI, fullScreenVariants ) );
        } );

        docAPINames.forEach( function ( docAPIName ) {
            var str = glue( prefix, docAPIName );
            if ( undefined !== doc[ str ] ) {
                // ok jumping though hoops to account for the differences in casing of the supported API's
                supported[ caseConversion[ docAPIName.toLowerCase() ] ] = str;
                foundSupport = true;
            }
        } );

        nodeAPIs.forEach( function ( docAPI ) {
            // ok jumping though hoops to account for the differences in casing of the supported API's
            nodeAPINames = nodeAPINames.concat( replace_( docAPI, fullScreenVariants ) );
        } );
        nodeAPINames.forEach( function ( nodeAPIName ) {
            var str = glue( prefix, nodeAPIName );
            if ( undefined !== body[ str ] ) {
                // ok jumping though hoops to account for the differences in casing of the supported API's
                supported[ caseConversion[ nodeAPIName.toLowerCase() ] ] = str;
                foundSupport = true;
            }
        } );

        return foundSupport;
    }


    // check for supported api, do a type check to be able to check the falsy "" value as wel
    len = prefixes.length;
    // do a while loop to be able to break when a supported prefix is found
    while ( ( prefix = prefixes[ --len] ) ) {
        if ( checkSupport( prefix ) ) {
            supportedPrefix = prefix;
            break;
        }
    }

    // fail when no support is found
    if ( !supported.fullScreenEnabled ) {
        return noSupport();
    }


    // ok were pretty certain we have fullScreen support so we setup the eventHandlers and such


    api = {
        requestFullScreen: function ( node ) {
            ( node || fullScreenElement )[ supported.requestFullScreen ]();
        },
        cancelFullScreen: function ( node ) {
            doc[ supported.cancelFullScreen ]();
        },
        fullScreenElement: undefined,
        fullScreenEnabled: true,
        fullScreen: false,

        fullscreenchange: function ( fn, context ) {
            handlers.push( [ fn, context ] );
        },
        addEventListener: function ( node, _event, _element ) {

            var event, element;

            if ( !node ) {
                return;
            }

            event = _event || "click";
            element = _element || document.body;

            node.addEventListener( event, function () {
                if ( !api.fullScreen ) {
                    api.requestFullScreen( element );
                } else {
                    api.cancelFullScreen();
                }
            } );
        }
    };


    // add the event to toggle the property in the api object to indicate the state of fullScreen and execute any possible handlers
    doc.addEventListener(
        supportedPrefix + "fullscreenchange",
        function ( e ) {
            api.fullScreenElement = doc[ supported.fullScreenElement ];
            api.fullScreen = !!api.fullScreenElement;

            // loop over the hanlders to execute them all
            handlers.forEach( function ( ar ) {
                ar[ 0 ].call( ar[ 1 ] || window, api.fullScreen );
            } );
        }
    );

    // add the className to the html element to be able to change the elements styling in CSS
    document.documentElement.classList.add( "fullScreenEnabled" );

    // one element per page can be set to fullScreen automatically, if another node is needed just pass a reference to the node into fullScreen.requestFullScreen
    var fullScreenElement = doc.querySelector( "#fullScreenElement" );

    // automatically add the click event to the elements with the "fullScreenToggle" className
    slice.call( doc.querySelectorAll( ".fullScreenToggle" ) ).forEach( function ( elem ) {
        api.addEventListener( elem );
    } );

    return api;

} ) ( document, document.body );
