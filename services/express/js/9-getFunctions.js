function resendEmail() {
    console.log('test');
}


function lGet(url) {
    $.get(url, function (data) {
        $('#dtBasicExample').DataTable().destroy()
        app.logs = data;
        // Basic example
        $(document).ready(function () {

            $('#dtBasicExample').DataTable({
                "searching": true
            });
            $('.dataTables_length').addClass('bs-select');

        });

    });

}

function dLGet(url) {
    $.get(url, function (data) {
        graphDump(data);


    });

}

function lLGet(url) {


    $.get(url, function (data) {


        if (url === '/logList') {
            data.forEach(function (log) {
                var found = false;
                if (log.includes('dsp-')) {

                    app.logList.forEach(function (logL) {
                        if (logL.name === log.slice(0, -5)) found = true;
                    });
                    if (!found) app.logList.push({ folder: 'dsp/' + log.slice(4, -5), name: log.slice(0, -5) });
                } else {
                    app.logList.forEach(function (logL) {
                        if (logL.name === log.slice(0, -5)) found = true;
                    });
                    if (!found) app.logList.push({ folder: log.slice(0, -5), name: log.slice(0, -5) });
                }
            });

        } else {

            app.dspExec = [];
            app.dspExec = data;
        }

    });

}

function getDspConf() {
    $.get('/dspConf?list=true&file=na', function (data) {
        app.list = [];
        let breakType;
        data.contents.forEach(function (content) {
            if (content.includes('breakType')) {
                var name = content.split(':')[1];
                breakType = name;
                app.confContents[name] = [];
            } else {
                app.confContents[breakType].push(content);
            }
        });
        //       app.confContents = data.contents;
        if (data && data.files) {
            data.files.forEach(function (file, index) {
                app.list.push(file.slice(0, -5))
            });
        }

    })
}


function getApi(url, type) {


    $.ajaxSetup({
        statusCode: {
            401: function () {
                // Redirec the to the login page.
                if (location.valueOf().search !== '?login=true') {
                    location.href = "/?login=true";
                }
            }
        }
    });

    $.ajax
        ({
            type: "GET",
            url: url,
            contentType: 'application/json',
            beforeSend: function (x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/j-son;charset=UTF-8");
                }
            },
            success: function (data) {
                if (type === 'me') {
                    userApp.mgSync = JSON.parse(data);
                    userHead.mgSync = JSON.parse(data);

                    if (userApp.mgSync.user[0].verified && userApp.mgSync.user[0].verified !== '') {
                        userApp.alerts.push({ type:'alert-danger', title: 'Email registration ', text: 'You must register your email before playing.', close: 'alert-dismissible', vue:"resendEmail",
                        link:{ 
                            href:"#",
                            text:"Resend registration email"
                        }
                    });
                    }

                }

                if (type === 'verify') {

                    userApp.mgSync = JSON.parse(data);
                    userHead.mgSync = JSON.parse(data);
                    if (userApp.mgSync.cookie) {
                        setCookie('jwt', userApp.mgSync.cookie, 1);
                        userApp.alerts = [];
                    }

                }
            },
            error: function (err) {
                if (type === 'me') {
                    alert('error', { title: 'Cookie Error', text: 'Please login again' });
                }
            }
        });
}