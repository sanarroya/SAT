import { Component, Injectable } from '@angular/core'

@Injectable()
export class ValidatorService {

    isDocumentValid(cc: string): boolean {
        return false
    }

    isPasswordValid(password: string): boolean {
        return false
    }

    isEmailValid(email: string): boolean {
        return false
    }

    
}