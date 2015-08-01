# first create a syntax checker
checker = require 'syntax-error'
# log
winston = require 'winston'
winston.cli()

# sandbox
SBox = require 'sandbox'

header = "
var inputs = { };
var outputs = { };
onmessage = function(message){
  inputs = JSON.parse(message).inputs;
"

src = "
if(inputs[\"age\"] > 18) {
  outputs.age = 18;
} else {
  outputs.age = inputs[\"age\"];
}
console.log(outputs);
"

footer = "
onmessage = undefined;
};"

pre_script = header + src + footer

message =
  inputs:
    age: 30


error = checker pre_script, "pre_query_script"

if error
  winston.error error
else
  winston.info "script syntax check done."

sandbox = new SBox()

sandbox.run pre_script, (outout) ->
  console.log outout
sandbox.postMessage JSON.stringify(message)
