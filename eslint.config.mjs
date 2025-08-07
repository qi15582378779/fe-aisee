import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 禁用未使用变量的警告
      "@typescript-eslint/no-unused-vars": "off",
      // 禁用 React Hook 依赖项警告
      "react-hooks/exhaustive-deps": "off",
      // 禁用 Next.js 图片元素警告
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
