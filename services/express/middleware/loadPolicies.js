module.exports = (policies) => {
    return function(req, res, next) {
        console.log(policies);
        next();
      }
}
