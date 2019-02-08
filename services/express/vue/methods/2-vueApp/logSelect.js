object = {
  logSelect: function(log) {
      lGet('/logs?type='+log.target.value);
  }
}