const fs = require('fs');
const path = require('path');

const UglifyJS = require('uglify-js');
const cf = require('./filesystem');

const ugly = (_jscode, _json, _preserve = []) => {
	
	const root = _json.path;
	_json = _json.uglifyjs;

	const minfile = root + _json.minified;
	const mapfile = root + _json.sourcemap;

	console.log('RECOMPILE TO \'%s\' STARTED!',minfile);	
	


	const options = {
		output: {
			beautify: false
		},
		sourceMap : {
			filename: minfile,
			url: _json.sourcemap == null ? null : path.basename(mapfile)
		},
		compress: true,
		mangle: {
			toplevel: true,
			reserved : _preserve
		},	
		nameCache: null,
		ie8: false,
		warnings: false
	};	
	

	let uglified_result = UglifyJS.minify({'file.js' : _jscode}, options);
	console.log('ERRORS: %s', uglified_result.error == null ? 'no' : '\n' + JSON.stringify(uglified_result.error));
	console.log('WARNINGS: %s', uglified_result.warnings == null ? 'no' : '\n' + JSON.stringify(uglified_result.warnings));	
	
	if(uglified_result.error != null) {
		console.log('Recompiling canceled!');
		return
	}
	
	
	//fs.writeFileSync(_json.minified, uglified_result.code, 'utf-8');
	cf.createfile(minfile, uglified_result.code);
	
	if(options.sourceMap != null) {
		//fs.writeFileSync(_json.sourcemap, uglified_result.map, 'utf-8');
		cf.createfile(mapfile, uglified_result.map);
	}
	
	// remove babel file
	//
	let sourcefile = root + _json.jsfiles[_json.jsfiles.length - 1];
	
	console.log(sourcefile);
	
	if(sourcefile != undefined && fs.existsSync(sourcefile)) {		
		console.log('REMOVE TEMPORARY FILE \'%s\'', sourcefile);
		fs.unlinkSync(sourcefile);
	}
	

};

exports.ugly = ugly;