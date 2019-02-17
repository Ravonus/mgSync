function jQPost(url, data) {
    $.post(url, data)
        .done(function (data) {
            //TODO: check to see if fail and revert text back if not... 
            if(data.err) alert('THIS WAS AN ERROR');
        });
}

function ipPost(url, data) {
    $.post(url, data)
        .done(function (data) {
            //TODO: check to see if fail and revert text back if not... 
            if(data.err) alert('THIS WAS AN ERROR');

            if(data.type && data.type === 'ip') {
                app.dspTable.forEach(function (row, index) {
                    app.dspTable[index].zoneip = data.value;
                });
            }
        });
}