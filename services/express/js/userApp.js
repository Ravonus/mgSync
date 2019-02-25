var userApp = new Vue({
    el: '#userApp',
    data: { 
    me:''
 },
    watch: {
    },
    methods: { 
    userLogin: function (event) {
        console.log(event)
        event.preventDefault();
        console.log(JSON.stringify($("#userLogin").serializeArray()))
    }
 },
    
    end: {
      
    }
  })