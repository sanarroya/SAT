import { Component, Injectable } from '@angular/core'

@Injectable()
export class ValidatorService {

    private passwordRegex = new RegExp("^(" +
                                "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])" + "|" +
                                "(?=.*\\d)(?=.*[a-z])(?=.*[*!$%])" + "|" +
                                "(?=.*[a-z])(?=.*[A-Z])(?=.*[*!$%])" + "|" +
                                "(?=.*\\d)(?=.*[A-Z])(?=.*[*!$%])" +
                                ").{8,16}$")
    private emailRegex = new RegExp("[A-Z0-9a-z._-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+")
    private phoneRegex = new RegExp("[0-9]{7,10}")

    isDocumentValid(cc: string): boolean {
        if(cc.length >= 8 && cc.length <= 10) {
            return true
        } else {
            return false
        }
    }

    isPasswordValid(password: string): boolean {
        return this.passwordRegex.test(password)
    }

    passwordsMatch(password: string, confirmPassword: string): boolean {
        if (password == confirmPassword) {
            return true
        } else {
            return false
        }
    }

    isEmailValid(email: string): boolean {
        return this.emailRegex.test(email)
    }

    isPhoneValid(phone: string): boolean {
        return this.phoneRegex.test(phone)
    }
}