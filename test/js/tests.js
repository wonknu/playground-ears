pl.ready(function ()
{
    'use strict';
    
    module( "TEST ONLOAD" );
    test( "Playground ready", function ()
    {
        expect( 1 );
        
        ok( true, "pl.ready( FUNCTION ) has been called");
    });

    test( "Namespace", function ()
    {
        expect( 8 );
        
        ok( typeof addToNamespace('Test', {}) === 'object', "Fonction addToNamespace work !");
        
        ok( NS !== null, "namespace exist : 'NS'");
        ok( NS === Adfab.Playground, "NS namespace equal to Adfab.Playground");
        ok( NS.App !== null, "App exist into namespace : 'NS.App'");
        ok( NS.User !== null, "User exist into namespace : 'NS.User'");
        ok( NS.Cache !== null, "Cache exist into namespace : 'NS.Cache'");
        ok( NS.Util !== null, "Util exist into namespace : 'NS.Util'");
        ok( NS.Promise !== null, "Promise exist into namespace : 'NS.Promise'");
    });
    
    module( "TEST CONFIG" );
    test( "show config", function ()
    {
        expect( 4 );
        
        ok( NS.Cache.settings !== null, "Settings exist : \"" + NS.Cache.settings + "\"" );
        ok( NS.Cache.config.apiKey !== null, "API KEY FOUND : \"" + NS.Cache.settings.apiKey + "\"" );
        ok( NS.Cache.settings.apiKey === 'unitest', "API KEY equal to \"unitest\"" );
        ok( NS.Cache.config !== null, "Config exist : \"" + NS.Cache.config + "\"" );
    });
    
    module( "TEST BY CLICK" );
    $('#test-login-user').bind('click', function ()
    {
        var user = prompt("Enter an user name", "usertest");
        
        test( "Check if user is logged", function ()
        {
            NS.User.login(user);
            
            ok( typeof NS.User.isLogged !== "undefined", "NS.User.isLogged");
            ok( NS.Util.readCookie('login') !== null && NS.Util.readCookie('login') !== '', "login cookie created");
            ok( NS.User.isLogged(), "User logged : " + NS.User.isLogged());
            if(NS.User.isLogged()) {
                ok( NS.User.id, "User logged width id \"" + NS.User.id + "\"");
            }else {
                ok( NS.User.uid, "User logged with anonymous id \"" + NS.User.uid + "\"");
            }
        });
    });
    
    $('#test-logout-user').bind('click', function ()
    {
        NS.User.logout();
        
        test( "Check if user is logged out", function ()
        {
            ok(typeof NS.User.isLogged !== "undefined", "NS.User.isLogged");
            ok(NS.Util.readCookie('login') === null || NS.Util.readCookie('login') === '', "login cookie erased");
            ok(!NS.User.isLogged(), "User logged out : " + (!NS.User.isLogged()));
            if(NS.User.isLogged()) {
                ok( NS.User.id, "User logged as " + NS.User.id + " width anonymous id " + NS.User.uid);
            }else {
                ok( NS.User.uid, "User logged as anonymous width id \"" + NS.User.uid + "\"");
            }
        });
    });
    
    $('#test-send-url').bind('click', function ()
    {
        test( "Send URl to the playground", function ()
        {
            ok(NS.App.send(top.location.href), "send \"" + top.location.href + "\" and this is a valid url");
        });
    });
    
    $('#test-load-login').bind('click', function ()
    {
        asyncTest( "Send load service login", function ()
        {
            NS.User.data = {};
            NS.User.loadLogin();
            
            setTimeout(function ()
            {
                var isOnPage;
                
                ok( NS.User.data !== null && NS.User.data !== {}, "JSON loaded successfully");
                ok( NS.User.data.urls.page, "Page : " + NS.User.data.urls.page);
                isOnPage = NS.Util.matchUrl(NS.User.data.urls.page);
                ok( NS.User.data.urls.page, "User is on login page : " + isOnPage);
                
                ok( NS.User.data.urls.success, "Success : " + NS.User.data.urls.success);
                isOnPage = NS.Util.matchUrl(NS.User.data.urls.success);
                ok( NS.User.data.urls.success, "User is on login success page : " + isOnPage);
                
                start();
            }, 1000);
        });
    });
    
    $('#test-load-logout').bind('click', function ()
    {
        asyncTest( "Send load service logout", function ()
        {
            NS.User.data = {};
            NS.User.loadLogout();
            
            setTimeout(function ()
            {
                var isOnPage;
                
                ok( NS.User.data !== null && NS.User.data !== {}, "JSON loaded successfully");
                ok( NS.User.data.urls.page, "Page : " + NS.User.data.urls.page);
                isOnPage = NS.Util.matchUrl(NS.User.data.urls.page);
                ok( NS.User.data.urls.page, "User is on logout page : " + isOnPage);
                
                ok( NS.User.data.urls.success, "Success : " + NS.User.data.urls.success);
                isOnPage = NS.Util.matchUrl(NS.User.data.urls.success);
                ok( NS.User.data.urls.success, "User is on logout success page : " + isOnPage);
                
                start();
            }, 1000);
        });
    });
    
    $('#test-quit-url').bind('click', function ()
    {
        NS.User.quit();
        test( "User quit page", function ()
        {
            ok(NS.Util.readCookie('prev-url') !== null && NS.Util.readCookie('prev-url') !== '', "User " + NS.User.uid + " left url " + NS.Util.readCookie('prev-url'));
            if(!NS.User.isLogged()) {
                ok(NS.Util.readCookie('login-try') !== null && NS.Util.readCookie('login-try') === '', "Cookie login-try exist");
            }else {
                ok(NS.Util.readCookie('logout-try') !== null && NS.Util.readCookie('logout-try') === 'logout', "Cookie logout-try exist");
            }
        });
    });
});