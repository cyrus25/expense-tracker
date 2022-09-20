"use strict";
exports.__esModule = true;
var config_plugins_1 = require("@expo/config-plugins");
var withAndroidPermissions = function (config) {
    return config_plugins_1.AndroidConfig.Permissions.withPermissions(config, [
        "android.permission.READ_SMS",
    ]);
};
exports["default"] = withAndroidPermissions;
