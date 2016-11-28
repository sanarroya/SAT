import {menu} from "./menu";
import {campo} from "./campo";
export const MENU_ADM: menu[] = [
    {id: '/inboxTramite', name: 'Tramites'},
    {id: '/inboxUsuario', name: 'Funcionarios'},
    {id: '/inboxSolicitud', name: 'Solicitudes'},
    {id: '/editProfile', name: 'Editar Perfil'},
    {id: '/signin', name: 'Cerrar Sesion'}

];


export const MENU_FCN: menu[] = [
    {id: '/inboxTramite', name: 'Tramites'},
    {id: '/inboxSolicitud', name: 'Solicitudes'},
    {id: '/editProfile', name: 'Editar Perfil'},
    {id: '/signin', name: 'Cerrar Sesion'}

];

export const MENU_CDN: menu[] = [
    {id: '/inboxTramite', name: 'Tramites'},
    {id: '/inboxSolicitud', name: 'Mis Solicitudes'},
    {id: '/editProfile', name: 'Editar Perfil'},
    {id: '/signin', name: 'Cerrar Sesion'}
];

export const CAMPO_MOCK: campo[] = [
    {id: '1', nombre: 'TEST 1', tipo: 'TEXT'},
    {id: '2', nombre: 'TEST 2', tipo: 'Document'}
];