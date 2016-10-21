import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'

import { FieldModel } from '../create-procedure/field-model'
import { TextBoxField } from '../create-procedure/textbox-field'

@Component({
    selector: 'survey',
    templateUrl: './app/create-procedure/survey.component.html'
})

export class Survey implements OnInit {
    
    @Input() model: any
    form: FormGroup
    payload = null

    ngOnInit() {
        this.form = this.model.toGroup()
    }

    onSubmit() {
        this.payload = JSON.stringify(this.form.value)
        console.log(this.payload)
    }
}