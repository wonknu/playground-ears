<?php 
header('Content-type: application/json');

if($_REQUEST['apiKey'] == 'unitest') : ?>
{
    "urls": {
        "page":"http",
        "success":"http"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"logout"
        }
    ],
    "evidences": 
    [
        {
            "selector":"id",
            "name":"edit-first-name"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '2') : ?>
{
    "urls": {
        "page":"http://localhost/Dropbox/work/playground/logout.html",
        "success":"http://localhost/Dropbox/work/playground/login.html"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"logout"
        }
    ],
    "evidences": 
    [
        {
            "selector":"id",
            "name":"edit-first-name"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '2') : ?>
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
            "name":"block-user-login"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '3') : ?>
{
    "urls": {
        "page":"http://betcfer.dev/",
        "success":"http://betcfer.dev/wp-login.php?loggedout=true"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"wp-admin-bar-logout"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '4') : ?>
{
    "urls": {
        "page":"http://off.dev/",
        "success":"http://off.dev/wp-login.php?loggedout=true"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"wp-admin-bar-logout"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '5') : ?>
{
    "urls": {
        "page":"http://localhost/wordpress/",
        "success":"http://localhost/wordpress/wp-login.php?loggedout=true"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"wp-admin-bar-logout"
        }
    ]
}
<?php elseif($_REQUEST['apiKey'] == '6') : ?>
{
    "urls": {
        "page":"http://dropbox.dev/",
        "success":"http://dropbox.dev/"
    },
    "items":
    [
        {
            "selector":"id",
            "name":"wp-admin-bar-logout"
        }
    ]
}
<?php endif; ?>