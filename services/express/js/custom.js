function lGet(url) {

    $.get(url, function (data) {

        app.logs = JSON.parse(data);



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


        console.log(data);



    });

}