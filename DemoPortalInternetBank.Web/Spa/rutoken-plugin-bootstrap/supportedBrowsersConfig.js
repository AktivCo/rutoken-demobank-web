const supportedBrowsers = {
    "desktop":
    {
        "Windows":
        {
            "Internet Explorer": {
                "extensionCheck": false,
                "versions": [
                    {
                        "browserSupportedVersions": ">10",
                        "pluginVersion": "4.3.0.0",
                    },
                    {
                        "browserSupportedVersions": ">10",
                        "pluginVersion": "4.2.0.0",
                    }
                ],
            },
            "Opera": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">15",
                        "pluginVersion": "4.3.0.0"
                    },
                    {
                        "browserSupportedVersions": ">15",
                        "pluginVersion": "4.2.0.0"
                    }
                ],
            },
            "Microsoft Edge": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">10",
                        "pluginVersion": "4.3.0.0",
                    }
                ],
            },
            "Firefox": {
                "extensionCheck": false,
                "versions": [
                    {
                        "browserSupportedVersions": ">52",
                        "pluginVersion": "4.3.0.0"
                    },
                    {
                        "browserSupportedVersions": ">52",
                        "pluginVersion": "4.2.0.0"
                    }
                ],
            },
            "Chrome": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">50",
                        "pluginVersion": "4.3.0.0",
                    },
                    {
                        "browserSupportedVersions": ">50",
                        "pluginVersion": "4.2.0.0",
                    }
                ],
            },
            "Yandex Browser": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">1",
                        "pluginVersion": "4.3.0.0"
                    },
                    {
                        "browserSupportedVersions": ">1",
                        "pluginVersion": "4.2.0.0",
                    }
                ],
            },
            "SputnikBrowser": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">3",
                        "pluginVersion": "4.3.0.0"
                    },
                    {
                        "browserSupportedVersions": ">3",
                        "pluginVersion": "4.2.0.0"
                    }
                ]
            },
            "Vivaldi": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">2",
                        "pluginVersion": "4.3.0.0",
                    }
                ],
            },
        },
        "macOS":
        {
            "Opera": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">15",
                        "pluginVersion": "4.3.0.0",
                    }
                ],
            },
            "Firefox": {
                "extensionCheck": false,
                "versions": [
                    {
                        "browserSupportedVersions": ">51",
                        "pluginVersion": "4.3.0.0",
                    },
                    {
                        "browserSupportedVersions": ">51",
                        "pluginVersion": "4.2.0.0",
                    }
                ],
            },
            "Chrome": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">50",
                        "pluginVersion": "4.3.0.0",
                    }
                ],
            },

            "Yandex Browser": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">1",
                        "pluginVersion": "4.3.0.0",
                    }
                ]
            },
        },
        "Linux":
        {
            "Firefox": {
                "extensionCheck": false,
                "versions": [
                    {
                        "browserSupportedVersions": ">50",
                        "pluginVersion": "4.3.0.0",
                    },
                    {
                        "browserSupportedVersions": ">50",
                        "pluginVersion": "4.2.0.0",
                    }
                ],
            },

            "Opera": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">15",
                        "pluginVersion": "4.3.3.0"
                    }
                ],
            },
            "Chrome": {
                "extensionCheck": true,
                "versions": [
                    {
                        "browserSupportedVersions": ">50",
                        "pluginVersion": "4.3.3.0",
                    }
                ]
            }
        }
    }
}

export default supportedBrowsers;