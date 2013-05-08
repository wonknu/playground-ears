/**
 * Utilities object
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
    'use strict';
    
	/**
	 * @namespace reference to Adfab.Playground.Util object
	 */
	
    /** Util Object
     * @class
     * @name NS.Util
     */
    var util = {
        
        /**
         * Check if a variable is null
	     * @function
         * 
	     * @name NS.Util.not_null
	     * 
         * @param {Object} object DOM object
         * @return {boolean} bool true or false
	     * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.not_null( Object | String | ... )
	     * 
	     * @since version 1.0.0
         */
        not_null: function (obj)
        {
            'use strict';
            
            return ((obj != null) ? ((typeof(obj) != 'undefined') ? ((obj !== '') ? true : false) : false) : false);
        },
        
        /**
         * Return the content of the given tag
	     * @function
         * 
	     * @name NS.Util.getValueFromObject
	     * 
         * @param {Object} DOM Object
         * @return {String} value
	     * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.getValueFromObject( Object | String | ... )
	     * 
	     * @since version 1.0.0
         */
        getValueFromObject: function (obj)
        {
            'use strict';
            
            var value = '';
            if(NS.Util.not_null(obj) && typeof obj == 'object' && obj.type != undefined) {
                if(obj.value != undefined) {
                    value = obj.value;
                }else if(obj.innerHTML != undefined) {
                    value = obj.innerHTML;
                }
            }
            return value;
        },
        
        /**
         * Create a cookie under Adfab.Playground.[ name ]
	     * @function
	     * 
	     * @name NS.Util.createCookie
	     * 
         * @param {String} name
         * @param {String} value
         * @param {Number} [number] of days (optional)
         * @return {null} no return
         * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.createCookie( {String} name, {String} value, [ {Number} days ])
	     * 
	     * @since version 1.0.0
         */
        createCookie: function (name, value, days)
        {
            'use strict';
            
            // if localstorage enabled
            if(NS.Cache.localstorage) {
            	localStorage.setItem(NS.Cache.config.ns + '.' + name, value);
        	// if localstorage not enable use cookies as polyfill
            }else {
	            if (days) {
	                var date = new Date();
	                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	                var expires = "; expires=" + date.toGMTString();
	            }
	            else var expires = "";
	            document.cookie = NS.Cache.config.ns + '.' + name + "=" + encodeURIComponent(value) + expires + "; path=/";
            }
        },
        
        /**
         * Get value of a cookie
	     * @function
	     * 
	     * @name NS.Util.readCookie
	     * 
         * @param {String} name
         * @return {String} | {null} value of the cookie
         * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.readCookie( {String} name)
	     * 
	     * @since version 1.0.0
         */
        readCookie: function (name)
        {
            'use strict';
            
            // if localstorage enabled
            if(NS.Cache.localstorage) {
            	return localStorage.getItem(NS.Cache.config.ns + '.' + name);
        	// if localstorage not enable use cookies as polyfill
            }else {
	            var nameEQ = NS.Cache.config.ns + '.' + name + "=",
	                ca = document.cookie.split(';'),
	                i = 0,
	                c = '';
	                
	            for(i = 0; i < ca.length; i++) {
	                c = ca[i];
	                while (c.charAt(0)==' ') c = c.substring(1,c.length);
	                    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	            }
			}
            return null;
        },
        
        /**
         * Delete a cookie
	     * @function
	     * 
	     * @name NS.Util.eraseCookie
	     * 
         * @param {String} name
         * @return {null} no return
         * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.readCookie( {String} name)
	     * 
	     * @since version 1.0.0
         */
        eraseCookie: function (name)
        {
            'use strict';
            
            // if localstorage enabled
            if(NS.Cache.localstorage) {
            	return localStorage.removeItem(NS.Cache.config.ns + '.' + name);
        	// if localstorage not enable use cookies as polyfill
            }else {
	            var expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT';
	            document.cookie = NS.Cache.config.ns + '.' + name + "=''; " + expires + "; path=/";
			}
        },
        
        /**
         * Tell if input URL match current URL
	     * @function
	     * 
	     * @name NS.Util.matchUrl
	     * 
         * @param {String} url
         * @return {Boolean} bool true or false
         * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.matchUrl( {String} url)
	     * 
	     * @since version 1.0.0
         */
        matchUrl: function (url)
        {
            'use strict';
            return (top.location.href.indexOf(url) >= 0) ? true : false;
        },
        
        /**
         * Tell if input URL is a good url to watch
         * We need to exclude playground URL
	     * @function
	     * 
         * @param {String} url
         * @return {Boolean} bool true or false
         * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.isUrlValid( {String} url)
	     * 
	     * @since version 1.0.0
         */
        isUrlValid: function (url)
        {
            'use strict';
            return (NS.Cache.config.url.indexOf(url) >= 0) ? false : true;
        },
        
        /**
         * log string if NS.Cache.Config.debug allow it
	     * @function
	     * 
	     * @name NS.Util.log
	     * 
         * @param {Object} str
         * @return {null}
         * 
	     * @this {Util}
	     * 
	     * @example
	     * NS.Util.log( {String} str)
	     * 
	     * @since version 1.0.0
         */
        log: function (str)
        {
            if(NS.Cache.config.debug) {
                console.log("%c> PLAYGROUND DEBUG ::", "color:blue; font-weight:bold;")
                console.log(str)
            }
        },
       
       /**
        * get dom element from object.selector and object.name
	    * @function
	    * 
	    * @name NS.Util.getDomElemntFromItem
	    * 
        * @param {Object} item object with variable
        * @param item.selector type of the DOM element
        * @param item.name id or class of the DOM element
        * @return {Object} obj DOM object
        * 
	    * @this {Util}
	    * 
	    * @example
	    * NS.Util.getDomElemntFromItem( {String} it)
	    * 
	    * @since version 1.0.0
        */
       getDomElemntFromItem: function (it)
       {
            var obj = null,
                o;
           
            if(it.selector === 'id') {
                obj = document.getElementById(it.name);
            }else if(it.selector === 'class') {
                obj = document.getElementsByClassName(it.name);
                if(obj !== null && obj.length > 0) {
                    obj = obj[0];
                }
            }
           
            return obj;
       }
    };
    
    // put the util into Adfab.Playground.Util
    try {
        addToNamespace('Util', util);
    }catch(e) {
       throw new Error( "Cannot extends 'Util' to 'Adfab.playground.Util'" );
    } 
});