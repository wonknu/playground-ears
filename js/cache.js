/**
 * Creates an object named "cache" to get const when create
 * Copyright (C) 2013 - Adfab - nicolas labbé 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *  
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * HOW TO USE :
 * Adfab.Playground.Cache || NS.cache
 * 
 * NS.cache.window 
 * NS.cache.document
 * NS.cache.xmlhttp
 * NS.cache.protocol
 * NS.cache.isTouchDevice
 * NS.cache.clickEvent
 * NS.cache.config
 * NS.cache.settings
 */

pl.ready(function ()
{
    // create simple object 
    cache = {
        window: window,
        document: document, 
        xmlhttp: window.XMLHttpRequest,
        protocol: ('https:' == document.location.protocol ? 'https://' : 'http://'),
        isTouchDevice: (!!('ontouchstart' in window) || !!('onmsgesturechange' in window)),
        clickEvent: (!!('ontouchstart' in window) || !!('onmsgesturechange' in window)) ? 'touchstart' : 'click',
        config: pl_config,
        settings: _plgd_settings,
        localstorage: ((typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') ? false : true)
    };
    
    // put the cache into Adfab.Playground.Cache
    try {
        addToNamespace('Cache', cache);
    }catch(e) {
       throw new Error( "Cannot extends 'cache' to 'Adfab.playground.Cache'" );
    }
});