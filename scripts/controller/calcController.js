class CalcController {

    constructor() {
        
        // Atributos da classe. Underline para "encapsular" como privado
        this._locale = "pt-br";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate; 
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => { // Executa função repetidamente em um intervalo de tempo

            this.setDisplayDateTime();

        }, 1000); // <-- Intervalo de tempo em ms

        // setTimeout(() => { // Executa função após intervalo de tempo
            
        //     clearInterval(interval);

        // }, 10000);

    }
    
    
    // Método criado para executar addEventListener em vários eventos
    addEventListenerAll(element, events, fn) {

        events.split(" ").forEach(event => {
            
            element.addEventListener(event, fn, false); // false para evitar que o evento seja 
                                                        // disparado duas vezes
        });

    }

    initButtonsEvents() {

        // Retorna todos os elementos com tag "g" dentro dos ids #buttons e #parts  
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index) => {
            
            this.addEventListenerAll(btn, "click drag", e => {

                console.log(btn.className.baseVal.replace("btn-", ""));

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        });

    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"           
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime() {

        return this._timeEl.innerHTML;
        
    }
    set displayTime(value) {

        this._timeEl.innerHTML = value;
        
    }
    
    get displayDate() {

        return this._dateEl.innerHTML;

    }
    
    set displayDate(value) {

        this._dateEl.innerHTML = value;

    }
    
    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = valor;

    }
    get currentDate() {

        return new Date();

    }

    set currentDate(value) {

        this._currentDate = valor;

    }

}