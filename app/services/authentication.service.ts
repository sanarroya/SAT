import { Component } from '@angular/core'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'
import { Observable }     from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { User } from '../user'
import { Login } from '../login'
import {tramites} from "../tramite";

@Injectable()
export class AuthenticationService {
    private baseUrl = 'http://localhost:44111'
    private singInEndpoint = '/userResource/login'
    private singUpEndpoint = '/userResource/registerCitizen'
    private recoverPasswordEndpoint = '/userResource/recoverPassword'
    private userInfoEndpoint = '/userResource/getRegisteredUsers'
    private updateUserEndpoint='/userResource/updateUser';
    private createProcedureEndpoint='/procedureResource/createProcedure';
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

    createProcedure(tramite: tramites): Observable<any> {
        return this.http.post(this.baseUrl + this.createProcedureEndpoint, JSON.stringify(tramite), this.headers)
            .map(res => res.json())
    }
}