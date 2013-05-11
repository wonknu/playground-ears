<?php 
header('Content-type: application/json');
?>
{
    "login": {
        "urls": {
            "page":"http://pmagento.dev/index.php/customer/account/login/",
            "success":"http://pmagento.dev/index.php/customer/account/"
        },
        "items":
        [
            {
                "selector":"id",
                "name":"email"
            }
        ]
    },
    "logout": {
        "urls": {
            "page":"http://pmagento.dev/",
            "success":"http://pmagento.dev/index.php/customer/account/logoutSuccess/"
        }
    },
    "taxonomy": {
		"config": {
			"broadcast": false
		},
		"items":
		[
			{
				"url": "/account/",
				"xpath": "//div[@class='block-account']",
				"id": "account"
			},
			{
				"url":"/checkout/",
				"id":"checkout"
			},
			{
				"xpath":"//div[@class='my-wishlist']",
				"id":"wishlist"
			}
		]
	}
}