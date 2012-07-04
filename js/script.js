window.addEventListener('load', function() {
        new Cronometro({
            dataInicial : '2012/07/2 16:07:45',
            dataFinal   : [new Date('2012/07/2 16:08:00'), '2012/07/2 16:09:00'],
            dias        : true,
            centesimos  : true,
            onTick      : function(data) {
                console.log(data)
                document.getElementById('dia').innerHTML = data.dia >= 10 ? data.dia : '0'+data.dia;
                document.getElementById('hor').innerHTML = data.hor >= 10 ? data.hor : '0'+data.hor;
                document.getElementById('min').innerHTML = data.min >= 10 ? data.min : '0'+data.min;
                document.getElementById('seg').innerHTML = data.seg >= 10 ? data.seg : '0'+data.seg;
                document.getElementById('dec').innerHTML = data.dec >= 10 ? data.dec : '0'+data.dec;                
            },
            onComplete : function() {
                console.log(this)
            }
        })
    }, false); 