/**
 * Polyfill dom ready
 * this is the main application file, which one that init project bind event, etc...
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
 * pl.ready(function);
 */

var pl = {
    
    /**
     * Call a method when the dom is ready
     * @param {Function} callback function
     * @return {null} no return
     * @this {Object} pl
     */
    ready : function (fn)
    {
        'use strict';
        
        if(document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn, false);
        }else if(window.addEventListener) {
            window.addEventListener('load', fn, false );
        }else if(document.attachEvent) {
            document.attachEvent('onreadystatechange', fn);
        }else if(window.attachEvent) {
            window.attachEvent('onload', fn);
        }
    }
}