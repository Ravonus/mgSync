object = {
    pageChange: function(page) {
        $('#dtBasicExample').DataTable().destroy()
        this.page = page;
        app.page = page;

        if(( page) === 'logs' ) {
            lLGet('/logList');
            lGet('/logs?type=success');
        }

        if((page) === 'statistics' ) {
            lLGet('/dspList');
  //          dLGet('/dspstatistics?name=DSGame-server');
        }
    }

    
}