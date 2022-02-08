const fs = require("fs");
const readline = require('readline');
module.exports = async (path, callback) => {
	return new Promise(async (resolve) => {
		const fileStream = fs.createReadStream(path);
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity
		});
		for await (const line of rl) {
			// Each line in input.txt will be successively available here as `line`.
			callback(Number(line))
		}
		resolve();
	})

}
