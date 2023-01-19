const fs = require('fs');
const BabelCore = require('babel-core');
const cf = require('./filesystem');

const babel = (_jscode, _json, _env) => {
	
	const babelpath = _json.path + _json.babeljs.minified;
	console.log('\nBABEL PROCESS TO \'%s\' STARTED!', babelpath);
	
	let _prst = _env == undefined ? [] : [_env];

	const srcmap = _json.babeljs.sourcemap;
	
	const options = {
		minified : true,
		comments : false,
		code : true,
		presets : _prst,
		sourceMaps : srcmap == null ? null : srcmap,
		sourceFileName : srcmap,
		sourceMapTarget : srcmap
	};
	


	let babel_result = BabelCore.transform(_jscode, options);
	
	let usemap = srcmap == null ? '' : '\n//# sourceMappingURL=' + srcmap;
	

	cf.createfile(babelpath, babel_result.code + usemap);
	
	if(options.sourceMaps != null) {
		let ts = Object.keys(babel_result.map).map((a) =>{ return babel_result.map[a]}).join(' ');		
		cf.createfile(srcmap, JSON.stringify(babel_result.map));
	}
};

exports.babel = babel;