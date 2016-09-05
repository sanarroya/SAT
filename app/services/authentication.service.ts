import { Component } from '@angular/core'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'
import { Observable }     from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { User } from '../user'
import { Login } from '../login'

@Injectable()
export class AuthenticationService {
    private baseUrl = ''
    private singInEndpoint = '/userResource/login'
    private singUpEndpoint = '/userResource/registerCitizen'
    private recoverPasswordEndpoint = '/userResource/recoverPassword'
    private userInfoEndpoint = ''
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
    recoverPassword(email: string): Observable<any> {
        return this.http.post(this.baseUrl + this.recoverPassword, JSON.stringify({email: email}), this.headers)
            .map(res => res.json())
    }

    //TODO - Cambiar el tipo del observador
    getUserProfile(cedula: string): Observable<any> {
        return this.http.get(this.baseUrl + this.userInfoEndpoint)
            .map(res => res.json())
    }
}