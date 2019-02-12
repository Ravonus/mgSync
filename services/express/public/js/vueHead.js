var head = new Vue({
    el: '#head',
    data: { 
    page: 'home'
 },
    watch: {
    },
    methods: { 
    dspManage: function (url) {
        app.dspTableName = url.split('model=')[1].split('&')[0];
        head.pageChange('dspTables');
        $.get(url, function (data) {

            app.dspTable = data;

        });

    }
,
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

    
 },
    end: {
      
    }
  })