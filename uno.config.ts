// uno.config.ts
import { presetAnu, presetIconExtraProperties } from "anu-vue";
import { presetThemeDefault } from "@anu-vue/preset-theme-default";
import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  rules:[
    ["text-initial",{
      "text-align":"initial"
    }]
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: presetIconExtraProperties,
    }),

    // anu-vue preset
    presetAnu(),

    // default theme preset
    presetThemeDefault(),
  ],
  include: [/.*\/anu-vue\.js(.*)?$/, "./**/*.vue", "./**/*.md"],
});
