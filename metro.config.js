const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Ensure sourceExts includes .cjs
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = withNativeWind(defaultConfig, { input: "./app/global.css" });
