var inputs = { };
var outputs = { };
onmessage = function(message){
  inputs = JSON.parse(message).inputs;
