<?php 
header('Content-type: application/json');
?>
<?php /*
{
    "library":
    {
        "config": {
            "broadcast": false
        },
        "stories":
        {
            "login_user" : {
                "events": {
                    "before": {
                        "url": "/customer\\/account\\/login/",
                        "xpath": "//a[@title='Log In']"
                    },
                    "after": {
                        "url": "/customer\\/account/",
                        "xpath": "//a[@title='Log Out']"
                    }
                },
                "conditions": {
                    "url": "/customer\\/account\\/login/",
                    "xpath": "//input[@id='email']"
                },
                "action": "login",
                "objects": {
                    "id": "login_id",
                    "properties": [
                        {
                            "name": "email",
                            "xpath": "//input[@id='email']"
                        },
                        {
                            "name": "email2",
                            "xpath": "//input[@id='email2']"
                        }
                    ]
                }
            },
            "logout_user" : {
                "events": {
                    "before": {
                        "url": "/p.magento/",
                        "xpath": "//a[@title='Log Out']"
                    },
                    "after": {
                        "url": "/logoutSuccess/",
                        "xpath": "//a[@title='Log In']"
                    }
                },
                "conditions": {
                    "url": "/customer\\/account\\/logoutSuccess/",
                    "xpath": "//a[@title='Log In']"
                },
                "action": "logout"
            },
            "read_wishlist" : {
                "conditions": {
                    "url": "/node/"
                },
                "action": "look",
                "objects": {
                    "id": "page",
                    "properties": [
                        {
                            "name": "title",
                            "xpath": "//h1"
                        }
                    ]
                }
            },
            "check_wishlist" : {
                "conditions": {
                    "url": "/node/"
                },
                "action": "check",
                "objects": {
                    "id": "page",
                    "properties": [
                        {
                            "name": "title",
                            "xpath": "//div[@id='block-block-1']//h2"
                        }
                    ]
                }
            }
        }
    }
}
<?php /*
*/
?>
{
    "library":
    {
        "config": {
            "broadcast": false
        },
        "stories":
        {
            "login_user" : {
                "events": {
                    "before": {
                        "url": "/customer\\/account\\/login/",
                        "xpath": "//a[@title='Log In']"
                    },
                    "after": {
                        "url": "/customer\\/account/",
                        "xpath": "//a[@title='Log Out']"
                    }
                },
                "conditions": {
                    "url": "/customer\\/account\\/login/",
                    "xpath": "//input[@id='email']"
                },
                "action": "login",
                "objects": {
                    "id": "login_id",
                    "properties": [
                        {
                            "name": "email",
                            "xpath": "//input[@id='email']"
                        },
                        {
                            "name": "email2",
                            "xpath": "//input[@id='email2']"
                        }
                    ]
                }
            },
            "logout_user" : {
                "events": {
                    "before": {
                        "url": "/p.magento/",
                        "xpath": "//a[@title='Log Out']"
                    },
                    "after": {
                        "url": "/logoutSuccess/",
                        "xpath": "//a[@title='Log In']"
                    }
                },
                "conditions": {
                    "url": "/customer\\/account\\/logoutSuccess/",
                    "xpath": "//a[@title='Log In']"
                },
                "action": "logout"
            },
            "read_wishlist" : {
                "conditions": {
                    "url": "/wishlist/"
                },
                "action": "look",
                "objects": {
                    "id": "page",
                    "properties": [
                        {
                            "name": "title",
                            "xpath": "//h1"
                        }
                    ]
                }
            }
        }
    }
}