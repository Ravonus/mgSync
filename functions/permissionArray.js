function permArray(num){
    var binaries = num.toString(2);
var binaryArray = {}
for (i = 1; i <= binaries.length; i++) {

  var binary = binaries.substr(binaries.length - i);
  var boolean = !!+binary.charAt(0);
  if (boolean) {

    var number = '1'.padEnd(i, '0');

    binaryArray[parseInt(number, 2)] = true;

  }

  if (i === binaries.length) {

    return binaryArray;

  }
}

return binaryArray;

}

module.exports = permArray;