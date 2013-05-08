/**
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
 */

pl.ready(function ()
{
	/**
	 * Cache Object
	 * @class
     * @name NS.Cache
	 */
    cache = {
		/**
		 * @name  NS.Cache.window
		 * @constant NS.Cache.window
		 * @type Object
		 */
        window: window,
		/**
		 * @name  NS.Cache.document
		 * @constant NS.Cache.document 
		 * @type Object
		 */
        document: document,
		/**
		 * @name  NS.Cache.xmlhttp
		 * @constant NS.Cache.xmlhttp 
		 * @type Object
		 */
        xmlhttp: window.XMLHttpRequest,
		/** Protocol used in current page (http | https)
		 * @name  NS.Cache.protocol
		 * @constant NS.Cache.protocol 
		 * @type String
		 */
        protocol: ('https:' == document.location.protocol ? 'https://' : 'http://'),
		/** isTouchDevice tell if the current user is a mobile device
		 * @name  NS.Cache.isTouchDevice
		 * @constant NS.Cache.isTouchDevice
		 * @type boolean
		 */
        isTouchDevice: (!!('ontouchstart' in window) || !!('onmsgesturechange' in window)),
		/** clickEvent used in the application can be touch event if mobile user
		 * @name  NS.Cache.clickEvent
		 * @constant NS.Cache.clickEvent 
		 * @type Object
		 */
        clickEvent: (!!('ontouchstart' in window) || !!('onmsgesturechange' in window)) ? 'touchstart' : 'click',
		/** config create from "pl_config" variable
		 * @name  NS.Cache.config
		 * @constant NS.Cache.config 
		 * @type Object
		 */
        config: pl_config,
		/** config create from "_plgd_settings" variable
		 * @name  NS.Cache.settings
		 * @constant NS.Cache.settings 
		 * @type Object
		 */
        settings: _plgd_settings,
		/** check if localstorage is available in the current device
		 * @name  NS.Cache.localstorage
		 * @constant NS.Cache.localstorage 
		 * @type boolean
		 */
        localstorage: ((typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') ? false : true)
    };
    
    // put the cache into Adfab.Playground.Cache
    try {
        addToNamespace('Cache', cache);
    }catch(e) {
       throw new Error( "Cannot extends 'cache' to 'Adfab.playground.Cache'" );
    }
});