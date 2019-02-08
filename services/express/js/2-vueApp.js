var app = new Vue({
    el: '#app',
    data: { 
    logs: {}
,
    page: 'home'
 },
    watch: {
    },
    methods: { 
    pageChange: function(page) {
        console.log(page)
    }
 },
    end: {
      
    }
  })