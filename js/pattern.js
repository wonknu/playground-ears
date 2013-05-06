/**
 * List off pattern that can be used by the appliation
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
 * @class promise
 * 
 * HOW TO USE :
 * Adfab.Playground.Promise || NS.Promise
 */

pl.ready(function ()
{
    'use strict';
    
    /**
     * Implémentation du pattern promise
     * @constructor
     * @param {null} no params
     * @return {null} no return
     * @this {Object} promise
     */
    var promise = function ()
    {
        'use strict';
    };
    
    promise.prototype = {
        pending:null,
        
        /**
         * function called by other with 2 method
         * @param {Function} success callback
         * @param {Function} failure callback
         * @return {object} this
         * @this {object} promise
         */
        then: function (success, failure)
        {
            'use strict';
            
            this.pending = { resolve: success, reject: failure };
            return this;
        },
        
        /**
         * never call this method, use then (success, failure)
         * @param {object} value
         * @return {null} no return
         * @this {object} promise
         */
        resolve: function (value)
        {
            'use strict';
            
            this.pending.resolve(value);
        },
        
        /**
         * never call this method, use then (success, failure)
         * @param {object} value
         * @return {null} no return
         * @this {object} promise
         */
        reject: function (error)
        {
            'use strict';
            
            this.pending.reject(error);
        }
    };
    
    // put the promise into Adfab.Playground.Promise
    try {
        addToNamespace('Promise', promise);
    }catch(e) {
       throw new Error( "Cannot extends 'Promise' to 'Adfab.playground.Promise'" );
    }
});