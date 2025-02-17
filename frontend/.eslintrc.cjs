module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:import/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react-redux/recommended",
		"plugin:prettier/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
		tsconfigRootDir: ".",
		project: ["./tsconfig.json"],
	},
	plugins: ["react", "@typescript-eslint", "react-refresh"],
	settings: {
		"import/resolver": {
			typescript: {
				project: "./tsconfig.json",
			},
		},
		react: {
			version: "18.x",
		},
	},
	rules: {
		"linebreak-style": "off",
		"prettier/prettier": ["error", {}],
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-restricted-types": "error",

		"object-shorthand": "error",
		"no-console": "warn",
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"react/no-unknown-property": ["error", { ignore: ["css"] }],
		"@typescript-eslint/no-misused-promises": [
			2,
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
};
