/**
 * Creates an instance of App.
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
 * @class App
 * 
 * HOW TO USE :
 * Adfab.Playground.App || NS.App
 */

pl.ready(function ()
{
    'use strict';
    
    /**
     * App constructor
     * 
     * @constructor
     * @this {App}
     * @param {null} no params
     * @return {App} this
     */
    function App ()
    {
        return this;
    }
    
    /**
     * Start the App object by using init
     * This method create the namespace used all over the application
     * var NS = Adfab.Playground
     * 
     * @this {App}
     * @param {null} no params
     * @return {null} no return
     */
    App.prototype.init = function ()
    {
        // Namespace
        NS = Adfab.Playground; 
        
        // check api key
        if(NS.Util.not_null(NS.Cache.settings) && NS.Util.not_null(NS.Cache.settings.apiKey)) {
            NS.User.env = _plgd_settings;
            NS.Util.log('APIKEY FOUND = ' + NS.Cache.settings.apiKey);
        }else {
            NS.Util.log('NOT APIKEY FOUND');
            return;
        }
        
        NS.App.easyXDM();
        NS.App.bindEvent();
        NS.User.init();
    };
    
    /**
     * Bind the event to track user move
     * 
     * @this {App}
     * @param {null} no params
     * @return {null} no return
     */
    App.prototype.bindEvent = function ()
    {
        // AJAX
        var xhrListn = new Object();
            xhrListn.open = NS.Cache.xmlhttp.prototype.open;
            xhrListn.send = NS.Cache.xmlhttp.prototype.send;
        
        // Catch all the xhr open event
        NS.Cache.xmlhttp.prototype.open = function (a, b)
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
        NS.Cache.xmlhttp.prototype.send = function (a, b)
        {
            if (!a) var a='';
            if (!b) var b='';
            xhrListn.send.apply(this, arguments);
            if(xhrListn.method.toLowerCase() == 'post') xhrListn.data = a;
        };
        
        // Catch all the load finished event
        NS.Cache.document.onreadystatechange = function (e)
        {
            if(NS.Util.not_null(e.data) && e.data != '') {
                NS.App.send(e.data);
            }
        };
        
        NS.Cache.window.onbeforeunload = function (e)
        {
            NS.User.quit();
            return null;
        };
    };
    
    /**
     * Init easyXDM by calling this method
     * Using easyXDM as RPC mode
     * 
     * @this {App}
     * @param {null} no params
     * @return {null} no return
     */
    App.prototype.easyXDM = function ()
    {
        NS.App.rpc = new easyXDM.Rpc(
        {
            // fallback NameTransport
            local: NS.Cache.protocol + NS.Cache.config.url + "easyXDM/name.html",
            // fallback swf
            swf: NS.Cache.protocol + NS.Cache.config.url + "easyXDM/easyxdm.swf",
            // page to load
            remote: NS.Cache.protocol + NS.Cache.config.url + "index.html"
        },
        {
            remote: {
                request: {}
            }
        });
    };
    
    /**
     * Send a request to easyXDM using RPC with no return
     * 
     * @this {App}
     * @param {string} url of the service
     * @return {Boolean} valid url
     */
    App.prototype.send = function (url)
    {
        var validUrl = NS.Util.isUrlValid(url);
        if(validUrl) {
            var userUrl = NS.Cache.protocol + NS.Cache.config.url + 'send.php?apiKey='
                + NS.Cache.settings.apiKey + '&url=' + url + '&uid=' + NS.User.uid;
            
            NS.Util.log('send url : ' + userUrl);
            
            if(NS.User.isLogged()) {
                userUrl += '&login=' + NS.User.id;
            }
            
            NS.App.rpc.request(
                { 
                    url: userUrl
                },
                function (rpcdata)
                {
                    NS.Util.log(rpcdata);
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
     * User promise NS.App.call('service.php').then(function () {})
     * 
     * @this {App}
     * @param {string} the service name or url part
     * @throws {requestError} service cannot be called
     * @return {null} no return
     */
    App.prototype.call = function (s)
    {
        var promise = new NS.Promise();
        
        NS.Util.log('call service : ' + s);
        
        NS.App.rpc.request(
            {
                url: NS.Cache.protocol + NS.Cache.config.url + s + '?apiKey=' + NS.Cache.settings.apiKey
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