import { FieldBase } from '../create-procedure/field-base'

export class FileField extends FieldBase<string> {

    type: string
    controlType = 'file'

    constructor() {
        super()
    }
}