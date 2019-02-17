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
                if (Array.isArray(app.dspTable)) {
                app.dspTable.forEach(function (data, index) {

                    if (app.dspTableName === 'Accounts_Sessions') {
                        data.server_addr = head.reverseArray(head.intToIP(data.server_addr).split('.')).join('.')
                        data.client_addr = head.intToIP(data.client_addr);
                    }

                    Object.keys(app.dspTable[index]).forEach(function (key, index2) {

                        if (!app.dspTable[index].watch) {
                            app.dspTable[index].watch = []
                        }

                        app.dspTable[index].watch.push({ edit: false, row: Object.keys(app.dspTable[index])[index2], idName: Object.keys(app.dspTable[index])[0] });

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

            }

        });

    },
    dspConf: function() {
        head.pageChange('dspConf');
        getDspConf();
    },
    reverseArray: function (arr) {
        var newArray = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            newArray.push(arr[i]);
        }
        return newArray;
    },

    intToIP: function (int) {
        var part1 = int & 255;
        var part2 = ((int >> 8) & 255);
        var part3 = ((int >> 16) & 255);
        var part4 = ((int >> 24) & 255);

        return part4 + "." + part3 + "." + part2 + "." + part1;
    }
,
    pageChange: function(page) {

        $('#dtBasicExample').DataTable().destroy()
        $('#dspTable_wrapper').remove()
        this.page = page;
        app.page = page;

        if(( page) === 'logs' ) {
            lLGet('/logList');
            lGet('/logs?type=success');
        }

        if((page) === 'statistics' ) {
            lLGet('/dspList');
  //          dLGet('/dspstatistics?name=DSGame-server');
        } else {

        $('.plot-container').empty();
        }
    }

    
 },
    
    end: {
      
    }
  })