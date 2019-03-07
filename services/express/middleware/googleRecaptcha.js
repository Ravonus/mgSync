var request = require('request');


module.exports = () => {

    return async function (req, res, next) {

        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
        }
        var secretKey = config.express.recaptchaSiteSecret;
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        request(verificationUrl, function (error, response, body) {
            body = JSON.parse(body);
            if (body.success !== undefined && !body.success) {
                return res.status(401).send(JSON.stringify({ "responseCode": 1, "responseDesc": "Failed captcha verification" }));
            }
            return next();
        });
    }
}