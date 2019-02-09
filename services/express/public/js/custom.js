function lGet(url) {

    $.get(url, function (data) {
        
        app.logs = data;



        // Basic example
        $(document).ready(function () {
            if ($.fn.dataTable.isDataTable('#dtBasicExample')) {

                $('#dtBasicExample').DataTable().destroy()
                $('#dtBasicExample').DataTable({
                    "searching": true
                });
                $('.dataTables_length').addClass('bs-select');

            } else {

                $('#dtBasicExample').DataTable({
                    "searching": true
                });
                $('.dataTables_length').addClass('bs-select');

            }

        });

    });

}


function lLGet(url) {

    $.get(url, function (data) {


        data.forEach(function (log) {
            if(log.includes('dsp-')){
                app.logList.push({folder:'dsp/'+log.slice(4, -5), name:log.slice(0, -5)});
            } else {
                app.logList.push({folder:log.slice(0, -5), name:log.slice(0, -5)});
            }
        });




    });

}