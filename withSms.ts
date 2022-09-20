import { AndroidConfig, ConfigPlugin } from "@expo/config-plugins";

const withAndroidPermissions: ConfigPlugin = (config) => {
  return AndroidConfig.Permissions.withPermissions(config, [
    "android.permission.READ_SMS",
  ]);
};

export default withAndroidPermissions;
