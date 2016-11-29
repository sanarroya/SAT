import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {FileSAT} from "./FileSAT";



@Injectable()
export class FileService {
    constructor (private http: Http) {}

    //Metodo de prueba para subir archivos
    upload_file(file : Array<FileSAT>, body:any){
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //
                } else {
                    // reject(xhr.response);
                }
            }
        };
        xhr.open('POST', 'http://localhost:44111/fileResource/uploadFileServlet', true);
        let formData = new FormData();
        for(var i=0; i<file.length; i++){
            formData.append(file[i].idarchivo, file[i].archivo, "archivo_" + file[i].nombre);
        }
        formData.append("informacion", body);
        xhr.send(formData);
    }
}