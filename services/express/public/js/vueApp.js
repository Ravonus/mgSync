var app = new Vue({
    el: '#app',
    data: { 
    dspTable: {},
    dspExec: [],
    dspTableName: ''
,
    count: 0,
    lastValue: ''
,
    logs: {},
    logList: []
,
    page: 'home'
 },
    watch: {
    },
    methods: { 
focusOn: ( value) => {
    app.$forceUpdate();
    app.lastValue = value;

    
},
focusOut: ( watch) => {
    console.log(app.lastValue)
    watch.edit = false;
    app.$forceUpdate();

  }

,
  logSelect: function(log) {
      lGet('/logs?type='+log.target.value);
  }
,
    statisticSelect: function(exec) {
    //    lGet('/logs?type='+log.target.value);
    dLGet('/dspstatistics?name='+exec.target.value);
    }
   },
    directives: {
      focus: {
        inserted (el) {
          el.focus()
        }
      }
    },
    end: {
      
    }
  })