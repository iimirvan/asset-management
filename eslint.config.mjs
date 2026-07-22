import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/shared/data-table.tsx"],
    rules: {
      "react-hooks/incompatible-library": "off",
    },
  },
];

export default eslintConfig;
