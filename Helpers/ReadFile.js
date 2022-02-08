const fs = require("fs");
module.exports = async (path) => {
	return new Promise((resolve) => {
		fs.readFile(path, 'utf8',(err, data) => {
			if (err) throw err;
			resolve(data);
		});
	})

}
