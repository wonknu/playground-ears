/**
 * Create a user object
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
 * Adfab.Playground.User || NS.User
 */

pl.ready(function ()
{
    'use strict';
    
    var user = {
        
        env: { },
        id: null,
        uid: null,
        data: { },
        urls: {
            current: top.location.href,
            prev: null
        },
        
        /**
         * @contructor
         * @param {null} no param
         * @return {null} no return
         * @this {Object} User
         */ 
        init: function ()
        {
            NS.User.GenerateUniqueId();
            NS.User.urls.prev = NS.Util.readCookie('prev-url');
            
            var authent = NS.Util.readCookie('authent');
            if(!NS.Util.not_null(authent)) {
            	NS.User.loadAuthent()
            	.then(function ()
            	{
                	NS.User.checkUser();
            	});
            }else {
                NS.User.data = JSON.parse(NS.Util.readCookie('authent'));
            	NS.User.checkUser();
            }
        },
        
        /**
         * check on cookie if user is logged
         * @param {null} no param
         * @return {Boolean} true or false
         */
        isLogged: function ()
        {
            var l;
            if(NS.User.id === '' || NS.User.id === null) {
                // check
                NS.User.id = NS.Util.readCookie('login');
            }
            l = (NS.Util.not_null(NS.User.id)) ? true : false;
            NS.Util.log('isLogged : ' + l);
            return l;
        },
        
        /**
         * Call service to get json data of logout user method
         * put the return into NS.User.data
         * then call bindLogout
         * @param {null} no param
         * @return {null} no return
         * @this {Object} User
         */
        loadAuthent: function ()
        {
        	var p = new NS.Promise();
        	
            NS.App.call('connect.php')
            .then(
                function (data)
                {
                    NS.User.data = data;
                    NS.Util.createCookie('authent', JSON.stringify(data));
                	p.resolve();
                    //NS.User.bindLogout();
                }
            );
            
            return p;
        },
        
        checkUser: function ()
        {
            if(NS.Util.not_null(NS.Util.readCookie('logout-try'))) { // USER TRIED TO LOUGOUT
                //NS.User.bindLogout();
                if(NS.User.checkEvidences(NS.User.data.logout.evidences)) {
                	// IS OUT
                	NS.User.logout();
                }
            }else if(NS.Util.not_null(NS.Util.readCookie('login-try'))) { // USER TRIED TO LOGIN
                //NS.User.bindLogin();
                if(NS.User.checkEvidences(NS.User.data.login.evidences)) {
                	// IS IN
                	NS.User.login(NS.Util.readCookie('login-try'));
                }else {
                	NS.Util.eraseCookie('login-try')
                }
            }else if(NS.Util.not_null(NS.Util.readCookie('login'))) { // USER IS ALREADY LOGGED
                //NS.User.bindLogout();
                NS.User.login(NS.Util.readCookie('login'));
            }else { // USER IS LOGGED OUT
                NS.User.logout();
            }
        },
         
        /**
         * Set the login for current user if param {String} not null
         * call loadLogout to track logout since the user is logged
         * then return the login
         * @param {String} str (optional) if not set juste return the login
         * @return {String} NS.User.data.login
         * @this {Object} User
         */
        login: function (str)
        {
            NS.Util.log('Login "' + str + '"');
            if(str !== null) {
            	NS.Util.eraseCookie('login-try')
                NS.User.id = str;
                NS.Util.createCookie('login', str); 
                
                // so bind logout
                if(!NS.Util.not_null(NS.User.data.urls)) {
                    //NS.User.loadLogout();
                }
                NS.App.send(top.location.href);
            }
            
            return NS.User.data.id;
        },
        
        /**
         * force logout user, then call loadLogin since user is logged out
         * @param {null} no param
         * @return {null} no return
         * @this {Object} User
         */
        logout: function ()
        {
            NS.Util.log('User is out');
            NS.Util.eraseCookie('logout-try');
            NS.Util.eraseCookie('login');
            NS.User.id = null;
            NS.App.send(top.location.href);
            
            // so bind login
            // NS.User.loadLogin();
        },
        
        /**
         * Generate unique id for anonymous user
         * @param {null} no param
         * @return {String} the id
         * @this {Object} User
         */
        GenerateUniqueId: function ()
        {
            var uui = NS.Util.readCookie('unique-id');
            if(!NS.Util.not_null(uui)) {
                uui = 'body_' + new Date().getTime();
                NS.Util.createCookie('unique-id', uui);
            }
            NS.User.uid = uui;
            return uui;
        },
        
        /**
         * Check evidences for current user.evidences object
         * @param {null} no param
         * @return {Boolean} result of the checking
         * @this {Object} User
         */
        checkEvidences: function (evidences)
        {
            var obj = null,
                evidencesOk = true,
                it;
            
            for(it in evidences) {
                if(evidences[it].selector === 'id') {
                    obj = document.getElementById(evidences[it].name);
                }else if(NS.User.data.evidences[it].selector === 'class') {
                    obj = document.getElementsByClassName(evidences[it].name);
                }
                if(obj === null) {
                    evidencesOk = false;
                }
            }
            
            return evidencesOk;
        },
        
        /**
         * Call this method when user quit the current to check if try to logout/login
         * make cookies 'login-try' and 'logout-try'
         * @param {null} no param
         * @return {null} no return
         * @this {Object} User
         */
        quit: function ()
        { 
            var it,
                id = '';
            
            NS.Util.createCookie('prev-url', top.location.href);
        	
            if(NS.Util.not_null(NS.User.data.login) && NS.Util.not_null(NS.User.data.logout)) {
           		// check user is on login page 
            	if(!NS.User.isLogged() && NS.Util.matchUrl(NS.User.data.login.urls.page)) {
                    for(it in NS.User.data.login.items) {
                        id += (id !== '') ? ':' : '';
                        id += NS.Util.getValueFromObject(
                            NS.Util.getDomElemntFromItem(NS.User.data.login.items[it])
                        );
                    }
                	NS.Util.createCookie('login-try', id);
           	 	// check user is on logout page
                }else if(NS.Util.matchUrl(NS.User.data.logout.urls.page)) {
                	NS.Util.createCookie('logout-try', 'logout');
                }
            }
        }
    };
    
    // put the user into Adfab.Playground.User
    try {
        addToNamespace('User', user);
    }catch(e) {
       throw new Error( "Cannot extends 'User' to 'Adfab.playground.User'" );
    }
});