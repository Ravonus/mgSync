let cpu = []
let memory = []

function graphDump(dump) {
    cpu = [];
    memory = [];
    app.dspCpu = [];
    app.dspMemory = [];
    let object = JSON.parse(dump);

    Object.keys(object).forEach( function (stat, index) {
        let cpuStat, memoryStat;
        if(object[stat].averageCpu) {
            cpuStat = object[stat].averageCpu;
            cpu.push(object[stat].timestamp + ',' + cpuStat + ',');
        } 
        
        if(object[stat].cpu) {

            cpuStat = object[stat].cpu;
            cpu.push(object[stat].timestamp + ',' + cpuStat + ',');

        }

        if(object[stat].memory) {

            memoryStat = object[stat].memory;
            memory.push(object[stat].timestamp + ',' + memoryStat + ',');

        }


        if(object[stat].averageMemory) {

            memoryStat = object[stat].averageMemory;
            memory.push(object[stat].timestamp + ',' + memoryStat + ',');

        }

      //  memory.push(object[stat].timestamp + ',' + memoryStat);
        if(index === Object.keys(object).length - 1) { 
            app.dspCpu = cpu;
            app.dspMemory = memory;
            loadDspGraphs()

        }
    });

}
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
 };

function loadDspGraphs() {
    if($('.plot-container.plotly')[0]) {
        Plotly.purge($('#dspStats')[0]);
    }
    
    
    var selectorOptions = {
        buttons: [{
            step: 'minute',
            stepmode: 'todate',
            count: 1,
            label: '1m'
        },{
            step: 'minute',
            stepmode: 'todate',
            count: 15,
            label: '15m'
        },
        {
            step: 'minute',
            stepmode: 'todate',
            count: 30,
            label: '30m'
        },
        {
            step: 'hour',
            stepmode: 'todate',
            count: 1,
            label: '1h'
        },        {
            step: 'hour',
            stepmode: 'todate',
            count: 12,
            label: '12h'
        },{
            step: 'day',
            stepmode: 'todate',
            count: 1,
            label: '1d'
        }, {
            step: 'week',
            stepmode: 'todate',
            count: 1,
            label: '1w'
        }, {
            step: 'week',
            stepmode: 'todate',
            count: 4,
            label: '4w'
        }, {
            step: 'all',
        }],
    };
    
        var data = [prepData(app.dspCpu)[0], prepData2(app.dspMemory)[0]];
        var layout = {
            title: 'DPS Executables CPU and Memory Usage.',
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: {}
            },
            yaxis: {
               showgrid:false,
               zeroline:false,
               title: 'CPU Usage'
            },
            yaxis2: {
                autorange:'reversed',
                showgrid:false,
                title: 'Memory Usage',
                titlefont: {color: 'rgb(148, 103, 189)'},
                line: {color: 'rgb(55, 128, 191)'},
                overlaying: 'y',
                side: 'right'
            }
        };
    
        Plotly.plot($('#dspStats')[0], data, layout, {responsive: true});
 
    
    function prepData(rawData) {
        var x = [];
        var y = [];
    
        rawData.forEach(function(datum, i) {
            let xy = datum.split(',');
            let dx = xy[0];
            let dy = xy[1];
           
            if(dx && dy) {
            x.push(new Date(Number(dx)));
            y.push(dy);
            }
        });
    
        return [{
            type: 'scatter',
            x: x,
            y: y
        }];
    }

    function prepData2(rawData) {
        var x = [];
        var y = [];
    
        rawData.forEach(function(datum, i) {
            let xy = datum.split(',');
            let dx = xy[0];
            let dy = xy[1];
            if(dx && dy) {
            x.push(new Date(Number(dx)));
            y.push(bytesToSize(dy));
            }
        });
    
        return [{
            type: 'scatter',
            yaxis: 'y2',
            x: x,
            y: y
        }];
    }



}


$(document).ready(function(){ 
    $('#areYouSure').on('hidden.bs.modal', function () {
        console.log('RAN')
        app.firstAsk = true;
    });
})