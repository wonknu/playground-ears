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
                        "xpath": "//input[@id='edit-name']"
                    },
                    "after": {
                        "xpath": "//a[@href='/user/logout']"
                    }
                },
                "action": "login",
                "objects": {
                    "id": "login_id",
                    "properties": [
                        {
                            "name": "username",
                            "xpath": "//input[@id='edit-name']"
                        }
                    ]
                }
            },
            "logout_user" : {
                "events": {
                    "before": {
                        "xpath": "//a[@href='/user/logout']"
                    },
                    "after": {
                        "xpath": "//a[text()='Log in']"
                    }
                },
                "action": "logout"
            },
            "read_article" : {
                "conditions": {
                    "url": "/node/"
                },
                "action": "look",
                "objects": {
                    "id": "article",
                    "properties": [
                        {
                            "name": "title",
                            "xpath": "//h1"
                        }
                    ]
                }
            },
            "read_account" : {
                "conditions": {
                    "url": "/user/"
                },
                "action": "account",
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
                        "url": "/p.magento/",
                        "xpath": "//a[@title='Log In']"
                    }
                },
                "conditions": {
                    "url": "/logoutSuccess/",
                    "xpath": "//a[@title='Log In']"
                },
                "action": "logout"
            },
            "read_wishlist" : {
                "conditions": {
                    "url": "/customer\\/account/"
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
*/ ?>
{
    "library":
    {
        "config": {
            "broadcast": false
        },
        "stories":
        {
            "tips1" : {
                "conditions": {
                    "url": "/customer\\/account/"
                },
                "action": "find",
                "objects": {
                    "id": "tip 1"
                }
            },
            "tips2" : {
                "conditions": {
                    "url": "/customer\\/account\\/edit/"
                },
                "action": "find",
                "objects": {
                    "id": "tip 2"
                }
            },
            "tips3" : {
                "conditions": {
                    "url": "/customer\\/address\\/new/"
                },
                "action": "find",
                "objects": {
                    "id": "tip 3"
                }
            },
            "tips4" : {
                "conditions": {
                    "url": "/sales\\/order\\/history/"
                },
                "action": "find",
                "objects": {
                    "id": "tip 4"
                }
            },
            "tips5" : {
                "conditions": {
                    "url": "/sales\\/billing_agreement/"
                },
                "action": "find",
                "objects": {
                    "id": "tip 5"
                }
            }
        }
    }
}