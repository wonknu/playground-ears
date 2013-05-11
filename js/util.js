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
     * @name PG.Util
     */
    var util = {
        
        /** 
         * Check if a variable is null
	     * @function 
         * 
	     * @name PG.Util.not_null
	     * 
         * @param {Object} object DOM object
         * @return {boolean} bool true or false  
	     * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.not_null( Object | String | ... )
	     * 
	     * @since version 1.0.0
         */
        not_null: function (obj)
        {
            'use strict';
            
            return ((obj != null) ? ((typeof(obj) != 'undefined') ? ((obj !== '') ? true : false) : false) : false);
        },
        
        /** 
         * Return true if xpath is found
	     * @function 
         * 
	     * @name PG.Util.not_null
	     * 
         * @param {String} xpath 
         * @return {boolean} bool true or false  
	     * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.checkXpath( {String} xpath )
	     * 
	     * @since version 1.0.0
         */
        checkXpath: function (xpath)
        {
        	var result = document.evaluate(
	        		xpath,
	        		document.documentElement,
	        		null,
	        		XPathResult.ORDERED_NODE_ITERATOR_TYPE,
					null
				),
				cpt = 0;
				
				if (result) {
				    var node = result.iterateNext();
				    while(node) {
				        cpt++;
				        node = result.iterateNext();
				    }
				}
				return (cpt > 0) ? true : false;
        },
        
        /**
         * Return the content of the given tag
	     * @function
         * 
	     * @name PG.Util.getValueFromObject
	     * 
         * @param {Object} DOM Object
         * @return {String} value
	     * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.getValueFromObject( Object | String | ... )
	     * 
	     * @since version 1.0.0
         */
        getValueFromObject: function (obj)
        {
            'use strict';
            
            var value = '';
            if(PG.Util.not_null(obj) && typeof obj == 'object' && obj.type != undefined) {
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
	     * @name PG.Util.createCookie
	     * 
         * @param {String} name
         * @param {String} value
         * @param {Number} [number] of days (optional)
         * @return {null} no return
         * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.createCookie( {String} name, {String} value, [ {Number} days ])
	     * 
	     * @since version 1.0.0
         */
        createCookie: function (name, value, days)
        {
            'use strict';
            
            // if localstorage enabled
            if(PG.Cache.localstorage) {
            	localStorage.setItem(PG.Cache.config.ns + '.' + name, value);
        	// if localstorage not enable use cookies as polyfill
            }else {
	            if (days) {
	                var date = new Date();
	                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	                var expires = "; expires=" + date.toGMTString();
	            }
	            else var expires = "";
	            document.cookie = PG.Cache.config.ns + '.' + name + "=" + encodeURIComponent(value) + expires + "; path=/";
            }
        },
        
        /**
         * Get value of a cookie
	     * @function
	     * 
	     * @name PG.Util.readCookie
	     * 
         * @param {String} name
         * @return {String} | {null} value of the cookie
         * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.readCookie( {String} name)
	     * 
	     * @since version 1.0.0
         */
        readCookie: function (name)
        {
            'use strict';
            
            // if localstorage enabled
            if(PG.Cache.localstorage) {
            	return localStorage.getItem(PG.Cache.config.ns + '.' + name);
        	// if localstorage not enable use cookies as polyfill
            }else {
	            var nameEQ = PG.Cache.config.ns + '.' + name + "=",
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
	     * @name PG.Util.eraseCookie
	     * 
         * @param {String} name
         * @return {null} no return
         * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.readCookie( {String} name)
	     * 
	     * @since version 1.0.0
         */
        eraseCookie: function (name)
        {
            'use strict';
            
            // if localstorage enabled
            if(PG.Cache.localstorage) {
            	return localStorage.removeItem(PG.Cache.config.ns + '.' + name);
        	// if localstorage not enable use cookies as polyfill
            }else {
	            var expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT';
	            document.cookie = PG.Cache.config.ns + '.' + name + "=''; " + expires + "; path=/";
			}
        },
        
        /**
         * Tell if input URL match current URL
	     * @function
	     * 
	     * @name PG.Util.matchUrl
	     * 
         * @param {String} url
         * @return {Boolean} bool true or false
         * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.matchUrl( {String} url)
	     * 
	     * @since version 1.0.0
         */
        matchUrl: function (url)
        {
            'use strict';
            try {
	            url = eval(url);
	            return (url.test(top.location.href));
            }catch (e) {
            	return false;
            }
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
	     * PG.Util.isUrlValid( {String} url)
	     * 
	     * @since version 1.0.0
         */
        isUrlValid: function (url)
        {
            'use strict';
            return (PG.Cache.config.env[PG.Cache.config.mode].url.indexOf(url) >= 0) ? false : true;
        },
        
        /**
         * log string if PG.Cache.Config.debug allow it
	     * @function
	     * 
	     * @name PG.Util.log
	     * 
         * @param {Object} str
         * @return {null}
         * 
	     * @this {Util}
	     * 
	     * @example
	     * PG.Util.log( {String} str)
	     * 
	     * @since version 1.0.0
         */
        log: function (str)
        {
            if(PG.Cache.config.debug) {
                console.log("%c> PLAYGROUND DEBUG ::", "color:blue; font-weight:bold;")
                console.log(str)
            }
        },
       
       /**
        * get dom element from object.selector and object.name
	    * @function
	    * 
	    * @name PG.Util.getDomElemntFromItem
	    * 
        * @param {Object} item object with variable
        * @param item.selector type of the DOM element
        * @param item.name id or class of the DOM element
        * @return {Object} obj DOM object
        * 
	    * @this {Util}
	    * 
	    * @example
	    * PG.Util.getDomElemntFromItem( {String} it)
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
		},
       
       /**
        * polyfill function to trigger custom event
	    * @function
	    * 
	    * @name PG.Util.fireEvtd
	    * 
        * @param {String} name of the event
        * @param {Object} dom element to trigger the event (use window)
        * @param {Object} data send to the event handler
        * @return {null}
        * 
	    * @this {Util}
	    * 
	    * @example
	    * PG.Util.fireEvt( {String} name, {Object} window, {Object} data)
	    * 
	    * @since version 1.0.0
        */
		fireEvt: function (type, obj, data)
		{ 
			if(window.dispatchEvent) {
				var event = document.createEvent('Event');
				event.initEvent(type, true, true);
				event.data = data;
				obj.dispatchEvent(event);
			}else if(window.fireEvent) {
	        	obj.fireEvent(type);
			}
		}
    };
    
    // put the util into Adfab.Playground.Util
    try {
        addToNamespace('Util', util);
    }catch(e) {
       throw new Error( "Cannot extends 'Util' to 'Adfab.playground.Util'" );
    } 
});