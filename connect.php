<?php 
header('Content-type: application/json');
?>
{
	"login": {
	    "urls": {
	        "page":"http://dropbox.dev/work/playground/login.html",
	        "success":"http://dropbox.dev/work/playground/success.html"
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
	},
	"logout": {
	    "urls": {
	        "page":"http://dropbox.dev/work/playground/logout.html",
	        "success":"http://dropbox.dev/work/playground/login.html"
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
}