import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { AgendamientoPage } from '../page/agendamiento/agendamiento.po';
import { HistoricoAgendamientoPage } from '../page/agendamiento/historico-agendamiento.po';

describe('workspace-project Agendamientos', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let agendamiento: AgendamientoPage;
    let  historico: HistoricoAgendamientoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        historico = new HistoricoAgendamientoPage();
        agendamiento = new AgendamientoPage();
    });

    it('Deberia mostar el historico', () => {
        page.navigateTo();
        navBar.clickMenuAgendamientos();

        agendamiento.clickBotonVer();

        // Adicionamos las validaciones despues de la creación        
        expect(page.currentUrl()).toContain('/historico/');
        expect(historico.contarComponentesEstado()).toBeLessThan(1);
    });

    it('Deberia cancelar agendamiento', () => {
        page.navigateTo();
        navBar.clickMenuAgendamientos();

        agendamiento.clickBotonCancelar();
        agendamiento.clickBotonConfirmar();

        // Adicionamos las validaciones despues de la creación        
        expect(agendamiento.mostroNotificacionInformativa()).toBe(true);
    });

    it('Deberia cambiar estado del agendamiento', () => {
        page.navigateTo();
        navBar.clickMenuAgendamientos();

        agendamiento.clickBotonCambiarEstado();
        agendamiento.clickBotonConfirmar();

        // Adicionamos las validaciones despues de la creación        
        expect(agendamiento.mostroNotificacionInformativa()).toBe(true);
    });
});
