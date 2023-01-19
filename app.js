const fs = require('fs');
const Ugly3 = require('./ugly3');
const Babel = require('./babel');

const paramfile = process.argv[2];
if(!fs.existsSync(paramfile)) {
	console.log('FILE NOT FOUND!');	
	return;
}
const jsjson = require(paramfile);


const jsCollector = (_jsc) => {
	
	let _js = [];
	for (let _i in _jsc.jsfiles) {
		const lnkf = jsjson.path + _jsc.jsfiles[_i];

		if(fs.existsSync(lnkf)) {
			//console.log('Find file: %s', lnkf);
			_js.push(fs.readFileSync(lnkf, 'utf-8'));	
		}
		else {
			console.log('File not found: %s', lnkf);
		}		
		
	}
	return _js.join('\n');
}


async function pack() {
	await Babel.babel(jsCollector(jsjson.babeljs), jsjson, null);
	
	await Ugly3.ugly(jsCollector(jsjson.uglifyjs), jsjson);
}
  
pack();
