object = {
    userLogin: function (event) {
        console.log(event)
        event.preventDefault();
        console.log(JSON.stringify($("#userLogin").serializeArray()))
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

    }
}