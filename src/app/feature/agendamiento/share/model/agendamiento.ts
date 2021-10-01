export interface Agendamiento {
    id: number;
    desayunoId: number;
    codigo: string;
    programacion: string;
    estados?: Array<EstadoAgendamiento>;
    estadoActual?: EstadoAgendamiento;
}

export interface EstadoAgendamiento {
    nombre: string;
    fechaCambio: string;
}

export declare type Estado = 'PENDIENTE' | 'ALISTAMIENTO' | 'DESPACHADO' | 'ENTREGADO' | 'CANCELADO';
