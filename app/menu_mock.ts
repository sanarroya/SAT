import {menu} from "./menu";
import {campo} from "./campo";
export const MENU_ADM: menu[] = [
    {id: '/procedure', name: 'Tramites'},
    {id: '/signin', name: 'Funcionarios'},
    {id: '/signin', name: 'Solicitudes'},
    {id: '/editProfile', name: 'Editar Perfil'},
    {id: '/signin', name: 'Cerrar Sesion'}

];

export const MENU_CDN: menu[] = [
    {id: '/signin', name: 'Tramites'},
    {id: '/signin', name: 'Mis Solicitudes'},
    {id: '/editProfile', name: 'Editar Perfil'},
    {id: '/signin', name: 'Cerrar Sesion'}
];

export const CAMPO_MOCK: campo[] = [
    {id: '1', nombre: 'TEST 1', tipo: 'TEXT'},
    {id: '2', nombre: 'TEST 2', tipo: 'Document'}
];