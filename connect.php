<?php 
header('Content-type: application/json');
?>
{
    "login": {
        "urls": {
            "page":"http://p.magento/index.php/customer/account/login/",
            "success":"http://p.magento/index.php/customer/account/"
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
            "page":"http://p.magento/",
            "success":"http://p.magento/index.php/customer/account/logoutSuccess/"
        }
    }
}