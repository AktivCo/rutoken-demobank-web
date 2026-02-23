import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  pluginReact.configs.flat.recommended,
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect" // Automatically detects the React version from node_modules
      }
    },
    rules: {
      "jsx-a11y/interactive-supports-focus": "off",
      "react/no-deprecated": "off",
    },
  },
]);
