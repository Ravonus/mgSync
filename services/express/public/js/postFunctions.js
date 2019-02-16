function jQPost(url, data) {
    $.post(url, data)
        .done(function (data) {
            //TODO: check to see if fail and revert text back if not... 
            if(data.err) alert('THIS WAS AN ERROR');
        });
}

function externalPost(url, data) {
    $.post(url, data)
        .done(function (data) {
            //TODO: check to see if fail and revert text back if not... 
            if(data.err) alert('THIS WAS AN ERROR');
        });
}