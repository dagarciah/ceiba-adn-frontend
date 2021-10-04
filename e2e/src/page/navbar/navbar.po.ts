import { by, element } from 'protractor';

export class NavbarPage {
    linkDesayunos = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkAgendamientos = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkSeguiminetos = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickMenuDesayunos() {
        await this.linkDesayunos.click();
    }

    async clickMenuAgendamientos() {
        await this.linkAgendamientos.click();
    }
}
