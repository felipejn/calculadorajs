class CalcController {

    constructor() {
        
        // Atributos da classe. Underline para "encapsular" como privado
        this._lastNumber = "";
        this._lastOperation = "";
        this._operation = [];
        this._locale = "pt-br";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate; 
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();

    }

    copyToClipboard() {

        let input = document.createElement("input");

        input.value = this.displayCalc;

    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => { // Executa função repetidamente a cada intervalo de tempo determinado

            this.setDisplayDateTime();

        }, 1000); // <-- Intervalo de tempo em ms

        /* Exemplo de setTimeOut()
        setTimeout(() => { // Executa função após intervalo de tempo
            clearInterval(interval);

        }, 10000);*/

        this.setLastNumberToDisplay();

    }

    // Inicializa eventos de teclado
    initKeyboard() {

        document.addEventListener("keyup", e => {
            
            switch (e.key) {
                case "Escape":
                    this.clearAll();
                    break;
                case "Backspace":
                    this.clearEntry();
                    break;
                case "+":
                case "-":
                case "/":
                case "*":
                case "%":
                    this.addOperation(e.key);
                    break;
                case "Enter":
                case "=":
                    this.calc();
                    break;
                case ".":
                case ",":
                    this.addDot();
                    break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.addOperation(parseInt(e.key));
                    break;
            }
         
        })

    }
    
    
    // Método criado para executar addEventListener em vários eventos
    addEventListenerAll(element, events, fn) {

        events.split(" ").forEach(event => {
            
            element.addEventListener(event, fn, false); // false para evitar que o evento seja 
                                                        // disparado duas vezes
        });

    }

    // Limpa todas as entradas
    clearAll() {

        this._operation = [];
        this._lastNumber = "";
        this._lastOperator = "";
        
        this.setLastNumberToDisplay();

    }

    // Limpa a última entrada
    clearEntry() {

        this._operation.pop();
        
        this.setLastNumberToDisplay();

    }

    // Exibe última operação
    getLastOperation() {

        return this._operation[this._operation.length-1];

    }

    // Define a última operação
    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }
    
    // Verifica se valor é um operador e retorna true ou false
    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1); // uso de if implícito

    }
    
    // Adiciona operação no array
    pushOperation(value) {
        
        this._operation.push(value);

        if (this._operation.length > 3) {
            
            this.calc();
            
        }

    }

    // Retorna resultado do cálculo
    getResult() {
      
        return eval(this._operation.join(""));

    }
    
    // Executa o cálculo    
    calc() {

        let last = "";

        this._lastOperator = this.getLastItem();
        
        if (this._operation.length < 3) {

            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];
             
        }
        
        if (this._operation.length > 3) {
            
            last = this._operation.pop();
            
            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        if (last == "%") {

            result /= 100; // É igual a ela mesma dividido por 100

            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();

    }
    
    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {
     
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            } 

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }
    
    // Exibe a última operação no display
    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }
    
    // Adiciona operação
    addOperation(value) {
        
        /* Verifica se última entrada do array é número. Caso seja a primeira entrada,
        entrará nessa condição mesmo sendo número. */
        if (isNaN(this.getLastOperation())) {
            
            if (this.isOperator(value)) {
                
                // Substitui operador anterior por operador atual
                this.setLastOperation(value);

            } else {
                
                // É número. Provável primeira entrada no array _operation
                this.pushOperation(value);

                // Exibe número no display
                this.setLastNumberToDisplay();

            }

        } else {
            
            // Caso seja um operador, adiciona ao array            
            if (this.isOperator(value)) {
                
                this.pushOperation(value);

            } else {

                // Concatena última operação com atual
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                // Exibe número no display
                this.setLastNumberToDisplay();
        
            }
        
        }

    }

    // Exibe erro no display
    setError() {

        this.displayCalc = "Error";

    }

    // Adiciona ponto
    addDot() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === "string" && lastOperation.split("").indexOf(".") > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {

            this.pushOperation("0.");

        } else {

            this.setLastOperation(lastOperation.toString() + ".");

        }

        this.setLastNumberToDisplay();

    }

    // Recebe botão e executa
    execBtn(value) {

        switch (value) {
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation("+");
                break;
            case "subtracao":
                this.addOperation("-");
                break;
            case "divisao":
                this.addOperation("/");
                break;
            case "multiplicacao":
                this.addOperation("*");
                break;
            case "porcento":
                this.addOperation("%");
                break;
            case "igual":
                this.calc();
                break;
            case "ponto":
                this.addDot();
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;            
        }

    }
    
    // Eventos dos botões
    initButtonsEvents() {

        // Retorna todos os elementos com tag "g" dentro dos ids #buttons e #parts  
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index) => {
            
            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        });

    }

    // Exibe data e hora
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

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate() {

        return new Date();

    }

    set currentDate(value) {

        this._currentDate = value;

    }

}