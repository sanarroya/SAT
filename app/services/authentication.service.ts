
import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Observable }     from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { User } from '../user'
import { Login } from '../login'

import {tramites} from "../tramites";
import { Tramite } from '../tramite'
import { Solicitud } from '../solicitud' 

@Injectable()
export class AuthenticationService {
    private baseUrl = 'http://localhost:44111'

    //User Endpoints
    private singInEndpoint = '/userResource/login'
    private singUpEndpoint = '/userResource/registerCitizen'
    private recoverPasswordEndpoint = '/userResource/recoverPassword'
    private userInfoEndpoint = '/userResource/getRegisteredUsers'
    private updateUserEndpoint = '/userResource/updateUser'
    private getEmployeesEndpoint = '/userResource/getRegisteredUsersByType/1'
    
    //Procedures
    private createProcedureEndpoint = '/procedureResource/createProcedure';
    private getProcedureRequestsByUserEndpoint = '/procedureResource/getRequestProceduresByUser'
    private getAllRequestOfProcedures = '/procedureResource/getAllRequetstProcedures'

    private tramitesEndpoint = '/procedureResource/getAllProcedures';
    private solicitudEndpoint = '/procedureResource/getAllSolicitudes';
    private headers = new Headers({'Content-Type': 'application/json'})

    constructor(private http: Http) {

    }

    signIn(user: User): Observable<Login> {
        return this.http.post(this.baseUrl + this.singInEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }

    //TODO - Cambiar el tipo del observador
    signUp(user: User): Observable<User> {
        return this.http.post(this.baseUrl + this.singUpEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }

    //Crear funcionario
    signUpFuncionario(user: User): Observable<User> {
        user.tipo = '2';
        return this.http.post(this.baseUrl + this.singUpEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }

    //TODO - Cambiar el tipo del observador
    recoverPassword(cedula: string): Observable<any> {
        return this.http.post(this.baseUrl + this.recoverPasswordEndpoint, JSON.stringify({cedula: cedula}), this.headers)
            .map(res => res.json())
    }

    //TODO - Cambiar el tipo del observador
    getUserProfile(cedula: string): Observable<User> {
        const url =  `${this.baseUrl + this.userInfoEndpoint}/${cedula}`;
        return this.http.get(url)
            .map(this.extractDataUsuarios)
    }

    updateUser(user: User): Observable<any> {
        return this.http.put(this.baseUrl + this.updateUserEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }

    createProcedure(tramite: tramites): Observable<any> {
        return this.http.post(this.baseUrl + this.createProcedureEndpoint, JSON.stringify(tramite), this.headers)
            .map(res => res.json())
    }
    
    //Metodo para traer todos los tramites registrados
    getAllTramites(): Observable<Tramite[]> {
        var authHeader = new Headers();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:44111/procedureResource/getAllProcedures/', {
            headers
        }).map(this.extractData)
            .catch(this.handleError);
    }

    getAllSolicitudes(): Observable<Solicitud[]> {
        var authHeader = new Headers();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:44111/procedureResource/getAllSolicitudes/', {
            headers
        }).map(this.extractData)
            .catch(this.handleError);
    }

    getAllEmployees(): Observable<User[]> {
        const url =  this.baseUrl + this.getEmployeesEndpoint
        console.log(url)
        return this.http.get(url)
                .map((response: Response) =>
                    response.json().usuarios as User[]
                )
    }
    
    //Metodo to manipulate data
    private extractData(res: Response) {
        let body = res.json();
        return body.tramites || {};
    }


    //Metodo para extraer un solo dato
    private extractDataOnly(res: Response) {
        let body = res.json();
        return body;
    }

    //Metodo to manipulate data
    private extractDataUsuarios(res: Response) {
        // alert(res.json().usuarios[0])
        let body = res.json();
        return body.usuarios[0] || { };
    }


    //Metodo para manejar los errores
    private handleError(error: any) {
        let errMsg = error.status ? `${error.status}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getSolicitudProfile(item: any) {
        
    }

    getTramiteProfile(item: any) {
        
    }
}