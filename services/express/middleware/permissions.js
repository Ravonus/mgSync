module.exports = (permissions) => {
    return async function (req, res, next) {
        let compareArray = Functions.permissionArray(permissions);
        let binaryArray = Functions.permissionArray(JSON.parse(req.user).user[0].permissions);
        let found = false;

        await Functions.asyncForEach(Object.keys(compareArray), (key) => {
            if (binaryArray[key]) found = true;
        });

        console.log(binaryArray, compareArray)

        if (!found) return res.sendStatus(401)

        next();

    }
}
