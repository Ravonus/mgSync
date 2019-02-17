const defaultGateway = require('default-gateway');
function gateway() {
  return new Promise(async (resolve) => {
    defaultGateway.v4().then(result => {
      resolve(result.gateway)
    });
  })
}

module.exports = gateway;