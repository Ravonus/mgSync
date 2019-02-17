function deleteItem(url, data) {
    $.ajax({
        url: url,
        type: 'DELETE',
        data: data,
        success: function(result) {
           
            if(!result.err) {
                app.dspTable.forEach(function(row, index) {
                    console.log(result[Object.keys(result)], row[Object.keys(result)])
                    if(Number(result[Object.keys(result)]) === row[Object.keys(result)]) {
                        $('#row-'+row[Object.keys(result)]).remove()
                        delete app.dspTable[index];
                    }
                });
            }
        }
    });
}