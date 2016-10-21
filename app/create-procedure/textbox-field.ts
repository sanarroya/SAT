import { FieldBase } from '../create-procedure/field-base'

export class TextBoxField extends FieldBase<string> {

    type: string
    controlType = 'textbox'

    constructor() {
        super()
    }
}