const mailer = require('./mailer');

mailer({ subject: "testOne", from: "admin@mog.garden", to: "chadkoslovsky@gmail.com" }, {
    name: 'emailVerification',
    replace: [
        {server:"Mog Garden"},
        {user: "Chad"}
    ]
});