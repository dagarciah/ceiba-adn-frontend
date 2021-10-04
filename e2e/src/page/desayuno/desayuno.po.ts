import { by, element } from "protractor";

export class DesayunoPage {

    private btnComprar = element.all(by.id('btnComprar'))

    async clickBotonComprar() {
        await this.btnComprar.first().click();
    }
}