module.exports = (permissions) => {
    return async function (req, res, next) {

        if(!req) return null;

        if (req.routeAccess) return next();
        let compareArray = Functions.permissionArray(permissions);

        let binaryArray = Functions.permissionArray(JSON.parse(req.user).user[0].permissions);
        let found = false;

        await Functions.asyncForEach(Object.keys(compareArray), (key) => {
            if (binaryArray[key]) found = true;
        });

        if (!found) return res.sendStatus(401)

        req.routeAccess = true;

        next();
    }
}
