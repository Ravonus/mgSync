var app = new Vue({
    el: '#app',
    data: { 
    dspTable: {},
    dspExec: [],
    dspTableName: '',
    firstAsk: true,
    reRun: function(){}
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

    ipPost('/dspPost', {rows:Object.keys(app.dspTable), type:'external'});

  },

  internalIp: function () {

    ipPost('/dspPost', {rows:Object.keys(app.dspTable), type:'internal'});

  },

  localHostIp: function () {

    ipPost('/dspPost', {rows:Object.keys(app.dspTable), type:'local'});

  }

,
  logSelect: function(log) {
      lGet('/logs?type='+log.target.value);
  }
,
    remSession: function (value) {
        if (app.firstAsk) {
            app.reRun = app.remSession;
            app.reRunValue = value;
            app.firstAsk = false;
            $('#areYouSure').modal('show');
        } else {
            deleteItem('/dspDelete', {model: app.dspTableName, where:{accid:app.reRunValue}})
            $('#areYouSure').modal('hide');
        }

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