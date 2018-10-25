module.exports = {
	
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module"
	  },
	  "plugins": ["fp"],
	  "extends": ["plugin:prettier/recommended",
	   "plugin:fp/recommended"],
	  "env": {
		"browser": false,
		"node": true,
		"es6": true
		
	  },
	  "rules": {
	//   "no-console": 0,
   	// 	 "no-template-curly-in-string": 2,
	// 	"no-unsafe-negation": 2,
	// 	"curly": 2,
	// 	"eqeqeq": 2,
	// 	"guard-for-in": 0,
	// 	"no-caller": 2,
	// 	"no-eq-null": 2,
	// 	"no-eval": 2,
	// 	"no-multi-spaces": 1,
	// 	"no-new": 0,
	// 	"no-unused-expressions": [2, {
	// 	  "allowShortCircuit": true,
	// 	  "allowTernary": true
	// 	}],
	// 	"wrap-iife": 0,
	// 	"yoda": 2,
	// 	"no-undef": 2,
			"fp/no-nil": 0,
		 "fp/no-unused-expression": 0,
		 "fp/no-mutation": ["error", {
			"commonjs": true,
			"allowThis": true,
			"exceptions": [
			  {"object": "res", "property": "statusCode"},
			  {"object": "req", "property": "ondata"},
			  {"object": "req", "property": "onend"},
			]
		  }]
	// 	"no-use-before-define": [2, "nofunc"],
	// 	"arrow-body-style": 2,
	// 	"arrow-parens": [2, "as-needed"],
	// 	"arrow-spacing": 2,
	// 	"generator-star-spacing": 2,
	// 	"no-confusing-arrow": [2, {
	// 	  "allowParens": true
	// 	}],
	// 	"no-useless-computed-key": 2,
	// 	"no-var": 2,
	// 	"object-shorthand": 0,
	// 	"prefer-arrow-callback": 1,
	// 	"prefer-template": 0,
	// 	"rest-spread-spacing": 2,
	// 	"symbol-description": 2,
	// 	"template-curly-spacing": 2,
	// 	"yield-star-spacing": 2 
	  }
};