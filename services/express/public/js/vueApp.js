var app = new Vue({
    el: '#app',
    data: { 
    dspTable: {},
    dspExec: [],
    dspTableName: ''
,
    logs: {},
    logList: []
,
    page: 'home'
 },
    watch: {
    },
    methods: { 
  logSelect: function(log) {
      lGet('/logs?type='+log.target.value);
  }
,
    statisticSelect: function(exec) {
    //    lGet('/logs?type='+log.target.value);
    dLGet('/dspstatistics?name='+exec.target.value);
    }
   },
    end: {
      
    }
  })