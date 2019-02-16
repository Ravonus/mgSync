var head = new Vue({
    el: '#head',
    data: { 
    page: 'home'
 },
    watch: {
    },
    methods: { 
    dspManage: function (url) {
        $('#dspTable').DataTable().destroy()
        app.dspTableName = url.split('model=')[1].split('&')[0];
        head.pageChange('dspTables');

        $.get(url, function (data) {

            app.dspTable = data;
            app.dspTable.forEach(function (data, index) {

                Object.keys(app.dspTable[index]).forEach(function (key, index2) {

                    if (!app.dspTable[index].watch) {
                        app.dspTable[index].watch = []
                    }

                    app.dspTable[index].watch.push({ edit: false, row: Object.keys(app.dspTable[index])[index2], idName:Object.keys(app.dspTable[index])[0]});

                });

                if (index === app.dspTable.length - 1) {

                    $(document).ready(function () {

                        $('#dspTable').DataTable({
                            "searching": true
                        });
                        $('.dataTables_length').addClass('bs-select');

                    });
                }

            });

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