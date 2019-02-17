object = {
    remSession: function (value) {
        if (app.firstAsk) {
            app.reRun = app.remSession;
            app.reRunValue = value;
            app.firstAsk = false;
            $('#areYouSure').modal('show');
        } else {
            deleteItem('/dspDelete', {model: app.dspTableName, where:{accid:app.reRunValue}})
            $('#areYouSure').modal('hide');
        }

    }

}