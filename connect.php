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
    }
}