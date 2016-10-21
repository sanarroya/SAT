import { FormGroup, Validators, FormControl } from '@angular/forms'

export class FieldModel {

    fields = []

    toGroup() {
        let group: any = {}

        this.fields.forEach((field) => {
            group[field.key] = new FormControl('', Validators.required)
        })

        return new FormGroup(group)
    }
}
