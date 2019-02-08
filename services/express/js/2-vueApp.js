var app = new Vue({
    el: '#app',
    data: { 
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