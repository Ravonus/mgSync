object = {
    statisticSelect: function(exec) {
    //    lGet('/logs?type='+log.target.value);
    dLGet('/dspstatistics?name='+exec.target.value);
    }
  }