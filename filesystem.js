var fs = require('fs');

const createFile = (_file, _content) => {
	fs.writeFileSync(_file , _content, 'utf-8', (_err) => {
		if(_err) {
			throw _err;
			console.log(_err);
			return;
		}
	});
	console.log('FILE \'%s\' CREATED', _file);
}

exports.createfile = createFile;