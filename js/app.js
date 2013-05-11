/**
 * this is the main application file, which one that init project bind event, etc...
 * Copyright (C) 2013 - Adfab - nicolas labb�
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
	 * @namespace reference to Adfab.Playground.App object
	 */
	
    /** App Object
     * @class
     * @name PG.App
     */
    function App ()
    {
        return this;
    }
    
    /**
     * Start the App object by using init
     * This method create the namespace used all over the application
     * @function
     * 
     * @name PG.App.init
     * 
     * @param {null} no params
     * @return {null} no return
     * 
     * @this {App}
     * 
     * @ignore
     * 
     * @since version 1.0.0
     */
    App.prototype.init = function ()
    {
        // Namespace
        PG = Adfab.Playground; 
        
        // check api key
        if(PG.Util.not_null(PG.Cache.settings) && PG.Util.not_null(PG.Cache.settings.apiKey)) {
            PG.User.env = _plgd_settings;
            PG.Util.log('APIKEY FOUND = ' + PG.Cache.settings.apiKey);
        }else {
            PG.Util.log('NOT APIKEY FOUND');
            return;
        }
        
        PG.App.easyXDM();
        PG.App.bindEvent();
        PG.User.init();
    };
    
    /**
     * Bind the event to track user move
     * @function
     * 
     * @name PG.App.bindEvent
     * 
     * @param {null} no params
     * @return {null} no return
     * 
     * @this {App}
     * 
     * @ignore
     * 
     * @since version 1.0.0
     */
    App.prototype.bindEvent = function ()
    {
        // AJAX
        var xhrListn = new Object();
            xhrListn.open = PG.Cache.xmlhttp.prototype.open;
            xhrListn.send = PG.Cache.xmlhttp.prototype.send;
        
        // Catch all the xhr open event
        PG.Cache.xmlhttp.prototype.open = function (a, b)
        {
            if (!a) var a='';
            if (!b) var b='';
            
            xhrListn.open.apply(this, arguments);
            xhrListn.method = a;  
            xhrListn.url = b;
            if (a.toLowerCase() == 'get') {
                xhrListn.data = b.split('?');
                xhrListn.data = xhrListn.data[1];
            }
        };
        
        // Catch all the xhr send event
        PG.Cache.xmlhttp.prototype.send = function (a, b)
        {
            if (!a) var a='';
            if (!b) var b='';
            xhrListn.send.apply(this, arguments);
            if(xhrListn.method.toLowerCase() == 'post') xhrListn.data = a;
        };
        
        // Catch all the load finished event
        PG.Cache.document.onreadystatechange = function (e)
        {
            if(PG.Util.not_null(e.data) && e.data != '') {
                PG.App.send(e.data);
            }
        };
        
        PG.Cache.window.onbeforeunload = function (e)
        {
            PG.User.quit();
            return null;
        };
    };
    
    /**
     * Init easyXDM by calling this method
     * Using easyXDM as RPC mode
     * @function
     * 
     * @name PG.App.easyXDM
     * 
     * @param {null} no params
     * @return {null} no return
     * 
     * @this {App}
     * 
     * @ignore
     * 
     * @since version 1.0.0
     */
    App.prototype.easyXDM = function ()
    {
        PG.App.rpc = new easyXDM.Rpc(
        {
            // fallback NameTransport
            local: PG.Cache.protocol + PG.Cache.config.env[PG.Cache.config.mode].url + "easyXDM/name.html",
            // fallback swf
            swf: PG.Cache.protocol + PG.Cache.config.env[PG.Cache.config.mode].url + "easyXDM/easyxdm.swf",
            // page to load
            remote: PG.Cache.protocol + PG.Cache.config.env[PG.Cache.config.mode].url + "index.html"
        },
        {
            remote: {
                request: {}
            }
        });
    };
    
    /**
     * Send a request to easyXDM using RPC with no return
     * @function
     * 
     * @name PG.App.send
     * 
     * @param {string} url of the service
     * @return {Boolean} valid url
     * 
     * @this {App}
     * 
     * @example
     * PG.App.send( {String} url)
     * 
     * @since version 1.0.0
     */
    App.prototype.send = function (url)
    {
        var validUrl = PG.Util.isUrlValid(url);
        if(validUrl) {
            var userUrl = PG.Cache.protocol + PG.Cache.config.env[PG.Cache.config.mode].url + PG.Cache.config.send + '?apiKey='
                + PG.Cache.settings.apiKey + '&url=' + url + '&uid=' + PG.User.uid;
            
            PG.Util.log('send url : ' + userUrl);
            
            if(PG.User.isLogged()) {
                userUrl += '&login=' + PG.User.id;
            }
            
            PG.App.rpc.request(
                { 
                    url: userUrl
                },
                function (rpcdata)
                {
                    PG.Util.log(rpcdata);
                },
                function (error)
                {
                    throw 'Api Error, code : ' + error.code + ', msg : ' + error.message;
                }
            );
        }
        return validUrl;
    }; 
    
    /**
     * Send a request to easyXDM using RPC waiting for a json return
     * @function
     * 
     * @name PG.App.call
     * 
     * @param {string} serviceName
     * @return {Object} promise
     * 
     * @this {App}
     * 
     * @throws {requestError} service cannot be called
     * 
     * @example
     * PG.App.call( {String} service )
     * .then( {Function} callback)
     * 
     * @since version 1.0.0
     */
    App.prototype.call = function (s)
    {
        var promise = new PG.Promise();
        
        PG.Util.log('call service : ' + s);
        
        PG.App.rpc.request(
            {
                url: PG.Cache.protocol + PG.Cache.config.env[PG.Cache.config.mode].url + s + '?apiKey=' + PG.Cache.settings.apiKey
            },
            function (rpcdata)
            {
                promise.resolve(easyXDM.getJSONObject().parse(rpcdata.data));
            },
            function (error)
            {
                throw 'Api Error, code : ' + error.code + ', msg : ' + error.message;
            }
        );
        
        return promise;
    };
    
    // create App instance
    var app = new App();
    
    // put the instance of App into the namespace Adfab.Playground.App
    try {
        addToNamespace('App', app);
    }catch(e) {
       throw new Error( "Cannot extends 'app' to 'Adfab.playground.App'" );
    }
    
    // Let's start over there
    app.init();
});