object = {
    isOdd: function(num) { return num % 2; },
    updateConf: function(input) {
     if($(input).data('last').toString() !== input.value.toString()) {

        var obj = {key:$(input).parents()[1].textContent, value:input.value, file:app.confFile};
        confPost('/dspConfPost', obj)

     }
       
    }
  }