object = {
    dspManage: function (url) {

        $.get(url, function (data) {

            app.dspTable = data;

        });

    }
}