var userApp = new Vue({
    el: '#userApp',
    data: { 
    me:'',
    mgSync: {},
    alerts: [],
    forgotPassword: false,
    recaptchSiteKey: "6LfBBZYUAAAAAEfdHor9VmKw7zBAPs9ou45lfoCq"
 },
    watch: {
    },
    methods: { 
    userLogin: function (event) {
        event.preventDefault();
        JSON.stringify($("#userLogin").serializeArray())
    },
    userRegistration: function (event) {
        event.preventDefault();
        var paramObj = {};
        $.each($('#userRegistration').serializeArray(), function (_, kv) {
            paramObj[kv.name] = kv.value;
        });
        postApi('/auth/registration', paramObj, 'login');

    },
    showTab: function (id, forget) {
        $('#'+id).addClass('active show');

        if(forget) {
            $('#forgot').removeClass('active show' );
        }

        $($('#'+id).parents()[1]).find('li').each(function(index, li){
           
            if($(li)[0].children[0].href.includes(id) === false) {
                var panel = $(li)[0].children[0].href.split('#')[1]
               
                $('#'+panel).removeClass('active show' );
            }
        });

    },
    resetPWRequest: function (event) {

        event.preventDefault();
        var paramObj = {};
        $.each($('#passwordResetRequest').serializeArray(), function (_, kv) {
            paramObj[kv.name] = kv.value;
        });
        postApi('/auth/forgot', paramObj, 'rp');

    },
    resetPW: function () {
        postApi('/auth/forgotPasswordReset', {password:$('#resetPassword').val(), jwt:userApp.mgSync.resetToken}, 'rp');
    },
    alertFunctions: function (event) {
        var functions =  {
            resendEmail: function () {
                console.log('TEST')
                postApi('auth/registration', {resend:true});
            }
        }

        functions[event.target.className]();
    }
 },
    
    end: {
      
    }
  })