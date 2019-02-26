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


        if(url === '/logList') {
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
        data.contents.forEach( function (content){
            if(content.includes('breakType')) {
                var name = content.split(':')[1];
                breakType = name;
                app.confContents[name] = [];
            } else {
                app.confContents[breakType].push(content);
            }
        });
 //       app.confContents = data.contents;
        if(data && data.files) {
            data.files.forEach( function (file, index) { 
                app.list.push(file.slice(0,-5))
            });
        }
        
    })
}