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
function postApi(url, data, type) {

    $.ajax
        ({
            type: "POST",
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function (x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/j-son;charset=UTF-8");
                }
            },
            success: function (data) {

                if (type === 'login') {
                    userApp.mgSync = JSON.parse(data);
                    userHead.mgSync = JSON.parse(data);
                    setCookie('jwt', JSON.parse(data).token, 1);
                    $('#userModal').modal('hide');
                    window.history.replaceState({}, document.title, "/" + "");
                    $('#userLogin').each(function () {
                        this.reset();
                    });
                    if (userApp.mgSync.registration) {
                        alert('success', { title: 'Registration Successful', text: 'Please check email for registration.' });
                    } else {
                        alert('info', { title: 'Login Successful', text: 'Logged in successfully.' });
                        if(userApp.mgSync.user[0].verified && userApp.mgSync.user[0].verified !== '') {
                            userApp.alerts.push({type:'alert-danger', title:'Email registration ', text:'You must register your email before playing.', close:'alert-dismissible'})
                        }
                    }

                }

                if (type === 'rp') {
                    let obj = JSON.parse(data);
                    if (obj.success) {
                        window.history.replaceState({}, document.title, "/" + "");
                        if (obj.success !== 'Reset password successfully') {
                            userApp.mgSync.resetToken = obj.success;
                            $('#resetPW').modal('show');
                        } else {
                            $('#resetPW').modal('hide');
                            $('#userModal').modal('show')

                            alert('info', { title: 'Password reset successful', text: obj.success });
                        }


                    }

                }
            },
            error: function (err) {
                if (type === 'login') {
                    alert('error', { title: 'Login Error', text: JSON.parse(err.responseText).message });
                }

                if (type === 'rp') {

                    if (err) {
                        let obj = JSON.parse(err.responseText);
                        window.history.replaceState({}, document.title, "/" + "");
                        alert('error', { title: 'Reset password error', text: obj.err });
                    }
                }
            }
        });
}