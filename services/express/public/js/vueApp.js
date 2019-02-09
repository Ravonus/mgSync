var app = new Vue({
    el: '#app',
    data: { 
    dspTable: {},
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
 },
    end: {
      
    }
  })