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
    'use strict';
    
    /** User Object
     * @class
     * @name PG.User
     */
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
         * Init the user object
         * @function
	     * 
	     * @name PG.User.init
	     * 
         * @param {null}
         * @return {null}
	     * 
	     * @this {User}
	     * 
	     * @ignore
	     * 
	     * @since version 1.0.0
         */ 
        init: function ()
        {
            PG.User.GenerateUniqueId();
            PG.User.urls.prev = PG.Util.readCookie('prev-url');
            
            var authent = PG.Util.readCookie('authent');
            if(!PG.Util.not_null(authent)) {
            	PG.User.loadAuthent()
            	.then(function ()
            	{
                	PG.User.checkUser();
            	});
            }else {
                PG.User.data = JSON.parse(PG.Util.readCookie('authent'));
            	PG.User.checkUser();
            }
        },
        
        /**
         * check on cookie if user is logged
         * @function
	     * 
	     * @name PG.User.isLogged
	     * 
         * @param {null} 
         * @return {Boolean} bool true or false
	     * 
	     * @this {User}
	     * 
	     * @example
	     * PG.User.isLogged()
	     * 
	     * @since version 1.0.0
         */
        isLogged: function ()
        {
            var l;
            if(PG.User.id === '' || PG.User.id === null) {
                // check
                PG.User.id = PG.Util.readCookie('login');
            }
            l = (PG.Util.not_null(PG.User.id)) ? true : false;
            PG.Util.log('isLogged : ' + l);
            return l;
        },
        
        /**
         * Call service to get json data of logout user method
         * put the return into PG.User.data
         * then call bindLogout
         * @function
	     * 
	     * @name PG.User.loadAuthent
	     * 
         * @param {null}
         * @return {Object} promise
	     * 
	     * @this {User}
	     * 
	     * @ignore
	     * 
	     * @since version 1.0.0
         */
        loadAuthent: function ()
        {
        	var p = new PG.Promise();
        	
            PG.App.call( PG.Cache.config.connect )
            .then(
                function (data)
                {
                    PG.User.data = data;
                    PG.Util.createCookie('authent', JSON.stringify(data));
                	p.resolve();
                }
            );
            
            return p;
        },
        
        /**
         * Check if the user is logged, logout, or tried to login/logout 
         * @function
	     * 
	     * @name PG.User.checkUser
	     * 
         * @param {null}
         * @return {null}
	     * 
	     * @this {User}
	     * 
	     * @ignore
	     * 
	     * @since version 1.0.0
         */
        checkUser: function ()
        {
            if(PG.Util.not_null(PG.Util.readCookie('logout-try'))
                && PG.Util.matchUrl(PG.User.data.logout.urls.success)) { // USER TRIED TO LOUGOUT
                //PG.User.bindLogout();
                if(PG.User.checkEvidences(PG.User.data.logout.evidences)) {
                	// IS OUT
                	PG.User.logout();
                }
            }else if(PG.Util.not_null(PG.Util.readCookie('login-try'))
                && PG.Util.matchUrl(PG.User.data.login.urls.success)) { // USER TRIED TO LOGIN
                //PG.User.bindLogin();
                if(PG.User.checkEvidences(PG.User.data.login.evidences)) {
                	// IS IN
                	PG.User.login(PG.Util.readCookie('login-try'));
                }else {
                	PG.Util.eraseCookie('login-try')
                }
            }else if(PG.Util.not_null(PG.Util.readCookie('login'))) { // USER IS ALREADY LOGGED
                //PG.User.bindLogout();
                PG.User.login(PG.Util.readCookie('login'));
            }else { // USER IS LOGGED OUT
                PG.User.logout();
            }
        },
         
        /**
         * Set the login for current user if param {String} not null
         * call loadLogout to track logout since the user is logged
         * then return the login
         * @function
	     * 
	     * @name PG.User.login
	     * 
         * @param {String} str (optional) if not set just return the login
         * @return {String} PG.User.data.id
	     * 
	     * @this {User}
	     * 
	     * @example
	     * PG.User.login( {String} username )
	     * 
	     * @since version 1.0.0
         */
        login: function (str)
        {
            PG.Util.log('Login "' + str + '"');
            if(str !== null) {
            	PG.Util.eraseCookie('login-try')
                PG.User.id = str;
                PG.Util.createCookie('login', str); 
                
                // so bind logout
                if(!PG.Util.not_null(PG.User.data.urls)) {
                    //PG.User.loadLogout();
                }
                PG.App.send(top.location.href);
            }
            
            return PG.User.data.id;
        },
        
        /**
         * force logout user, then call loadLogin since user is logged out
         * @function
	     * 
	     * @name PG.User.logout
	     * 
         * @param {null} 
         * @return {null}
	     * 
	     * @this {User}
	     * 
	     * @example
	     * PG.User.logout()
	     * 
	     * @since version 1.0.0
         */
        logout: function ()
        {
            PG.Util.log('User is out');
            PG.Util.eraseCookie('logout-try');
            PG.Util.eraseCookie('login');
            PG.User.id = null;
            PG.App.send(top.location.href);
        },
        
        /**
         * Generate unique id for anonymous user
         * @function
         * 
	     * @name PG.User.GenerateUniqueId
	     * 
         * @param {null}
         * @return {String} id
	     * 
	     * @this {User}
	     * 
	     * @example
	     * PG.User.GenerateUniqueId()
	     * 
	     * @since version 1.0.0
         */
        GenerateUniqueId: function ()
        {
            var uui = PG.Util.readCookie('unique-id');
            if(!PG.Util.not_null(uui)) {
                uui = 'body_' + new Date().getTime();
                PG.Util.createCookie('unique-id', uui);
            }
            PG.User.uid = uui;
            return uui;
        },
        
        /**
         * Check evidences for current user.evidences object
         * @function
         * 
	     * @name PG.User.checkEvidences
	     * 
         * @param {null}
         * @return {Boolean} result true | false
	     * 
	     * @this {User}
	     * 
	     * @ignore
	     * 
	     * @since version 1.0.0
         */
        checkEvidences: function (evidences)
        {
            var obj = null,
                evidencesOk = true,
                it;
            
            for(it in evidences) {
                if(evidences[it].selector === 'id') {
                    obj = document.getElementById(evidences[it].name);
                }else if(PG.User.data.evidences[it].selector === 'class') {
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
         * @function
         * 
	     * @name PG.User.quit
	     * 
         * @param {null}
         * @return {null}
	     * 
	     * @this {User}
	     * 
	     * @ignore
	     * 
	     * @since version 1.0.0
         */
        quit: function ()
        { 
            var it,
                id = '';
            
            PG.Util.createCookie('prev-url', top.location.href);
        	
            if(PG.Util.not_null(PG.User.data.login) && PG.Util.not_null(PG.User.data.logout)) {
           		// check user is on login page 
            	if(!PG.User.isLogged() && PG.Util.matchUrl(PG.User.data.login.urls.page)) {
                    for(it in PG.User.data.login.items) {
                        if(typeof PG.User.data.login.items[it] === 'object') {
                            id += (id !== '') ? ':' : '';
                            id += PG.Util.getValueFromObject(
                                PG.Util.getDomElemntFromItem(PG.User.data.login.items[it])
                            );
                        }
                    }
                	PG.Util.createCookie('login-try', id);
           	 	// check user is on logout page
                }else if(PG.Util.matchUrl(PG.User.data.logout.urls.page)) {
                	PG.Util.createCookie('logout-try', 'logout');
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