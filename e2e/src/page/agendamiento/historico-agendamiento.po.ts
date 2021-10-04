import { by, element } from "protractor";

export class HistoricoAgendamientoPage {
    private estados = element.all(by.css('.estado'));

    async contarComponentesEstado() {
        return (await this.estados).length;
    }
}