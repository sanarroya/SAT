import { Component } from '@angular/core'
import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Observable }     from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { User } from '../user'
import { Login } from '../login'
import { Tramite } from '../tramite'
import { Solicitud } from '../solicitud' 
 
@Injectable()
export class AuthenticationService {
    private baseUrl = 'http://localhost:44111'
    private singInEndpoint = '/userResource/login'
    private singUpEndpoint = '/userResource/registerCitizen'
    private recoverPasswordEndpoint = '/userResource/recoverPassword'
    private userInfoEndpoint = '/userResource/getRegisteredUsers'
    private updateUserEndpoint = '/userResource/updateUser'
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

    //TODO - Cambiar el tipo del observador
    recoverPassword(cedula: string): Observable<any> {
        return this.http.post(this.baseUrl + this.recoverPasswordEndpoint, JSON.stringify({cedula: cedula}), this.headers)
            .map(res => res.json())
    }

    //TODO - Cambiar el tipo del observador
    getUserProfile(cedula: string): Observable<User> {
        const url =  `${this.baseUrl + this.userInfoEndpoint}/${cedula}`;
        return this.http.get(url)
            .map(res => res.json())
    }

    updateUser(user: User): Observable<any> {
        return this.http.put(this.baseUrl + this.updateUserEndpoint, JSON.stringify(user), this.headers)
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


    //Metodo para manejar los errores
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg =
            error.status ? `${error.status}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}