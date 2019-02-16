object = {
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

}