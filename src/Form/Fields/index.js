import StringField from './String'
import SelectField from './Select'
import SwitchField from './Switch'
import FileInput from './FileInput'

const fieldTypes = {
    string: StringField,
    select: SelectField,
    switch: SwitchField,
    file: FileInput
}

function types(){
    return Object.keys(fieldTypes)
}


export {
    fieldTypes,
    types
};