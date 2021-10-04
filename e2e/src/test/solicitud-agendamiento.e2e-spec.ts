import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { SolicitudAgendamientoPage } from '../page/agendamiento/solicitud-agendamiento.po';
import { DesayunoPage } from '../page/desayuno/desayuno.po';

describe('workspace-project Solicitud Agendamiento', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let desayuno: DesayunoPage;
    let solicitudAgendamiento: SolicitudAgendamientoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        desayuno = new DesayunoPage();
        solicitudAgendamiento = new SolicitudAgendamientoPage();
    });

    it('Deberia crear un agendamiento', () => {
        page.navigateTo();
        navBar.clickMenuDesayunos();
        desayuno.clickBotonComprar();

        solicitudAgendamiento.seleccionaUnaFranja('07:00:00');
        solicitudAgendamiento.ingresaDireccion('Calle Falsa 123');
        solicitudAgendamiento.seleccionaUnaFecha(new Date().getDate() + 2);

        solicitudAgendamiento.clickBotonSolicitar();

        // Adicionamos las validaciones despues de la creación
        solicitudAgendamiento.alertaInformativa()
            .then(e => {expect(e.isPresent()).toBeTruthy()})

    });
});
