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
            self        = this,            
            velocidade  = 0,
            now         = null,
            before      = null;       

        var init = function() {

            velocidade  = Cronometro.config.velocidade[centesimos ? 1 : 0];
            before      = new Date();

            TICK();     	
        }

        var TICK = function() {

            var dia         = null,
                hor, min, seg,
                dec         = null,
                obj         = {},
                diferenca, 
                now         = new Date(),
                elapsedTime = now.getTime() - before.getTime(),
                velTemp     = 0;

            if(elapsedTime > velocidade) {
                velTemp = elapsedTime;                
            } else {
                velTemp = velocidade;                 
            }        

            diferenca = dataFinal - dataInicial.setTime(dataInicial.getTime() + velTemp);               

            if(diferenca > 0) {               

                seg = Math.floor(diferenca/self.tempo.segundos)%60;             
                min = Math.floor(diferenca/self.tempo.minutos)%60; 

                if(!dias) {
                    hor = Math.floor(diferenca/self.tempo.horas);                     
                } else {
                    hor = Math.floor(diferenca/self.tempo.horas)%24;
                    dia = Math.floor(diferenca/self.tempo.dias);
                }

                if(centesimos) {
                    dec = Math.floor(diferenca/self.tempo.centesimos)%100;
                }

                obj.dec = dec;
                obj.seg = seg;
                obj.min = min;
                obj.hor = hor;
                obj.dia = dia;

                onTick.apply(self,[obj]);

                setTimeout(function(){
                    TICK();
                }, velocidade);                

            } else {
                onComplete.apply(self);
                clearInterval(intervalo);
            }

            before = new Date(); 
        }         

        Cronometro.config = {            
            velocidade : {
                0 : 1000,
                1 : 25
            }
        };

        init();            
    };

    window.Cronometro = Cronometro.cronometro;

})(window);		