var child_process = require('child_process')
var exec = child_process.exec
var path = require('path')
var fs = require('fs')


var source_code_path = process.argv[2]
var file_without_extension = path.basename(source_code_path, path.extname(source_code_path))

to_output('')

to_output(
	'sdcc: ' +
	execSync("labs_data/run_sdcc '" + source_code_path + "' '/tmp/'")
)
to_output(
	'hexbin: ' +
	execSync("labs_data/hexbin '/tmp/" + file_without_extension + ".ihx'")
)
to_output(
	'loader: ' +
	execSync("sudo labs_data/loader /tmp/ddb.bin")
)

console.log(to_output.what)


function to_output(to_add) {
	if (!to_output.what) to_output.what = ''
	to_output.what += to_add + '<br>'
}
 
function execSync(command) {
	child_process.exec(command + ' 2>&1 1>"output" && echo done! > "done"')

	while (!fs.existsSync('done')) {}

	var output = fs.readFileSync('output')

	fs.unlinkSync('output')
	fs.unlinkSync('done')

	return output
}