var head = new Vue({
    el: '#head',
    data: { 
    page: 'home'
 },
    watch: {
    },
    methods: { 
    dspManage: function (url) {

        $.get(url, function (data) {

            app.dspTable = data;

        });

    }
,
    pageChange: function(page) {
        this.page = page;
        app.page = page;

        if(( page) === 'logs' ) {
            lLGet('/logList');
            lGet('/logs?type=success');
        }
    }
 },
    end: {
      
    }
  })