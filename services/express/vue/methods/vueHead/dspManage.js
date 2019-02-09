object = {
    dspManage: function (url) {
        app.dspTableName = url.split('model=')[1].split('&')[0];
        head.pageChange('dspTables');
        $.get(url, function (data) {

            app.dspTable = data;

        });

    }
}