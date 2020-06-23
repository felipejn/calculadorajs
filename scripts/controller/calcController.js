class CalcController {

    constructor() {
        
        // Atributos da classe. Underline para "encapsular" como privado
        this._locale = "pt-br";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate; 
        this.initialize();

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