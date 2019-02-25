object = {
    userLogin: function (event) {
        console.log(event)
        event.preventDefault();
        console.log(JSON.stringify($("#userLogin").serializeArray()))
    }
}