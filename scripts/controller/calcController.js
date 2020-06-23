class CalcController {

    constructor() {

        this._displayCalc = "0"; // Atributos da classe
        this._dataAtual; // Underline para "encapsular" como privado

    }

    get displayCalc() {

        return this._displayCalc;

    }

    set displayCalc(valor) {

        this._displayCalc = valor;

    }
    get dataAtual() {

        return this._dataAtual;

    }

    set dataAtual(valor) {

        this._dataAtual = valor;

    }



}