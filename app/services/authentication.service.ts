
import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Observable }     from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { User } from '../user'
import { Login } from '../login'

import {tramites} from "../tramites";
import { Tramite } from '../tramite'
import { Solicitud } from '../solicitud'
import {DeleteTramite} from "../deleteProcedure";

@Injectable()
export class AuthenticationService {
    private baseUrl = 'http://localhost:44111'
    private singInEndpoint = '/userResource/login'
    private singUpEndpoint = '/userResource/registerCitizen'
    private recoverPasswordEndpoint = '/userResource/recoverPassword'
    private userInfoEndpoint = '/userResource/getRegisteredUsers'
    private createProcedureEndpoint='/procedureResource/createProcedure';
    private getDetailProcedureEndpoint='/procedureResource/getProcedureByID';
    private updateProcedureEndpoint = '/procedureResource/modifyProcedure';
    private deleteProcedureEndPoint="/procedureResource/deleteProcedure";
    private updateUserEndpoint = '/userResource/updateUser';
    private tramitesEndpoint = '/procedureResource/getAllProcedures';
    private solicitudEndpoint = '/procedureResource/getAllSolicitudes';
    private usuarioEndpoint = '/procedureResource/getAllUsuarios';
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

    updateProcedure(tramite: tramites): Observable<any> {
        return this.http.post(this.baseUrl + this.updateProcedureEndpoint, JSON.stringify(tramite), this.headers)
            .map(res => res.json())
    }


    deleteProcedure(tramite: DeleteTramite): Observable<any> {
        return this.http.post(this.baseUrl + this.deleteProcedureEndPoint, JSON.stringify(tramite), this.headers)
            .map(res => res.json())
    }
    

    getAllTramites(): Observable<Tramite[]> {
        const url =  `${this.baseUrl+this.tramitesEndpoint}`;
        return this.http.get(url).map(this.extractData)
            .catch(this.handleError);
    }

    getDetalleTramite(id: string): Observable<tramites> {
        const url =  `${this.baseUrl + this.getDetailProcedureEndpoint}/${id}`;
        return this.http.get(url)
            .map(this.extractDataOnly)
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

    getAllUsuarios(): Observable<User[]> {
        var authHeader = new Headers();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:44111/procedureResource/getAllUsuarios/', {
            headers
        }).map(this.extractData)
            .catch(this.handleError);
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
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg =
            error.status ? `${error.status}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getSolicitudProfile(item: any) {
        
    }

    getTramiteProfile(item: any) {
        
    }
}