(function(window){

    var Cronometro = Cronometro || {
        config : {}
    };

    Cronometro.cronometro = function(options) {

        var dataInicial	= options.dataInicial,				
            dataFinal	= options.dataFinal,
            onTick		= options.onTick,
            onComplete	= options.onComplete,
            dias 		= options.dias ? options.dias : false,
            centesimos 	= options.centesimos ? options.centesimos : false,
            intervalo 	= 0,
            that		= this;

        var init = function() {					

            var tick;

            if (!dias && !centesimos) {
                tick = Cronometro.config.tipos.NORMAL;
            } else if (!dias && centesimos) {
                tick = Cronometro.config.tipos.NORMAL_CENTESIMOS;
            } else if (dias && !centesimos) {
                tick = Cronometro.config.tipos.DIAS;
            } else if (dias && centesimos) {
                tick = Cronometro.config.tipos.DIAS_CENTESIMOS;
            }

            intervalo = setInterval(function() {
                tick();
            },Cronometro.config.velocidade[centesimos ? 1 : 0]);  

            tick();     	
        }

        var NORMAL = function() {

            var hor, min, seg, diferenca;

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + Cronometro.config.velocidade[0]);				

            if(diferenca > 0) {
                seg = Math.floor(diferenca/1000)%60;				
                min = Math.floor((diferenca/1000)/60)%60;			
                hor = Math.floor(((diferenca/1000)/60)/60);

                onTick.apply(that,[{                        
                    hor : hor,
                    min : min,
                    seg : seg
                }]);

            } else {
                onComplete.apply(that);
                clearInterval(intervalo);
            }	
        }

        var DIAS = function() {
            var dia, hor, min, seg, diferenca;

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + Cronometro.config.velocidade[0]);				

            if(diferenca > 0) {						
                seg = Math.floor(diferenca/1000)%60;
                min = Math.floor((diferenca/1000)/60)%60;
                hor = Math.floor(((diferenca/1000)/60)/60)%24;		
                dia = Math.floor((((diferenca/1000)/60)/60)/24);

                onTick.apply(that,[{ 
                    dia : dia,                       
                    hor : hor,
                    min : min,
                    seg : seg
                }]);
            } else {
                onComplete.apply(that);
                clearInterval(intervalo);
            }	
        };

        var NORMAL_CENTESIMOS = function() {
            var hor, min, seg, cet, diferenca;

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + Cronometro.config.velocidade[1]);               

            if(diferenca > 0) {
                dec = Math.floor(diferenca/10)%100;
                seg = Math.floor(diferenca/1000)%60;                
                min = Math.floor((diferenca/1000)/60)%60;           
                hor = Math.floor(((diferenca/1000)/60)/60);

                onTick.apply(that,[{
                    hor : hor,
                    min : min,
                    seg : seg,
                    dec : dec
                }]);

                this.callback({
                    hor : hor,
                    min : min,
                    seg : seg,
                    dec : dec
                });
            } else {
                onComplete.apply(that);
                clearInterval(intervalo);
            }   
        };

        var DIAS_CENTESIMOS = function() {
            var dia, hor, min, seg, diferenca;

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + Cronometro.config.velocidade[1]);               

            if(diferenca > 0) { 
                dec = Math.floor(diferenca/10)%100;                 
                seg = Math.floor(diferenca/1000)%60;
                min = Math.floor((diferenca/1000)/60)%60;
                hor = Math.floor(((diferenca/1000)/60)/60)%24;      
                dia = Math.floor((((diferenca/1000)/60)/60)/24);

                onTick.apply(that,[{
                    dia : dia,
                    hor : hor,
                    min : min,
                    seg : seg,
                    dec : dec
                }]);

            } else {
                onComplete.apply(that);
                clearInterval(this.intervalo);
            }   
        };     

        Cronometro.config = {
            tipos : {
                NORMAL            : NORMAL,
                DIAS              : DIAS,
                NORMAL_CENTESIMOS : NORMAL_CENTESIMOS,
                DIAS_CENTESIMOS   : DIAS_CENTESIMOS
            },
            velocidade : {
                0 : 1000,
                1 : 25
            }
        };

        init();            
    };

    window.Cronometro = Cronometro.cronometro;

})(window);		