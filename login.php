<?php 
header('Content-type: application/json');

if($_REQUEST['apiKey'] == 'unitest'): ?>
{
    "urls": {
        "page":"http",
        "success":"http"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"edit-first-name"
        },
        {
            "selector":"class",
            "name":"edit-last-name"
        },
        {
            "selector":"id",
            "name":"edit-mail"
        },
        {
            "selector":"id",
            "name":"edit-age"
        }
    ],
    "evidences": 
    [
        {
            "selector":"id",
            "name":"logout"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '1'): ?>
{
    "urls": {
        "page":"http://localhost/Dropbox/work/playground/login.html",
        "success":"http://localhost/Dropbox/work/playground/success.html"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"edit-first-name"
        },
        {
            "selector":"class",
            "name":"edit-last-name"
        },
        {
            "selector":"id",
            "name":"edit-mail"
        },
        {
            "selector":"id",
            "name":"edit-age"
        }
    ],
    "evidences": 
    [
        {
            "selector":"id",
            "name":"logout"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '2'): ?>

{
    "urls": {
        "page":"http://drupal.dev/",
        "success":"http://drupal.dev/"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"edit-name"
        }
    ],
    "evidences": 
    [
        {
            "selector":"id",
            "name":"toolbar-home"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '3'): ?>

{
    "urls": {
        "page":"http://betcfer.dev/wp-login.php",
        "success":"http://betcfer.dev/wp-admin/"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"user_login"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '4'): ?>

{
    "urls": {
        "page":"http://off.dev/wp-login.php",
        "success":"http://off.dev/wp-admin"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"user_login"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '5'): ?>

{
    "urls": {
        "page":"http://localhost/wordpress/wp-login.php",
        "success":"http://localhost/wordpress/wp-admin"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"user_login"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '6'): ?>

{
    "urls": {
        "page":"http://dropbox.dev/",
        "success":"http://dropbox.dev/work/playground/fb-connect.html"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"edit-first-name"
        },
        {
            "selector":"class",
            "name":"edit-last-name"
        },
        {
            "selector":"id",
            "name":"edit-mail"
        },
        {
            "selector":"id",
            "name":"edit-age"
        }
    ],
    "evidences": 
    [
        {
            "selector":"class",
            "name":"fb-like"
        }
    ]
}
<?php endif; ?>