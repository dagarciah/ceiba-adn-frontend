import { by, element } from "protractor";

export class AgendamientoPage {
    private botonesVer = element.all(by.css('.btn.btn-primario.ver'));
    private botonesCancelar = element.all(by.css('.btn.btn-secundario.cancelar'));
    private botonesCambiarEstado = element.all(by.css('.btn.btn-primario.cambiar-estado'));

    async clickBotonVer() {
        await this.botonesVer.first().click();
    }

    async clickBotonCancelar() {
        await this.botonesCancelar.first().click();
    } 
    
    async clickBotonCambiarEstado() {
        await this.botonesCambiarEstado.first().click();
    }

    async clickBotonConfirmar() {
        await element(by.css('.swal2-actions .swal2-confirm')).click();
    }

    async mostroNotificacionInformativa(): Promise<Boolean> {
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-info')).isPresent();
    }
}