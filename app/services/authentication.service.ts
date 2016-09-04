import { Component } from '@angular/core'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'
import { Observable }     from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { User } from './user'
import { Login } from './login'

@Injectable()
export class AuthenticationService {
    private baseUrl = ''
    private singInEndpoint = '/userResource/login'
    private singUpEndpoint = '/userResource/registerCitizen'
    private recoverPasswordEndpoint = '/userResource/recoverPassword'
    private headers = new Headers({'Content-Type': 'application/json'})

    constructor(private http: Http) {

    }

    signIn(user: User): Observable<Login> {
        return this.http.post(this.baseUrl + this.singInEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }

    signUp(user: User) {
        return this.http.post(this.baseUrl + this.singUpEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }

    recoverPassword(email: String) {
        return this.http.post(this.baseUrl + this.recoverPassword, JSON.stringify({email: email}), this.headers)
            .map(res => res.json())
    }
}