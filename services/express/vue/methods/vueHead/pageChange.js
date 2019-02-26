object = {
    pageChange: function (page) {

        $('#dtBasicExample').DataTable().destroy()
        $('#dspTable_wrapper').remove()
        this.page = page;
        app.page = page;

        if ((page) === 'logs') {
            lLGet('/logList');
            lGet('/logs?type=success');
        }

        if ((page) === 'statistics') {
            lLGet('/dspList');
        } else {

            $('.plot-container').empty();
        }
    }


}