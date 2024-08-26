import { fileURLToPath } from "node:url";

import antfu, {
  defaultPluginRenaming,
  renameRules,
} from "@antfu/eslint-config";
import { includeIgnoreFile } from "@eslint/compat";
import eslintConfigPrettier from "eslint-config-prettier";
import path from "pathe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prettierignore = path.resolve(__dirname, ".prettierignore");

export default antfu(
  {
    react: true,
    stylistic: false,
  },
  includeIgnoreFile(prettierignore),
  {
    ...eslintConfigPrettier,
    rules: renameRules(eslintConfigPrettier.rules, defaultPluginRenaming),
  },
);
