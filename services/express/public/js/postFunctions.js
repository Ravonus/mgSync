function jQPost(url, data) {
    $.post(url, data)
        .done(function (data) {
            //TODO: check to see if fail and revert text back if not... 
            if (data.err) alert('THIS WAS AN ERROR');
        });
}

function ipPost(url, data) {
    $.post(url, data)
        .done(function (data) {
            //TODO: check to see if fail and revert text back if not... 
            if (data.err) alert('THIS WAS AN ERROR');

            if (data.type && data.type === 'ip') {
                app.dspTable.forEach(function (row, index) {
                    app.dspTable[index].zoneip = data.value;
                });
            }
        });
}

function confPost(url, data) {
    $.post(url, data)
        .done(function (data) {

            if (data.err) alert('THIS WAS AN ERROR');
            app.confContents[data.file].forEach(function (line, index) {
                if (line.includes(data.key.trim())) {
                    $('#' + data.key).attr('data-last', data.value);
                    $('#' + data.key).data('last', data.value);
                    let newA = app.confContents[data.file][index].split(':');
                    newA[1] = data.value;
                    let string = newA.join(':');
                    app.confContents[data.file][index] = string;
                }
            });

        });
}

var mgSync = {}
function postApi(url, data) {

    $.ajax
        ({
            type: "POST",
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function(x) {
                if (x && x.overrideMimeType) {
                  x.overrideMimeType("application/j-son;charset=UTF-8");
                }
            },
            success: function (data) {
                mgSync.user = JSON.parse(data);
                setCookie('jwt', mgSync.user.token, 1);
                $('#userModal').modal('hide');
                $( '#userLogin' ).each(function(){
                    this.reset();
                });
                alert('info', {title:'Login Successful', text:'Logged in successfully.'});
            },
            error: function (err) {

                alert('error', {title:'Login Error', text:JSON.parse(err.responseText).message});
            }
        });
}