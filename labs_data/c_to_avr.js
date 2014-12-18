var child_process = require('child_process')
var exec = child_process.exec
var path = require('path')
var fs = require('fs')


var source_code_path = process.argv[2]

to_output('')

to_output(
	'avr-gcc: ' +
	execSync("avr-gcc -mmcu=atmega64 -I. -gdwarf-2 -DF_CPU=8000000UL -Os -o '/tmp/source.o' '" + source_code_path + "'")
)
to_output(
	'avr-objcopy: ' +
	execSync("avr-objcopy -O ihex '/tmp/source.o' '/tmp/source.hex'")
)
to_output(
	'flasher: ' +
	execSync("sudo 'labs_data/avr_flasher' -file='/tmp/source.hex'")
)

console.log(to_output.what)


function to_output(to_add) {
	if (!to_output.what) to_output.what = ''
	to_output.what += to_add + '<br>'
}
 
function execSync(command) {
	child_process.exec(command + ' 2>&1 1>"/tmp/output" && echo done! > "/tmp/done"')

	while (!fs.existsSync('/tmp/done')) {}

	var output = fs.readFileSync('/tmp/output')

	fs.unlinkSync('/tmp/output')
	fs.unlinkSync('/tmp/done')

	return output
}