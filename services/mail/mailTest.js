const mailer = require('./mailer');

mailer({ subject: "testOne", from: "chad@technomancyit.com", to: "chadkoslovsky@gmail.com" }, {
    name: 'emailVerification',
    replace: [
        {server:"Mog Garden"},
        {user: "Chad"}
    ]
});