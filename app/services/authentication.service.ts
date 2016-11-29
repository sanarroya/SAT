
import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { User } from '../user'
import { Login } from '../login'

import { tramites } from "../tramites"
import { Tramite } from '../tramite'
import { Solicitud } from '../solicitud'
import { DeleteTramite } from "../deleteProcedure"
import {udpateFunc} from "../requestFunc";
import {udpateState} from "../requestState";

@Injectable()
export class AuthenticationService {
    private baseUrl = 'http://localhost:44111'

    //User Endpoints
    private singInEndpoint = '/userResource/login'
    private singUpEndpoint = '/userResource/registerCitizen'
    private recoverPasswordEndpoint = '/userResource/recoverPassword'
    private userInfoEndpoint = '/userResource/getRegisteredUsers'
    private updateUserEndpoint = '/userResource/updateUser'

    //Employees Endpoints
    private getEmployeesEndpoint = '/userResource/getRegisteredUsersByType/2'
    private deleteEmployeeEndpoint = '/userResource/deleteUser'

    //Procedures
    private createProcedureEndpoint = '/procedureResource/createProcedure'
    private getProcedureRequestsByUserEndpoint = '/procedureResource/getRequestProceduresByUser'
    private getAllRequestOfProceduresEndPoint = '/procedureResource/getAllRequestProcedures'
    private getDetailProcedureEndpoint = '/procedureResource/getProcedureByID'
    private updateProcedureEndpoint = '/procedureResource/modifyProcedure'
    private deleteProcedureEndPoint = "/procedureResource/deleteProcedure"
    private tramitesEndpoint = '/procedureResource/getAllProcedures'
    private solicitudEndpoint = '/procedureResource/getAllSolicitudes'
    private updateFuncEndpoint="/procedureResource/assignResponsableUR"
    private updateStateEndpoint="/procedureResource/changeState"

    private headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(private http: Http) {

    }

    //User requests
    signIn(user: User): Observable<Login> {
        return this.http.post(this.baseUrl + this.singInEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }


    signUp(user: User): Observable<User> {
        return this.http.post(this.baseUrl + this.singUpEndpoint, JSON.stringify(user), this.headers)
            .map(res => res.json())
    }

    recoverPassword(cedula: string): Observable<any> {
        return this.http.post(this.baseUrl + this.recoverPasswordEndpoint, JSON.stringify({ cedula: cedula }), this.headers)
            .map(res => res.json())
    }

    getUserProfile(cedula: string): Observable<User> {
        const url = `${this.baseUrl + this.userInfoEndpoint}/${cedula}`;
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

    updateFunction(tramite: udpateFunc): Observable<any> {
        return this.http.post(this.baseUrl + this.updateFuncEndpoint, JSON.stringify(tramite), this.headers)
            .map(res => res.json())
    }

    updateState(tramite: udpateState): Observable<any> {
        return this.http.post(this.baseUrl + this.updateStateEndpoint, JSON.stringify(tramite), this.headers)
            .map(res => res.json())
    }

    deleteProcedure(tramite: DeleteTramite): Observable<any> {
        return this.http.post(this.baseUrl + this.deleteProcedureEndPoint, JSON.stringify(tramite), this.headers)
            .map(res => res.json())
    }

    getAllTramites(): Observable<Tramite[]> {
        const url = `${this.baseUrl + this.tramitesEndpoint}`;
        return this.http.get(url).map(this.extractData)
            .catch(this.handleError);
    }

    getDetalleTramite(id: string): Observable<tramites> {
        const url = `${this.baseUrl + this.getDetailProcedureEndpoint}/${id}`;
        return this.http.get(url)
            .map(this.extractDataOnly)
    }

    getRequests(): Observable<Tramite[]> {
        return this.http.get(this.baseUrl + this.getAllRequestOfProceduresEndPoint)
            .map(this.extractData)
            .catch(this.handleError)
    }

    getRequestsByUser(id: string): Observable<Tramite[]> {
        const url = `${this.baseUrl + this.getProcedureRequestsByUserEndpoint}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError)
    }

    getAllEmployees(): Observable<User[]> {
        const url = this.baseUrl + this.getEmployeesEndpoint
        console.log(url)
        return this.http.get(url)
            .map((response: Response) =>
                response.json().usuarios as User[]
            )
    }

    deleteEmployee(employee: User): Observable<any> {
        return this.http.post(this.baseUrl + this.deleteEmployeeEndpoint, JSON.stringify(employee), this.headers)
            .map(res => res.json())
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
        return body.usuarios[0] || {};
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