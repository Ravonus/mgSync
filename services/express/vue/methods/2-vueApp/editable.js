object = {
focusOn: ( value) => {
    app.$forceUpdate();
    app.lastValue = value;

    
},
focusOut: ( watch) => {
    console.log(app.lastValue)
    watch.edit = false;
    app.$forceUpdate();

  }

}