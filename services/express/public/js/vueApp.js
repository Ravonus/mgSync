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
focusOn: function ( value) {
    app.$forceUpdate();
    app.lastValue = value;

    
},

focusOut: function (watch, newValue, target){
    let id = $(target).parents()[1].id.substring(4);
    if(app.lastValue !== newValue) {
      jQPost('/dspPost', {table:app.dspTableName, body:{[watch.row]:newValue}, id:{[watch.idName]:id}})
    }
    
    watch.edit = false;
    app.$forceUpdate();

  },

  externalIp: function () {

    externalPost('/dspPost', {rows:Object.keys(app.dspTable)});

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