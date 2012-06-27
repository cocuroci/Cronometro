(function(window){

    var Cronometro = Cronometro || {
        config : {}
    };

    Cronometro.cronometro = function(options) {
        //variaveis publicas
        this.tempo = {
            milesimos   : 1,
            centesimos  : 10,
            decimos     : 100,
            segundos    : 1000,
            minutos     : 60*1000,
            horas       : 60*60*1000,
            dias        : 24*60*60*1000
        }

        //variaveis privadas
        var dataInicial = options.dataInicial,				
            dataFinal   = options.dataFinal,
            onTick      = options.onTick,
            onComplete  = options.onComplete,
            dias        = options.dias ? options.dias : false,
            centesimos  = options.centesimos ? options.centesimos : false,
            intervalo   = 0,
            self        = this;
            

        var init = function() {

            var tick        = function() {}            

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
                seg = Math.floor(diferenca/self.tempo.segundos)%60;				
                min = Math.floor(diferenca/self.tempo.minutos)%60;			
                hor = Math.floor(diferenca/self.tempo.horas);

                onTick.apply(self,[{                        
                    hor : hor,
                    min : min,
                    seg : seg
                }]);

            } else {
                onComplete.apply(self);
                clearInterval(intervalo);
            }	
        }

        var DIAS = function() {
            var dia, hor, min, seg, diferenca;

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + Cronometro.config.velocidade[0]);				

            if(diferenca > 0) {						
                seg = Math.floor(diferenca/self.tempo.segundos)%60;                
                min = Math.floor(diferenca/self.tempo.minutos)%60;          
                hor = Math.floor(diferenca/self.tempo.horas)%24;		
                dia = Math.floor(diferenca/self.tempo.dias);

                onTick.apply(self,[{ 
                    dia : dia,                       
                    hor : hor,
                    min : min,
                    seg : seg
                }]);

            } else {
                onComplete.apply(self);
                clearInterval(intervalo);
            }	
        };

        var NORMAL_CENTESIMOS = function() {
            var hor, min, seg, cet, diferenca;

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + Cronometro.config.velocidade[1]);               

            if(diferenca > 0) {
                dec = Math.floor(diferenca/self.tempo.centesimos)%100;
                seg = Math.floor(diferenca/self.tempo.segundos)%60;             
                min = Math.floor(diferenca/self.tempo.minutos)%60;          
                hor = Math.floor(diferenca/self.tempo.horas);

                onTick.apply(self,[{
                    hor : hor,
                    min : min,
                    seg : seg,
                    dec : dec
                }]);

            } else {
                onComplete.apply(self);
                clearInterval(intervalo);
            }           
        };

        var DIAS_CENTESIMOS = function() {
            var dia, hor, min, seg, diferenca;

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + Cronometro.config.velocidade[1]);               

            if(diferenca > 0) { 
                dec = Math.floor(diferenca/self.tempo.centesimos)%100;
                seg = Math.floor(diferenca/self.tempo.segundos)%60;             
                min = Math.floor(diferenca/self.tempo.minutos)%60;          
                hor = Math.floor(diferenca/self.tempo.horas)%24;      
                dia = Math.floor(diferenca/self.tempo.dias);

                onTick.apply(self,[{
                    dia : dia,
                    hor : hor,
                    min : min,
                    seg : seg,
                    dec : dec
                }]);

            } else {
                onComplete.apply(self);
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