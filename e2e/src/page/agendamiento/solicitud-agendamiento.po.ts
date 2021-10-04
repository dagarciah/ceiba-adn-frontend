import { by, element, ElementFinder } from 'protractor';

export class SolicitudAgendamientoPage {
    
    private inputDireccion = element(by.css('[formcontrolname=direccion]'));
    private selectFranja = element(by.css('[formcontrolname=franja]'));
    private calendar = element(by.css('.dp-calendar-wrapper'));   
    
    async alertaInformativa(): Promise<ElementFinder> {
        return await element(by.id('.swal2-popup.swal2-modal.swal2-icon-info'));
    }
        
    async seleccionaUnaFranja(valor: string) {
        await this.selectFranja.$(`[value="${valor}"]`).click();
    }

    async ingresaDireccion(direccion: string) {
        await this.inputDireccion.sendKeys(direccion);
    }

    async seleccionaUnaFecha(dia: number) {
        const diaTexto = dia < 10 ? `0${dia}` : `${dia}`;        
        await this.calendar.element(by.cssContainingText('button', `${diaTexto}`)).click();
    }

    async clickBotonSolicitar() {
        await element(by.id('solictar')).click();
    }

}